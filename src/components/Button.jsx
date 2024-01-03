import styled from 'styled-components';

const CustomButton = ({ onClick, text }) => {
    return (
        <>
            <Styeld.Button onClick={onClick}>{text}</Styeld.Button>
        </>
    );
};
export default CustomButton;

const Button = styled.button`
    width: 70px;
    height: 34px;
    margin-left: 10px;
    border: none;
    border-radius: 8px;
    background-color: #8282e5;
    color: #fff;
`;

const Styeld = {
    Button,
};
