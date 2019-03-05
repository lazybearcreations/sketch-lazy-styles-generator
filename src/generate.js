import {Document} from "sketch/dom";
import {message} from 'sketch/ui';

const document = Document.getSelectedDocument();

const count = {
    layers: { created: 0, updated: 0 },
    text: { created: 0, updated: 0 }
};

const update = (layer, sharedStyle) => {

    layer.sharedStyle.style = layer.style;

    if (layer.type === "ShapePath") {

        if (layer.style.isOutOfSyncWithSharedStyle(sharedStyle)) {
          layer.style.syncWithSharedStyle(sharedStyle);
        }

        count.layers.updated++;

    }

    if (layer.type === "Text") {

        if (layer.style.isOutOfSyncWithSharedStyle(sharedStyle)) {
          layer.style.syncWithSharedStyle(sharedStyle);
        }

        count.text.updated++;

    }
}

const create = (layer) => {

    let index, styleId;

    if (layer.type === "ShapePath") {

        var sharedStyle = document.getSharedLayerStyleWithID(layer.sharedStyleId);

        if (sharedStyle != undefined) {
            return update(layer, sharedStyle);
        }

        document.sharedLayerStyles.push({name:layer.name, style:layer.style});

        index = document.sharedLayerStyles.length - 1;

        count.layers.created++;

        return layer.sharedStyleId = document.sharedTextStyles[index].id;

    }

    if (layer.type === "Text") {

        var sharedStyle = document.getSharedTextStyleWithID(layer.sharedStyleId);

        if (sharedStyle != undefined) {
            return update(layer, sharedStyle);
        }

        document.sharedTextStyles.push({name:layer.name, style:layer.style});

        index = document.sharedTextStyles.length - 1;

        count.text.created++;

        return layer.sharedStyleId = document.sharedTextStyles[index].id;

    }

}

const generate = () => {

    const selectedLayers = document.selectedLayers;

    console.log(document.sharedLayerStyles);

    if (selectedLayers.isEmpty) {
        message("No layers selected.");
    } else {

        selectedLayers.forEach((layer) => {
            create(layer);
        });

    }

    message(
        "Styles created: " + (count.layers.created + count.text.created) +
        "   |   " +
        "Styles updated: " + (count.layers.updated + count.text.updated)
    );

}

export default generate;
