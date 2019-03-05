import sketch from "sketch";

const count = {
    layers: { created: 0, updated: 0 },
    text: { created: 0, updated: 0 }
};

const generate = () => {

    const Dom = require('sketch/dom');
    const Ui = require('sketch/ui');

    const document = sketch.getSelectedDocument();

    const selectedLayers = document.selectedLayers;

    if (selectedLayers.isEmpty) {
        Ui.message("No layers selected.");
    } else {

        selectedLayers.map((layer, i) => {

            const id = create(document, layer);

        });

    }

    Ui.message(
        "Styles created: " + (count.layers.created + count.text.created) +
        "   |   " + 
        "Styles updated: " + (count.layers.updated + count.text.updated)
    );

}

const create = (document, layer) => {

    let index, styleId;

    if (layer.type === "ShapePath") {

        index = document.sharedLayerStyles.findIndex((style) => {
            return style.id === layer.sharedStyleId;
        });

        if (index >= 0) {
            update(document, layer, index);
            return false;
        }

        document.sharedLayerStyles.push({name:layer.name, style:layer.style});
        index = document.sharedLayerStyles.length - 1;

        layer.sharedStyleId = document.sharedLayerStyles[index].id;

        styleId = document.sharedLayerStyles[index].id;

        count.layers.created++;

    }

    if (layer.type === "Text") {

        index = document.sharedTextStyles.findIndex((style) => {
            return style.id === layer.sharedStyleId;
        });

        if (index >= 0) {
            update(document, layer, index);
            return false;
        }

        document.sharedTextStyles.push({name:layer.name, style:layer.style});
        index = document.sharedTextStyles.length - 1;

        layer.sharedStyleId = document.sharedTextStyles[index].id;

        styleId = document.sharedTextStyles[index].id;

        count.text.created++;

    }



    return styleId; // Shared Style ID

}

const update = (document, layer, index) => {

    layer.sharedStyle.style = layer.style;

    if (layer.type === "ShapePath") {

        if (layer.style.isOutOfSyncWithSharedStyle(document.sharedLayerStyles[index])) {
          layer.style.syncWithSharedStyle(document.sharedLayerStyles[index]);
        }

        count.layers.updated++;

    }

    if (layer.type === "Text") {

        if (layer.style.isOutOfSyncWithSharedStyle(document.sharedTextStyles[index])) {
          layer.style.syncWithSharedStyle(document.sharedTextStyles[index]);
        }

        count.text.updated++;

    }

    return false;

}

export default generate;
