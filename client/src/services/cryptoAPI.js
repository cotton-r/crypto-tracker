import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoApiHeaders = {
    'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
    'x-rapidapi-key': process.env.REACT_APP_X_RAPIDAPI_KEY
};

const baseUrl = 'https://coinranking1.p.rapidapi.com';

const createRequest = (url) => ({ url, headers: cryptoApiHeaders })

export const cryptoApi = createApi({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getCryptos: builder.query({
            query: (userCurrency) => createRequest(`/coins?limit=100&base=${userCurrency}`),
        }),
        getCryptoDetails: builder.query({
            query: ({ coinId, userCurrency }) => createRequest(`/coin/${coinId}?base=${userCurrency}`),
        }),
        getCryptoHistory: builder.query({
            query: ({ coinId, timePeriod, userCurrency }) => createRequest(`/coin/${coinId}/history/${timePeriod}?base=${userCurrency}`),
        }),
    })
});

export const { useGetCryptosQuery, useGetCryptoDetailsQuery, useGetCryptoHistoryQuery } = cryptoApi;