import service from '../index'
// 获取banner轮播图
export function getSwiper() {
    return service({
        method: 'GET',
        url: '/banner?type=2'
    })
}
// 获取发现好歌单
export function getMusicList(data) {
    return service({
        method: 'GET',
        url: `/personalized?limit=${data}`
    })
}
// 获取歌单 /playlist/detail?id=1
export function getMusicItem(data) {
    return service({
        method: 'GET',
        url: `/playlist/detail?id=${data}`
    })
}
//获取歌单歌曲 /playlist/track/all?id=24381616&limit=10&offset=1
export function getMusicItemList(data) {
    return service({
        method: 'GET',
        url: `/playlist/track/all?id=${data}&limit=20&offset=1`
    })
}
// 获取歌曲歌词 /lyric?id=33894312
export function getMusicLyric(data) {
    return service({
        method: 'GET',
        url: `/lyric?id=${data}`
    })
}
// 搜索的歌曲
//  cloudsearch?keywords=
export function getSearchMusic(data) {
    return service({
        method: 'GET',
        url: `cloudsearch?keywords=${data}`
    })
}
// 获取更多的歌曲
export function getMoreMusic(data, limit = 0) {
    return service({
        method: 'GET',
        url: `cloudsearch?keywords=${data}&limit=${limit * 30}&offset=${limit * 30}`
    })
}
// 发起登录/login/cellphone?phone=xxx&captcha=1234
// /login/cellphone ? phone = xxx & password=yyy
export function getLogin(data) {
    return service({
        method: 'GET',
        url: `/login/cellphone?phone=${data.phone}&password=${data.password}`
    })
}


// #region 验证码
// 获取验证码 /captcha/sent
export function getCaptcha(data) {
    return service({
        method: 'GET',
        url: `/captcha/sent?phone=${data}`
    })
}
// 核对验证码  /captcha/verify?phone=13xxx&captcha=1597
export function getCaptchaVerify(data) {
    return service({
        method: 'GET',
        url: `/captcha/verify?phone=${data.phone}&captcha=${data.captcha}`
    })
}
// #endregion

