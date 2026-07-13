import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "../../../components/ui/input";
import { Textarea } from "../../../components/ui/textarea";
import { Button } from "../../../components/ui/button";
import { Phone, Mail, MapPin, CheckCircle2, ArrowRight } from "lucide-react";
import { useLanguage } from "../../../context/LanguageContext";

export default function Contact() {
  const { projects: projectsData, t } = useLanguage();
  
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    project: "",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.project) {
      alert(t('contact.form.alertEmpty'));
      return;
    }
    // Simulate submission
    setSubmitted(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <section id="contact" className="py-24 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#F59E0B] bg-amber-50 px-3.5 py-1.5 rounded-full border border-amber-200">
            {t('contact.badge')}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-[#0A2463] mt-4">
            {t('contact.title')}
          </h2>
          <p className="text-slate-600 text-sm mt-3 leading-relaxed">
            {t('contact.description')}
          </p>
        </div>

        {/* Contact Info & Form Grid */}
        <div className="grid lg:grid-cols-12 gap-12">
          
          {/* Left Column - Contact details & Google map */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-6">
              
              {/* Phone item */}
              <div className="flex items-start space-x-4 p-5 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="p-3 bg-blue-50 text-primary rounded-xl">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                    {t('contact.hotline')}
                  </span>
                  <a href="tel:9328650500" className="text-lg font-bold text-slate-800 hover:text-primary transition-colors block mt-0.5">
                    +91 93286 50500
                  </a>
                </div>
              </div>

              {/* Service area item */}
              <div className="flex items-start space-x-4 p-5 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="p-3 bg-amber-50 text-[#F59E0B] rounded-xl">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                    {t('contact.serviceAreas')}
                  </span>
                  <span className="text-sm font-bold text-slate-800 block mt-1">
                    {t('map.states.gujarat.name')} • {t('map.states.maharashtra.name')} • {t('map.states.madhya_pradesh.name')} • {t('map.states.rajasthan.name')}
                  </span>
                </div>
              </div>

              {/* Email item */}
              <div className="flex items-start space-x-4 p-5 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                    {t('contact.email')}
                  </span>
                  <a href="mailto:info@worldexportbhc.com" className="text-sm font-bold text-slate-800 hover:text-emerald-600 transition-colors block mt-1">
                    info@worldexportbhc.com
                  </a>
                </div>
              </div>

            </div>

            {/* Google Map Placeholder */}
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-md h-56 bg-slate-900 flex items-center justify-center text-center p-6 group">
              {/* grid background */}
              <div className="absolute inset-0 opacity-[0.05] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />
              <div className="relative z-10 space-y-2">
                <MapPin className="h-8 w-8 text-amber-500 mx-auto animate-bounce" />
                <h4 className="text-white font-bold font-heading text-sm uppercase tracking-wider">
                  {t('contact.locatorTitle')}
                </h4>
                <p className="text-[10px] text-slate-400 max-w-xs mx-auto leading-relaxed">
                  {t('contact.locatorDesc')}
                </p>
              </div>
            </div>

          </div>

          {/* Right Column - Contact Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 shadow-xl p-8 relative">
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                        {t('contact.form.nameLabel')}
                      </label>
                      <Input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder={t('contact.form.namePlaceholder')}
                        className="bg-slate-50/50 border-slate-200 focus:bg-white text-slate-800 text-xs py-5"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                        {t('contact.form.phoneLabel')}
                      </label>
                      <Input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder={t('contact.form.phonePlaceholder')}
                        className="bg-slate-50/50 border-slate-200 focus:bg-white text-slate-800 text-xs py-5"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                      {t('contact.form.emailLabel')}
                    </label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder={t('contact.form.emailPlaceholder')}
                      className="bg-slate-50/50 border-slate-200 focus:bg-white text-slate-800 text-xs py-5"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                      {t('contact.form.projectLabel')}
                    </label>
                    <select
                      name="project"
                      required
                      value={formData.project}
                      onChange={handleInputChange}
                      className="flex h-10 w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3 py-2 text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary text-slate-700"
                    >
                      <option value="">{t('contact.form.projectPlaceholder')}</option>
                      {projectsData.map(p => (
                        <option key={p.id} value={p.title}>
                          {p.title} ({t(`projectShowcase.categories.${p.category}`)})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                      {t('contact.form.messageLabel')}
                    </label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={4}
                      placeholder={t('contact.form.messagePlaceholder')}
                      className="bg-slate-50/50 border-slate-200 focus:bg-white text-slate-800 text-xs"
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="default"
                    className="w-full uppercase font-bold text-xs tracking-widest py-6 group bg-[#0A2463] hover:bg-[#F59E0B] hover:text-[#0F172A] text-white transition-all duration-300"
                  >
                    {t('contact.form.submitBtn')}
                    <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center space-y-4"
                >
                  <div className="p-4 bg-emerald-50 text-emerald-600 rounded-full w-fit mx-auto border border-emerald-100">
                    <CheckCircle2 className="h-10 w-10" />
                  </div>
                  <h3 className="text-xl font-bold font-heading text-[#0A2463]">
                    {t('contact.form.successTitle')}
                  </h3>
                  <p className="text-slate-600 text-xs max-w-sm mx-auto leading-relaxed">
                    {t('contact.form.successDesc')
                      .replace('{name}', formData.name)
                      .replace('{project}', formData.project)
                      .replace('{phone}', formData.phone)}
                  </p>
                  <Button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: "", phone: "", email: "", project: "", message: "" });
                    }}
                    variant="outline"
                    className="px-6 text-xs uppercase font-bold tracking-wider border-slate-200 text-slate-600"
                  >
                    {t('contact.form.successBtn')}
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
