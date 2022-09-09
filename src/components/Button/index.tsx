import { ButtonContainer, ButtonVariants } from './Button.styles';

interface ButtonProps {
    variants?: ButtonVariants;
}

export function Button({ variants = 'primary' }: ButtonProps) {
    return (
        <ButtonContainer variants={variants}>Button</ButtonContainer>
    );
}