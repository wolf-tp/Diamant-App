import React, {useState, useEffect} from 'react';
import styled from 'app/styles/styled';
import {SceneRendererProps, TabView} from 'react-native-tab-view';
import {useWindowDimensions} from 'react-native';
import CustomTabBar from 'app/components/TabBar';
import ProductList from 'app/components/ProductList';
import {useAppDispatch, useAppSelector} from 'app/redux/store/hooks';
import {fetchCategories, getDataCategories, getStatusCategories} from '../reducer';
import Loading from 'app/components/Loading';

interface Props {}
type HomeTabData = {
	key: string;
	title: string;
	data: Product[];
};

const ProductHome = (_: Props) => {
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
				_routers.push({key: name, title: name, data: category.products || []});
			});
			setRoutes(_routers);
		}
	}, [categories]);

	useEffect(() => {
		dispatch(fetchCategories());
	}, [dispatch]);

	const [index, setIndex] = React.useState(0);

	const renderScene = ({route}: SceneRendererProps & {route: HomeTabData}) => {
		if (routes[index] === route) {
			return isLoading ? <Loading /> : <ProductList data={route.data} />;
		}

		return null;
	};

	return (
		<Container>
			{routes.length ? (
				<HomeTab
					renderTabBar={(_props) => <CustomTabBar {..._props} />}
					lazy
					navigationState={{index, routes}}
					renderScene={renderScene as any}
					onIndexChange={setIndex}
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
export default ProductHome;
