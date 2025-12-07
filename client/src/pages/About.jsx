import React from 'react';
import { motion } from 'framer-motion';
import { Store, Zap, Shield, Globe } from 'lucide-react';

const About = () => {
      return (
            <div className="min-h-screen pt-20 px-4">
                  <div className="max-w-4xl mx-auto py-12">
                        <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="glass-card p-8 rounded-2xl mb-8"
                        >
                              <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-accent-cyan to-accent-purple bg-clip-text text-transparent">
                                    About NEXUS
                              </h1>

                              <p className="text-lg text-gray-300 mb-6">
                                    Welcome to NEXUS - your gateway to the future of digital commerce. We're not just another online store;
                                    we're a revolution in how you experience shopping in the digital age.
                              </p>

                              <p className="text-gray-400 mb-6">
                                    Founded on the principles of innovation, quality, and customer satisfaction, NEXUS brings you
                                    cutting-edge products from around the world. Our curated collection features the latest in technology,
                                    fashion, and lifestyle products that define tomorrow.
                              </p>

                              <div className="grid md:grid-cols-2 gap-6 mt-8">
                                    <div className="p-6 bg-white/5 rounded-xl border border-white/10">
                                          <Store className="w-10 h-10 text-accent-cyan mb-4" />
                                          <h3 className="text-xl font-bold mb-2">Premium Selection</h3>
                                          <p className="text-gray-400 text-sm">
                                                Every product is carefully selected to meet our high standards of quality and innovation.
                                          </p>
                                    </div>

                                    <div className="p-6 bg-white/5 rounded-xl border border-white/10">
                                          <Zap className="w-10 h-10 text-accent-purple mb-4" />
                                          <h3 className="text-xl font-bold mb-2">Fast Delivery</h3>
                                          <p className="text-gray-400 text-sm">
                                                Lightning-fast shipping to get your products to you as quickly as possible.
                                          </p>
                                    </div>

                                    <div className="p-6 bg-white/5 rounded-xl border border-white/10">
                                          <Shield className="w-10 h-10 text-accent-cyan mb-4" />
                                          <h3 className="text-xl font-bold mb-2">Secure Shopping</h3>
                                          <p className="text-gray-400 text-sm">
                                                Your data and transactions are protected with enterprise-grade security.
                                          </p>
                                    </div>

                                    <div className="p-6 bg-white/5 rounded-xl border border-white/10">
                                          <Globe className="w-10 h-10 text-accent-purple mb-4" />
                                          <h3 className="text-xl font-bold mb-2">Global Reach</h3>
                                          <p className="text-gray-400 text-sm">
                                                We ship worldwide, bringing the future to your doorstep wherever you are.
                                          </p>
                                    </div>
                              </div>
                        </motion.div>

                        <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.2 }}
                              className="glass-card p-8 rounded-2xl"
                        >
                              <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
                              <p className="text-gray-400">
                                    To redefine the shopping experience by combining cutting-edge technology with exceptional customer service.
                                    We believe in making premium products accessible to everyone, delivered with a seamless, futuristic shopping experience.
                              </p>
                        </motion.div>
                  </div>
            </div>
      );
};

export default About;
