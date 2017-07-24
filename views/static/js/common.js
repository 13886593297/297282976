define(['jquery', 'template', 'nprogress', 'cookie'], function ($, template, NProgress) {
  $(function () {
    //给所有的页面都添加进度条功能
    NProgress.start();
    NProgress.done();
    //发送ajax的时候也加载
    $(document).ajaxStart(function () {
      NProgress.start();
    });
    $(document).ajaxStop(function () {
      NProgress.done();
    });


    var pathname = location.pathname;

    //判断用户当前在哪个页面,如果不在登录界面才执行这段代码
    if (pathname != '/dashboard/login') {

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

      //实现导航栏交互效果
      $('.navs>ul>li>ul').parent().click(function () {
        $(this).children('ul').slideToggle();
      })

      //导航栏高亮处理

      if (pathname == '/') {
        pathname = '/dashboard/index';
      }
      //获取和地址匹配的菜单项
      var activeA = $('.navs a[href="' + pathname + '"]');
      //添加active类
      activeA.addClass('active');

      //判断当前菜单栏是否是一个二级菜单栏，如果是就要让二级菜单打开
      var activeUl = activeA.parent().parent();
      if (activeUl.siblings('a').length == 1) {
        activeUl.show();
      }
    }
  })
})

