import React from 'react';

import FavouriteCoin from './FavouriteCoin/FavouriteCoin';

import './Favourites.css';

const userFavourites = ['BTC', 'ETH', 'DOGE'];

const Favourites = ({ userCurrency }) => {
    return (
        <div className='favourites-bar-container'>
            {userFavourites.map((coin) => {
                return <FavouriteCoin coin={coin} userCurrency={userCurrency} />
            })}
        </div>
    )
}

export default Favourites;
