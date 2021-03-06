let sharedStyles = {
    shape : [],
    text : []
}

let sharedShapeStyleCount;
let sharedTextStyleCount;

const getSharedShapeStyles = (document, fromSource) => {

    if (sharedShapeStyleCount || !fromSource) { return sharedStyles.shape; }

    sharedStyles.shape = document.sharedLayerStyles;
    sharedShapeStyleCount = sharedStyles.shape.length;

    return sharedStyles.shape;

}

const getSharedTextStyles = (document, fromSource) => {

    if (sharedTextStyleCount || !fromSource) { return sharedStyles.text; }

    sharedStyles.text = document.sharedTextStyles;
    sharedTextStyleCount = sharedStyles.text.length;

    return sharedStyles.text;

}

const getSharedStyles = (document, fromSource) => {
    getSharedShapeStyles(document, fromSource);
    getSharedTextStyles(document, fromSource);
    return sharedStyles;
}

const getSharedShapeStyleById = (sharedStyleID, document) => {

    let styles = getSharedShapeStyles(document);

    return styles.filter(style => {
        return style.id == sharedStyleID;
    })[0];

}

const getSharedTextStyleById = (sharedStyleID, document) => {

    let styles = getSharedTextStyles(document);

    return styles.filter(style => {
        return style.id == sharedStyleID;
    })[0];

}

const addShapeStyle = (document, layer) => {

    document.sharedLayerStyles.push({ name: layer.name, style: layer.style });

    let sharedStyleIndex = document.sharedLayerStyles.length - 1;
    getSharedShapeStyles(document, true);

    return layer.sharedStyleId = document.sharedLayerStyles[sharedStyleIndex].id;

}

const addTextStyle = (document, layer) => {

    document.sharedTextStyles.push({ name: layer.name, style: layer.style });

    let sharedStyleIndex = document.sharedTextStyles.length - 1;
    getSharedTextStyles(document, true);

    return layer.sharedStyleId = document.sharedTextStyles[sharedStyleIndex].id;

}

const updateStyle = (sharedStyle, layer) => {
    sharedStyle.name = layer.name;
    return sharedStyle.style = layer.style;
}

const updateShapeStyle = (sharedStyle, layer) => {
    return updateStyle(sharedStyle, layer);
}

const updateTextStyle = (sharedStyle, layer) => {
    return updateStyle(sharedStyle, layer);
}

const removeAllTextStyles = (document) => {
    return document.sharedTextStyles = [];
}

const removeAllShapeStyles = (document) => {
    return document.sharedLayerStyles = [];
}

export {
    getSharedShapeStyles,
    getSharedTextStyles,
    getSharedStyles,
    getSharedShapeStyleById,
    getSharedTextStyleById,
    addShapeStyle,
    addTextStyle,
    updateStyle,
    updateShapeStyle,
    updateTextStyle,
    removeAllTextStyles,
    removeAllShapeStyles
};
