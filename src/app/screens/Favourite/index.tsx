import React from 'react';
import {View, Text} from 'react-native';

interface Props {}

const Favourite = (props: Props) => {
	return (
		<View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
			<Text>Favourite</Text>
		</View>
	);
};

export default Favourite;
