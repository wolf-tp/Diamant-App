import React from 'react';
import {View, Text} from 'react-native';

interface Props {}

const Notifications = (props: Props) => {
	return (
		<View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
			<Text>Cart</Text>
		</View>
	);
};

export default Notifications;
