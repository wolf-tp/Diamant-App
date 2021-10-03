import React, {useState, useEffect} from 'react';
import {
	betweenContent,
	centerItemsCss,
	marginContainerCss,
	RowView,
	TextSmall,
} from 'app/styles/globalStyled';
import styled from 'app/styles/styled';
import {IconCartCircle} from './icons/Icons';
import Logo from './Logo';
import UserHeader from './UserHeader';
import {navigate} from 'app/navigation/rootNavigation';
import {useAppDispatch, useAppSelector} from 'app/redux/store/hooks';
import {fetchCountCart, getCartCount} from 'app/screens/home/reducer';

const HeaderApp = () => {
	const dispatch = useAppDispatch();
	const countCart = useAppSelector(getCartCount);
	useEffect(() => {
		dispatch(fetchCountCart());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const [headerHeight, setHeaderHeight] = useState(0);
	return (
		<Container onLayout={(event) => setHeaderHeight(event.nativeEvent.layout.height)}>
			<Logo />
			<RowBetween>
				{/* Left address view */}
				<UserHeader headerHeight={headerHeight} />
				{/* Avatar */}
				<ViewCart>
					<IconCartCircle onPress={() => navigate('Cart')} />
					{countCart ? (
						<Badge>
							<TextBadge>{countCart}</TextBadge>
						</Badge>
					) : null}
				</ViewCart>
			</RowBetween>
		</Container>
	);
};

const Container = styled.SafeAreaView`
	background-color: ${({theme}) => theme.colors.background};
`;

const Badge = styled.View`
	width: 20px;
	height: 20px;
	border-radius: 100px;
	position: absolute;
	right: -5px;
	background-color: #dc3545;
	align-items: center;
	justify-content: center;
`;
const TextBadge = styled(TextSmall)`
	font-size: 12px;
	color: white;
	font-weight: bold;
	align-self: center;
	position: absolute;
`;
const ViewCart = styled.View``;

const RowBetween = styled(RowView)`
	${betweenContent}
	${centerItemsCss}
	${marginContainerCss}
`;

export default HeaderApp;
