import ApiView from '../login/index';
import ApiDoc from '../api';
import ApiMain from '../api/detail';
const config = [
    {
        path: '/',
        exact: true,
        component: ApiView
    }, {
        path: '/api',
        exact: false,
        component: ApiDoc
    }, {
        path: '/main',
        exact: false,
        component: ApiMain
    }
];

export default config;