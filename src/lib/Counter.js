let Counters = {
    created: 0,
    updated: 0,
    skipped: 0
};

const getCount = ( type ) => {
    return Counters[type];
}

const updateCounter = ( type, increment ) => {
    return Counters[type] += increment;
}

export {
    getCount,
    updateCounter
}
