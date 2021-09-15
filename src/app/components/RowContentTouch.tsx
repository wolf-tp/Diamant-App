import styled from 'app/styles/styled';
import React from 'react';
import {TouchableOpacityProps} from 'react-native';
import {SvgProps} from 'react-native-svg';
import {betweenContent, centerItemsCss, rowCss, TextMedium} from '../styles/globalStyled';
import {IconChevron} from './icons/Icons';

interface Props {
	Icon?: React.ElementType<SvgProps>;
	content?: string | React.ReactNode;
	children?: React.ReactNode | React.ReactNode[];
}

const RowContentTouch = ({
	style,
	Icon,
	content,
	children,
	onPress,
}: Props & TouchableOpacityProps) => {
	return (
		<ContainerView style={style} onPress={onPress}>
			<LeftView>
				{Icon && <Icon style={{marginRight: 10}} />}
				{typeof content === 'string' ? <TitleText>{content}</TitleText> : content}
			</LeftView>
			<IconChevron />
			{children && children}
		</ContainerView>
	);
};
const ContainerView = styled.TouchableOpacity`
	${betweenContent}
	${rowCss}
	${centerItemsCss}
	padding-vertical: 10px;
`;
const TitleText = styled(TextMedium)`
	font-size: ${({theme}) => theme.font.fontMedium};
	font-weight: 400;
`;
const LeftView = styled.View`
	${rowCss}
`;

export default RowContentTouch;
