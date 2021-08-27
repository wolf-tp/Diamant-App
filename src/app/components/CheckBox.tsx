import {RowTouch, RowView, TextMedium} from 'app/styles/globalStyled';
import styled from 'app/styles/styled';
import React, {useEffect, useState} from 'react';
import {ViewStyle} from 'react-native';
import {IconCheckbox} from './icons/Icons';

interface Props {
	checked?: boolean;
	onToggle?: () => void;
	children?: React.ReactNode;
	style?: ViewStyle;
}

const CheckBox = ({children, onToggle, checked: checkProps, style}: Props) => {
	const [checked, setChecked] = useState(false);

	useEffect(() => {
		setChecked(checkProps);
	}, [checkProps]);

	return (
		<ContainerTouch
			activeOpacity={0.6}
			onPress={() => {
				setChecked(!checked);
				onToggle?.();
			}}
		>
			<IconCheckbox checked={checked} />
			{typeof children === 'string' ? (
				<ContentText checked={checked}>{children}</ContentText>
			) : (
				children
			)}
		</ContainerTouch>
	);
};
const ContainerTouch = styled(RowTouch)`
	align-items: center;
`;

const ContentText = styled(TextMedium)<Props>`
	padding-left: ${({theme}) => theme.scaping(2)};
	font-weight: normal;
	font-style: normal;
	color: ${({checked, theme}) => (checked ? theme.colors.main : theme.colors.textColor)};
`;

export default CheckBox;
