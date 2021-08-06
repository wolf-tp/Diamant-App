import {screenWidth} from 'app/styles/dimens';
import styled from 'app/styles/styled';
import React, {useEffect} from 'react';
import {Animated, TextInputProps} from 'react-native';
import {useToggleAnimate} from '../animation/FadeAnimation';
import {Search} from '../icons/Icons';

type SearchInputProps = TextInputProps & {type?: 'white' | 'gray'};

const SearchInput = (props: SearchInputProps) => {
	const {interpolate} = useToggleAnimate({outputRange: [-screenWidth, 0]});

	return (
		<Container style={{transform: [{translateX: interpolate}]}}>
			<InputSearch placeholder={'Search for fruits, vegetables, groce...'} {...props} />
			<SearchIcon />
		</Container>
	);
};
const InputSearch = styled.TextInput<SearchInputProps>`
	background-color: ${({type, theme}) =>
		type === 'gray' ? theme.colors.white : theme.colors.gray};
	border-radius: 10px;
	padding: 12px;
	padding-left: 40px;
	font-size: 15px;
`;
const Container = styled(Animated.View)`
	justify-content: center;
	flex: 1;
`;
const SearchIcon = styled(Search)`
	position: absolute;
	margin-left: ${({theme}) => theme.scapingElement};
`;

export default SearchInput;
