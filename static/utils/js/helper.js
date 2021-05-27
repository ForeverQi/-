/**
 * 商家助手app安卓返回按钮调用
 * @param type
 * @returns {boolean}
 */
window.goGesture = function(type) {
    let sign = false;

    if ("function" === typeof window.goGestureCallback) {
        window.goGestureCallback(type);
        sign = true;
    }

    window.goGestureCallback = null;
    return sign;
};
