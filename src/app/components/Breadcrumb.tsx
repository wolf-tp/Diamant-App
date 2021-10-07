import {popNavigate} from 'app/navigation/rootNavigation';
import {centerItemsCss, TextLarge, TextMedium} from 'app/styles/globalStyled';
import {getAppTheme} from 'app/styles/reducer';
import styled from 'app/styles/styled';
import React, {useCallback, useState} from 'react';
import {ViewProps} from 'react-native';
import {BackHeader, IconChevronRight} from './icons/Icons';

const dataExample = {category: 'CATEGORY', sub_category: 'SUB-CATEGORY', product: 'PRODUCT A'};
type DataType = {
	[key: string]: string;
};
type Props = ViewProps;
const Breadcrumb = ({style}: Props) => {
	const [data] = useState<DataType>({...dataExample});
	const getData = useCallback(() => {
		let content = [];
		for (const key in data) {
			if (Object.prototype.hasOwnProperty.call(data, key)) {
				const element = data[key];
				content.push(
					<>
						<TextCategory>{element}</TextCategory>
						{key !== 'product' && <TextCategory>{' >> '}</TextCategory>}
					</>
				);
			}
		}
		return content;
	}, [data]);
	return <ContainerView style={style}>{getData()}</ContainerView>;
};
interface PropsArray extends Props {
	data: {
		title: string;
		onPress?: () => void;
	}[];
	isDoubleArray?: boolean;
}

export const BreadCrumbArray = ({style, data, isDoubleArray}: PropsArray) => {
	const theme = getAppTheme();
	const TextComponent = isDoubleArray ? TextSmallCrumb : TextCrumb;
	return (
		<ContainerView style={style}>
			<BackOpacity onPress={popNavigate}>
				<BackHeader />
			</BackOpacity>
			{data.map(({title, onPress}, index) => (
				<ContainerView key={index}>
					<TextComponent
						onPress={onPress}
						style={index === data.length - 1 && {color: theme.colors.main}}
					>
						{title}
					</TextComponent>
					{index < data.length - 1 ? (
						isDoubleArray ? (
							<TextCategory style={{paddingHorizontal: 5}}>{'>>'}</TextCategory>
						) : (
							<IconChevronRight style={{paddingHorizontal: 15}} />
						)
					) : null}
				</ContainerView>
			))}
		</ContainerView>
	);
};
const ContainerView = styled.View`
	padding-vertical: 8px;
	flex-direction: row;
	${centerItemsCss}
`;

const BackOpacity = styled.TouchableOpacity`
	background-color: ${({theme}) => theme.colors.background};
	padding-right: ${({theme}) => theme.scaping(3)};
	border-radius: ${({theme}) => theme.borderRadius};
`;
const TextCategory = styled.Text`
	color: ${({theme}) => theme.colors.white};
`;
const TextSmallCrumb = styled(TextMedium)`
	text-transform: uppercase;
`;
const TextCrumb = styled(TextLarge)`
	text-transform: uppercase;
`;
export default Breadcrumb;
