import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Image } from 'react-native';

import logo from '~/assets/logo.png';

import Background from '~/components/Background';
import { signUpRequest } from '~/store/modules/auth/actions';

import {
    Container,
    Form,
    FormInput,
    SubmitButton,
    SignLinkText,
    SignLink,
} from './styles';

export default function SignUp({ navigation }) {
    const dispatch = useDispatch();

    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();

    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [passwordConfirm, setPasswordConfirm] = useState();

    const loading = useSelector(state => state.auth.loading);

    function handleSubmit() {
        dispatch(signUpRequest(name, email, password, passwordConfirm));
    }

    return (
        <Background>
            <Container>
                <Image source={logo} />

                <Form>
                    <FormInput
                        icon="person-outline"
                        autoCorrect={false}
                        autoCapitalize="none"
                        placeholder="Nome completo"
                        returnKeyType="next"
                        onSubmitEditing={() => emailRef.current.focus()}
                        value={name}
                        onChangeText={setName}
                    />
                    <FormInput
                        icon="mail-outline"
                        keyboardType="email-address"
                        autoCorrect={false}
                        autoCapitalize="none"
                        placeholder="Digite seu email"
                        ref={emailRef}
                        returnKeyType="next"
                        onSubmitEditing={() => passwordRef.current.focus()}
                        value={email}
                        onChangeText={setEmail}
                    />

                    <FormInput
                        icon="lock-outline"
                        secureTextEntry
                        placeholder="Digite sua senha"
                        ref={passwordRef}
                        returnKeyType="send"
                        onSubmitEditing={() =>
                            passwordConfirmRef.current.focus()
                        }
                        value={password}
                        onChangeText={setPassword}
                    />

                    <FormInput
                        icon="lock-outline"
                        secureTextEntry
                        placeholder="Confirmar senha"
                        ref={passwordConfirmRef}
                        returnKeyType="send"
                        onSubmitEditing={handleSubmit}
                        value={passwordConfirm}
                        onChangeText={setPasswordConfirm}
                    />

                    <SubmitButton onPress={handleSubmit}>
                        Criar conta
                    </SubmitButton>

                    <SignLink
                        onPress={() => navigation.navigate('SignIn')}
                        loading={loading}
                    >
                        <SignLinkText>Ja tenho conta</SignLinkText>
                    </SignLink>
                </Form>
            </Container>
        </Background>
    );
}
