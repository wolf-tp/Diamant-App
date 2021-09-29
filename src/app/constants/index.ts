import {isIOS} from 'app/styles/dimens';
import {isIphoneX} from 'react-native-iphone-x-helper';

export const BOTTOM_TAB_HEIGHT = isIOS && isIphoneX() ? 90 : 60;
