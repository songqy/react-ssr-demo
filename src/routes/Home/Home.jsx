import React,{useCallback} from 'react';
import logo from '../../images/logo.svg';
import './Home.css';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as appActions from '../../redux/app/actions'

function Home(props) {
    const {message,action:{setMessage}} = props;

    const handleClick = useCallback(() => {
        setMessage('click')
    },[setMessage])


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <div>{message}</div>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <div onClick={handleClick}>click me</div>
      </header>
    </div>
  );
}

const mapStateToProps = ({app}) => {
    return {
        message:app.message,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        action: bindActionCreators(appActions, dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);
