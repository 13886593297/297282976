define(['jquery', 'template', 'cookie'], function ($, template) {
  $(function () {

    //判断用户当前在哪个页面,如果不在登录界面才执行这段代码
    if (location.pathname != '/dashboard/login') {

      //判断用户登录没登录
      if (!$.cookie('PHPSESSID')) {
        location.href = '/dashboard/login';
        return;
      }

      //获取cookie中存储的用户信息,用模板渲染
      var userInfo = JSON.parse($.cookie("userInfo"));
      var html = template('userInfo-tpl', userInfo);
      $('#profile').append(html);

      //退出登录功能的实现
      var btn = $('.navbar-right').children('li').eq(2);
      btn.on('click', function () {
        $.ajax({
          url: '/api/logout',
          type: 'post',
          success: function (data) {
            if (data.code == 200) {
              location.href = '/dashboard/login';
            }
          }
        })
      })
    }
  })
})

