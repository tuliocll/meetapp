import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
`;

export const List = styled.FlatList.attrs({
    showsVerticalScrollIndicator: false,
    contentContainerStyle: { padding: 30, paddingTop: 0 },
})`
    flex-grow: 0;
`;
export const PagenationContainer = styled.View`
    align-self: center;
    align-items: center;
    flex-direction: row;
    margin: 30px 0;
`;

export const PageButton = styled.TouchableOpacity``;

export const PaginationText = styled.Text`
    color: #fff;
    font-size: 16px;
    font-weight: bold;
    margin: 0 15px;
`;

export const NoDataFound = styled.Text`
    align-self: center;
    margin-top: 20px;
    color: #fff;
    font-size: 20px;
    font-weight: bold;
`;
