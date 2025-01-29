# 新丑搜使用手册

## 简单查询

全文搜索，模糊搜索，简繁同搜，拼音，同音字。

简单查询会在 "title", "content", "author", "link", "tags" 字段中搜索。多个关键词以空格分隔。

## 过滤器（高级搜索）

过滤器识别的条件：

当搜索查询中包含 `(` ，并且查询以 `)` **结尾**时。从第一个 `(` 到最后一个 `)` 之间的内容被认为是一个过滤器。否则认为整个查询是简单查询。

### 简单查询和过滤器一起用

可以同时使用简单查询和过滤器，像这样 `博客 备份 (title = "hello world")` 在标题为 "hello world" 的文章中搜索 "博客" "备份"。

### 语法

单个过滤器的语法如下：
```
<属性> <运算符> <值>
```

#### 属性

支持过滤的属性有：

```
title: str, 文章标题
id: int, 文章被抓取入库的实际时间，以微秒计 (1/1,000,000)，UTC 时间
id_feed: int, 文章所属的 feed ID
author: list[str], 文章作者（注意是列表）
tags: list[str], 文章标签（注意是列表）
date: int, feed 自行声明的文章发布时间，以秒计，UTC 时间（注意时间直接取自 feed，可能不准确）
content: str, 文章内容（markdown）
link: str, 文章链接
```

#### 运算符

运算符有：

```sql
`=`, 
`!=`, 
`>=`, 
`>`, 
`<=`, 
`<`, 
`IN`, 
`NOT IN`, 
`TO`, (与 `>= AND <=` 等价)
`EXISTS`, 
`NOT EXISTS`, 
`IS NULL`, 
`IS NOT NULL`, 
`IS EMPTY`, 
`IS NOT EMPTY`, 
`CONTAINS`, 
`NOT CONTAINS`, 
`STARTS WITH`, 
`NOT STARTS WITH`
```

#### 值

如果值里包含空格或者特殊字符，可以用 `"` 包裹。

##### 魔法函数

为方便查以微秒计的 id 和以秒计的 date，提供了两个魔法函数：

- us()
- sec()

它们接受 `%Y-%m-%d` 格式的日期字符串，会在查询时被隐式转换为对应的 UTC 时间戳。（注意不要用`"`包裹日期）

如 `id >= us(2025-01-01)` 会被转换为 `id >= 1735689600`。

### 组合过滤

多个过滤器可以通过 `AND` 或 `OR` 连接，可以用 `()` 包裹子查询。

### 例子

```sql
(title = "hello world")
(tags IN [周报, 日报, 周报] AND date sec(2024-01-01) TO sec(2025-01-01))
(((tags IN [ctf, writeup, pwn, crypto, misc, reverse]) OR (link CONTAINS "ctf" OR link CONTAINS "writeup") OR (title CONTAINS "ctf" OR title CONTAINS "writeup")) AND (author != MiaoTony))
作业 (id_feed=1662)
((  (id_feed=24 AND title STARTS WITH "科技爱好者周刊") OR 
    (title STARTS WITH "产品周刊") OR
    (link CONTAINS "blog.save-web.org" AND title CONTAINS "周报") OR 
    (link CONTAINS "pseudoyu.com" AND title CONTAINS "周报")
    ) AND id >= us(2025-1-1) AND id <= us(2025-1-11))
(title CONTAINS 年终总结 AND (link CONTAINS ".github.io" OR link CONTAINS ".org/"))
(author IN [diygod] AND (content CONTAINS rss))
```

# 排序

搜索结果默认以匹配度排序，没有时间权重，方便找到相关度最高的文章。但也可改变排序方式。
