import {TextMedium, TextSmall} from 'app/styles/globalStyled';
import styled from 'app/styles/styled';
import React from 'react';
import {ViewStyle} from 'react-native';

interface Props {
	title?: string;
	content?: string;
	style?: ViewStyle;
}

const TitleContent = ({title, content, style}: Props) => {
	return (
		<Container style={style}>
			<TextTitle>{title}</TextTitle>
			<Content>{content}</Content>
		</Container>
	);
};
const Container = styled.View``;
const TextTitle = styled(TextMedium)`
	color: #181725;
`;
const Content = styled(TextSmall)`
	margin-top: ${({theme}) => theme.scaping(2)};
`;

export default TitleContent;
