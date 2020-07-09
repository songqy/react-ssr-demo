import { createStore, applyMiddleware } from 'redux';
import { finalReducer } from './reducers';
import thunk from 'redux-thunk';

// ssr需要返回函数，为每个客户端生成一个单独的store
export const createServerStore = () => {
    //生成store对象
    const store = createStore(finalReducer, applyMiddleware(thunk)); // 内部会第一次调用reducer函数，得到初始state
    return store;
};


export const createClientStore = (preloadedState) => {
    //生成store对象
    const store = createStore(finalReducer, preloadedState);
    return store;
};
