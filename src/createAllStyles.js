import { fromNative } from 'sketch';
import { message } from 'sketch/ui';

import * as Constants from './lib/Constants';
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

    if (selectedLayersCount == 0) {
        message("No layers selected. 🤨");
        NSSound.soundNamed(Constants.systemSounds.Basso).play();
        return;
    }

    if (selectedLayersCount > 99) {
        message(`You've selected ${selectedLayersCount} layers 😱 - It might take a few minutes!`);
        NSSound.soundNamed(Constants.systemSounds.Blow).play();
    }

    setTimeout(() => {

        selectedLayers.forEach(( layer ) => {

            if (Layer.getLayerType(layer) == "Text") {

                let sharedStyle = SharedStyle.getSharedTextStyleById(layer.sharedStyleId, document);

                if (Layer.hasSharedStyle(layer) && sharedStyle) {
                    SharedStyle.updateStyle(sharedStyle, layer);
                    Counter.updateCounter('updated', 1);
                    return;
                }

                SharedStyle.addTextStyle(document, layer);
                Counter.updateCounter('created', 1);
                return;

            } else if (Layer.getLayerType(layer) == "ShapePath") {

                let sharedStyle = SharedStyle.getSharedShapeStyleById(layer.sharedStyleId, document);

                if (Layer.hasSharedStyle(layer) && sharedStyle) {
                    SharedStyle.updateStyle(sharedStyle, layer);
                    Counter.updateCounter('updated', 1);
                    return;
                }

                SharedStyle.addShapeStyle(document, layer);
                Counter.updateCounter('created', 1);
                return;
            }

        });

        message(
            `${Constants.exclamations[Utils.getRandomInt(Constants.exclamations.length - 1)]}! 🙌` +
            "   |   " +
            `Styles created: ${Counter.getCount('created')}` +
            "   |   " +
            `Styles updated: ${Counter.getCount('updated')}`
        );
        NSSound.soundNamed(Constants.systemSounds.Glass).play();

    }, 100);

}
