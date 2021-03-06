import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import NotFound from './routes/NotFound';
import { serverRoutes } from './router/routes';


const getRouterList = (routes) => {
    return routes.map(item =>
        <Route
            component={item.component}
            exact={item.exact !== false}
            key={item.key}
            path={item.path}
        />
    );
};

const MainRouter = () => {
    return (
        <Switch>
            {getRouterList(serverRoutes)}
            <Route
                component={NotFound}
                key="notFound"
                path="/404"
            />
            <Redirect to="/404" />
        </Switch>
    );
};

export default MainRouter;
