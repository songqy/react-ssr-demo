
import Home from '../routes/Home';

export const serverRoutes = [
    {
        path: '/',
        key: 'root',
        component: Home,
    },
    {
        path: '/home',
        key: 'home',
        component: Home,
    },
];
