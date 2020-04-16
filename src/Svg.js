import React, { Component, forwardRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './Svg.css';

export class Svg extends Component {
    static getDerivedStateFromProps(props, state) {
        return {
            contents: typeof props.svg === 'string' ? props.svg : state.contents,
        };
    }

    promise = undefined;
    state = { contents: '' };

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
        const { contents } = this.state;
        const finalProps = {
            ...rest,
            className: classNames('svgWrapper', className),
        };

        return <i { ...finalProps } ref={ forwardedRef } dangerouslySetInnerHTML={ { __html: contents } } />;
    }

    resetWaitForSvg() {
        this.promise = undefined;
    }

    async maybeWaitForSvg() {
        const { svg } = this.props;

        this.resetWaitForSvg();

        if (typeof svg !== 'object') {
            return;
        }

        const promise = this.promise = svg;
        const result = await this.promise.catch(() => ({ default: '' }));

        /* istanbul ignore next */
        if (promise === this.promise) {
            this.setState({ contents: result.default });
        }
    }
}

Svg.propTypes = {
    svg: PropTypes.oneOfType([PropTypes.string, PropTypes.shape({ then: PropTypes.func.isRequired })]).isRequired,
    className: PropTypes.string,
    forwardedRef: PropTypes.object,
};

export default forwardRef((props, ref) => <Svg forwardedRef={ ref } { ...props } />);
