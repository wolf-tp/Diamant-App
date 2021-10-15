import {navigate} from 'app/navigation/rootNavigation';
import {useAppDispatch} from 'app/redux/store/hooks';
import {setIndexHome} from 'app/screens/home/reducer';
import {readPrivateNotification} from 'app/screens/Notifications/reducer';
import {cartCss, RowBetween, TextMedium, TextMediumLarge} from 'app/styles/globalStyled';
import styled, {css} from 'app/styles/styled';
import {findTabHome} from 'app/utilities';
import React, {useCallback, useState} from 'react';

const maxLineHide = 3;

const NotificationCard = ({title, content, product_id, category_id, id, isRead}: Notifications) => {
	const dispatch = useAppDispatch();
	const [showMore, setShowMore] = useState(false);
	const [isFullText, setIsFullText] = useState(false);

	const onTextLayout = useCallback((e) => {
		setShowMore(e.nativeEvent.lines.length >= maxLineHide);
	}, []);

	const toggleNumberOfLines = () => {
		setIsFullText(!isFullText);
	};
	return (
		<Container
			onPress={() => {
				dispatch(readPrivateNotification(id));
				if (product_id) {
					navigate('ProductDetail', {id: product_id});
					return;
				}
				const indexHome = findTabHome(category_id);
				dispatch(setIndexHome(indexHome));
				navigate('HomeStack');
			}}
			isRead={isRead}
		>
			<RowBetween>
				<Title>{title}</Title>
				{/* <Time>12:07</Time> */}
			</RowBetween>
			<Content
				onTextLayout={onTextLayout}
				ellipsizeMode={'tail'}
				numberOfLines={isFullText ? undefined : maxLineHide}
			>
				{content}
			</Content>
			{showMore ? (
				<ShowMoreText onPress={toggleNumberOfLines}>{isFullText ? 'Less' : 'More'}</ShowMoreText>
			) : null}
		</Container>
	);
};
const containerCss = css<{isExpanded?: boolean}>`
	margin-top: ${({theme}) => theme.scapingElement};
	padding-bottom: ${({theme}) => theme.scaping(2)};
	padding-horizontal: ${({theme}) => theme.scaping(2)};
	z-index: -1;
	${cartCss}
`;
const Container = styled.TouchableOpacity<{isExpanded?: boolean; isRead?: boolean}>`
	${containerCss}
	opacity:${({isRead}) => (isRead ? 0.7 : 1)};
`;

const Title = styled(TextMediumLarge)`
	color: ${({theme}) => theme.colors.main};
`;
const Content = styled(TextMedium)`
	margin-top: ${({theme}) => theme.scaping(1)};
	color: ${({theme}) => theme.colors.text};
	font-weight: 400;
`;
const ShowMoreText = styled(TextMedium)`
	margin-top: ${({theme}) => theme.scaping(1)};
	color: ${({theme}) => theme.colors.main};
	font-weight: bold;
`;

export default NotificationCard;
