import { searchApi } from 'apis/apiConfig';
import { useQuery } from 'react-query';
import { useLocation } from 'react-router-dom';

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
            <div>
                {data.map((el, index) => (
                    <div key={index}>{el}</div>
                ))}
            </div>
        </>
    );
};
export default SearchPage;
