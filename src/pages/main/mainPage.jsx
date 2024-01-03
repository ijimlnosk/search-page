import SearchBar from 'components/SearchBar';
import styled from 'styled-components';

const MainPage = () => {
    return (
        <>
            <Styled.Wrapper>
                <Styled.Box>
                    <Styled.H1>DwingGul</Styled.H1>
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
`;

const Box = styled.div`
    margin-top: 35vh;
`;
const H1 = styled.h1`
    font-size: 54px;
`;

const Styled = {
    Wrapper,
    Box,
    H1,
};
