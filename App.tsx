import React from 'react';
import {Provider} from 'react-redux';
import {store} from './src/app/redux/store';
import RootScreen from './src/app/navigation';
import ThemeProvider from 'app/styles';
import ModalPopup from 'app/components/modal';
import {StatusBar} from 'react-native';
import {myTheme} from 'app/styles/theme';
import ToastCart from 'app/components/ToastCart';

interface Props {}

const App = (_props: Props) => {
	return (
		<Provider store={store}>
			<ThemeProvider>
				<StatusBar barStyle={'light-content'} backgroundColor={myTheme.colors.background} />
				<RootScreen />
				<ModalPopup />
				<ToastCart />
			</ThemeProvider>
		</Provider>
	);
};

export default App;
