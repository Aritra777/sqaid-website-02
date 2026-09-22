import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ArrowUpRight, Mail } from "lucide-react";
import Button from "@/components/ui/Button";
import { products } from "@/content/products";
import { useDocumentTitle } from "@/lib/use-document-title";
import s from "./Experience.module.css";
export default function Contact() {
  useDocumentTitle(
    "Contact · Explore your use case",
    "Talk to SqAId about enterprise data, screening, KYC, financial-crime monitoring and connected intelligence.",
  );
  const [params] = useSearchParams();
  const requested = params.get("product") || "Platform";
  const options = ["Platform", ...products.map((p) => p.name)];
  if (!options.includes(requested)) options.push(requested);
  const [interest, setInterest] = useState(requested);
  const [draft, setDraft] = useState("");
  useEffect(() => {
    setInterest(requested);
    setDraft("");
  }, [requested]);
  return (
    <div className={`theme-brain ${s.page}`}>
      <section className={s.hero}>
        <div className={`${s.wrap} ${s.heroGrid}`}>
          <div>
            <span className={s.eyebrow}>Let’s explore the question</span>
            <h1 className={s.title}>
              Your use case.
              <br />
              Our next
              <br />
              conversation.
            </h1>
            <p className={s.lead}>
              Tell us what you are trying to solve. We’ll focus the conversation
              on your sources, workflows and the evidence your team needs.
            </p>
            <div className={s.actions}>
              <a className={s.textLink} href="mailto:info@sqaid.ai">
                <Mail size={16} />
                info@sqaid.ai
              </a>
            </div>
            <div className={s.features}>
              <div className={s.feature}>
                <span>WHAT TO EXPECT</span>
                <h3>A focused product walkthrough.</h3>
                <p>
                  Discuss the workflow, explore the relevant product experience
                  and identify integration requirements.
                </p>
              </div>
            </div>
          </div>
          <form
            className={s.form}
            onChange={() => setDraft("")}
            onSubmit={(e) => {
              e.preventDefault();
              const data = new FormData(e.currentTarget);
              const body = `Name: ${data.get("name")}\nWork email: ${data.get("email")}\nCompany: ${data.get("company")}\nInterest: ${interest}\n\nUse case:\n${data.get("usecase")}`;
              setDraft(
                `mailto:info@sqaid.ai?subject=${encodeURIComponent(`SqAId demo — ${interest}`)}&body=${encodeURIComponent(body)}`,
              );
            }}
          >
            <div className={s.formGrid}>
              <label>
                Your name
                <input
                  name="name"
                  autoComplete="name"
                  required
                  maxLength={120}
                />
              </label>
              <label>
                Work email
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                  maxLength={200}
                />
              </label>
            </div>
            <label>
              Company
              <input
                name="company"
                autoComplete="organization"
                required
                maxLength={200}
              />
            </label>
            <label>
              What would you like to explore?
              <select
                value={interest}
                onChange={(e) => {
                  setInterest(e.target.value);
                  setDraft("");
                }}
              >
                {options.map((v) => (
                  <option key={v}>{v}</option>
                ))}
              </select>
            </label>
            <label>
              Your use case
              <textarea
                name="usecase"
                rows={4}
                placeholder="The problem, your current workflow, or a question for the team."
                maxLength={1500}
              />
            </label>
            <small>
              This form prepares an email on your device. Nothing is submitted
              to SqAId until you send it from your email app. Please do not
              include customer records or sensitive data.
            </small>
            <Button type="submit" size="lg">
              Prepare demo request
              <ArrowUpRight size={15} />
            </Button>
            {draft && (
              <div className={s.notice} role="status">
                Your email draft is ready.{" "}
                <a className={s.textLink} href={draft}>
                  Open in your email app
                  <ArrowUpRight size={13} />
                </a>
                <p>
                  Review and send the message there. If an email app does not
                  open, write directly to info@sqaid.ai.
                </p>
              </div>
            )}
          </form>
        </div>
      </section>
    </div>
  );
}
