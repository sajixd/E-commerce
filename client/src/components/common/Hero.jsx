import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
      return (
            <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
                  {/* Background Effects */}
                  <div className="absolute inset-0 bg-background">
                        <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent-purple/20 rounded-full blur-[100px] animate-pulse-slow" />
                        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-cyan/20 rounded-full blur-[100px] animate-pulse-slow" />
                  </div>

                  <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <motion.h1
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.8 }}
                              className="text-5xl md:text-7xl font-bold mb-6"
                        >
                              The Future of <br />
                              <span className="bg-gradient-to-r from-accent-cyan to-accent-purple bg-clip-text text-transparent">
                                    Digital Commerce
                              </span>
                        </motion.h1>

                        <motion.p
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.8, delay: 0.2 }}
                              className="mt-4 text-xl text-gray-400 max-w-2xl mx-auto mb-10"
                        >
                              Experience the next generation of shopping with our futuristic platform.
                              Borderless, seamless, and infinitely scalable.
                        </motion.p>

                        <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.8, delay: 0.4 }}
                              className="flex justify-center gap-4"
                        >
                              <button className="px-8 py-3 bg-accent-purple hover:bg-accent-purple/80 rounded-full font-medium transition-all hover:scale-105 flex items-center gap-2">
                                    Shop Now <ArrowRight className="w-4 h-4" />
                              </button>
                              <button className="px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full font-medium transition-all backdrop-blur-sm">
                                    Learn More
                              </button>
                        </motion.div>
                  </div>
            </div>
      );
};

export default Hero;
