/**
 * Created by Yee .
 */
// 初始化插件
/* eslint-disable */
export function WebVideo() {
  this.g_iWndIndex = 0
  this.szDeviceIdentify = ''
  this.deviceport = ''
  this.deviceport = ''
  this.channels = [1]
  this.ip = '172.16.2.222' // 设备的ip
  this.port = '80' // 设备端口,默认80
  this.username = 'admin'
  this.password = '12345678'
  this.init = function() {
    var self = this
    // 检查插件是否已经安装过
    console.log(WebVideoCtrl.I_CheckPluginInstall());
    var iRet = WebVideoCtrl.I_CheckPluginInstall();
    if (-1 == iRet) {
      alert("您还未安装过插件，双击开发包目录里的WebComponentsKit.exe安装！");
      return;
    }
    // 初始化插件参数及插入插件
    WebVideoCtrl.I_InitPlugin(800, 600, {
      bWndFull: true,
      iPackageType: 2,
      iWndowType: 1,
      // cbInitPluginComplete: function () {
      //   WebVideoCtrl.I_InsertOBJECTPlugin("divPlugin");
      //   console.log('denl');
      // }
    });
    try {
      WebVideoCtrl.I_InsertOBJECTPlugin("divPlugin");
    } catch (e) {
      console.log(e);
    }
  }
  // 登录
  this.clickLogin = function () {
    var self = this
    if ("" == self.ip || "" == self.port) {
      return;
    }
    // self.szDeviceIdentify = self.ip + "_" + self.port;
    self.szDeviceIdentify = self.ip
    WebVideoCtrl.I_Login(self.ip, 1, self.port, self.username, self.password, {
      success: function (xmlDoc) {
        console.log('登录成功'+xmlDoc);
        // setTimeout(function () {
        //   self.getChannelInfo();
        //   self.getDevicePort();
        // }, 10);
        setTimeout(function() {
          self.clickStartRealPlay()
        }, 500)
      },
      error: function (status, xmlDoc) {
        console.log("login error:"+ status);
      }
    });
  }
  // 退出
  this.clickLogout = function() {
    var self = this
    if (null == self.szDeviceIdentify) {
      return;
    }
    var iRet = WebVideoCtrl.I_Logout(self.szDeviceIdentify);
    if (0 == iRet) {
      self.getChannelInfo();
      self.getDevicePort();
    }
  }
  // 获取通道
  this.getChannelInfo = function() {
    var self = this
    self.channels = []
    if (null == self.szDeviceIdentify) {
      return;
    }
    // 模拟通道
    WebVideoCtrl.I_GetAnalogChannelInfo(self.szDeviceIdentify, {
      async: false,
      success: function (xmlDoc) {
        var oChannels = $(xmlDoc).find("VideoInputChannel");
        $.each(oChannels, function (i) {
          var id = $(this).find("id").eq(0).text(),
              name = $(this).find("name").eq(0).text();
          if ("" == name) {
            name = "Camera " + (i < 9 ? "0" + (i + 1) : (i + 1));
          }
          self.channels.push({
            id: id,
            name: name
          })
        });
      },
      error: function (status, xmlDoc) {
      }
    });
  }
  // 获取端口
  this.getDevicePort = function() {
    var self = this
    if (null == self.szDeviceIdentify) {
      return;
    }
    var oPort = WebVideoCtrl.I_GetDevicePort(self.szDeviceIdentify);
    if (oPort != null) {
      self.deviceport = oPort.iDevicePort;
      self.deviceport = oPort.iRtspPort;
    }
  }

  // 开始预览
  this.clickStartRealPlay = function() {
    var self = this
    var oWndInfo = WebVideoCtrl.I_GetWindowStatus(self.g_iWndIndex),
        iChannelID = self.channels[0].value

    if (null == self.szDeviceIdentify) {
      return;
    }

    var startRealPlay = function () {
      WebVideoCtrl.I_StartRealPlay(self.szDeviceIdentify, {
        // iRtspPort: self.deviceport,
        iStreamType: '1',
        iChannelID: iChannelID,
        bZeroChannel: false,
        success: function () {
        },
        error: function (status, xmlDoc) {
          if (403 === status) {
          } else {
          }
        }
      });
    };

    if (oWndInfo != null) {// 已经在播放了，先停止
      WebVideoCtrl.I_Stop({
        success: function () {
          startRealPlay();
        }
      });
    } else {
      startRealPlay();
    }
  }
  // 停止预览
  this.clickStopRealPlay = function() {
    var self = this
    var oWndInfo = WebVideoCtrl.I_GetWindowStatus(self.g_iWndIndex)
    if (oWndInfo != null) {
      WebVideoCtrl.I_Stop({
        success: function () {
        },
        error: function () {
        }
      });
    }
  }
}













