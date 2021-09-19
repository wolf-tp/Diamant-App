import React, {useEffect, useState} from 'react';
import {Provider} from 'react-redux';
import {store} from './src/app/redux/store';
import RootScreen from './src/app/navigation';
import ThemeProvider from 'app/styles';
import ModalPopup from 'app/components/modal';

interface Props {}

const App = (_props: Props) => {
	return (
		<Provider store={store}>
			<ThemeProvider>
				<RootScreen />
				<ModalPopup />
			</ThemeProvider>
		</Provider>
	);
};

export default App;
