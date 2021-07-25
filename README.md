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
---

## 示例

* 发布日历
  
![发布日历](https://cdn.guole.fun/img/202107/发布日历.png)

* 发布统计
  
![发布统计](https://cdn.guole.fun/img/202107/发布统计.png)

* 标签统计
  
![标签统计](https://cdn.guole.fun/img/202107/标签统计.png)

* 分类统计（无标题）
  
![分类统计（无标题）](https://cdn.guole.fun/img/202107/分类.png)

* 分类雷达图（无标题）
  
![分类雷达图（无标题）](https://cdn.guole.fun/img/202107/分类雷达.png)

---

## 安装

```shell
npm install hexo-butterfly-charts --save
```

### 注意  
  
以下内容在 ```butterfly v3.8.2``` 中验证通过，其他版本请自行验证。
  
---

## 用法

### 将 发布日历 添加到 归档 页面

安装插件后，在```/Butterfly/layout/archive.pug```文件中，```#archive```下面添加一行```#post-calendar```, 新添加的比上一行多缩进两个空格。
  
修改后如下：
```pug
extends includes/layout.pug

block content
  include ./includes/mixins/article-sort.pug
  #archive
    #post-calendar
    .article-sort-title= _p('page.articles') + ' - ' + site.posts.length
    +articleSort(page.posts)
    include includes/pagination.pug
```

#### 其他页面，只需```md```文件中插入这个标签：
```html
<div id="posts-calendar"></div>
```

### 将 发布统计 添加到 归档 页面

安装插件后，在```/Butterfly/layout/archive.pug```文件中，```#archive```下面添加一行```#posts-chart```, 新添加的比上一行多缩进两个空格。

修改后如下：
```pug
extends includes/layout.pug

block content
  include ./includes/mixins/article-sort.pug
  #archive
    #posts-chart
    .article-sort-title= _p('page.articles') + ' - ' + site.posts.length
    +articleSort(page.posts)
    include includes/pagination.pug
```

#### 其他页面，只需```md```文件中插入这个标签：
```html
<div id="post-chart"></div>
```

### 将 标签统计 插入到 标签 页面

编辑主题目录```/Butterfly/layout/includes/page/tags.pug```文件，在开头添加一行```#tags-chart(data-length = "10")```，```data-length = "10"```表示显示 Top 10 的标签。

修改后如下：
```pug
#tags-chart(data-length = "10")
.tag-cloud-title.is-center= _p('page.tag')
  |  - 
  span.tag-cloud-amount= site.tags.length
.tag-cloud-list.is-center
  !=cloudTags({source: site.tags, minfontsize: 1.2, maxfontsize: 2.1, limit: 0, unit: 'em'})
```

#### 其他页面，只需```md```文件中插入这个标签：

```html
<!-- "data-length" = how many tags to show, default 10 -->
<div id="tags-chart" data-length="10"></div>
```

### 将 分类统计（无标题）和 分类雷达图（无标题） 添加到 分类 页面。


编辑主题目录```/Butterfly/layout/includes/page/categories.pug```文件，在第5行添加```#categories-chart```和```#categories-radar```。

修改后如下：
```pug
.category-lists
  .category-title.is-center= _p('page.category')
    |  - 
    span.category-amount= site.categories.length
  #categories-chart
  #categories-radar
  div!= list_categories()
```

#### 其他页面，只需```md```文件中插入这个标签：

* 分类统计（无标题）
```html
<div id="categories-chart"></div>
```

* 分类雷达图（无标题）
```html
<div id="categories-radar"></div>
```
---

## 许可
[Apache License 2.0](https://github.com/kuole-o/hexo-butterfly-charts/blob/main/LICENSE)