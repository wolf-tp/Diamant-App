import React, {useState, useEffect} from 'react';
import styled from 'app/styles/styled';
import {SceneRendererProps, TabView} from 'react-native-tab-view';
import {useWindowDimensions} from 'react-native';
import CustomTabBar from 'app/components/TabBar';
import ProductList from 'app/components/ProductList';
import {useAppDispatch, useAppSelector} from 'app/redux/store/hooks';
import {fetchCategories, getDataCategories, getStatusCategories} from '../reducer';
import Loading from 'app/components/Loading';

interface Props {
	indexTabHome: number;
	setIndexTabHome: (index: number) => void;
}

type HomeTabData = {
	key: string;
	title: string;
	data: Categories;
};

const ProductHome = ({indexTabHome, setIndexTabHome}: Props) => {
	const layout = useWindowDimensions();
	const dispatch = useAppDispatch();
	const isLoading = useAppSelector(getStatusCategories) === 'loading';
	const categories = useAppSelector(getDataCategories);

	const [routes, setRoutes] = useState<HomeTabData[]>([]);

	useEffect(() => {
		if (categories) {
			const _routers: HomeTabData[] = [];
			categories.forEach((category) => {
				const name = category.name || '';
				_routers.push({key: name, title: name, data: category || []});
			});
			setRoutes(_routers);
		}
	}, [categories]);

	useEffect(() => {
		!categories?.length && dispatch(fetchCategories());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dispatch]);

	const renderScene = ({route}: SceneRendererProps & {route: HomeTabData}) => {
		if (routes[indexTabHome] === route) {
			return isLoading ? (
				<Loading />
			) : (
				<ProductList data={route.data.products} subCategories={route.data.subCategories} />
			);
		}

		return null;
	};

	return (
		<Container>
			{routes.length ? (
				<HomeTab
					renderTabBar={(_props) => <CustomTabBar {..._props} />}
					lazy
					navigationState={{index: indexTabHome, routes}}
					renderScene={renderScene as any}
					onIndexChange={setIndexTabHome}
					initialLayout={{width: layout.width}}
				/>
			) : (
				<Loading />
			)}
		</Container>
	);
};

const HomeTab = styled(TabView)``;

const Container = styled.View`
	flex: 1;
`;
export default React.memo(ProductHome);
