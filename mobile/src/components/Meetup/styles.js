import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
    background-color: #fff;
    margin-bottom: 20px;
    border-radius: 4px;
`;

export const Image = styled.Image`
    display: flex;
    justify-content: center;
    width: 100%;
    height: 130px;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
`;

export const Detalhes = styled.View`
    padding: 15px;
`;

export const Title = styled.Text`
    color: #333333;
    font-size: 17px;
    font-weight: bold;
    margin-bottom: 5px;
`;

export const Span = styled.View`
    flex-direction: row;
    align-items: center;
    margin-left: 5px;
`;

export const Subtitle = styled.Text`
    font-size: 13px;
    color: rgba(1, 1, 1, 0.6);
    margin-left: 5px;
`;

export const Button = styled(RectButton).attrs(props => ({
    enabled: !props.disabled,
}))`
    background-color: #f94d6a;
    opacity: ${props => (props.disabled ? 0.5 : 1)};
    padding: 10px;
    border-radius: 4px;
    margin-top: 10px;
`;

export const ButtonText = styled.Text`
    align-self: center;
    color: #fff;
    font-weight: bold;
`;
