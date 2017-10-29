import ApiView from '../login/index';
import ApiDoc from '../api';
import ApiConfig from '../api/config';
import ApiMain from '../api/detail';
const config = [
    {
        path: '/',
        exact: true,
        component: ApiView,
        redirect: '/login'
    }, {
        path: '/login',
        exact: true,
        component: ApiView
    }, {
        path: '/api',
        exact: false,
        component: ApiDoc
    }, {
        path: '/config',
        exact: false,
        component: ApiConfig
    }, {
        path: '/main/:id',
        exact: false,
        component: ApiMain,
    }
];

export default config;