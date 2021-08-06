import React from 'react';
import {Provider} from 'react-redux';
import {store} from './src/app/redux/store';
import RootScreen from './src/app/navigation';
import ThemeProvider from 'app/styles';
// import {decrement, isLoadingCounting, selectCount} from 'app/features/counter/counterSlice';
// import {useAppDispatch, useAppSelector} from 'app/redux/store/hooks';
// import {incrementSaga} from 'app/features/counter/counterSlice';

interface Props {}

const App = (_props: Props) => {
	return (
		<Provider store={store}>
			<ThemeProvider>
				<RootScreen />
			</ThemeProvider>
		</Provider>
	);
};
// const CountingScreen = () => {
// 	const countNumber = useAppSelector(selectCount);
// 	const isLoading = useAppSelector(isLoadingCounting);
// 	const dispatch = useAppDispatch();
// 	return (
// 		<Container>
// 			<TextNormal>{`Number count is ${countNumber}`}</TextNormal>
// 			<Row>
// 				<ButtonSelect
// 					children={'+'}
// 					loading={isLoading}
// 					onPress={() => dispatch(incrementSaga(1))}
// 				/>
// 				<ButtonSelect children={'-'} onPress={() => dispatch(decrement())} />
// 			</Row>
// 		</Container>
// 	);
// };
// const SwitchUIMode = styled.Switch`
// 	margin-top: ${({theme}) => theme.scaping(10)};
// `;

// const Container = styled.View`
// 	padding-top: 50px;
// 	padding-horizontal: 20px;
// `;
// const Row = styled.View`
// 	flex-direction: row;
// 	justify-content: space-around;
// `;
// const ButtonSelect = styled(Button)`
// 	margin-top: ${(props) => props.theme.scaping(2)};
// 	flex: 0.45;
// `;
// const TextNormal = styled.Text`
// 	font-size: ${({theme}) => theme.font.fontLarge};
// 	font-weight: ${({theme}) => theme.font.normal};
// 	margin-vertical: ${({theme}) => theme.scaping(2)};
// 	text-align: center;
// 	font-family: Montserrat Alternates;
// `;

export default App;
