import React from 'react';
import {betweenContent, centerItemsCss, marginContainerCss, RowView} from 'app/styles/globalStyled';
import styled from 'app/styles/styled';
import {IconCartCircle} from './icons/Icons';
import Logo from './Logo';
import UserHeader from './UserHeader';
import {navigate} from 'app/navigation/rootNavigation';

const HeaderApp = () => {
	return (
		<Container>
			<Logo />
			<RowBetween>
				{/* Left address view */}
				<UserHeader />
				{/* Avatar */}
				<IconCartCircle onPress={() => navigate('Cart')} />
			</RowBetween>
		</Container>
	);
};

const Container = styled.SafeAreaView`
	background-color: ${({theme}) => theme.colors.background};
`;

const RowBetween = styled(RowView)`
	${betweenContent}
	${centerItemsCss}
	${marginContainerCss}
`;

export default HeaderApp;
