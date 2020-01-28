// CONTROLLER
import {adDispatcher} from 'ubimo-ad-dispatcher';
import Ad from './models/Ad';
import {getAdTypeEnum} from './models/Ad';
import AdsLog from './models/AdsLog';
import * as LogView from './views/LogView';
import * as MapView from './views/MapView';
import { elements, elementStrings } from './views/base';

const state = {
    log: new AdsLog()
}

/**
 * ADS CONTROLLER
 */


/**
 * Event listener for Ad dispaching
 */
adDispatcher.registerToAdEvents(adEvent => {
    const adType = getAdTypeEnum(adEvent.type);
    const ad = new Ad(adType, adEvent.coordinates, adEvent.creative.name, adEvent.creative.url, new Date());
    
    // add the ad to AdsLog object
    state.log.addAd(ad);

    // render Ad on Ads Log
    if (state.log.filterAd(ad)) {
        LogView.renderAdInLog(ad);
    }

    // render Ad on Map
    MapView.renderAdOnMap(ad);
});

/**
 * Event listener for time filters inputs
 */
elements.filters.addEventListener('input', e => {
    if (e.target.matches(`.${elementStrings.startTimeFilter}`)) {
        const date = state.log.setTimeFilter('start', e.target.value);
        console.log(e.target.value);
    } else if (e.target.matches(`.${elementStrings.endTimeFilter}`)) {
        state.log.setTimeFilter('end', e.target.value);
        console.log(e.target.value);
    }

    const filteredLog = state.log.getFilteredLog();
    LogView.renderAdEntriesList(filteredLog);

});
