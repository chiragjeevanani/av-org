import React from "react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "../../../components/ui/accordion";

const faqs = [
  {
    question: "What does World Export Business Housing Centre do?",
    answer: "We are an industrial project developer and business consultancy. We help investors select viable business concepts, acquire land, arrange project finance from commercial lenders, obtain government clearances, design structural layouts, and manage the commissioning of manufacturing plants."
  },
  {
    question: "What are the target states you support?",
    answer: "We support projects across Gujarat, Maharashtra, Madhya Pradesh, and Rajasthan. We maintain relations with regional industrial corporations (GIDC, MIDC, MPIDC, RIICO) to ensure fast site allocation."
  },
  {
    question: "What is the typical investment requirement per project?",
    answer: "The typical investment scale ranges between ₹85 Lakhs and ₹3.5 Crores, depending on the industrial sector, machine specifications, and scope of utility setups."
  },
  {
    question: "What does the 'Coming Soon' badge mean on project cards?",
    answer: "These projects represent fully researched, feasible layout templates. We are currently finalizing machine vendors and clearing preliminary state zoning audits. Promoters can select these concepts now for Phase 1 planning."
  },
  {
    question: "How does World Export assist with project finance?",
    answer: "We prepare bankable Detailed Project Reports (DPR), compile promoters' files, and present them to empanelled commercial banks and NBFCs to facilitate secure term loans and working capital."
  },
  {
    question: "Can you help with land identification and allocation?",
    answer: "Yes. We coordinate with state industrial corporations to locate and allocate suitable manufacturing plots matching zoning laws (e.g. green zones for agro, red/orange zones for chemical/fabrication)."
  },
  {
    question: "What are the typical plot sizes for these factories?",
    answer: "Most of our standard layouts are configured for a typical plot size of 5,000 sq.ft. (500 sq.m.) to ensure energy-efficiency and space-utilization."
  },
  {
    question: "Do you assist with government clearances and licenses?",
    answer: "Yes, we handle Single Window clearances, Pollution Control Board NOCs (Consent to Establish/Operate), industrial power load allocations, factory safety inspections, and GST/PAN registrations."
  },
  {
    question: "What industrial sectors fall under your consultation scope?",
    answer: "We consult on Manufacturing, Food Processing, Agriculture, Furniture, Infrastructure, Technology, Hospitality, and wholesale B2B Trading."
  },
  {
    question: "How do we schedule an initial consultation?",
    answer: "You can use the contact form below, or call our executive advisory desk directly at 9328650500. We will schedule a physical or digital review of your preferred profile."
  }
];

export default function FAQ() {
  return (
    <section id="faq" className="py-24 bg-white overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#F59E0B] bg-amber-50 px-3.5 py-1.5 rounded-full border border-amber-200">
            Advisory Desk
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-[#0A2463] mt-4">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 text-sm mt-3 leading-relaxed">
            Have questions about industrial setups, investment criteria, or bank finance? Browse our comprehensive FAQ section or connect with our support desk.
          </p>
        </div>

        {/* FAQ Accordion list */}
        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, idx) => (
            <AccordionItem key={idx} value={`faq-${idx}`} className="border border-slate-100 bg-slate-50/50 hover:bg-slate-50 rounded-2xl px-5 transition-all">
              <AccordionTrigger className="text-sm font-bold font-heading text-slate-800 hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-xs text-slate-600 leading-relaxed pt-1 pb-4">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

      </div>
    </section>
  );
}
