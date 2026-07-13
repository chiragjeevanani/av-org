import React from "react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "../../../components/ui/accordion";
import { useLanguage } from "../../../context/LanguageContext";

export default function FAQ() {
  const { t } = useLanguage();

  // Dynamically load the 10 FAQ items from the dictionary
  const faqs = Array.from({ length: 10 }).map((_, idx) => ({
    question: t(`faq.items.${idx}.question`),
    answer: t(`faq.items.${idx}.answer`)
  }));

  return (
    <section id="faq" className="py-24 bg-white overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#F59E0B] bg-amber-50 px-3.5 py-1.5 rounded-full border border-amber-200">
            {t('faq.badge')}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-[#0A2463] mt-4">
            {t('faq.title')}
          </h2>
          <p className="text-slate-600 text-sm mt-3 leading-relaxed">
            {t('faq.description')}
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
