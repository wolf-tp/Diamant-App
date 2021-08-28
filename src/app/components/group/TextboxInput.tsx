import React, {useCallback} from 'react';
import {TextInputProps, ViewProps} from 'react-native';
import styled from 'app/styles/styled';

interface ChildrenProps {
	children?: React.ReactChild;
	handleChange?: (e: string) => void;
	values: any;
}
type PropsTextInput = TextInputProps & ViewProps & ChildrenProps;
const TextBoxInput = ({
	children,
	values,
	secureTextEntry,
	handleChange,
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
		<ViewContainer {...props}>
			<TextInputContent
				secureTextEntry={secureTextEntry}
				value={values}
				onChangeText={setInputChange}
			/>
			{children}
		</ViewContainer>
	);
};
const ViewContainer = styled.View`
	background-color: ${({theme}) => theme.colors.gray_100};
	padding: 0px 24px;
	border-radius: ${({theme}) => theme.borderRadius};
`;

const TextInputContent = styled.TextInput`
	width: 100%;
`;

export default TextBoxInput;
