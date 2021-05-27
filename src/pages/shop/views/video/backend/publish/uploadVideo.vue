<template>
<transition name="custom-classes-transition" enter-active-class="animated fadeInLeftBig" leave-active-class="animated fadeOutLeftBig">
    <div class="page-layout upload-video-wrap">
        <span class="loading-icon" v-if="Video.uploading && Video.type === 1">正在上传中，大约需要30秒</span>
        <!-- 页面头部 -->
        <PageHead :title="'发布视频'" />

        <!-- 页面内容 -->
        <div class="page-body">
            <div class="upload-video-container">
                <!-- 提示信息 -->
                <div class="point">
                    请勿带有色情、反动、敏感词、禁用词汇等违法信息
                </div>
                <div class="box-group" v-if="!Member.loading">
                    <!-- 第三方视频输入 -->
                    <div class="box third-party-box" :class="{'checked': Video.type === 1}" @click="changeVideoType(1)">
                        <div class="box-h">使用第三方视频素材</div>
                        <div class="box-b">
                            <textarea v-model="Video.thirdUrl" @focus="changeVideoType(1)" @blur="textBlur" id="thirdTextarea" placeholder='请复制短视频分享链接,复制后无需二次编辑。目前支持"抖音""快手"平台的视频分享链接'></textarea>
                        </div>
                    </div>

                    <!-- 本地上传 -->
                    <!--<div class="box upload-box" :class="{'checked': Video.type === 2}" @click="changeVideoType(2)" v-if="Video.doMains">
                            <div class="box-b">
                                <input type="file" accept="video/mp4" class="upload-file" name="videoFile" id="uploadFile" @change="localVideo($event)">
                                <div class="up-icon">
                                    <img src="../images/up_icon.png" alt />
                                </div>
                                <h5>
                                    <span v-if="Video.uploading && Video.type == 2">正在上传</span>
                                    <span v-else-if="Video.type == 2 && Video.localUrl">{{Video.localUrl}}</span>
                                    <span v-else>上传本地视频</span>
                                </h5>
                                <p>最大支持上传1分钟以内的本地视频</p>
                            </div>
                        </div>-->
                    <upload v-if="Video.doMains && Member.isLocalUpload" ref="upload" :data="{Video, changeVideoType, UploadSucceed, addFileSuccess}" />

                    <!-- <video src="" id="videoDom"></video> -->
                    <!-- 没有绑定域名不能上传 -->
                    <div class="box upload-box" disabled v-if="!Video.doMains">
                        <div class="box-b">
                            <div class="disabled-icon">
                                <img src="../images/up_desabled_icon.png" alt />
                            </div>
                            <h5>您还没有配置独立域名</h5>
                            <p>上传视频功能仅支持独立域名网站</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>

        <!-- 页面底部 -->
        <div class="page-foot">

            <!-- 上传协议 -->
            <div class="protocol-box">
                <transition name="custom-classes-transition" enter-active-class="animated bounceIn" leave-active-class="animated fadeOut">
                    <span class="tip-prop" v-if="Video.protocolTip">请先同意知识产权承诺</span>
                </transition>
                <span @click="protocolFun">
                    <span class="sjzs-icon s-icon-duigou-1 radio-select" :data-selected="Video.protocol"></span>
                    <span class="text">我已阅读并同意</span>
                </span>
                <b @click="showHidePopup(1, 'clause')">《知识产权承诺》</b>
            </div>

            <!-- 下一步 -->
            <a @click="nextPage" class="orange-btn next-btn" :class="{'disabled': Video.uploading}">
                <!-- <span v-if="Video.uploading">正在上传中...</span> -->
                <span>下一步</span>
            </a>

        </div>

        <div class="popup-area" v-if="popupLayer.show && popupLayer.curState === 'clause'">
            <transition name="custom-classes-transition" enter-active-class="animated zoomIn" leave-active-class="animated zoomOut">
                <div class="popup-box clause-info-popup" v-if="popupLayer.conShow">
                    <div class="clause-content" v-html="equityCon"></div>
                    <i class="close" @click="showHidePopup(0)"></i>
                </div>
            </transition>
        </div>
    </div>
</transition>
</template>

<script>
import util from '@/libs/util';
import hint from "@/plugins/hint";
import {
    Setting,
    setMealQuery,
    uploadVideo,
    getResolveInfo,
    getVideoCover
} from "@/api/shop/video.bac";
import PageHead from "../components/PageHead";
export default {
    name: "uploadVideo",
    data() {
        return {
            // 视频相关
            Video: {
                type: 0,
                localUrl: null,
                localVTime: null,
                thirdUrl: null,
                // 协议是否选中
                protocol: 1,
                // 协议提示框是否显示
                protocolTip: false,
                // 视频是否处于上传状态
                uploading: false,
                // 是否已经绑定独立域名
                doMains: true
            },
            // 会员相关信息
            Member: {
                loading: true
            },
            // 弹出层相关
            popupLayer: {
                show: false,
                conShow: false,
                curState: null
            },
            equityCon: null
        };
    },

    components: {
        upload: () => import("@/pages/shop/views/video/backend/components/ctrl/upload"),
        PageHead
    },

    created() {
        let that = this,
            Video = that.Video,
            Member = that.Member;
        // 通过获取本地存储初始化数据
        // console.log(this.$store.getters.variables.many.VideoData);
        if (this.$store.getters.variables.many.VideoData && this.$store.getters.variables.many.VideoData.vid) {
            // let getData = JSON.parse(localStorage.uploadVideoData);
            let getData = this.$store.getters.variables.many.VideoData;

            for (let key in getData) {
                Video[key] = getData[key];
            }
        }
        // 获取会员信息
        setMealQuery().then(res => {
            for (let key in res) {
                Member[key] = res[key];
            }
            Member.loading = false;
        });
        that.getEquity();
        /* getVideoCover({videoid: 'd525761c605246bea59689081105f141'}).then(res=>{
            console.log(res);
        }); */
    },
    methods: {
        /**
         * @Date: 2020-02-19 10:25:00
         * @LastEditors: qwguo
         * @LastEditTime: Do not edit
         * @description: 获取协议信息
         * @param {type} 参数说明
         * @return: 返回值
         */
        getEquity() {
            let that = this;
            Setting().then(res => {
                that.equityCon = res.equity;
            })
        },
        /**
         * 上传成功后回调
         * @param data [上传对象 uploadInfo.videoid 为视频id]
         * @constructor
         */
        UploadSucceed(data) {
            /* let that = this,
                Video = that.Video;
            Video.platform = '';
            Video.cover = data.cover;
            Video.vid = data.videoId;
            Video.size = data.file.size;
            Video.vTitle = Video.localUrl.substr(0, Video.localUrl.lastIndexOf("."));
            Video.vTitle = Video.vTitle.substr(0, 40);
            // console.log(Video.vid);

            Video.uploading=0; */
            // that.writeStorage(Video);
            this.Video.platform = '';
            this.Video.cover = data.cover;
            this.Video.vid = data.videoId;
            this.Video.size = data.file.size;
            this.Video.vTitle = this.Video.localUrl.substr(0, this.Video.localUrl.lastIndexOf("."));
            this.Video.vTitle = this.Video.vTitle.substr(0, 40);
            this.Video.uploading = 0;
            this.writeStorage();

            // 获取存储
            // this.$store.getters.variables.many.VideoData
        },
        /**
         * 文件添加成功回调
         * @param file
         */
        addFileSuccess(file) {
            let that = this;
            that.localVideo(file);
        },

        /**
         * 开始上传
         * @constructor
         */
        StartUpload() {
            this.$refs.upload.StartUpload()
        },

        /**
         * @description: 更改上传类型
         * @param {type：1表示第三方，2表示本地上传}
         * @return:
         */
        changeVideoType(type) {
            var that = this,
                Video = that.Video;
            Video.type = type;
            if (type === 1) {
                $('#thirdTextarea').focus();
            }
        },
        /**
         * @Date: 2020-02-06 17:05:14
         * @LastEditors: qwguo
         * @LastEditTime: Do not edit
         * @description: 获取上传文件的本地地址
         * @param {type} 参数说明
         * @return: 返回值
         */
        getFileURL(file) {
            var getUrl = null;
            if (window.createObjectURL != undefined) { // basic
                getUrl = window.createObjectURL(file);
            } else if (window.URL != undefined) { // mozilla(firefox)
                getUrl = window.URL.createObjectURL(file);
            } else if (window.webkitURL != undefined) { // webkit or chrome
                getUrl = window.webkitURL.createObjectURL(file);
            }
            return getUrl;
        },
        /**
         * @description: 本地视频选择更改
         * @param {type}
         * @return:
         */
        localVideo(file) {
            let that = this,
                Video = that.Video; //当前file对象
            Video.vid = null;
            if (file) {
                let url = that.getFileURL(file),
                    videoDom = document.createElement('video');
                videoDom.src = url;
                setTimeout(() => {
                    Video.localVTime = videoDom.duration;
                }, 500);
                Video.localSize = file.size;
                Video.localUrl = file.name;
                Video.videoType = Video.localUrl.substr(Video.localUrl.lastIndexOf('.') + 1).toLocaleLowerCase();
            }
        },
        /**
         * @description: 下一步操作函数
         * @param {type}
         * @return:
         */
        nextPage() {
            var that = this,
                Page = that.Page,
                Video = that.Video;
            // 执行验证
            if (that.videoValidate()) {
                if (Video.vid) {
                    that.$router.push({
                        'path': 'edit'
                    });
                }
                Video.uploading = true;
                if (Video.type === 1) {
                    getResolveInfo({
                        share: Video.thirdUrl
                    }).then((data) => {
                        Video.vTitle = data.name;
                        Video.platform = data.platform;
                        Video.cover = data.cover;
                        Video.vid = data.video.vid;
                        Video.path = data.video.path;
                        Video.host = data.video.host;
                        Video.size = data.video.size;
                        Video.uploading = false;
                        that.writeStorage();
                    }).catch(function (error) {
                        Video.uploading = false;
                        if (error.code) {
                            hint.Msg({
                                message: error.msg
                            });
                        } else {
                            hint.Msg({
                                message: '请粘贴正确的分享链接'
                            });
                        }
                    });
                } else if (Video.type === 2) {
                    that.StartUpload();
                }
            }
        },
        /**
         * @Date: 2020-02-21 22:58:16
         * @LastEditors: qwguo
         * @LastEditTime: Do not edit
         * @description: 记录上传后的视屏数据
         * @param {type} 参数说明
         * @return: 返回值
         */
        writeStorage() {
            let that = this;
            // console.log(1234);
            // localStorage.setItem("uploadVideoData", JSON.stringify(video));
            this.$util.variable.Set({
                key: "VideoData",
                val: this.Video
            });

            that.$router.push({
                'path': 'edit'
            });
        },
        /**
         * @description: 协议选择
         * @param {type}
         * @return:
         */
        protocolFun() {
            let that = this,
                Video = that.Video;
            Video.protocol = !Video.protocol * 1;
            Video.protocolTip = false;
        },
        /**
         * @description: 下一步之前验证方法
         * @param {type}
         * @return:
         */
        videoValidate() {
            var that = this,
                Video = that.Video,
                msg = false;
            switch (Video.type) {
                case 0:
                    msg = '请粘贴第三方地址或者上传本地视频！';
                    break;
                case 1:
                    !Video.thirdUrl && (msg = '请粘贴第三方地址！');
                    break;
                case 2:
                    !Video.localUrl && (msg = '请上传本地视频！');
                    break;
            }
            if (Video.type === 2 && !msg) {
                if (Video.videoType !== 'mp4' && Video.videoType !== 'mov') {
                    msg = `只能上传mp4或mov文件！`;
                }
                if (!msg && Video.localVTime > 61) {
                    msg = '视频时长超过1分钟，请重新上传';
                }
            }
            if (Video.uploading) {
                if (Video.type === 1) {
                    msg = '正在处理视频请稍候！';
                } else if (Video.type === 2) {
                    msg = '正在上传视频请稍候！';
                }
            }
            if (msg) {
                hint.Msg({
                    message: msg
                });
            } else {
                if (!Video.protocol) {
                    Video.protocolTip = 1;
                    msg = true;
                }
            }
            return !msg;
        },
        /**
         * @Date: 2020-02-11 19:54:58
         * @LastEditors: qwguo
         * @LastEditTime: Do not edit
         * @description: 显示隐藏购买弹窗
         * @param {type} action:0表示显示，1表示隐藏， actionType: flow表示购买流量，info表示展示信息
         * @return: 返回值
         */
        showHidePopup(action, actionType) {
            let that = this,
                popupLayer = that.popupLayer;
            if (action === 1) {
                popupLayer.show = action;
                popupLayer.curState = actionType;
                setTimeout(() => {
                    popupLayer.conShow = action;
                }, 1);
            } else {
                setTimeout(() => {
                    popupLayer.show = action;
                }, 300);
                popupLayer.conShow = action;
            }
        },
        /**
         * @Date: 2020-04-03 10:56:51
         * @LastEditors: qwguo
         * @LastEditTime: Do not edit
         * @description: 解决苹果输入框失去焦点的问题
         * @param {type} 参数说明
         * @return: 返回值
         */
        textBlur() {
            window.scroll();
        }
    }
};
</script>

<style lang="scss">
.upload-video-wrap {
    .page-body {
        display: flex;
    }

    .loading-icon {
        position: absolute;
        z-index: 10;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        display: flex;
        align-items: center;
        flex-direction: column;
        flex-flow: column-reverse;
        justify-content: center;
        background-color: rgba(0, 0, 0, 0.2);
        font-size: .28rem;
        color: #fff;

        &::after {
            width: 1rem;
            height: 1rem;
            border-color: #fff #fff #999;
            margin-bottom: .5rem;
        }
    }

    .upload-video-container {
        display: flex;
        flex-grow: 1;
        flex-direction: column;
    }

    .box-group {
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        justify-content: space-around;
        overflow: auto;
    }

    .point {
        height: 0.7rem;
        line-height: 0.7rem;
        padding: 0 0.2rem;
        background-color: rgba(255, 249, 232, 1);
        color: rgba(255, 169, 45, 1);
        font-size: 0.24rem;
    }

    .box {
        box-shadow: 0px 5px 18px 0px rgba(0, 0, 0, 0.06);
        border: 1px solid rgba(219, 219, 219, 1);
        border-radius: 0.06rem;
        height: 4rem;
        display: flex;
        flex-direction: column;
        transition: all .2s linear;
        flex-grow: 0;
        flex-shrink: 0;

        .box-h {
            background-color: rgba(250, 250, 250, 1);
            border-radius: 0.06rem 0.06rem 0 0;
            line-height: 0.86rem;
            padding: 0 0.36rem;
            font-size: 0.28rem;
            color: rgba(51, 51, 51, 1);
            flex: 0 0 auto;
            border-bottom: 1px solid rgba(219, 219, 219, 1);
        }

        .box-b {
            flex: 1 1 auto;
            padding: 0.36rem;

            p {
                font-size: 0.24rem;
                color: rgba(169, 169, 169, 1);
                margin: 0;
            }
        }

        &.checked {
            border-color: rgb(255, 158, 0);
            box-shadow: 0px 5px 18px 0px rgba(253, 138, 45, 0.2);

            .box-h {
                border-bottom-color: rgb(255, 158, 0);
                background-color: rgb(255, 249, 243);
            }
        }
    }

    .third-party-box {
        margin: 0.68rem 0.94rem 0.4rem 0.76rem;

        textarea {
            width: 100%;
            height: 100%;
            border: 0;
            font-size: .24rem;
            color: #333;
            height: 2.35rem;
            overflow-y: auto;
        }
    }

    .uploading-icon {
        position: absolute;
        right: 0;
        top: 0;
        bottom: 0;
        left: 0;
        z-index: 100;
        background-color: rgba(250, 250, 250, .3);
        display: flex;
        justify-content: center;
        align-items: center;

        &::after {
            width: 1rem;
            height: 1rem;
            border-color: rgb(233, 212, 193) rgb(233, 172, 75) rgb(233, 172, 75);
        }
    }

    .upload-box {
        margin: 0 0.94rem 1rem 0.76rem;
        text-align: center;
        position: relative;

        .box-b {
            .up-icon {
                display: inline-block;
                width: 0.98rem;
                height: 0.98rem;
                background: rgba(255, 255, 255, 1);
                border: 1px solid rgba(219, 219, 219, 1);
                border-radius: 50%;
                text-align: center;
                line-height: 0.98rem;
                position: relative;
                z-index: 2;

                img {
                    width: 0.41rem;
                    height: 0.3rem;
                }

                margin: 0.21rem 0 0.36rem 0;
            }

            .disabled-icon {
                display: inline-block;
                width: 0.56rem;
                height: 0.56rem;
                margin: 0.45rem 0 0.26rem;

                img {
                    width: 100%;
                    height: 100%;
                }
            }

            h5 {
                margin: 0 0 0.05rem;
                color: rgba(51, 51, 51, 1);
                position: relative;
                z-index: 2;

                span {
                    display: inline-block;
                    overflow: hidden;
                    word-break: break-all;
                    width: 100%;
                    height: 1em;
                    line-height: 1;
                }
            }

            .upload-file,
            .viedo-img {
                position: absolute;
                width: 100%;
                height: 100%;
                left: 0;
                top: 0;
            }

            .upload-file {
                z-index: 3;
                opacity: 0;
            }

            .viedo-img {
                z-index: 1;
                opacity: .5;
            }
        }

        &[disabled] {
            background-color: rgba(250, 250, 250, 1);
        }
    }

    .protocol-box {
        text-align: center;
        padding: 0.2rem 0;
        line-height: 1;
        position: relative;

        span,
        b {
            display: inline-block;
            vertical-align: middle;
            font-size: 0.24rem;
        }

        span.text {
            color: rgba(153, 153, 153, 1);
        }

        b {
            color: rgba(31, 147, 228, 1);
        }

        .tip-prop {
            left: auto;
            margin-left: -.45rem;
        }
    }

    .next-btn {
        .loading-icon {
            width: auto;
            margin-right: .1rem;
            display: none;

            &:after {
                width: 25px;
                height: 25px;
            }
        }

        &.disabled {
            opacity: 0.6;

            .loading-icon {
                display: inline-block;
            }
        }
    }

    .clause-info-popup {
        padding: .1rem;

        .clause-content {
            max-height: 8rem;
            overflow-y: auto;
            margin: .4rem;
        }
    }
}
</style>
