let selectedLayersCount = 0;
let selectedLayers = [];

const getSelectedLayers = (context) => {
    if (selectedLayers.length > 0) {
        return selectedLayers;
    }

    let layers = context.selection;
    selectedLayersCount = layers.length;

    return layers;
}

const getSelectedLayersCount = () => {
    return selectedLayersCount;
}

const getLayerType = (layer) => {
    return layer.type;
}

const hasSharedStyle = (layer) => {
    return layer.sharedStyleId;
}

export {
    getSelectedLayers,
    getSelectedLayersCount,
    getLayerType,
    hasSharedStyle
}
