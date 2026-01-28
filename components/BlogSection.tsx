import React from 'react';
import { motion } from 'framer-motion';
import { BLOG_POSTS } from '../data';
import { Calendar, Clock, ArrowUpRight } from 'lucide-react';

export const BlogSection: React.FC = () => {
  return (
    <div className="space-y-12">
      <div className="border-b border-terminal-border pb-6">
         <h2 className="text-3xl font-bold font-mono mb-2">/blog</h2>
         <p className="text-terminal-gray text-sm font-mono">Technical write-ups and documentation.</p>
      </div>

      <div className="space-y-6">
        {BLOG_POSTS.map((post, index) => (
          <motion.article
            key={post.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group relative block p-6 md:p-8 bg-white/[0.02] border border-terminal-border hover:border-terminal-gray/50 rounded-lg transition-all duration-300 cursor-pointer"
          >
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
              <div className="space-y-2">
                <div className="flex items-center gap-3 text-xs font-mono text-terminal-gray mb-2">
                  <span className="flex items-center gap-1"><Calendar size={12} /> {post.date}</span>
                  <span className="w-1 h-1 bg-terminal-gray rounded-full" />
                  <span className="flex items-center gap-1"><Clock size={12} /> {post.readTime}</span>
                </div>
                <h3 className="text-2xl font-bold text-white group-hover:text-terminal-green transition-colors">
                  {post.title}
                </h3>
              </div>
              <ArrowUpRight className="text-terminal-gray opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
            </div>

            <p className="text-terminal-gray leading-relaxed max-w-3xl mb-6">
              {post.excerpt}
            </p>

            <div className="flex flex-wrap gap-2">
              {post.tags.map(tag => (
                <span key={tag} className="text-xs font-mono px-2 py-1 text-terminal-green bg-terminal-green/5 rounded">
                  #{tag}
                </span>
              ))}
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
};
