import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
    background: rgba(0, 0, 0, 0.3);
    padding: 0 30px;
`;

export const Content = styled.div`
    height: 64px;
    max-width: 900px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    -webkit-box-shadow: 1px 3px 5px 0px rgba(0, 0, 0, 0.13);
    -moz-box-shadow: 1px 3px 5px 0px rgba(0, 0, 0, 0.13);
    box-shadow: 1px 3px 5px 0px rgba(0, 0, 0, 0.13);

    nav {
        display: flex;
        align-items: center;
        img {
            margin-right: 20px;
            padding-right: 20px;
            border-right: 1px solid rgba(151, 151, 151, 0.1);
        }

        a {
            font-weight: bold;
            color: #f94d6a;
        }
    }

    aside {
        display: flex;
        align-items: center;
    }
`;

export const Profile = styled.div`
    display: flex;
    margin-left: 20px;

    div {
        text-align: right;
        margin-right: 10px;

        strong {
            display: block;
            color: #fff;
        }

        a {
            display: block;
            margin-top: 2px;
            font-size: 12px;
            color: #999;
        }
    }

    img {
        width: 42px;
        height: 42px;
        border-radius: 50%;
    }

    button {
        background-color: #f94d6a;
        color: #fff;
        border-color: #0000;
        border-radius: 4px;
        padding: 5px 15px;
        margin-left: 10px;
        transition: 0.2s all ease-out;

        &:hover {
            background-color: ${darken(0.1, '#f94d6a')};
        }
    }
`;
