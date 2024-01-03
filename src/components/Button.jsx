import styled from 'styled-components';

const CustomButton = ({ onClick, type, text }) => {
    return (
        <>
            <Styeld.Button onClick={onClick} type={type}>
                {text}
            </Styeld.Button>
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
    &:hover {
        cursor: pointer;
    }
`;

const Styeld = {
    Button,
};
