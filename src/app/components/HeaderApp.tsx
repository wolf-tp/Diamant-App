import React, {useState} from 'react';
import {betweenContent, centerItemsCss, marginContainerCss, RowView} from 'app/styles/globalStyled';
import styled from 'app/styles/styled';
import {IconCartCircle} from './icons/Icons';
import Logo from './Logo';
import UserHeader from './UserHeader';
import {navigate} from 'app/navigation/rootNavigation';

const HeaderApp = () => {
	const [headerHeight, setHeaderHeight] = useState(0);
	return (
		<Container onLayout={(event) => setHeaderHeight(event.nativeEvent.layout.height)}>
			<Logo />
			<RowBetween>
				{/* Left address view */}
				<UserHeader headerHeight={headerHeight} />
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
