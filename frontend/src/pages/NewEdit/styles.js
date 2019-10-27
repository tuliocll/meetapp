import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
    padding: 0 30px;

    form {
        max-width: 900px;
        min-height: 100vh;
        margin: 0px auto;
        display: flex;
        flex-direction: column;
        margin-top: 50px;

        input {
            background: rgba(0, 0, 0, 0.22);
            border-color: #0000;
            border-radius: 4px;
            height: 45px;
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

        textarea {
            background: rgba(0, 0, 0, 0.22);
            border-color: #0000;
            border-radius: 4px;
            height: 150px;
            color: #fff;
            font-size: 16px;
            padding: 15px 15px;
            margin: 0 0 10px;
            transition: 0.5s all ease-out;
            resize: none;

            &::placeholder {
                color: rgba(255, 255, 255, 0.5);
            }

            &:focus {
                border-bottom-width: 2px;
                border-bottom-left-radius: 24px;
                border-bottom-color: rgba(247, 77, 106, 0.6);
            }
        }

        span {
            color: #d04d77;
            align-self: flex-start;
            margin: 0 0 10px;
        }

        #btnSave {
            display: flex;
            flex-direction: row;
            justify-content: space-around;
            align-items: center;
            align-self: flex-end;
            background: #f94d6a;
            width: 160px;
            padding: 5px 10px;
            font-size: 16px;
            color: #fff;
            font-size: 14px;
            font-weight: bold;
            border-color: #0000;
            border-radius: 4px;
            transition: 0.2s all ease-out;

            &:hover {
                background-color: ${darken(0.03, '#f94d6a')};
            }
        }
    }

    /* fix pro react date picker */
    .react-datepicker__input-container > input {
        width: 100%;
    }
`;
