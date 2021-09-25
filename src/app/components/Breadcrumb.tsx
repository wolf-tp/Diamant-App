import {centerItemsCss, TextLarge} from 'app/styles/globalStyled';
import {getAppTheme} from 'app/styles/reducer';
import styled from 'app/styles/styled';
import React, {useCallback, useState} from 'react';
import {ViewProps} from 'react-native';
import {IconChevronRight} from './icons/Icons';

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
}

export const BreadCrumbArray = ({style, data}: PropsArray) => {
	const theme = getAppTheme();
	return (
		<ContainerView style={style}>
			{data.map(({title, onPress}, index) => (
				<ContainerView key={index}>
					<TextCrumb
						onPress={onPress}
						style={index === data.length - 1 && {color: theme.colors.main}}
					>
						{title}
					</TextCrumb>
					{index < data.length - 1 && <IconChevronRight style={{paddingHorizontal: 15}} />}
				</ContainerView>
			))}
		</ContainerView>
	);
};
const ContainerView = styled.View`
	flex-direction: row;
	${centerItemsCss}
`;
const Touch = styled.TouchableOpacity``;
const TextCategory = styled.Text`
	color: ${({theme}) => theme.colors.white};
`;
const TextCrumb = styled(TextLarge)``;
export default Breadcrumb;
