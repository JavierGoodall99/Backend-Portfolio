import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { HeroSection } from './components/HeroSection';
import { ProjectsSection } from './components/ProjectsSection';
import { BlogSection } from './components/BlogSection';
import { ContactSection } from './components/ContactSection';
import { Section } from './types';
import { AnimatePresence, motion } from 'framer-motion';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<Section>(Section.HOME);

  const renderSection = () => {
    switch (activeSection) {
      case Section.HOME:
        return <HeroSection onNavigate={setActiveSection} />;
      case Section.PROJECTS:
        return <ProjectsSection />;
      case Section.BLOG:
        return <BlogSection />;
      case Section.CONTACT:
        return <ContactSection />;
      default:
        return <HeroSection onNavigate={setActiveSection} />;
    }
  };

  return (
    <Layout activeSection={activeSection} onNavigate={setActiveSection}>
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          {renderSection()}
        </motion.div>
      </AnimatePresence>
    </Layout>
  );
};

export default App;
