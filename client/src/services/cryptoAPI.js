import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoApiHeaders = {
    "x-rapidapi-host": "coingecko.p.rapidapi.com",
    "x-rapidapi-key": process.env.REACT_APP_X_RAPIDAPI_KEY
};

const baseUrl = "https://coingecko.p.rapidapi.com";

const createRequest = (url) => ({ url, headers: cryptoApiHeaders });

export const cryptoApi = createApi({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getCryptoStats: builder.query({
            query: () => createRequest('/global'),
        }),
        getCryptoList: builder.query({
            query: () => createRequest('/coins/markets?vs_currency=gbp&page=1&per_page=100&order=market_cap_desc'),
        }),
        getCryptoHistory: builder.query({
            query: ({ coinId, timePeriod, userCurrency }) => 
                createRequest(`/coin/${coinId}/history?timeperiod=${timePeriod}?base=${userCurrency}`),
        }),
    })
});

export const { useGetCryptoListQuery, useGetCryptoStatsQuery, useGetCryptoDetailsQuery, useGetCryptoHistoryQuery } = cryptoApi;