import PushNotificationIOS from '@react-native-community/push-notification-ios';
import {Alert} from 'react-native';
import PushNotification, {Importance, ReceivedNotification} from 'react-native-push-notification';

export let fcm_token = '';

type NotificationType = Omit<ReceivedNotification, 'userInfo'>;
const onClickNotification = (notification: NotificationType) => {
	console.log('Notification Data', notification.data);
	// Alert.alert('NotificationData', JSON.stringify(notification.data));
};

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
		console.log(token);
		fcm_token = token.token;
	},

	onNotification: function (notification: NotificationType) {
		console.log('NOTIFICATION:', notification);
		notification.userInteraction
			? onClickNotification(notification)
			: PushNotification.localNotification({
					...notification,
					message: notification.message as string,
					channelId: 'diamant-channel',
			  });

		notification?.finish?.(PushNotificationIOS.FetchResult.NoData);
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
