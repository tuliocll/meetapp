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

    header > div {
        display: flex;
        align-items: center;
    }

    header > div > #back {
        color: #fff;
        padding: 0px;
        border-width: 0px;
        background: #0000;
    }

    strong {
        font-size: 32px;
        color: #fff;
    }

    img {
        width: 100%;
        height: 200px;
        border-radius: 4px;
        border: 3px solid rgba(255, 255, 255 0.3);
    }

    p {
        margin-top: 20px;
        font-size: 18px;
        color: #fff;
    }
`;

export const EditButton = styled(Link)`
    display: flex;
    align-items: center;
    background-color: #4dbaf9;
    opacity: ${props => (props.enabled ? 0.5 : 1)};
    pointer-events: ${props => (props.enabled ? 'none' : 'all')};
    color: #fff;
    font-size: 16px;
    border-color: #0000;
    border-radius: 4px;
    margin-left: 10px;
    padding: 10px 20px;
    max-height: 40px;
    transition: 0.2s all ease-out;

    &:hover {
        background-color: ${darken(0.2, '#4dbaf9')};
    }

    span {
        margin-left: 5px;
    }
`;

export const CancelButton = styled.button`
    display: flex;
    align-items: center;
    background-color: #f94d6a;
    opacity: ${props => (props.enabled ? 0.5 : 1)};
    pointer-events: ${props => (props.enabled ? 'none' : 'all')};
    color: #fff;
    font-size: 16px;
    border-color: #0000;
    border-radius: 4px;
    margin-left: 10px;
    padding: 10px 20px;
    max-height: 40px;
    transition: 0.2s all ease-out;

    &:hover {
        background-color: ${darken(0.1, '#f94d6a')};
    }

    span {
        margin-left: 5px;
    }
`;

export const InfoContainer = styled.div`
    display: flex;
    margin-top: 40px;
    justify-content: flex-start;
    align-items: center;
    align-content: center;
`;

export const InfoContent = styled.div`
    display: flex;
    align-items: center;

    p {
        color: #afa8b2;
        font-size: 14px;
        margin: 0px 10px;
    }
`;
