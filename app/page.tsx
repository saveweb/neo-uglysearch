import { Suspense } from "react";
import Search from "./components/search";
import Marquee from "./components/marquee";
import LoadingSpinner from "./components/loading-spinner";
import SearchAnimation from "./components/search-animation";
import ManualDialog from "./components/manual-dialog";
import StateDisplay from "./components/state-display";

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
];

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-bg">
      <div className="my-8 w-full">
        <Marquee items={marqueeItems} reverse />
      </div>
      <div className="z-10 w-full items-center justify-between px-4 sm:px-8 md:px-16 lg:px-24">
        <div className="mb-4 text-center py-8">
          <div className="flex items-center justify-center gap-2 md:gap-4">
            <img
              src="/neosearch.svg"
              alt="NeoSearch"
              className="w-16 h-16 md:w-24 md:h-24"
            />
            <h1 className="font-black text-3xl md:text-4xl font-heading text-text shadow-shadow">
              丑搜 v3
            </h1>
          </div>
          <div className="mt-4 block md:hidden">
            <ManualDialog />
          </div>
        </div>
        <section className="max-w-4xl w-full m-auto">
          <Suspense fallback={<LoadingSpinner />}>
            <Search />
          </Suspense>
        </section>
        <SearchAnimation />
      </div>
      <div className="my-8 w-full">
        <Marquee items={marqueeItems} />
      </div>
      <div className="text-center text-sm text-text mb-4">
        <StateDisplay />
        <br />
        [AD] 正在进行中的项目：
        <a href="https://github.com/saveweb/review-2024">2024 年年终总结收集</a>
        <br />
        neo-uglysearch@0.4.5 by <a href="https://saveweb.org">Save the Web Project</a> © 2025.
        <br />
        Hosted on Vercel & Open sourced at{" "}
        <a
          href="https://github.com/saveweb/neo-uglysearch"
          className="text-primary"
        >
          GitHub
        </a>{" "}
        via MIT License.
      </div>
    </main>
  );
}
