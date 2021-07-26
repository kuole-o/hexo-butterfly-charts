<!-- This file is modified by guole.fun -->
# Butterfly 统计图表
> Modified from [hexo-charts](https://www.npmjs.com/package/hexo-charts)  
> Modified from [hexo-statistics-charts](https://www.npmjs.com/package/hexo-statistics-charts)  

## 修改说明
* 页面文案调整回中文
* 删除类别统计图表的标题

## 描述
将 hexo poats、类别和标签的统计数据呈现到图表中。
> 灵感来自 HEXO 主题 [matery](https://github.com/blinkfox/hexo-theme-matery).

* 包含
  * 发布统计
  * 发布日历
  * 标签统计
  * 分类统计
  * 分类雷达图  

* 更新日志 v1.0.9
<details>
<summary>点击展开</summary>
  * 增加标签的横纵坐标轴名称  
  * 适配butterfly暗色模式，自动切换  
  * 文章发布日历坐标也换成中文  
  * 各图表标题支持配置  
  * 标签/分类统计图支持配置横坐标显示的间隔数  
  * 解决分类雷达图未设置画布高度的bug  
  Bug:  
    * 解决雷达图上，鼠标hover时，超出内容被画布吞掉的问题  
</details>
* 已知问题
  * 当前根据主题自动切换颜色的功能，似乎受Pjax影响，加了```data-pjax```也不行，如果你解决了，欢迎在这里提交PR：https://github.com/kuole-o/hexo-butterfly-charts
---

## 示例

* 发布日历
  
![发布日历](https://guole.fun/posts/18158/发布日历3.jpg)

* 发布统计
  
![发布统计](https://guole.fun/posts/18158/发布统计3.jpg)

* 标签统计
  
![标签统计](https://guole.fun/posts/18158/标签3.jpg)

* 分类统计（无标题）/分类雷达图（无标题）
  
![分类统计](https://guole.fun/posts/18158/分类统计3.jpg)

* 分类雷达图（无标题）
  
![分类雷达](https://guole.fun/posts/18158/分类雷达3.jpg)

<details>
<summary>点击查看暗色模式截图</summary>

* 发布日历
  
![发布日历](https://guole.fun/posts/18158/发布日历4.jpg)

* 发布统计
  
![发布统计](https://guole.fun/posts/18158/发布统计4.jpg)

* 标签统计
  
![标签统计](https://guole.fun/posts/18158/标签4.jpg)

* 分类统计（无标题）/分类雷达图（无标题）
  
![分类统计](https://guole.fun/posts/18158/分类统计4.jpg)

* 分类雷达图（无标题）
  
![分类雷达](https://guole.fun/posts/18158/分类雷达4.jpg)

</details>
---

## 安装

```shell
npm install hexo-butterfly-charts --save
```

## 用法

[点击查看使用方法](https://guole.fun/posts/18158/)

## 许可
[Apache License 2.0](https://github.com/kuole-o/hexo-butterfly-charts/blob/main/LICENSE)