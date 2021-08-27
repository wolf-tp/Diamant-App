import {screenWidth} from 'app/styles/dimens';
import {shadowElement} from 'app/styles/globalStyled';
import styled from 'app/styles/styled';
import React from 'react';
import {Animated, TextInputProps} from 'react-native';
import {useToggleAnimate} from '../animation/FadeAnimation';
import {Search} from '../icons/Icons';

type PositionICon = {leftIcon?: boolean};
type SearchInputProps = TextInputProps & PositionICon;

const SearchInput = (props: SearchInputProps) => {
	const {interpolate} = useToggleAnimate({outputRange: [-screenWidth, 0]});

	return (
		<Container style={{transform: [{translateX: interpolate}]}}>
			<InputSearch placeholder={'Search for fruits, vegetables, groce...'} {...props} />
			<SearchIcon {...props} />
		</Container>
	);
};
const InputSearch = styled.TextInput<SearchInputProps>`
	background-color: ${({theme}) => theme.colors.white};
	border-radius: ${({theme}) => theme.borderRadius};
	min-height: 50px;
	padding: 12px;
	${({leftIcon}) => (!leftIcon ? '' : 'padding-left:40px')}
	font-size: 15px;
	${shadowElement}
`;
const Container = styled(Animated.View)`
	flex-direction: column;
	justify-content: center;
`;
const SearchIcon = styled(Search)<PositionICon>`
	position: absolute;
	margin-left: ${({theme}) => theme.scapingElement};
	${({leftIcon}) => (!leftIcon ? 'right: 20px;' : '')}
`;

export default SearchInput;
