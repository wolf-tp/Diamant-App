import React, {useEffect, useState} from 'react';
import {Provider} from 'react-redux';
import {store} from './src/app/redux/store';
import RootScreen from './src/app/navigation';
import ThemeProvider from 'app/styles';
import {getKey, setKey} from 'app/utils/storage';
import {FIRST_INSTALL} from 'app/utils/storage/constants';
import SplashScreen from 'react-native-splash-screen';

interface Props {}

const App = (_props: Props) => {
	const [app, setApp] = useState<App>();

	const initApp = async () => {
		//is into IntroScreen
		const isFirstTime = !(await getKey<boolean>(FIRST_INSTALL));
		isFirstTime && setKey(FIRST_INSTALL, true);
		setApp({isFirstTime});
		SplashScreen.hide();
	};

	useEffect(() => {
		initApp();
	}, []);
	return (
		<Provider store={store}>
			<ThemeProvider>{app && <RootScreen isFirstTime={app.isFirstTime} />}</ThemeProvider>
		</Provider>
	);
};

export default App;
