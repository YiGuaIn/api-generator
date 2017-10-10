import ApiView from '../login/index';
import ApiDoc from '../api/fengxiang';
const config = [
    {
        path: '/',
        exact: true,
        component: ApiView
    }, {
        path: '/api',
        exact: false,
        component: ApiDoc
    }
];

export default config;