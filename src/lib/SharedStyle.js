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

const getSharedShapeStyleById = (sharedStyleID, document) => {

    if (!sharedShapeStyleCount) { getSharedShapeStyles(document); }

    return sharedStyles.shape.filter(style => {
        return style.id == sharedStyleID;
    });

}

const getSharedTextStyleById = (sharedStyleID, document) => {

    if (!sharedTextStyleCount) { getSharedTextStyles(document); }

    return sharedStyles.text.filter(style => {
        return style.id == sharedStyleID;
    });

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

const updateStyle = (sharedStyle, newStyle) => {
    return sharedStyle.style = newStyle;
}

const updateShapeStyle = (sharedStyle, newStyle) => {
    return updateStyle(sharedStyle, newStyle);
}

const updateTextStyle = (sharedStyle, newStyle) => {
    return updateStyle(sharedStyle, newStyle);
}

export {
    getSharedShapeStyles,
    getSharedTextStyles,
    getSharedShapeStyleById,
    getSharedTextStyleById,
    addShapeStyle,
    addTextStyle,
    updateStyle,
    updateShapeStyle,
    updateTextStyle
};
