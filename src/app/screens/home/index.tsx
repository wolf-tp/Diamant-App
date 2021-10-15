import React, {useEffect, useState} from 'react';
import CarouselHome from './Carousel';
import ProductHome from './ProductsHome';
import SearchInput from 'app/components/group/SearchInput';
import {AreaContainer, Container} from 'app/styles/globalStyled';
import styled from 'app/styles/styled';
import {useAppDispatch, useAppSelector} from 'app/redux/store/hooks';
import {getProductList} from '../Cart/reducer';
import {getHomeTabIndex, setIndexHome} from './reducer';

const Home = () => {
	const dispatch = useAppDispatch();
	const storeIndexHome = useAppSelector(getHomeTabIndex);

	const [indexTabHome, setIndexTabHome] = useState<number>(0);
	useEffect(() => {
		dispatch(getProductList());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		dispatch(getProductList());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (storeIndexHome !== undefined) {
			setIndexTabHome(storeIndexHome);
			dispatch(setIndexHome());
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [storeIndexHome]);

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
