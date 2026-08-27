import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDocumentTitle } from "@/lib/use-document-title";
import PageHeader from "@/components/layout/PageHeader";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Reveal from "@/components/motion/Reveal";
import { jobs } from "./jobs";
import styles from "./Application.module.css";

export default function Application() {
  const { id } = useParams();
  const navigate = useNavigate();
  const job = jobs.find(j => j.id === id);
  const [submitted, setSubmitted] = useState(false);

  useDocumentTitle(job ? `Apply — ${job.title}` : "Apply");

  if (!job) {
    return <Container size="wide"><p>Job not found</p></Container>;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => navigate("/company/careers"), 2000);
  };

  return (
    <>
      <PageHeader
        eyebrow="Apply"
        title={<>{job.title}</>}
        lede={`Job ID: ${job.id.toUpperCase()} • ${job.location}`}
      />
      <section className="section">
        <Container size="wide">
          <div className={styles.grid}>
            <Reveal className={styles.formCard}>
              <h2>Application</h2>
              {!submitted ? (
                <form onSubmit={handleSubmit} className={styles.form}>
                  <div className={styles.field}>
                    <label>Full name</label>
                    <input required placeholder="Your name" />
                  </div>
                  <div className={styles.field}>
                    <label>Email</label>
                    <input type="email" required placeholder="you@company.com" />
                  </div>
                  <div className={styles.field}>
                    <label>Location</label>
                    <input required placeholder="City, Country" />
                  </div>
                  <div className={styles.field}>
                    <label>LinkedIn / Portfolio</label>
                    <input placeholder="https://" />
                  </div>
                  <div className={styles.field}>
                    <label>Resume</label>
                    <input type="file" accept=".pdf,.doc,.docx" required />
                  </div>
                  <div className={styles.field}>
                    <label>Cover letter</label>
                    <textarea rows={6} placeholder="Tell us why you're a fit..." required />
                  </div>
                  <Button type="submit" size="lg">Submit application</Button>
                </form>
              ) : (
                <div className={styles.thanks}>
                  <p>Thanks for applying to {job.title}.</p>
                  <p>We’ll review your application and be in touch.</p>
                </div>
              )}
            </Reveal>
            <Reveal className={styles.side}>
              <div className={styles.summary}>
                <h3>{job.title}</h3>
                <p>{job.description}</p>
                <div className={styles.meta}>
                  <div><strong>Job ID</strong><span>{job.id.toUpperCase()}</span></div>
                  <div><strong>Posted</strong><span>{job.openingDate}</span></div>
                  <div><strong>Location</strong><span>{job.location}</span></div>
                  <div><strong>Type</strong><span>{job.type}</span></div>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
