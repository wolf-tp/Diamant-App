import Button from 'app/components/Button';
import HeaderLogo from 'app/components/HeaderLogo';
import TextAnimator from 'app/components/TextAnimator';
import {navigate} from 'app/navigation/rootNavigation';
import {screenHeight, screenWidth} from 'app/styles/dimens';
import {Container} from 'app/styles/globalStyled';
import styled from 'app/styles/styled';
import React from 'react';

interface Props {}

const IntroApp = () => {
	return (
		<ContainerPrimary>
			<IntroImage source={require('images/intro_app.png')} />
			<ContainerView>
				<HeaderLogo />
				<BottomView>
					<TextAnimator
						content={'Food Distribution is the solution for grocery selection everything you have'}
						timing={800}
						textStyle={{color: 'white'}}
						style={{marginBottom: 30}}
					/>
					<Button solidWhite children={'Get Started'} onPress={() => navigate('Home')} />
				</BottomView>
			</ContainerView>
		</ContainerPrimary>
	);
};
const BottomView = styled.View`
	flex: 1;
	justify-content: flex-end;
	margin-bottom: ${screenHeight * 0.1}px;
`;
const ContainerPrimary = styled(Container)`
	background-color: ${({theme}) => theme.colors.main};
`;
const IntroImage = styled.Image`
	width: ${screenWidth}px;
	height: ${screenHeight * 0.6}px;
	position: absolute;
`;
const ContainerView = styled.SafeAreaView`
	flex: 1;
`;

export default IntroApp;
