import React, { useCallback, useEffect } from 'react';
// import logo from '@/images/logo.svg';
import styles from './Home.module.less';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as appActions from '@/redux/app/actions';

const { setMessage } = appActions;


const getMessage = (_data) => {
    return new Promise(resolve => setTimeout(() => resolve(_data), 1000));
};

export const getInitMessage = async(dispatch) => {
    const message = await getMessage('init message');
    dispatch(setMessage(message));
};

const Home = (props) => {
    const { message, dispatch, action: { setMessage } } = props;

    const handleClick = useCallback(() => {
        setMessage('click');
    }, [setMessage]);

    useEffect(() => {
        getInitMessage(dispatch);
    }, [dispatch]);


    return (
        <div className={styles['App']}>
            <header className={styles['App-header']}>
                {/* <img alt="logo"
                    className="App-logo"
                    src={logo}
                /> */}
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <div>{message}</div>
                {/* <a
                    className="App-link"
                    href="https://reactjs.org"
                    rel="noopener noreferrer"
                    target="_blank"
                >
                    Learn React
                </a> */}
                <div onClick={handleClick}>click me</div>
                <Link to="/pageA">go to pageA</Link>
            </header>
        </div>
    );
};

const mapStateToProps = ({ app }) => {
    return {
        message: app.message,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        action: bindActionCreators(appActions, dispatch),
        dispatch,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
