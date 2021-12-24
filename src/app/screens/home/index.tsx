/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import CarouselHome from './Carousel';
import ProductHome from './ProductsHome';
import SearchInput from 'app/components/group/SearchInput';
import {AreaContainer, Container} from 'app/styles/globalStyled';
import styled from 'app/styles/styled';
import {useAppDispatch, useAppSelector} from 'app/redux/store/hooks';
import {fetchCategories, getHomeTabIndex, setIndexHome} from './reducer';
import useInitAuthorized from 'app/hooks/initAuthedData';
import {getParams} from 'app/navigation/rootNavigation';
import {findTabHome} from 'app/utilities';
type Params = {categoryId: string} & ParamsNotification;
const Home = (props: Navigate<Params>) => {
	useInitAuthorized();
	const dispatch = useAppDispatch();
	const storeIndexHome = useAppSelector(getHomeTabIndex);
	const {isFromNotification, categoryId} = getParams<Params>(props) || {};

	const [indexTabHome, setIndexTabHome] = useState<number>(0);

	useEffect(() => {
		if (storeIndexHome !== undefined) {
			setIndexTabHome(storeIndexHome);
			dispatch(setIndexHome());
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [storeIndexHome]);
	useEffect(() => {
		if (isFromNotification) {
			dispatch(fetchCategories());
			const indexHome = findTabHome(categoryId);
			setIndexTabHome(indexHome || 0);
		}
	}, [categoryId, isFromNotification]);

	return (
		<Container>
			<AreaContainer notPadding>
				<SearchInput />
				{/* Banner Card */}
				<HeaderCarousel setIndexTabHome={setIndexTabHome} />
				{/* Tabhome */}
				<ProductHome indexTabHome={indexTabHome} setIndexTabHome={setIndexTabHome} />
			</AreaContainer>
		</Container>
	);
};
const HeaderCarousel = styled(CarouselHome)``;

export default Home;
