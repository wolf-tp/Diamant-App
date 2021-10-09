import {navigate} from 'app/navigation/rootNavigation';
import {store} from 'app/redux/store';
import {setBreadCrumbCategoryTitle} from 'app/screens/home/reducer';
import {isIOS} from 'app/styles/dimens';
import {RowBetween, TextLarge, TextMedium} from 'app/styles/globalStyled';
import styled from 'app/styles/styled';
import React, {useEffect, useState} from 'react';
import {ViewStyle} from 'react-native';
import CardFood from './CardFood';
import RefreshList from './RefreshList';

interface Props {
	data?: Product[];
	subCategories?: Categories[];
	alwayFavorite?: boolean;
	style?: ViewStyle;
	refreshing?: boolean;
	onRefresh?: () => void;
}
type ItemProduct = Product & CategorySubTitle;

const ProductList = ({
	data = [],
	subCategories,
	alwayFavorite,
	style,
	refreshing,
	onRefresh,
}: Props) => {
	const [listData, setListData] = useState<ItemProduct[]>([]);

	useEffect(() => {
		const _listData: ItemProduct[] = [];
		_listData.push(...data);

		subCategories?.forEach((category) => {
			_listData.push({
				categoryTitle: category.name,
				totalCount: category.products?.length ?? 0,
				id: category.id,
			});
			_listData.push(...(category.products || []));
		});
		setListData(_listData);
	}, [data, subCategories]);

	const renderItemProduct = ({item}: {item: ItemProduct}) => {
		return item.categoryTitle ? (
			<TitleCategoryComponent title={item.categoryTitle} count={item.totalCount} id={item.id} />
		) : (
			<CardProduct alwayFavorite={alwayFavorite} product={item} />
		);
	};
	const refreshProps = {refreshing, onRefresh};

	return (
		<ListProductComponent
			refreshControl={isIOS ? <RefreshList {...refreshProps} /> : undefined}
			style={style}
			data={listData || []}
			showsVerticalScrollIndicator={false}
			renderItem={renderItemProduct as any}
			keyExtractor={(_, _index) => `product_${_index.toString()}`}
			keyboardShouldPersistTaps={'handled'}
			{...refreshProps}
		/>
	);
};

type TitleCategoryProps = {title: string; count: number | undefined; id?: number};
const TitleCategoryComponent = ({title, count, id}: TitleCategoryProps) => (
	<RowBetweenTitle>
		<TextTitleCategoryComponent>{title}</TextTitleCategoryComponent>
		<TouchModeCategoryComponent
			activeOpacity={0.6}
			onPress={() => {
				store.dispatch(setBreadCrumbCategoryTitle(id!));
				navigate('ListProduct', {id});
			}}
		>
			<MoreTitleCategoryComponent>{`Voir tous (${count})`}</MoreTitleCategoryComponent>
		</TouchModeCategoryComponent>
	</RowBetweenTitle>
);

const RowBetweenTitle = styled(RowBetween)``;

const TextTitleCategoryComponent = styled(TextLarge)`
	margin-left: ${({theme}) => theme.scaping(1)};
	font-weight: bold;
`;

const MoreTitleCategoryComponent = styled(TextMedium)`
	color: ${({theme}) => theme.colors.main};
`;
const TouchModeCategoryComponent = styled.TouchableOpacity`
	border-bottom-color: ${({theme}) => theme.colors.main};
	border-bottom-width: 1px;
`;
const ListProductComponent = styled.FlatList`
	flex: 1;
`;

const CardProduct = styled(CardFood)`
	margin-vertical: ${({theme}) => theme.scaping(2)};
`;

export default ProductList;
