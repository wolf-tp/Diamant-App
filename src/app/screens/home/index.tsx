import React, {useEffect} from 'react';
import CarouselHome from './Carousel';
import ProductHome from './ProductsHome';
import SearchInput from 'app/components/group/SearchInput';
import {AreaContainer, Container} from 'app/styles/globalStyled';
import styled from 'app/styles/styled';
import {useAppDispatch} from 'app/redux/store/hooks';
import {getProductList} from '../Cart/reducer';

const Home = () => {
	const dispatch = useAppDispatch();
	useEffect(() => {
		dispatch(getProductList());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Container>
			<AreaContainer notPadding>
				<TouchSearch activeOpacity={0.6}>
					<SearchInput editable={false} />
				</TouchSearch>
				{/* Banner Card */}
				<HeaderCarousel />
				{/* Tabhome */}
				<ProductHome />
			</AreaContainer>
		</Container>
	);
};
const HeaderCarousel = styled(CarouselHome)``;

const TouchSearch = styled.TouchableOpacity`
	margin-vertical: ${({theme}) => theme.scaping(1)};
`;

export default Home;
