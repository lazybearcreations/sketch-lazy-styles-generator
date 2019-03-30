import { fromNative } from 'sketch';

let selected = {
    shapes: [],
    texts: [],
    artboards: []
};

let selectionCount;
let selectedLayerCount;
let selectedShapeCount;
let selectedTextCount;
let selectedArtboardCount;

const sortSelection = (selectedLayersNative) => {

    selectionCount = selectedLayersNative.containedLayersCount();
    selectedLayersNative = selectedLayersNative.containedLayers();

    selectedLayersNative.forEach(( layerNative ) => {

        let layer = fromNative(layerNative);

        if (layer.type == "Artboard") { selected.artboards.push(layer); }
        else if (layer.type == "Text") { selected.texts.push(layer); }
        else { selected.shapes.push(layer); }

    });

    selectedShapeCount = selected.shapes.length;
    selectedTextCount = selected.texts.length;
    selectedArtboardCount = selected.artboards.length;

    selectedLayerCount = 0;
    Object.keys(selected).forEach((key) => {
        if (key != "artboards") { selectedLayerCount += selected[key].length; }
    });

    return selected;

}

const getSelectedLayers = (contextNative) => {

    if (!selectedShapeCount || !selectedTextCount) {
        sortSelection( contextNative.document.selectedLayers() );
    }
    return [].concat(selected.shapes, selected.texts);

}

const getSelectedShapes = (contextNative) => {

    if (!selectedShapeCount) {
        return sortSelection( contextNative.document.selectedLayers() ).shapes;
    }
    return selected.shapes;

}

const getSelectedTexts = (contextNative) => {

    if (!selectedTextCount) {
        return sortSelection( contextNative.document.selectedLayers() ).texts;
    }
    return selected.texts;

}

const getSelectedArtboards = (contextNative) => {

    if (!selectedArtboardCount) {
        sortSelection( contextNative.document.selectedLayers() ).artboards;
    }
    return selected.artboards;

}

const getSelectedLayerCount = (contextNative) => {

    if (!selectedLayerCount) {
        sortSelection( contextNative.document.selectedLayers() );
    }
    return selectedLayerCount;

}

const getSelectedShapeCount = (contextNative) => {

    if (!selectedShapeCount) {
        sortSelection( contextNative.document.selectedLayers() );
    }
    return selectedShapeCount;

}

const getSelectedTextCount = (contextNative) => {

    if (!selectedTextCount) {
        sortSelection( contextNative.document.selectedLayers() );
    }
    return selectedTextCount;

}

const getSelectedArtboardCount = (contextNative) => {

    if (!selectedArtboardCount) {
        sortSelection( contextNative.document.selectedLayers() );
    }
    return selectedArtboardCount;

}

const getLayerType = (layer) => {
    return layer.type;
}

const hasSharedStyle = (layer) => {
    return layer.sharedStyleId;
}

export {
    sortSelection,
    getSelectedLayers,
    getSelectedShapes,
    getSelectedTexts,
    getSelectedArtboards,
    getSelectedLayerCount,
    getSelectedShapeCount,
    getSelectedTextCount,
    getSelectedArtboardCount,
    getLayerType,
    hasSharedStyle
}
