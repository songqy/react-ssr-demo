import React, { useCallback, useEffect } from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import * as appActions from '@/redux/app/actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styles from './PageA.module.less';

const { setData } = appActions;

const mockData = [
    {
        a: 1333,
    },
];

const getData = (_data) => {
    return new Promise(resolve => setTimeout(() => resolve(_data), 1000));
};

export const getInitData = async(dispatch) => {
    const data = await getData(mockData);
    console.log('getInitData', data);
    dispatch(setData(data));
};


const PageA = (props) => {
    const { data, message, action, dispatch } = props;

    console.log('data', data);

    const toggleData = useCallback(async() => {
        const data = await getData([{ a: 5555 }]);
        console.log('toggleData', data);
        action.setData(data);
    }, [action]);


    useEffect(() => {
        getInitData(dispatch);
    }, [dispatch]);

    return (
        <div className={styles.page}>
            <div>PageA</div>
            <div>data:{data[0] && data[0].a}</div>
            <div>message:{message}</div>
            <Button onClick={toggleData}>this is a button</Button>
            <Link to="/home">go to home</Link>
        </div>
    );
};


const mapStateToProps = ({ app }) => {
    return {
        data: app.data,
        message: app.message,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        action: bindActionCreators(appActions, dispatch),
        dispatch,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PageA);
