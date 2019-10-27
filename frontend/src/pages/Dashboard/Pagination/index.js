import React from 'react';
import PropTypes from 'prop-types';

import { Container, PageButton } from './styles';

export default function Pagination({ pageTotal, page, onChangePage }) {
    function PageItens() {
        const pages = [];
        for (let i = 1; i <= pageTotal; i++) {
            pages.push(
                <li key={i}>
                    <PageButton
                        type="button"
                        current={page === i}
                        onClick={() => onChangePage(i)}
                    >
                        {i}
                    </PageButton>
                </li>
            );
        }

        return pages;
    }

    return (
        <Container>
            <ul>
                <PageItens />
            </ul>
        </Container>
    );
}

Pagination.propTypes = {
    pageTotal: PropTypes.number.isRequired,
    page: PropTypes.number.isRequired,
    onChangePage: PropTypes.func.isRequired,
};
