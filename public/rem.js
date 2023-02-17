function remSize() {
    // 获取设备宽度  
    let deviceWidth = window.innerWidth || document.documentElement.clientWidth;
    // 设计稿最大宽度和最小宽度
    maxWidth = 750; minWidth = 320;
    // 如果大于设计稿宽度 那就给他固定为最大宽度
    if (deviceWidth >= maxWidth) {
        deviceWidth = maxWidth;
    }
    // 如果小于设计稿宽度 那就给他固定为最小宽度
    if (deviceWidth <= minWidth) {
        deviceWidth = minWidth;
    }
    // 750px--->1rem=100px  375px -->1rem=50px
    document.documentElement.style.fontSize = deviceWidth / (maxWidth / 100) + 'px';
    // 设置body的字体大小
    document.querySelector('body').style.fontSize = 0.32 + 'rem';

}
remSize()
window.onresize = function () {
    remSize()
}