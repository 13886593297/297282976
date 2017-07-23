/**
 * Created by 29728 on 2017/7/21.
 */
define(['jquery', 'cookie','form'], function ($) {
  $(function () {
    $('.btn-sm').on('click', function () {
      $('form').ajaxSubmit({
        url: '/api/teacher/add',
        type: 'post',
        success: function (data) {
          if(data.code == 200) {
            alert('添加成功');
          }
        }
      })
    })
  })
})