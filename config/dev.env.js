'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
    NODE_ENV: '"development"',
    VUE_APP_APP_API: '"/eeeapi/"',
    VUE_APP_ENVIRONMENT: '"production"',
    VUE_APP_COOKIE_ALIAS: '""',
    VUE_APP_TOKEN: '"token"',
    VUE_APP_TITLE: '""',
    VUE_APP_FRONTEND_ALIAS: '"frontend"',
    VUE_APP_AJAX: '"http://m.evyun.cn"',
})
