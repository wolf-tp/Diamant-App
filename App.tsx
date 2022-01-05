import React from 'react';
import {Provider} from 'react-redux';
import {store} from './src/app/redux/store';
import RootScreen from './src/app/navigation';
import ThemeProvider from 'app/styles';
import ModalPopup from 'app/components/modal';
import {StatusBar} from 'react-native';
import {myTheme} from 'app/styles/theme';
import {toastConfig} from 'app/components/ToastCart';
import {Container} from 'app/styles/globalStyled';
import Toast from 'react-native-toast-message';

interface Props {}

const App = (_props: Props) => {
	return (
		<Provider store={store}>
			<ThemeProvider>
				<Container notPadding>
					<StatusBar barStyle={'light-content'} backgroundColor={myTheme.colors.background} />
					<RootScreen />
					<ModalPopup />
					<Toast config={toastConfig} />
				</Container>
			</ThemeProvider>
		</Provider>
	);
};

export default App;
