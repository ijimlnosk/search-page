import { searchApi } from 'apis/apiConfig';
import { useQuery } from 'react-query';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

const SearchPage = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get('key');
    console.log('key', query);

    const { isLoading, isError, data, error } = useQuery({
        queryKey: ['searchData', query],
        queryFn: () => searchApi(query),
    });

    if (!data) return <div>검색 결과 없음</div>;
    if (isLoading) return <div>Loding...</div>;
    if (isError) return <div>Error: {error.message}</div>;

    console.log(data);

    return (
        <>
            <Styled.Wrapper>
                <H1>----------- 검색 결과 -----------</H1>
                {data.map((el, index) => (
                    <A
                        href={`https://www.google.com/search?q=${el}`}
                        key={index}
                    >
                        {el}
                    </A>
                ))}
            </Styled.Wrapper>
        </>
    );
};
export default SearchPage;

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

const A = styled.a`
    color: #000;
    text-decoration: none;
    line-height: 2;
    &:hover {
        cursor: pointer;
    }
`;

const H1 = styled.h1``;

const Styled = {
    Wrapper,
    A,
    H1,
};
