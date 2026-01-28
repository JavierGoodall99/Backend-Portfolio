import React from 'react';
import { motion } from 'framer-motion';
import { PROFILE, SKILLS } from '../data';
import { ArrowRight, Download } from 'lucide-react';
import { Section } from '../types';

export const HeroSection: React.FC<{ onNavigate: (s: Section) => void }> = ({ onNavigate }) => {
  return (
    <div className="flex flex-col gap-12 pt-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-terminal-border bg-white/5 mb-6">
          <span className="w-2 h-2 rounded-full bg-terminal-green animate-pulse"></span>
          <span className="text-xs font-mono text-terminal-gray tracking-wide">AVAILABLE FOR HIRE</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">
          <span className="text-terminal-gray">def</span> BuildScale<span className="text-terminal-gray">(</span><br/>
          <span className="pl-4 md:pl-8 text-white">backend</span>: <span className="text-terminal-green">"Robust"</span><br/>
          <span className="text-terminal-gray">)</span>
        </h1>
        
        <p className="text-xl text-terminal-gray max-w-2xl leading-relaxed mb-8">
          I'm <span className="text-white font-medium">{PROFILE.name}</span>, a backend engineer obsessed with system architecture, 
          database optimization, and clean APIs. I turn complex logic into efficient code.
        </p>

        <div className="flex flex-wrap gap-4">
           <button 
            onClick={() => onNavigate(Section.PROJECTS)}
            className="px-6 py-3 bg-white text-black font-mono font-medium rounded hover:bg-terminal-text transition-colors flex items-center gap-2 group"
          >
            View Projects 
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="px-6 py-3 border border-terminal-border text-terminal-gray font-mono font-medium rounded hover:text-white hover:border-white transition-colors flex items-center gap-2">
            Download Resume
            <Download size={16} />
          </button>
        </div>
      </motion.div>

      {/* Code / Visual Block */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="w-full bg-[#0d0d0d] border border-terminal-border rounded-lg overflow-hidden font-mono text-sm shadow-2xl"
      >
        <div className="flex items-center gap-2 px-4 py-3 border-b border-terminal-border bg-white/5">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
            <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
            <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
          </div>
          <span className="ml-4 text-xs text-terminal-gray opacity-60">profile.json</span>
        </div>
        <div className="p-6 overflow-x-auto">
          <pre className="text-sm leading-6">
            <code>
              <span className="text-purple-400">const</span> <span className="text-yellow-200">Engineer</span> <span className="text-purple-400">=</span> {'{'}
              {'\n'}  <span className="text-blue-300">name</span>: <span className="text-green-400">"{PROFILE.name}"</span>,
              {'\n'}  <span className="text-blue-300">role</span>: <span className="text-green-400">"{PROFILE.role}"</span>,
              {'\n'}  <span className="text-blue-300">skills</span>: [
              {'\n'}    {SKILLS.slice(0, 5).map(s => <span key={s}><span className="text-green-400">"{s}"</span>, </span>)}...
              {'\n'}  ],
              {'\n'}  <span className="text-blue-300">execute</span>: <span className="text-purple-400">async</span> () <span className="text-purple-400">=&gt;</span> {'{'}
              {'\n'}    <span className="text-purple-400">return</span> <span className="text-green-400">"High Scalability"</span>;
              {'\n'}  {'}'}
              {'\n'}{'}'}
            </code>
          </pre>
        </div>
      </motion.div>
    </div>
  );
};
