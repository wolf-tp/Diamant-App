import React, {useEffect, useState} from 'react';
import styled from 'app/styles/styled';
import ImageProduct from './ImageProduct';
import {getTranslate} from 'app/locate/reducer';
import {RowView} from 'app/styles/globalStyled';
import DropDownPicker from 'react-native-dropdown-picker';
import {screenWidth} from 'app/styles/dimens';
import {getAppTheme} from 'app/styles/reducer';
import {TextStyle, ViewStyle} from 'react-native';
interface Props {
	id?: number;
	title?: string;
	unit_weight?: string;
	gen_code?: string;
	image?: string;
	is_favorite?: boolean;
	info?: Array<InfoProduct>;
	changePackaging: (args: number) => void;
}
interface Info {
	label: string;
	value: number;
}

const CartProductDetail = (props: Props) => {
	const {info, title, changePackaging, ...attribute} = props;

	const theme = getAppTheme();
	const container: ViewStyle = {
		backgroundColor: theme.colors.orange_100,
		borderRadius: 15,
		marginTop: 10,
		zIndex: 1,
	};
	const stylesText: TextStyle = {
		color: theme.colors.text,
		marginVertical: 0,
		fontSize: 14,
		fontWeight: '600',
	};
	const [open, setOpen] = useState(false);
	const [value, setValue] = useState<number>(0);
	const [items, setItems] = useState<Array<Info>>([{label: '0Kg', value: 0}]);
	useEffect(() => {
		if (info) {
			const results: Array<Info> = [];
			info.map((val, index) => {
				results.push({
					label: val.unit_weight,
					value: index,
				});
			});
			setItems(results);
		}
	}, [info]);
	useEffect(() => {
		if (changePackaging) {
			changePackaging(value);
		}
	}, [value, changePackaging]);
	const getString = getTranslate();
	return (
		<CartContainer>
			<ImageProductComponent {...attribute} isLargeAvatar />
			<RightCart>
				<RowTitle>
					<Title>{title}</Title>
				</RowTitle>
				<DropDownPicker
					open={open}
					containerStyle={{width: screenWidth / 2.3}}
					value={value}
					items={items}
					setOpen={setOpen}
					setValue={setValue}
					listItemContainerStyle={{width: screenWidth / 2.3}}
					setItems={setItems}
					style={container}
					textStyle={stylesText}
					theme={'DARK'}
					listMode={'SCROLLVIEW'}
					scrollViewProps={{nestedScrollEnabled: true}}
				/>
				<CodeContent>
					<CodeTitle>{getString('ProductDetail', 'GenCode')}</CodeTitle>
					<CodeValue>{info?.length ? info[value].gen_code : '0'}</CodeValue>
				</CodeContent>
			</RightCart>
		</CartContainer>
	);
};

const CartContainer = styled(RowView)`
	width: 100%;
	padding-vertical: 10px;
	flex: 1;
`;
const RightCart = styled.View``;
const RowTitle = styled(RowView)``;

const CodeTitle = styled.Text`
	color: ${({theme}) => theme.colors.orange_100};
`;
const CodeValue = styled.Text`
	width: 100%;
	flex: 1;
	color: ${({theme}) => theme.colors.white};
`;
const CodeContent = styled.View`
	flex-direction: row;
	margin-top: ${({theme}) => theme.scapingElement};
`;
const ImageProductComponent = styled(ImageProduct)`
	margin-right: 12px;
`;
const Title = styled.Text`
	flex: 1;
	font-size: ${({theme}) => theme.font.fontLarge};
	color: ${({theme}) => theme.colors.white};
	margin-top: ${({theme}) => theme.scapingElement};
`;

export default CartProductDetail;
