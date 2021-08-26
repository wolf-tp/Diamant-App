export const light_theme = {};

const globalFont = {
	fontFamily: 'Montserrat Alternates',
	fontMedium: '14px',
	normal: '500',
	bold: '600',
	fontLarge: '18px',
};
const globalScaping: ScapingTheme = {
	scapingElement: '15px',
	borderRadius: '40px',
	scaping: (num: number) => `${num * 5}px`,
	scapingContainer: '25px',
};
export const globalColor: ColorTheme = {
	gray: '#F2F2F2',
	white: '#fff',
	none: 'transparent',
	textColor: '#4C4F4D',
	background: '#FCFEFF',
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
