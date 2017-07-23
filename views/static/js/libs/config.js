/**
 * Created by 29728 on 2017/7/21.
 */
require.config({
  baseUrl: '/views/assets',
  paths: {
    'jquery': 'jquery/jquery.min',
    'cookie': 'jquery-cookie/jquery.cookie',
    'template': 'artTemplate/template-web',
    'form': 'jquery-form/jquery.form',
    'bootstrap': 'bootstrap/js/bootstrap.min',
    'utils': '../static/js/libs/utils',
    'detepicker': 'bootstrap-datepicker/js/bootstrap-datepicker.min',
    'detepickerCN': 'bootstrap-datepicker/locales/bootstrap-datepicker.zh-CN.min'
  },
  shim: {
    bootstrap: {
      deps: ['jquery']
    },
    detepickerCN: {
      deps: ['detepicker']
    }
  }
})