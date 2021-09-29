import React, {useState} from 'react';
import {ViewProps} from 'react-native';
import {getTranslate} from 'app/locate/reducer';
import {getAppTheme} from 'app/styles/reducer';
import {useAppDispatch, useAppSelector} from 'app/redux/store/hooks';
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
import {getToday} from 'app/utilities/datetime';
import {getCartStatus, order} from 'app/screens/Cart/reducer';
interface Props {
	style?: ViewProps;
	isShowModal?: boolean;
	event?: () => void;
	listProduct: ListProductRequest;
}

type SelectDateType = 'today' | 'tomorrow' | 'anotherDay';

const DropUp = ({style, isShowModal, event, listProduct}: Props) => {
	const getString = getTranslate();
	const dispatch = useAppDispatch();
	const isLoadingSubmit = useAppSelector(getCartStatus) === 'loading';
	const theme = getAppTheme();
	const [text, onChangeText] = useState('');
	const [selectDate, setSelectDate] = useState<SelectDateType>('today');
	const [show, setShow] = useState(false);
	const [date, setDate] = useState({
		date: getToday,
		dateString: moment(getToday).format('YYYY-MM-DD'),
	});

	const onChange = (events: any, selectedDate: any) => {
		const currentDate = selectedDate || date;
		setShow(false);
		if (currentDate.dateString !== date.dateString) {
			setDate({date: currentDate, dateString: moment(currentDate).format('YYYY-MM-DD')});
		}
	};

	return (
		<CustomModal animationType={'slide'} visible={isShowModal}>
			<AreaContainer>
				<KeyboardContainer notPadding scrollEnabled={false}>
					<CustomTouchArrow event={event} />
					<Container {...style}>
						<Title>{getString('DropUp', 'ChooseDate')}</Title>
						<CustomRowView>
							<DateButton
								style={{
									backgroundColor:
										selectDate === 'today' ? theme.colors.orange_100 : theme.colors.gray_300,
								}}
								onPress={() => {
									let today = getToday;
									setSelectDate('today');
									setDate({date: today, dateString: moment(today).format('YYYY-MM-DD')});
								}}
							>
								{getString('DropUp', 'Today')}
							</DateButton>
							<DateButton
								style={{
									backgroundColor:
										selectDate === 'tomorrow' ? theme.colors.orange_100 : theme.colors.gray_300,
								}}
								onPress={() => {
									let tomorrow = new Date();
									tomorrow.setDate(getToday.getDate() + 1);
									setSelectDate('tomorrow');
									setDate({date: tomorrow, dateString: moment(tomorrow).format('YYYY-MM-DD')});
								}}
							>
								{getString('DropUp', 'Today')}
							</DateButton>
						</CustomRowView>
						<Title>{getString('DropUp', 'ChooseDifferenceDate')}</Title>
						<ChooseDateButton
							style={{
								backgroundColor:
									selectDate === 'anotherDay' ? theme.colors.orange_100 : theme.colors.gray_300,
							}}
							onPress={() => {
								setShow(true);
								setSelectDate('anotherDay');
							}}
						>
							{getString('DropUp', 'OrderDate')}
						</ChooseDateButton>
						<Title>{getString('DropUp', 'Note')}</Title>
						<TextInputView>
							<CustomTextInput
								maxLength={240}
								onChangeText={(text) => onChangeText(text)}
								value={text}
								multiline
								numberOfLines={8}
							/>
						</TextInputView>
						<SubmitButton
							loading={isLoadingSubmit}
							onPress={() => {
								const result = Object.keys(listProduct).map((key: string) => [
									Number(key),
									listProduct[key],
								]);
								dispatch(order({products: result, date_of_delivery: date.dateString, note: text}));
							}}
						>
							{getString('DropUp', 'Submit')}
						</SubmitButton>
						{show && (
							<DateTimePicker
								testID={'dateTimePicker'}
								value={date.date}
								mode={'date'}
								is24Hour={true}
								display={'default'}
								onChange={onChange}
								minimumDate={getToday}
							/>
						)}
					</Container>
				</KeyboardContainer>
			</AreaContainer>
		</CustomModal>
	);
};
const CustomModal = styled.Modal``;
const CustomRowView = styled.View`
	margin-bottom: ${({theme}) => theme.scapingElement};
	justify-content: space-between;
	${rowCss}
`;
const DateButton = styled(Button)`
	margin-right: ${({theme}) => theme.scaping(2)};
	padding-vertical: ${({theme}) => theme.scaping(2)};
	padding-horizontal: ${({theme}) => theme.scaping(4.5)};
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
	text-align-vertical: top;
`;
const SubmitButton = styled(Button)`
	margin-left: auto;
	margin-right: auto;
	padding-vertical: ${({theme}) => theme.scaping(3)};
	padding-horizontal: ${({theme}) => theme.scaping(10)};
`;
export default DropUp;
