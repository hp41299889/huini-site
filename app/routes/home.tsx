import { cn } from "../../lib/utils";

export default function Home() {
  return (
    <div className={cn("min-h-screen flex flex-col items-center justify-center bg-background text-foreground p-4")}>
      {/* Hero Section */}
      <section className="text-center mb-16 px-4">
        <h1 className="text-6xl md:text-8xl font-serif font-bold text-primary mb-6 leading-tight animate-fade-in-up">
          Build with <span className="text-accent">Intelligence</span>
        </h1>
        <p className="text-xl md:text-2xl font-sans text-foreground max-w-3xl mx-auto opacity-0 animate-fade-in delay-200">
          Showcasing cutting-edge UI/UX, animations, and AI integrations for modern web applications.
        </p>
      </section>

      {/* Personal Introduction */}
      <section className="max-w-4xl mx-auto text-center mb-16 px-4">
        <h2 className="text-4xl font-sans font-semibold text-primary mb-6 animate-fade-in delay-400">About Me</h2>
        <p className="text-lg md:text-xl font-sans text-foreground leading-relaxed opacity-0 animate-fade-in delay-500">
          As a full-stack developer, I specialize in crafting elegant and performant web solutions.
          My passion lies in creating intuitive user experiences with seamless animations and intelligent
          AI-driven features. Let's build something extraordinary together.
        </p>
      </section>

      {/* Demo Quick Access */}
      <section className="text-center w-full max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-sans font-semibold text-primary mb-8 animate-fade-in delay-600">Explore My Demos</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-card p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 animate-fade-in delay-700">
            <h3 className="text-2xl font-sans font-bold text-primary mb-3">SaaS Dashboard</h3>
            <p className="text-base font-sans text-foreground mb-4">Data analytics & interactive charts with AI insights.</p>
            <a href="/demos/saas" className="text-accent hover:underline font-sans font-medium inline-flex items-center group">
              View Demo
              <svg className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
            </a>
          </div>
          <div className="bg-card p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 animate-fade-in delay-800">
            <h3 className="text-2xl font-sans font-bold text-primary mb-3">CMS Editor</h3>
            <p className="text-base font-sans text-foreground mb-4">WYSIWYG content management with AI drafting.</p>
            <a href="/demos/cms" className="text-accent hover:underline font-sans font-medium inline-flex items-center group">
              View Demo
              <svg className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
            </a>
          </div>
          <div className="bg-card p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 animate-fade-in delay-900">
            <h3 className="text-2xl font-sans font-bold text-primary mb-3">Landing Page</h3>
            <p className="text-base font-sans text-foreground mb-4">High-conversion e-commerce pages with personalized offers.</p>
            <a href="/demos/landing" className="text-accent hover:underline font-sans font-medium inline-flex items-center group">
              View Demo
              <svg className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
            </a>
          </div>
        </div>
        <a href="/demos" className="text-accent hover:underline text-xl font-sans font-medium mt-12 inline-block">View All Demos &rarr;</a>
      </section>
    </div>
  );
}
