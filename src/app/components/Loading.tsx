import styled from 'app/styles/styled';
import React from 'react';
interface Props {}

const Loading = (_: Props) => {
	return <LoadingComponent size={'large'} color={'#fff'} />;
};
const LoadingComponent = styled.ActivityIndicator`
	margin-top: ${({theme}) => theme.scapingElement};
	align-self: center;
`;

export default Loading;
