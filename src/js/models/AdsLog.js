/**
 * Ads Log object.
 * Contains Ads list, time filters and filtering method.
 */
export default class AdsLog {
    constructor() {
        this.log = [];
        this.timeFilters = {
            start: null,
            end: null
        }
    }
    
    /**
     * Add a given Ad object to the log.
     * @param {Ad} ad 
     */
    addAd(ad) {
        this.log.push(ad);
    }

    /**
     * Converts the given unixTimestamp to a Date object
     * and sets it as to the selected time filter according to type. 
     * @param {string} type 'start' / 'end'
     * @param {string} unixTimestamp 
     */
    setTimeFilter(type, unixTimestamp) {
        if (!unixTimestamp) {
            this.clearTimeFilter(type);
            return;
        }

        const date = new Date(unixTimestamp * 1000);
        this.timeFilters[type] = date;

        return date;
    }

    /**
     * Returns a filtetred Ads list.
     * If one on the filters is invalid - then empty list is returned.
     */
    getFilteredLog() {
        const filtered = [];
        for (let ad of this.log) {
            if (this.filterAd(ad)) filtered.push(ad);
        }

        return filtered;
    }

    /**
     * Returns true or false weather the given Ad should be in the
     * filtered log list.
     * @param {Ad} ad 
     */
    filterAd(ad) {
        if (this.timeFilters.start) {
            if (!this.isValidDate(this.timeFilters.start) || ad.date < this.timeFilters.start) return false;
        }

        if (this.timeFilters.end) {
            if (!this.isValidDate(this.timeFilters.end) || ad.date > this.timeFilters.end)
            return false;
        }
        return true;
    }

    clearTimeFilter(type) {
        this.timeFilters[type] = null;
    }

    isValidDate(date) {
        return date.getTime() > 0;
    }
}
