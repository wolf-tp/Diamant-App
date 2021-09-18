import React from 'react';
import CarouselHome from './Carousel';
import ProductHome from './ProductsHome';
import SearchInput from 'app/components/group/SearchInput';
import {IconCartCircle} from 'app/components/icons/Icons';
import {
	AreaContainer,
	betweenContent,
	centerItemsCss,
	Container,
	RowView,
} from 'app/styles/globalStyled';
import styled from 'app/styles/styled';
import Logo from 'app/components/Logo';
import UserHeader from 'app/components/UserHeader';

const Home = () => {
	return (
		<Container>
			<AreaContainer>
				<Logo />
				<RowBetween>
					{/* Left address view */}
					<UserHeader />
					{/* Avatar */}
					<IconCartCircle />
				</RowBetween>
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
const RowBetween = styled(RowView)`
	${betweenContent}
	${centerItemsCss}
`;
const HeaderCarousel = styled(CarouselHome)``;

const TouchSearch = styled.TouchableOpacity`
	margin-vertical: ${({theme}) => theme.scaping(1)};
`;

export default Home;
