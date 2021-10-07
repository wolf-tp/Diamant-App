import {getTranslate} from 'app/locate/reducer';
import React from 'react';
import {RefreshControl} from 'react-native';

interface Props {
	onRefresh?: () => void;
	refreshing?: boolean;
}

const RefreshList = ({onRefresh, refreshing}: Props) => {
	const getString = getTranslate();
	return (
		<RefreshControl
			title={getString('Global', 'PullToRefresh')}
			tintColor={'#fff'}
			titleColor={'#fff'}
			refreshing={refreshing || false}
			onRefresh={onRefresh}
		/>
	);
};

export default RefreshList;
