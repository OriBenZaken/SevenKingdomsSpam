/**
 * Used DOM elements
 */
export const elements = {
    adsList: document.querySelector('.ads-list'),
    mapContainer: document.querySelector('.map-container'),
    background: document.querySelector('.background'),
    filters: document.querySelector('.time-filters')
};

/**
 * Udes DOM strings (classes, ids, ...)
 */
export const elementStrings = {
    adContainer: 'ad-container',
    startTimeFilter: 'filter-start-time',
    endTimeFilter: 'filter-end-time',
    mapContainer: 'map-container'
}

/**
 * @param {String} HTML representing a single element
 * @return {Element}
 */
export const htmlToElement = html => {
    const template = document.createElement('template');
    html = html.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = html;
    return template.content.firstChild;
};
