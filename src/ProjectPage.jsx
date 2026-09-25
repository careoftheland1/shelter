import { useEffect, useRef, useState } from "react";
import PageMeta from "./PageMeta.jsx";

const steps = [
  { key: "land", label: "Land", question: "Where are you with the land?", choices: ["Exploring", "Looking for land", "Have land", "Already building"], tone: "sand" },
  { key: "project", label: "Project", question: "What are you hoping to build?", choices: ["Four Walls", "Courtyard", "Long House", "My own plans", "Not sure"], tone: "stone" },
  { key: "timing", label: "Timing", question: "When are you hoping to build?", choices: ["Within six months", "Six to twelve months", "Later", "Still exploring"], tone: "clay" },
  { key: "budget", label: "Budget", question: "What construction budget are you working toward?", tone: "clay" },
  { key: "builder", label: "Builder", question: "Who will lead the build?", choices: ["I will", "A local builder", "A mix of both", "Still deciding"], tone: "rust" },
  { key: "support", label: "Support", question: "Where could you use a hand?", choices: ["Preparing to build", "Support through construction", "Finding a direction", "Not sure"], tone: "rust" },
  { key: "context", label: "Context", question: "What would be useful for us to understand?", tone: "ink" },
  { key: "contact", label: "Contact", question: "Where should we reply?", tone: "ink" },
];
const offeringLabels = ["Supported", "Guided", "Not sure"];
const initial = () => {
  const params = new URLSearchParams(location.search);
  const offering = params.get("offering")?.toLowerCase();
  const plan = params.get("plan")?.toLowerCase();
  const plans = { "four-walls": "Four Walls", courtyard: "Courtyard", "long-house": "Long House" };
  return { land: "", region: "", project: plans[plan] || "", size: "", timing: "", stage: "", budget: "", currency: "USD", builder: "", support: "", offering: offering === "supported" ? "Supported" : offering === "guided" ? "Guided" : "Not sure", context: "", link: "", name: "", email: "" };
};

function ChoiceGroup({ name, legend, options, value, change, error }) {
  return <fieldset className="funnel-choices" aria-describedby={error ? `${name}-error` : undefined}>
    <legend className="sr-only">{legend}</legend>
    {options.map(option => <label className={`funnel-choice ${value === option ? "selected" : ""}`} key={option}>
      <input type="radio" name={name} value={option} checked={value === option} onChange={() => change(name, option)}/>
      <span className="choice-mark" aria-hidden="true"/><span>{option}</span><span className="choice-arrow" aria-hidden="true">↗</span>
    </label>)}
    {error && <p className="funnel-error" id={`${name}-error`}>{error}</p>}
  </fieldset>;
}

function TextField({ id, label, value, change, placeholder, type = "text", required = false, showOptional = true, error, autoComplete, hint }) {
  return <div className="funnel-field"><label htmlFor={id}>{label}{!required && showOptional && <span> / Optional</span>}</label>
    <input id={id} name={id} type={type} value={value} onChange={e => change(id, e.target.value)} placeholder={placeholder} autoComplete={autoComplete} aria-invalid={Boolean(error)} aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}/>
    {hint && <small id={`${id}-hint`}>{hint}</small>}{error && <p className="funnel-error" id={`${id}-error`}>{error}</p>}
  </div>;
}

function ProjectPage() {
  const [answers, setAnswers] = useState(initial);
  const [step, setStep] = useState(-1);
  const [showAnswers, setShowAnswers] = useState(false);
  const [showHow, setShowHow] = useState(false);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [deliveryError, setDeliveryError] = useState("");
  const heading = useRef(null);
  const howButton = useRef(null);
  const dialogClose = useRef(null);
  const dialog = useRef(null);
  const firstChange = useRef(false);
  const endpoint = import.meta.env.VITE_PROJECT_BRIEF_ENDPOINT;
  const change = (key, value) => { setAnswers(current => ({ ...current, [key]: value })); setErrors(current => ({ ...current, [key]: "" })); };
  const go = index => { setErrors({}); setShowAnswers(false); setStep(index); firstChange.current = true; };
  useEffect(() => { if (firstChange.current) heading.current?.focus(); }, [step]);
  useEffect(() => {
    if (!showHow) return;
    dialogClose.current?.focus();
    const closeOnEscape = event => {
      if (event.key === "Escape") { setShowHow(false); howButton.current?.focus(); }
      if (event.key === "Tab") {
        const buttons = dialog.current?.querySelectorAll("button");
        if (!buttons?.length) return;
        if (event.shiftKey && document.activeElement === buttons[0]) { event.preventDefault(); buttons[buttons.length - 1].focus(); }
        else if (!event.shiftKey && document.activeElement === buttons[buttons.length - 1]) { event.preventDefault(); buttons[0].focus(); }
      }
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [showHow]);
  const validate = () => {
    const current = steps[step];
    const next = {};
    if (current.choices && !answers[current.key]) next[current.key] = "Choose an answer to continue.";
    if (current.key === "contact") {
      if (!answers.name.trim()) next.name = "Enter your name.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(answers.email.trim())) next.email = "Enter a valid email address.";
    }
    if (answers.link && current.key === "context") {
      try { const url = new URL(answers.link); if (!["http:", "https:"].includes(url.protocol)) next.link = "Use a full http or https link."; }
      catch { next.link = "Use a full link, including https://."; }
    }
    setErrors(next);
    if (Object.keys(next).length) { requestAnimationFrame(() => { if (next.link) document.querySelector(".funnel-add-link").open = true; document.querySelector(".funnel-panel [aria-invalid='true'], .funnel-panel input:not(:checked)")?.focus(); }); return false; }
    return true;
  };
  const next = e => { e.preventDefault(); if (validate()) go(step + 1); };
  const summary = [
    ["Land", [answers.land, answers.region].filter(Boolean).join(" · ")],
    ["Project", [answers.project, answers.size].filter(Boolean).join(" · ")],
    ["Timing", answers.land === "Already building" ? answers.stage || "Not provided" : answers.timing],
    ["Build budget", answers.budget.trim() ? `${answers.currency} ${answers.budget.trim()}` : "Not provided"],
    ["Builder", answers.builder], ["Support", [answers.support, answers.offering].filter(Boolean).join(" · ")],
    ["Context", [answers.context, answers.link].filter(Boolean).join(" · ") || "Nothing added"],
    ["Contact", `${answers.name} · ${answers.email}`],
  ];
  const brief = [`Shelter project brief`, `Source: ${new URLSearchParams(location.search).get("source") || "project page"}`, ...summary.map(([label, value]) => `${label}: ${value || "Not provided"}`)].join("\n");
  const submit = async () => {
    if (status === "sending") return;
    setDeliveryError("");
    if (!endpoint) {
      const url = `mailto:build@onthe.land?subject=${encodeURIComponent("Shelter project brief")}&body=${encodeURIComponent(brief)}`;
      window.location.href = url;
      setStatus("email-opened");
      return;
    }
    setStatus("sending");
    try {
      const response = await fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...answers, timing: answers.land === "Already building" ? undefined : answers.timing, stage: answers.land === "Already building" ? answers.stage : undefined, source: new URLSearchParams(location.search).get("source") || "project page" }) });
      if (!response.ok) throw new Error("Could not send your brief.");
      setStatus("sent");
    } catch { setStatus("idle"); setDeliveryError("Your brief could not be sent. Your answers are still here; please try again."); }
  };
  const current = steps[step];
  return <main className="funnel-page project-page">
    <PageMeta title="Tell us about your build — Shelter on the Land" description="Share your land, plans and questions with Shelter. We will read your brief and reply with a useful next step." path="/project/"/>
    <header className="funnel-nav project-nav"><a className="wordmark" href="/">shelter&nbsp;&nbsp;&nbsp;on the&nbsp;&nbsp;land</a><span className="project-nav-progress" aria-live="polite">{step < 0 ? "Project brief" : step < steps.length ? `Question ${step + 1} of ${steps.length}` : status === "sent" ? "Brief received" : "Review"}</span><a href={answers.offering === "Supported" ? "/supported/" : answers.offering === "Guided" ? "/guided/" : "/packages/"}>← {answers.offering === "Not sure" ? "Ways of working" : answers.offering}</a></header>
    {step === -1 && <section className="funnel-intro"><p className="funnel-eyebrow">PROJECT BRIEF</p><h1 ref={heading} tabIndex="-1">Tell us about<br/>your build<span>.</span></h1><div className="funnel-intro-bottom"><p>A few questions about the land, the project, and where you could use a hand. We’ll read your brief and reply with a useful next step.</p><div><button className="funnel-primary" onClick={() => go(0)}>Begin <span>↗</span></button><button ref={howButton} className="funnel-text-button" onClick={() => setShowHow(true)}>How this works <span>↗</span></button></div></div></section>}
    {showHow && <div className="funnel-dialog-backdrop" onClick={() => { setShowHow(false); howButton.current?.focus(); }}><section ref={dialog} className="funnel-dialog" role="dialog" aria-modal="true" aria-labelledby="how-title" onClick={e => e.stopPropagation()}><button ref={dialogClose} className="dialog-close" onClick={() => { setShowHow(false); howButton.current?.focus(); }} aria-label="Close explanation">×</button><p className="funnel-eyebrow">HOW THIS WORKS / 03 STEPS</p><h2 id="how-title">A conversation<br/>starts here.</h2><ol><li><span>01</span><p>Share what you know about your land and project. It is fine to be early in the process.</p></li><li><span>02</span><p>Shelter reads your brief. A person considers the project and the kind of help that fits.</p></li><li><span>03</span><p>We reply with a useful next step and agree together how to continue.</p></li></ol><button className="funnel-primary" onClick={() => { setShowHow(false); howButton.current?.focus(); }}>Return to the brief <span>↗</span></button></section></div>}
    {step >= 0 && step < steps.length && <div className="funnel-workspace">
      {step > 0 && <div className="funnel-history"><button className="funnel-history-all" onClick={() => setShowAnswers(value => !value)} aria-expanded={showAnswers}>{showAnswers ? "Hide earlier answers" : `Earlier answers (${step})`} <span>{showAnswers ? "−" : "+"}</span></button></div>}
      {showAnswers && <div className="funnel-answer-drawer">{steps.slice(0, step).map((item, index) => <button key={item.key} onClick={() => go(index)}>{String(index + 1).padStart(2,"0")} / {item.label}<span>Edit ↗</span></button>)}</div>}
      <section className={`funnel-panel tone-${current.tone}`} key={current.key}><div className="funnel-panel-meta"><span>{String(step + 1).padStart(2,"0")} / {current.label}</span></div><form onSubmit={next} noValidate><div className="funnel-question"><h1 ref={heading} tabIndex="-1">{current.key === "timing" && answers.land === "Already building" ? "Where is the build now?" : current.question}</h1>{current.key === "context" && <p>Anything about your site, plans or questions.</p>}</div><div className="funnel-answer">
        {current.choices && !(current.key === "timing" && answers.land === "Already building") && <ChoiceGroup name={current.key} legend={current.question} options={current.choices} value={answers[current.key]} change={change} error={errors[current.key]}/>}
        {current.key === "land" && <TextField id="region" label="Approximate town or region" value={answers.region} change={change} placeholder="For example, Tucson, Arizona" hint="No street address needed."/>}
        {current.key === "project" && <TextField id="size" label="A little more about the project" value={answers.size} change={change} placeholder="Approximate size or what you have in mind"/>}
        {current.key === "timing" && answers.land === "Already building" && <TextField id="stage" label="Current build stage" value={answers.stage} change={change} placeholder="For example, foundation underway"/>}
        {current.key === "budget" && <div className="funnel-budget-row"><label htmlFor="currency">Currency<select id="currency" value={answers.currency} onChange={e => change("currency", e.target.value)}><option>USD</option><option>CAD</option><option>EUR</option><option>GBP</option><option>Other</option></select></label><TextField id="budget" label="Rough amount or range" value={answers.budget} change={change} showOptional={false} hint="Leave blank if you’re not sure yet." placeholder="For example, 100,000–150,000"/></div>}
        {current.key === "support" && <div className="funnel-field"><label htmlFor="offering">Way of working</label><select id="offering" value={answers.offering} onChange={e => change("offering", e.target.value)}>{offeringLabels.map(x => <option key={x}>{x}</option>)}</select><small>You can change the path you arrived from.</small></div>}
        {current.key === "context" && <><div className="funnel-field"><label htmlFor="context">Your notes <span>/ Optional</span></label><textarea id="context" rows="5" value={answers.context} onChange={e => change("context", e.target.value)} placeholder="Tell us what would help us understand your project."/></div><details className="funnel-add-link"><summary>Add a link</summary><TextField id="link" label="Plan, photo or site link" value={answers.link} change={change} type="url" placeholder="https://" error={errors.link}/></details></>}
        {current.key === "contact" && <><TextField id="name" label="Your name" value={answers.name} change={change} required autoComplete="name" placeholder="Name" error={errors.name}/><TextField id="email" label="Email address" value={answers.email} change={change} type="email" required autoComplete="email" placeholder="you@example.com" error={errors.email}/><p className="funnel-privacy">We’ll use this to reply about your project. <a href="/privacy/">Privacy notice ↗</a></p></>}
        <div className="funnel-actions"><button type="button" className="funnel-back" onClick={() => go(step - 1)}>← Back</button><button className="funnel-primary" type="submit">{current.key === "context" && !answers.context ? "Skip" : "Continue"} <span>↗</span></button></div>
      </div></form></section></div>}
    {step === steps.length && status !== "sent" && <section className="funnel-review"><h1 ref={heading} tabIndex="-1">Your brief</h1><p className="funnel-review-intro">Take a look before you send it. You can return to any answer without losing the rest.</p><div className="funnel-review-list">{summary.map(([label, value], index) => <div key={label}><span>{String(index + 1).padStart(2,"0")} / {label}</span><p>{value || "Not provided"}</p><button onClick={() => go(index)}>Edit ↗</button></div>)}</div>{deliveryError && <p className="funnel-error" role="alert">{deliveryError}</p>}{status === "email-opened" && <p className="funnel-notice" role="status">Your email app should open with the brief. Please send the message there; we have not received it yet. If nothing opened, copy your brief below and email it to <a href="mailto:build@onthe.land">build@onthe.land</a>.</p>}{!endpoint && status === "email-opened" && <textarea className="funnel-copy-brief" readOnly value={brief} aria-label="Copy of your project brief"/>}<div className="funnel-review-actions"><button className="funnel-back" onClick={() => go(steps.length - 1)}>← Back</button><button className="funnel-primary" onClick={submit} disabled={status === "sending"}>{endpoint ? status === "sending" ? "Sending…" : "Send project brief" : status === "email-opened" ? "Open email again" : "Open email to send brief"}<span>↗</span></button></div></section>}
    {status === "sent" && <section className="funnel-confirmation" role="status"><p className="funnel-eyebrow">BRIEF RECEIVED</p><h1>Thank you,<br/>{answers.name.trim().split(/\s+/)[0]}.</h1><p>Your project brief is with us. We’ll read through it and reply at <strong>{answers.email}</strong> with the next step.</p><a className="funnel-primary" href="/">Return to Shelter <span>↗</span></a></section>}
  </main>;
}

export default ProjectPage;
