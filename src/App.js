import React from 'react';
import MainRouter from './MainRouter';
import './App.css';

function App(props) {
    return (
        <MainRouter {...props}/>
    );
}

export default App;
