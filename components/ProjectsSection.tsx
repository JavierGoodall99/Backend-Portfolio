import React from 'react';
import { motion } from 'framer-motion';
import { PROJECTS } from '../data';
import { Project } from '../types';
import { GitBranch, ExternalLink, Activity } from 'lucide-react';

const ProjectCard: React.FC<{ project: Project; index: number }> = ({ project, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group relative bg-white/[0.02] border border-terminal-border hover:border-terminal-green/50 rounded-lg p-6 transition-all duration-300 hover:shadow-lg hover:shadow-terminal-green/5 flex flex-col h-full"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="p-2 bg-terminal-green/10 rounded-md text-terminal-green">
           <Activity size={20} />
        </div>
        <div className="flex gap-2">
          {project.repoUrl && (
            <a href={project.repoUrl} className="text-terminal-gray hover:text-white transition-colors">
              <GitBranch size={18} />
            </a>
          )}
          {project.demoUrl && (
             <a href={project.demoUrl} className="text-terminal-gray hover:text-white transition-colors">
              <ExternalLink size={18} />
            </a>
          )}
        </div>
      </div>

      <h3 className="text-xl font-bold font-mono text-white mb-2 group-hover:text-terminal-green transition-colors">
        {project.name}
      </h3>
      <p className="text-terminal-gray text-sm mb-6 leading-relaxed flex-grow">
        {project.description}
      </p>

      {/* Stats Grid */}
      {project.stats && (
        <div className="grid grid-cols-2 gap-2 mb-6">
          {project.stats.map((stat, i) => (
            <div key={i} className="bg-black/30 p-2 rounded border border-white/5">
              <div className="text-[10px] text-terminal-gray uppercase tracking-wider">{stat.label}</div>
              <div className="text-sm font-mono text-white">{stat.value}</div>
            </div>
          ))}
        </div>
      )}

      <div className="flex flex-wrap gap-2 mt-auto">
        {project.techStack.map(tech => (
          <span key={tech} className="text-xs font-mono px-2 py-1 rounded bg-white/5 text-terminal-gray border border-white/5">
            {tech}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

export const ProjectsSection: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="border-b border-terminal-border pb-6">
         <h2 className="text-3xl font-bold font-mono mb-2">/projects</h2>
         <p className="text-terminal-gray text-sm font-mono">List of deployed artifacts and system designs.</p>
      </div>
     
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PROJECTS.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </div>
  );
};
