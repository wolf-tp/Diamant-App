import * as React from 'react';
import Svg, {Circle, Path, SvgProps} from 'react-native-svg';

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
				stroke={'#BDBDBD'}
				strokeWidth={2}
				strokeLinecap={'round'}
				strokeLinejoin={'round'}
			/>
		</Svg>
	);
}
export function IconMessage(props: SvgProps) {
	return (
		<Svg width={30} height={30} viewBox={'0 0 26 26'} fill={'none'} {...props}>
			<Path
				d={
					'M6.28 4.815h14.083a3.39 3.39 0 013.385 3.198l.005.192v9.91a3.39 3.39 0 01-3.198 3.386l-.192.005H6.279a3.39 3.39 0 01-3.385-3.198l-.005-.192v-9.91A3.39 3.39 0 016.087 4.82l.192-.005h14.084H6.279zm15.908 5.605l-8.502 4.475a.782.782 0 01-.629.045l-.1-.044-8.503-4.475v7.695a1.825 1.825 0 001.675 1.82l.15.005h14.084a1.825 1.825 0 001.819-1.676l.006-.15V10.42zm-1.825-4.04H6.279a1.826 1.826 0 00-1.82 1.675l-.005.15v.448l8.867 4.666 8.867-4.667v-.447a1.825 1.825 0 00-1.676-1.82l-.15-.005z'
				}
				fill={'#fff'}
			/>
		</Svg>
	);
}
export function IconNotification(props: SvgProps) {
	return (
		<Svg width={26} height={26} viewBox={'0 0 26 26'} {...props}>
			<Path
				d={
					'M18.938 9.437a6.615 6.615 0 00-1.88-4.63 6.356 6.356 0 00-4.54-1.918c-1.702 0-3.335.69-4.539 1.918a6.615 6.615 0 00-1.88 4.63c0 7.64-3.21 9.822-3.21 9.822h19.26s-3.21-2.183-3.21-9.822zM14.444 23.111a2.105 2.105 0 01-.814.705 2.492 2.492 0 01-1.112.258c-.39 0-.773-.089-1.11-.258a2.105 2.105 0 01-.815-.705'
				}
				stroke={'#fff'}
				strokeWidth={2}
				strokeLinecap={'round'}
				strokeLinejoin={'round'}
			/>
			<Circle cx={19.7407} cy={6.25927} r={4.33333} fill={'#EB5757'} />
		</Svg>
	);
}
