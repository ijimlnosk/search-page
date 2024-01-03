import SearchBar from 'components/SearchBar';
import styled from 'styled-components';

const MainPage = () => {
    return (
        <>
            <Styled.Wrapper>
                <Styled.Box>
                    <Styled.H1>DingGle</Styled.H1>
                </Styled.Box>
                <SearchBar />
            </Styled.Wrapper>
        </>
    );
};
export default MainPage;

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-family: var(--font-RubikDoodleShadow);
`;

const Box = styled.div`
    margin-top: 35vh;
`;
const H1 = styled.h1`
    font-size: 54px;
    letter-spacing: 10px;
`;

const Styled = {
    Wrapper,
    Box,
    H1,
};
