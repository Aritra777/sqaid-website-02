import { Link } from "react-router-dom";
import { useDocumentTitle } from "@/lib/use-document-title";
import PageHeader from "@/components/layout/PageHeader";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/motion/Reveal";
import { jobs } from "./jobs";
import styles from "./CareersList.module.css";

export default function CareersList() {
  useDocumentTitle("Careers");
  return (
    <>
      <PageHeader
        eyebrow="Careers"
        title={<>Build the future of <em>risk & compliance.</em></>}
        lede="SqAId is a small, senior team. We hire people who have lived the problem and want to fix it at the source. If you enjoy evidence over hype and want ownership from day one, we should talk."
      />
      <section className="section">
        <Container size="wide">
          <SectionHeading eyebrow="Open roles" title={<>Join us</>} lede="All roles are full-time, senior level. Remote-friendly where noted." />
          <div className={styles.grid}>
            {jobs.map((job, i) => (
              <Reveal key={job.id} delay={i * 0.03} className={styles.card}>
                <Link to={`/company/careers/${job.id}`} className={styles.link}>
                  <div className={styles.meta}>
                    <span className={styles.badge}>Job ID: {job.id.toUpperCase()}</span>
                    <span className={styles.date}>Posted {job.openingDate}</span>
                  </div>
                  <h3 className={styles.title}>{job.title}</h3>
                  <div className={styles.sub}>{job.location} • {job.type}</div>
                  <p className={styles.desc}>{job.description.slice(0, 180)}…</p>
                  <div className={styles.cta}>View role →</div>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
