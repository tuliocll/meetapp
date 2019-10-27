import * as yup from 'yup';

const validation = yup.object().shape({
    name: yup.string(),
    email: yup.string().email('Email invalido'),
    oldPassword: yup.string(),
    password: yup.string(),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password'), null], 'A confirmação de senha invalida!'),
});

export default validation;
