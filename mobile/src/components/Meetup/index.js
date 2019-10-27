import React, { useMemo, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { parseISO, format, isBefore } from 'date-fns';
import pt from 'date-fns/esm/locale/pt-BR';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
    Container,
    Image,
    Subtitle,
    Span,
    Button,
    ButtonText,
    Title,
    Detalhes,
} from './styles';

export default function Meetup({ data, buttonText, handleClick }) {
    const [date, setDate] = useState('');
    const [meetup, setMeetup] = useState();
    const [disabled, setDisabled] = useState(false);

    const userId = useSelector(state => state.user.profile.id);

    useMemo(() => {
        setDate(
            format(
                parseISO(data.evento ? data.evento.date : data.date),
                "dd 'de' MMMM yyyy, 'às' hh:mm",
                { locale: pt }
            )
        );
    }, [data.date, data.evento]);

    useEffect(() => {
        if (data.evento) {
            setMeetup({
                ...data.evento,
                idSub: data.id,
            });
            return;
        }

        data.participantes.forEach(participante => {
            if (participante.user_id === userId) {
                setDisabled(true);
            }
        });

        if (data.user_id === userId) {
            setDisabled(true);
        }

        if (isBefore(parseISO(data.date), new Date())) {
            setDisabled(true);
        }

        setMeetup(data);
    }, [data, date, userId]);

    return (
        <Container>
            {meetup && (
                <>
                    <Image
                        source={{
                            uri: meetup.foto.url,
                        }}
                    />

                    <Detalhes>
                        <Title>{meetup.title}</Title>

                        <Span>
                            <Icon name="event" color="rgba(1, 1, 1, 0.6)" />
                            <Subtitle>{date}</Subtitle>
                        </Span>
                        <Span>
                            <Icon name="place" color="rgba(1, 1, 1, 0.6)" />
                            <Subtitle>{meetup.location}</Subtitle>
                        </Span>
                        <Span>
                            <Icon name="person" color="rgba(1, 1, 1, 0.6)" />
                            <Subtitle>{`Organizador: ${meetup.user.name}`}</Subtitle>
                        </Span>

                        <Button
                            disabled={disabled}
                            onPress={() => {
                                handleClick(meetup.id, meetup.idSub);
                            }}
                        >
                            <ButtonText>{buttonText}</ButtonText>
                        </Button>
                    </Detalhes>
                </>
            )}
        </Container>
    );
}
