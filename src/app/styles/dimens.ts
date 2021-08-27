import {Dimensions, Platform} from 'react-native';

const screenDimen = Dimensions.get('window');
export const screenWidth = screenDimen.width;
export const screenHeight = screenDimen.height;
export const isIOS = Platform.OS === 'ios';
