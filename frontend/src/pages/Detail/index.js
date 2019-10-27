import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
    MdEdit,
    MdDelete,
    MdDateRange,
    MdPlace,
    MdChevronLeft,
} from 'react-icons/md';
import { format, parseISO, isAfter } from 'date-fns';
import { toast } from 'react-toastify';
import pt from 'date-fns/locale/pt-BR';

import api from '~/services/api';
import {
    Container,
    Content,
    EditButton,
    CancelButton,
    InfoContainer,
    InfoContent,
} from './styles';
import history from '~/services/history';

export default function Detalhes() {
    const { id } = useParams();
    const [event, setEvent] = useState();

    useEffect(() => {
        async function getEvent() {
            try {
                const response = await api.get(`/eventos/${id}`);
                setEvent(response.data);
            } catch (err) {
                history.push('/');
            }
        }

        getEvent();
    }, [id]);

    async function handleCancel() {
        try {
            await api.delete(`/eventos/${id}`);
            toast.success('Evento deletado!');
            history.push('/');
        } catch (err) {
            toast.success('Erro ao deletado!');
        }
    }

    function handleBack() {
        history.push('/');
    }

    return (
        <Container>
            {event && (
                <Content>
                    <header>
                        <div>
                            <button
                                id="back"
                                type="button"
                                onClick={handleBack}
                            >
                                <MdChevronLeft size="55" />
                            </button>
                            <strong>{event.title}</strong>
                        </div>
                        <div>
                            <EditButton
                                to={`/meetapp/${id}`}
                                enabled={isAfter(
                                    new Date(),
                                    parseISO(event.date)
                                )}
                                type="button"
                            >
                                <MdEdit size={18} color="#fff" />
                                <span>Editar</span>
                            </EditButton>
                            <CancelButton
                                onClick={handleCancel}
                                enabled={isAfter(
                                    new Date(),
                                    parseISO(event.date)
                                )}
                                type="button"
                            >
                                <MdDelete size={18} color="#fff" />
                                <span>Cancelar</span>
                            </CancelButton>
                        </div>
                    </header>

                    <img src={event.foto.url} alt="Capa do evento" />

                    <p>{event.description}</p>

                    <InfoContainer>
                        <InfoContent>
                            <MdDateRange size={20} color="#afa8b2" />
                            <p>
                                {format(
                                    parseISO(event.date),
                                    "dd 'de' MMMM, 'às' HH:mm",
                                    { locale: pt }
                                )}
                            </p>
                        </InfoContent>
                        <InfoContent>
                            <MdPlace size={20} color="#afa8b2" />
                            <p>{event.location}</p>
                        </InfoContent>
                    </InfoContainer>
                </Content>
            )}
        </Container>
    );
}
