import {IconNotification, IconListOrders, IconFavorite, IconHome} from 'app/components/icons/Icons';
import Cart from 'app/screens/Cart';
import ConfirmOrder from 'app/screens/ConfirmOrder';
import Favorite from 'app/screens/Favorite';
import Home from 'app/screens/home';
import ListOrders from 'app/screens/ListOrders';
import ListProduct from 'app/screens/ListProduct';
import Login from 'app/screens/login';
import Notifications from 'app/screens/Notifications';
import OrderDetail from 'app/screens/OrderDetail';
import ProductDetail from 'app/screens/ProductDetail';
import Setting from 'app/screens/settings';
import {SvgProps} from 'react-native-svg';
import {RootStackParamList} from '.';

const dataTab: TabScreen[] = [
	{
		name: 'HomeStack',
		title: 'Home',
		Icon: IconHome,
		listChild: ['Home', 'Cart', 'ProductDetail', 'ListProduct', 'ConfirmOrder'],
	},
	{
		name: 'OrdersStack',
		title: 'Orders',
		Icon: IconListOrders,
		listChild: ['ListOrders', 'Cart', 'OrderDetail', 'ConfirmOrder'],
	},
	{
		name: 'FavoriteStack',
		title: 'Favorite',
		Icon: IconFavorite,
		listChild: ['Favorite', 'Cart', 'ProductDetail', 'ConfirmOrder'],
	},
	{
		name: 'NotificationsStack',
		title: 'Notifications',
		Icon: IconNotification,
		listChild: ['Notifications', 'Cart', 'Setting', 'ConfirmOrder', 'OrderDetail', 'ProductDetail'],
	},
];

export const Screens: {[key in keyof RootStackParamList]: any} = {
	Notifications: Notifications,
	Cart: Cart,
	Favorite: Favorite,
	Home: Home,
	ListOrders: ListOrders,
	ListProduct: ListProduct,
	Login: Login,
	OrderDetail: OrderDetail,
	ProductDetail: ProductDetail,
	ConfirmOrder: ConfirmOrder,
	Setting: Setting,
};

export interface ListChildScreen {
	listChild: (keyof RootStackParamList)[];
}
interface TabScreen extends ListChildScreen {
	name: string;
	title: string;
	Icon: (props: SvgProps) => JSX.Element;
}
export default dataTab;
