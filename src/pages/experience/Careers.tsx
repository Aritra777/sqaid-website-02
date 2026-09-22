import { useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import Button from "@/components/ui/Button";
import { jobs, type Job } from "@/pages/careers/jobs";
import { useDocumentTitle } from "@/lib/use-document-title";
import NotFound from "@/pages/NotFound";
import s from "./Experience.module.css";
import c from "./CompanyCareers.module.css";
function Summary({ job, apply = false }: { job: Job; apply?: boolean }) {
  return (
    <aside className={c.summary}>
      <h2>{job.title}</h2>
      <p>{job.description}</p>
      <dl>
        {[
          ["Location", job.location],
          ["Type", job.type],
          ["Posted", job.openingDate],
          ["Job ID", job.id.toUpperCase()],
        ].map(([key, value]) => (
          <div key={key}>
            <dt>{key}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
      {!apply && (
        <Button to={`/company/careers/apply/${job.id}`}>
          Apply now
          <ArrowRight size={14} />
        </Button>
      )}
    </aside>
  );
}
function Application({ job }: { job: Job }) {
  const [draft, setDraft] = useState("");
  return (
    <div className={c.detailGrid}>
      <form
        className={s.form}
        onChange={() => setDraft("")}
        onSubmit={(e) => {
          e.preventDefault();
          const data = new FormData(e.currentTarget);
          const resume = data.get("resume") as File;
          const body = `Role: ${job.title}\nJob ID: ${job.id}\nFull name: ${data.get("name")}\nEmail: ${data.get("email")}\nLocation: ${data.get("location")}\nLinkedIn / Portfolio: ${data.get("portfolio")}\nResume to attach: ${resume?.name || "Please attach your resume"}\n\nCover letter:\n${data.get("cover")}\n`;
          setDraft(
            `mailto:info@sqaid.ai?subject=${encodeURIComponent(`Application — ${job.title}`)}&body=${encodeURIComponent(body)}`,
          );
        }}
      >
        <h2 className={c.applicationTitle}>Your application</h2>
        <div className={s.formGrid}>
          <label>
            Full name
            <input name="name" required autoComplete="name" maxLength={150} />
          </label>
          <label>
            Email
            <input
              name="email"
              type="email"
              required
              autoComplete="email"
              maxLength={200}
            />
          </label>
        </div>
        <label>
          Location
          <input
            name="location"
            required
            placeholder="City, Country"
            maxLength={200}
          />
        </label>
        <label>
          LinkedIn / Portfolio
          <input
            name="portfolio"
            type="url"
            placeholder="https://"
            maxLength={300}
          />
        </label>
        <label>
          Resume
          <input
            name="resume"
            type="file"
            accept=".pdf,.doc,.docx"
            aria-describedby="resume-help"
          />
        </label>
        <small id="resume-help">
          Your file stays on your device. Attach it to the email before sending;
          selecting it here includes its filename in your draft.
        </small>
        <label>
          Cover letter
          <textarea
            name="cover"
            required
            rows={6}
            maxLength={2500}
            placeholder="Tell us about your experience and why you would like to join SqAId."
          />
        </label>
        <small>
          This application prepares an email. Nothing is sent or uploaded until
          you review and send it from your email app.
        </small>
        <Button type="submit" size="lg">
          Prepare application
          <ArrowUpRight size={15} />
        </Button>
        {draft && (
          <div className={s.notice} role="status">
            <strong>Your application draft is ready.</strong>
            <p>
              Open your email app, attach your resume and send the application.
            </p>
            <a className={s.textLink} href={draft}>
              Open application email
              <ArrowUpRight size={14} />
            </a>
            <p>You can also email info@sqaid.ai directly.</p>
          </div>
        )}
      </form>
      <Summary job={job} apply />
    </div>
  );
}
export default function Careers() {
  const { id } = useParams();
  const { pathname } = useLocation();
  const job = jobs.find((v) => v.id === id);
  const apply = pathname.includes("/apply/");
  useDocumentTitle(
    job
      ? `${apply ? "Apply · " : ""}${job.title} · Careers`
      : "Careers · Build financial compliance technology",
    job?.description ||
      "Explore engineering, data science, deployment and commercial careers at SqAId. Help institutions fight financial crime globally.",
  );
  if (id && !job) return <NotFound />;
  return (
    <div className={`theme-brain ${s.page}`}>
      <section className={s.hero}>
        <div className={s.wrap}>
          <Link
            to={job ? "/company/careers" : "/company"}
            className={s.breadcrumb}
          >
            <ArrowLeft size={12} />
            {job ? "All open roles" : "About SqAId"}
          </Link>
          <span className={s.eyebrow}>
            {apply ? "Apply to SqAId" : "Careers at SqAId"}
          </span>
          <h1 className={s.title}>
            {job ? (
              job.title
            ) : (
              <>
                Build the future of
                <br />
                financial compliance.
              </>
            )}
          </h1>
          <p className={s.lead}>
            {job
              ? `${job.location} · ${job.type} · Job ID: ${job.id.toUpperCase()}`
              : "Join the team building AI, data and financial-crime products for institutions around the world. Explore opportunities across engineering, science, deployment and commercial teams."}
          </p>
          {job && !apply && (
            <div className={s.actions}>
              <Button to={`/company/careers/apply/${job.id}`} size="lg">
                Apply now
                <ArrowRight size={15} />
              </Button>
            </div>
          )}
        </div>
      </section>
      <section className={`${s.section} ${s.band}`}>
        <div className={s.wrap}>
          {!job ? (
            <>
              <span className={s.eyebrow}>Open positions</span>
              <h2 className={s.heading}>Find your next role.</h2>
              <div className={c.jobGrid}>
                {jobs.map((v) => (
                  <Link
                    to={`/company/careers/${v.id}`}
                    key={v.id}
                    className={c.jobCard}
                  >
                    <small>
                      JOB ID: {v.id.toUpperCase()} · POSTED {v.openingDate}
                    </small>
                    <h2>{v.title}</h2>
                    <span>
                      {v.location} · {v.type}
                    </span>
                    <p>{v.description}</p>
                    <b>
                      View role
                      <ArrowRight size={14} />
                    </b>
                  </Link>
                ))}
              </div>
            </>
          ) : apply ? (
            <Application key={job.id} job={job} />
          ) : (
            <div className={c.detailGrid}>
              <article className={c.prose}>
                <h2>Overview</h2>
                <p>{job.description}</p>
                <h3>Responsibilities</h3>
                <ul>
                  {job.responsibilities.map((v) => (
                    <li key={v}>{v}</li>
                  ))}
                </ul>
                <h3>Requirements</h3>
                <p>
                  <strong>Experience:</strong> {job.requirements.experience}
                </p>
                <p>
                  <strong>Education:</strong> {job.requirements.education}
                </p>
                <h4>Technical</h4>
                <ul>
                  {job.requirements.technical.map((v) => (
                    <li key={v}>{v}</li>
                  ))}
                </ul>
                {job.requirements.niceToHave && (
                  <>
                    <h4>Nice to have</h4>
                    <ul>
                      {job.requirements.niceToHave.map((v) => (
                        <li key={v}>{v}</li>
                      ))}
                    </ul>
                  </>
                )}
                <div className={s.actions}>
                  <Button to={`/company/careers/apply/${job.id}`}>
                    Apply for this role
                    <ArrowRight size={15} />
                  </Button>
                </div>
              </article>
              <Summary job={job} />
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
