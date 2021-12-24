import FirebaseApp from '@react-native-firebase/app';

export const UPLOAD_URL = 'http://3.142.220.3/';
export const API_PREFIX = 'http://3.142.220.3/api/user';
export const fetchCount = 10;

const firebaseConfig = {
	apiKey: 'AIzaSyCsRmks9p8nQM1hdG38Iktm1UTCVfMJSF8',
	authDomain: 'diamant-dab47.firebaseapp.com',
	projectId: 'diamant-dab47',
	storageBucket: 'diamant-dab47.appspot.com',
	messagingSenderId: '866300570722',
	appId: '1:866300570722:web:674bb05d01da121454753b',
	measurementId: 'G-J0KRV7DCVY',
};

!FirebaseApp.apps.length &&
	FirebaseApp.initializeApp(firebaseConfig).finally(() => {
		console.log('FirebaseInit', FirebaseApp.apps.length);
	});
// !FirebaseApp.apps.length &&
// 	FirebaseApp.initializeApp(firebaseConfig).finally(() => {
// 		console.log('FirebaseInit', FirebaseApp.apps.length);
// 	});
