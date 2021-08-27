import {RowView, shadowElement, TextLarge, TextMedium} from 'app/styles/globalStyled';
import styled from 'app/styles/styled';
import React from 'react';

const UserCard = () => {
	return (
		<Container>
			<Avatar source={require('images/template/avatar.png')} />
			<ContainerContent>
				<TextLarge>Quyen2000</TextLarge>
				<TextDescription>QuyenNguyenThi</TextDescription>
			</ContainerContent>
		</Container>
	);
};
const Container = styled(RowView)`
	align-items: center;
`;
const Avatar = styled.Image`
	max-width: 80px;
	aspect-ratio: 1;
	resize-mode: contain;
	${shadowElement}
`;

const ContainerContent = styled.View``;
const TextDescription = styled(TextMedium)`
	font-weight: 300;
`;

export default UserCard;
