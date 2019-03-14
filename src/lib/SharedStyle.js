const getSharedLayerStyles = (document) => {
    return document.sharedLayerStyles;
}

const getSharedTextStyles = (document) => {
    return document.sharedTextStyles;
}

const addLayerStyle = (document, layer) => {
    document.sharedLayerStyles.push({ name: layer.name, style: layer.style });
    let sharedStyleIndex = document.sharedLayerStyles.length - 1;
    return layer.sharedStyleId = document.sharedLayerStyles[sharedStyleIndex].id;
}

const addTextStyle = (document, layer) => {
    document.sharedTextStyles.push({ name: layer.name, style: layer.style });
    let sharedStyleIndex = document.sharedTextStyles.length - 1;
    return layer.sharedStyleId = document.sharedTextStyles[sharedStyleIndex].id;
}

const updateStyle = (layer, sharedStyle) => {
    sharedStyle.style = layer.style;
    return;
}

const updateLayerStyle = (context, layer, sharedStyle) => {
    return updateStyle(context, layer, sharedStyle);
}

const updateTextStyle = (context, layer, sharedStyle) => {
    return updateStyle(context, layer, sharedStyle);
}

export {
    getSharedLayerStyles,
    getSharedTextStyles,
    addLayerStyle,
    addTextStyle,
    updateStyle,
    updateLayerStyle,
    updateTextStyle
};
