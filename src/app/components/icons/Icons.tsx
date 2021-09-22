import {globalColor} from 'app/styles/theme';
import * as React from 'react';
import Svg, {Circle, Path, SvgProps, G, ClipPath, Defs, Rect, Line} from 'react-native-svg';

export function BackHeader(props: SvgProps) {
	return (
		<Svg width={27} height={27} viewBox={'0 0 24 24'} fill={'none'} {...props}>
			<Path
				d={'M15 18l-6-6 6-6'}
				stroke={'#111'}
				strokeWidth={2}
				strokeLinecap={'round'}
				strokeLinejoin={'round'}
			/>
		</Svg>
	);
}
export function Search(props: SvgProps) {
	return (
		<Svg width={20} height={20} viewBox={'0 0 20 20'} fill={'none'} {...props}>
			<Path
				d={
					'M9.167 15.833a6.667 6.667 0 100-13.333 6.667 6.667 0 000 13.333zM17.5 17.5l-3.625-3.625'
				}
				stroke={globalColor.bottomBarFocus}
				strokeWidth={2}
				strokeLinecap={'round'}
				strokeLinejoin={'round'}
			/>
		</Svg>
	);
}
export function IconHome(props: SvgProps) {
	return (
		<Svg width={24} height={25} fill={'none'} {...props}>
			<Path
				d={
					'M9 9.754c.53.475 1.232.764 2 .764h2a2.99 2.99 0 002-.764H9zm0 0a2.99 2.99 0 01-2 .764l2-.764zm-.95-5.236v-.05H5a1.05 1.05 0 00-1.05 1.05v2A1.05 1.05 0 005 8.568h2a1.05 1.05 0 001.05-1.05v-3zm-3.04 5.95h-.05v10.065h2.09v-5.015A1.95 1.95 0 019 13.568h2a1.95 1.95 0 011.95 1.95v5.015h6.113V10.468H17a2.938 2.938 0 01-1.967-.751L15 9.687l-.033.03a2.942 2.942 0 01-1.967.751h-2a2.939 2.939 0 01-1.967-.751L9 9.687l-.033.03A2.942 2.942 0 017 10.468H5.01zm-2.002-.773a2.943 2.943 0 01-.958-2.177v-2A2.95 2.95 0 015 2.568h14a2.95 2.95 0 012.95 2.95v2c0 .867-.374 1.648-.97 2.188l-.017.015v10.762a1.95 1.95 0 01-1.95 1.95h-7.65c-.12.024-.241.035-.363.035H9c-.122 0-.244-.011-.364-.034H5.011a1.95 1.95 0 01-1.95-1.95V9.641l-.053.053zm8.042 5.823v-.05h-2.1v5.065H11v-.049h.05v-4.966zm3-11v-.05h-4.1v3.05A1.05 1.05 0 0011 8.568h2a1.05 1.05 0 001.05-1.05v-3zm1.95-.05h-.05v3.05A1.05 1.05 0 0017 8.568h2a1.05 1.05 0 001.05-1.05v-2A1.05 1.05 0 0019 4.468h-3zm0 9.1h1a.95.95 0 01.95.95v3a.95.95 0 01-.95.95h-1a.95.95 0 01-.95-.95v-3a.95.95 0 01.95-.95z'
				}
				fill={props.color}
				stroke={'#fff'}
				strokeWidth={0.1}
			/>
		</Svg>
	);
}

export function IconListOrders({color, ...props}: SvgProps) {
	return (
		<Svg width={27} height={25} fill={'none'} {...props}>
			<Path
				d={
					'M8.52 24.366a2.445 2.445 0 110-4.891 2.445 2.445 0 010 4.89zm8.56 0a2.445 2.445 0 110-4.891 2.445 2.445 0 010 4.89zM1.138 7.154a1.176 1.176 0 010-2.351h1.408c1.102 0 2.056.765 2.296 1.841l1.532 6.899a2.352 2.352 0 002.296 1.84h9.185l1.763-7.054H8.192a1.176 1.176 0 010-2.35h11.426A2.352 2.352 0 0121.899 8.9l-1.763 7.053a2.351 2.351 0 01-2.281 1.781H8.67a4.702 4.702 0 01-4.591-3.683L2.546 7.154H1.138z'
				}
				fill={color}
			/>
			<Circle cx={21.5} cy={6.303} r={4.5} fill={'#0D1116'} stroke={color} strokeWidth={2} />
			<Path
				d={'M23 5.521l-.554-.718-1.206 1.563-.686-.89-.554.719 1.24 1.608L23 5.52z'}
				fill={color}
			/>
		</Svg>
	);
}
export function IconCart({color, ...props}: SvgProps) {
	return (
		<Svg width={23} height={21} fill={'none'} {...props}>
			<Path
				d={
					'M9.036 20.081a2.445 2.445 0 110-4.89 2.445 2.445 0 010 4.89zm8.559 0a2.445 2.445 0 110-4.891 2.445 2.445 0 010 4.891zM1.653 2.869a1.176 1.176 0 010-2.35h1.408a2.35 2.35 0 012.296 1.84l1.532 6.899a2.352 2.352 0 002.296 1.841h9.185l1.763-7.055H8.707a1.176 1.176 0 010-2.35h11.426a2.351 2.351 0 012.282 2.923l-1.764 7.052a2.35 2.35 0 01-2.281 1.781H9.185a4.703 4.703 0 01-4.591-3.682L3.061 2.869H1.653z'
				}
				fill={color}
			/>
		</Svg>
	);
}
export function IconFavourite({color, ...props}: SvgProps) {
	return (
		<Svg width={25} height={25} fill={'none'} {...props}>
			<G clipPath={'url(#a)'}>
				<Path
					d={
						'M5.194 11.528l7.824 7.824 7.824-7.824a3.689 3.689 0 10-5.216-5.217L13.018 8.92l-2.607-2.606a3.688 3.688 0 00-5.217 5.215zm6.955-6.956l.87.869.868-.87a6.147 6.147 0 118.694 8.694l-8.692 8.693a1.229 1.229 0 01-1.74 0l-8.693-8.692a6.147 6.147 0 118.692-8.693l.001-.001z'
					}
					fill={color}
				/>
			</G>
			<Defs>
				<ClipPath id={'a'}>
					<Path fill={globalColor.white} transform={'translate(.5 .518)'} d={'M0 0h24v24H0z'} />
				</ClipPath>
			</Defs>
		</Svg>
	);
}

export function IconFinger(props: SvgProps) {
	return (
		<Svg width={18} height={18} viewBox={'0 0 30 30'} {...props}>
			<Path
				d={
					'M17.371 14.773a3.121 3.121 0 00-3.957-1.96 3.12 3.12 0 00-2.039 3.687c1.125 3.906 5.234 7.414 9 10.395a.623.623 0 00.879-.102.622.622 0 00-.102-.875c-3.613-2.863-7.554-6.211-8.578-9.762a1.875 1.875 0 013.606-1.039c.68 2.375 4.07 5.309 7.297 7.863a.627.627 0 00.777-.98c-1.703-1.348-6.215-4.918-6.883-7.227zm0 0'
				}
				stroke={'none'}
				fillRule={'nonzero'}
				fill={'#ffc107'}
				fillOpacity={1}
			/>
			<Path
				d={
					'M22.105 13.16a8.17 8.17 0 00-9.972-5.328 8.114 8.114 0 00-5.563 10.05c1.024 3.563-1.175 4.552-1.875 4.77a.625.625 0 10.375 1.192c1.91-.598 3.766-2.606 2.7-6.305a6.87 6.87 0 014.699-8.504c0-.004.004-.004.004-.004a6.915 6.915 0 018.472 4.61.479.479 0 00.063.136c.062.11.195.332 4.21 3.59.27.219.66.18.88-.09a.622.622 0 00-.09-.879c-1.457-1.183-3.59-2.941-3.903-3.238zm0 0'
				}
				stroke={'none'}
				fillRule={'nonzero'}
				fill='#ffc107'
				fillOpacity={1}
			/>
			<Path
				d='M19.773 14.082a5.634 5.634 0 00-6.953-3.852 5.735 5.735 0 00-3.86 6.918c1.263 5.747.317 7.075-2.269 7.883a.631.631 0 00-.41.785.626.626 0 00.785.407c3.618-1.121 4.403-3.485 3.122-9.34a4.498 4.498 0 012.984-5.45c2.32-.66 4.738.68 5.41 2.997.25.851.914 2.023 6.027 6.07a.627.627 0 00.778-.98c-4.645-3.672-5.438-4.836-5.614-5.438zm0 0'
				stroke='none'
				fillRule='nonzero'
				fill='#ffc107'
				fillOpacity={1}
			/>
			<Path
				d='M21.492 22.773c-2.113-1.601-5.652-4.285-6.523-7.312a.623.623 0 00-1.2.348c.985 3.421 4.731 6.265 6.965 7.96.457.329.895.68 1.313 1.051a.624.624 0 00.883-.883 17.32 17.32 0 00-1.438-1.164zm-3.379 4.348a4.09 4.09 0 00-3.117-2.117c-2.125 0-2.453 3.61-2.5 4.332a.63.63 0 00.586.664h.04a.625.625 0 00.624-.586c.078-1.289.57-3.16 1.25-3.16.926 0 1.582.89 2.11 1.605.175.25.367.485.57.707a.62.62 0 00.883-.015.623.623 0 000-.867 5.631 5.631 0 01-.446-.563zm-5.644-5.43a.626.626 0 00-1.192.375c.536 1.672-.515 4.95-2.093 5.461a.625.625 0 00-.41.782.62.62 0 00.78.41c.005 0 .012 0 .016-.004 2.403-.774 3.563-4.95 2.899-7.024zm0 0'
				stroke='none'
				fillRule='nonzero'
				fill='#ffc107'
				fillOpacity={1}
			/>
			<Path
				d='M25.809 13.168c-.782-.25-1.395-1.25-2.106-2.39-1.504-2.43-3.566-5.758-9.332-5.758-5.86.003-10.61 4.753-10.617 10.617 0 .343.281.625.625.625a.627.627 0 00.625-.625c.004-5.172 4.195-9.364 9.367-9.371 5.07 0 6.844 2.867 8.27 5.171.84 1.356 1.566 2.524 2.78 2.918a.63.63 0 00.794-.39.626.626 0 00-.395-.793c-.004 0-.008-.004-.011-.004zM5.004 20.633a.627.627 0 00.559-.906 5.49 5.49 0 01-.56-1.594.627.627 0 00-.624-.625.627.627 0 00-.625.625c.101.754.336 1.484.691 2.152a.62.62 0 00.559.348zm0 0'
				stroke='none'
				fillRule='nonzero'
				fill='#ffc107'
				fillOpacity={1}
			/>
			<Path
				d='M4.68 7.426a.62.62 0 00.855-.211h.004C6.082 6.32 8.75 3.77 13.746 3.77c4.805 0 8.219 2.43 8.836 3.445a.63.63 0 00.86.21.627.627 0 00.206-.859c-.855-1.414-4.64-4.046-9.902-4.046-5.594 0-8.594 2.921-9.277 4.046a.624.624 0 00.21.86zm0 0'
				stroke='none'
				fillRule='nonzero'
				fill='#ffc107'
				fillOpacity={1}
			/>
			<Path
				d='M8.375 2.465c.285-.125.531-.25.758-.375.941-.473 1.617-.82 4.613-.82 2.027-.114 4.05.21 5.938.949.238.09.48.18.73.265a.624.624 0 10.406-1.18 57.969 57.969 0 01-.699-.25A15.376 15.376 0 0013.746.02c-3.3 0-4.129.425-5.176.964-.215.11-.437.223-.699.34a.63.63 0 00-.351.813.624.624 0 00.859.327zm16.645 8.363a.626.626 0 001.19-.375c-.355-.918-.796-1.8-1.315-2.637a.625.625 0 00-1.063.657c.465.75.863 1.535 1.188 2.355zm0 0'
				stroke='none'
				fillRule='nonzero'
				fill='#ffc107'
				fillOpacity={1}
			/>
			<Path
				d='M20.762 27.031a.65.65 0 01-.39-.136c-3.767-2.98-7.876-6.489-8.997-10.399a3.125 3.125 0 012.305-3.766 3.13 3.13 0 013.691 2.04c.664 2.312 5.176 5.882 6.867 7.226A.625.625 0 1123.496 23l-.031-.023c-3.227-2.555-6.621-5.485-7.3-7.86a1.875 1.875 0 00-2.321-1.285 1.876 1.876 0 00-1.281 2.32c1.019 3.551 4.96 6.903 8.574 9.762a.623.623 0 01-.387 1.113zm0 0'
				stroke='none'
				fillRule='nonzero'
				fill='#c89524'
				fillOpacity={1}
			/>
			<Path
				d='M4.879 23.867a.625.625 0 01-.188-1.219c.7-.218 2.899-1.207 1.875-4.77a8.12 8.12 0 015.559-10.046s.004 0 .008-.004a8.168 8.168 0 019.972 5.332c.313.293 2.446 2.055 3.903 3.238a.629.629 0 01.066.883.622.622 0 01-.851.086c-4.02-3.258-4.153-3.484-4.215-3.59a.644.644 0 01-.063-.14 6.908 6.908 0 00-8.472-4.606 6.871 6.871 0 00-4.703 8.5c1.062 3.7-.79 5.711-2.704 6.309a.605.605 0 01-.187.027zm0 0'
				stroke='none'
				fillRule='nonzero'
				fill='#c89524'
				fillOpacity={1}
			/>
			<Path
				d='M6.875 26.254a.624.624 0 01-.621-.625c0-.274.176-.516.437-.598 2.586-.808 3.532-2.136 2.27-7.883a5.736 5.736 0 013.855-6.918 5.637 5.637 0 016.957 3.852c.172.602.965 1.766 5.602 5.434a.625.625 0 11-.773.98c-5.122-4.05-5.786-5.219-6.028-6.07a4.381 4.381 0 00-5.414-2.996 4.495 4.495 0 00-2.98 5.453c1.285 5.855.5 8.215-3.121 9.344a.581.581 0 01-.184.027zm0 0'
				stroke='none'
				fillRule='nonzero'
				fill='#c89524'
				fillOpacity={1}
			/>
			<Path
				d='M22.492 25.004a.62.62 0 01-.441-.184c-.422-.37-.86-.722-1.313-1.05-2.238-1.696-5.984-4.536-6.968-7.961a.626.626 0 011.195-.368c.004.008.004.016.008.02.87 3.027 4.406 5.71 6.52 7.316.5.36.98.746 1.44 1.16a.624.624 0 01-.003.883.618.618 0 01-.438.184zM13.121 30h-.039a.625.625 0 01-.586-.66c.047-.727.375-4.336 2.5-4.336a4.09 4.09 0 013.121 2.117c.137.2.29.387.45.567a.624.624 0 01-.883.882 6.185 6.185 0 01-.57-.707c-.536-.718-1.192-1.61-2.118-1.61-.676 0-1.172 1.872-1.25 3.161a.622.622 0 01-.625.586zm-3.746-1.25a.624.624 0 01-.191-1.219c1.578-.511 2.62-3.793 2.093-5.46a.63.63 0 01.36-.81.63.63 0 01.808.36l.024.074c.664 2.075-.5 6.246-2.903 7.032a.628.628 0 01-.191.023zm0 0'
				stroke='none'
				fillRule='nonzero'
				fill='#c89524'
				fillOpacity={1}
			/>
			<Path
				d='M4.379 16.258a.624.624 0 01-.625-.625c.008-5.86 4.758-10.61 10.617-10.617 5.766 0 7.828 3.328 9.332 5.761.711 1.145 1.324 2.137 2.106 2.391a.625.625 0 01.41.781.63.63 0 01-.785.41c-.004-.004-.008-.004-.012-.004-1.215-.394-1.942-1.566-2.781-2.921-1.426-2.301-3.2-5.168-8.27-5.168a9.374 9.374 0 00-9.367 9.367.624.624 0 01-.625.625zm.625 4.371a.615.615 0 01-.559-.344 6.263 6.263 0 01-.691-2.152c0-.344.281-.625.625-.625s.625.281.625.625a5.53 5.53 0 00.559 1.594.63.63 0 01-.282.84.614.614 0 01-.277.062zm0 0'
				stroke='none'
				fillRule='nonzero'
				fill='#c89524'
				fillOpacity={1}
			/>
			<Path
				d='M23.117 7.516a.624.624 0 01-.535-.301c-.613-1.016-4.031-3.445-8.836-3.445-4.996 0-7.668 2.55-8.21 3.445a.622.622 0 01-.848.238.623.623 0 01-.243-.848c.008-.015.016-.027.024-.039.683-1.125 3.683-4.046 9.277-4.046 5.262 0 9.047 2.632 9.902 4.046a.624.624 0 01-.53.95zm0 0'
				stroke='none'
				fillRule='nonzero'
				fill='#c89524'
				fillOpacity={1}
			/>
			<Path
				d='M20.617 2.52a.6.6 0 01-.203-.036c-.25-.086-.492-.175-.73-.261a14.2 14.2 0 00-5.938-.953c-2.996 0-3.672.343-4.605.824-.23.117-.473.242-.758.375a.623.623 0 01-.824-.32.622.622 0 01.316-.825c.266-.117.488-.234.7-.344 1.042-.535 1.87-.96 5.171-.96 2.172-.11 4.344.242 6.371 1.03.23.083.461.169.703.25a.624.624 0 01-.203 1.22zm4.996 8.742a.625.625 0 01-.593-.434c-.325-.82-.723-1.61-1.188-2.363a.624.624 0 111.066-.652 15.78 15.78 0 011.309 2.636.624.624 0 01-.402.785.63.63 0 01-.192.028zm0 0'
				stroke='none'
				fillRule='nonzero'
				fill='#c89524'
				fillOpacity={1}
			/>
		</Svg>
	);
}
export const IconCardPlus = (props: SvgProps) => {
	return (
		<Svg width={36} height={36} fill={'none'} {...props}>
			<Rect width={36} height={36} rx={10} fill={'#C89524'} />
			<Path
				d={
					'M25.834 17.917a1.3 1.3 0 01-.385.934 1.31 1.31 0 01-.934.39H19.24v5.275c0 .35-.14.688-.39.933a1.312 1.312 0 01-.929.385 1.325 1.325 0 01-1.325-1.318v-5.274H11.32a1.325 1.325 0 01-.934-2.258c.245-.245.584-.385.934-.385h5.276v-5.275c0-.35.14-.688.391-.933a1.307 1.307 0 011.862 0c.251.245.391.583.391.933V16.6h5.276a1.31 1.31 0 011.32 1.319z'
				}
				fill={'#fff'}
			/>
		</Svg>
	);
};
export const IconChevron = (props: SvgProps) => (
	<Svg width={9} height={14} fill={'none'} {...props}>
		<G clipPath={'url(#a)'}>
			<Path
				d={
					'M.6 1.731a.92.92 0 01-.274-.682A.92.92 0 01.62.376a1.046 1.046 0 011.41-.02l5.743 5.52a.96.96 0 01.213.311.95.95 0 01.08.37c0 .128-.03.254-.08.381a.96.96 0 01-.213.312L2.03 12.77a1.033 1.033 0 01-.325.214 1.143 1.143 0 01-.396.078c-.132 0-.274-.02-.395-.069a1.212 1.212 0 01-.335-.214 1.003 1.003 0 01-.213-.322.804.804 0 01-.081-.38.939.939 0 01.314-.692l5.022-4.827-.954-.907L.6 1.731z'
				}
				fill={'#7D7D7D'}
			/>
		</G>
		<Defs>
			<ClipPath id={'a'}>
				<Path fill={'#fff'} transform={'rotate(-180 4.033 6.53)'} d={'M0 0h7.781v12.969H0z'} />
			</ClipPath>
		</Defs>
	</Svg>
);
export const IconOrder = (props: SvgProps) => (
	<Svg width={19} height={21} fill={'none'} {...props}>
		<Path
			d={
				'M3.717 1L1 4.625v12.688a1.813 1.813 0 001.812 1.812h12.68a1.811 1.811 0 001.812-1.813V4.626L14.587 1H3.717zM1 4.625h16.304'
			}
			stroke={'#C89524'}
			strokeWidth={1.853}
			strokeLinecap={'round'}
			strokeLinejoin={'round'}
		/>
		<Path
			d={'M12.775 8.25a3.626 3.626 0 01-3.623 3.625A3.622 3.622 0 015.53 8.25'}
			stroke={'#C89524'}
			strokeWidth={1.853}
			strokeLinecap={'round'}
			strokeLinejoin={'round'}
		/>
	</Svg>
);
export const IconMyDetail = (props: SvgProps) => (
	<Svg width={19} height={14} fill={'none'} {...props}>
		<Path
			d={
				'M1.812 2.214h-.093v9.906h14.678V2.214H1.812zm0-1.758h14.492c.454 0 .89.193 1.214.54.323.346.505.818.505 1.311v9.72c0 .493-.182.965-.505 1.312-.323.346-.76.54-1.214.54H1.812c-.454 0-.89-.194-1.214-.54a1.926 1.926 0 01-.505-1.312v-9.72c0-.493.182-.965.505-1.311.323-.347.76-.54 1.214-.54zm8.152 3.888h4.529c.213 0 .42.09.572.255.154.164.24.389.24.624s-.086.46-.24.624a.783.783 0 01-.572.255h-4.53a.783.783 0 01-.572-.255.917.917 0 01-.24-.624c0-.235.087-.46.24-.624a.783.783 0 01.573-.255zm0 2.916h4.529c.213 0 .42.09.572.255.154.164.24.389.24.624s-.086.46-.24.624a.783.783 0 01-.572.255h-4.53a.783.783 0 01-.572-.255.917.917 0 01-.24-.624c0-.235.087-.46.24-.624a.783.783 0 01.573-.255z'
			}
			fill={'#C89524'}
			stroke={'#fff'}
			strokeWidth={0.185}
		/>
		<G clipPath={'url(#a)'} fill={'#C89524'}>
			<Path
				d={
					'M5.474 5.026v.521a.964.964 0 01-.348.735 1.29 1.29 0 01-.842.308c-.314 0-.62-.111-.84-.308a.964.964 0 01-.35-.735v-.52a.99.99 0 01.35-.736c.22-.196.526-.307.84-.307.315 0 .612.11.842.307.22.197.348.462.348.735zm.892 3.076v.428c0 .205-.102.41-.263.555-.17.145-.4.23-.629.23h-2.38a.949.949 0 01-.628-.23.736.736 0 01-.263-.555v-.453c0-.29.102-.581.289-.82.187-.24.45-.428.756-.539.042-.009.076-.017.119-.017.042 0 .076.008.119.017h1.52c.018 0 .026 0 .035.009 0-.009.008-.009.008-.009.136-.009.221 0 .23 0 .322.111.594.3.79.547.187.248.297.538.297.837z'
				}
			/>
		</G>
		<Defs>
			<ClipPath id={'a'}>
				<Path fill={'#fff'} transform={'translate(2 3.984)'} d={'M0 0h5.558v7.118H0z'} />
			</ClipPath>
		</Defs>
	</Svg>
);
export const IconDeliveryAddress = (props: SvgProps) => (
	<Svg width={18} height={21} fill={'none'} {...props}>
		<Path
			clipRule={'evenodd'}
			d={
				'M1 8.611C1.014 4.368 4.435.941 8.64.955c4.204.014 7.601 3.465 7.587 7.708v.087c-.052 2.758-1.578 5.307-3.45 7.3a20.05 20.05 0 01-3.56 2.958.916.916 0 01-1.207 0A19.725 19.725 0 013 14.275a9.887 9.887 0 01-2-5.638v-.026z'
			}
			stroke={'#C89524'}
			strokeWidth={1.853}
			strokeLinecap={'round'}
			strokeLinejoin={'round'}
		/>
		<Path
			clipRule={'evenodd'}
			d={
				'M8.613 10.899a2.13 2.13 0 002.121-2.14 2.13 2.13 0 00-2.12-2.14 2.13 2.13 0 00-2.121 2.14c0 1.182.95 2.14 2.12 2.14z'
			}
			stroke={'#C89524'}
			strokeWidth={1.853}
			strokeLinecap={'round'}
			strokeLinejoin={'round'}
		/>
	</Svg>
);
export const IconNotification = ({color, ...props}: SvgProps) => (
	<Svg width={28} height={28} viewBox={'0 0 28 28'} fill={'none'} {...props}>
		<Path
			d={
				'M21.824 19.516c-1.17-1.433-1.997-2.162-1.997-6.11 0-3.617-1.846-4.905-3.366-5.531a.812.812 0 01-.454-.48c-.266-.908-1.014-1.707-2.007-1.707-.994 0-1.741.8-2.005 1.707a.804.804 0 01-.454.48c-1.521.627-3.366 1.91-3.366 5.53-.002 3.95-.829 4.678-1.999 6.11-.485.594-.06 1.485.788 1.485H21.04c.843 0 1.265-.894.783-1.484zM16.917 21v.73a2.917 2.917 0 11-5.834 0V21'
			}
			stroke={color}
			strokeWidth={2}
			strokeLinecap={'round'}
			strokeLinejoin={'round'}
		/>
	</Svg>
);
export const IconHelp = (props: SvgProps) => (
	<Svg width={19} height={19} fill={'none'} {...props}>
		<Path
			d={
				'M9.058.714A9.055 9.055 0 00.69 6.308a9.067 9.067 0 001.963 9.876 9.056 9.056 0 0015.463-6.408 9.065 9.065 0 00-5.592-8.373 9.054 9.054 0 00-3.466-.69zm0 16.312a7.243 7.243 0 01-6.695-4.475 7.253 7.253 0 015.281-9.886 7.243 7.243 0 017.44 3.083 7.252 7.252 0 01-6.026 11.278z'
			}
			fill={'#C89524'}
		/>
		<Path
			d={
				'M9.255 4.339a3.17 3.17 0 00-3.17 3.172.906.906 0 101.811 0A1.36 1.36 0 119.255 8.87a.906.906 0 00-.906.906v1.813a.907.907 0 001.812 0v-1.052a3.161 3.161 0 002.242-3.493 3.163 3.163 0 00-3.148-2.705zm0 10.875a.906.906 0 100-1.812.906.906 0 000 1.812z'
			}
			fill={'#C89524'}
		/>
	</Svg>
);
export const IconAbout = (props: SvgProps) => (
	<Svg width={19} height={19} fill={'none'} {...props}>
		<Path
			d={
				'M9.058.093A9.055 9.055 0 00.69 5.687a9.067 9.067 0 001.963 9.877 9.057 9.057 0 0015.463-6.408A9.065 9.065 0 0012.524.783a9.054 9.054 0 00-3.466-.69zm0 16.313a7.244 7.244 0 01-6.695-4.476 7.253 7.253 0 015.281-9.885 7.243 7.243 0 017.44 3.083 7.252 7.252 0 01-6.026 11.277z'
			}
			fill={'#C89524'}
		/>
		<Path
			d={
				'M9.058 13.687a.906.906 0 100-1.812.906.906 0 000 1.812zm0-9.063a.906.906 0 00-.906.907v4.53a.907.907 0 001.812 0v-4.53a.907.907 0 00-.906-.907z'
			}
			fill={'#C89524'}
		/>
	</Svg>
);
export const IconLogout = (props: SvgProps) => (
	<Svg width={19} height={19} viewBox={'0 0 19 19'} fill={'none'} {...props}>
		<Path
			d={
				'M6.435 17.313H2.812A1.811 1.811 0 011 15.5V2.813A1.813 1.813 0 012.812 1h3.623M12.775 13.687l4.53-4.53-4.53-4.532M17.304 9.156H6.434'
			}
			stroke={'#C89524'}
			strokeWidth={1.85268}
			strokeLinecap={'round'}
			strokeLinejoin={'round'}
		/>
	</Svg>
);
export const IconMinusClean = ({disabled, ...props}: SvgProps) => (
	<Svg width={16} height={3} viewBox={'0 0 16 3'} fill={'none'} {...props}>
		<Path
			d={
				'M15.922 1.471c0 .352-.135.693-.387.94a1.314 1.314 0 01-.939.393H1.326A1.333 1.333 0 01.387.532c.247-.247.587-.387.94-.387H14.595a1.319 1.319 0 011.326 1.327z'
			}
			fill={disabled ? '#B3B3B3' : '#C89524'}
		/>
	</Svg>
);
export const IconPlusClean = ({disabled, ...props}: SvgProps) => (
	<Svg width={17} height={17} fill={'none'} {...props}>
		<Path
			d={
				'M16.084 8.474c0 .352-.135.693-.387.94a1.314 1.314 0 01-.94.392H9.453v5.307c0 .352-.14.692-.393.939a1.319 1.319 0 01-.933.387 1.332 1.332 0 01-1.333-1.326V9.806H1.488a1.333 1.333 0 01-.939-2.272c.246-.246.587-.386.939-.386h5.305V1.84c0-.352.141-.692.394-.939a1.314 1.314 0 011.872 0c.252.247.393.587.393.94v5.306h5.306a1.319 1.319 0 011.326 1.327z'
			}
			fill={disabled ? '#B3B3B3' : '#C89524'}
		/>
	</Svg>
);
export const IconCheckbox = ({checked, ...props}: SvgProps & {checked?: boolean}) =>
	checked ? (
		<Svg width={25} height={25} fill={'none'} {...props}>
			<Rect x={0.011} width={24.072} height={24.072} rx={8} fill={'#C89524'} />
			<Path
				fillRule={'evenodd'}
				clipRule={'evenodd'}
				d={
					'M18.577 8.283c0 .35-.124.678-.337.907l-6.772 7.282c-.238.241-.55.38-.861.38-.316 0-.624-.141-.844-.377l-3.395-3.642a1.334 1.334 0 01-.337-.907c0-.33.126-.65.352-.907.23-.233.526-.363.85-.376.315.002.608.129.84.364l2.534 2.719 5.929-6.361c.232-.236.524-.363.84-.365.325.014.62.145.85.392.222.239.351.556.351.891z'
				}
				fill={'#FCFCFC'}
			/>
		</Svg>
	) : (
		<Svg width={25} height={25} fill={'none'} {...props}>
			<Rect
				x={0.761}
				y={0.822}
				width={22.572}
				height={22.572}
				rx={7.25}
				stroke={'#B1B1B1'}
				strokeWidth={1.5}
			/>
		</Svg>
	);
export const ArrowIcon = (props: SvgProps) => (
	<Svg width={'20pt'} height={'20pt'} viewBox={'0 0 20 20'} {...props}>
		<Path
			d={
				'M18.277 4.79L10 13.07 1.723 4.79a1.007 1.007 0 00-1.426 0 1.011 1.011 0 000 1.429l8.988 8.992a1.011 1.011 0 001.43 0l8.988-8.992a1.011 1.011 0 000-1.43 1.007 1.007 0 00-1.426 0zm0 0'
			}
			stroke={'none'}
			fillRule={'nonzero'}
			fill={'#fff'}
			fillOpacity={1}
		/>
	</Svg>
);
export const IconDropdownAddress = (props: SvgProps) => (
	<Svg width={8} height={7} fill={'none'} {...props}>
		<Path
			d={'M4.866 6.5a1 1 0 01-1.732 0L.536 2A1 1 0 011.402.5h5.196A1 1 0 017.464 2L4.866 6.5z'}
			fill={'#C89524'}
		/>
	</Svg>
);
interface CustomEyeProps {
	isPress?: boolean;
}
type EyeProps = SvgProps & CustomEyeProps;
export function IconEye(props: EyeProps) {
	return (
		<Svg width={24} height={24} viewBox={'0 0 24 24'} fill={'none'} {...props}>
			<Path
				d={
					'M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z'
				}
				stroke={'#7C7C7C'}
				strokeWidth={2}
				strokeLinecap={'round'}
				strokeLinejoin={'round'}
			/>
			<Path
				d={
					'M2.45825 12C3.73253 7.94288 7.52281 5 12.0004 5C16.4781 5 20.2684 7.94291 21.5426 12C20.2684 16.0571 16.4781 19 12.0005 19C7.52281 19 3.73251 16.0571 2.45825 12Z'
				}
				stroke={'#7C7C7C'}
				strokeWidth={2}
				strokeLinecap={'round'}
				strokeLinejoin={'round'}
			/>
			{props.isPress && (
				<Line x1={'0'} y1={'0'} x2={'100'} y2={'100'} stroke={'#7C7C7C'} strokeWidth={'2'} />
			)}
		</Svg>
	);
}
export const IconHeart = (props: SvgProps) => (
	<Svg width={22} height={22} fill={'none'} {...props}>
		<G clipPath={'url(#a)'}>
			<Path
				d={
					'M4.405 10.01l7.113 7.112 7.113-7.113a3.353 3.353 0 10-4.743-4.742l-2.37 2.37-2.371-2.37a3.353 3.353 0 00-4.742 4.742zm6.322-6.325l.79.79.791-.79a5.588 5.588 0 117.903 7.904l-7.902 7.903a1.117 1.117 0 01-1.582 0L2.824 11.59a5.59 5.59 0 117.902-7.904h.001z'
				}
				fill={'#fff'}
			/>
		</G>
		<Defs>
			<ClipPath id={'a'}>
				<Path fill={'#fff'} transform={'translate(.137)'} d={'M0 0h21.819v21.819H0z'} />
			</ClipPath>
		</Defs>
	</Svg>
);

export const IconFilter = (props: SvgProps) => (
	<Svg width={19} height={18} fill={'none'} {...props}>
		<Path
			d={
				'M9.983 4.326c0 1.816-1.483 3.3-3.327 3.3-1.843 0-3.327-1.484-3.327-3.3 0-1.817 1.484-3.3 3.327-3.3 1.844 0 3.327 1.483 3.327 3.3z'
			}
			stroke={'#4C4F4D'}
			strokeWidth={1.9}
		/>
		<Rect
			x={0.85}
			y={3.284}
			width={3.327}
			height={2.083}
			rx={1.042}
			fill={'#4C4F4D'}
			stroke={'#4C4F4D'}
			strokeWidth={0.3}
		/>
		<Path
			d={
				'M9.022 13.674c0-1.816 1.484-3.3 3.327-3.3 1.844 0 3.328 1.484 3.328 3.3 0 1.817-1.484 3.3-3.328 3.3-1.843 0-3.327-1.483-3.327-3.3z'
			}
			stroke={'#4C4F4D'}
			strokeWidth={1.9}
		/>
		<Rect
			x={9.85}
			y={3.284}
			width={7.885}
			height={2.083}
			rx={1.042}
			fill={'#4C4F4D'}
			stroke={'#4C4F4D'}
			strokeWidth={0.3}
		/>
		<Rect
			x={9.155}
			y={14.716}
			width={7.889}
			height={2.083}
			rx={1.042}
			transform={'rotate(-180 9.155 14.716)'}
			fill={'#4C4F4D'}
			stroke={'#4C4F4D'}
			strokeWidth={0.3}
		/>
		<Rect
			x={18.061}
			y={14.716}
			width={2.858}
			height={2.083}
			rx={1.042}
			transform={'rotate(-180 18.061 14.716)'}
			fill={'#4C4F4D'}
			stroke={'#4C4F4D'}
			strokeWidth={0.3}
		/>
	</Svg>
);
export const IconCartCircle = (props: SvgProps) => (
	<Svg width={43} height={43} viewBox={'0 0 43 43'} fill={'none'} {...props}>
		<Circle cx={21.5} cy={21.5} r={21.5} fill={'#141921'} />
		<Path
			d={
				'M18.52 32.563a2.445 2.445 0 110-4.89 2.445 2.445 0 010 4.89zm8.56 0a2.445 2.445 0 110-4.89 2.445 2.445 0 010 4.89zM11.138 15.35a1.176 1.176 0 010-2.351h1.408c1.103 0 2.056.765 2.296 1.841l1.532 6.899a2.352 2.352 0 002.296 1.841h9.185l1.763-7.055H18.192a1.176 1.176 0 010-2.35h11.426a2.352 2.352 0 012.281 2.922l-1.763 7.053a2.351 2.351 0 01-2.281 1.781H18.67a4.702 4.702 0 01-4.591-3.682l-1.533-6.899h-1.408z'
			}
			fill={'#C89524'}
		/>
	</Svg>
);
