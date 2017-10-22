var express = require('express');
var router = express.Router();
let publicApi = require('../public/javascripts/utils/routes').Common;
let publicCtl = require('../controller/common.controller');

/* 接口类别 */
router.post(publicApi.addCategory, publicCtl.addCategory);
router.post(publicApi.deleteCategory, publicCtl.delCategory);
router.post(publicApi.updateCategory, publicCtl.updateCategory);
router.post(publicApi.queryCategory, publicCtl.queryCategory);
router.post(publicApi.listCategory, publicCtl.categoryList);
/* 接口主体 */
router.post(publicApi.addApi, publicCtl.addApi);
router.post(publicApi.deleteApi, publicCtl.delApi);
router.post(publicApi.updateApi, publicCtl.updateApi);
router.post(publicApi.queryApi, publicCtl.queryApi);
router.post(publicApi.listApi, publicCtl.apiList);
module.exports = router;
