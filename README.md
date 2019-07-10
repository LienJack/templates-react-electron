
### 开发
*  yarn dll -- -p   # 首次或dll变动，编译（仅一次）
*  yarn dev

```
启动后浏览器访问[http://localhost:3000](http://localhost:3000)

下载页面：http://localhost:3000/pages/download/#/
```

### 测试
 * yarn dll -- -p   # 首次或dll变动，编译（仅一次）
 * yarn test

```
 将项目打包到 `build` 目录下
```

### 部署生产
  * yarn dll -- -p   # 首次或dll变动，编译（仅一次）
  * yarn build      # 打包所有页面
  * yarn build --page=pages/download      # 打包具体页面

```
 将项目打包到 `build` 目录下
```
