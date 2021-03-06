import App from '@/App';
import Koa from 'koa';
import React from 'react';
import Router from 'koa-router';
import fs from 'fs';
import util from 'util';
import koaStatic from 'koa-static';
import path from 'path';
import { renderToNodeStream } from 'react-dom/server';
import { StaticRouter, matchPath } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createServerStore } from '@/redux/store';
import { setMessage } from '@/redux/app/actions';
import { serverRoutes } from '@/router/routes';

const readFile = util.promisify(fs.readFile);

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

const pipe = (from, to, options) => {
    return new Promise((resolve, reject) => {
        from.pipe(to, options);
        from.on('error', reject);
        from.on('end', resolve);
    });
};


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

    // TODO 获取cookie，需要注入到接口请求
    // const cookie = ctx.request.header.cookie

    // 初始化异步数据
    const promises = [];
    serverRoutes.some(route => {
        const match = matchPath(ctx.url, route);
        if (match && route.fetchData) {
            promises.push(route.fetchData(dispatch));
        }
        return match;
    });

    await Promise.all(promises);

    ctx.type = 'html'; //指定content type

    const ReactApp = <Provider store={store}>
        <StaticRouter
            // context={{ }}
            location={ctx.url}
        >
            <App/>
        </StaticRouter>
    </Provider>;

    // 使用流，提高性能
    const template = shtml.split('{{root}}');
    const stream = renderToNodeStream(ReactApp);
    ctx.status = 200; // koa的status默认是404，必须放在返回之前
    ctx.res.write(template[0].replace('{{preloadedState}}', JSON.stringify(store.getState()).replace(/</g, '\\u003c')));
    await pipe(stream, ctx.res, { end: false });
    ctx.res.write(template[1]);
    ctx.res.end();

    // const html = renderToString(ReactApp);
    // ctx.body = shtml.replace('{{root}}', html).replace('{{preloadedState}}', JSON.stringify(store.getState()).replace(/</g, '\\u003c'));
});

// 设置路由
app.use(router.routes());

app.listen(config.port, () => {
    console.log('服务器启动，监听 port： ' + config.port + '  running~');
});
