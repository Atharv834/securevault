import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const faqItems = [
  {
    question: "Does SecureVault require an internet connection?",
    answer: "No. SecureVault is 100% offline. There are no sync features, no remote tracking, and no dependency on external servers. Your files never leave your local environment."
  },
  {
    question: "What happens if I lose my password?",
    answer: "Because SecureVault adheres to a Zero-Knowledge architecture, we do not store your password. If you lose it, the .vault files cannot be recovered. We recommend using a physical backup for your master password."
  },
  {
    question: "How does the dual-layer encryption work?",
    answer: "SecureVault first encrypts your files using AES-256-GCM. The resulting ciphertext is then wrapped in a second layer using ChaCha20-Poly1305. This ensures that even if a mathematical weakness is found in one algorithm, your data remains shielded by the other."
  },
  {
    question: "Is the source code available for audit?",
    answer: "Yes, we believe security requires transparency. The core cryptographic implementation is open source and available for independent security reviews and audits."
  },
  {
    question: "Can I use .vault files on different machines?",
    answer: "Absolutely. .vault files are completely portable. As long as you have the SecureVault app and your master password, you can decrypt your data on any supported Windows or Linux machine."
  }
];

const FAQItem = ({ item, index }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group"
        >
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "w-full flex items-center justify-between p-6 rounded-2xl glass border border-white/5 transition-all text-left",
                    isOpen ? "bg-white/5 border-accent-primary/20" : "hover:bg-white/[0.02]"
                )}
            >
                <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-lg bg-obsidian-900 border border-white/10 flex items-center justify-center text-accent-primary group-hover:border-accent-primary/30 transition-colors">
                        <HelpCircle className="w-4 h-4" />
                    </div>
                    <span className="text-lg font-semibold text-white group-hover:text-accent-primary transition-colors">{item.question}</span>
                </div>
                <ChevronDown className={cn("w-5 h-5 text-zinc-500 transition-transform duration-300", isOpen && "rotate-180 text-accent-primary")} />
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="p-8 text-zinc-400 leading-relaxed text-lg border-x border-b border-white/5 mx-2 rounded-b-2xl bg-white/[0.01]">
                            {item.answer}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

const FAQ = () => {
    return (
        <section className="py-24 px-6 relative z-10" id="faq">
            <div className="container max-w-4xl mx-auto">
                <div className="text-center mb-16 space-y-4">
                    <p className="text-accent-primary font-mono text-sm tracking-widest uppercase">Answers & Security</p>
                    <h2 className="text-4xl font-bold text-white tracking-tight">Frequently Asked Questions</h2>
                    <p className="text-zinc-500 max-w-2xl mx-auto">
                        Everything you need to know about SecureVault's offline architecture and security guarantees.
                    </p>
                </div>

                <div className="space-y-4">
                    {faqItems.map((item, i) => (
                        <FAQItem key={i} item={item} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
