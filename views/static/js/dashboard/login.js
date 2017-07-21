/**
 * Created by 29728 on 2017/7/21.
 */
define(['jquery', 'cookie', 'form'], function ($) {
  $(function () {
    //1.获取表单,注册提交事件
    $('form').submit(function () {
      $(this).ajaxSubmit({
        url: '/api/login',
        type: 'post',
        success: function (data) {
          if (data.code == 200) {
            $.cookie('userInfo', JSON.stringify(data.result), {path: '/'});
            location.href = '/';
          }
        }
      })
      //阻止表单的默认事件
      return false;
    })
  })
})