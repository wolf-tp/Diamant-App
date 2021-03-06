import PushNotificationIOS from '@react-native-community/push-notification-ios';
import {StackActions} from '@react-navigation/native';
import {navigate, navigationRef} from 'app/navigation/rootNavigation';
import {store} from 'app/redux/store';
import PushNotification, {Importance, ReceivedNotification} from 'react-native-push-notification';

export let fcm_token = '';
type NotificationDataType = {
	orderId?: string;
	productId?: string;
	categoryId?: string;
};
type NotificationType = Omit<ReceivedNotification, 'userInfo'>;
const notiParams: ParamsNotification = {isFromNotification: true};
const onClickNotification = async (notification: NotificationType) => {
	const data: NotificationDataType = notification.data;
	const {orderId, productId, categoryId} = data;
	setTimeout(
		() => {
			if (!store.getState()?.auth.user?.token) return;
			if (orderId) {
				const orderDetailParams = {
					id: orderId,
					code: orderId,
					isDisplayStatus: true,
					...notiParams,
				};
				navigationRef?.current?.getCurrentRoute()?.name === 'OrderDetail'
					? navigationRef?.current?.dispatch(StackActions.replace('OrderDetail', orderDetailParams))
					: navigate('OrderDetail', orderDetailParams);
			} else if (productId) {
				navigate('ProductDetail', {id: productId});
			}
			if (categoryId) {
				navigate('HomeStack', {
					screen: 'Home',
					params: {
						...notiParams,
						categoryId,
					},
				} as any);
			}
		},
		notification.foreground ? 0 : 2000
	);
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
