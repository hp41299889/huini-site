import { cn } from "~/lib/utils";

export default function Home() {
  return (
    <div className={cn("min-h-screen flex flex-col items-center justify-center bg-background text-foreground p-4")}>
      {/* Hero Section */}
      <section className="text-center mb-16 px-4">
        <h1 className="text-6xl md:text-8xl font-serif font-bold text-primary mb-6 leading-tight animate-fade-in-up">
          以<span className="text-accent">智慧</span>構建
        </h1>
        <p className="text-xl md:text-2xl font-sans text-foreground max-w-3xl mx-auto opacity-0 animate-fade-in delay-200">
          展示尖端 UI/UX、動畫和 AI 整合，打造現代化網路應用。
        </p>
      </section>

      {/* Personal Introduction */}
      <section className="max-w-4xl mx-auto text-center mb-16 px-4">
        <h2 className="text-4xl font-sans font-semibold text-primary mb-6 animate-fade-in delay-400">關於我</h2>
        <p className="text-lg md:text-xl font-sans text-foreground leading-relaxed opacity-0 animate-fade-in delay-500">
          作為一名全端開發者，我專注於打造優雅且高效能的網路解決方案。
          我的熱情在於透過流暢的動畫和智慧的 AI 驅動功能，創造直觀的使用者體驗。
          讓我們一起創造非凡。
        </p>
      </section>

      {/* Demo Quick Access */}
      <section className="text-center w-full max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-sans font-semibold text-primary mb-8 animate-fade-in delay-600">探索我的演示</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-card p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 animate-fade-in delay-700">
            <h3 className="text-2xl font-sans font-bold text-primary mb-3">SaaS 管理平台</h3>
            <p className="text-base font-sans text-foreground mb-4">結合 AI 洞察的數據分析與互動圖表。</p>
            <a href="/demos/saas" className="text-accent hover:underline font-sans font-medium inline-flex items-center group">
              查看演示
              <svg className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
            </a>
          </div>
          <div className="bg-card p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 animate-fade-in delay-800">
            <h3 className="text-2xl font-sans font-bold text-primary mb-3">CMS 編輯器</h3>
            <p className="text-base font-sans text-foreground mb-4">支援 AI 草稿的所見即所得內容管理。</p>
            <a href="/demos/cms" className="text-accent hover:underline font-sans font-medium inline-flex items-center group">
              查看演示
              <svg className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
            </a>
          </div>
          <div className="bg-card p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 animate-fade-in delay-900">
            <h3 className="text-2xl font-sans font-bold text-primary mb-3">登陸頁面</h3>
            <p className="text-base font-sans text-foreground mb-4">具備個性化推薦的高轉換電商頁面。</p>
            <a href="/demos/landing" className="text-accent hover:underline font-sans font-medium inline-flex items-center group">
              查看演示
              <svg className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
            </a>
          </div>
        </div>
        <a href="/demos" className="text-accent hover:underline text-xl font-sans font-medium mt-12 inline-block">查看所有演示 &rarr;</a>
      </section>
    </div>
  );
}
