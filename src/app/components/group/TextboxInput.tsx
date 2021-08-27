import React, {useState} from 'react';
import {TextInputProps, ViewProps} from 'react-native';
import styled from 'app/styles/styled';

interface ChildrenProps {
	children?: React.ReactChild;
}
type PropsTextInput = TextInputProps & ViewProps & ChildrenProps;
const TextBoxInput = ({children, secureTextEntry, ...props}: PropsTextInput) => {
	const [onChangeValue, setOnChangeValue] = useState('');
	return (
		<ViewContainer {...props}>
			<TextInputContent
				secureTextEntry={secureTextEntry}
				value={onChangeValue}
				onChangeText={setOnChangeValue}
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
