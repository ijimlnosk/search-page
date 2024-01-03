import axios from 'axios';

const BaseUrl = 'http://localhost:3000';

const searchJsonRequest = (url, params) => {
    return axios.get(`${BaseUrl}/${url}`, {
        headers: {
            accept: 'application/json',
        },
        params: {
            ...params,
        },
    });
};

export const searchApi = async key => {
    try {
        const response = await searchJsonRequest(`search`, { key });
        console.log(response.data, 'response');
        return response.data;
    } catch (error) {
        console.error('Error fetching search data: ', error);
        throw error;
    }
};
