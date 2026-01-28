import React from 'react';
import { Section } from '../types';
import { Terminal, Database, BookOpen, User, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface LayoutProps {
  children: React.ReactNode;
  activeSection: Section;
  onNavigate: (section: Section) => void;
}

const NavItem = ({ 
  section, 
  active, 
  onClick, 
  icon: Icon 
}: { 
  section: Section; 
  active: boolean; 
  onClick: () => void; 
  icon: React.ElementType 
}) => {
  return (
    <button
      onClick={onClick}
      className={`group flex items-center gap-3 px-4 py-3 w-full text-sm font-mono transition-all duration-300 relative overflow-hidden rounded-md
        ${active ? 'text-terminal-green bg-terminal-green/10' : 'text-terminal-gray hover:text-terminal-text hover:bg-white/5'}
      `}
    >
      <Icon size={16} className={active ? "text-terminal-green" : "text-terminal-gray group-hover:text-terminal-text"} />
      <span className="uppercase tracking-widest">{section}</span>
      {active && (
        <motion.div 
          layoutId="active-indicator"
          className="absolute left-0 top-0 bottom-0 w-0.5 bg-terminal-green" 
        />
      )}
    </button>
  );
};

export const Layout: React.FC<LayoutProps> = ({ children, activeSection, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const handleNav = (s: Section) => {
    onNavigate(s);
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-terminal-black text-terminal-text selection:bg-terminal-green/30 selection:text-terminal-green">
      
      {/* Sidebar Navigation (Desktop) */}
      <aside className="hidden md:flex flex-col w-64 border-r border-terminal-border h-screen sticky top-0 bg-terminal-black/50 backdrop-blur-xl z-50">
        <div className="p-8 border-b border-terminal-border">
          <h1 className="text-xl font-bold font-mono tracking-tighter text-white">
            SAIDI<span className="text-terminal-green">.DEV</span>
          </h1>
          <p className="text-xs text-terminal-gray mt-2 font-mono">Backend Engineer</p>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <NavItem section={Section.HOME} active={activeSection === Section.HOME} onClick={() => handleNav(Section.HOME)} icon={Terminal} />
          <NavItem section={Section.PROJECTS} active={activeSection === Section.PROJECTS} onClick={() => handleNav(Section.PROJECTS)} icon={Database} />
          <NavItem section={Section.BLOG} active={activeSection === Section.BLOG} onClick={() => handleNav(Section.BLOG)} icon={BookOpen} />
          <NavItem section={Section.CONTACT} active={activeSection === Section.CONTACT} onClick={() => handleNav(Section.CONTACT)} icon={User} />
        </nav>

        <div className="p-6 border-t border-terminal-border">
          <div className="flex items-center gap-2 text-xs font-mono text-terminal-gray">
            <div className="w-2 h-2 rounded-full bg-terminal-green animate-pulse" />
            <span>System Online</span>
          </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 border-b border-terminal-border bg-terminal-black/80 backdrop-blur-md sticky top-0 z-50">
        <h1 className="text-lg font-bold font-mono text-white">
            SAIDI<span className="text-terminal-green">.DEV</span>
        </h1>
        <button onClick={toggleMobileMenu} className="p-2 text-terminal-text">
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden fixed inset-0 top-16 bg-terminal-black z-40 p-4"
          >
             <nav className="flex flex-col space-y-2">
              <NavItem section={Section.HOME} active={activeSection === Section.HOME} onClick={() => handleNav(Section.HOME)} icon={Terminal} />
              <NavItem section={Section.PROJECTS} active={activeSection === Section.PROJECTS} onClick={() => handleNav(Section.PROJECTS)} icon={Database} />
              <NavItem section={Section.BLOG} active={activeSection === Section.BLOG} onClick={() => handleNav(Section.BLOG)} icon={BookOpen} />
              <NavItem section={Section.CONTACT} active={activeSection === Section.CONTACT} onClick={() => handleNav(Section.CONTACT)} icon={User} />
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className="flex-1 relative overflow-x-hidden">
        <div className="max-w-5xl mx-auto p-6 md:p-12 lg:p-20">
            {children}
        </div>
      </main>
    </div>
  );
};
