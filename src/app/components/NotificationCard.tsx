import {cartCss, RowBetween, TextMedium, TextMediumLarge, TextSmall} from 'app/styles/globalStyled';
import styled, {css} from 'app/styles/styled';
import React from 'react';

const NotificationCard = ({title, content}: Notifications) => {
	return (
		<Container>
			<RowBetween>
				<Title>{title}</Title>
				{/* <Time>12:07</Time> */}
			</RowBetween>
			<Content>{content}</Content>
		</Container>
	);
};
const containerCss = css<{isExpanded?: boolean}>`
	margin-top: ${({theme}) => theme.scapingElement};
	padding-bottom: ${({theme}) => theme.scaping(2)};
	padding-horizontal: ${({theme}) => theme.scaping(2)};
	z-index: -1;
	${cartCss}
`;
const Container = styled.View<{isExpanded?: boolean}>`
	${containerCss}
`;

const Title = styled(TextMediumLarge)`
	color: ${({theme}) => theme.colors.main};
`;
const Content = styled(TextMedium)`
	margin-top: ${({theme}) => theme.scaping(1)};
	color: ${({theme}) => theme.colors.text};
	font-weight: 400;
`;
const Time = styled(TextSmall)``;

export default NotificationCard;
