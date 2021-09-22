import {
	IconNotification,
	IconListOrders,
	IconFavourite,
	IconHome,
} from 'app/components/icons/Icons';
import Notifications from 'app/screens/Notifications';
import ListOrders from 'app/screens/ListOrders';
import Favourite from 'app/screens/Favourite';
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
		name: 'Favourite',
		component: Favourite,
		Icon: IconFavourite,
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
