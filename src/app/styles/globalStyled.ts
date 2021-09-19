import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {isIOS} from './dimens';
import styled, {css} from './styled';

export const BOTTOM_BAR_HEIGHT = 100;
export const PADDING_CONTAINER = 50;

// TODO: Design CSS
export const textLargeCss = css`
	font-style: normal;
	font-weight: ${(props) => props.theme.font.bold};
	font-size: ${(props) => props.theme.font.fontLarge};
`;
export const textMediumCss = css`
	font-weight: 600;
	font-size: ${({theme}) => theme.font.fontMedium};
`;
export const spaceTextHeader = css`
	margin: 12px 0px;
	align-self: center;
`;
export const textSmallCss = css`
	font-weight: 200;
	font-size: ${({theme}) => theme.font.fontSmall};
`;
export const textMediumLargeCss = css`
	font-weight: 200;
	font-size: ${({theme}) => theme.font.fontMediumLarge};
	font-style: normal;
	font-weight: normal;
`;
export const scapingTabbar = css``;
export const rowCss = css`
	flex-direction: row;
`;
export const centerItemsCss = css`
	align-items: center;
`;
export const centerContentCss = css`
	justify-content: center;
`;
export const betweenContent = css`
	justify-content: space-between;
`;
export const shadowElement = css`
	${!isIOS
		? css`
				elevation: 1.5;
		  `
		: css`
				shadow-color: #f1f4f9;
				border-width: 0.2px;
				shadow-radius: 12px;
				shadow-offset: 0px 4px;
				shadow-opacity: 1;
		  `}
	margin-bottom: 5px;
	margin-horizontal: 5px;
`;

export const paddingContainer = css`
	padding-horizontal: ${({theme}) => theme.scapingContainer};
`;

export const containerCss = css<{notPadding?: boolean}>`
	flex: 1;
	background-color: ${({theme}) => theme.colors.background};
	${({notPadding}) => (!notPadding ? paddingContainer : '')}
`;
export const marginVerticalElementCss = css`
	margin-vertical: ${({theme}) => theme.scapingElement};
`;
// TODO: Design component
export const TextLarge = styled.Text`
	${textLargeCss}
`;

export const TextMedium = styled.Text`
	${textMediumCss}
`;

export const TextMediumLarge = styled.Text`
	${textMediumLargeCss}
`;

export const TextSmall = styled.Text`
	${textSmallCss}
`;

export const Container = styled.View<{notPadding?: boolean}>`
	${containerCss}
`;
export const AreaContainer = styled.SafeAreaView<{notPadding?: boolean}>`
	${containerCss}
`;
export const KeyboardContainer = styled(KeyboardAwareScrollView)<{notPadding?: boolean}>`
	${containerCss}
`;

export const RowView = styled.View`
	${rowCss}
`;

export const RowTouch = styled.TouchableOpacity`
	${rowCss}
`;

export const CenterItemView = styled.View`
	${centerItemsCss}
`;
export const ScrollContainer = styled.ScrollView`
	${containerCss}
`;
export const ListContainer = styled.FlatList`
	${containerCss}
`;
export const Touch = styled.TouchableOpacity``;
