import { Link } from "react-router-dom";
import { ArrowRight, Linkedin, Mail } from "lucide-react";
import Button from "@/components/ui/Button";
import { useDocumentTitle } from "@/lib/use-document-title";
import { SITE, SOCIALS } from "@/lib/site";
import { jobs } from "@/pages/careers/jobs";
import s from "./Experience.module.css";
import c from "./CompanyCareers.module.css";

const founders = [
  {
    name: "Samip Singh",
    initials: "SS",
    bio: "20+ years in risk, compliance and AI operations. Former head of financial crime at global banks. Focused on making evidence-first systems that examiners trust.",
  },
  {
    name: "Sarwari Hole",
    initials: "SH",
    bio: "20+ years building data platforms for payments, AML and fraud. Architected real-time risk systems at scale. Drives the screening and graph intelligence foundations.",
  },
];
const principles = [
  {
    title: "Evidence over inference",
    body: "Every conclusion should link to the records that produced it. Traceable evidence is the foundation of a defensible investigation.",
  },
  {
    title: "The analyst decides",
    body: "Agents investigate, assemble and recommend. Disposition stays with a person, because accountability cannot be delegated to a model.",
  },
  {
    title: "Configurable beats bespoke",
    body: "Compliance policy changes. Rules, workflows and source mappings should be configurable so teams can adapt their controls.",
  },
  {
    title: "One platform for financial crime",
    body: "ARGUS unifies AML, fraud, trade surveillance and entity resolution, powered by the UDM enterprise warehouse.",
  },
  {
    title: "Prove it on representative data",
    body: "Evaluate detection, operational behavior and proposed rule changes against the activity your institution actually handles.",
  },
  {
    title: "Built to be examined",
    body: "Source context, policy versions and review evidence belong inside the workflow, where teams can inspect them.",
  },
];
export default function Company() {
  useDocumentTitle(
    "Company · Fighting financial crime globally",
    "Meet SqAId: a financial compliance technology company building a unified platform to fight financial crime globally. Explore our founders, mission and careers.",
  );
  return (
    <div className={`theme-brain ${s.page}`}>
      <section className={s.hero}>
        <div className={s.wrap}>
          <span className={s.eyebrow}>
            SqAId / Financial compliance technology
          </span>
          <h1 className={s.title}>
            Built by compliance
            <br />& AI practitioners.
          </h1>
          <p className={s.lead}>
            SqAId is a financial technology product company on a mission to help
            institutions fight financial crime globally. We bring AML, fraud,
            trade surveillance and entity resolution together in ARGUS, powered
            by the UDM enterprise warehouse.
          </p>
          <div className={s.actions}>
            <Button to="/company/careers" size="lg">
              Explore open roles
              <ArrowRight size={15} />
            </Button>
            <a href="#our-story" className={s.textLink}>
              Our story
              <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </section>
      <div className={s.subnav}>
        <div className={s.wrap}>
          <strong>Company</strong>
          <nav aria-label="Company page sections">
            <a href="#our-story">Our story</a>
            <a href="#founders">Founders</a>
            <a href="#mission">Mission</a>
            <a href="#principles">Principles</a>
            <a href="#careers">Careers</a>
          </nav>
        </div>
      </div>
      <section id="our-story" className={s.section}>
        <div className={`${s.wrap} ${s.split}`}>
          <div>
            <span className={s.eyebrow}>Our origin</span>
            <h2 className={s.heading}>
              From the queue
              <br />
              to the platform.
            </h2>
            <p className={s.intro}>
              SqAId started in Tampa, Florida, USA, in a conference room where
              two compliance veterans sketched a simple idea on a whiteboard:
              what if the analyst got the case, not the noise?
            </p>
            <p className={s.intro}>
              Both founders brought 20+ years of hands-on risk and compliance
              experience—years spent in alert queues, defending tuning decisions
              to examiners and watching talented teams burn out on manual work.
            </p>
          </div>
          <div>
            <p className={s.intro}>
              We had seen the same pattern across banks, fintechs and crypto
              firms: investigation meant pulling statements, walking graphs,
              drafting narratives and reconciling disconnected systems. The
              context that mattered was spread across teams and tools.
            </p>
            <p className={s.intro}>
              The insight was simple. If technology can assemble the evidence,
              cite it and surface uncertainty, the analyst can stay where they
              add the most value: deciding.
            </p>
            <dl className={c.facts}>
              <div>
                <dt>Founded</dt>
                <dd>2023</dd>
              </div>
              <div>
                <dt>Headquarters</dt>
                <dd>Tampa, Florida, USA</dd>
              </div>
              <div>
                <dt>Founder experience</dt>
                <dd>20+ years each</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>
      <section id="founders" className={`${s.section} ${s.band}`}>
        <div className={s.wrap}>
          <span className={s.eyebrow}>Founders</span>
          <h2 className={s.heading}>
            People who have
            <br />
            lived the problem.
          </h2>
          <p className={s.intro}>
            SqAId is built by operators, not just technologists.
          </p>
          <div className={c.founders}>
            {founders.map((f) => (
              <article key={f.name} className={c.founder}>
                <div className={c.monogram} aria-hidden="true">
                  {f.initials}
                </div>
                <div>
                  <span className={s.eyebrow}>Co-founder</span>
                  <h3>{f.name}</h3>
                  <p>{f.bio}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section id="mission" className={s.section}>
        <div className={`${s.wrap} ${s.split}`}>
          <div>
            <span className={s.eyebrow}>Why we exist</span>
            <h2 className={s.heading}>
              Fight financial crime.
              <br />
              Give judgment
              <br />
              room to work.
            </h2>
          </div>
          <div>
            <p className={s.intro}>
              Financial compliance teams face a difficult trade-off: investigate
              more activity, or keep review volumes within the capacity of their
              analysts. Manual evidence gathering makes that trade-off harder.
            </p>
            <p className={s.intro}>
              Our mission is to give teams a unified platform for the work—AML,
              fraud, trade surveillance and entity resolution—with an enterprise
              warehouse underneath and multi-agent intelligence above it.
            </p>
            <p className={s.intro}>
              That is the thesis behind SqAId: help institutions fight financial
              crime globally while giving compliance analysts back the part of
              the job that needs a person.
            </p>
          </div>
        </div>
      </section>
      <section id="principles" className={`${s.section} ${s.band}`}>
        <div className={s.wrap}>
          <span className={s.eyebrow}>Principles</span>
          <h2 className={s.heading}>
            What we will not
            <br />
            compromise on.
          </h2>
          <div className={s.features}>
            {principles.map((p, i) => (
              <article className={s.feature} key={p.title}>
                <span>{String(i + 1).padStart(2, "0")}</span>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section id="careers" className={s.section}>
        <div className={s.wrap}>
          <span className={s.eyebrow}>Careers</span>
          <h2 className={s.heading}>
            Build the future of
            <br />
            financial compliance.
          </h2>
          <p className={s.intro}>
            Join the team building AI, data and financial-crime products.
            Explore our engineering, data science, deployment and commercial
            roles.
          </p>
          <div className={c.jobList}>
            {jobs.map((job) => (
              <Link
                key={job.id}
                className={c.jobRow}
                to={`/company/careers/${job.id}`}
              >
                <div>
                  <h3>{job.title}</h3>
                  <p>
                    {job.location} · {job.type}
                  </p>
                </div>
                <ArrowRight size={21} />
              </Link>
            ))}
          </div>
          <div className={s.actions}>
            <Button to="/company/careers">
              View all job postings
              <ArrowRight size={15} />
            </Button>
          </div>
        </div>
      </section>
      <section className={s.cta}>
        <div className={s.wrap}>
          <span className={s.eyebrow}>Get in touch</span>
          <h2 className={s.heading}>
            Talk to someone who
            <br />
            has worked the queue.
          </h2>
          <p className={s.intro}>
            Bring your hardest financial-crime use case. Let’s explore it
            together.
          </p>
          <div className={s.actions}>
            <Button href={`mailto:${SITE.email}`}>
              <Mail size={16} />
              {SITE.email}
            </Button>
            <a
              className={s.textLink}
              href={SOCIALS.linkedin}
              target="_blank"
              rel="noreferrer"
            >
              <Linkedin size={16} />
              LinkedIn
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
