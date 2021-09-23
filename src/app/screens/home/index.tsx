import React from 'react';
import CarouselHome from './Carousel';
import ProductHome from './ProductsHome';
import SearchInput from 'app/components/group/SearchInput';
import {AreaContainer, Container} from 'app/styles/globalStyled';
import styled from 'app/styles/styled';

const Home = () => {
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
