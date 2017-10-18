import ApiView from '../login/index';
import ApiDoc from '../api';
import ApiMain from '../api/detail';
import ApiConfig from '../api/config';
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
        path: '/main/:id',
        exact: false,
        component: ApiMain
    }, {
        path: '/config',
        exact: false,
        component: ApiConfig
    }
];

export default config;