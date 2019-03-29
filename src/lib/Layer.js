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

        if (layer.type === "Artboard") { selected.artboards.push(layer); }
        else if (layer.type === "Text") { selected.texts.push(layer); }
        else { selected.shapes.push(layer); }

    });

    selectedShapeCount = selected.shapes.length;
    selectedTextCount = selected.texts.length;
    selectedArtboardCount = selected.artboards.length;

    Object.keys(selected).forEach((key) => {
        if (key != "artboards") { selectedLayerCount += selected[key].length; }
    });

    return selected;

}

const getSelectedLayers = (contextNative) => {

    let selectedLayersNative = contextNative.document.selectedLayers();

    if (!selectedShapeCount || !selectedTextCount) {
        sortSelection( selectedLayersNative );
    }
    return [].concat(selected.shapes, selected.texts);

}

const getSelectedShapes = (contextNative) => {

    let selectedLayersNative = contextNative.document.selectedLayers();

    if (!selectedShapeCount) {
        return sortSelection( selectedLayersNative ).shapes;
    }
    return selected.shapes;

}

const getSelectedTexts = (contextNative) => {

    let selectedLayersNative = contextNative.document.selectedLayers();

    if (!selectedTextCount) {
        return sortSelection( selectedLayersNative ).texts;
    }
    return selected.texts;

}

const getSelectedArtboards = (contextNative) => {

    let selectedLayersNative = contextNative.document.selectedLayers();

    if (!selectedArtboardCount) {
        sortSelection( selectedLayersNative ).artboards;
    }
    return selected.artboards;

}

const getSelectedLayerCount = (contextNative) => {

    let selectedLayersNative = contextNative.document.selectedLayers();

    if (!selectedLayerCount) {
        sortSelection( selectedLayersNative );
    }
    return selectedLayerCount;

}

const getSelectedShapeCount = (contextNative) => {

    let selectedLayersNative = contextNative.document.selectedLayers();

    if (!selectedShapeCount) {
        sortSelection( selectedLayersNative );
    }
    return selectedShapeCount;

}

const getSelectedTextCount = (contextNative) => {

    let selectedLayersNative = contextNative.document.selectedLayers();

    if (!selectedTextCount) {
        sortSelection( selectedLayersNative );
    }
    return selectedTextCount;

}

const getSelectedArtboardCount = (contextNative) => {

    let selectedLayersNative = contextNative.document.selectedLayers();

    if (!selectedArtboardCount) {
        sortSelection( selectedLayersNative );
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
