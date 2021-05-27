<template>
    <div class="local-video-upload">
        <div class="box upload-box" :class="{'checked': data.Video.type === 2}" @click="data.changeVideoType(2)">
            <div class="box-b">
                <input type="file" accept="video/*" class="upload-file"  @change="Change">
                <div class="up-icon">
                    <img src="../../images/up_icon.png" alt />
                </div>
                <h5>
                    <span v-if="data.Video.type == 2 && data.Video.localUrl">{{data.Video.localUrl}}</span>
                    <span v-else>上传本地视频</span>
                </h5>
                <p>最大支持上传1分钟以内的本地视频</p>
            </div>
        </div>

        <div class="shadow" v-if="Shadow">
            <div class="loading-circle">
                <van-circle v-model="Progress" :rate="Rate" :speed="50" :size="50" :text="Progress + '%'" />
                <p>正在努力上传中，大概需要30秒</p>
                <a href="javascript:;" class="cancel" @click="onUploadCanceled">取消上传</a>
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import util from '@/libs/util'
    import Hint from '@/plugins/hint'
    import { Circle } from 'vant';
    Vue.use(Circle);

    export default {
        name: "index",
        data() {
            return {
                // 上传对象
                Uploader: null,
                // 精度条
                Progress: 0,
                Rate: 0,
                Shadow: false
            }
        },

        props: ["data"],

        created() {
            this.Init();
            util.aliyun.Init();
            this.GetConf();
        },

        methods: {
            /**
             * input file change
             * @param event
             * @returns {VanToast}
             * @constructor
             */
            Change(event) {
                let file = event.target.files[0]
                if (!file) {
                    return Hint.Msg({
                        message: "请先选择需要上传的文件"
                    });
                }

                if (this.Uploader) {
                    // 初始化
                    this.Uploader.stopUpload();
                }

                if (this.Uploader._uploadList.length !== 0) {
                    this.Uploader._uploadList.length = 0;
                }
                this.Uploader.addFile(file, null, null, null, '{"Vod":{}}');
                // this.StartUpload()
            },

            /**
             * input 开始上传
             * @constructor
             */
            StartUpload() {
                if (this.Uploader !== null) {
                    this.Shadow = true;
                    this.Uploader.startUpload()
                } else {
                    Hint.Msg({
                        message: "请先选择需要上传的文件"
                    });
                }
            },

            /**
             * 暂停上传
             * @constructor
             */
            StopUpload() {
                if (this.Uploader !== null) {
                    this.Uploader.stopUpload()
                }
            },

            /**
             * 恢复上传
             * @constructor
             */
            ResumeUpload() {
                if (this.Uploader !== null) {
                    this.Uploader.startUpload()
                }
            },

            /**
             * 文件上传成功
             * @param uploadInfo
             * @constructor
             */
            onUploadSucceed(uploadInfo) {
                this.Shadow = false;
                typeof this.data.UploadSucceed === 'function' && this.data.UploadSucceed(uploadInfo);
            },

            /**
             * 文件添加成功
             * @param uploadInfo
             * @constructor
             */
            addFileSuccess(uploadInfo) {
                typeof this.data.addFileSuccess === 'function' && this.data.addFileSuccess(uploadInfo.file);
            },

            /**
             * 文件上传失败
             * @param uploadInfo
             * @param code
             * @param message
             * @constructor
             */
            onUploadFailed(uploadInfo, code, message) {
                this.Shadow = false;
                Hint.Msg({
                    message: "文件上传失败，请稍后重试"
                });
            },

            /**
             * 取消文件上传
             * @constructor
             */
            onUploadCanceled(uploadInfo, code, message) {
                this.Uploader.stopUpload();
                this.data.Video.uploading = 0;
                this.Init();
            },

            /**
             * 文件上传进度，单位：字节, 可以在这个函数中拿到上传进度并显示在页面上
             * @param uploadInfo
             * @param totalSize
             * @param progress
             * @constructor
             */
            onUploadProgress(uploadInfo, totalSize, progress) {
                this.Rate = 1;
                this.Progress = Math.ceil(progress * 100);
            },

            /**
             * 全部文件上传结束
             * @constructor
             */
            onUploadEnd() {
                this.Init();
                typeof this.data.onUploadEnd === 'function' && this.data.onUploadEnd();
            },

            /**
             * 上传配置
             * @constructor
             */
            GetConf() {
                util.aliyun.Conf(() => {
                    this.Uploader = util.aliyun.Uploader({
                        onUploadSucceed: this.onUploadSucceed,
                        addFileSuccess: this.addFileSuccess,
                        onUploadFailed: this.onUploadFailed,
                        onUploadCanceled: this.onUploadCanceled,
                        onUploadProgress: this.onUploadProgress,
                        onUploadEnd: this.onUploadEnd,
                    });
                });
            },

            /**
             * 初始化
             * @constructor
             */
            Init() {
                this.Rate = 0;
                this.Progress = 0;
                this.Shadow = false;
            }
        }
    }
</script>

<style lang="scss">
.local-video-upload{

    .shadow {
        z-index: 10;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,.4);
    }

    .loading-circle {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        text-align: center;
        width: 100%;
    }


    .loading-circle p {
        color: #fff;
        line-height: 1rem;
    }

    .cancel {
        margin: 0 auto;
        color: #fff;
        line-height: .5rem;
        border-radius: .1rem;
        border: 1px solid #fff;
        padding: .1rem .2rem;
        font-size: .24rem;
        display: inline-block;
    }
    .van-circle .van-circle__text{
        font-size: .2rem;
        color:#fff;
    }
}
</style>
