import React, { useState, useEffect, useRef } from 'react'
import { useStore } from '../store/store'

const FakeNews = () => {
  const [textInput, setTextInput] = useState('')
  const [displayedExplanation, setDisplayedExplanation] = useState('')
  const { checkNews, isLoading, result, error } = useStore()
  
  // 1. Ref para sa auto-scroll target
  const scrollRef = useRef(null)

  const handlesubmit = (e) => {
    e.preventDefault()
    if (!textInput.trim()) return 
    setDisplayedExplanation('')
    checkNews(textInput)
  }

  // Typewriter Logic
  useEffect(() => {
    let isCancelled = false;
    if (!isLoading && result?.explanation) {
      setDisplayedExplanation(''); 
      const type = async () => {
        const text = result.explanation;
        for (let i = 0; i <= text.length; i++) {
          if (isCancelled) break;
          setDisplayedExplanation(text.slice(0, i));
          await new Promise(resolve => setTimeout(resolve, 15));
        }
      };
      type();
    }
    return () => { isCancelled = true; };
  }, [isLoading, result?.explanation]);

  // 2. Auto-scroll Effect: Tatakbo tuwing nagbabago ang displayedExplanation
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [displayedExplanation]);

  return (
    <div className="min-h-screen bg-white text-black font-mono selection:bg-black selection:text-white pb-20">
      <nav className="flex justify-between items-center p-6 border-b border-black">
        <span className="font-black text-xl tracking-tighter uppercase">Fact.AI</span>
        <div className="flex gap-8 text-[10px] uppercase font-bold tracking-widest">
          <span className="opacity-40 uppercase">v1.0.2</span>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-20">
        <header className="mb-24">
          <h1 className="text-6xl md:text-8xl font-black leading-none mb-8 tracking-tighter uppercase">
            Verify <br /> Everything.
          </h1>
          <p className="max-w-md text-xs uppercase leading-relaxed tracking-widest text-gray-400">
            Raw intelligence engine. Neural analysis without the noise.
          </p>
        </header>

        <section className="border-t-2 border-black pt-12">
          <form onSubmit={handlesubmit} className="space-y-8">
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-gray-400">Input claim for analysis</label>
              <textarea 
                rows="4"
                placeholder="TYPE OR PASTE TEXT HERE..." 
                className="w-full text-2xl md:text-4xl font-bold bg-transparent outline-none placeholder:text-gray-100 resize-none uppercase"
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                disabled={isLoading}
              />
            </div>

            <button 
              type="submit" 
              disabled={isLoading || !textInput.trim()}
              className="w-full py-6 bg-black text-white font-black uppercase tracking-[0.4em] text-sm hover:bg-gray-900 transition-colors disabled:bg-gray-100 disabled:text-gray-400"
            >
              {isLoading ? 'Scanning Network...' : 'Execute Analysis'}
            </button>
          </form>
        </section>

        {error && (
          <div className="mt-8 p-4 border border-red-600 text-red-600 text-xs uppercase font-bold tracking-widest">
            Critical Error: {error}
          </div>
        )}

        {/* RESULTS SECTION */}
        {!isLoading && result && (
          <section className="mt-24 border-t border-black pt-16 grid grid-cols-1 md:grid-cols-12 gap-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="md:col-span-5">
              <span className="text-[10px] font-bold uppercase text-gray-400 block mb-4 tracking-widest">Final Verdict</span>
              <h2 className={`text-7xl font-black tracking-tighter uppercase ${result.result === 'FAKE' ? 'text-red-600' : 'text-black'}`}>
                {result.result}
              </h2>
              <div className="mt-6 flex items-center gap-4">
                <div className="h-[2px] w-12 bg-black"></div>
                <span className="text-sm font-bold tracking-widest uppercase">{result.level} Confidence</span>
              </div>
            </div>

            <div className="md:col-span-7">
              <span className="text-[10px] font-bold uppercase text-gray-400 block mb-4 tracking-widest">Intelligence Report</span>
              <div className="text-lg md:text-xl font-medium leading-relaxed text-gray-800">
                {displayedExplanation}
                <span className="inline-block w-2 h-6 bg-black ml-2 animate-pulse align-middle" />
                
                {/* 3. Empty div as scroll anchor */}
                <div ref={scrollRef} className="h-4" />
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  )
}

export default FakeNews