import {IconNotification, IconListOrders, IconFavorite, IconHome} from 'app/components/icons/Icons';
import Notifications from 'app/screens/Notifications';
import ListOrders from 'app/screens/ListOrders';
import Favorite from 'app/screens/Favorite';
import Home from 'app/screens/home';
import {SvgProps} from 'react-native-svg';

const dataTab: TabScreen[] = [
	{
		name: 'Produits',
		component: Home,
		Icon: IconHome,
	},
	{
		name: 'List oders',
		component: ListOrders,
		Icon: IconListOrders,
	},
	{
		name: 'Favorite',
		component: Favorite,
		Icon: IconFavorite,
	},
	{
		name: 'Notifications',
		component: Notifications,
		Icon: IconNotification,
	},
];
interface TabScreen {
	name: string;
	component: any;
	Icon: (props: SvgProps) => JSX.Element;
}
export default dataTab;
