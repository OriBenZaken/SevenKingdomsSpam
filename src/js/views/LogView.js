import {elements} from './base'
import { AdType } from '../models/Ad';

/**
 * LogView contains all the functionality required
 * to contorol the view of the Ads Log section. 
 */

/**
 * Renders an additional log to the list in Ads Log section.
 * @param {Ad} ad 
 */
export const renderAdInLog = ad => {
    const markup = `
    <li>
        <div class="log-line">
            ${formatTime(ad.date)} 
            <img class="log-icon" src="img/ic_${ad.type === AdType.VIDEO ? "movie_creation" : "image"}_black_24px.svg" alt="${ad.type}">
            ${ad.name} 
            <a href="${ad.url}">
            <img class="log-icon" src="img/ic_insert_link_black_24px.svg" alt="link">
            </a>
        </div>
    </li>
    `;

    elements.adsList.insertAdjacentHTML('afterbegin', markup);
}
/**
 * Renders to the Ads Log section all the logs in given adsList array.
 * Only the Ads in the list will be displayed, and will not be added to
 * the existing displayed log.
 * @param {Array<Ad>} adsList array of Ads
 */
export const renderAdEntriesList = adsList => {
    clearAdsLogList();
    adsList.forEach(ad => renderAdInLog(ad));
}

/**
 * Clears all the ads shown in the Ads Log section.
 */
export const clearAdsLogList = () => {
    elements.adsList.innerHTML = '';
}

/**
 * Convert Unix timestamp to hh:mm:ss format
 * and returned the formatted string
 * @param {string} date Unix timestamp
 */
const formatTime = date => {
    const h = formatTimeUnit(date.getHours());
    const m = formatTimeUnit(date.getMinutes());
    const s = formatTimeUnit(date.getSeconds());

    return `${h}:${m}:${s}`;
}

/**
 * If neseccary adds '0' to the time unit in order
 * to adapt the format of hh , mm or ss.
 * @param {number} time value of time unit (hour/minute/second)
 */
const formatTimeUnit = time => {
    return time < 10 ? '0' + time : time;
};
