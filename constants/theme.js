import { Dimensions } from "react-native";
const {width, height} = Dimensions.get('window');

export const COLORS = {
    primary: "#252c4a",
    secondary: '#1E90FF',
    accent: '#3498db',
    
    success: '#00C851',
    error: '#ff4444',

    black: "#171717",
    white: "#FFFFFF",
    background: "#252C4A",

    lightbeige: "#FFF9F3",
    darkbeige: "#F9EBDC",
    red: "#EE574E",
    blue: "#7598DA",
    purple: "#453854",
    orange: "#F46831",
}

export const SIZES = {
    base: 10,
    width,
    height
}
