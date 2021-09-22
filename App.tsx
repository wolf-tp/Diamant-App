import React, {useEffect, useState} from 'react';
import {Provider} from 'react-redux';
import {store} from './src/app/redux/store';
import RootScreen from './src/app/navigation';
import ThemeProvider from 'app/styles';
import ModalPopup from 'app/components/modal';
import {StatusBar} from 'react-native';

interface Props {}

const App = (_props: Props) => {
	return (
		<Provider store={store}>
			<ThemeProvider>
				<StatusBar barStyle={'light-content'} />
				<RootScreen />
				<ModalPopup />
			</ThemeProvider>
		</Provider>
	);
};

export default App;
