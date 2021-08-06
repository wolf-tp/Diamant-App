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
	borderRadius: '14px',
	scaping: (num: number) => `${num * 5}px`,
	scapingContainer: '25px',
};
const globalColor: ColorTheme = {
	gray: '#F2F2F2',
	white: '#fff',
	none: 'transparent',
};

export const myTheme: ThemeInterface = {
	colors: {
		main: '#4CAD73',
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
