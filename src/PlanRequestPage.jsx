import { useRef, useState } from "react";
import PageMeta from "./PageMeta.jsx";

const plans = {
  "four-walls": { title: "Four Walls", number: "S—01", area: "200 SQ FT" },
  courtyard: { title: "Courtyard", number: "S—02", area: "600 SQ FT" },
  "long-house": { title: "Long House", number: "S—03", area: "1,000 SQ FT" },
};
const stages = ["Exploring", "Looking for land", "Have land", "Preparing to build", "Already building"];

function PlanRequestPage() {
  const requested = new URLSearchParams(location.search).get("plan");
  const [plan, setPlan] = useState(plans[requested] ? requested : "four-walls");
  const [email, setEmail] = useState("");
  const [optIn, setOptIn] = useState(false);
  const [stage, setStage] = useState("");
  const [state, setState] = useState("entry");
  const [error, setError] = useState("");
  const emailInput = useRef(null);
  const endpoint = import.meta.env.VITE_PLAN_REQUEST_ENDPOINT;
  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const request = async e => {
    e.preventDefault();
    if (!validEmail.test(email.trim())) { setError("Enter a valid email address."); emailInput.current?.focus(); return; }
    setError("");
    if (!endpoint) {
      const body = [`Hello Shelter,`, `Please send me the free ${plans[plan].title} plan set when available.`, `Reply to: ${email.trim()}`, `Building guidance and updates: ${optIn ? "Yes, I opt in" : "No"}`].join("\n\n");
      window.location.href = `mailto:build@onthe.land?subject=${encodeURIComponent(`${plans[plan].title} plan request`)}&body=${encodeURIComponent(body)}`;
      setState("email-opened");
      return;
    }
    setState("sending");
    try {
      const response = await fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ plan, email: email.trim(), marketingOptIn: optIn, source: new URLSearchParams(location.search).get("source") || "plan request page" }) });
      if (!response.ok) throw new Error("Request failed");
      setState("sent");
    } catch { setState("entry"); setError("We could not send the request. Your details are still here; please try again."); }
  };
  const sendStage = async value => {
    setError("");
    try {
      const response = await fetch(endpoint, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ plan, email: email.trim(), stage: value }) });
      if (!response.ok) throw new Error("Stage update failed");
      setStage(value);
    } catch { setError("We could not save your project stage. Your plan request is unaffected."); }
  };
  const selected = plans[plan];
  return <main className="funnel-page plan-request-page">
    <PageMeta title="Request free plans — Shelter on the Land" description="Request the free Shelter plan set for Four Walls, Courtyard or Long House." path="/free-plans/" image="/social/four-walls.jpg"/>
    <header className="funnel-nav plan-request-nav"><a className="wordmark" href="/">shelter&nbsp;&nbsp;&nbsp;on the&nbsp;&nbsp;land</a><a href={`/shelters/${plan}/`}>← {selected.title}</a></header>
    <div className="plan-gate-grid">
      <section className="plan-gate-visual"><svg viewBox="0 0 600 430" role="img" aria-label="Simple line drawing of a shelter floor plan"><rect x="100" y="60" width="400" height="300"/><path d="M100 225h150m90 135V225h160M250 225v135M340 225h160M100 90H500M130 60v300M470 60v300"/><path className="plan-gate-measure" d="M100 387h400m-400-11v22m400-22v22M73 60v300m-10-300h20m-20 300h20"/><circle cx="300" cy="205" r="5"/></svg><div className="plan-gate-caption"><span>{selected.number} / {selected.area}</span><strong>{selected.title}</strong></div></section>
      <section className="plan-gate-content">
        {state === "entry" || state === "sending" ? <><h1>Free plans</h1><p className="plan-gate-lead">Tell us where to send the {selected.title} plan set.</p><form onSubmit={request} noValidate><div className="funnel-field"><label htmlFor="plan-select">Selected shelter</label><select id="plan-select" value={plan} onChange={e => setPlan(e.target.value)}>{Object.entries(plans).map(([key, item]) => <option key={key} value={key}>{item.title}</option>)}</select></div><div className="funnel-field"><label htmlFor="plan-email">Email address</label><input ref={emailInput} id="plan-email" type="email" autoComplete="email" inputMode="email" value={email} onChange={e => { setEmail(e.target.value); setError(""); }} placeholder="you@example.com" aria-invalid={Boolean(error)} aria-describedby={error ? "plan-request-error" : "plan-request-note"}/>{error && <p className="funnel-error" id="plan-request-error" role="alert">{error}</p>}</div><label className="plan-opt-in"><input type="checkbox" checked={optIn} onChange={e => setOptIn(e.target.checked)}/><span>Send me occasional building guidance and Shelter updates. This is optional and separate from my plan request.</span></label><p className="plan-gate-fine" id="plan-request-note">We’ll use your address for this request. <a href="/privacy/">Privacy notice ↗</a></p><button className="funnel-primary" type="submit" disabled={state === "sending"}>{state === "sending" ? "Sending request…" : endpoint ? "Email me the free plans" : "Request plans by email"}<span>↗</span></button></form><div className="plan-gate-foot"><a href="/downloads/shelter-plan-preview.svg" download>Sample plan sheet ↗</a><a href="/downloads/shelter-specifications.csv" download>Specifications ↗</a></div></> : <><p className="funnel-eyebrow">{state === "sent" ? "REQUEST RECEIVED" : "REQUEST READY"}</p><h1>{state === "sent" ? "Check your inbox." : "One more step."}</h1>{state === "sent" ? <p className="plan-gate-lead">We received your request for the {selected.title} plans at <strong>{email}</strong>. Check your inbox for delivery details. If nothing arrives, email <a href="mailto:build@onthe.land">build@onthe.land</a>.</p> : <p className="plan-gate-lead">Your email app should open with a request for the {selected.title} plans. Please send that message there; Shelter has not received it yet. If nothing opened, email <a href="mailto:build@onthe.land">build@onthe.land</a> from <strong>{email}</strong>.</p>}{state === "sent" && <div className="plan-stage"><p className="funnel-eyebrow">OPTIONAL / AFTER YOUR REQUEST</p><h2>Where are you in the process?</h2><div className="plan-stage-options">{stages.map(value => <button key={value} className={stage === value ? "selected" : ""} onClick={() => sendStage(value)}>{value}<span>{stage === value ? "✓" : "↗"}</span></button>)}</div>{error && <p className="funnel-error" role="alert">{error}</p>}</div>}{state === "email-opened" && <button className="funnel-text-button" onClick={() => setState("entry")}>Edit or resend request ↗</button>}<div className="plan-gate-after"><p>Want a hand with your project?</p><a className="funnel-primary" href={`/project/?plan=${plan}&source=free-plans`}>Tell us about your build <span>↗</span></a></div></>}
      </section>
    </div>
  </main>;
}

export default PlanRequestPage;
