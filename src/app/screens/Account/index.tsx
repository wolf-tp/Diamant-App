import Button from 'app/components/Button';
import {
	IconAbout,
	IconDeliveryAddress,
	IconHelp,
	IconLogout,
	IconMyDetail,
	IconNotificationAccount,
	IconOrder,
} from 'app/components/icons/Icons';
import RowContentTouch from 'app/components/RowContentTouch';
import UserCard from 'app/components/UserCard';
import {navigate} from 'app/navigation/rootNavigation';
import {AreaContainer, Container, rowCss, TextLarge} from 'app/styles/globalStyled';
import styled from 'app/styles/styled';
import React from 'react';

const Account = () => {
	return (
		<ParentView>
			<ContainerView>
				<UserCard />
				<Container>
					<TouchRow Icon={IconOrder} content={'Order'} onPress={() => navigate('TrackingOrder')} />
					<TouchRow Icon={IconMyDetail} content={'My Details'} />
					<TouchRow Icon={IconDeliveryAddress} content={'Delivery Address'} />
					<TouchRow Icon={IconNotificationAccount} content={'Notifications'} />
					<TouchRow Icon={IconHelp} content={'Help'} />
					<TouchRow Icon={IconAbout} content={'ABout'} />
					<LogoutView>
						<LogoutButton>
							<IconLogout />
							<LogoutText>Logout</LogoutText>
						</LogoutButton>
					</LogoutView>
				</Container>
			</ContainerView>
		</ParentView>
	);
};
const ContainerView = styled.View`
	flex: 1;
	padding-vertical: 10px;
`;

const ParentView = styled(AreaContainer)`
	padding-vertical: 10px;
`;
const TouchRow = styled(RowContentTouch)`
	margin-vertical: 8px;
`;
const LogoutView = styled.View`
	flex: 1;
	justify-content: flex-end;
`;
const LogoutButton = styled(Button)`
	justify-content: center;
	background-color: #ffead3;
	${rowCss}
`;
const LogoutText = styled(TextLarge)`
	padding-left: ${({theme}) => theme.scaping(2)};
	color: ${({theme}) => theme.colors.main};
`;

export default Account;
