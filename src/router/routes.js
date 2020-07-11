// import React, { lazy, Suspense } from 'react';
import Home from '@/routes/Home';
import PageA from '@/routes/PageA';


// const LazyImport = (loader) => (props) => {
//     const LazyComponent = lazy(loader);
//     return (
//         <Suspense fallback={<div></div>}>
//             <LazyComponent {...props} />
//         </Suspense>);
// };


export const serverRoutes = [
    {
        path: '/',
        key: 'root',
        component: Home,
        // component: LazyImport(() => import('@/routes/Home')),
    },
    {
        path: '/home',
        key: 'home',
        component: Home,
        // component: LazyImport(() => import('@/routes/Home')),
    },
    {
        path: '/pageA',
        key: 'pageA',
        component: PageA,
        // component: LazyImport(() => import('@/routes/PageA')),
    },
];
