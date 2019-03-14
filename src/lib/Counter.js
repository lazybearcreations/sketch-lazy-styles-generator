let Counters = {
    created: 0,
    updated: 0,
    skipped: 0
};

export const updateCounter = ( count, type ) => {
    return Counters[type] += count;
}

export const getCount = ( type ) => {
    return Counters[type];
}
