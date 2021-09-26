import RoundedTab from 'app/components/RoundedTab';
import {getTranslate} from 'app/locate/reducer';
import {containerCss} from 'app/styles/globalStyled';
import styled from 'app/styles/styled';
import React from 'react';

interface Props {}

const Notifications = (_: Props) => {
	const getString = getTranslate();
	return (
		<NotificationTab
			routes={[
				{key: 'Favorite', title: getString('Notifications', 'StatusOrder')},
				{key: 'MostOrder', title: getString('Notifications', 'MessageTab')},
			]}
		/>
	);
};
const NotificationTab = styled(RoundedTab)`
	${containerCss}
`;
export default Notifications;
