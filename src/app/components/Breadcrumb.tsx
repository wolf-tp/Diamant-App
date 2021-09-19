import styled from 'app/styles/styled';
import React, {useCallback, useState} from 'react';
import {ViewProps} from 'react-native';

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
const ContainerView = styled.View`
	flex-direction: row;
`;
const TextCategory = styled.Text`
	color: ${({theme}) => theme.colors.white};
`;
export default Breadcrumb;
