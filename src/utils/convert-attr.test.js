import convertAttr from './convert-attr';

it('should convert an invalid attribute in JSX into a valid one', () => {
    expect(convertAttr('accent-height')).toBe('accentHeight');
    expect(convertAttr('enable-background')).toBe('enableBackground');
    expect(convertAttr('xml:space')).toBe('xmlSpace');
    expect(convertAttr('xlink:href')).toBe('xlinkHref');
});

it('should ignore a data or aria attribute', () => {
    expect(convertAttr('data-svg')).toBe('data-svg');
    expect(convertAttr('aria-label')).toBe('aria-label');
});
