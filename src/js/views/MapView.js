import {elements, elementStrings, htmlToElement} from './base';
import {AdType} from '../models/Ad';

/**
 * MapView contains all the functionality required
 * to contorol the view of the displaying Ad on the map. 
 */

const MAX_X_COORDINATE = 1280;
const MAX_Y_COORDINATE = 1887;
const AD_DISPLAY_TIME_MS = 5000;

/**
 * Render the Ad on the map
 * @param {Ad} ad 
 */
export const renderAdOnMap = ad => {
    const markup = `
    <div class="${elementStrings.adContainer}">
        ${ad.type === AdType.IMAGE ? 
        `<img src="${ad.url}" alt="${ad.name}"></img>` :
        `<video autoplay muted loop>
                <source src="${ad.url}" type="video/mp4">
                </source>
        </video>`
    }
    </div>
    `;

    const adContainerElement = htmlToElement(markup);
    elements.mapContainer.insertAdjacentElement('afterbegin', adContainerElement);

    const adRec = adContainerElement.getBoundingClientRect();
    const mapRec = elements.mapContainer.getBoundingClientRect();

    console.log(adRec, mapRec);
    
    const x_percent = (ad.coordinates.x / MAX_X_COORDINATE) * 100 * ((mapRec.width - adRec.width) / mapRec.width);
    const y_percent = (ad.coordinates.y / MAX_Y_COORDINATE) * 100 * ((mapRec.height - adRec.height) / mapRec.height);

    // positioning according to relative x and y coordintes of the mapContainer.
    adContainerElement.style.left = x_percent + "%";
    adContainerElement.style.top = y_percent + "%";
    adContainerElement.style.visibility = 'visible';

    // Remove the Ad from the map after AD_DISPLAY_TIME_MS seconds.
    setTimeout(()=>elements.mapContainer.removeChild(adContainerElement), AD_DISPLAY_TIME_MS);

}