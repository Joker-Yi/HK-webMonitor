<template>
  <div class="video-center">
    <div id="divPlugin" class="plugin" style="border: 1px solid red"></div>
  </div>
</template>

<script>
  import { WebVideo } from './webVideo.js'

  export default {
  name: 'HKMonitor',
  data() {
    return {
      value: 1,
      g_iWndIndex: 0,//当前选中的窗口
      g_bPTZAuto: false,
      pumpRoomName: "",
      cameraArray: [],
      webVideo: {},
      iWidth: 800,
      iHeight: 600,
      iProtocol: 1,
      szIP: "172.16.2.235",
      szPort: "80",
      szUsername: "admin",
      szPassword: "a12345678",
      iStreamType: 1,
      bZeroChannel: false,
      maskData: {
        maskShow: false,
        title: '提示',
        content: '失败',
        cancel: false
      }
    }
  },
  mounted() {
    // 初始化插件
    this.webVideo = new WebVideo()
    this.$nextTick(() => {
      this.webVideo.init()
      this.webVideo.clickLogin()
    })
  },
  // methods: {
  //   //全屏
  //   clickFullScreen: function () {
  //     WebVideoCtrl.I_FullScreen(true);
  //   },
  //   //切换
  //   changeWndNum: function (iType) {
  //     console.log(iType);
  //     var iType = parseInt(iType, 10);
  //     WebVideoCtrl.I_ChangeWndNum(iType);
  //   },
  //   // 下载插件
  //   downLoadPlugin: function () {
  //     if (confirm('是否下载该插件?')) {
  //       window.location.href = process.env.BASE_API + '/dashboard/downloadPlug';
  //     }
  //   },
  //   // 加载插件
  //   videoInitPlugin: function () {
  //     // var _this = this;
  //     var iRet = WebVideoCtrl.I_CheckPluginInstall();
  //
  //     if (iRet === -1) {
  //       alert("您还未安装过插件，双击开发包目录里的WebComponentsKit.exe安装！");
  //       this.downLoadPlugin();
  //       return;
  //     }
  //     console.log('init');
  //     this.initPlugin()
  //   },
  //   // 初始化插件
  //   initPlugin: function () {
  //     var that = this;
  //     WebVideoCtrl.I_InitPlugin(this.iWidth, this.iHeight, {
  //       bWndFull: true,//是否支持单窗口双击全屏，默I_CheckPluginInstall
  //       iWndowType: 2,
  //       // cbSelWnd: function (xmlDoc) {
  //       //   var giWndIndex = parseInt($(xmlDoc).find("SelectWnd").eq(0).text(), 10);
  //       //   var szInfo = "当前选择的窗口编号：" + giWndIndex;
  //       //
  //       //   console.log(szInfo);
  //       // },
  //     });
  //     console.log(WebVideoCtrl);
  //     this.cbInitPluginComplete()
  //   },
  //   cbInitPluginComplete: function () {
  //     let that = this
  //     console.log('insert');
  //     WebVideoCtrl.I_InsertOBJECTPlugin("divPlugin");
  //     // 检查插件是否最新
  //     if (WebVideoCtrl.I_CheckPluginVersion() === -1) {
  //       alert("检测到新的插件版本，双击开发包目录里的WebComponentsKit.exe升级！");
  //       return;
  //     }
  //     console.log("cameraArray length:", that.cameraArray,that.szIP);
  //     if (that.cameraArray.length !==0){
  //       for (var i = 0; i < that.cameraArray.length; i++) {
  //         var szIP = that.cameraArray[i].ipAddr;
  //         var cameraId = that.cameraArray[i].channelId;
  //         WebVideoCtrl.I_Login(szIP, that.iProtocol, that.szPort, that.szUsername, that.szPassword, {
  //           async: false,
  //           success: function (xmlDoc) {
  //             console.log(xmlDoc);//不能删除
  //             // 开始预览
  //             var szDeviceIdentify = szIP + "_" + that.szPort;
  //             setTimeout(that.startRealPlay(szDeviceIdentify, i, 1), 500);  //1为通道号,  i 为窗口
  //           },
  //           error: function () {
  //             console.log("login error");
  //           }
  //         });
  //       }
  //     } else {
  //       console.log(that.szIP, that.iProtocol, that.szPort, that.szUsername, that.szPassword);
  //       WebVideoCtrl.I_Login(that.szIP, that.iProtocol, that.szPort, that.szUsername, that.szPassword, {
  //         async: false,
  //         success: function (xmlDoc) {
  //           console.log(xmlDoc);//不能删除
  //           // 开始预览
  //           // var szDeviceIdentify = that.szIP + "_" + that.szPort;
  //           var szDeviceIdentify = that.szIP;
  //           setTimeout(that.startRealPlay(szDeviceIdentify, 1, 1), 500);  //1为通道号,  i 为窗口
  //         },
  //         error: function (e) {
  //           console.log("login error:"+ e);
  //         }
  //       });
  //     }
  //   },
  //
  // }
}
</script>

<style scoped>

</style>
