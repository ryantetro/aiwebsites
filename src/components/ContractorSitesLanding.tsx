"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

// One‑file React component for a sharp, high‑converting landing page.
// Built for TailwindCSS (light, royal‑blue accent). Drop into a Next.js page or any React app.
// Sections: Hero • Credibility • Services • Process • Portfolio • Pricing • FAQs • CTA • Footer
// Professional websites for businesses of all types.

const features = [
  {
    title: "Mobile Optimized",
    desc: "With over 50% of internet traffic coming from cell phones, we make sure your site is fully mobile optimized.",
  },
  {
    title: "Stunning Designs",
    desc: "We use some of the world's most cutting-edge website designs, built by leading graphic designers.",
  },
  {
    title: "SEO Ready",
    desc: "We ensure that your website is set up to rank highly on Google and other search engines.",
  },
  {
    title: "Maximum Load Speed",
    desc: "We make sure your website visitors don't wait a millisecond longer than they have to.",
  },
  {
    title: "Cutting-edge Security",
    desc: "All our websites have the leading security features installed, including automated daily back-ups.",
  },
  {
    title: "1‑Day Build",
    desc: "From zero to live in 24 hours with AI‑assisted build + human polish.",
  },
];

const services = [
  {
    title: "Starter Landing Page",
    desc: "Clean 1‑page site: hero, services, testimonials, contact form.",
  },
  {
    title: "Business Website (3‑5 pages)",
    desc: "Home, About, Services, Gallery, Contact with maps + lead form.",
  },
  {
    title: "Brand Refresh",
    desc: "Logo touch‑up, color system, typography, and image direction.",
  },
];

const steps = [
  {
    n: 1,
    title: "Quick Call",
    desc: "10‑minute discovery: goals, services, photos, and contact info.",
  },
  {
    n: 2,
    title: "Build Day",
    desc: "Our engineers craft your site, polish the copy, and integrate your photos.",
  },
  {
    n: 3,
    title: "Launch & Handoff",
    desc: "Go live on your domain. Optional hosting + maintenance.",
  },
];

// Portfolio projects
const portfolio = [
  {
    name: "PostGame AI",
    tag: "AI Mental Performance Coach",
    url: "https://www.getpostgame.ai/",
    img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&q=80",
    featured: true,
    description:
      "AI-powered mental performance coaching designed specifically for athletes",
    highlights: [
      "Real-time AI chats & post-event support",
      "Auto-generated journal summaries",
      "Calendar integration & smart reminders",
      "End-to-end encryption & COPPA compliant",
    ],
  },
  {
    name: "The Hyper Chamber",
    tag: "Hyperbaric Therapy",
    url: "https://www.thehyperchamber.com/",
    img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=1200&q=80",
  },
  {
    name: "Jordanelle Aqua Park",
    tag: "Aquatic Recreation",
    url: "https://www.jordanelleaquapark.com/",
    img: "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=1200&q=80",
  },
  {
    name: "Arro Jet",
    tag: "Aviation Services",
    url: "https://arro-jet-website.vercel.app/",
    img: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1200&q=80",
  },
];

const faqs = [
  {
    q: "How fast can you launch?",
    a: "Most single‑page sites launch in 24 hours after we receive your content (logo, phone, service list, photos). Multi‑page sites are typically 48–72 hours.",
  },
  {
    q: "Do you host and manage the site?",
    a: "Yes. We can host, secure with SSL, handle domain, and include monthly updates for a flat fee. Or we can hand off the code if you prefer.",
  },
  {
    q: "What do you need from me?",
    a: "Business name, logo (if any), services, phone/email, address, 3–10 photos, and any testimonials. We can help gather assets if needed.",
  },
];

export default function ContractorSitesLanding() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    businessName: "",
    website: "",
    message: "",
  });
  const [fieldErrors, setFieldErrors] = useState<{
    website?: string;
  }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const handleSmoothScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string
  ) => {
    e.preventDefault();
    const element = document.querySelector(targetId);
    if (element) {
      const headerOffset = 80; // Account for sticky header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const validateUrl = (url: string): boolean => {
    if (!url.trim()) return true; // Empty is valid (optional field)

    // Allow URLs with or without protocol
    const urlPattern =
      /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/i;
    return urlPattern.test(url.trim());
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Validate URL field
    if (name === "website") {
      if (value.trim() && !validateUrl(value)) {
        setFieldErrors((prev) => ({
          ...prev,
          website:
            "Please enter a valid URL (e.g., example.com or https://example.com)",
        }));
      } else {
        setFieldErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors.website;
          return newErrors;
        });
      }
    }

    if (submitStatus !== "idle") {
      setSubmitStatus("idle");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate URL if provided
    if (formData.website.trim() && !validateUrl(formData.website)) {
      setFieldErrors({
        website:
          "Please enter a valid URL (e.g., example.com or https://example.com)",
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // Google Apps Script Web App URL - Replace with your own
      const GOOGLE_SCRIPT_URL =
        process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL ||
        "YOUR_GOOGLE_APPS_SCRIPT_URL_HERE";

      const formPayload = {
        name: formData.name,
        email: formData.email,
        businessName: formData.businessName,
        website: formData.website || "N/A",
        message: formData.message,
        timestamp: new Date().toISOString(),
      };

      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formPayload),
      });

      // With no-cors, we can't read the response, so assume success
      setSubmitStatus("success");
      setFormData({
        name: "",
        email: "",
        businessName: "",
        website: "",
        message: "",
      });
      setFieldErrors({});

      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus("idle");
      }, 5000);
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-white text-slate-900 [--accent:#2563eb] [--accent-2:#60a5fa] [--glow:0_0_40px_rgba(37,99,235,0.25)]">
      {/* Top Nav */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="sticky top-0 z-30 backdrop-blur supports-[backdrop-filter]:bg-white/80 border-b border-slate-200"
      >
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <motion.a
            href="#"
            className="flex items-center gap-3"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <Image
              src="/logo.png"
              alt="BuildFast Sites Logo"
              width={48}
              height={48}
              className="h-12 w-12 object-contain"
              priority
            />
            <span className="font-semibold tracking-tight">
              BuildFast Sites
            </span>
          </motion.a>
          <nav className="hidden md:flex items-center gap-8 text-sm text-slate-600">
            <motion.a
              href="#work"
              onClick={(e) => handleSmoothScroll(e, "#work")}
              className="hover:text-slate-900"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              Work
            </motion.a>
            <motion.a
              href="#services"
              onClick={(e) => handleSmoothScroll(e, "#services")}
              className="hover:text-slate-900"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              Services
            </motion.a>
            <motion.a
              href="#process"
              onClick={(e) => handleSmoothScroll(e, "#process")}
              className="hover:text-slate-900"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              Process
            </motion.a>
            <motion.a
              href="#pricing"
              onClick={(e) => handleSmoothScroll(e, "#pricing")}
              className="hover:text-slate-900"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              Pricing
            </motion.a>
            <motion.a
              href="#contact"
              onClick={(e) => handleSmoothScroll(e, "#contact")}
              className="rounded-xl bg-[var(--accent)] px-4 py-2 text-white shadow-[var(--glow)] hover:opacity-95"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 50px rgba(37,99,235,0.5)",
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              Get a Site
            </motion.a>
          </nav>
        </div>
      </motion.header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <motion.div
          className="absolute inset-0 -z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[36rem] w-[36rem] rounded-full blur-3xl opacity-30 bg-[radial-gradient(circle_at_center,var(--accent),transparent_60%)]" />
        </motion.div>
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28 grid md:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.h1
              className="text-4xl/tight md:text-5xl/tight font-semibold tracking-tight text-slate-900"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              A professional website that you'll love.
              <span className="bg-linear-to-r from-[var(--accent)] to-[var(--accent-2)] bg-clip-text text-transparent">
                {" "}
                Fast, mobile optimized, and SEO ready.
              </span>
            </motion.h1>
            <motion.p
              className="mt-5 text-slate-600 max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              We turn outdated or missing sites into clean, professional
              websites that win trust and bring in customers. Fast build. No
              fluff. Real results.
            </motion.p>
            <motion.div
              className="mt-8 flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <motion.a
                href="#contact"
                onClick={(e) => handleSmoothScroll(e, "#contact")}
                className="rounded-2xl bg-[var(--accent)] px-6 py-3 font-medium text-white shadow-[var(--glow)] hover:opacity-95"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 50px rgba(37,99,235,0.5)",
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                Get Started
              </motion.a>
              <motion.a
                href="#work"
                onClick={(e) => handleSmoothScroll(e, "#work")}
                className="rounded-2xl border border-slate-300 px-6 py-3 font-medium text-slate-700 hover:bg-slate-50"
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "rgb(248 250 252)",
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                See our work
              </motion.a>
            </motion.div>
            <motion.ul
              className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              {features.map((f, index) => (
                <motion.li
                  key={f.title}
                  className="rounded-xl border border-slate-200 bg-slate-50 p-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                >
                  <div className="text-slate-900 font-medium">{f.title}</div>
                  <div className="text-slate-600 text-sm mt-1">{f.desc}</div>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          >
            <motion.div
              className="rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Image
                src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1480&q=80"
                alt="Website mockup"
                width={1480}
                height={880}
                className="rounded-xl"
                priority
              />
            </motion.div>
            <motion.div
              className="absolute -bottom-6 -left-6 hidden md:block"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1.2 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="rounded-xl bg-white border border-slate-200 p-4 shadow-xl">
                <div className="text-xs text-slate-500">Avg. build time</div>
                <div className="text-lg font-semibold text-slate-900">
                  24 hours
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Credibility bar */}
      <motion.section
        className="py-10 border-y border-slate-200 bg-slate-50"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        <div className="mx-auto max-w-7xl px-6 flex flex-wrap items-center justify-center gap-8 text-slate-600 text-sm">
          {[
            "Fast builds",
            "Mobile optimized",
            "SEO ready",
            "Maximum load speed",
            "Cutting-edge security",
            "Stunning designs",
          ].map((text, index) => (
            <motion.span
              key={text}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {text}
            </motion.span>
          ))}
        </div>
      </motion.section>

      {/* Services */}
      <motion.section
        id="services"
        className="mx-auto max-w-7xl px-6 py-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
      >
        <div className="grid md:grid-cols-3 gap-6">
          {services.map((s, index) => (
            <motion.div
              key={s.title}
              className="group relative rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-8 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/5 to-[var(--accent-2)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Icon container with gradient background */}
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/10 to-[var(--accent-2)]/10 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300" />
                <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-[var(--accent)] to-[var(--accent-2)] shadow-lg group-hover:shadow-xl transition-all duration-300">
                  <Image
                    src="/logo.png"
                    alt="Service Icon"
                    width={32}
                    height={32}
                    className="h-8 w-8 object-contain brightness-0 invert"
                  />
                </div>
              </div>

              <h3 className="relative text-xl font-bold text-slate-900 group-hover:text-[var(--accent)] transition-colors duration-300">
                {s.title}
              </h3>
              <p className="relative mt-3 text-slate-600 leading-relaxed">
                {s.desc}
              </p>

              {/* Decorative accent line */}
              <div className="relative mt-6 h-1 w-12 bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Process */}
      <motion.section
        id="process"
        className="mx-auto max-w-7xl px-6 pb-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="rounded-3xl border border-slate-200 bg-linear-to-b from-slate-50 to-white p-8 shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2
            className="text-2xl font-semibold text-slate-900"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Simple 3‑step process
          </motion.h2>
          <div className="mt-6 grid md:grid-cols-3 gap-6">
            {steps.map((s, index) => (
              <motion.div
                key={s.n}
                className="group relative rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-8 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/5 to-[var(--accent-2)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Number badge with enhanced styling */}
                <div className="relative mb-6">
                  <motion.div
                    className="relative inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--accent)] to-[var(--accent-2)] text-white font-bold text-lg shadow-lg group-hover:shadow-xl transition-all duration-300"
                    whileHover={{
                      rotate: [0, -5, 5, -5, 0],
                      scale: 1.1,
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <span className="relative z-10">{s.n}</span>
                    <div className="absolute inset-0 bg-white/20 rounded-2xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </motion.div>
                  {/* Decorative circle behind number */}
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-[var(--accent)]/10 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <h3 className="relative text-xl font-bold text-slate-900 group-hover:text-[var(--accent)] transition-colors duration-300">
                  {s.title}
                </h3>
                <p className="relative mt-3 text-slate-600 leading-relaxed">
                  {s.desc}
                </p>

                {/* Decorative accent line */}
                <div className="relative mt-6 h-1 w-12 bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.section>

      {/* Portfolio */}
      <motion.section
        id="work"
        className="mx-auto max-w-7xl px-6 py-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="flex items-end justify-between mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl md:text-3xl font-semibold text-slate-900">
            Recent Work
          </h2>
          <motion.a
            href="#contact"
            onClick={(e) => handleSmoothScroll(e, "#contact")}
            className="text-sm text-slate-600 hover:text-slate-900"
            whileHover={{ x: 5 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            Need something similar? →
          </motion.a>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolio.map((p, index) => {
            if (p.featured) {
              return (
                <motion.a
                  key={p.name}
                  href={p.url}
                  target={p.url.startsWith("http") ? "_blank" : undefined}
                  rel={
                    p.url.startsWith("http") ? "noopener noreferrer" : undefined
                  }
                  className="group col-span-1 sm:col-span-2 lg:col-span-3 rounded-2xl overflow-hidden border-2 border-slate-300 bg-gradient-to-br from-white to-slate-50 shadow-lg hover:shadow-xl transition-all"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.01 }}
                >
                  <div className="grid md:grid-cols-2 gap-0">
                    <div className="relative aspect-[16/10] md:aspect-auto md:h-full overflow-hidden bg-slate-900 rounded-l-2xl">
                      {/* Browser chrome simulation */}
                      <div className="absolute top-0 left-0 right-0 z-10 bg-slate-800 border-b border-slate-700 px-3 py-2 flex items-center gap-2">
                        <div className="flex gap-1.5">
                          <div className="w-3 h-3 rounded-full bg-red-500"></div>
                          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                          <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        </div>
                        <div className="flex-1 mx-3 bg-slate-900 rounded px-3 py-1.5 text-xs text-slate-400 font-mono flex items-center gap-2">
                          <svg
                            className="w-3 h-3"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                            />
                          </svg>
                          <span className="truncate">
                            {p.url.replace(/^https?:\/\//, "")}
                          </span>
                        </div>
                      </div>
                      {/* Website Preview */}
                      <div className="absolute inset-0 pt-10 overflow-hidden bg-slate-900">
                        <iframe
                          src={p.url}
                          className="absolute inset-0 w-full h-full border-0"
                          style={{
                            width: "200%",
                            height: "200%",
                            transform: "scale(0.5)",
                            transformOrigin: "top left",
                          }}
                          loading="lazy"
                          title={`${p.name} Preview`}
                          sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        />
                      </div>
                      <div className="absolute top-16 left-4 z-20">
                        <div className="rounded-lg bg-white/90 backdrop-blur-sm px-3 py-1.5 text-xs font-semibold text-[var(--accent)] border border-[var(--accent)]/20">
                          Featured Project
                        </div>
                      </div>
                    </div>
                    <div className="p-6 md:p-8 flex flex-col justify-center">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                          {p.tag}
                        </div>
                      </div>
                      <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
                        {p.name}
                      </h3>
                      <p className="text-slate-600 mb-4 text-sm md:text-base">
                        {p.description}
                      </p>
                      {p.highlights && (
                        <div className="grid grid-cols-2 gap-2 mb-4">
                          {p.highlights.slice(0, 4).map((highlight, i) => (
                            <motion.div
                              key={i}
                              className="flex items-start gap-2 text-xs text-slate-600"
                              initial={{ opacity: 0, x: -10 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{
                                duration: 0.3,
                                delay: 0.2 + i * 0.1,
                              }}
                            >
                              <svg
                                className="w-4 h-4 text-[var(--accent)] mt-0.5 flex-shrink-0"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                              <span>{highlight}</span>
                            </motion.div>
                          ))}
                        </div>
                      )}
                      <div className="flex items-center gap-2 text-sm font-medium text-[var(--accent)] group-hover:gap-3 transition-all">
                        <span>View Project</span>
                        <svg
                          className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </motion.a>
              );
            }
            return (
              <motion.a
                key={p.name}
                href={p.url}
                target={p.url.startsWith("http") ? "_blank" : undefined}
                rel={
                  p.url.startsWith("http") ? "noopener noreferrer" : undefined
                }
                className="group rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="aspect-[16/10] overflow-hidden relative bg-slate-900">
                  {/* Browser chrome for regular items */}
                  <div className="absolute top-0 left-0 right-0 z-10 bg-slate-800 border-b border-slate-700 px-2 py-1.5 flex items-center gap-1.5">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 rounded-full bg-red-500"></div>
                      <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    </div>
                    <div className="flex-1 mx-2 bg-slate-900 rounded px-2 py-1 text-[10px] text-slate-400 font-mono truncate">
                      {p.url.replace(/^https?:\/\//, "").substring(0, 25)}...
                    </div>
                  </div>
                  {/* Website Preview */}
                  <div className="absolute inset-0 pt-8 overflow-hidden bg-slate-900">
                    <iframe
                      src={p.url}
                      className="absolute inset-0 w-full h-full border-0"
                      style={{
                        width: "200%",
                        height: "200%",
                        transform: "scale(0.5)",
                        transformOrigin: "top left",
                      }}
                      loading="lazy"
                      title={`${p.name} Preview`}
                      sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    />
                  </div>
                </div>
                <div className="p-4 relative z-10 bg-white">
                  <div className="text-sm text-slate-500">{p.tag}</div>
                  <div className="font-medium text-slate-900">{p.name}</div>
                </div>
              </motion.a>
            );
          })}
        </div>
      </motion.section>

      {/* Pricing */}
      <motion.section
        id="pricing"
        className="mx-auto max-w-7xl px-6 pb-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h2
          className="text-2xl md:text-3xl font-semibold text-slate-900"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Straightforward pricing
        </motion.h2>
        <motion.p
          className="mt-2 text-slate-600 max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          50% to start, 50% on launch. Need something custom? We'll quote it
          fast.
        </motion.p>
        <div className="mt-8 grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {[
            {
              title: "Starter",
              price: "$499",
              features: [
                "1‑page site (hero, services, contact)",
                "Mobile‑first + basic SEO",
                "Contact form + Map",
              ],
              popular: false,
            },
            {
              title: "Pro",
              price: "$999",
              features: [
                "3–5 pages (Home, About, Services, Gallery, Contact)",
                "Copy polish + stock images (if needed)",
                "Analytics + basic SEO",
              ],
              popular: true,
            },
          ].map((plan, index) => (
            <motion.div
              key={plan.title}
              className={`rounded-2xl ${
                plan.popular
                  ? "border-2 border-[var(--accent)] shadow-[var(--glow)]"
                  : "border border-slate-200"
              } bg-white p-6 shadow-sm`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              {plan.popular && (
                <motion.div
                  className="inline-block rounded-full border border-[var(--accent)] px-2 py-1 text-xs text-[var(--accent)]"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", delay: 0.3 }}
                >
                  Most popular
                </motion.div>
              )}
              <h3
                className={`font-semibold text-slate-900 ${
                  plan.popular ? "mt-2" : ""
                }`}
              >
                {plan.title}
              </h3>
              <div className="mt-1 text-3xl font-bold text-slate-900">
                {plan.price}
              </div>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                {plan.features.map((feature, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.4 + i * 0.1 }}
                  >
                    {feature}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
        <motion.div
          className="mt-6 grid md:grid-cols-2 gap-6 text-sm text-slate-600 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {[
            { label: "Hosting & SSL:", value: "$35/mo" },
            { label: "Maintenance (edits & updates):", value: "$99/mo" },
          ].map((item, index) => (
            <motion.div
              key={item.label}
              className="rounded-xl border border-slate-200 bg-white p-4"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              {item.label}{" "}
              <span className="font-medium text-slate-900">{item.value}</span>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* FAQs */}
      <motion.section
        className="mx-auto max-w-7xl px-6 pb-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="rounded-3xl border border-slate-200 bg-slate-50 p-8 shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2
            className="text-2xl font-semibold text-slate-900"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            FAQs
          </motion.h2>
          <div className="mt-6 grid md:grid-cols-3 gap-6">
            {faqs.map((f, index) => (
              <motion.div
                key={f.q}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <div className="font-medium text-slate-900">{f.q}</div>
                <div className="mt-2 text-slate-600 text-sm">{f.a}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.section>

      {/* CTA */}
      <motion.section
        id="contact"
        className="mx-auto max-w-7xl px-6 py-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="rounded-3xl border border-slate-200 bg-linear-to-br from-[var(--accent)] to-[var(--accent-2)] p-8 text-slate-950 shadow-[var(--glow)]"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          whileHover={{ scale: 1.01 }}
        >
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl md:text-3xl font-semibold">
                Ready to get started?
              </h2>
              <p className="mt-2 text-slate-900/80">
                Send us your details and we'll get back to you quickly with a
                quote and next steps.
              </p>
            </motion.div>
            <motion.form
              onSubmit={handleSubmit}
              className="bg-white/90 rounded-2xl p-4 text-slate-900"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="rounded-xl border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent transition-all"
                  placeholder="Name"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="rounded-xl border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent transition-all"
                  placeholder="Email"
                />
                <input
                  type="text"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleInputChange}
                  required
                  className="rounded-xl border border-slate-300 px-3 py-2 sm:col-span-2 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent transition-all"
                  placeholder="Business name"
                />
                <div className="sm:col-span-2">
                  <input
                    type="text"
                    name="website"
                    value={formData.website}
                    onChange={handleInputChange}
                    className={`w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent transition-all ${
                      fieldErrors.website
                        ? "border-red-300 bg-red-50 focus:ring-red-500 focus:bg-white"
                        : "border-slate-300"
                    }`}
                    placeholder="Website (optional) - e.g., example.com"
                  />
                  {fieldErrors.website && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-1.5 flex items-start gap-1.5 text-sm text-red-600"
                    >
                      <svg
                        className="w-4 h-4 mt-0.5 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span>{fieldErrors.website}</span>
                    </motion.div>
                  )}
                  {!fieldErrors.website && formData.website && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-1.5 flex items-center gap-1.5 text-xs text-slate-500"
                    >
                      <svg
                        className="w-3.5 h-3.5 text-green-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span>URL format looks good</span>
                    </motion.div>
                  )}
                </div>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={3}
                  className="rounded-xl border border-slate-300 px-3 py-2 sm:col-span-2 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent transition-all resize-none"
                  placeholder="What do you want on the site?"
                />
              </div>
              {submitStatus === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-3 rounded-xl bg-green-50 border border-green-200 px-4 py-2 text-sm text-green-800"
                >
                  ✓ Thank you! We'll be in touch soon.
                </motion.div>
              )}
              {submitStatus === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-3 rounded-xl bg-red-50 border border-red-200 px-4 py-2 text-sm text-red-800"
                >
                  ✗ Something went wrong. Please try again or contact us
                  directly.
                </motion.div>
              )}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="mt-3 w-full rounded-xl bg-slate-900 px-4 py-2 text-white hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                whileHover={
                  !isSubmitting
                    ? { scale: 1.02, backgroundColor: "rgb(15 23 42)" }
                    : {}
                }
                whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                transition={{ type: "spring", stiffness: 400 }}
              >
                {isSubmitting ? "Submitting..." : "Get Started"}
              </motion.button>
            </motion.form>
          </div>
        </motion.div>
      </motion.section>

      {/* Footer */}
      <motion.footer
        className="border-t border-slate-200 bg-slate-50"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="mx-auto max-w-7xl px-6 py-8 text-sm text-slate-600 flex flex-col md:flex-row items-center justify-between gap-4">
          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <Image
                src="/logo.png"
                alt="BuildFast Sites Logo"
                width={24}
                height={24}
                className="h-6 w-6 object-contain"
              />
            </motion.div>
            <span>© {new Date().getFullYear()} BuildFast Sites</span>
          </motion.div>
          <motion.div
            className="flex items-center gap-6"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <motion.a
              href="#pricing"
              onClick={(e) => handleSmoothScroll(e, "#pricing")}
              className="hover:text-slate-900"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              Pricing
            </motion.a>
            <motion.a
              href="#work"
              onClick={(e) => handleSmoothScroll(e, "#work")}
              className="hover:text-slate-900"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              Portfolio
            </motion.a>
            <motion.a
              href="#contact"
              onClick={(e) => handleSmoothScroll(e, "#contact")}
              className="hover:text-slate-900"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              Contact
            </motion.a>
          </motion.div>
        </div>
      </motion.footer>
    </main>
  );
}
