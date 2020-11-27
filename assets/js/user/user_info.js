$(function () {
    var form = layui.form
    form.verify({
        nickname: function (value) {
            if (value.length > 7) {
                return '用户昵称应为1~7个字符！'
            }
        }
    })

    initUserInfo()

    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layui.layer.msg(res.msg)
                }
                form.val('formUserInfo', res.data)
                console.log(form);
            }
        })
    }

    $('#btnReset').on('click', function (e) {
        e.preventDefault()
        $('.layui-form')[0].reset()
        initUserInfo()
    })

    $('.layui-form').on('submit', function (e) {
        console.log(11);
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layui.layer.msg(res.message)
                }
                window.parent.getUserInfo()
            }
        })
    })
})