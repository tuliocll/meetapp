import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
    height: 100vh;
    background: linear-gradient(#22202c, #402845);
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const Content = styled.div`
    width: 100%;
    max-width: 315px;
    text-align: center;

    form {
        display: flex;
        flex-direction: column;
        margin-top: 50px;

        input {
            background: rgba(0, 0, 0, 0.22);
            border-color: #0000;
            border-radius: 4px;
            height: 50px;
            color: #fff;
            font-size: 16px;
            padding: 0 15px;
            margin: 0 0 10px;
            transition: 0.5s all ease-out;

            &::placeholder {
                color: rgba(255, 255, 255, 0.5);
            }

            &:focus {
                border-bottom-left-radius: 14px;
                border-bottom-color: rgba(247, 77, 106, 0.6);
            }
        }

        span {
            color: #d04d77;
            align-self: flex-start;
            margin: 0 0 10px;
        }

        button {
            background: #f94d6a;
            font-size: 16px;
            color: #fff;
            height: 50px;
            border-color: #0000;
            border-radius: 4px;
            transition: 0.2s all ease-out;

            &:hover {
                background-color: ${darken(0.03, '#f94d6a')};
            }
        }

        a {
            color: rgba(255, 255, 255, 0.6);
            margin-top: 16px;
            font-size: 16px;
        }
    }
`;
