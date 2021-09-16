export const light_theme = {};

const globalFont = {
	fontFamily: 'Montserrat Alternates',
	fontMedium: '14.5px',
	fontSmall: '12.5px',
	normal: '500',
	bold: '600',
	bold_100: '700',
	fontXLarge: '24px',
	fontLarge: '18.5px',
	fontMediumLarge: '16px',
};
const globalScaping: ScapingTheme = {
	scapingElement: '20px',
	borderRadiusStand: '15px',
	borderRadius: '40px',
	borderRadiusSmall: '12px',
	scaping: (num: number) => `${num * 5}px`,
	scapingContainer: '25px',
};
export const globalColor: ColorTheme = {
	gray: '#E2E2E2',
	white: '#fff',
	red_100: '#ff0000',
	none: 'transparent',
	textColor: '#3C3F3D',
	gray_200: '#F2F2F2',
	gray_100: '#F7F7F7',
	darkGray: '#545454',
	textColor_100: '#4C4F4D',
	orange_100: '#C89524',
	background: '#0C1015',
	backgroundGray: '#F2F3F2',
	bottomBarUnFocus: '#BBBBBB',
	bottomBarFocus: '#C89524',
};

export const myTheme: ThemeInterface = {
	colors: {
		main: '#C89524',
		secondary: '#fff',
		...globalColor,
	},
	font: {
		...globalFont,
	},
	...globalScaping,
};
export const myThemeDark: ThemeInterface = {
	colors: {
		main: '#111',
		secondary: '#fff',
		...globalColor,
	},
	font: {
		...globalFont,
	},
	...globalScaping,
};
