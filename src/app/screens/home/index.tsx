import React, {useEffect, useState} from 'react';
import CarouselHome from './Carousel';
import ProductHome from './ProductsHome';
import SearchInput from 'app/components/group/SearchInput';
import {AreaContainer, Container} from 'app/styles/globalStyled';
import styled from 'app/styles/styled';
import {useAppDispatch} from 'app/redux/store/hooks';
import {getProductList} from '../Cart/reducer';

const Home = () => {
	const dispatch = useAppDispatch();

	const [indexTabHome, setIndexTabHome] = useState<number>(0);
	useEffect(() => {
		dispatch(getProductList());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

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
