let Counters = {
    created: 0,
    updated: 0,
    skipped: 0
};

const updateCounter = ( type, increment ) => {
    return Counters[type] += increment;
}

const getCount = ( type ) => {
    return Counters[type];
}

export {
    updateCounter,
    getCount
}
