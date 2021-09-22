import React, {useState, useEffect} from 'react';
import styled from 'app/styles/styled';
import {
	Container,
	RowBetween,
	spaceTextHeader,
	TextLarge,
	textLargeCss,
} from 'app/styles/globalStyled';
import SearchInput from 'app/components/group/SearchInput';
import CardStore from 'app/components/CardStore';
import DropDownPicker, {ItemType} from 'react-native-dropdown-picker';
import {StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {getAppTheme} from 'app/styles/reducer';
import {screenWidth} from 'app/styles/dimens';
import {getTranslate} from 'app/locate/reducer';
import {fetchHistoryOrder, getDataHistoryOrder, getStatusHistoryOrder} from './reducer';
import {useAppDispatch, useAppSelector} from 'app/redux/store/hooks';
import OrderCard from 'app/components/OrderCard';
import {myTheme} from 'app/styles/theme';
import Loading from 'app/components/Loading';

const ExampleData = [
	{
		id: '1',
		title: 'Frash Fruits & Vegetable',
		sourceImage: 'title-login.png',
	},
	{
		id: '2',
		title: 'Frash Fruits & Vegetable',
		sourceImage: 'title-login.png',
	},
	{
		id: '3',
		title: 'Frash Fruits & Vegetable',
		sourceImage: 'title-login.png',
	},
	{
		id: '4',
		title: 'Frash Fruits & Vegetable',
		sourceImage: 'title-login.png',
	},
	{
		id: '5',
		title: 'Frash Fruits & Vegetable',
		sourceImage: 'title-login.png',
	},
	{
		id: '6',
		title: 'Frash Fruits & Vegetable',
		sourceImage: 'title-login.png',
	},
	{
		id: '7',
		title: 'Frash Fruits & Vegetable',
		sourceImage: 'title-login.png',
	},
	{
		id: '8',
		title: 'Frash Fruits & Vegetable',
		sourceImage: 'title-login.png',
	},
	{
		id: '9',
		title: 'Frash Fruits & Vegetable',
		sourceImage: 'title-login.png',
	},
];
interface CartDataItem {
	id: string;
	title?: string;
	sourceImage?: string;
}
const ListOrders = () => {
	const theme = getAppTheme();
	const getString = getTranslate();
	const dispatch = useAppDispatch();
	const data = useAppSelector(getDataHistoryOrder);
	const isLoading = useAppSelector(getStatusHistoryOrder) === 'loading';

	const [open, setOpen] = useState(false);
	const [value, setValue] = useState(1);
	const [items, setItems] = useState<ItemType[]>([
		{label: getString('Orders', 'FilterMonth'), value: 1},
		{label: getString('Orders', 'ThreeMonth'), value: 3},
		{label: getString('Orders', 'SixMonth'), value: 6},
		{label: getString('Orders', 'CurrentYears'), value: 12},
	]);

	useEffect(() => {
		dispatch(fetchHistoryOrder({range: value}));
	}, [value, dispatch]);

	const stylesText: TextStyle = {color: theme.colors.text, fontSize: 18, fontWeight: '600'};
	const container: ViewStyle = {
		backgroundColor: theme.colors.card,
		borderRadius: 15,
		zIndex: 1,
	};
	const renderItemProduct = ({item}: {item: ListOrders}) => {
		return <OrderCard {...item} />;
	};

	return (
		<Container>
			<RowBetween>
				<TitleText>Mes commandes</TitleText>
				<DropDownPicker
					open={open}
					containerStyle={{width: screenWidth / 2.3}}
					value={value}
					items={items}
					setOpen={setOpen}
					setValue={setValue}
					setItems={setItems}
					style={container}
					textStyle={stylesText}
					listItemLabelStyle={{color: theme.colors.text}}
					listItemContainerStyle={{backgroundColor: theme.colors.card}}
					theme={'DARK'}
				/>
			</RowBetween>
			{isLoading && <Loading />}
			<ListOrderComponent
				// eslint-disable-next-line react-native/no-inline-styles
				style={{display: isLoading ? 'none' : 'flex'}}
				data={data || []}
				showsVerticalScrollIndicator={false}
				renderItem={renderItemProduct as any}
				keyExtractor={(_, _index) => `product_${_index.toString()}`}
				contentContainerStyle={{paddingBottom: myTheme.scapingNumber(2)}}
			/>
		</Container>
	);
};
const ListOrderComponent = styled.FlatList`
	flex: 1;
	z-index: -1;
`;

const TitleText = styled(TextLarge)`
	font-weight: bold;
	color: ${({theme}) => theme.colors.text};
`;
export default ListOrders;
