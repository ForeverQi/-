<template>
    <transition name="custom-classes-transition" enter-active-class="animated fadeInLeftBig" leave-active-class="animated fadeOutLeftBig">
        <div class="page-layout upload-video-wrap">
            <div class="page-title">
                <span class="back-btn" @click="$util.functions.GoBack()" />
                <h5>发布视频</h5>
            </div>

            <div class="page-body">
                <div class="point">请勿带有色情、反动、敏感词、禁用词汇等违法信息</div>
                <!-- ./ 第三方视频上传 -->
                <div class="box third-party-box" :class="form.type === 1 ? 'checked' : ''" @click="form.type = 1">
                    <div class="box-h">使用第三方视频素材</div>
                    <div class="box-b">
                        <textarea v-model="form.video.share" @focus="form.type = 1" placeholder='请复制短视频分享链接,复制后无需二次编辑。目前支持"抖音""快手"平台的视频分享链接' />
                    </div>
                </div>

                <!-- ./ 本地上传 -->
                <upload v-if="ownhost" ref="upload" :data="{form, UploadSucceed, addFileSuccess}" />
                <div v-else class="box upload-box" disabled>
                    <div class="box-b">
                        <div class="disabled-icon"><img src="../images/up_desabled_icon.png" alt /></div>
                        <h5>您还没有配置独立域名</h5><p>上传视频功能仅支持独立域名网站</p>
                    </div>
                </div>
            </div>

            <!-- ./ submit -->
            <div class="page-foot">
                <div class="protocol-box">
                    <transition name="custom-classes-transition" enter-active-class="animated bounceIn" leave-active-class="animated fadeOut">
                        <span class="tip-prop" v-if="Video.hint">请先同意知识产权承诺</span>
                    </transition>
                    <span @click="protocol.checked = protocol.checked ? 0 : 1">
                        <span class="radio-select" :data-selected="protocol.checked"></span>
                        <span class="text">我已阅读并同意</span>
                    </span>
                    <b @click="protocol.pop = true">《知识产权承诺》</b>
                </div>
                <a @click="submit" class="orange-btn next-btn" :class="{'disabled': Video.uploading}"><span>下一步</span></a>
            </div>

            <!-- ./ 知识产权弹窗 -->
            <div class="popup-area" v-if="protocol.pop">
                <transition name="custom-classes-transition" enter-active-class="animated zoomIn" leave-active-class="animated zoomOut">
                    <div class="popup-box clause-info-popup">
                        <div class="clause-content" v-html="equityCon"></div>
                        <i class="close" @click="protocol.pop = false" />
                    </div>
                </transition>
            </div>
        </div>
    </transition>
</template>

<script>
    import hint from "@/plugins/hint";
    import { getMemberInfo } from '../js/getMemberInfo.js';
    import { Setting, getResolveInfo } from "@/api/shop/video.bac";

    export default {
        name: "uploadVideo",
        data() {
            return {
                // 是否已经绑定独立域名
                ownhost: true,

                // 协议
                protocol: {
                    // 是否选中
                    checked: 1,
                    // 未选择弹窗
                    hint: false,
                    // 知识产权弹窗
                    pop: false
                },

                form: {
                    // 0 第三方 1 本地上传
                    type: 0,
                    // 视频信息
                    video: {
                        filename: '',
                        id: '',
                        cover: '',
                        breief: '',
                        // 第三方分享地址
                        share: '',
                        // 视频时长
                        time: 0,
                        // 视频大小
                        size: 0,
                        // 拓展名
                        ext: '',
                        // 平台
                        platform: '',
                        // 标题
                        title: ''
                    }

                },



                // 视频相关
                Video: {},
                // 会员相关信息
                Member: {},
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
        },

        created() {
            this.Video = {
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
            };

            // 获取上一次填写数据
            if (this.$util.functions.Len(this.$store.getters.variables.many.VideoData)) {
                this.Video = this.$store.getters.variables.many.VideoData;
            }

            // 获取会员信息
            getMemberInfo().then(res => {
                this.Member = res;
            });

            this.getEquity();
            /* getVideoCover({videoid: 'd525761c605246bea59689081105f141'}).then(res=>{
                console.log(res);
            }); */
        },
        methods: {
            /**
             * 获取协议
             * @constructor
             */
            getEquity() {
                Setting().then(res => {
                    this.equityCon = res.equity;
                })
            },

            /**
             * 上传成功后回调 上传对象 uploadInfo.videoid 为视频id
             * @param data
             * @constructor
             */
            UploadSucceed(data) {
                this.form.video.platform = '';
                this.form.video.cover = data.cover;
                this.form.video.id = data.videoId;
                this.form.video.size = data.file.size;
                this.form.video.name = Video.localUrl.substr(0, Video.localUrl.lastIndexOf("."));
                this.form.video.title = this.form.name.substr(0, 40);

                // 存储本次上传信息
                this.$util.variable.Set({
                    key: "VideoData",
                    val: this.Vodeo
                });
            },

            /**
             * 文件添加成功回调
             * @param file
             */
            addFileSuccess(file) {
                let
                    thisS = this,
                    element = document.createElement('video')
                ;

                element.src = file.name;
                setTimeout(() => {
                    thisS.form.video.time = element.duration;
                }, 500);

                this.form.video.size = file.size;
                this.form.video.filename = file.name;
                this.form.video.ext = file.name.substr(file.name.lastIndexOf('.') + 1).toLocaleLowerCase();
                console.log(this.form)
                this.$util.variable.Set({
                    key: "VideoData",
                    val: this.form
                });
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
             * @param type 1表示第三方，2表示本地上传
             * @constructor
             */
            changeVideoType(type) {
                this.Video.type = type;
                if (type === 1) {
                    $('#thirdTextarea').focus();
                }
            },

            /**
             * 获取视频url
             * @param file
             * @return string
             */
            getFileURL(file) {
                let getUrl = null;
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
             * 本地视频选择更改
             * @param file
             * @constructor
             */
            localVideo(file) {
                this.Video.vid = null;
                if (file) {
                    let
                        url = that.getFileURL(file),
                        videoDom = document.createElement('video')
                    ;

                    videoDom.src = url;
                    setTimeout(() => {
                        this.Video.localVTime = videoDom.duration;
                    }, 500);
                    this.Video.localSize = file.size;
                    this.Video.localUrl = file.name;
                    this.Video.videoType = this.Video.localUrl.substr(this.Video.localUrl.lastIndexOf('.') + 1).toLocaleLowerCase();
                }

                this.$util.variable.Set({
                    key: "VideoData",
                    val: this.Vodeo
                });
            },

            /**
             * 验证视频合法
             * @returns {boolean}
             */
            valid() {
                if (this.form.type === 2) {
                    if (!this.form.video.filename) {
                        hint.Msg({
                            message: "请上传本地视频"
                        });
                        return false;
                    }

                    if (this.form.video.ext !== 'mp4' && this.form.video.ext !== 'mov') {
                        hint.Msg({
                            message: "只能上传mp4或mov文件"
                        });
                        return false;
                    }

                    /*if (!msg && Video.localVTime > 61) {
                        msg = '视频时长超过1分钟，请重新上传';
                    }*/
                } else {
                    return hint.Msg({
                        message: "请粘贴第三方地址"
                    });
                }

                if ((this.form.video.size / 1024) > this.Member.surplusSpace && this.Member.userStatus !== 1) {
                    hint.Msg({
                        message: "您的空间不足"
                    });
                    return false;
                }

                return false;
            },

            /**
             * 提交
             * @constructor
             */
            submit() {
                if (!this.valid()) {
                    return false;
                }

                if (this.Video.type === 2) {
                    this.StartUpload();
                }
                return false;
                if (1) {



                    return false;
                    if (this.Video.vid) {
                        this.$router.push({'path': 'edit'});
                    }
                    this.Video.uploading = true;
                    if (this.Video.type === 1) {
                        getResolveInfo({share: this.Video.thirdUrl}).then((data) => {
                            this.Video.vTitle = data.name;
                            this.Video.platform = data.platform;
                            this.Video.cover = data.cover;
                            this.Video.vid = data.video.vid;
                            this.Video.path = data.video.path;
                            this.Video.host = data.video.host;
                            this.Video.size = data.video.size;
                            if ((this.Video.size / 1024) > this.Member.surplusSpace && this.Member.userStatus !== 1) {
                                hint.Msg({
                                    message: '您的空间不足'
                                });
                                return;
                            }
                            this.Video.uploading = false;

                            // 存储
                            this.$util.variable.Set({
                                key: "VideoData",
                                val: this.Vodeo
                            });
                            // this.writeStorage(Video);
                        }).catch(function (error) {
                            this.Video.uploading = false;
                            if(error.code){
                                 hint.Msg({
                                    message: error.msg
                                });
                            }else{
                                hint.Msg({
                                    message: '请粘贴正确的分享链接'
                                });
                            }
                        });
                    } else if (this.Video.type === 2) {
                        this.StartUpload();
                    }
                }
            },

            /**
             * @description: 下一步操作函数
             * @return:
             */
            nextPage() {
                // 执行验证
                if (this.videoValidate()) {
                    if (this.Video.vid) {
                        this.$router.push({'path': 'edit'});
                    }
                    this.Video.uploading = true;
                    if (this.Video.type === 1) {
                        getResolveInfo({share: this.Video.thirdUrl}).then((data) => {
                            this.Video.vTitle = data.name;
                            this.Video.platform = data.platform;
                            this.Video.cover = data.cover;
                            this.Video.vid = data.video.vid;
                            this.Video.path = data.video.path;
                            this.Video.host = data.video.host;
                            this.Video.size = data.video.size;
                            if ((this.Video.size / 1024) > this.Member.surplusSpace && this.Member.userStatus !== 1) {
                                hint.Msg({
                                    message: '您的空间不足'
                                });
                                return;
                            }
                            this.Video.uploading = false;

                            // 存储
                            this.$util.variable.Set({
                                key: "VideoData",
                                val: this.Vodeo
                            });
                            // this.writeStorage(Video);
                        }).catch(function (error) {
                            this.Video.uploading = false;
                            hint.Msg({
                                message: '请粘贴正确的分享链接'
                            });
                        });
                    } else if (this.Video.type === 2) {
                        this.StartUpload();
                    }
                }
            },
            writeStorage(video) {
                let that = this;
                localStorage.setItem("uploadVideoData", JSON.stringify(video));
                that.$router.push({'path': 'edit'});
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



        }
    };
</script>

<style lang="scss">
    .upload-video-wrap {
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
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        width: 100%;
                    }
                }

                .upload-file, .viedo-img {
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
        }

        .next-btn.disabled {
            opacity: 0.6;

            .loading-icon {
                display: inline-block;
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
