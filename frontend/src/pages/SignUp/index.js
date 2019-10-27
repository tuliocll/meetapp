import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import logo from '~/assets/logo.svg';

import { signUpRequest } from '~/store/modules/auth/actions';

const schema = Yup.object().shape({
    name: Yup.string().required('O nome é obrigatorio'),
    email: Yup.string()
        .email('Formato de email incorreto')
        .required('O e-mail é obrigatorio'),
    password: Yup.string()
        .min(6, 'O tamanho minimo é 6 caracteres')
        .required('A senha é obrigatoria'),
    password_confirmation: Yup.string().oneOf(
        [Yup.ref('password'), null],
        'A senha não esta igual'
    ),
});

export default function SignUp() {
    const dispatch = useDispatch();

    function handleSubmit({ name, email, password, password_confirmation }) {
        dispatch(signUpRequest(name, email, password, password_confirmation));
    }

    return (
        <>
            <img src={logo} alt="MettApp" />

            <Form onSubmit={handleSubmit} schema={schema}>
                <Input
                    name="name"
                    type="text"
                    autoComplete="off"
                    placeholder="Nome completo"
                />
                <Input
                    name="email"
                    type="email"
                    autoComplete="off"
                    placeholder="Digite seu e-mail"
                />
                <Input
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    placeholder="Sua senha secreta"
                />
                <Input
                    name="password_confirmation"
                    type="password"
                    autoComplete="new-password"
                    placeholder="Repita a senha"
                />

                <button type="submit">Criar Conta</button>
                <Link to="/">Já tenho login</Link>
            </Form>
        </>
    );
}
