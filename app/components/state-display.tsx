"use client";

import { useState, useEffect, Fragment } from "react";

const StatsDisplay = () => {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(
          "https://search-api.saveweb.org/api/stats"
        );
        const data = await response.json();
        setStats(data);
        setLoading(false);
      } catch (err) {
        setError((err as any).toString());
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <div>统计数据加载中…</div>;
  if (error) return <div>错误: {error}</div>;
  if (!stats) return <div>无数据</div>;

  return (
    <Fragment>
      总 {stats.db_stats.numberOfDocuments} 条记录，
      {stats.db_stats.isIndexing ? "索引中" : "无进行中的索引"}
      <br />
      最后索引于
      {new Date(stats.last_indexed_at).toLocaleString("zh-CN")}，id {" "}
      {stats.max_id}
    </Fragment>
  );
};

export default StatsDisplay;
