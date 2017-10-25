import ApiView from '../login/index';
import ApiDoc from '../api';
import ApiConfig from '../api/config';
import ApiMain from '../api/detail';
import ApiDetail from '../api/api_detail';
import ApiAdd from '../api/add';
import ApiDelete from '../api/delete';
import ApiUpdate from '../api/update';
const config = [
    {
        path: '/',
        exact: true,
        component: ApiView
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
        routes: [
            {
                path: '/main/detail/:id',
                exact: false,
                component: ApiDetail
            }, {
                path: '/main/add',
                exact: false,
                component: ApiAdd
            }, {
                path: '/main/delete',
                exact: false,
                component: ApiDelete
            }, {
                path: '/main/update',
                exact: false,
                component: ApiUpdate
            }
        ]
    }
];

export default config;