import {css} from 'styled-components/native';
import styled from './styled';

// TODO: Design CSS
export const textLargeCss = css`
	font-style: normal;
	font-weight: ${(props) => props.theme.font.bold};
	font-size: ${(props) => props.theme.font.fontLarge};
`;
export const rowCss = css`
	flex-direction: row;
`;
export const centerItemsCss = css`
	align-items: center;
`;

// TODO: Design component
export const TextLarge = styled.Text`
	${textLargeCss}
`;
export const Container = styled.View`
	flex: 1;
	padding-horizontal: ${({theme}) => theme.scapingContainer};
`;
export const RowView = styled.View`
	${rowCss}
`;
