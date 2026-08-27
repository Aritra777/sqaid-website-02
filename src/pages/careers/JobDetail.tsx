import { Link, useParams } from "react-router-dom";
import { useDocumentTitle } from "@/lib/use-document-title";
import PageHeader from "@/components/layout/PageHeader";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Reveal from "@/components/motion/Reveal";
import { jobs } from "./jobs";
import styles from "./JobDetail.module.css";

export default function JobDetail() {
  const { id } = useParams();
  const job = jobs.find(j => j.id === id);

  if (!job) {
    useDocumentTitle("Job not found");
    return (
      <Container size="wide">
        <p>Job not found</p>
      </Container>
    );
  }

  useDocumentTitle(`${job.title} — Careers`);

  return (
    <>
      <PageHeader
        eyebrow="Careers"
        title={<>{job.title}</>}
        lede={`${job.location} • ${job.type} • Job ID: ${job.id.toUpperCase()}`}
      >
        <Button to={`/company/careers/apply/${job.id}`} size="lg">
          Apply now →
        </Button>
      </PageHeader>

      <section className="section">
        <Container size="wide">
          <div className={styles.grid}>
            <Reveal className={styles.main}>
              <div className={styles.metaRow}>
                <span>Posted {job.openingDate}</span>
                <span>•</span>
                <span>Job ID: {job.id.toUpperCase()}</span>
              </div>
              <h2 className={styles.h2}>Overview</h2>
              <p className={styles.lead}>{job.description}</p>

              <h3>Responsibilities</h3>
              <ul className={styles.list}>
                {job.responsibilities.map(r => <li key={r}>{r}</li>)}
              </ul>

              <h3>Requirements</h3>
              <div className={styles.req}>
                <p><strong>Experience:</strong> {job.requirements.experience}</p>
                <p><strong>Education:</strong> {job.requirements.education}</p>
                <h4>Technical</h4>
                <ul className={styles.list}>
                  {job.requirements.technical.map(t => <li key={t}>{t}</li>)}
                </ul>
                {job.requirements.niceToHave && (
                  <>
                    <h4>Nice to have</h4>
                    <ul className={styles.list}>
                      {job.requirements.niceToHave.map(t => <li key={t}>{t}</li>)}
                    </ul>
                  </>
                )}
              </div>
            </Reveal>

            <Reveal className={styles.side}>
              <div className={styles.sideCard}>
                <h4>Role summary</h4>
                <p>{job.description}</p>
                <div className={styles.key}>
                  <div><strong>Location</strong><span>{job.location}</span></div>
                  <div><strong>Type</strong><span>{job.type}</span></div>
                  <div><strong>Posted</strong><span>{job.openingDate}</span></div>
                </div>
                <Link to={`/company/careers/apply/${job.id}`} className={styles.applyBtn}>
                  Apply now
                </Link>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
