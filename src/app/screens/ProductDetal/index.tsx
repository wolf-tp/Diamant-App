import React from 'react';
import {View, Text} from 'react-native';

interface Props {}

const ProductDetail = (props: Props) => {
	return (
		<View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
			<Text>Product Detail</Text>
		</View>
	);
};

export default ProductDetail;
