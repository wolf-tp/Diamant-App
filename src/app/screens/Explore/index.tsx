import React, {useState} from 'react';
import styled from 'app/styles/styled';
import {Container, spaceTextHeader, textLargeCss} from 'app/styles/globalStyled';
import SearchInput from 'app/components/group/SearchInput';
import CardStore from 'app/components/CardStore';

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
const Explore = () => {
	const [searchValue, setSearchValue] = useState('');
	const [CardStoreItem] = useState(ExampleData);
	const onChangeValue = (text: string) => {
		setSearchValue(text);
	};
	const renderItemStore = ({item}: {item: CartDataItem}) => (
		<CardStore source={require('images/storeItem_2.png')} content={item.title} />
	);
	return (
		<Container>
			<TextHeader>Find Product</TextHeader>
			<SearchInput
				editable={true}
				placeholder={'Search for store'}
				value={searchValue}
				onChangeText={onChangeValue}
			/>
			<ListItem
				showsVerticalScrollIndicator={false}
				columnWrapperStyle={{justifyContent: 'space-between'}}
				data={CardStoreItem}
				numColumns={2}
				renderItem={renderItemStore as any}
				keyExtractor={(_, _index) => `store_${_index.toString()}`}
			/>
		</Container>
	);
};

const TextHeader = styled.Text`
	${textLargeCss}
	${spaceTextHeader}
	font-weight: bold;
`;
const ListItem = styled.FlatList`
	margin-top: 12px;
`;
export default Explore;
