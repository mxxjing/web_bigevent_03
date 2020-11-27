$(function () {
    getUserInfo()

    $('#btnLogout').on('click', function () {
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function (index) {
            //do something
            // 清除token
            localStorage.removeItem('token')
            // 跳转页面
            location.href = '/login.html'
            // 关闭询问框
            layer.close(index);
        });
    })
})
function getUserInfo() {
    $.ajax({
        method:'GET',
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function (res) {
            console.log(res);
            if (res.status !== 0) {
                return layui.layer.msg(res.message)
            }
            // console.log(11);
            renderAvatar(res.data)
        },
        
    })
}
function renderAvatar(user) {
    var name = user.nickname || user.username
    $('#welcome').html(name)

    if (user.user_pic) {
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
        $('.layui-nav-img').hide()
    }
}