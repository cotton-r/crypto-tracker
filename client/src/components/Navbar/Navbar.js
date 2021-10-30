import React from 'react';
import { Button, Menu, Typography, Avatar } from 'antd';
import { Link } from 'react-router-dom';
import { HomeOutlined, MoneyCollectedOutlined, BulbOutlined, DollarOutlined, MenuOutlined, LineChartOutlined } from '@ant-design/icons';

import './Navbar.css';

import icon from '../../images/crypto-icon.png';

const Navbar = () => {
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
        </div>
    )
}

export default Navbar;