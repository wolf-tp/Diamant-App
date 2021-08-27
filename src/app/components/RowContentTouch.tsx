import styled from 'app/styles/styled';
import React from 'react';
import {Text, TouchableOpacityProps} from 'react-native';
import {SvgProps} from 'react-native-svg';
import {betweenContent, rowCss} from '../styles/globalStyled';
import {IconChevron} from './icons/Icons';

interface Props {
	Icon?: React.ElementType<SvgProps>;
	content?: string;
}

const RowContentTouch = ({style, Icon, content}: Props & TouchableOpacityProps) => {
	return (
		<ContainerView style={style}>
			<LeftView>
				{Icon && <Icon style={{marginRight: 10}} />}
				<TitleText>{content}</TitleText>
			</LeftView>
			<IconChevron />
		</ContainerView>
	);
};
const ContainerView = styled.TouchableOpacity`
	${betweenContent}
	${rowCss}
	padding-vertical:10px;
`;
const TitleText = styled.Text`
	font-size: ${({theme}) => theme.font.fontMedium};
	font-weight: 400;
`;
const LeftView = styled.View`
	${rowCss}
`;

export default RowContentTouch;
