import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { signInRequest } from '~/store/modules/auth/actions';

import logo from '~/assets/logo.svg';

const schema = Yup.object().shape({
    email: Yup.string()
        .email('Formato de email incorreto')
        .required('O e-mail é obrigatorio'),
    password: Yup.string().required('A senha é obrigatoria'),
});

export default function SignIn() {
    const dispatch = useDispatch();
    const loading = useSelector(state => state.auth.loading);

    function handleSubmit({ email, password }) {
        dispatch(signInRequest(email, password));
    }

    return (
        <>
            <img src={logo} alt="MettApp" />

            <Form onSubmit={handleSubmit} schema={schema}>
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

                <button type="submit">
                    {loading ? 'Carregando...' : 'Acessar'}
                </button>
                <Link to="/register">Criar conta grauita</Link>
            </Form>
        </>
    );
}
