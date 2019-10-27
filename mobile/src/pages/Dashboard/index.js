import React, { useEffect, useState, useMemo } from 'react';
import { withNavigationFocus } from 'react-navigation';
import { format, subDays, addDays } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '~/services/api';

import Backgroud from '~/components/Background';
import Header from '~/components/Header';
import Meetup from '~/components/Meetup';

import {
    Container,
    List,
    PagenationContainer,
    PageButton,
    PaginationText,
    NoDataFound,
} from './styles';

function Dashboard({ navigation, isFocused }) {
    const [meetups, setMeetups] = useState([]);
    const [date, setDate] = useState(new Date());
    const [lastPage, setLastPage] = useState(1);
    const [page, setPage] = useState(1);

    const dateFormatted = useMemo(
        () => format(date, "d 'de' MMMM", { locale: pt }),
        [date]
    );

    async function loadMeetups() {
        const searchDate = format(date, 'yyyy-MM-dd');
        const response = await api.get(
            `eventos?date=${searchDate}&page=${page}`
        );

        setLastPage(response.data.lastPage);
        if (response.data.data.length > 0) {
            setMeetups(old => [...old, ...response.data.data]);
        } else {
            setPage(1);
        }
    }

    function handlePrevDay() {
        setMeetups([]);
        setDate(subDays(date, 1));
    }

    function handleNextDay() {
        setMeetups([]);
        setDate(addDays(date, 1));
    }

    useEffect(() => {
        if (isFocused) {
            loadMeetups();
        } else {
            setMeetups([]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [date, page, isFocused]);

    function handleSubscribe(id) {
        navigation.navigate('Meetup', { id });
    }

    function handleNextPage() {
        if (page < lastPage) {
            setPage(page + 1);
        }
    }

    return (
        <Backgroud>
            <Container>
                <Header />
                <PagenationContainer>
                    <PageButton onPress={handlePrevDay}>
                        <Icon name="chevron-left" size={30} color="#fff" />
                    </PageButton>

                    <PaginationText>{dateFormatted}</PaginationText>

                    <PageButton onPress={handleNextDay}>
                        <Icon name="chevron-right" size={30} color="#fff" />
                    </PageButton>
                </PagenationContainer>
                <List
                    data={meetups}
                    keyExtractor={item => String(item.id)}
                    onEndReached={handleNextPage}
                    renderItem={({ item }) => (
                        <Meetup
                            data={item}
                            buttonText="Realizar Inscrição"
                            handleClick={handleSubscribe}
                        />
                    )}
                />
                {meetups.length < 1 && (
                    <NoDataFound>Nenhum meetup nesta data!</NoDataFound>
                )}
            </Container>
        </Backgroud>
    );
}

export default withNavigationFocus(Dashboard);
