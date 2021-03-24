import { convertAttributeToJSX } from './convert';

describe('Convert HTML to JSX attribute', () => {
    it('should convert an invalid attribute in JSX into a valid one', () => {
        expect(convertAttributeToJSX('accent-height')).toBe('accentHeight');
        expect(convertAttributeToJSX('enable-background')).toBe('enableBackground');
        expect(convertAttributeToJSX('xml:space')).toBe('xmlSpace');
        expect(convertAttributeToJSX('xlink:href')).toBe('xlinkHref');
    });

    it('should ignore a data or aria attribute', () => {
        expect(convertAttributeToJSX('data-svg')).toBe('data-svg');
        expect(convertAttributeToJSX('aria-label')).toBe('aria-label');
    });
});
