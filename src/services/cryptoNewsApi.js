import {createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const cryptoNewsHeaders = {
    'X-BingApis-SDK': 'true',
    'X-RapidAPI-Key': process.env.REACT_APP_CRYPTONEWSAPI_KEY,
    'X-RapidAPI-Host': 'crypto-news16.p.rapidapi.com'
}

const baseUrl = 'https://crypto-news16.p.rapidapi.com/news';

const createRequest = (url) => ({url, headers: cryptoNewsHeaders})

export const cryptoNewsApi  = createApi({
    reducerPath: 'cryptoNewsApi',
    baseQuery: fetchBaseQuery({baseUrl}),
    endpoints: (builder) => ({
        getCryptoNews: builder.query({
            query: () => createRequest('/coindesk'),
        })
    })
});

export const {
    useGetCryptoNewsQuery,
} = cryptoNewsApi;
