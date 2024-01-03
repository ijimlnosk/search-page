import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import CustomButton from './Button';
import CustomInput from './Input';

const SearchBar = () => {
    const [input, setInput] = useState('');
    const [recentSearches, setRecentSearches] = useState([]);
    const [showRecentSearches, setShowRecentSearches] = useState(false);
    const navigate = useNavigate();
    const wrapperRef = useRef(null);

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

    const handleInputChange = e => {
        setInput(e.target.value);
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
    };

    return (
        <>
            <Styled.Wrapper
                onFocus={() => setShowRecentSearches(true)}
                onBlur={() => {
                    setTimeout(() => setShowRecentSearches(false), 100);
                }}
            >
                <CustomInput
                    value={input}
                    placeholder={'단어를 입력해주세요'}
                    onChange={handleInputChange}
                />
                <CustomButton onClick={onSearchClick} text={'검색'} />
            </Styled.Wrapper>
            {showRecentSearches && recentSearches.length > 0 && (
                <Styled.Box>
                    <Styled.Ul>
                        {recentSearches.map((search, index) => (
                            <Styled.Li
                                key={index}
                                onClick={() => onRecentSearchClick(search)}
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
    margin-left: -5%;
    &:hover {
    }
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

const Styled = {
    Wrapper,
    Box,
    Ul,
    Li,
};
