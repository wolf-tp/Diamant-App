import React from 'react';
import {View, Text} from 'react-native';

interface Props {}

const Account = (props: Props) => {
	return (
		<View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
			<Text>Account</Text>
		</View>
	);
};

export default Account;
