import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { withNavigationFocus } from 'react-navigation';

import api from '~/services/api';

import Backgroud from '~/components/Background';
import Header from '~/components/Header';
import Meetup from '~/components/Meetup';

import { Container, List } from './styles';

function Meetups({ isFocused }) {
    const [meetups, setMeetups] = useState([]);

    async function loadMeetups() {
        const response = await api.get('users');
        setMeetups(response.data);
    }

    useEffect(() => {
        if (isFocused) {
            loadMeetups();
        }
    }, [isFocused]);

    async function cancelSubscription(idMeetup, idSub) {
        try {
            await api.delete(`eventos/${idMeetup}/participantes/${idSub}`);
            Alert.alert('Sucesso', 'Inscrição cancelada!');
            loadMeetups();
        } catch (err) {
            Alert.alert('Erro', err.response.data.error.message);
        }
    }

    function handleCancel(idMeetup, idSub) {
        Alert.alert('Meetapp', 'Deseja cancelar a inscrição neste meetup?', [
            {
                text: 'Sim',
                onPress: () => cancelSubscription(idMeetup, idSub),
                style: 'default',
            },
            { text: 'Não' },
        ]);
    }

    return (
        <Backgroud>
            <Container>
                <Header />

                <List
                    data={meetups}
                    keyExtractor={item => String(item.id)}
                    renderItem={({ item }) => (
                        <Meetup
                            data={item}
                            buttonText="Cancelar Inscrição"
                            handleClick={handleCancel}
                        />
                    )}
                />
            </Container>
        </Backgroud>
    );
}

export default withNavigationFocus(Meetups);
