import searchImg from 'assets/imgs/pngwing.com.png';
import styled from 'styled-components';

const CustomInput = ({ value, placeholder, onChange, onFocus, onBlur }) => {
    return (
        <>
            <Img src={searchImg} />
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
    padding-left: 30px;
`;

const Img = styled.img`
    position: absolute;
    left: 34.5%;
    width: 14px;
    height: 14px;
`;

const Styled = {
    Img,
    Input,
};
