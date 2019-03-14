import { fromNative } from 'sketch';
import { message } from 'sketch/ui';
import { exclamations } from './lib/Constants';

import * as Counter from './lib/Counter';
import * as Layer from './lib/Layer';
import * as SharedStyle from './lib/SharedStyle';
import * as Utils from './lib/Utils';

export default (context) => {

    const document = fromNative(context.document);
    const documentData = context.document.documentData();

    const selectedLayers = Layer.getSelectedLayers(context);
    const selectedLayersCount = Layer.getSelectedLayersCount();

    if (selectedLayersCount === 0) {
        message("No layers selected. 🤨");
        return;
    }

    if (selectedLayersCount > 100) {
        message(`You've selected ${selectedLayersCount} layers 😱 - It might take a few minutes!`);
    }

    setTimeout(() => {

        selectedLayers.forEach(( layer ) => {

            layer = fromNative(layer);

            if (Layer.getLayerType(layer) == "ShapePath") {

                let sharedStyle = fromNative(documentData.layerStyleWithID(layer.sharedStyleId));

                if (Layer.hasSharedStyle(layer)) {
                    SharedStyle.updateStyle(layer, sharedStyle);
                    Counter.updateCounter(1, 'updated');
                    return;
                }

                SharedStyle.addLayerStyle(document, layer);
                Counter.updateCounter(1, 'created');
                return;
            } else {
                Counter.updateCounter(1, 'skipped');
            }

        });

        message(
            `${exclamations[Utils.getRandomInt(exclamations.length - 1)]}! 🙌` +
            "   |   " +
            `Styles created: ${Counter.getCount('created')}` +
            "   |   " +
            `Styles updated: ${Counter.getCount('updated')}` +
            "   |   " +
            `Styles skipped: ${Counter.getCount('skipped')}`
        );

    }, 100);

}
