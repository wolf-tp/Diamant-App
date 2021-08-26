import {
	IconAccount,
	IconCart,
	IconExplore,
	IconFavourite,
	IconHome,
} from 'app/components/icons/Icons';
import Account from 'app/screens/Account';
import Cart from 'app/screens/Cart';
import Explore from 'app/screens/Explore';
import Favourite from 'app/screens/Favourite';
import Home from 'app/screens/home';
import {SvgProps} from 'react-native-svg';

const dataTab: TabScreen[] = [
	{
		name: 'Home',
		component: Home,
		Icon: IconHome,
	},
	{
		name: 'Explore',
		component: Explore,
		Icon: IconExplore,
	},
	{
		name: 'Cart',
		component: Cart,
		Icon: IconCart,
	},
	{
		name: 'Favourite',
		component: Favourite,
		Icon: IconFavourite,
	},
	{
		name: 'Account',
		component: Account,
		Icon: IconAccount,
	},
];
interface TabScreen {
	name: string;
	component: any;
	Icon: (props: SvgProps) => JSX.Element;
}
export default dataTab;
