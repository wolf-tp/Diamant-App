import Button from 'app/components/Button';
import TextAnimator from 'app/components/TextAnimator';
import {navigate} from 'app/navigation/rootNavigation';
import {screenHeight, screenWidth} from 'app/styles/dimens';
import {CenterItemView, Container} from 'app/styles/globalStyled';
import {getAppTheme} from 'app/styles/reducer';
import styled from 'app/styles/styled';
import LottieView from 'lottie-react-native';
import React from 'react';

const timing = 600;
const IntroApp = () => {
	const theme = getAppTheme();
	return (
		<Container>
			<ContainerView>
				<BottomView>
					<ContainerImage>
						<IntroImage source={require('images/intro.json')} autoPlay loop />
						<CakeImage resizeMode={'contain'} source={require('images/cake_intro.png')} />
					</ContainerImage>
					<TextAnimator
						content={'Welcome to'}
						timing={timing}
						textStyle={{color: theme.colors.textColor, fontSize: 36}}
					/>
					<TextAnimate
						content={'our store'}
						timing={timing}
						textStyle={{color: theme.colors.main, fontSize: 36}}
					/>
					<TextAnimate
						content={'Ger your groceries in as fast as one hour'}
						timing={800}
						textStyle={{color: theme.colors.textColor}}
					/>
					<BottomContaineButton>
						<StartButton children={'Get Started'} onPress={() => navigate('Login')} />
					</BottomContaineButton>
				</BottomView>
			</ContainerView>
		</Container>
	);
};
const BottomView = styled.View`
	flex: 1;
	justify-content: flex-end;
	margin-bottom: ${screenHeight * 0.1}px;
`;
const IntroImage = styled(LottieView)``;
const ContainerView = styled.SafeAreaView`
	flex: 1;
`;
const ContainerImage = styled.View`
	margin-top: ${screenHeight * 0.1}px;
	align-items: center;
	flex: 1;
`;
const CakeImage = styled.Image`
	width: ${screenWidth * 0.7}px;
	resize-mode: contain;
	position: absolute;
	top: -${screenHeight * 0.15}px;
`;
const TextAnimate = styled(TextAnimator)`
	width: ${screenWidth * 0.9}px;
	margin-bottom: 30px;
`;
const BottomContaineButton = styled(CenterItemView)`
	margin-top: ${screenHeight * 0.05}px;
`;

const StartButton = styled(Button)`
	width: ${screenWidth / 1.5}px;
`;

export default IntroApp;
