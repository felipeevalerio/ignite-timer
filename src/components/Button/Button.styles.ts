import styled from 'styled-components';

export type ButtonVariants = 'primary' | 'secondary' | 'danger' | 'sucess'

interface ButtonContainerProps {
    variants: ButtonVariants;
}

const buttonVariants = {
    primary: 'red',
    secondary: 'orange',
    danger: 'red',
    sucess: 'green'
};

export const ButtonContainer = styled.button<ButtonContainerProps>`
    width: 120px;
    height: 100px;
    background-color: ${props => props.theme.secondary};
    /* ${props => {
        return `
            background-color: ${buttonVariants[props.variants]}
        `;
    }} */
`;