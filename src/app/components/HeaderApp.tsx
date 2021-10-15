import React, {useState, useEffect} from 'react';
import {
	betweenContent,
	centerItemsCss,
	marginContainerCss,
	RowView,
	TextSmall,
} from 'app/styles/globalStyled';
import styled from 'app/styles/styled';
import {IconCartCircle, IconSetting} from './icons/Icons';
import Logo from './Logo';
import UserHeader from './UserHeader';
import {navigate, navigationRef} from 'app/navigation/rootNavigation';
import {useAppDispatch, useAppSelector} from 'app/redux/store/hooks';
import {fetchCountCart, getCartCount, getTitleSubCategory} from 'app/screens/home/reducer';
import {RootStackParamList} from 'app/navigation';
import {BreadCrumbArray} from './Breadcrumb';

const HeaderApp = () => {
	const dispatch = useAppDispatch();
	const countCart = useAppSelector(getCartCount);
	const breadCrumb = useAppSelector(getTitleSubCategory);
	const [isShowSetting, setIsShowSetting] = useState(false);
	const [showBreadCrumb, setShowBreadCrumb] = useState(false);

	useEffect(() => {
		dispatch(fetchCountCart());
		//callback listener show setting icon
		const listenerSettingNavigation = () => {
			const navName = navigationRef.current?.getCurrentRoute()?.name as keyof RootStackParamList;
			setIsShowSetting(navName === 'Notifications');
			setShowBreadCrumb(navName === 'ListProduct');
		};

		navigationRef.current?.addListener('state', listenerSettingNavigation);

		return () => navigationRef.current?.removeListener('state', listenerSettingNavigation);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const [headerHeight, setHeaderHeight] = useState(0);

	return (
		<Container onLayout={(event) => setHeaderHeight(event.nativeEvent.layout.height)}>
			<Logo />
			<RowBetween>
				{/* Left address view */}
				{showBreadCrumb ? (
					<BreadCrumbArray isPadding isDoubleArray data={breadCrumb} />
				) : (
					<UserHeader headerHeight={headerHeight} />
				)}

				{/* Avatar */}
				<RowView>
					{isShowSetting ? <IconSettingComponent onPress={() => navigate('Setting')} /> : null}

					<ViewCart>
						<IconCartCircle onPress={() => navigate('Cart')} />
						{countCart ? (
							<Badge>
								<TextBadge>{countCart}</TextBadge>
							</Badge>
						) : null}
					</ViewCart>
				</RowView>
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
const IconSettingComponent = styled(IconSetting)`
	margin-right: ${({theme}) => theme.scaping(2)};
`;
const ViewCart = styled.View``;

const RowBetween = styled(RowView)`
	${betweenContent}
	${centerItemsCss}
	${marginContainerCss}
`;

export default HeaderApp;
