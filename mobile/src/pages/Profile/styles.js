import { Platform } from 'react-native';
import styled from 'styled-components/native';
import BaseInput from '~/components/Input';
import BaseButton from '~/components/Button';

export const Container = styled.KeyboardAvoidingView.attrs({
    showsVerticalScrollIndicator: false,
    enabled: Platform.OS === 'ios',
    behavior: 'padding',
})`
    flex: 1;
    padding: 20px;
`;

export const Form = styled.View`
    align-self: stretch;
    margin-top: 50px;
`;

export const Input = styled(BaseInput)`
    margin-bottom: 10px;
`;

export const Hr = styled.View`
    border-bottom-color: rgba(255, 255, 255, 0.1);
    border-bottom-width: 1px;
    margin: 15px 0;
`;

export const Button = styled(BaseButton)`
    margin-bottom: 10px;
`;

export const LogoutButton = styled(BaseButton)`
    background-color: #d44059;
    opacity: 0.9;
`;
