import React from 'react';
import { render } from '@testing-library/react';
import Svg from '../Svg';

const svg = `<svg height="100" width="100"> 
                <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3"/>
            </svg>`;

const defaultProps = {
    svg,
};

const renderWithProps = (props = {}) => render(<Svg { ...defaultProps } { ...props } />);

describe('Svg', () => {
    it('should render correctly', () => {
        const { asFragment } = renderWithProps();

        expect(asFragment()).toMatchSnapshot();
    });

    it('should handle correctly when svg is a promise', () => {
        const spy = Promise.resolve({ default: svg });
        const { asFragment } = renderWithProps({ svg: spy });

        expect(asFragment()).toMatchSnapshot();
    });

    it('should handle correctly when svg is a promise that fails', () => {
        const spy = Promise.reject(new Error('foo'));
        const { asFragment } = renderWithProps({ svg: spy });

        expect(asFragment()).toMatchSnapshot();
    });

    it('should render correctly when receiving new svg prop', () => {
        const { asFragment, rerender } = renderWithProps();
        const spy = Promise.resolve({ default: svg });

        rerender(<Svg svg={ spy } />);

        expect(asFragment()).toMatchSnapshot();
    });

    it('should render correctly when receiving new svg promise', () => {
        jest.useFakeTimers();

        const spy = new Promise((resolve) => {
            setTimeout(() => { resolve({ default: svg }); }, 500);
        });
        const spy2 = new Promise((resolve) => {
            setTimeout(() => { resolve({ default: svg }); }, 500);
        });

        const { asFragment, rerender } = renderWithProps({ svg: spy });

        rerender(<Svg svg={ spy2 } />);

        jest.runAllTimers();

        expect(asFragment()).toMatchSnapshot();
    });
});
