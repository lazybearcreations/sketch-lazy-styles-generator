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

    const sharedStyles = SharedStyle.getSharedStyles(document, true);

    if (selectedLayersCount === 0) {
        message("No layers selected. 🤨");
        return;
    }

    if (selectedLayersCount > 100) {
        message(`You've selected ${selectedLayersCount} layers 😱 - It might take a few minutes!`);
    }

    setTimeout(() => {

        selectedLayers.forEach(( layer ) => {

            if (Layer.getLayerType(layer) == "Text") {

                let sharedStyle = SharedStyle.getSharedTextStyleById(layer.sharedStyleId, document);

                if (Layer.hasSharedStyle(layer) && sharedStyle) {
                    SharedStyle.updateStyle(sharedStyle, layer.style);
                    Counter.updateCounter('updated', 1);
                    return;
                }

                SharedStyle.addTextStyle(document, layer);
                Counter.updateCounter('created', 1);
                return;

            } else {
                Counter.updateCounter('skipped', 1);
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
