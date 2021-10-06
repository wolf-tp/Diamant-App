import React, {useState} from 'react';
import {AreaContainer, Container, RowBetween, TextLarge} from 'app/styles/globalStyled';
import styled from 'app/styles/styled';
import {getTranslate} from 'app/locate/reducer';
import {Switch} from 'react-native-gesture-handler';

const Setting = () => {
	const [notifications, setNotifications] = useState(false);
	const getString = getTranslate();
	return (
		<ContainerApp>
			<AreaContainer notPadding>
				<Option title={getString('Setting', 'TurnNotification')}>
					<Switch value={notifications} onResponderEnd={() => setNotifications(!notifications)} />
				</Option>
			</AreaContainer>
		</ContainerApp>
	);
};

const ContainerApp = styled(Container)`
	padding-top: ${({theme}) => theme.scaping(2)};
`;

type OptionProps = {title: string; children: string | React.ReactChild};
const Option = ({title, children}: OptionProps) => (
	<RowBetween>
		<Title>{title}</Title>
		{children}
	</RowBetween>
);
const Title = styled(TextLarge)``;
export default Setting;
