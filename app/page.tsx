"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Code, Briefcase, User, Mail, Github, Linkedin, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { Outfit, Space_Grotesk } from 'next/font/google';

// Load Outfit for body text
const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
});

// Load Space Grotesk for headings (as a replacement for Clash Display)
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space',
});

const TypeWriter = ({ words, speed = 150, delay = 3000 }) => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [blink, setBlink] = useState(true);

  // Blink effect
  useEffect(() => {
    const timeout2 = setTimeout(() => {
      setBlink((prev) => !prev);
    }, 500);
    return () => clearTimeout(timeout2);
  }, [blink]);

  // Typing effect
  useEffect(() => {
    if (subIndex === words[index].length + 1 && !reverse) {
      setReverse(true);
      return;
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, Math.max(reverse ? 75 : subIndex === words[index].length ? delay : speed, 50));

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, words, speed, delay]);

  return (
    <span className="typing-text">
      {`${words[index].substring(0, subIndex)}${blink ? "|" : ""}`}
    </span>
  );
};

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredProject, setHoveredProject] = useState(null);

  // Add mouse position tracking for gradient interaction
  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);
  
  
  const projects = [
    {
      title: "Project 1",
      description: "A revolutionary web application",
      tech: ["React", "Node.js", "MongoDB"],
      link: "#",
      color: "from-violet-500 to-fuchsia-500"
    },
    {
      title: "Project 2",
      description: "Mobile-first design system",
      tech: ["Next.js", "TypeScript", "Tailwind"],
      link: "#",
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Project 3",
      description: "AI-powered analytics platform",
      tech: ["Python", "TensorFlow", "AWS"],
      link: "#",
      color: "from-emerald-500 to-teal-500"
    }
  ];

  const roles = [
    "Competitive Programmer",
    "Machine Learning Enthusiast",
    "Problem Solver",
    "Tech Enthusiast"
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className={`min-h-screen w-full overflow-hidden relative bg-gradient-to-br from-gray-900 via-black to-gray-900 ${outfit.variable} ${spaceGrotesk.variable} font-sans`}>
      {/* Enhanced Animated background elements */}
      <div className="fixed inset-0 z-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-gradient-to-r from-purple-500/30 to-pink-500/30 blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-gradient-to-r from-blue-500/30 to-cyan-500/30 blur-3xl"
        />
        {/* Additional background elements */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [-45, 0, -45],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-[30%] right-[20%] w-[400px] h-[400px] rounded-full bg-gradient-to-r from-emerald-500/20 to-teal-500/20 blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.1, 1, 1.1],
            rotate: [45, 0, 45],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-[40%] left-[20%] w-[450px] h-[450px] rounded-full bg-gradient-to-r from-orange-500/20 to-yellow-500/20 blur-3xl"
        />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full backdrop-blur-xl border-b border-white/10 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent font-space"
          >
            AS
          </motion.h1>
          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="flex gap-6"
          >
            {["About", "Projects", "Contact"].map((item, i) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="relative nav-link text-white/80 hover:text-white transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                variants={item}
              >
                <span>{item}</span>
                <motion.span
                  className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400"
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            ))}
          </motion.div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 px-6 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.h1 
              className="text-7xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Hi, I'm{" "}
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent font-space tracking-tight">
                Arghajit Saha
              </span>
            </motion.h1>
            <motion.div 
              className="text-2xl text-white/80 mb-8 h-12 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <TypeWriter words={roles} speed={100} delay={2000} />
            </motion.div>
            <motion.div 
              className="flex justify-center gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              {/* Enhanced Buttons */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative group px-8 py-3 overflow-hidden rounded-lg bg-gradient-to-r from-purple-500 to-pink-500"
              >
                <span className="absolute inset-0 w-full h-full transition duration-300 transform -translate-x-full bg-gradient-to-r from-blue-500 to-purple-500 group-hover:translate-x-0"></span>
                <span className="relative text-white font-medium text-lg">View Projects</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative group px-8 py-3 overflow-hidden rounded-lg bg-transparent border border-white/20 backdrop-blur-sm"
              >
                <span className="absolute inset-0 w-full h-full transition duration-300 transform -translate-x-full bg-gradient-to-r from-cyan-500 to-blue-500 group-hover:translate-x-0"></span>
                <span className="relative text-white font-medium text-lg">Contact Me</span>
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Project Cards */}
      <section id="projects" className="py-20 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-5xl font-bold mb-12 text-center bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent font-space"
          >
            Featured Projects
          </motion.h2>
          <motion.div 
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {projects.map((project, i) => (
              <motion.div
                key={project.title}
                variants={item}
                onHoverStart={() => setHoveredProject(i)}
                onHoverEnd={() => setHoveredProject(null)}
                whileHover={{ y: -10 }}
              >
                <motion.div 
                  className={`backdrop-blur-xl bg-white/10 border border-white/20 rounded-xl p-6 h-full
                    ${hoveredProject === i ? 'shadow-lg shadow-purple-500/30' : ''}`}
                  animate={{
                    scale: hoveredProject === i ? 1.02 : 1,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <div className={`h-2 w-20 mb-4 rounded-full bg-gradient-to-r ${project.color}`} />
                  <h3 className="text-2xl font-bold mb-2 text-white font-space">{project.title}</h3>
                  <p className="text-white/70 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map(tech => (
                      <span 
                        key={tech} 
                        className="backdrop-blur-xl bg-gradient-to-r from-white/10 to-white/5 px-3 py-1 rounded-full text-sm text-white/80"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <motion.a 
                    href={project.link} 
                    className="flex items-center text-white/80 hover:text-white group"
                    whileHover={{ x: 5 }}
                  >
                    View Project 
                    <ExternalLink className="ml-2 w-4 h-4 group-hover:rotate-45 transition-transform duration-300" />
                  </motion.a>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 relative">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-5xl font-bold mb-12 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent font-space"
          >
            Let's Connect
          </motion.h2>
          <motion.div 
            className="flex justify-center gap-6"
            variants={container}
            initial="hidden"
            whileInView="show"
          >
            {[
              { icon: Github, link: "https://github.com", color: "from-purple-400 to-pink-400" },
              { icon: Linkedin, link: "https://linkedin.com", color: "from-blue-400 to-cyan-400" },
              { icon: Mail, link: "mailto:contact@example.com", color: "from-emerald-400 to-teal-400" }
            ].map(({ icon: Icon, link, color }) => (
              <motion.a
                key={link}
                href={link}
                variants={item}
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                className={`p-4 rounded-full bg-gradient-to-r ${color} hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300`}
              >
                <Icon className="w-6 h-6 text-white" />
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}