/**
 * Created by 29728 on 2017/7/21.
 */
define(['jquery', 'utils', 'template', 'cookie', 'form', 'detepicker', 'detepickerCN'], function ($, utils, template) {
  //因为添加和编辑公用一个页面，所有要区分开到底是哪个页面，拿到地址栏中id
  var id = utils.getQueryByKey('id');

  //没有id就是添加页面
  if (!id) {
    var obj = {
      title: '讲师添加',
      url: '/api/teacher/add',
      btnText: '添 加'
    }
    //渲染模板
    var html = template('teacher-add-tpl', obj);
    $('.body.teacher').html(html);
    //时间插件
    $('input[name="tc_join_date"]').datepicker({
      language: 'zh-CN',
      format: 'yyyy-mm-dd'
    });

  } else {
    //编辑页面
    //需要发送ajax请求拿到当前行的内容
    $.ajax({
      url: '/api/teacher/edit',
      data: {tc_id: id},
      success: function (data) {
        if (data.code == 200) {
          //添加一些属性
          data.result.title = '讲师编辑';
          data.result.url = '/api/teacher/update';
          data.result.btnText = '保 存';
          //将所有的属性渲染到模板中
          var html = template('teacher-add-tpl', data.result);
          $('.body.teacher').html(html);
          //时间插件
          $('input[name="tc_join_date"]').datepicker({
            language: 'zh-CN',
            format: 'yyyy-mm-dd'
          });
        }
      }
    })
  }

  //注册提交事件
  $('.body.teacher').on('submit', 'form', function () {
    $(this).ajaxSubmit({
      success: function (data) {
        if (data.code == 200) {
          location.href = '/teacher/list';
        }
      }
    })
    return false;
  })
})