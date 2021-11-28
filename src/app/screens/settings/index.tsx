import React, {useState} from 'react';
import {AreaContainer, Container, RowBetween, TextLarge} from 'app/styles/globalStyled';
import styled from 'app/styles/styled';
import {changeLanguage, getLangName, getTranslate} from 'app/locate/reducer';
import {Switch} from 'react-native-gesture-handler';
import {changeStateReceiveNotification, getStateReceiveNotification} from '../login/reducer';
import {useAppDispatch, useAppSelector} from 'app/redux/store/hooks';
import DropDownPicker, {ItemType} from 'react-native-dropdown-picker';
import {screenWidth} from 'app/styles/dimens';
import {getAppTheme} from 'app/styles/reducer';
import {TextStyle, ViewStyle} from 'react-native';

const Setting = () => {
	const theme = getAppTheme();
	const dispatch = useAppDispatch();
	const getString = getTranslate();

	const isEnableNotification = useAppSelector(getStateReceiveNotification);
	const langName = useAppSelector(getLangName);

	const [showChooseLanguage, setShowChooseLanguage] = useState(false);
	const [items, setItems] = useState<ItemType[]>([]);
	const stylesText: TextStyle = {color: theme.colors.text, fontSize: 18, fontWeight: '600'};
	const container: ViewStyle = {
		backgroundColor: theme.colors.card,
		borderRadius: 15,
		zIndex: 1,
	};
	React.useEffect(() => {
		setItems([
			{label: getString('Setting', 'English'), value: 'en'},
			{label: getString('Setting', 'France'), value: 'fr'},
		]);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [langName]);

	return (
		<ContainerApp>
			<AreaContainer notPadding>
				<Option title={getString('Setting', 'TurnNotification')}>
					<Switch
						value={!!isEnableNotification}
						onResponderEnd={() =>
							dispatch(
								changeStateReceiveNotification({is_receive_notify: Number(!isEnableNotification)})
							)
						}
					/>
				</Option>
				<Option title={getString('Setting', 'Language')}>
					<DropDownPicker
						open={showChooseLanguage}
						setOpen={setShowChooseLanguage}
						containerStyle={{width: screenWidth / 2.3}}
						value={langName}
						items={items}
						setValue={(value) => dispatch(changeLanguage(value()))}
						style={container}
						textStyle={stylesText}
						listItemLabelStyle={{color: theme.colors.text}}
						listItemContainerStyle={{backgroundColor: theme.colors.card}}
						theme={'DARK'}
					/>
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
