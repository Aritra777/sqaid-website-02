import { motion } from "framer-motion";
import { ButtonImproved } from "@/components/ui/ButtonImproved";
import { SectionHeadingImproved } from "@/components/ui/SectionHeadingImproved";

export function ProductSuiteImproved() {
  const products = [
    {
      id: "argus",
      name: "Argus",
      description: "AI-powered risk analytics and threat detection platform",
      features: ["Real-time monitoring", "Predictive analytics", "Automated reporting"],
      color: "from-purple-500 to-indigo-600"
    },
    {
      id: "abacus",
      name: "Abacus",
      description: "Compliance screening and due diligence automation",
      features: ["Multi-jurisdictional support", "Document analysis", "Regulatory updates"],
      color: "from-pink-500 to-rose-600"
    },
    {
      id: "faro",
      name: "Faro",
      description: "Data governance and privacy compliance solution",
      features: ["Data mapping", "Privacy controls", "Audit trails"],
      color: "from-blue-500 to-cyan-600"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-900/50 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <SectionHeadingImproved size="large" className="mb-6">
            Our AI-Native Platform
          </SectionHeadingImproved>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Comprehensive risk and compliance solutions powered by artificial intelligence 
            to help organizations navigate complex regulatory landscapes.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="group relative bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-8 hover:border-gray-700 transition-all duration-300"
            >
              {/* Gradient background effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${product.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-xl`}></div>
              
              <div className="relative z-10">
                <div className={`w-16 h-16 bg-gradient-to-r ${product.color} rounded-lg flex items-center justify-center mb-6`}>
                  <span className="text-white font-bold text-xl">{product.name.charAt(0)}</span>
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-4">{product.name}</h3>
                <p className="text-gray-300 mb-6 leading-relaxed">{product.description}</p>
                
                <ul className="space-y-3 mb-8">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <svg className="w-5 h-5 text-green-400 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <ButtonImproved variant="outline" size="medium" fullWidth>
                  Learn more about {product.name}
                </ButtonImproved>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}