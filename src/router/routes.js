
import Home from '../routes/Home'

export const serverRoutes = [
    {
        path: '/',
        key: 'root',
        component: Home,
        exact: true,
    },
    {
        path: '/home',
        key: 'home',
        component: Home,
        exact: true,
    },
]