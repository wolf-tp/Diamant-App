import React from 'react';
import {View, Text} from 'react-native';

interface Props {}

const ListProduct = (props: Props) => {
	return (
		<View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
			<Text>List Product</Text>
		</View>
	);
};

export default ListProduct;
