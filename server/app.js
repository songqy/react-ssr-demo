import App from '../src/App';
import Koa from 'koa';
import React from 'react';
import Router from 'koa-router';
import fs from 'fs';
import koaStatic from 'koa-static';
import path from 'path';
import { renderToString, renderToNodeStream } from 'react-dom/server';
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



// 设置路由
app.use(
    new Router()
        .get('(.*)', async (ctx, next) => {
            ctx.response.type = 'html'; //指定content type
            let shtml = '';
            await new Promise((resolve, reject) => {
                fs.readFile(path.join(__dirname, '../build/index.html'), 'utf8', function(err, data) {
                    if (err) {
                        reject();
                        return console.log(err);
                    }
                    shtml = data;
                    resolve();
                });
            });
            const store = createServerStore();
            const { dispatch } = store;
            dispatch(setMessage('message'));

            console.log('url', ctx.url);

            const MainApp = () => {
                return (
                    <Provider store={store}>
                        <StaticRouter
                            context={{}}
                            location={ctx.url}
                        >
                            <App/>
                        </StaticRouter>
                    </Provider>
                );
            };

            // 替换掉 {{root}} 为我们生成后的HTML
            ctx.response.body = shtml.replace('{{root}}', renderToString(<MainApp />)).replace('{{preloadedState}}', JSON.stringify(store.getState()).replace(/</g, '\\u003c'));
        })
        .routes()
);

app.listen(config.port, function() {
    console.log('服务器启动，监听 port： ' + config.port + '  running~');
});
