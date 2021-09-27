import React, {useState} from 'react';
import {ViewProps} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import styled from 'app/styles/styled';
import Button from './Button';
import {
	AreaContainer,
	Container,
	KeyboardContainer,
	rowCss,
	TextMediumLarge,
} from 'app/styles/globalStyled';
import TouchArrow from './TouchArrow';
import {getTranslate} from 'app/locate/reducer';
interface Props {
	style?: ViewProps;
	isShowModal?: boolean;
	event?: () => void;
}

const DropUp = ({style, isShowModal, event}: Props) => {
	const getString = getTranslate();
	const [value, onChangeText] = useState('');
	const [date, setDate] = useState({
		date: new Date(),
		dateString: moment(new Date()).format('YYYY/MM/DD'),
	});

	const [show, setShow] = useState(false);
	const onChange = (events: any, selectedDate: any) => {
		const currentDate = selectedDate || date;
		setShow(false);
		setDate({date: currentDate, dateString: moment(currentDate).format('YYYY-MM-DD')});
	};
	return (
		<CustomModal animationType={'slide'} visible={isShowModal}>
			<AreaContainer>
				<KeyboardContainer notPadding scrollEnabled={false}>
					<CustomTouchArrow event={event} />
					<Container {...style}>
						<Title>{getString('DropUp', 'ChooseDate')}</Title>
						<CustomRowView horizontal showsHorizontalScrollIndicator={false}>
							<DateButton>{getString('DropUp', 'Today')}</DateButton>
							<DateButton>{getString('DropUp', 'Today')}</DateButton>
							<DateButton>{getString('DropUp', 'Difference')}</DateButton>
						</CustomRowView>
						<Title>{getString('DropUp', 'ChooseDifferenceDate')}</Title>
						<ChooseDateButton onPress={() => setShow(true)}>
							{getString('DropUp', 'OrderDate')}
						</ChooseDateButton>
						<Title>{getString('DropUp', 'Note')}</Title>
						<TextInputView>
							<CustomTextInput
								maxLength={240}
								onChangeText={(text) => onChangeText(text)}
								value={value}
								multiline
								numberOfLines={8}
							/>
						</TextInputView>
						<SubmitButton>{getString('DropUp', 'Submit')}</SubmitButton>
						{show && (
							<DateTimePicker
								testID={'dateTimePicker'}
								value={date.date}
								mode={'date'}
								is24Hour={true}
								display={'default'}
								onChange={onChange}
							/>
						)}
					</Container>
				</KeyboardContainer>
			</AreaContainer>
		</CustomModal>
	);
};
const CustomModal = styled.Modal``;
const CustomRowView = styled.ScrollView`
	margin-bottom: ${({theme}) => theme.scapingElement};
	${rowCss}
`;
const DateButton = styled(Button)`
	margin-right: ${({theme}) => theme.scaping(2)};
	padding-vertical: ${({theme}) => theme.scaping(2)};
	padding-horizontal: ${({theme}) => theme.scaping(3)};
`;
const ChooseDateButton = styled(Button)`
	align-self: center;
	margin-bottom: ${({theme}) => theme.scapingElement};
	padding-vertical: ${({theme}) => theme.scaping(2)};
	padding-horizontal: ${({theme}) => theme.scaping(10)};
`;
const CustomTouchArrow = styled(TouchArrow)`
	padding: ${({theme}) => theme.scaping(3)};
	background-color: ${({theme}) => theme.colors.background};
`;
const Title = styled(TextMediumLarge)`
	font-weight: 600;
	color: ${({theme}) => theme.colors.white};
	margin-bottom: ${({theme}) => theme.scapingElement};
`;
const TextInputView = styled.View`
	height: ${({theme}) => theme.scaping(25)};
	border: 1px;
	border-radius: ${({theme}) => theme.borderRadiusSmall};
	border-color: ${({theme}) => theme.colors.white};
	margin-bottom: ${({theme}) => theme.scapingElement};
`;
const CustomTextInput = styled.TextInput`
	color: ${({theme}) => theme.colors.white};
	padding-horizontal: ${({theme}) => theme.scaping(2)};
	flex: 1;
`;
const SubmitButton = styled(Button)`
	margin-left: auto;
	margin-right: auto;
	padding-vertical: ${({theme}) => theme.scaping(3)};
	padding-horizontal: ${({theme}) => theme.scaping(10)};
`;
export default DropUp;
