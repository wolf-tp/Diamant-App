declare type ThemeInterface = {
	colors: {main: string; secondary: string} & ColorTheme;
	font: {
		fontMedium: string;
		normal: string;
		bold: string;
		fontLarge: string;
		fontFamily: string;
		fontSmall: string;
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
	gray_100: string;
	gray_200: string;
	textColor: string;
	textColor_100: string;
	background: string;
	bottomBarUnFocus: string;
	bottomBarFocus: string;
	orange_100: string;
};
declare type App = {
	isFirstTime?: boolean;
};
type Product = {
	url?: string;
	title?: string;
	description?: string;
	price?: string | number;
};
