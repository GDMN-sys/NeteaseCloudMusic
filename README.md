# cloud-music

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```
启动项目前先启动服务器
```
拉取服务器
$ git clone git@github.com:Binaryify/NeteaseCloudMusicApi.git
$ cd NeteaseCloudMusicApi
$ npm install
```
运行
```
$ node app.js
```
服务器启动默认端口为 3000, 若不想使用 3000 端口 , 可使用以下命令 : Mac/Linux
```
$ PORT=4000 node app.js
```
windows 下使用 git-bash 或者 cmder 等终端执行以下命令 :
```
$ set PORT=4000 && node app.js
```
服务器启动默认 host 为 localhost,如果需要更改, 可使用以下命令 : Mac/Linux
```
$ HOST=127.0.0.1 node app.js
```
windows 下使用 git-bash 或者 cmder 等终端执行以下命令 :
```
$ set HOST=127.0.0.1 && node app.js
```
接口详细地址
```
https://binaryify.github.io/NeteaseCloudMusicApi/
```
### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
