import React, {useState} from 'react';
import styled from 'app/styles/styled';
import {SceneRendererProps, TabView} from 'react-native-tab-view';
import {useWindowDimensions} from 'react-native';
import CustomTabBar from 'app/components/TabBar';
import ProductList from 'app/components/ProductList';

interface Props {}
type HomeTabData = {
	key: string;
	title: string;
	data: Product[];
};

const ProductHome = (_: Props) => {
	const layout = useWindowDimensions();

	const [routes] = useState<HomeTabData[]>([
		{key: 'PATES', title: 'Pâtes', data: fakeData},
		{key: 'TRUFFES', title: 'Truffes', data: fakeData},
		{key: 'SNACKS', title: 'Snacks', data: fakeData},
		{key: 'SAUCE', title: 'Sauce', data: fakeData},
	]);

	const [index, setIndex] = React.useState(0);

	const renderScene = ({route}: SceneRendererProps & {route: HomeTabData}) => {
		if (routes[index] === route) {
			return <ProductList data={route.data} />;
		}

		return null;
	};

	return (
		<Container>
			<HomeTab
				renderTabBar={(_props) => <CustomTabBar {..._props} />}
				lazy
				navigationState={{index, routes}}
				renderScene={renderScene as any}
				onIndexChange={setIndex}
				initialLayout={{width: layout.width}}
			/>
		</Container>
	);
};

const HomeTab = styled(TabView)``;

const Container = styled.View`
	flex: 1;
`;
const fakeData: Product[] = [
	{
		url: require('images/template/product.png'),
		title: 'Tagliattes',
		description:
			'Tagliatelles préparés de façon artisanale à base de produits frais rigoureusement sélectionnés.',
		code: 'TAG',
	},
	{
		url: require('images/template/product.png'),
		title: 'Tagliattes',
		description:
			'Tagliatelles préparés de façon artisanale à base de produits frais rigoureusement sélectionnés.',
		code: 'TAG',
	},
	{
		url: require('images/template/product.png'),
		title: 'Tagliattes',
		description:
			'Tagliatelles préparés de façon artisanale à base de produits frais rigoureusement sélectionnés.',
		code: 'TAG',
	},
	{
		url: require('images/template/product.png'),
		title: 'Tagliattes',
		description:
			'Tagliatelles préparés de façon artisanale à base de produits frais rigoureusement sélectionnés.',
		code: 'TAG',
	},
];

export default ProductHome;
