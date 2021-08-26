import Button from 'app/components/Button';
import SearchInput from 'app/components/group/SearchInput';
import UploadMedia from 'app/components/group/UploadMedia';
import HeaderLogo from 'app/components/HeaderLogo';
import {IconMessage, IconNotification} from 'app/components/icons/Icons';
import {screenHeight, screenWidth} from 'app/styles/dimens';
import {centerItemsCss, Container, RowView, TextLarge} from 'app/styles/globalStyled';
import styled from 'app/styles/styled';
import React from 'react';
import {View, Text, SafeAreaView, Image} from 'react-native';

interface Props {}

const Home = (props: Props) => {
	return (
		<Container style={{backgroundColor: '#F9FAFE'}}>
			<ImageHeader source={require('images/bg_header_home.png')} />
			<SafeAreaView>
				<HeaderLogo typeHeader={'small'} />
				<RowHeader>
					<SearchInput />
					<TouchIcon clean>
						<IconMessage />
					</TouchIcon>
					<TouchIcon clean>
						<IconNotification />
					</TouchIcon>
				</RowHeader>
				<TextLarge>Categories</TextLarge>
			</SafeAreaView>
			{/* <UploadMedia /> */}
		</Container>
	);
};

const ImageHeader = styled.Image`
	position: absolute;
	width: ${screenWidth}px;
	height: ${screenHeight * 0.2}px;
	resize-mode: stretch;
`;
const RowHeader = styled(RowView)`
	${centerItemsCss}
	height:${screenHeight * 0.1}px;
	margin-bottom: ${screenHeight * 0.02}px;
`;
const TouchIcon = styled(Button)`
	padding-left: 5px;
`;
// const fakeCateroties = [
// 	{
// 		name: 'Vegetables',
// 	},
// ];
export default Home;
