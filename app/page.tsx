import { Suspense } from 'react'
import Search from './components/search'
import Marquee from './components/marquee'
import LoadingSpinner from './components/loading-spinner'
import SearchAnimation from './components/search-animation'

/*
全文搜索，模糊搜索，简繁同搜，拼音，同音字。
133k+ 篇中文博客文章（包含少量播客），共收录有 1.6K+ 博客。
搜索结果以匹配度排序，没有时间权重，这样更容易找到真正有价值的文章。（时间排序以后将提供）
可以用 ";作者" 来筛选同作者的文章。数据库月度更新，如果你需要实时信息，请使用其他优美的搜索引擎。希望你能找到有用的东西。
如需添加收录，E-Mail: search[at]saveweb.org
*/

const marqueeItems = [
  "全文搜索",
  "Save the Web Project",
  "丑搜 v3",
  "独立博客",
  "neo-uglysearch",
  "模糊搜索",
  "数据库月度更新",
  "新醜蒐",
  "Podcast",
  "中文博客",
  "没有时间权重",
  "Powered by Meilisearch",
  "简繁同搜",
  "RSS 订阅",
  "收录 2k+ 博客",
  "个人网站",
  "历久弥新",
  "Atom Feed",
  "前端处处是神话",
  "互联网档案馆",
  "Designed by 前端之猫",
]

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-bg">
      <div className="my-8 w-full">
        <Marquee items={marqueeItems} reverse />
      </div>
      <div className="z-10 w-full items-center justify-between px-4 sm:px-8 md:px-16 lg:px-24">
        <h1 className="mb-4 font-black text-4xl font-heading text-text shadow-shadow text-center py-8">
          <img src="/neosearch.svg" alt="NeoSearch" className="w-24 h-24 inline-block mr-2 absolute translate-x-32" />
          丑搜 v3
        </h1>
        <section className='max-w-4xl w-full m-auto'>
          <Suspense fallback={<LoadingSpinner />}>
            <Search />
          </Suspense>
        </section>
        <SearchAnimation />
      </div>
      <div className="my-8 w-full">
        <Marquee items={marqueeItems} />
      </div>
      <p className="text-center text-sm text-text mb-4">Tips: 使用 <code>&author=你RSS的作者名&simple=1</code> 可作为站内搜索引擎使用</p>
    </main>
  )
}

