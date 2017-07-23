/**
 * Created by 29728 on 2017/7/23.
 */
define(['jquery', 'template', 'bootstrap'], function ($, template) {
  //1. 渲染讲师列表的功能
  //1.1 首先去后台获取讲师信息
  $.ajax({
    url: '/api/teacher',
    success: function (data) {
      if (data.code == 200) {
        //过滤器
        template.defaults.imports.getage = function (birthday) {
          var now = new Date();
          birthday = new Date(birthday);
          var age = now.getFullYear() - birthday.getFullYear();
          return age;
        }
        
        //渲染数据
        var html = template('teacher-list-tpl', data);
        $('#teacher-body').html(html);
        
        //1.2 给所有的查看按钮注册点击事件
        $('#teacher-body').on('click', '.btn-checkinfo', function () {
          
          //向后台发送请求当前行的教师信息
          //首先获取当前行的id
          var tc_id = $(this).parent().data('id');
          
          $.ajax({
            url: '/api/teacher/view',
            data: {tc_id: tc_id},
            success: function (data) {
              if (data.code == 200) {
                //将数据渲染到模态框中
                var html = template('teacher-info-tpl', data.result);
                $('#teacherModal .panel-body').html(html);
                //显示模态框
                $('#teacherModal').modal('show');
              }
            }
          })
        })
        
        //1.3 启用和注销讲师功能
        //注册委托事件
        $('#teacher-body').on('click', '.btn-toggle-status', function () {
          //首先获取当前行的id和状态
          var tc_id = $(this).parent().data('id');
          var tc_status = $(this).data('status');
          var that = this;
          $.ajax({
            url: '/api/teacher/handle',
            type: 'post',
            data: {
              tc_id: tc_id,
              tc_status: tc_status
            },
            success: function (data) {
              if (data.code == 200) {
                //根据返回的状态码改变当前标签的类样式和文字内容
                if (data.result.tc_status == '0') {
                  $(that).text('注 销').removeClass('btn-success').addClass('btn-warning');
                } else {
                  $(that).text('启 用').removeClass('btn-warning').addClass('btn-success');
                }

                $(that).data('status', data.result.tc_status);
              }
            }
          })
        })
      }
    }
  })
})