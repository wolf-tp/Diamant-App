import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification, {Importance} from 'react-native-push-notification';
PushNotification.createChannel(
	{
		channelId: 'diamant-channel',
		channelName: 'Diamant Channel',
		playSound: true,
		soundName: 'default',
		importance: Importance.HIGH,
		vibrate: true,
	},
	() => {}
);

PushNotification.configure({
	onRegister: function (token) {
		console.log('TOKEN:', token);
	},

	onNotification: function (notification) {
		console.log('NOTIFICATION:', notification);
		notification.finish(PushNotificationIOS.FetchResult.NoData);
	},

	onAction: function (notification) {
		console.log('ACTION:', notification.action);
		console.log('NOTIFICATION:', notification);
	},

	onRegistrationError: function (err) {
		console.error(err.message, err);
	},

	permissions: {
		alert: true,
		badge: true,
		sound: true,
	},

	popInitialNotification: true,
	requestPermissions: true,
});
