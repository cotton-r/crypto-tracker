import React from 'react';
import { Select, Input } from 'antd';

import FavouriteCoin from './FavouriteCoin/FavouriteCoin';

import './Favourites.css';


const userFavourites = ['BTC', 'ETH', 'DOGE'];

const Favourites = ({ coinList }) => {

    const { Option } = Select;
    const handleChange = (value) => {
        console.log(`selected ${value}`);
      }


    return (
        <div className='favourites-bar-container'>
            <div className='favourites-search'>
                <Input.Group compact theme='dark'>
                    <Select style={{ width: 120 }} onChange={handleChange} dropdownClassName='select-button-dropdown' className='add-currency-select-button'>
                        {coinList?.map((item) => ((
                            <Option key={item.id} value={item.name} className='add-currency-select-option'>{item.symbol.toUpperCase()} / {item.name}</Option>
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
