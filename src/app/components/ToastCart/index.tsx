import {globalColor, myTheme} from 'app/styles/theme';
import React from 'react';
import {StyleSheet} from 'react-native';
import {BaseToast} from 'react-native-toast-message';

export const toastConfig = {
	success: (props: any) => (
		<BaseToast
			{...props}
			text1NumberOfLines={3}
			style={{borderLeftColor: myTheme.colors.main}}
			contentContainerStyle={{
				backgroundColor: globalColor.gray_300,
			}}
			activeOpacity={0.9}
			text1Style={styles.textStyle}
		/>
	),
};
const styles = StyleSheet.create({
	textStyle: {
		fontSize: 15,
		color: globalColor.text,
		fontWeight: '400',
	},
});
