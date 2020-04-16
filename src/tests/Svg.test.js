import React from 'react';
import { render } from '@testing-library/react';
import Svg from '../Svg';

const getTree = (props) => render(<Svg svg="foo" { ...props } />);

describe('Svg', () => {
    it('should render correctly', () => {
        const { container } = getTree();

        expect(container.innerHTML).toMatchSnapshot();
    });

    it('should handle correctly when svg is a promise', () => {
        const spy = new Promise((resolve) => resolve('foo'));
        const { container } = getTree({ svg: spy });

        expect(container.innerHTML).toMatchSnapshot();
    });

    it('should handle correctly when svg is a promise that fails', () => {
        const spy = new Promise((resolve, reject) => reject(new Error('foo')));
        const { container } = getTree({ svg: spy });

        expect(container.innerHTML).toMatchSnapshot();
    });

    it('should render correctly when receiving new svg prop', () => {
        const { container, rerender } = getTree();

        rerender(<Svg svg="bar" />);

        expect(container.innerHTML).toMatchSnapshot();
    });
});
