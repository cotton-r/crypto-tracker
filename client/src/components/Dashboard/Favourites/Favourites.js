import React, { useState, useEffect } from 'react';
import { Select, Input } from 'antd';

import FavouriteCoin from './FavouriteCoin/FavouriteCoin';

import './Favourites.css';
import { filter } from 'htmlparser2/node_modules/domutils';


const userFavourites = ['BTC', 'ETH', 'DOGE'];

const Favourites = ({ coinList }) => {

    const { Option } = Select;

    const [ cryptoToAdd, setCryptoToAdd] = useState('');
    const [ addCryptoList, setAddCryptoList ] = useState([]);

    useEffect(() => {
        setAddCryptoList(coinList);
    }, [])

    console.log(addCryptoList);

    return (
        <div className='favourites-bar-container'>
            <div className='favourites-search'>
            <Input.Group compact theme='dark'>
                    <Select 
                        showSearch
                        optionFilterProp='children'
                        placeholder='Add a currency'
                        style={{ width: 120 }} 
                        onChange={setCryptoToAdd} 
                        dropdownClassName='select-button-dropdown' 
                        className='add-currency-select-button'
                    >
                        {addCryptoList?.map((item) => ((
                            <Option 
                                key={item.id} 
                                value={item.name} 
                                className='add-currency-select-option'
                            >
                                {item.symbol.toUpperCase()} / {item.name}
                            </Option>
                        )))}
                    </Select>
                </Input.Group>
            </div>
            <div className='favourites-bar'>
                {userFavourites.map((coin) => {
                    return <FavouriteCoin coin={coin} />
                })}
            </div>
        </div>
    )
}

export default Favourites;
