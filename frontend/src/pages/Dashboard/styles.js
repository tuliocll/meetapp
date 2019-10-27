import styled from 'styled-components';
import { darken } from 'polished';
import { Link } from 'react-router-dom';

export const Container = styled.div`
    padding: 0 30px;
`;
export const Content = styled.div`
    max-width: 900px;
    min-height: 100vh;
    margin: 0px auto;
    display: flex;
    flex-direction: column;

    header {
        display: flex;
        justify-content: space-between;
        margin: 50px 0;
    }

    h2 {
        font-size: 32px;
        color: #fff;
    }

    header > a {
        display: flex;
        align-items: center;
        background-color: #f94d6a;
        color: #fff;
        font-size: 16px;
        border-color: #0000;
        border-radius: 4px;
        margin-left: 10px;
        transition: 0.2s all ease-out;
        padding: 5px 10px;

        &:hover {
            background-color: ${darken(0.1, '#f94d6a')};
        }

        span {
            margin-left: 5px;
        }
    }
`;

export const Meetup = styled(Link)`
    cursor: pointer;
    background: rgba(0, 0, 0, 0.3);
    padding: 20px;
    border-radius: 4px;
    display: flex;
    justify-content: space-between;
    transition: 0.3s all ease-out;
    margin: 5px 0;

    &:hover {
        background-color: ${darken(0.1, 'rgba(0, 0, 0, 0.5)')};
        margin: 10px 0;

        strong {
            font-size: 20px;
        }
    }

    strong {
        font-size: 18px;
        color: #fff;
        transition: 0.3s all ease-out;
    }

    div {
        display: flex;
        align-items: center;

        span {
            font-size: 16px;
            color: rgba(255, 255, 255, 0.6);
            margin-right: 20px;
        }
    }
`;

export const NoMeetup = styled.div`
    background: rgba(0, 0, 0, 0.3);
    padding: 20px;
    border-radius: 4px;
    display: flex;
    transition: 0.3s all ease-out;
    margin: 5px 0;
    align-items: center;

    strong {
        font-size: 18px;
        color: #fff;
        margin: 0px auto;
    }
    &:hover {
        background-color: ${darken(0.1, 'rgba(0, 0, 0, 0.5)')};
        margin: 10px 0;
    }
`;
