import {RowView, TextSmall, textSmallCss} from 'app/styles/globalStyled';
import styled, {css} from 'app/styles/styled';
import React, {useEffect, useState} from 'react';
import {IconMinusClean, IconPlusClean} from './icons/Icons';

interface Props {
	quantity?: number;
	isInput?: boolean;
	id?: number;
	listProduct?: ListProductRequest;
}

const TouchQuantity = ({quantity: quantityProps, isInput, id, listProduct}: Props) => {
	const [quantity, setQuantity] = useState(1);
	useEffect(() => {
		setQuantity(quantityProps || 1);
	}, [quantityProps]);

	const changeValue = (value: number) => {
		if (listProduct && id) {
			listProduct[id] = value;
		}
		setQuantity(value);
	};

	return (
		<Container>
			<TouchIcon
				isInput={isInput}
				disabled={!(quantity - 1)}
				left
				onPress={() => changeValue(quantity - 1)}
			>
				<IconMinusClean disabled={!(quantity - 1)} />
			</TouchIcon>

			<QuantityView isInput={isInput}>
				{isInput ? (
					<QuantityInput
						maxLength={2}
						value={quantity.toString()}
						keyboardType={'numeric'}
						onChangeText={(text) => changeValue(+text || 1)}
					/>
				) : (
					<QuantityText>{quantity}</QuantityText>
				)}
			</QuantityView>

			<TouchIcon
				isInput={isInput}
				disabled={quantity >= 99}
				onPress={() => changeValue(quantity + 1)}
			>
				<IconPlusClean disabled={quantity >= 99} />
			</TouchIcon>
		</Container>
	);
};

const borderCss = css``;

const Container = styled(RowView)`
	border-radius: ${({theme}) => theme.borderRadiusSmall};
	background-color: ${({theme}) => theme.colors.gray_400};
`;

const QuantityView = styled.View<Props>`
	padding: 10px;
	align-items: center;
	justify-content: center;
	${({isInput}) => (isInput ? borderCss : '')}
`;
const TouchIcon = styled.TouchableOpacity<Props & {left?: boolean}>`
	margin-horizontal: 10px;
	justify-content: center;
	${({left}) => (left ? 'margin-right' : 'margin-left')}: 5px;
	${({left}) => (left ? '' : 'align-items: flex-end;')}
	${({isInput}) => (!isInput ? 'align-items:center;' : '')}
    ${({isInput}) => (!isInput ? borderCss : '')}
`;
const QuantityText = styled(TextSmall)``;
const QuantityInput = styled.TextInput`
	${textSmallCss}
`;

export default TouchQuantity;
