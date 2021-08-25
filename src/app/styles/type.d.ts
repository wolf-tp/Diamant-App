declare type ThemeInterface = {
	colors: {main: string; secondary: string} & ColorTheme;
	font: {
		fontMedium: string;
		normal: string;
		bold: string;
		fontLarge: string;
		fontFamily: string;
	};
} & ScapingTheme;
declare type ScapingTheme = {
	scapingContainer: string;
	scaping: (num: number) => string;
	scapingElement: string;
	borderRadius: string;
};
declare type ColorTheme = {
	white: string;
	none: string;
	gray: string;
	textColor: string;
	background: string;
};
declare type App = {
	isFirstTime?: boolean;
};
