import svgAttributes from './attributes';

export const convertAttributeToJSX = (attribute) => {
    // Valid exceptions for react
    if (/^(data-|aria-)/.test(attribute)) {
        return attribute;
    }

    return svgAttributes[attribute] || attribute;
};
