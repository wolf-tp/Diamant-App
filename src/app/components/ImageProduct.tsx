import React, {useEffect, useState} from 'react';
import styled, {css} from 'app/styles/styled';
import {IconFavoriteProduct} from './icons/Icons';
import {screenWidth} from 'app/styles/dimens';
import {ViewStyle} from 'react-native';
import FastImage from 'react-native-fast-image';
import {getPendingIdFavorite, toggleFavorite} from 'app/screens/home/reducer';
import {useAppDispatch, useAppSelector} from 'app/redux/store/hooks';
import {getAppTheme} from 'app/styles/reducer';
import {isValidImage} from 'app/utilities';

interface Props {
	style?: ViewStyle;
	image?: string;
	is_favorite?: boolean;
	id?: number;
	isLargeAvatar?: boolean;
}

const ImageProduct = ({id, is_favorite, image, style, isLargeAvatar}: Props) => {
	const dispatch = useAppDispatch();
	const theme = getAppTheme();
	const [isLoadingFavorite, setIsLoading] = useState(false);
	const isLoading = useAppSelector(getPendingIdFavorite) === id;

	useEffect(() => {
		isLoading ? setIsLoading(true) : setTimeout(() => setIsLoading(false), 200);
	}, [isLoading]);

	return (
		<ViewImage isLargeAvatar={isLargeAvatar} style={style}>
			<UrlImage source={isValidImage(image)} />
			{isLoadingFavorite ? (
				<ViewIcon>
					<Loading color={'white'} size={'small'} />
				</ViewIcon>
			) : (
				<TouchFavorite
					onPress={() => {
						dispatch(toggleFavorite({product_id: id}));
					}}
				>
					<IconFavoriteProduct color={is_favorite ? theme.colors.main : undefined} />
				</TouchFavorite>
			)}
		</ViewImage>
	);
};

const IMAGE_SIZE_FULL = screenWidth / 3;
const IMAGE_CARD_SMALL = screenWidth / 4.5;

const UrlImage = styled(FastImage)`
	width: 100%;
	height: 100%;
	resize-mode: stretch;
`;
const touchIconCss = css`
	position: absolute;
	right: ${({theme}) => theme.scaping(1)};
	top: ${({theme}) => theme.scaping(1)};
	border-radius: ${({theme}) => theme.scaping(5)};
`;
const ViewImage = styled.View<{isLargeAvatar?: boolean}>`
	width: ${({isLargeAvatar}) => (isLargeAvatar ? IMAGE_SIZE_FULL : IMAGE_CARD_SMALL)}px;
	height: ${({isLargeAvatar}) => (isLargeAvatar ? IMAGE_SIZE_FULL : IMAGE_CARD_SMALL) * 1.24}px;
	overflow: hidden;
	border-radius: ${({theme}) => theme.scaping(1.5)};
`;
const ViewIcon = styled.View`
	${touchIconCss}
`;
const TouchFavorite = styled.TouchableOpacity`
	${touchIconCss}
`;
const Loading = styled.ActivityIndicator``;

export default ImageProduct;
