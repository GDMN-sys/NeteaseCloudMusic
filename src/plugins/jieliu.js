/*按钮节流*/
const throttle = (func, delay) => {
    // 缓存一个定时器
    let timer = null;
    // 这里返回的函数是每次用户实际调用的节流函数
    return function (...args) {
        if (!timer) {
            //判断timer是否有值,如果没有则说明定时器不存在即可继续执行
            timer = setTimeout(() => {
                //关
                func.apply(this, arguments);
                timer = null; //开
            }, delay);
        }
    };
};
export default throttle;



// 方式一：使用时间戳 （时间戳版本会优先执行，点击立马执行一次）
export const throttle1 = (fn, delay = 1000) => {
    //距离上一次的执行时间
    let lastTime = 0;
    return function () {
        let _this = this;
        let _arguments = arguments;
        let now = new Date().getTime();
        //如果距离上一次执行超过了delay才能再次执行
        if (now - lastTime > delay) {
            fn.apply(_this, _arguments);
            lastTime = now;
        }
    };
};

// 方式二: 使用定时器 （定时器版本会后置执行，点击需等待delay时间之后执行）
export const thorttle2 = (fn, delay = 1000) => {
    // 接收定时器的地址
    let timer = null;
    return function () {
        let _this = this;
        let args = arguments;
        // 如果等到了delay才能执行并清空定时器
        if (!timer) {
            timer = setTimeout(function () {
                timer = null;
                fn.apply(_this, args);
            }, delay);
        }
    };
};

