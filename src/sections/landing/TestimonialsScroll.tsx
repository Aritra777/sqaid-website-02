import { motion } from "framer-motion";
import { fadeUp, inViewOnce } from "@/lib/motion";
import styles from "./TestimonialsScroll.module.css";

interface Testimonial {
  company: string;
  quote: string;
  name?: string;
  title?: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    company: "Global Tier-1 Bank",
    quote:
      "SqAId reduced our AML alert review time by 55%. Analysts now focus on genuine risk rather than clearing noise — it's transformed our compliance workflow.",
    name: "Chief Compliance Officer",
    title: "Tier-1 European Bank",
  },
  {
    company: "Regional Credit Union",
    quote:
      "We deployed SqAId's fraud detection in under three weeks. False positive rates dropped immediately, and our investigation queue shrank by nearly half.",
    name: "Head of Financial Crime",
    title: "North American Credit Union",
  },
  {
    company: "FinTech Payments Platform",
    quote:
      "The unified sanctions and trade surveillance view is genuinely new. We're catching cross-product patterns we simply couldn't see before — all in one platform.",
    name: "VP Risk & Compliance",
    title: "Global Payments FinTech",
  },
  {
    company: "Wealth Management Firm",
    quote:
      "Case Manager cut our SAR filing time from days to hours. The AI reasoning trail means regulators understand every decision we make, which builds real confidence.",
    name: "Director of Surveillance",
    title: "Leading Wealth Manager",
  },
  {
    company: "Asset Management Group",
    quote:
      "Argus gave us real-time visibility across all our trading books. We identified a suspicious pattern on day one that our legacy system had missed for months.",
    name: "Head of Compliance Technology",
    title: "Global Asset Manager",
  },
  {
    company: "Digital Bank",
    quote:
      "Standing up a full AML and fraud surveillance stack used to take 18 months. With SqAId we were live in six weeks — that speed matters enormously at our scale.",
    name: "CTO",
    title: "European Digital Bank",
  },
];

// Duplicate for seamless loop
const CARDS = [...TESTIMONIALS, ...TESTIMONIALS];

export default function TestimonialsScroll() {
  return (
    <section className={styles.section}>
      <div className="container container--wide">
        <motion.div
          className={styles.header}
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={inViewOnce}
        >
          <h2 className={styles.heading}>What our clients say</h2>
        </motion.div>
      </div>

      <div className={styles.track} aria-label="Client testimonials">
        <div className={styles.inner}>
          {CARDS.map((t, i) => (
            <article key={i} className={styles.card}>
              <p className={styles.company}>{t.company}</p>
              <blockquote className={styles.quote}>"{t.quote}"</blockquote>
              {(t.name || t.title) && (
                <footer className={styles.footer}>
                  {t.name && <span className={styles.name}>{t.name}</span>}
                  {t.title && <span className={styles.role}>{t.title}</span>}
                </footer>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
