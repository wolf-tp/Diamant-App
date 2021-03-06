import React, {useCallback, useState} from 'react';
import styled from 'app/styles/styled';
import {Container, EmptyText, RowBetween, TextLarge} from 'app/styles/globalStyled';
import DropDownPicker, {ItemType} from 'react-native-dropdown-picker';
import {TextStyle, ViewStyle} from 'react-native';
import {getAppTheme} from 'app/styles/reducer';
import {isIOS, screenWidth} from 'app/styles/dimens';
import {getTranslate} from 'app/locate/reducer';
import {
	fetchHistoryOrder,
	getDataHistoryOrder,
	getNextPageHistoryOrder,
	getStatusHistoryOrder,
	hasMoreHistoryOrder,
} from './reducer';
import {useAppDispatch, useAppSelector} from 'app/redux/store/hooks';
import OrderCard from 'app/components/OrderCard';
import {myTheme} from 'app/styles/theme';
import RefreshList from 'app/components/RefreshList';
import {fetchCount} from 'app/config';
import {store} from 'app/redux/store';
import Loading from 'app/components/Loading';
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
	const hasMoreOrder = useAppSelector(hasMoreHistoryOrder);

	const [open, setOpen] = useState(false);
	const [value, setValue] = useState(1);
	const [items, setItems] = useState<ItemType[]>([
		{label: getString('Orders', 'FilterMonth'), value: 1},
		{label: getString('Orders', 'ThreeMonth'), value: 3},
		{label: getString('Orders', 'SixMonth'), value: 6},
		{label: getString('Orders', 'CurrentYears'), value: 12},
	]);

	const getHistoryOrder = useCallback(
		(isMore?: boolean) => {
			const globalStore = store.getState();
			(!isMore || hasMoreOrder) &&
				dispatch(
					fetchHistoryOrder({
						range: value,
						page: !isMore ? 1 : getNextPageHistoryOrder(globalStore),
					})
				);
		},
		[dispatch, hasMoreOrder, value]
	);

	const stylesText: TextStyle = {color: theme.colors.text, fontSize: 18, fontWeight: '600'};
	const container: ViewStyle = {
		backgroundColor: theme.colors.card,
		borderRadius: 15,
		zIndex: 1,
	};
	const renderItemProduct = ({item}: {item: ListOrders}) => <OrderCard {...item} />;
	const refreshProps = {refreshing: isLoading, onRefresh: getHistoryOrder};

	return (
		<Container>
			<RowBetween>
				<TitleText>{getString('Orders', 'description')}</TitleText>
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
			<ListOrderComponent
				// eslint-disable-next-line react-native/no-inline-styles
				refreshControl={isIOS ? <RefreshList {...refreshProps} /> : undefined}
				data={(data || []) as any}
				showsVerticalScrollIndicator={false}
				renderItem={renderItemProduct as any}
				keyExtractor={(_, _index) => `product_${_index.toString()}`}
				contentContainerStyle={{paddingBottom: myTheme.scapingNumber(2)}}
				{...refreshProps}
				onEndReached={data && data.length >= fetchCount ? () => getHistoryOrder(true) : undefined}
				onEndReachedThreshold={0.005}
				ListEmptyComponent={<EmptyText>{getString('Global', 'EmptyList')}</EmptyText>}
				ListFooterComponent={hasMoreOrder ? <Loading /> : undefined}
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
