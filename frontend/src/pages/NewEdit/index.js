import React, { useState, useEffect } from 'react';
import { Form, Input } from '@rocketseat/unform';
import { MdAddCircleOutline } from 'react-icons/md';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { parseISO, isAfter } from 'date-fns';

import ImageUpload from './ImageUpload';
import DatePicker from './DatePicker';

import { Container } from './styles';
import api from '~/services/api';
import history from '~/services/history';

const schema = Yup.object().shape({
    title: Yup.string().required('O titulo é obrigatorio'),
    description: Yup.string().required('A descrição é obrigatoria'),
    date: Yup.date().required('A data é obrigatoria'),
    location: Yup.string().required('A localização é obrigatoria'),
    file_id: Yup.number().required('A imagem é requerida!'),
});

export default function NewEdit() {
    const [meetup, setMeetup] = useState();
    const { id } = useParams();

    useEffect(() => {
        async function getEvent() {
            try {
                const response = await api.get(`/eventos/${id}`);

                const data = parseISO(response.data.date);

                if (isAfter(new Date(), data)) {
                    return history.push('/');
                }

                setMeetup({
                    ...response.data,
                    date: parseISO(response.data.date),
                });
            } catch (err) {
                history.push('/');
            }
        }
        if (id) {
            getEvent();
        }
    }, [id]);

    async function handleSubmit(data) {
        if (!id) {
            try {
                await api.post('/eventos', data);

                toast.success('Meetup criado com sucesso!');

                history.push('/');
            } catch (err) {
                toast.error(err.response.data.error.message);
            }
        } else {
            try {
                await api.put(`/eventos/${id}`, data);

                toast.success('Meetup atualizado com sucesso!');

                history.push('/');
            } catch (err) {
                toast.error(err.response.data.error.message);
            }
        }
    }

    return (
        <Container>
            <Form
                initialData={meetup}
                schema={!id && schema}
                onSubmit={handleSubmit}
            >
                <ImageUpload name="file_id" />

                <Input name="title" placeholder="Titulo do Meetup" />

                <Input
                    name="description"
                    type="text"
                    multiline
                    placeholder="Descrição completa"
                />

                <DatePicker name="date" />

                <Input name="location" placeholder="Localização completa" />

                <button id="btnSave" type="submit">
                    <MdAddCircleOutline size={22} color="#fff" />
                    {id ? 'Atualizar meetup' : 'Salvar meetup'}
                </button>
            </Form>
        </Container>
    );
}
