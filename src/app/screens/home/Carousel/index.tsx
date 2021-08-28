/* eslint-disable react-hooks/exhaustive-deps */
import {screenWidth} from 'app/styles/dimens';
import styled from 'app/styles/styled';
import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';

const CarouselCardWidth = screenWidth - 50;
const CarouselCardHeight = (CarouselCardWidth * 172) / 426;

interface Props {
	data?: Item[];
}
interface Item {
	url: string | any;
}

const CarouselHome = ({data: dataProps}: Props) => {
	const [data, setData] = useState<Item[]>([
		{url: require('images/template/banner1.png')},
		{url: require('images/template/banner2.png')},
	]);
	const [activeIndex, setActiveIndex] = useState(0);

	useEffect(() => {
		dataProps && setData(dataProps);
	}, []);

	const _renderImage = ({item}: {item: Item}) => (
		<CarouselCard>
			<Banner style={styles.itemBanner} source={item.url} />
		</CarouselCard>
	);

	return (
		<View>
			<Carousel
				renderItem={_renderImage}
				layoutCardOffset={9}
				windowSize={1}
				data={data}
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
				dotsLength={data.length}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {marginVertical: 20},
	itemBanner: {width: '100%', height: '100%', resizeMode: 'stretch'},
	dotStyle: {width: 20, backgroundColor: '#53B175', margin: 0},
	inActiveDot: {width: 15, aspectRatio: 1, backgroundColor: '#030303'},
	containerStyle: {position: 'absolute', width: '100%', bottom: 5, margin: 0, padding: 0},
});

const Banner = styled.Image``;

const CarouselCard = styled.TouchableOpacity`
	width: ${CarouselCardWidth}px;
	height: ${CarouselCardHeight}px;
	border-radius: 10px;
	overflow: hidden;
`;

export default CarouselHome;
