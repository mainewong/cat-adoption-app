import { Dimensions } from "react-native";
import { Colors } from "react-native-paper";
const {width, height} = Dimensions.get('window');

export const COLORS = {
    primary: "#453854",
    secondary: '#FFF9F3',
    accent: '#FDA946',
    
    success: '#00C851',
    error: '#ff4444',

    black: "#171717",
    white: "#FFFFFF",
    background: "#7954A5",

    lightbeige: "#FFF9F3",
    darkbeige: "#F9EBDC",
    red: "#EE574E",
    darkred: "#AD2628",
    lightred: "#FD7D60",
    blue: "#4970FB",
    purple: "#7954A5",
    orange: "#F46831",
    grey: "#52495B",
    lightgrey: "#bebebe",
    yellow: "#FDA946"
}

export const SIZES = {
    base: 10,
    width,
    height
}
