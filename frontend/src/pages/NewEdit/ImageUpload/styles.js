import styled from 'styled-components';

export const Container = styled.div`
    align-self: center;
    margin-bottom: 20px;
    width: 100%;

    label {
        cursor: pointer;
        &:hover {
            opacity: 0.7;
        }

        div {
            width: 100%;
            height: 200px;
            background: #18141d;
            border-radius: 4px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            margin: 0 auto;
            transition: 0.2s all ease-out;

            strong {
                color: #5e5a61;
                font-size: 16px;
                display: flex;
                align-self: center;
                margin-top: 5px;
            }

            &:hover {
                opacity: 0.7;
            }
        }

        img {
            width: 100%;
            height: 200px;
            border-radius: 4px;
            border: 3px solid rgba(255, 255, 255 0.3);
        }

        input {
            display: none;
        }
    }
`;
