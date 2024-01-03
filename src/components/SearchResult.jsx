import { useQuery } from 'react-query';

const SearchResult = ({ query }) => {
    const { isLoading, isError, data, error } = useQuery({
        queryKey: ['searchData', query],
        queryFn: () => searchApi(query),
    });

    if (!data) return <div> </div>;
    if (isLoading) return <div>Loding...</div>;
    if (isError) return <div>Error: {error.message}</div>;
    console.log(data);
    return (
        <div>
            {data.map((item, index) => (
                <div key={index}>{item}</div>
            ))}
        </div>
    );
};
export default SearchResult;
