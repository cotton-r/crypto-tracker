import React, { useState, useEffect } from 'react';

import { useGetCryptosQuery, useGetCryptoDetailsQuery } from '../../../../services/cryptoApi';

import './FavouriteCoin.css';

const FavouriteCoin = ({ coin, userCurrency }) => {

    const { data: cryptosList, isFetching } = useGetCryptosQuery(userCurrency);
    const [cryptoId, setCryptoId] = useState();
    const [searchTerm, setSearchTerm] = useState(coin);

    useEffect(() => {
        const filteredData = cryptosList?.data?.coins.filter((coin) => coin.symbol == searchTerm);
        setCryptoId(filteredData[0]?.id);

    }, []);

    console.log(cryptoId);

    const { favouriteData, isLoading } = useGetCryptoDetailsQuery({ cryptoId, userCurrency });

    return (
        <div className='favourite-coin'>
            <p>{coin} / {userCurrency}</p>
        </div>
    )
}

export default FavouriteCoin;
