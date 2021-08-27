import {centerItemsCss, RowView, TextLarge, textLargeCss} from 'app/styles/globalStyled';
import styled, {css} from 'app/styles/styled';
import React, {useEffect, useState} from 'react';
import {ViewStyle} from 'react-native';
import {IconMinusClean, IconPlusClean} from './icons/Icons';

interface Props {
	quantity?: number;
	isInput?: boolean;
}

const TouchQuantity = ({quantity: quantityProps, isInput = true}: Props) => {
	const [quantity, setQuantity] = useState(1);

	useEffect(() => {
		setQuantity(quantityProps || 1);
	}, [quantityProps]);

	return (
		<Container>
			<TouchIcon
				isInput={isInput}
				disabled={!quantity}
				left
				onPress={() => setQuantity(quantity - 1)}
			>
				<IconMinusClean disabled={!quantity} />
			</TouchIcon>

			<QuantityView>
				{isInput ? (
					<QuantityInput
						maxLength={2}
						value={quantity.toString()}
						keyboardType={'numeric'}
						onChangeText={(text) => setQuantity(+text || 1)}
					/>
				) : (
					<QuantityText>{quantity}</QuantityText>
				)}
			</QuantityView>

			<TouchIcon
				isInput={isInput}
				disabled={quantity >= 99}
				onPress={() => setQuantity(quantity + 1)}
			>
				<IconPlusClean disabled={quantity >= 99} />
			</TouchIcon>
		</Container>
	);
};

const borderCss = css`
	background-color: white;
	border-radius: ${({theme}) => theme.borderRadiusStand};
	border-width: 0.5px;
	border-color: ${({theme}) => theme.colors.gray};
`;

const Container = styled(RowView)``;

const QuantityView = styled.View<Props>`
	width: 50px;
	aspect-ratio: 1;
	align-items: center;
	justify-content: center;
	${({isInput}) => (isInput ? borderCss : '')}
`;
const TouchIcon = styled.TouchableOpacity<Props & {left?: boolean}>`
	aspect-ratio: ${({isInput}) => (!isInput ? 1 : 0.6)};
	justify-content: center;
	${({left}) => (left ? 'margin-right' : 'margin-left')}: 5px;
	${({left}) => (left ? '' : 'align-items: flex-end;')}
	${({isInput}) => (!isInput ? 'align-items:center;' : '')}
    ${({isInput}) => (!isInput ? borderCss : '')}
`;
const QuantityText = styled(TextLarge)``;
const QuantityInput = styled.TextInput`
	${textLargeCss}
`;

export default TouchQuantity;
