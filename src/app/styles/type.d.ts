declare type ThemeInterface = {
	colors: {main: string; secondary: string} & ColorTheme;
	font: {
		fontMedium: string;
		normal: string;
		bold: string;
		fontLarge: string;
		fontFamily: string;
		fontSmall: string;
		fontMediumLarge: string;
	};
} & ScapingTheme;
declare type ScapingTheme = {
	scapingContainer: string;
	scaping: (num: number) => string;
	scapingElement: string;
	borderRadius: string;
	borderRadiusStand: string;
};
declare type ColorTheme = {
	white: string;
	none: string;
	gray: string;
	red_100: string;
	gray_100: string;
	gray_200: string;
	textColor: string;
	textColor_100: string;
	background: string;
	bottomBarUnFocus: string;
	bottomBarFocus: string;
	orange_100: string;
	backgroundGray: string;
	darkGray: string;
};
declare type App = {
	isFirstTime?: boolean;
};
declare type Product = {
	url?: string;
	title?: string;
	description?: string;
	price?: string | number;
};
declare interface Navigate<T> {
	route?: Route<T>;
}

declare interface Route<T> {
	key?: string;
	name?: string;
	params?: T;
}
