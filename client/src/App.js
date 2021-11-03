import React, { useState, useEffect } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { Layout, Typography, Space } from 'antd';

import './App.css';

import { Navbar, Cryptocurrencies, Dashboard, News, CryptoDetails } from './components/index';
 
const App = () => {

    const [userCurrency, setUserCurrency] = useState('GBP');

    return (
        <div className='app'>
            <div className='navbar'>
                <Navbar userCurrency={userCurrency} setUserCurrency={setUserCurrency} />
            </div>
            <div className='main'>
                <Layout>
                    <div className='routes'>
                        <Switch>
                            <Route exact path='/'>
                                <Dashboard userCurrency={userCurrency} />
                            </Route>
                            <Route exact path='/cryptocurrencies'>
                                <Cryptocurrencies userCurrency={userCurrency} />
                            </Route>
                            <Route exact path='/news'>
                                <News userCurrency={userCurrency} />
                            </Route>
                            <Route exact path='/crypto/:coinId'>
                                <CryptoDetails />
                            </Route>
                        </Switch>
                    </div>
                </Layout>
            </div>
        </div>
    )    
}

export default App;