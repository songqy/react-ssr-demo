import React, { useCallback, useEffect, useState } from 'react';
import { Button } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
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
    dispatch(setData(data));
};


const PageA = (props) => {
    const { data, message, action, dispatch } = props;
    const [loading, setLoading] = useState(false);

    const toggleData = useCallback(async() => {
        setLoading(true);
        const data = await getData([{ a: 5555 }]);
        action.setData(data);
        setLoading(false);
    }, [action]);


    useEffect(() => {
        getInitData(dispatch);
    }, [dispatch]);

    return (
        <div className={styles.page}>
            <div>PageA----</div>
            <div>data:{data[0] && data[0].a}</div>
            <div>message:{message}</div>
            <div style={{ width: '100%', height: '30px' }}>{loading && <LoadingOutlined />}</div>
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
