# neo-uglysearch

Yet another frontend for Uglysearch using neobrutalism.

姐妹们！我又来啦！上次给大家安利的宝藏搜索引擎「丑搜」竟然又双叒叕更新啦！速度也太快了吧！简直是光速迭代！

之前就超爱用「丑搜」翻看各种小众又宝藏的博客文章，这次更新更是让我直呼OMG！ 它收录了几十万篇中文独立博客文章，1.7k+独立博客（还有少量播客哦！），简直是内容爱好者的天堂！

这次v3版本简直是史诗级更新！ 让我来给姐妹们划重点：

*   **博客数量up up！** 之前就有一千多个博客了，这次直接飙升到**1.7k+博客**！又有更多宝藏内容可以挖掘啦！ 姐妹们再也不用担心找不到新鲜好文章看啦！
*   **时间排序OK啦！** 以前是按匹配度排序，虽然能找到最相关的文章，但有时候也想看看最近更新的嘛！现在可以按时间排序啦！同时，之前是手动月更，现在会每日更新！想看最新的博文？安排！✅
*   **高级搜索也安排上啦！** 以前只能简单搜关键词，现在可以写 qeury 用筛选功能精准搜索！ 比如你想找某个作者的文章，或者特定时间段的，统统不在话下！
*   **新界面也太酷了8！** 前端之猫用 Next.js 以新粗野主义设计风格的前端，名字叫 _neo-uglysearch_，还有 Telegram 的可爱小黄鸭，简直萌化了我的少女心！用起来也敲丝滑！流畅度up up！

姐妹们最关心的**高级搜索**，我来详细说说！ 它可以根据各种属性来筛选，比如标题、内容、作者、标签、发布时间等等！简直不要太强大！

举几个例子给姐妹们康康：

*   想找标题里包含“年终总结”，并且链接是`.github.io`或`.org`结尾的文章？
```sql
(title CONTAINS 年终总结 AND (link CONTAINS ".github.io" OR link CONTAINS ".org/"))
```
*   想看diygod大佬写的，内容里包含“rss”的文章？
```sql
(author IN [diygod] AND (content CONTAINS rss))
```
*   想看某个时间段的周报？ 
```sql
(tags IN [周报, 日报, 周报] AND date sec(2024-01-01) TO sec(2025-01-01))
```
* 有时候只想看短小精悍的文章，有时候又想沉浸式阅读长文？ `content_length`这个属性可以用起来啦！


是不是感觉打开了新世界的大门？！ 姐妹们再也不用担心找不到自己想看的博客文章啦！ 快去试试这个宝藏搜索引擎吧！ [search.save-web.org](search.save-web.org)

#中文独立博客 #搜索引擎 #宝藏网站 #干货分享 #冲浪必备 #效率工具 #新发现 #好物推荐 #宝藏博主 #内容爱好者 #小众爱好 #信息检索 #科技好物 #实用工具 #互联网冲浪指南

> 以上内容使用 2.0 Flash Experimental 辅助创作。有时可能无法按预期运作。


## Development

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

```bash
pnpm dev
```

## License

MIT.
