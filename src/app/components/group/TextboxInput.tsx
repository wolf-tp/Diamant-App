import React, {useCallback} from 'react';
import {TextInputProps, ViewProps} from 'react-native';
import styled from 'app/styles/styled';
import {isIOS} from 'app/styles/dimens';

interface ChildrenProps {
	children?: React.ReactChild;
	handleChange?: (e: string) => void;
	values?: any;
	title?: string;
	error?: string;
}
type PropsTextInput = TextInputProps & ViewProps & ChildrenProps;

const TextBoxInput = ({
	children,
	values,
	secureTextEntry,
	handleChange,
	style,
	error,
	...props
}: PropsTextInput) => {
	const setInputChange = useCallback(
		(text) => {
			if (handleChange) {
				handleChange(text);
			}
		},
		[handleChange]
	);
	return (
		<Container>
			<ViewContainer style={style}>
				<TextInputContent
					secureTextEntry={secureTextEntry}
					placeholderTextColor={'#C4C4C4'}
					value={values}
					onChangeText={setInputChange}
					{...props}
				/>
				{children}
			</ViewContainer>
			<TextError>{error}</TextError>
		</Container>
	);
};
const Container = styled.View`
	width: 100%;
`;
const ViewContainer = styled.View`
	width: 100%;
	/* background-color: ${({theme}) => theme.colors.gray_100}; */
	border-radius: ${({theme}) => theme.borderRadiusSmall};
	border-width: 1px;
	border-color: white;
	padding-vertical: ${({theme}) => theme.scaping(isIOS ? 3 : 0)};
	padding-left: ${({theme}) => theme.scapingElement};
`;
const TextError = styled.Text`
	font-size: ${({theme}) => theme.font.fontMedium};
	margin: 5px 0px;
	color: ${({theme}) => theme.colors.red_100};
	padding-left: ${({theme}) => theme.scaping(1)};
`;
const TextInputContent = styled.TextInput`
	color: ${({theme}) => theme.colors.white};
`;

export default TextBoxInput;
