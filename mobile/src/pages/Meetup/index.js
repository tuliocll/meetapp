import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { parseISO, format } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';

import api from '~/services/api';

import Backgroud from '~/components/Background';

import {
    Container,
    Image,
    InfoContainer,
    Description,
    TitleContainer,
    Title,
    Button,
    ButtonText,
    ButtonBack,
    TextSecondary,
} from './styles';

export default function Meetup({ navigation }) {
    const { id } = navigation.state.params;
    const [meetup, setMeetup] = useState([]);

    async function loadMeetups() {
        const response = await api.get(`eventos/${id}`);

        setMeetup({
            ...response.data,
            date: format(
                parseISO(response.data.date),
                "dd 'de' MMMM, 'às' hh:mm",
                {
                    locale: pt,
                }
            ),
        });
    }

    useEffect(() => {
        loadMeetups();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    async function subscribe() {
        try {
            await api.post(`eventos/${id}/participantes`);
            Alert.alert('Sucesso', 'Você esta inscrito neste meetup!');
            navigation.goBack();
        } catch (err) {
            Alert.alert('Erro', err.response.data.error.message);
        }
    }

    function handleSubscribe() {
        Alert.alert('Meetapp', 'Deseja se inscrever neste meetup?', [
            {
                text: 'Participar',
                onPress: subscribe,
                style: 'default',
            },
            { text: 'Cancelar' },
        ]);
    }

    function handleBack() {
        navigation.goBack();
    }

    return (
        <Backgroud>
            <Container>
                <TitleContainer>
                    <ButtonBack onPress={handleBack}>
                        <Icon name="arrow-back" size={25} color="#fff" />
                    </ButtonBack>
                    <Title>{meetup.title}</Title>
                </TitleContainer>
                <Image
                    source={{
                        uri: meetup.foto
                            ? meetup.foto.url
                            : 'https://via.placeholder.com/400x150.png?text=Carregando...',
                    }}
                />

                <Description>{meetup.description}</Description>

                <InfoContainer>
                    <Icon
                        name="event"
                        size={20}
                        color="rgba(255, 255, 255, 0.6)"
                    />
                    <TextSecondary>{meetup.date}</TextSecondary>

                    <Icon
                        name="place"
                        size={20}
                        color="rgba(255, 255, 255, 0.6)"
                    />
                    <TextSecondary>{meetup.location}</TextSecondary>
                </InfoContainer>
                <Button onPress={handleSubscribe}>
                    <ButtonText>Inscreve-se</ButtonText>
                </Button>
            </Container>
        </Backgroud>
    );
}
