import styled from 'app/styles/styled';
import React from 'react';
import {View, ViewProps} from 'react-native';
import {ArrowIcon} from './icons/Icons';
interface Props {
	style?: ViewProps;
	event?: () => void;
}
const TouchArrow = ({style, event}: Props) => {
	return (
		<View style={style}>
			<TouchContainer
				onPress={() => {
					event && event();
				}}
			>
				<ArrowIcon />
			</TouchContainer>
		</View>
	);
};
const TouchContainer = styled.TouchableOpacity`
	align-items: center;
`;
export default TouchArrow;
