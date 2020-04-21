import React, { Component, forwardRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export class Svg extends Component {
    promise = undefined;
    state = { contents: null, attributes: null };

    componentDidMount() {
        this.maybeWaitForSvg();
    }

    componentDidUpdate(prevProps) {
        if (this.props.svg !== prevProps.svg) {
            this.maybeWaitForSvg();
        }
    }

    componentWillUnmount() {
        this.resetWaitForSvg();
    }

    render() {
        const { svg, className, forwardedRef, ...rest } = this.props;
        const { contents, attributes } = this.state;

        if (contents === null) {
            return null;
        }

        return (
            <svg
                { ...attributes }
                { ...rest }
                className={ classNames('react-svg', className) }
                ref={ forwardedRef }
                dangerouslySetInnerHTML={ { __html: contents } } />
        );
    }

    parseSvg(svg) {
        if (svg == null || typeof window === 'undefined') {
            return { contents: null, attributes: null };
        }

        const parser = new window.DOMParser();
        const doc = parser.parseFromString(svg, 'image/svg+xml');
        const svgElem = doc.querySelector('svg');

        const attributes = Array.from(svgElem.attributes).reduce((acc, item) => {
            acc[item.name] = item.nodeValue;

            return acc;
        }, {});

        return { contents: svgElem.innerHTML, attributes };
    }

    resetWaitForSvg() {
        this.promise = undefined;
    }

    async maybeWaitForSvg() {
        const { svg } = this.props;

        this.resetWaitForSvg();

        if (typeof svg === 'string') {
            return this.setState(this.parseSvg(svg));
        }

        const promise = this.promise = svg;
        const result = await this.promise.catch(() => ({ default: null }));

        if (promise === this.promise) {
            return this.setState(this.parseSvg(result.default));
        }
    }
}

Svg.propTypes = {
    svg: PropTypes.oneOfType([PropTypes.string, PropTypes.shape({ then: PropTypes.func.isRequired })]).isRequired,
    className: PropTypes.string,
    forwardedRef: PropTypes.object,
};

export default forwardRef((props, ref) => <Svg forwardedRef={ ref } { ...props } />);
