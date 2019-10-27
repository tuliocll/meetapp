import React, { useEffect, useState, useRef } from 'react';
import { Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { updateProfileRequest } from '~/store/modules/user/actions';
import { signOut } from '~/store/modules/auth/actions';

import Backgroud from '~/components/Background';
import Header from '~/components/Header';

import { Container, Hr, Button, Input, LogoutButton } from './styles';
import validation from './validation';

export default function Profile() {
    const profile = useSelector(state => state.user.profile);
    const dispatch = useDispatch();

    const emailRef = useRef();
    const oldPasswordRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();

    const [name, setName] = useState(profile.name);
    const [email, setEmail] = useState(profile.email);
    const [oldPassword, setOldPassword] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    useEffect(() => {
        setOldPassword('');
        setPassword('');
        setConfirmPassword('');
    }, [profile]);

    function handleSubmit() {
        validation
            .validate(
                {
                    name,
                    email,
                    oldPassword,
                    password,
                    confirmPassword,
                },
                {
                    abortEarly: true,
                }
            )
            .then(valid => {
                if (valid) {
                    dispatch(
                        updateProfileRequest({
                            name,
                            email,
                            oldPassword,
                            password,
                            confirmPassword,
                        })
                    );
                }
            })
            .catch(err => {
                Alert.alert('Campo invalido', err.errors[0]);
            });
    }

    function handleLogout() {
        dispatch(signOut());
    }

    return (
        <Backgroud>
            <Header />
            <Container>
                <Input
                    placeholder="Nome"
                    icon="person-outline"
                    onSubmitEditing={() => emailRef.current.focus()}
                    returnKeyType="next"
                    value={name}
                    onChangeText={setName}
                />
                <Input
                    placeholder="Email"
                    icon="mail-outline"
                    ref={emailRef}
                    onSubmitEditing={() => oldPasswordRef.current.focus()}
                    returnKeyType="next"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCorrect={false}
                    autoCapitalize="none"
                />

                <Hr />

                <Input
                    placeholder="Senha atual"
                    icon="lock-outline"
                    secureTextEntry
                    ref={oldPasswordRef}
                    onSubmitEditing={() => passwordRef.current.focus()}
                    returnKeyType="next"
                    value={oldPassword}
                    onChangeText={setOldPassword}
                />
                <Input
                    placeholder="Nova senha"
                    icon="lock-outline"
                    secureTextEntry
                    ref={passwordRef}
                    onSubmitEditing={() => confirmPasswordRef.current.focus()}
                    returnKeyType="next"
                    value={password}
                    onChangeText={setPassword}
                />
                <Input
                    placeholder="Confirmação de senha"
                    icon="lock-outline"
                    secureTextEntry
                    ref={confirmPasswordRef}
                    onSubmitEditing={handleSubmit}
                    returnKeyType="send"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                />

                <Button onPress={handleSubmit}>Salvar Perfil</Button>

                <LogoutButton onPress={handleLogout}>
                    Sair do Meetapp
                </LogoutButton>
            </Container>
        </Backgroud>
    );
}
