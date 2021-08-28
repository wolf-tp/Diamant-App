import React, {useEffect} from 'react';
import {SafeAreaView} from 'react-native';
import CarouselHome from './Carousel';
import ProductHome from './ProductsHome';
import SearchInput from 'app/components/group/SearchInput';
import {IconCheckIn, IconDropdownAddress} from 'app/components/icons/Icons';
import {getTranslate} from 'app/locate/reducer';
import {
	betweenContent,
	centerItemsCss,
	RowView,
	ScrollContainer,
	TextLarge,
	TextMedium,
} from 'app/styles/globalStyled';
import styled from 'app/styles/styled';

const Home = () => {
	const getString = getTranslate();
	return (
		<ScrollContainer>
			<SafeAreaView>
				<RowBetween>
					{/* Left address view */}
					<AddressView>
						<IconCheckIn />
						<AddressText>Dhaka, Banassre</AddressText>
						<IconDropdownAddress />
					</AddressView>
					{/* Avatar */}
					<Avatar source={require('images/template/avatar-home.png')} />
				</RowBetween>
				<TitleQuestion>{getString('Home', 'Question')}</TitleQuestion>
				{/* Input & Carousel */}
				<TouchSearch activeOpacity={0.6}>
					<SearchInput editable={false} />
				</TouchSearch>

				<HeaderCarousel />
				{/* Body */}
				<ProductHome />
			</SafeAreaView>
		</ScrollContainer>
	);
};
const RowBetween = styled(RowView)`
	padding-top: ${({theme}) => theme.scaping(2)};
	${betweenContent}
	${centerItemsCss}
`;
const AddressView = styled(RowView)`
	${centerItemsCss}
`;
const AddressText = styled(TextMedium)`
	padding-left: ${({theme}) => theme.scaping(2)};
	padding-right: ${({theme}) => theme.scaping(1)};
	font-weight: 400;
`;
const Avatar = styled.Image`
	width: 40px;
	aspect-ratio: 1;
	border-radius: 25px;
`;
const TitleQuestion = styled(TextLarge)`
	margin-vertical: ${({theme}) => theme.scapingElement};
`;
const HeaderCarousel = styled(CarouselHome)`
	margin-vertical: 10px;
`;
const TouchSearch = styled.TouchableOpacity``;

export default Home;
