/* eslint-disable react-hooks/exhaustive-deps */
import Loading from 'app/components/Loading';
import {useAppDispatch, useAppSelector} from 'app/redux/store/hooks';
import {screenWidth} from 'app/styles/dimens';
import {TextLarge, TextSmall} from 'app/styles/globalStyled';
import styled from 'app/styles/styled';
import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {fetchBanner, getBanner} from '../reducer';

const CarouselCardWidth = screenWidth - 50;
const CarouselCardHeight = (CarouselCardWidth * 160) / 450;

const CarouselHome = () => {
	const dataBanner = useAppSelector(getBanner);
	const dispatch = useAppDispatch();
	const [activeIndex, setActiveIndex] = useState(0);

	useEffect(() => {
		dispatch(fetchBanner());
	}, []);

	const _renderImage = ({item: {title, content, isLoading}}: {item: BannerData}) => (
		<CarouselCard>
			{!isLoading ? (
				<>
					<TitleText>{title}</TitleText>
					<Content>{content}</Content>
				</>
			) : (
				<Loading />
			)}
		</CarouselCard>
	);

	return (
		<View>
			<Carousel
				renderItem={_renderImage}
				layoutCardOffset={9}
				windowSize={1}
				data={dataBanner || [{isLoading: true}]}
				containerCustomStyle={styles.container}
				sliderWidth={CarouselCardWidth}
				itemWidth={CarouselCardWidth}
				inactiveSlideShift={0}
				loop={true}
				loopClonesPerSide={2}
				autoplay={true}
				autoplayDelay={1500}
				autoplayInterval={3000}
				onSnapToItem={(index) => setActiveIndex(index)}
			/>
			<Pagination
				dotStyle={styles.dotStyle}
				inactiveDotStyle={styles.inActiveDot}
				containerStyle={styles.containerStyle}
				activeDotIndex={activeIndex}
				dotsLength={dataBanner?.length ?? 0}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {marginVertical: 20},
	itemBanner: {width: '100%', height: '100%', resizeMode: 'stretch'},
	dotStyle: {width: 10, backgroundColor: '#C89524', margin: 0},
	inActiveDot: {width: 10, aspectRatio: 1, backgroundColor: '#C4C4C4'},
	containerStyle: {position: 'absolute', width: '100%', bottom: 0, margin: 0, padding: 0},
});

const CarouselCard = styled.TouchableOpacity`
	width: ${CarouselCardWidth}px;
	height: ${CarouselCardHeight}px;
	border-radius: ${({theme}) => theme.scaping(4)};
	overflow: hidden;
	background-color: ${({theme}) => theme.colors.card};
	border: 1px solid #53524f;
	justify-content: center;
`;
const TitleText = styled(TextLarge)`
	text-align: center;
	color: ${({theme}) => theme.colors.text};
	text-transform: uppercase;
`;
const Content = styled(TextSmall)`
	text-align: center;
	margin-top: ${({theme}) => theme.scaping(2)};
	color: ${({theme}) => theme.colors.text};
	padding-horizontal: ${({theme}) => theme.scaping(2)};
`;

export default CarouselHome;
