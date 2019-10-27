import React, { useState, useRef, useEffect } from 'react';
import { useField } from '@rocketseat/unform';
import { MdPhotoCamera } from 'react-icons/md';
import api from '~/services/api';

import { Container } from './styles';

export default function ImageUpload() {
    const { defaultValue, registerField } = useField('foto');
    const { error } = useField('file_id');

    const [file, setFile] = useState(defaultValue && defaultValue.id);
    const [preview, setPreview] = useState(defaultValue && defaultValue.url);

    const ref = useRef();

    useEffect(() => {
        if (ref.current) {
            registerField({
                name: 'file_id',
                ref: ref.current,
                path: 'dataset.file',
            });
        }
        setPreview(defaultValue && defaultValue.url);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ref, defaultValue]);

    async function handleChange(e) {
        const data = new FormData();

        data.append('file', e.target.files[0]);

        const response = await api.post('files', data);

        const { id, url } = response.data;

        setFile(id);
        setPreview(url);
    }

    return (
        <Container>
            <label htmlFor="avatar">
                {preview ? (
                    <img src={preview} alt="Previa" />
                ) : (
                    <div>
                        <MdPhotoCamera size={36} color="#5e5a61" />
                        <strong>Selecionar imagem</strong>
                    </div>
                )}
                <input
                    type="file"
                    id="avatar"
                    accept="image/*"
                    data-file={file}
                    onChange={handleChange}
                    ref={ref}
                />
            </label>
            {error && <span>{error}</span>}
        </Container>
    );
}
