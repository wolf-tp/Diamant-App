import React from 'react';
import {betweenContent, centerItemsCss, marginContainerCss, RowView} from 'app/styles/globalStyled';
import styled from 'app/styles/styled';
import {IconCartCircle} from './icons/Icons';
import Logo from './Logo';
import UserHeader from './UserHeader';

const HeaderApp = (_: Props) => {
	return (
		<Container>
			<Logo />
			<RowBetween>
				{/* Left address view */}
				<UserHeader />
				{/* Avatar */}
				<IconCartCircle />
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