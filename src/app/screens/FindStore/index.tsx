import React from 'react';
import {View, Text} from 'react-native';

interface Props {}

const FindStore = (props: Props) => {
	return (
		<View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
			<Text>Find Store</Text>
		</View>
	);
};

export default FindStore;
