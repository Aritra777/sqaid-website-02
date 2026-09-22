import { CTA } from "@/components/experience/Shared";
import { useDocumentTitle } from "@/lib/use-document-title";
import s from "./Experience.module.css";
export default function Company() {
  useDocumentTitle(
    "Company · A clearer view of risk",
    "SqAId connects enterprise data, specialized risk workflows and evidence-led intelligence.",
  );
  return (
    <div className={`theme-brain ${s.page}`}>
      <section className={s.hero}>
        <div className={s.wrap}>
          <span className={s.eyebrow}>About SqAId</span>
          <h1 className={s.title}>
            Make complex risk
            <br />
            easier to understand.
          </h1>
          <p className={s.lead}>
            We are building connected data and intelligence products for the
            people who need to understand a customer, examine a signal and
            decide what comes next.
          </p>
        </div>
      </section>
      <section className={`${s.section} ${s.band}`}>
        <div className={`${s.wrap} ${s.split}`}>
          <h2 className={s.heading}>
            The work starts
            <br />
            with a question.
          </h2>
          <div className={s.statement}>
            <p>
              Why did this activity change? Are these records connected? What
              evidence is missing? Our products are organized around making
              those questions easier to explore.
            </p>
            <small>DATA · CONTEXT · UNDERSTANDING</small>
          </div>
        </div>
      </section>
      <section className={s.section}>
        <div className={s.wrap}>
          <span className={s.eyebrow}>What guides the product</span>
          <h2 className={s.heading}>
            Intelligence with something
            <br />
            to stand behind.
          </h2>
          <div className={s.features}>
            {[
              {
                title: "Evidence before certainty.",
                body: "A useful finding should make its sources and unresolved questions visible. An association is not automatically a conclusion.",
              },
              {
                title: "People keep the judgment.",
                body: "The experience should help teams examine context, compare evidence and own their decisions.",
              },
              {
                title: "Build for connection.",
                body: "A shared data model and configurable workspaces create a foundation for questions that cross product boundaries.",
              },
            ].map((v, i) => (
              <article className={s.feature} key={v.title}>
                <span>{String(i + 1).padStart(2, "0")}</span>
                <h3>{v.title}</h3>
                <p>{v.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <CTA title="Build a clearer view with us." />
    </div>
  );
}
