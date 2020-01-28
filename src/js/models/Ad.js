/**
 * Ad object.
 */
export default class Ad {
    constructor(type, coordinates, name, url, date) {
        this.type = type;
        this.coordinates = coordinates;
        this.name = name;
        this.url = url;
        this.date = date;
    }
}

/**
 * Encapsulates the string type of Ad given by adDispather API.
 */
export const AdType = {
    IMAGE: 'IMAGE',
    VIDEO: 'VIDEO'
}

/**
 * Returns the AdType value that corresponds to the given 
 * stringType.
 * If no correspond value found - returns null.
 * @param {string} stringType represents the Ad type
 */
export const getAdTypeEnum = stringType => {
    for (const value in AdType) {
        if (AdType[value] === stringType) return AdType[value];
    }
    return null;
}