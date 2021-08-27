import SearchInput from 'app/components/group/SearchInput';
import {Container} from 'app/styles/globalStyled';
import styled from 'app/styles/styled';
import React from 'react';
import {SafeAreaView} from 'react-native';

interface Props {}

const Home = (props: Props) => {
	return (
		<Container style={{backgroundColor: '#F9FAFE'}}>
			<SafeAreaView>
				<SearchInput />
			</SafeAreaView>
		</Container>
	);
};

export default Home;
