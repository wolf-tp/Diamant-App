import {IconNotification, IconListOrders, IconFavorite, IconHome} from 'app/components/icons/Icons';
import Cart from 'app/screens/Cart';
import Favorite from 'app/screens/Favorite';
import Home from 'app/screens/home';
import ListOrders from 'app/screens/ListOrders';
import ListProduct from 'app/screens/ListProduct';
import Login from 'app/screens/login';
import Notifications from 'app/screens/Notifications';
import OrderDetail from 'app/screens/OrderDetail';
import ProductDetail from 'app/screens/ProductDetail';
import {SvgProps} from 'react-native-svg';
import {RootStackParamList} from '.';

const dataTab: TabScreen[] = [
	{
		name: 'Produits',
		Icon: IconHome,
		listChild: ['Home', 'Cart', 'ProductDetail', 'ListProduct'],
	},
	{
		name: 'List oders',
		Icon: IconListOrders,
		listChild: ['ListOrders', 'Cart', 'OrderDetail'],
	},
	{
		name: 'Favorite',
		Icon: IconFavorite,
		listChild: ['Favorite', 'Cart'],
	},
	{
		name: 'Notifications',
		Icon: IconNotification,
		listChild: ['Notifications', 'Cart'],
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
};

export interface ListChildScreen {
	listChild: (keyof RootStackParamList)[];
}
interface TabScreen extends ListChildScreen {
	name: string;
	Icon: (props: SvgProps) => JSX.Element;
}
export default dataTab;
