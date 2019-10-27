import React, { useState, useEffect } from 'react';
import { MdAdd, MdChevronRight, MdErrorOutline } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { parseISO, format } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';

import api from '~/services/api';

import { Container, Content, Meetup, NoMeetup } from './styles';
import Pagination from './Pagination';

export default function Dashboard() {
    const [page, setPage] = useState(1);
    const [events, setEvents] = useState();

    async function loadMeetups(pg = 1) {
        setPage(pg);
        const response = await api.get(`users/meetups/${pg}`);
        setEvents(response.data);
    }
    useEffect(() => {
        loadMeetups();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Container>
            <Content>
                <header>
                    <h2>Meus meetups</h2>
                    <Link to="meetapp" type="button">
                        <MdAdd size={25} color="#fff" />
                        <span>Novo meetup</span>
                    </Link>
                </header>
                {events && events.data.length > 0 ? (
                    events.data.map(event => {
                        const date = parseISO(event.date);
                        const dateFormated = format(
                            date,
                            "d 'de' MMMM,' às' HH'h'",
                            {
                                locale: pt,
                            }
                        );

                        return (
                            <Meetup key={event.id} to={`/detail/${event.id}`}>
                                <strong>{event.title}</strong>
                                <div>
                                    <span>{dateFormated}</span>
                                    <MdChevronRight size={25} color="#fff" />
                                </div>
                            </Meetup>
                        );
                    })
                ) : (
                    <NoMeetup>
                        <div>
                            <MdErrorOutline size={35} color="#fff" />
                        </div>
                        <strong>Você ainda não criou nenhum meetup!</strong>
                    </NoMeetup>
                )}

                <Pagination
                    pageTotal={events ? events.lastPage : 1}
                    page={page}
                    onChangePage={loadMeetups}
                />
            </Content>
        </Container>
    );
}
