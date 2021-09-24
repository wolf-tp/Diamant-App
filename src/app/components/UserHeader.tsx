import {useAppSelector} from 'app/redux/store/hooks';
import {getName} from 'app/screens/login/reducer';
import {centerItemsCss, RowView, TextMedium} from 'app/styles/globalStyled';
import styled from 'app/styles/styled';
import React from 'react';

interface Props {}

const AVATAR_SIZE = 50;
const UserHeader = (_: Props) => {
	const name = useAppSelector(getName);
	return (
		<Container>
			<ContainerAvatar>
				<Avatar source={require('images/template/avatar.png')} />
			</ContainerAvatar>
			<TextName>{name || ''}</TextName>
		</Container>
	);
};
const Container = styled(RowView)`
	${centerItemsCss}
`;
const ContainerAvatar = styled.View`
	width: ${AVATAR_SIZE}px;
	height: ${AVATAR_SIZE}px;
	border-radius: ${AVATAR_SIZE / 2}px;
`;
const Avatar = styled.Image`
	width: 100%;
	height: 100%;
`;
const TextName = styled(TextMedium)`
	color: ${({theme}) => theme.colors.text};
	margin-left: ${({theme}) => theme.scaping(2)};
`;

export default UserHeader;
