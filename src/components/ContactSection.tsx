import React from 'react';
import { motion } from 'framer-motion';
import { LP_CTA_URL } from '../utils/constants';

export const ContactSection: React.FC = () => {
    return (
        <section id="contato" className="py-24 bg-[#0B0D17] relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-brand-lightBlue/5 rounded-full blur-[120px] -translate-y-1/2 -translate-x-1/2 pointer-events-none" />
            <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-brand-gold/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

            <div className="container max-w-[1000px] mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-serif text-white mb-4">
                        Entre em <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-gold to-[#E2C792]">Contato</span>
                    </h2>
                    <div className="w-16 h-[1px] bg-brand-gold mx-auto opacity-50 mb-6"></div>
                    <p className="text-white/70 max-w-2xl mx-auto text-lg font-light">
                        Nossa equipe de especialistas está pronta para tirar todas as suas dúvidas sobre nossas formações exclusivas.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {/* WhatsApp Card */}
                    <motion.a
                        href={LP_CTA_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="group flex flex-col items-center justify-center p-10 bg-white/[0.02] border border-white/5 rounded-2xl hover:bg-white/[0.04] hover:border-[#25D366]/30 transition-all duration-500"
                    >
                        <div className="w-20 h-20 bg-[#25D366]/10 rounded-full flex items-center justify-center mb-6 text-[#25D366] group-hover:scale-110 transition-transform duration-500">
                            <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Atendimento Imediato</h3>
                        <p className="text-white/60 text-center mb-6">Fale com nossa equipe agora mesmo pelo WhatsApp.</p>
                        <span className="text-[#25D366] font-bold uppercase tracking-wider text-sm group-hover:underline underline-offset-4">
                            Chamar no WhatsApp
                        </span>
                    </motion.a>

                    {/* Email Card */}
                    <motion.a
                        href="mailto:contato@endostart.com.br"
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="group flex flex-col items-center justify-center p-10 bg-white/[0.02] border border-white/5 rounded-2xl hover:bg-white/[0.04] hover:border-brand-gold/30 transition-all duration-500"
                    >
                        <div className="w-20 h-20 bg-brand-gold/10 rounded-full flex items-center justify-center mb-6 text-brand-gold group-hover:scale-110 transition-transform duration-500">
                            <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">E-mail Corporativo</h3>
                        <p className="text-white/60 text-center mb-6">Para parcerias, propostas e dúvidas institucionais.</p>
                        <span className="text-brand-gold font-bold uppercase tracking-wider text-sm group-hover:underline underline-offset-4">
                            contato@endostart.com.br
                        </span>
                    </motion.a>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;
