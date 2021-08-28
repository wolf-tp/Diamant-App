import {navigate} from 'app/navigation/rootNavigation';
import {betweenContent, RowView, centerItemsCss, shadowElement} from 'app/styles/globalStyled';
import styled from 'app/styles/styled';
import React from 'react';
import {ViewStyle} from 'react-native';
import {IconCardPlus} from './icons/Icons';

interface Props {
	onPressPlus?: () => void;
	style?: ViewStyle;
}

const CardFood = ({style, title = '', description = '', price}: Props & Product) => {
	return (
		<Container style={style} activeOpacity={0.6} onPress={() => navigate('ProductDetail')}>
			<ProductImage source={require('images/template/apple.png')} />
			<NameProduct>{title}</NameProduct>
			<Description>{description}</Description>
			<RowBottom>
				<PriceText>${price}</PriceText>
				<TouchIcon activeOpacity={0.6}>
					<IconCardPlus />
				</TouchIcon>
			</RowBottom>
		</Container>
	);
};
const Container = styled.TouchableOpacity`
	border-radius: 14px;
	padding: 13px;
	background-color: white;
	${shadowElement}
`;
const NameProduct = styled.Text`
	margin-top: 6px;
	font-size: 14px;
	font-weight: 500;
`;
const Description = styled.Text`
	margin-top: 3px;
	font-size: 12px;
	font-weight: 300;
	color: #7c7c7c;
`;
const PriceText = styled.Text`
	font-size: 14px;
	font-weight: 500;
`;
const ProductImage = styled.Image`
	resize-mode: cover;
	max-height: 100px;
`;
const RowBottom = styled(RowView)`
	${betweenContent}
	${centerItemsCss}
`;
const TouchIcon = styled.TouchableOpacity``;

export default CardFood;
