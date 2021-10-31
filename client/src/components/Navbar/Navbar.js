import React from 'react';
import { Button, Menu, Typography, Avatar } from 'antd';
import { Link } from 'react-router-dom';
import { HomeOutlined, MoneyCollectedOutlined, BulbOutlined, DollarOutlined, MenuOutlined, LineChartOutlined } from '@ant-design/icons';

import './Navbar.css';

import icon from '../../images/crypto-icon.png';

const Navbar = ({userCurrency, setUserCurrency}) => {

    const handleCurrencyChange = (e) => {
        setUserCurrency(e.target.value);
    };

    return (
        <div className='nav-container'>
            <div className='logo-container'>
                <Avatar src={icon} size='large' />
            </div>
            <Menu theme='dark'>
                <Menu.Item icon={<HomeOutlined />} className='nav-item'>
                    <Link to='/' className='nav-item-icon'>Dashboard</Link>
                </Menu.Item>
                <Menu.Item icon={<DollarOutlined />} className='nav-item'>
                    <Link to='/cryptocurrencies' className='nav-item-icon'>Cryptocurrencies</Link>
                </Menu.Item>
                <Menu.Item icon={<LineChartOutlined />} className='nav-item'>
                    <Link to='/news' className='nav-item-icon'>News</Link>
                </Menu.Item>
            </Menu>
            <div className='currency-picker-container'>
                <select 
                    value={userCurrency}
                    onChange={(e) => handleCurrencyChange(e)}
                >
                    <option value='GBP'>GBP</option>
                    <option value='USD'>USD</option>
                    <option value='EUR'>EUR</option>
                </select>
            </div>
        </div>
    )
}

export default Navbar;