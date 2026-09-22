import { Link, useParams } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { solutions } from "@/content/solutions";
import { products } from "@/content/products";
import { CTA, ProductCards, Stories } from "@/components/experience/Shared";
import { EvidenceGraph } from "@/components/experience/Workspace";
import { useDocumentTitle } from "@/lib/use-document-title";
import NotFound from "@/pages/NotFound";
import s from "./Experience.module.css";
export default function Solutions() {
  const { slug } = useParams();
  const solution = solutions.find((v) => v.slug === slug);
  useDocumentTitle(
    solution
      ? `${solution.name} · Solutions`
      : "Solutions · Start with the problem",
    solution?.lead ||
      "Explore SqAId use cases for financial crime, customer lifecycle and enterprise intelligence.",
  );
  if (slug && !solution) return <NotFound />;
  return (
    <div className={`theme-brain ${s.page}`}>
      <section className={s.hero}>
        <div className={`${s.wrap} ${solution ? s.heroGrid : ""}`}>
          <div>
            <span className={s.eyebrow}>
              Solutions / {solution?.name || "Use cases"}
            </span>
            <h1 className={s.title}>
              {solution?.headline ||
                "Start with the problem.\nFind the connected answer."}
            </h1>
            <p className={s.lead}>
              {solution?.lead ||
                "Stories from the work your teams do: understanding risk, knowing the customer and turning enterprise data into usable context."}
            </p>
          </div>
          {solution && <EvidenceGraph compact />}
        </div>
      </section>
      {!solution ? (
        <section className={`${s.section} ${s.band}`}>
          <div className={s.wrap}>
            <h2 className={s.heading}>Where do you want to begin?</h2>
            <div className={s.solutionList}>
              {solutions.map((v) => (
                <Link
                  className={s.solutionLink}
                  key={v.slug}
                  to={`/solutions/${v.slug}`}
                >
                  <h3>{v.name}</h3>
                  <p>{v.lead}</p>
                  <ArrowRight />
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : (
        <>
          <section className={`${s.section} ${s.band}`}>
            <div className={`${s.wrap} ${s.split}`}>
              <div>
                <span className={s.eyebrow}>The problem</span>
                <h2 className={s.heading}>
                  The missing piece
                  <br />
                  is often context.
                </h2>
              </div>
              <div className={s.statement}>
                <p>{solution.problem}</p>
              </div>
            </div>
          </section>
          <section className={s.section}>
            <div className={s.wrap}>
              <span className={s.eyebrow}>The connected workflow</span>
              <h2 className={s.heading}>A clearer way through.</h2>
              <div className={s.features}>
                {solution.steps.map(([title, body], i) => (
                  <article className={s.feature} key={title}>
                    <span>{String(i + 1).padStart(2, "0")}</span>
                    <h3>{title}</h3>
                    <p>{body}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>
          <section className={`${s.section} ${s.band}`}>
            <div className={s.wrap}>
              <span className={s.eyebrow}>Explore the story</span>
              <h2 className={s.heading}>See the work in context.</h2>
              <Stories
                key={solution.slug}
                stories={
                  products.find((v) => v.slug === solution.storyProduct)!
                    .stories
                }
              />
            </div>
          </section>
          <section className={s.section}>
            <div className={s.wrap}>
              <span className={s.eyebrow}>Why this approach</span>
              <h2 className={s.heading}>Designed around the question.</h2>
              <p className={s.intro}>{solution.difference}</p>
              <ProductCards
                items={solution.products.map((v) =>
                  products.find((p) => p.slug === v)!,
                )}
              />
            </div>
          </section>
        </>
      )}
      <CTA
        interest={solution?.name || "Platform"}
        title="Let’s work through your use case."
      />
    </div>
  );
}
