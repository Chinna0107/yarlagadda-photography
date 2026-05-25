import React, { useState } from 'react';
import { Send, Phone, MessageSquare, MapPin, Mail, Clock, CheckCircle, Loader } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Booking = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    eventType: '',
    date: '',
    location: '',
    message: ''
  });

  const [status, setStatus] = useState('idle'); // idle | sending | success

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('sending');

    // Format a highly professional, bolded WhatsApp inquiry message
    const messageText = `Hello Yarlagadda Photography! I would like to make a booking inquiry. Here are my details:\n\n` +
      `✨ *Name*: ${formData.name}\n` +
      `📞 *Phone*: ${formData.phone}\n` +
      `📅 *Event Profile*: ${formData.eventType}\n` +
      `📆 *Event Date*: ${formData.date}\n` +
      `📍 *Destination / Venue*: ${formData.location}\n` +
      `✉️ *My Vision*: ${formData.message}\n\n` +
      `Please let me know if my date is available! Thank you.`;

    const encodedText = encodeURIComponent(messageText);
    const whatsappUrl = `https://wa.me/919849819634?text=${encodedText}`;

    // Simulate high-end processing delay, then launch WhatsApp redirection in a new tab
    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
      setStatus('success');
      // Reset form fields
      setFormData({
        name: '',
        phone: '',
        eventType: '',
        date: '',
        location: '',
        message: ''
      });
    }, 1500);
  };

  return (
    <section id="booking" className="relative w-full py-24 lg:py-32 bg-matte-black border-t border-white/5">
      
      {/* Background ambient gold halo */}
      <div className="absolute bottom-10 right-10 w-[350px] h-[350px] rounded-full bg-gold/5 blur-[100px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Asymmetric Columns Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* LEFT PANEL: BRAND CONTACT & WHATSAPP DOCK */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <div className="text-left">
              <span className="text-[10px] tracking-[0.4em] text-silver/60 uppercase font-light">
                Securing Your Date
              </span>
              <h2 className="text-4xl md:text-5xl text-soft-white font-serif tracking-wide mt-2">
                Inquire & Book
              </h2>
              <div className="w-12 h-[1px] bg-gold mt-4" />
            </div>

            <p className="text-xs md:text-sm text-silver/70 font-light leading-relaxed">
              Our calendar fills extremely quickly, often up to 12 months in advance. Get in touch today to check date availability, obtain full pricing details, or schedule a coffee alignment at our private editorial studio.
            </p>

            {/* Direct Contact Metrics Rows */}
            <div className="flex flex-col gap-6 mt-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-charcoal border border-white/5 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 text-gold" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[10px] text-silver/50 tracking-wider uppercase">Direct Hotline</span>
                  <span className="text-xs text-soft-white font-medium mt-0.5">+91 98498 19634</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-charcoal border border-white/5 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 text-gold" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[10px] text-silver/50 tracking-wider uppercase">Email Desk</span>
                  <span className="text-xs text-soft-white font-medium mt-0.5">hello@yarlagaddaphotography.com</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-charcoal border border-white/5 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-gold" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[10px] text-silver/50 tracking-wider uppercase">Private Studio</span>
                  <span className="text-xs text-soft-white font-medium mt-0.5">SVN Colony / Udyoga Nagar, Guntur, India</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-charcoal border border-white/5 flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4 text-gold" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[10px] text-silver/50 tracking-wider uppercase">Availability</span>
                  <span className="text-xs text-soft-white font-medium mt-0.5">Mon - Sat | 10:00 AM - 07:00 PM IST</span>
                </div>
              </div>
            </div>

            {/* WHATSAPP FLOATING QUICK CONTACT PANEL */}
            <div className="mt-6 pt-6 border-t border-white/5 text-left">
              <a 
                href="https://wa.me/919849819634?text=Hello%20Yarlagadda%20Photography,%20I%20would%20like%20to%20inquire%20about%20your%20photography%20packages%20and%20date%20availability."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 bg-charcoal/80 glassmorphism-gold rounded-full border border-gold/20 text-gold hover:text-soft-white hover:bg-gold/15 transition-all duration-500 shadow-[0_0_20px_rgba(237,27,36,0.05)] hover:shadow-[0_0_25px_rgba(237,27,36,0.2)] group btn-luxury cursor-pointer"
              >
                {/* Soft golden pulsing dot */}
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-gold"></span>
                </span>
                <MessageSquare className="w-4 h-4" />
                <span className="text-xs font-semibold tracking-widest uppercase">Quick Chat on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* RIGHT PANEL: LUXURY INQUIRY FORM */}
          <div className="lg:col-span-7 w-full relative">
            <div className="glassmorphism p-8 md:p-10 rounded-2xl border border-white/5 shadow-2xl relative overflow-hidden min-h-[560px] flex flex-col justify-center">
              
              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  /* Form Submission SUCCESS Overlay */
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex flex-col items-center text-center py-12 px-6"
                  >
                    <CheckCircle className="w-16 h-16 text-gold mb-6 animate-pulse" />
                    <h3 className="text-3xl text-soft-white font-serif tracking-wide">
                      Inquiry Received
                    </h3>
                    <p className="text-xs md:text-sm text-silver/80 font-light mt-4 leading-relaxed max-w-sm">
                      Thank you for choosing Yarlagadda Photography. Your dates have been flagged for calendar validation. Our studio coordinator will reach out to you via call or email within the next 12 hours.
                    </p>
                    <button
                      onClick={() => setStatus('idle')}
                      className="mt-8 px-6 py-2.5 border border-gold text-gold hover:text-soft-white hover:bg-gold/10 rounded-full text-[10px] tracking-widest uppercase transition-colors duration-300 cursor-pointer"
                    >
                      New Inquiry
                    </button>
                  </motion.div>
                ) : (
                  /* Core INQUIRY FORM Element */
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-6 text-left"
                  >
                    <h3 className="text-2xl text-soft-white font-serif tracking-wide border-b border-white/5 pb-4">
                      Share Your Story
                    </h3>

                    {/* Inputs Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      
                      {/* Name input */}
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="name" className="text-[10px] tracking-widest uppercase text-silver/60">Full Name</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          disabled={status === 'sending'}
                          placeholder="e.g., Arjun Rao"
                          className="w-full bg-charcoal/50 border border-white/10 rounded-lg px-4 py-3 text-xs text-soft-white focus:outline-none focus:border-gold/60 focus:bg-matte-black transition-all duration-300"
                        />
                      </div>

                      {/* Phone input */}
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="phone" className="text-[10px] tracking-widest uppercase text-silver/60">Phone Number</label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          disabled={status === 'sending'}
                          placeholder="e.g., +91 98765 43210"
                          className="w-full bg-charcoal/50 border border-white/10 rounded-lg px-4 py-3 text-xs text-soft-white focus:outline-none focus:border-gold/60 focus:bg-matte-black transition-all duration-300"
                        />
                      </div>

                      {/* Event Type Dropdown */}
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="eventType" className="text-[10px] tracking-widest uppercase text-silver/60">Event Profile</label>
                        <select
                          id="eventType"
                          name="eventType"
                          value={formData.eventType}
                          onChange={handleChange}
                          required
                          disabled={status === 'sending'}
                          className="w-full bg-charcoal/50 border border-white/10 rounded-lg px-4 py-3 text-xs text-soft-white focus:outline-none focus:border-gold/60 focus:bg-matte-black transition-all duration-300 cursor-pointer appearance-none"
                        >
                          <option value="" disabled className="bg-charcoal text-silver">Select Event Type</option>
                          <option value="Wedding" className="bg-charcoal text-soft-white">Wedding Celebration</option>
                          <option value="Engagement" className="bg-charcoal text-soft-white">Engagement Shoot</option>
                          <option value="Candid" className="bg-charcoal text-soft-white">Candid Photography</option>
                          <option value="Outdoor" className="bg-charcoal text-soft-white">Outdoor Shoot</option>
                          <option value="HalfSaree" className="bg-charcoal text-soft-white">Half Saree Ceremony</option>
                          <option value="Dhoti" className="bg-charcoal text-soft-white">Dhoti Ceremony</option>
                          <option value="Housewarming" className="bg-charcoal text-soft-white">House Warming Event</option>
                          <option value="Maternity" className="bg-charcoal text-soft-white">Maternity Shoot</option>
                          <option value="Newborn" className="bg-charcoal text-soft-white">Newborn Baby Shoot</option>
                          <option value="Other" className="bg-charcoal text-soft-white">Other / Custom Vision</option>
                        </select>
                      </div>

                      {/* Date selection */}
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="date" className="text-[10px] tracking-widest uppercase text-silver/60">Event Date</label>
                        <input
                          type="date"
                          id="date"
                          name="date"
                          value={formData.date}
                          onChange={handleChange}
                          required
                          disabled={status === 'sending'}
                          className="w-full bg-charcoal/50 border border-white/10 rounded-lg px-4 py-3 text-xs text-soft-white focus:outline-none focus:border-gold/60 focus:bg-matte-black transition-all duration-300 cursor-pointer"
                        />
                      </div>

                    </div>

                    {/* Location input */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="location" className="text-[10px] tracking-widest uppercase text-silver/60">Destination / Venue</label>
                      <input
                        type="text"
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        required
                        disabled={status === 'sending'}
                        placeholder="e.g., Falaknuma Palace, Hyderabad"
                        className="w-full bg-charcoal/50 border border-white/10 rounded-lg px-4 py-3 text-xs text-soft-white focus:outline-none focus:border-gold/60 focus:bg-matte-black transition-all duration-300"
                      />
                    </div>

                    {/* Message description textarea */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="message" className="text-[10px] tracking-widest uppercase text-silver/60">Share Your Vision</label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        disabled={status === 'sending'}
                        rows="4"
                        placeholder="Tell us about the timeline, color theme, and specific moments you wish to capture..."
                        className="w-full bg-charcoal/50 border border-white/10 rounded-lg px-4 py-3 text-xs text-soft-white focus:outline-none focus:border-gold/60 focus:bg-matte-black transition-all duration-300 resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={status === 'sending'}
                      className="mt-4 px-8 py-4 bg-gold hover:bg-gold-hover disabled:bg-gold/40 text-matte-black disabled:text-matte-black/50 text-xs font-semibold tracking-widest uppercase rounded-full shadow-lg hover:shadow-[0_0_25px_rgba(237,27,36,0.45)] transition-all duration-500 flex items-center justify-center gap-2 relative overflow-hidden btn-luxury cursor-pointer"
                    >
                      {status === 'sending' ? (
                        <>
                          <Loader className="w-4 h-4 animate-spin text-matte-black" />
                          <span>Securing Details...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          <span>Submit Inquiry</span>
                        </>
                      )}
                    </button>

                  </motion.form>
                )}
              </AnimatePresence>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Booking;
