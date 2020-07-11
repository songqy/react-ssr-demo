import React from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import styles from './PageA.module.less';


const PageA = () => {
    return (
        <div className={styles.page}>
            <div>PageA</div>
            <Button>this is a button</Button>
            <Link to="/home">go to home</Link>
        </div>
    );
};


export default PageA;
