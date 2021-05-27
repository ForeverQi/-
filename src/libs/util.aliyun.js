import router from '@/router'
import store from '@/store'
import util from '@/libs/util'
import Hint from '@/plugins/hint'
import { ossconf, AliOSSCert } from '@/api/shop/index'

/**
 * 上传凭证
 * @type {{resume(*=): void, get(*=): void}}
 */
const UploadWithAuth = {
    get(uploadInfo, uploader) {
        AliOSSCert({
            title: '商家助手短视频',
            filename: uploadInfo.file.name,
            desc: '商家助手短视频',
        }).then(res => {
            uploader.setUploadAuthAndAddress(
                uploadInfo,
                res.UploadAuth,
                res.UploadAddress,
                res.VideoId
            )
        });
    },
    resume(uploadInfo, uploader) {
        AliOSSCert({
            refresh: 1,
            videoId: uploadInfo.videoId
        }).then(res => {
            uploader.setUploadAuthAndAddress(
                uploadInfo,
                res.UploadAuth,
                res.UploadAddress,
                res.VideoId
            );
        });
    }
};

/**
 * 初始化设置
 * @constructor
 */
const Init = () => {
    if (!FileReader.prototype.readAsBinaryString) {
        FileReader.prototype.readAsBinaryString = function (fileData) {
            let
                binary = "",
                pt = this,
                reader = new FileReader()
            ;

            reader.onload = function (e) {
                let
                    bytes = new Uint8Array(reader.result),
                    length = bytes.byteLength
                ;
                for (let i = 0; i < length; i++) {
                    binary += String.fromCharCode(bytes[i]);
                }
                //pt.result  - readonly so assign binary
                pt.content = binary;
                pt.onload()
            };
            reader.readAsArrayBuffer(fileData);
        }
    }
};

/**
 * 阿里云视频点播 javascript sdk 上传
 * @param params
 * @constructor
 */
const Uploader = (params) => {
    let conf = store.getters.shop.conf;
    if (!conf) {

    }

    let uploader = new AliyunUpload.Vod({
        timeout: conf.timeout,
        partSize: conf.partSize,
        parallel: conf.parallel,
        retryCount: conf.retryCount,
        retryDuration: conf.retryDuration,
        region: conf.region,
        bucket: conf.bucket,
        userId: conf.userId,

        /**
         * 添加文件成功
         * @param uploadInfo
         */
        addFileSuccess(uploadInfo) {
            typeof params.addFileSuccess === "function" && params.addFileSuccess(uploadInfo);
        },

        /**
         * 开始上传 获取上传凭证
         * @param uploadInfo
         */
        onUploadstarted(uploadInfo) {
            UploadWithAuth.get(uploadInfo, uploader);
            /*if (uploadInfo.videoId) {
                UploadWithAuth.resume(uploadInfo, uploader);
            } else {
                UploadWithAuth.get(uploadInfo, uploader);
            }*/
        },

        /**
         * 文件上传成功
         * @param uploadInfo
         */
        onUploadSucceed(uploadInfo) {
            typeof params.onUploadSucceed === "function" && params.onUploadSucceed(uploadInfo);
        },

        /**
         * 文件上传失败
         * @param uploadInfo
         * @param code
         * @param message
         */
        onUploadFailed(uploadInfo, code, message) {
            typeof params.onUploadFailed === "function" && params.onUploadFailed(uploadInfo, code, message);
        },

        /**
         * 取消文件上传
         * @param uploadInfo
         * @param code
         * @param message
         */
        onUploadCanceled(uploadInfo, code, message) {
            typeof params.onUploadCanceled === "function" && params.onUploadCanceled(uploadInfo, code, message);
        },

        /**
         * 文件上传进度，单位：字节, 可以在这个函数中拿到上传进度并显示在页面上
         * @param uploadInfo
         * @param totalSize
         * @param progress
         */
        onUploadProgress(uploadInfo, totalSize, progress) {
            typeof params.onUploadProgress === "function" && params.onUploadProgress(uploadInfo, totalSize, progress);
        },

        /**
         * 上传凭证超时
         * @param uploadInfo
         */
        onUploadTokenExpired(uploadInfo) {
            UploadWithAuth.resume(uploadInfo, uploader);
            typeof params.onUploadTokenExpired === "function" && params.onUploadTokenExpired(uploadInfo);
        },

        /**
         * 全部文件上传结束
         */
        onUploadEnd() {
            typeof params.onUploadEnd === "function" && params.onUploadEnd();
        }
    });

    return uploader
};

/**
 * 上传配置
 * @param callback
 * @constructor
 */
const Conf = (callback = null) => {
    const getconf = (callback) => {
        ossconf({}).then(res => {
            if (!res.account.userid) {
                return Hint.Msg({
                    message: "上传配置获取失败"
                })
            }

            store.dispatch("shop/SetConfBy", {...res, callback});
        }).catch(reason => {
            return Hint.Alert({
                message: "配置获取失败，请点击确认重试"
            }).then(() => {
                location.reload();
            });
        })
    };

    getconf(callback);
};

export default {
    Init,
    Uploader,
    Conf
}
