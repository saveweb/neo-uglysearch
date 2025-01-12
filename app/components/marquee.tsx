export default function Marquee({ items, reverse = false }: { items: string[], reverse?: boolean }) {
  // 根据 reverse 值动态设置动画类名
  const animationClass = reverse ? 'animate-marquee-rtl' : 'animate-marquee';
  const animationClass2 = reverse ? 'animate-marquee2-rtl' : 'animate-marquee2';

  return (
    <div className="relative flex w-full overflow-x-hidden border-b-2 border-t-2 border-border bg-bw text-text font-semibold">
      <div className={`${animationClass} whitespace-nowrap py-8 flex`}>
        {items.map((item) => (
          <span key={item} className="mx-4 text-3xl flex-shrink-0">
            {item}
          </span>
        ))}
      </div>
      <div className={`absolute top-0 ${animationClass2} whitespace-nowrap py-8 flex`}>
        {items.map((item) => (
          <span key={item} className="mx-4 text-3xl flex-shrink-0">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
