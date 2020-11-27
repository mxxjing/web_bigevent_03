var baseURL = 'http://ajax.frontend.itheima.net'
$.ajaxPrefilter(function (option) {
    option.url = baseURL + option.url
    console.log(option.url);

    if (option.url.indexOf('/my/') !== -1) {
        option.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }

    option.complete = function (res) {
        console.log('执行了complete回调函数');
        console.log(res);
        if (res.responseJSON.status !== 0 && res.responseJSON.message == '身份认证失败！') {
            // 清除token
            console.log(11);
            localStorage.removeItem('token')
            // 跳转页面
            location.href = '/login.html'
        }
    }
})