/* eslint-disable react-hooks/exhaustive-deps */
import Loading from 'app/components/Loading';
import {navigate} from 'app/navigation/rootNavigation';
import {store} from 'app/redux/store';
import {useAppDispatch, useAppSelector} from 'app/redux/store/hooks';
import {screenWidth} from 'app/styles/dimens';
import {TextLarge, TextSmall} from 'app/styles/globalStyled';
import styled from 'app/styles/styled';
import {SCAPING_CONTAINER} from 'app/styles/theme';
import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {fetchBanner, getBanner, getDataCategories, getStatusBanner} from '../reducer';

const CarouselCardWidth = screenWidth - SCAPING_CONTAINER * 2;
const CarouselCardHeight = (CarouselCardWidth * 140) / 450;
interface Props {
	setIndexTabHome: (index: number) => void;
}

const CarouselHome = ({setIndexTabHome}: Props) => {
	const dataBanner = useAppSelector(getBanner);
	const isLoadingBanner = useAppSelector(getStatusBanner) === 'loading';
	const dispatch = useAppDispatch();
	const [activeIndex, setActiveIndex] = useState(0);

	useEffect(() => {
		dispatch(fetchBanner());
	}, []);

	const _renderImage = ({
		item: {title, content, isLoading, product_id, category_id = 1},
	}: {
		item: BannerData;
	}) => (
		<CarouselCard
			activeOpacity={0.6}
			onPress={() => {
				if (product_id) {
					navigate('ProductDetail', {id: product_id});
					return;
				}
				const categories = getDataCategories(store.getState());
				const id = categories?.findIndex((category) => {
					if (category.id === category_id) {
						return true;
					}

					return !!category.subCategories?.find((sub) => sub.id === category_id);
				});
				id && setIndexTabHome(id);
			}}
		>
			{!isLoading ? (
				<>
					<TitleText>{title}</TitleText>
					<Content numberOfLines={3} ellipsizeMode={'tail'}>
						{content}
					</Content>
				</>
			) : (
				<Loading />
			)}
		</CarouselCard>
	);

	return isLoadingBanner || dataBanner?.length ? (
		<View>
			<Carousel
				renderItem={_renderImage}
				layoutCardOffset={9}
				windowSize={1}
				data={dataBanner || [{isLoading: isLoadingBanner}]}
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
	) : null;
};

const styles = StyleSheet.create({
	container: {marginTop: 15},
	itemBanner: {width: '100%', height: '100%', resizeMode: 'stretch'},
	dotStyle: {width: 10, backgroundColor: '#C89524', margin: 0, padding: 0},
	inActiveDot: {width: 10, aspectRatio: 1, backgroundColor: '#C4C4C4'},
	containerStyle: {
		position: 'absolute',
		width: '100%',
		bottom: -20,
		margin: 0,
		padding: 0,
	},
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
	margin-top: -${CarouselCardHeight / 6}px;
	text-align: center;
	color: ${({theme}) => theme.colors.text};
	text-transform: uppercase;
`;
const Content = styled(TextSmall)`
	text-align: center;
	margin-top: ${({theme}) => theme.scaping(1)};
	color: ${({theme}) => theme.colors.text};
	padding-horizontal: ${({theme}) => theme.scaping(2)};
`;

export default CarouselHome;
