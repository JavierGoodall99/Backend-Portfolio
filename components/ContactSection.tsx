import React from 'react';
import { motion } from 'framer-motion';
import { PROFILE } from '../data';
import { Mail, Github, Linkedin, Twitter, Copy, Check } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = React.useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(PROFILE.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-2xl">
      <div className="border-b border-terminal-border pb-6 mb-12">
         <h2 className="text-3xl font-bold font-mono mb-2">/contact</h2>
         <p className="text-terminal-gray text-sm font-mono">Initialize handshake protocol.</p>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/[0.02] border border-terminal-border rounded-lg p-8 md:p-12 text-center"
      >
        <h3 className="text-2xl font-bold text-white mb-6">Let's build something scalable.</h3>
        <p className="text-terminal-gray mb-8">
          I'm currently looking for new opportunities in backend development. 
          Whether you have a question or just want to say hi, my inbox is open.
        </p>

        <div className="flex justify-center mb-10">
          <button 
            onClick={copyEmail}
            className="group flex items-center gap-3 px-6 py-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-terminal-green/50 rounded-lg transition-all"
          >
            <Mail className="text-terminal-green" />
            <span className="font-mono text-lg text-white">{PROFILE.email}</span>
            <div className="pl-3 border-l border-white/10 text-terminal-gray group-hover:text-white">
              {copied ? <Check size={18} /> : <Copy size={18} />}
            </div>
          </button>
        </div>

        <div className="flex justify-center gap-8">
          <a href={`https://${PROFILE.socials.github}`} target="_blank" rel="noreferrer" className="text-terminal-gray hover:text-white transition-colors">
            <Github size={24} />
          </a>
          <a href={`https://${PROFILE.socials.linkedin}`} target="_blank" rel="noreferrer" className="text-terminal-gray hover:text-white transition-colors">
            <Linkedin size={24} />
          </a>
          <a href="#" className="text-terminal-gray hover:text-white transition-colors">
            <Twitter size={24} />
          </a>
        </div>
      </motion.div>
    </div>
  );
};
