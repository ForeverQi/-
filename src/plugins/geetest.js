import {Get} from '@/api/geetest'

export function GeetestVerify(data) {
    Get({
        id: data.Unique || 0
    }).then((res) => {
        initGeetest({
            gt: res.data.gt,
            challenge: res.data.challenge,
            new_captcha: res.data.new_captcha,
            product: "bind", // float embed popup
            offline: !res.data.success
        }, function (captchaObj) {
            setTimeout(function () {
                captchaObj.onSuccess(function () {
                    let validate = captchaObj.getValidate();

                    "function" === typeof data.VerifySuccess && data.VerifySuccess({
                        geetest_challenge: validate.geetest_challenge,
                        geetest_validate: validate.geetest_validate,
                        geetest_seccode: validate.geetest_seccode,
                        id: data.Unique || 0
                    });

                    captchaObj.reset();
                    "function" === typeof data.GeetestInit && data.GeetestInit(captchaObj);
                });

                // start
                captchaObj.verify();

                captchaObj.onClose(function () {
                    captchaObj.reset();
                    "function" === typeof data.GeetestInit && data.GeetestInit(captchaObj);
                });
            }, 500)
        });
    });
}
