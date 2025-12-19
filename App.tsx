
import React from 'react';
import HeroScene from './components/HeroScene';
import EncryptedPortfolio from './components/EncryptedPortfolio';
import { ArrowDown, Infinity as InfinityIcon } from 'lucide-react';

const App: React.FC = () => {
  const slogan = "where nodes meet, forms emerge.";
  const sloganJp = "点が結び、形が生まれる场所。";

  return (
    <main className="relative min-h-screen bg-node-bg text-node-text font-sans selection:bg-node-text selection:text-node-bg">
      
      {/* 极细微噪点贴层 */}
      <div className="fixed inset-0 z-[60] pointer-events-none opacity-[0.08] bg-noise mix-blend-multiply"></div>

      {/* Header */}
      <header className="fixed top-0 left-0 w-full z-50 p-8 md:p-14 flex justify-between items-start pointer-events-none">
        <div className="flex items-center space-x-5 pointer-events-auto group cursor-pointer">
          <InfinityIcon className="w-5 h-5 transition-all group-hover:scale-110 group-hover:rotate-12 duration-500" strokeWidth={1.5} />
          <span className="text-xs font-bold tracking-[0.5em] uppercase text-node-text">node</span>
        </div>
        <div className="hidden md:flex flex-col items-end gap-1 opacity-20 text-[8px] font-mono tracking-[0.4em] uppercase pointer-events-auto">
          <span>Creative Unit</span>
          <span>Tokyo / 2024</span>
        </div>
      </header>

      {/* Hero Background - 3D 磨砂玻璃无限符号 */}
      <div className="fixed inset-0 z-0 h-screen w-full pointer-events-none">
        <HeroScene />
      </div>

      {/* Slogan Section */}
      <section className="relative z-10 min-h-screen flex items-center px-8 md:px-28 pointer-events-none">
        <div className="max-w-none pointer-events-auto">
          {/* 单排显示，根据屏幕自适应大小 */}
          <h1 className="animate-slogan-fade text-[5vw] sm:text-2xl md:text-[1.6rem] font-extralight tracking-[0.18em] leading-tight mb-5 text-node-text whitespace-nowrap">
            {slogan}
          </h1>
          <div className="space-y-4 animate-slogan-fade" style={{ animationDelay: '0.8s' }}>
            <p className="text-[8px] md:text-[9px] font-light text-node-muted tracking-[0.6em] opacity-30 max-w-md leading-relaxed uppercase">
              {sloganJp}
            </p>
            <div className="w-8 h-[1px] bg-node-text/10"></div>
          </div>
        </div>
        
        <div className="absolute bottom-14 left-8 md:left-28 animate-bounce opacity-10">
          <ArrowDown className="w-4 h-4 stroke-[1px]" />
        </div>
      </section>

      {/* About Section */}
      <section className="relative z-10 bg-node-bg border-t border-node-text/[0.03]">
        <div className="max-w-[1440px] mx-auto px-8 md:pl-44 md:pr-20 py-52">
          <div className="grid md:grid-cols-[220px_1fr] gap-32">
            <div className="md:sticky md:top-52 h-fit">
              <span className="text-[8px] font-mono text-node-muted tracking-[0.7em] uppercase block mb-8 opacity-40">System_Profile // 00</span>
              <h2 className="text-4xl font-light tracking-tighter leading-none">About<br/>us</h2>
              <div className="w-12 h-[1px] bg-node-text/10 mt-10"></div>
            </div>

            <div className="max-w-3xl">
              <div className="space-y-8 mb-32">
                <p className="text-sm md:text-[15px] font-light leading-loose text-node-text/80">
                  nodeは、3Dデザイナー、インダストリアルデザイナー、プログラマー、VJ、プロデューサーで構成されたクロスディシプリンなチームです。
                </p>
                <p className="text-sm md:text-[15px] font-light leading-loose text-node-text/80">
                  デジタルとフィジカルのあいだにある「点」をつなぎ、体験として立ち上がる「形」をつくり出します。
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 md:gap-12">
                <div>
                  <h3 className="text-[10px] font-bold tracking-[0.2em] uppercase mb-6 pb-3 border-b border-node-text/10">Modeling</h3>
                  <p className="text-[11px] leading-relaxed text-node-muted font-light">
                    静止画からアニメーションまで、造形や质感を丁寧に表现します。
                  </p>
                </div>
                <div>
                  <h3 className="text-[10px] font-bold tracking-[0.2em] uppercase mb-6 pb-3 border-b border-node-text/10">Fabrication</h3>
                  <p className="text-[11px] leading-relaxed text-node-muted font-light">
                    デジタルモデルを立体物として出力し、アイデアを具现化します。
                  </p>
                </div>
                <div>
                  <h3 className="text-[10px] font-bold tracking-[0.2em] uppercase mb-6 pb-3 border-b border-node-text/10">Interactive</h3>
                  <p className="text-[11px] leading-relaxed text-node-muted font-light">
                    リアルタイムビジュアル、音乐との连动演出など、体験づくりを行います。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Selected Works Section */}
      <section className="relative z-10 bg-node-bg border-t border-node-text/[0.03]">
        <div className="max-w-[1440px] mx-auto px-8 md:pl-44 md:pr-20 py-52">
          <div className="grid md:grid-cols-[220px_1fr] gap-32">
            <div className="md:sticky md:top-52 h-fit">
              <span className="text-[8px] font-mono text-node-muted tracking-[0.7em] uppercase block mb-8 opacity-40">System_Archive // 01</span>
              <h2 className="text-4xl font-light tracking-tighter leading-none">Selected<br/>Works</h2>
              <div className="w-12 h-[1px] bg-node-text/10 mt-10"></div>
            </div>
            <EncryptedPortfolio />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-node-bg py-52 px-8 md:pl-44 md:pr-20 border-t border-node-text/[0.03]">
        <div className="max-w-5xl">
          <p className="text-[8px] font-mono uppercase tracking-[0.7em] text-node-muted mb-16 opacity-40">Contact / Inquiries</p>
          <a href="mailto:kanshin404@gmail.com" className="text-3xl md:text-5xl font-light tracking-tighter hover:opacity-30 transition-all duration-700 block text-node-text">
            kanshin404@gmail.com
          </a>
        </div>
        <div className="mt-52 pt-14 border-t border-node-text/[0.03] flex flex-col md:flex-row justify-between items-center gap-10 opacity-20 text-[7px] font-mono tracking-[0.4em] uppercase">
          <span>Design as emerging nodes</span>
          <div className="flex gap-12">
            <a href="https://github.com/boli404/boli404" target="_blank" rel="noreferrer" className="hover:opacity-100 transition-opacity">GitHub</a>
            <a href="#" className="hover:opacity-100 transition-opacity">Instagram</a>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default App;
