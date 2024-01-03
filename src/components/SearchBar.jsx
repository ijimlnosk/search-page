import { searchApi } from 'apis/apiConfig';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import CustomInput from './Input';

const SearchBar = () => {
    const [input, setInput] = useState('');
    const [recentSearches, setRecentSearches] = useState([]);
    const [showRecentSearches, setShowRecentSearches] = useState(false);
    const [selectedSearchIndex, setSelectedSearchIndex] = useState(-1); // 선택된 항목이 없음
    const navigate = useNavigate();

    const { isLoding, isError, data, error } = useQuery({
        queryKey: ['searchData', input],
        queryFn: () => searchApi(input),
        enabled: !!input,
    });

    if (isLoding) return <div>Loding...</div>;
    if (isError) return <div>Error: {error.message}</div>;

    useEffect(() => {
        try {
            const storedSearches = localStorage.getItem('recentSearches');
            if (storedSearches) {
                setRecentSearches(JSON.parse(storedSearches));
            }
        } catch (error) {
            console.error(
                'Error parsing recent searches from localStorage:',
                error,
            );
            setRecentSearches([]);
        }
    }, []);

    useEffect(() => {
        const handleKeyDown = e => {
            if (e.key === 'ArrowUp' && selectedSearchIndex > 0) {
                setSelectedSearchIndex(selectedSearchIndex - 1);
            } else if (
                e.key === 'ArrowDown' &&
                selectedSearchIndex < recentSearches.length - 1
            ) {
                setSelectedSearchIndex(selectedSearchIndex + 1);
            } else if (e.key === 'Enter' && selectedSearchIndex !== -1) {
                onRecentSearchClick(recentSearches[selectedSearchIndex]);
            }
        };
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [selectedSearchIndex, recentSearches]);

    const handleInputChange = e => {
        const value = e.target.value;
        setInput(value);
        setShowRecentSearches(!value);
    };

    const updateRecentSearches = search => {
        const updatedSearches = [
            search,
            ...recentSearches.filter(s => s !== search),
        ].slice(0, 5);
        setRecentSearches(updatedSearches);
        localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
    };

    const onSearchClick = () => {
        if (input.trim()) {
            updateRecentSearches(input);
            navigate(`/search?key=${encodeURIComponent(input)}`);
            setInput('');
        }
    };

    const onRecentSearchClick = search => {
        setInput(search);
        navigate(`/search?key=${encodeURIComponent(search)}`);
        setSelectedSearchIndex(-1);
    };

    return (
        <>
            <Styled.Form onSubmit={onSearchClick}>
                <Styled.Wrapper
                    onFocus={() => setShowRecentSearches(!input)}
                    onBlur={() => {
                        setTimeout(() => setShowRecentSearches(false), 100);
                    }}
                >
                    <CustomInput
                        value={input}
                        placeholder={'단어를 입력해주세요'}
                        onChange={handleInputChange}
                    />
                </Styled.Wrapper>
            </Styled.Form>
            {input && data && (
                <Styled.Box>
                    <Styled.Ul>
                        {data.slice(0, 6).map((item, index) => (
                            <Styled.Li
                                key={index}
                                onClick={() => onRecentSearchClick(search)}
                                style={{
                                    backgroundColor:
                                        index === selectedSearchIndex
                                            ? '#f0f0f0'
                                            : 'transparent',
                                }}
                            >
                                {item}
                            </Styled.Li>
                        ))}
                    </Styled.Ul>
                </Styled.Box>
            )}
            {!input && showRecentSearches && recentSearches.length > 0 && (
                <Styled.Box>
                    <Styled.Ul>
                        {recentSearches.map((search, index) => (
                            <Styled.Li
                                key={index}
                                onClick={() => onRecentSearchClick(search)}
                                style={{
                                    backgroundColor:
                                        index === selectedSearchIndex
                                            ? '#f0f0f0'
                                            : 'transparent',
                                }}
                            >
                                {search}
                            </Styled.Li>
                        ))}
                    </Styled.Ul>
                </Styled.Box>
            )}
        </>
    );
};

export default SearchBar;

const Form = styled.form`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Box = styled.div`
    width: 30%;
    overflow: hidden;
    box-shadow: 1px 1px 1px 1px #eee;
    margin-top: 4px;
    border-radius: 8px;
`;

const Ul = styled.ul`
    list-style-type: none;
`;

const Li = styled.li`
    line-height: 2;
    margin-left: -20px;
    &:hover {
        cursor: pointer;
    }
`;
const ResultBox = styled.div``;

const ResultItem = styled.div``;

const Styled = {
    Form,
    Wrapper,
    Box,
    Ul,
    Li,
    ResultBox,
    ResultItem,
};
