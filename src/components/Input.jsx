import styled from 'styled-components';

const CustomInput = ({ value, placeholder, onChange, onFocus, onBlur }) => {
    return (
        <>
            <Styled.Input
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                onFocus={onFocus}
                onBlur={onBlur}
            ></Styled.Input>
        </>
    );
};
export default CustomInput;

const Input = styled.input`
    width: 30%;
    height: 30px;
    border: 1px solid #ccc;
    border-radius: 8px;
`;

const Styled = {
    Input,
};
