import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';

import { updateProfileRequest } from '~/store/modules/user/actions';

import AvatarInput from './AvatarInput';

import { Container } from './styles';

export default function Perfil() {
    const dispatch = useDispatch();
    const profile = useSelector(state => state.user.profile);

    function handleSubmit(data) {
        dispatch(updateProfileRequest(data));
    }

    return (
        <Container>
            <Form initialData={profile} onSubmit={handleSubmit}>
                <AvatarInput name="file_id" />

                <Input name="name" placeholder="Nome Completo" />
                <Input
                    name="email"
                    type="email"
                    placeholder="Seu endereço de e-mail"
                />

                <hr />

                <Input
                    name="oldPassword"
                    type="password"
                    placeholder="Senha atual"
                />
                <Input
                    name="password"
                    type="password"
                    placeholder="Nova Senha"
                />
                <Input
                    name="confirmPassword"
                    type="password"
                    placeholder="Repita a nova senha"
                />

                <button type="submit">Atualizar perfil</button>
            </Form>
        </Container>
    );
}
