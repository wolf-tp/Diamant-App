import React from 'react';
import {ThemeProvider as StyledProvider} from 'app/styles/styled';
import {useAppSelector} from 'app/redux/store/hooks';
import {getTheme} from './reducer';

interface Props {
	children?: React.ReactNode | React.ReactNode[];
}

const ThemeProvider = ({children}: Props) => {
	const theme = useAppSelector(getTheme);
	return <StyledProvider theme={theme}>{children}</StyledProvider>;
};

export default ThemeProvider;
