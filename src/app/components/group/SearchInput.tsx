import {screenWidth} from 'app/styles/dimens';
import {getAppTheme} from 'app/styles/reducer';
import styled from 'app/styles/styled';
import React from 'react';
import {Animated, TextInputProps} from 'react-native';
import {useToggleAnimate} from '../animation/FadeAnimation';
import {Search} from '../icons/Icons';

type PositionICon = {leftIcon?: boolean};
type SearchInputProps = TextInputProps & PositionICon;

const SearchInput = (props: SearchInputProps) => {
	const theme = getAppTheme();
	const {interpolate} = useToggleAnimate({outputRange: [-screenWidth, 0]});

	return (
		<Container style={{transform: [{translateX: interpolate}]}}>
			<InputSearch
				{...props}
				placeholder={'Recherche de produit'}
				placeholderTextColor={theme.colors.textGray}
			/>
			<SearchIcon />
		</Container>
	);
};
const InputSearch = styled.TextInput<SearchInputProps>`
	background-color: ${({theme}) => theme.colors.card};
	border-radius: ${({theme}) => theme.borderRadius};
	min-height: 50px;
	padding: 12px;
	color: ${({theme}) => theme.colors.text};
	${({leftIcon}) => (!leftIcon ? '' : 'padding-left:40px')}
	font-size: 15px;
`;
const Container = styled(Animated.View)`
	margin-top: ${({theme}) => theme.scaping(2)};
	flex-direction: column;
	justify-content: center;
	background-color: ${({theme}) => theme.colors.background};
`;
const SearchIcon = styled(Search)<PositionICon>`
	position: absolute;
	margin-left: ${({theme}) => theme.scapingElement};
	${({leftIcon}) => (!leftIcon ? 'right: 20px;' : '')}
`;

export default SearchInput;
