declare type ThemeInterface = {
	colors: {main: string; secondary: string} & ColorTheme;
	font: {
		fontMedium: string;
		normal: string;
		bold: string;
		bold_100: string;
		fontLarge: string;
		fontXLarge: string;
		fontFamily: string;
		fontSmall: string;
		fontMediumLarge: string;
	};
} & ScapingTheme;
declare type ScapingTheme = {
	scapingContainer: string;
	scaping: (num: number) => string;
	scapingNumber: (num: number) => number;
	scapingElement: string;
	borderRadius: string;
	borderRadiusSmall: string;
	borderRadiusStand: string;
};
declare type ColorTheme = {
	white: string;
	none: string;
	gray: string;
	red_100: string;
	gray_100: string;
	gray_200: string;
	gray_300: string;
	gray_400: string;
	textColor: string;
	textColor_100: string;
	background: string;
	bottomBarUnFocus: string;
	bottomBarFocus: string;
	orange_100: string;
	backgroundGray: string;
	darkGray: string;
	text: string;
	textGray: string;
	card: string;
	toastBackground: string;
};
