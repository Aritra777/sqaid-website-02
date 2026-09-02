import { motion } from "framer-motion";
import { ButtonImproved } from "@/components/ui/ButtonImproved";
import { SectionHeadingImproved } from "@/components/ui/SectionHeadingImproved";

export function HeroImproved() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/30 via-purple-950/20 to-pink-950/30"></div>
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px] animate-pulse delay-1000"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-6">
            <span className="w-2 h-2 bg-green-400 rounded-full mr-3 animate-pulse"></span>
            <span className="text-sm font-medium text-white">New AI platform launched</span>
          </div>
          
          <SectionHeadingImproved 
            as="h1" 
            size="hero"
            className="mb-6 leading-tight"
          >
            Transform Risk & Compliance with
            <span className="block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              AI-Native Solutions
            </span>
          </SectionHeadingImproved>
          
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            SqAId's platform revolutionizes how organizations approach risk management and compliance through 
            cutting-edge artificial intelligence and automated analytics.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <ButtonImproved variant="primary" size="large">
            Start Free Trial
          </ButtonImproved>
          <ButtonImproved variant="outline" size="large">
            View Demo
          </ButtonImproved>
        </motion.div>

        {/* Floating elements */}
        <div className="absolute top-1/3 left-8 w-4 h-4 bg-purple-400 rounded-full animate-float"></div>
        <div className="absolute bottom-1/4 right-12 w-6 h-6 bg-pink-400 rounded-full animate-float delay-500"></div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ delay: 1, duration: 0.5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
      >
        <span className="text-gray-400 text-sm mb-2">Scroll to explore</span>
        <div className="w-6 h-10 border-l-2 border-t-2 border-gray-400 transform rotate-45"></div>
      </motion.div>

      {/* Custom animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}