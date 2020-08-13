# monitor - 基于海康摄像头插件webcomponent的web开发

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

设备的ip和端口要在webVideo.js中填上自己的,同时也需填上相应的用户名和密码

### Compiles and minifies for production

```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### 说明
项目需求需要把摄像头监控画面显示在web端,该版本为vue版的方案预演,使用的是海康的摄像头及插件webcomponent.exe,并且仅支持ie11浏览器.谷歌火狐等仅支持低版本,所以,想弄主流浏览器请另寻[它法 ​](#它法):new_moon_with_face:   (和后端尝试了非常多的它法最后还是选择将就IE11了)

### 历程
实现监控画面实时在web端显示,最初的方案是采用VLC插件,但是项目采用vue框架,在采用VLC插件预演的时候遇到了很多bug(1.莫名其妙第一次加载监控画面或者刷新,页面上不会显示监控画面,拖动滚动条或者调整页面大小,监控画面就显示了 2.VLC的官方文档很简陋 3.不支持移植到vue平台,比如说v-for循环或者数据绑定),遂不采用.

后来因为预演使用的摄像头为海康的,就干脆打算站在巨人的肩膀上好了:joy:,毕竟人家是专业的嘛!但是海康官网摄像头web的开发包已经不适用我现在的摄像头平台了,估计很老被下架了吧.可以找海康的客服或者自行网上搜索海康摄像头web3.0开发包下载,里面有详细的文档+demo,基本上是按照它给的文档api说明,把自己需要的功能移植到vue上.

### 所需依赖

[海康web3.0开发包](https://github.com/Joker-Yi/monitor-demo)

里面的[web3.0开发包.rar](https://github.com/Joker-Yi/monitor-demo/blob/master/web3.0开发包.rar)文件,包含官方的API文档和demo,这个仓库也是我快速预演的一个初步方案

注意: 该方法只适用于海康摄像头画面显示,结尾已经找到适用所有摄像头画面显示的方法,可直接翻至[结尾 ​](#它法)   

### 它法

这里列举的它法都在网上有资料,可自行查找.

1. rtsp 视频流 无法在web端直接播放显示, 借助[vlc插件](https://mirrors.tuna.tsinghua.edu.cn/videolan-ftp/vlc/3.0.8/win32/vlc-3.0.8-win32.exe) 辅助显示

   优点: 可以直接把监控视频流rtsp显示在web端,不需要转码,且延迟在1s左右
   缺点: 只支持IE11浏览器,需安装 vlc插件(32位)

   注意事项:

   1. 采用此方法需要注意浏览器的限制,及检测是否安装vlc插件

   2. 当渲染两个监控画面时存在连续刷新浏览器很容易崩溃的问题
      在后台把码率和分辨率调低,暂时没有出现崩溃的问题

   3. 存在刷新页面,大概率页面上无显示的问题,但是调整浏览器大小,滚动滚动条等操作会让视频重新显示出来(奇葩bug)

2. rtsp视频流 借助 ffmpeg 转为 rtmp视频流,  rtmp视频流为前端可以处理的视频流,可以借助vide.js等插件渲染在页面上,这些插件都是以flash为基础渲染的

   优点: 支持具有flash的主流浏览器(但Chrome预计2020年底移除flash)
   缺点: flash技术正慢慢被主流浏览器所淘汰,比如谷歌;同时视频延迟由于拉流 -转码- 推流这系列操作,导致延迟在3-5s左右

3. 此方案跟方案2类似, 需要将rtsp视频流 借助 ffmpeg 转为 rtmp视频流,渲染不采用flash插件,而是使用H5标准的标签或者借助使用了H5的框架,如video,canvas标签和b站的开源框架flv.js (该方案未实现2020.3.16,未实现原因ffmpeg 转码 占用大量cpu资源及丢包,2020.3.25后调整ffmpeg转码命令参数后解决这些问题,该方法已适用于项目)

   优点: 可以不借助vlc插件和flash插件,同时可以兼容主流浏览器
   缺点: 后端转码需要占用大量cpu,同时转码也需要时间导致延时

   过程中遇到的问题:

   1. ffmpeg 转码命令 参数错误,导致后续操作无法进行
   2. ffmpeg 转码命令 转出的视频流存在丢包严重的现象从而画面模糊
   
  该方案现已经实现,仓库地址: https://github.com/Joker-Yi/flv-demo
