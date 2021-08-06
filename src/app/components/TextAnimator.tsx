import styled from 'app/styles/styled';
import * as React from 'react';
import {View, StyleSheet, Animated, TextStyle, ViewStyle} from 'react-native';

type TextAnimatorProps = {
	content?: string;
	textStyle?: TextStyle;
	style?: ViewStyle;
	timing: number;
	onFinish?: (status: boolean) => void;
	isToggle?: boolean;
	typeText?: 'small' | 'large';
};

class TextAnimator extends React.Component<TextAnimatorProps> {
	animatedValues: Animated.Value[] = [];
	animations: Animated.CompositeAnimation[] = [];
	toValue: number = 0;
	textArr: string[] = [];
	static defaultProps: {timing: number; content: string};
	constructor(props: TextAnimatorProps) {
		super(props);

		const textArr: string[] = props.content?.trim().split(' ') || [];
		textArr.forEach((_, i: number) => {
			this.animatedValues[i] = new Animated.Value(0);
		});
		this.textArr = textArr;
	}

	componentDidMount() {
		this.animate(1);
	}

	componentWillUnmount() {
		this.animate(0);
	}

	animate(toValue = 1) {
		this.toValue = toValue;
		this.animations = this.textArr.map((_, i) => {
			return Animated.timing(this.animatedValues[i], {
				toValue,
				duration: this.props.timing,
				useNativeDriver: false,
			});
		});
		Animated.stagger(
			this.props.timing / 5,
			toValue === 0 ? this.animations.reverse() : this.animations
		).start(() => {
			this.props.isToggle && setTimeout(() => this.animate(toValue === 0 ? 1 : 0), 1000);
			if (this.props.onFinish) {
				this.props.onFinish(toValue === 1);
			}
		});
	}

	render() {
		return (
			<View style={[this.props.style, styles.textWrapper]}>
				{this.textArr.map((v, i) => {
					return (
						<TextAnimate
							key={`${v}-${i}`}
							style={[
								this.props.textStyle,
								{
									opacity: this.animatedValues[i],
									transform: [
										{
											translateY: Animated.multiply(this.animatedValues[i], new Animated.Value(-2)),
										},
									],
								},
							]}
						>
							{v}
							{`${i < this.textArr.length ? ' ' : ''}`}
						</TextAnimate>
					);
				})}
			</View>
		);
	}
}

TextAnimator.defaultProps = {
	timing: 600,
	content: '',
};

const TextAnimate = styled(Animated.Text)`
	font-style: normal;
	font-weight: ${(props) => props.theme.font.bold};
	font-size: ${(props) => props.theme.font.fontLarge};
	text-align: center;
`;

export default TextAnimator;

const styles = StyleSheet.create({
	textWrapper: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'center',
	},
});
