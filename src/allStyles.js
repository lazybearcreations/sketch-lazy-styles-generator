import { fromNative } from 'sketch';
import { message } from 'sketch/ui';
import { exclamations } from './lib/Constants';

import * as Counter from './lib/Counter';
import * as Layer from './lib/Layer';
import * as SharedStyle from './lib/SharedStyle';
import * as Utils from './lib/Utils';

export default (contextNative) => {

    const document = fromNative(contextNative.document);
    const documentDataNative = contextNative.document.documentData();

    const selectedLayers = Layer.getSelectedLayers(contextNative);
    const selectedLayersCount = Layer.getSelectedLayerCount(contextNative);

    if (selectedLayersCount === 0) {
        message("No layers selected. 🤨");
        return;
    }

    if (selectedLayersCount > 100) {
        message(`You've selected ${selectedLayersCount} layers 😱 - It might take a few minutes!`);
    }

    setTimeout(() => {

        selectedLayers.forEach(( layer ) => {

            if (Layer.getLayerType(layer) === "Text") {

                let sharedStyle = SharedStyle.getSharedTextStyleById(layer.sharedStyleId, document);
                // let sharedStyle = fromNative(documentDataNative.textStyleWithID(layer.sharedStyleId));

                if (Layer.hasSharedStyle(layer)) {
                    SharedStyle.updateStyle(sharedStyle, layer.style);
                    Counter.updateCounter('updated', 1);
                    return;
                }

                SharedStyle.addTextStyle(document, layer);
                Counter.updateCounter('created', 1);
                return;

            } else if (Layer.getLayerType(layer) == "ShapePath") {

                let sharedStyle = SharedStyle.getSharedShapeStyleById(layer.sharedStyleId, document);
                // let sharedStyle = fromNative(documentDataNative.layerStyleWithID(layer.sharedStyleId));

                if (Layer.hasSharedStyle(layer)) {
                    SharedStyle.updateStyle(sharedStyle, layer.style);
                    Counter.updateCounter('updated', 1);
                    return;
                }

                SharedStyle.addShapeStyle(document, layer);
                Counter.updateCounter('created', 1);
                return;
            }

        });

        message(
            `${exclamations[Utils.getRandomInt(exclamations.length - 1)]}! 🙌` +
            "   |   " +
            `Styles created: ${Counter.getCount('created')}` +
            "   |   " +
            `Styles updated: ${Counter.getCount('updated')}`
        );

    }, 100);

}
