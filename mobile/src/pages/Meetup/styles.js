import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.ScrollView`
    padding: 20px;
`;

export const Image = styled.Image`
    margin-bottom: 10px;
    width: 100%;
    height: 150px;
    border-radius: 4px;
`;

export const InfoContainer = styled.View`
    margin-top: 20px;
    justify-content: flex-start;
    flex-direction: row;
`;

export const TitleContainer = styled.View`
    flex-direction: row;
    align-items: center;
    margin-bottom: 20px;
`;

export const Title = styled.Text`
    color: #fff;
    font-weight: bold;
    font-size: 22px;
    margin-left: 10px;
`;

export const Description = styled.Text`
    color: #fff;
    text-align: justify;
`;

export const TextSecondary = styled.Text`
    color: rgba(255, 255, 255, 0.6);
    text-align: justify;
    margin: 0 30px 0px 5px;
`;

export const Button = styled(RectButton)`
    background-color: #f94d6a;
    opacity: ${props => (props.disabled ? 0.5 : 1)};
    padding: 10px;
    border-radius: 4px;
    margin-top: 10px;
    margin-bottom: 30px;
`;

export const ButtonText = styled.Text`
    align-self: center;
    color: #fff;
    font-weight: bold;
`;

export const ButtonBack = styled.TouchableOpacity``;
