import {RowBetween, TextLarge, TextMedium} from 'app/styles/globalStyled';
import styled from 'app/styles/styled';
import React, {useEffect, useState} from 'react';
import {ViewStyle} from 'react-native';
import CardFood from './CardFood';

interface Props {
	data?: Product[];
	subCategories?: Categories[];
	alwayFavorite?: boolean;
	style?: ViewStyle;
}
type ItemProduct = Product & CategorySubTitle;

const ProductList = ({data = [], subCategories, alwayFavorite, style}: Props) => {
	const [listData, setListData] = useState<ItemProduct[]>([]);

	useEffect(() => {
		const _listData: ItemProduct[] = [];
		_listData.push(...data);

		subCategories?.forEach((category) => {
			_listData.push({categoryTitle: category.name, totalCount: category.products?.length ?? 0});
			_listData.push(...(category.products || []));
		});
		setListData(_listData);
	}, [data, subCategories]);

	const renderItemProduct = ({item}: {item: ItemProduct}) => {
		return item.categoryTitle ? (
			<TitleCategoryComponent title={item.categoryTitle} count={item.totalCount} />
		) : (
			<CardProduct alwayFavorite={alwayFavorite} product={item} />
		);
	};

	return (
		<ListProductComponent
			style={style}
			data={listData || []}
			showsVerticalScrollIndicator={false}
			renderItem={renderItemProduct as any}
			keyExtractor={(_, _index) => `product_${_index.toString()}`}
		/>
	);
};

type TitleCategoryProps = {title: string; count: number | undefined; onPress?: () => void};
const TitleCategoryComponent = ({title, count}: TitleCategoryProps) => (
	<RowBetweenTitle>
		<TextTitleCategoryComponent>{title}</TextTitleCategoryComponent>
		<TouchModeCategoryComponent>
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
