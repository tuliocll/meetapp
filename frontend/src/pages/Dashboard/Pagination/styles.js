import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
    display: flex;
    flex-direction: row;
    margin-top: 30px;
    justify-content: center;
    align-content: center;

    ul {
        display: flex;
    }
`;

export const PageButton = styled.button`
    background-color: #f94d6a;
    color: #fff;
    font-size: 16px;
    border-style: solid;
    border-color: ${props => (props.current ? '#fff' : '#0000')};
    border-radius: 4px;
    margin: 10px;
    transition: 0.2s all ease-out;
    padding: 10px 15px;

    &:hover {
        background-color: ${darken(0.1, '#f94d6a')};
    }
`;
