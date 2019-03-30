import { fromNative } from 'sketch';
import { message } from 'sketch/ui';

import * as Constants from './lib/Constants';
import * as SharedStyle from './lib/SharedStyle';
import * as Utils from './lib/Utils';

export default (contextNative) => {

    const document = fromNative(contextNative.document);
    const documentDataNative = contextNative.document.documentData();

    setTimeout(() => {

        SharedStyle.removeAllShapeStyles(document);

        message(
            `${Constants.exclamations[Utils.getRandomInt(Constants.exclamations.length - 1)]}! 🙌` +
            "   |   " +
            `All shape styles removed`
        );
        NSSound.soundNamed(Constants.systemSounds.Submarine).play();

    }, 100);

}
