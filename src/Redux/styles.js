import React, {StyleSheet, Dimensions, PixelRatio} from "react-native";
const {width, height, scale} = Dimensions.get("window"),
    vw = width / 100,
    vh = height / 100,
    vmin = Math.min(vw, vh),
    vmax = Math.max(vw, vh);

export default StyleSheet.create({
    "body": {
        "textAlign": "center"
    },
    "cell": {
        "width": 100,
        "height": 100,
        "display": "inline-block",
        "border": "1px solid #aaa",
        "backgroundColor": "#f8f8f8",
        "marginRight": 4
    },
    "active": {
        "backgroundColor": "#058bda"
    },
    "guess-true": {
        "backgroundColor": "#00CC00"
    },
    "guess-false": {
        "backgroundColor": "#CC0000"
    }
});