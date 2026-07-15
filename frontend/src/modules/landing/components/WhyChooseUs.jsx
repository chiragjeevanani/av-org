import React from "react";
import { motion } from "framer-motion";
import { 
  Users, TrendingUp, Cpu, Award, 
  MapPin, HelpCircle, ShieldCheck, Compass, 
  CheckCircle2 
} from "lucide-react";
import { Card, CardContent } from "../../../components/ui/card";

const reasonCards = [
  {
    icon: Users,
    title: "Experienced Team",
    description: "Our panel comprises senior industrial architects, project engineers, retired bank managers, and state policy experts with 25+ combined years of service."
  },
  {
    icon: Compass,
    title: "Investment Guidance",
    description: "Aligning your budget (₹85 Lakhs to ₹10 Crore+) with sectors boasting high capacity utilization rates and robust regional demand patterns."
  },
  {
    icon: Cpu,
    title: "Industrial Expertise",
    description: "Deep engineering domain knowledge spanning readymade apparel factories, cold storages, heavy fabrication, food processing units, and logistics hubs."
  },
  {
    icon: TrendingUp,
    title: "Business Planning",
    description: "Providing detailed market surveys, competitor analysis, pricing sheets, cash flow margins, and break-even projections for standard layouts."
  },
  {
    icon: Award,
    title: "Finance Assistance",
    description: "Leveraging our corporate relations to secure term loans, working capital limits, and government capital-interest subsidies without hassle."
  },
  {
    icon: MapPin,
    title: "Location Selection",
    description: "Identifying optimal plots in Gujarat, Maharashtra, MP, and Rajasthan with reliable grid power, expressways access, and ready labor markets."
  },
  {
    icon: ShieldCheck,
    title: "Government Guidance",
    description: "Navigating Single Window Clearances, Pollution Control Board NOCs, factory licenses, power load approvals, and tax registration procedures."
  },
  {
    icon: CheckCircle2,
    title: "End-to-End Support",
    description: "We remain your consultants from project identification and civil architecture setup to trials, machinery commissioning, and commercial launch."
  }
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 100 }
  }
};

export default function WhyChooseUs() {
  return (
    <section id="why-choose-us" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#F59E0B] bg-amber-50 px-3.5 py-1.5 rounded-full border border-amber-200">
            Advisory Strengths
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-[#0A2463] mt-4">
            Why Capital Promoters Trust Us
          </h2>
          <p className="text-slate-600 text-sm mt-3 leading-relaxed">
            Building an industrial layout requires meticulous checks. Here is how we mitigate risks and ensure structured development at every stage.
          </p>
        </div>

        {/* Reason Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {reasonCards.map((reason, idx) => {
            const IconComp = reason.icon;
            return (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="h-full"
              >
                <Card className="h-full border border-slate-100 hover:border-amber-300 bg-white hover:bg-slate-50/50 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between p-5 rounded-2xl group">
                  <CardContent className="p-0 space-y-4">
                    <div className="p-3 bg-blue-50/60 text-primary w-fit rounded-xl border border-blue-100 group-hover:bg-[#0A2463] group-hover:text-white transition-all duration-300">
                      <IconComp className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 font-heading text-base group-hover:text-[#0A2463]">
                        {reason.title}
                      </h4>
                      <p className="text-slate-500 text-xs mt-2 leading-relaxed">
                        {reason.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
