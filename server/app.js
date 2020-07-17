import App from '../src/App';
import Koa from 'koa';
import React from 'react';
import Router from 'koa-router';
import fs from 'fs';
import util from 'util';
import koaStatic from 'koa-static';
import path from 'path';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createServerStore } from '../src/redux/store';
import { setMessage } from '../src/redux/app/actions';

// 配置文件
const config = {
    port: 3030,
};

// 实例化 koa
const app = new Koa();

// 静态资源
app.use(
    koaStatic(path.join(__dirname, '../build'), {
        maxage: 365 * 24 * 60 * 1000,
        index: 'root',
    // 这里配置不要写成'index'就可以了，因为在访问localhost:3030时，不能让服务默认去加载index.html文件，这里很容易掉进坑。
    })
);


const readFile = util.promisify(fs.readFile);

const router = new Router();
router.get('(.*)', async (ctx) => {
    // TODO 可以增加日志中间件
    console.log('request url', ctx.url);

    // 获取html模板
    const shtml = await readFile(path.join(__dirname, '../build/index.html'), 'utf8');

    // 生成redux的store
    const store = createServerStore();
    const { dispatch } = store;
    dispatch(setMessage('message')); // test

    // 可以改成renderToNodeStream，使用流，提高性能
    const html = renderToString(
        <Provider store={store}>
            <StaticRouter
                context={{}}
                location={ctx.url}
            >
                <App/>
            </StaticRouter>
        </Provider>
    );

    ctx.type = 'html'; //指定content type

    // 替换掉 {{root}} 为我们生成后的HTML
    ctx.body = shtml.replace('{{root}}', html).replace('{{preloadedState}}', JSON.stringify(store.getState()).replace(/</g, '\\u003c'));
});

// 设置路由
app.use(router.routes());

app.listen(config.port, () => {
    console.log('服务器启动，监听 port： ' + config.port + '  running~');
});
