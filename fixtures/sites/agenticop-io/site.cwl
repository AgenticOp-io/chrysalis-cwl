# AgenticOps public site genome. Page source is CWL. Emit produces the page.
# Host files stay host files: CSS bytes, image bytes, and Firebase deploy are not in this module.
# Menu open state is checkbox + owned CSS. No host drawer/device JS. No ao-layout.js.
module agenticop_site;

layout site {
  year 2026;
  charset utf-8;
  viewport device;
  style "/agenticops.css";
  style "/fonts.css";
  image logo "/logo.svg";
  host firebase "agenticops" public "." error "/404.html";
  links primary;
  link home "/" "Home";
  link chrysalis "/chrysalis.html" "CWL";
  link convert "/convert.html" "Convert";
  link secure "/secure.html" "Secure";
  link docs "/docs.html" "Docs";
  link published "/published.html" "Published";
  link press "/press.html" "Press";
  link about "/about.html" "About";
  link contact "/contact.html" "Start a Pilot" class ao-nav-cta;
  links chrysalis;
  link chrysalis "/chrysalis.html" "CWL";
  link convert "/convert.html" "Convert";
  link secure "/secure.html" "Secure";
  link docs "/docs.html" "Docs";
  link whitepaper "/whitepaper.html" "System overview";
  links projects;
  link projects "/projects.html" "Catalog";
  link published "/published.html" "Published links";
  link press "/press.html" "Press";
  link wptp "/wptp.html" "WPTP";
  link fde "/fde.html" "FDE";
  link ghosts "/ghosts.html" "Ghost Museum";
  link hub "/hub.html" "Hostnames";
  links practice;
  link method "/method.html" "Method";
  link proof "/proof.html" "Proof";
  link services "/services.html" "Services";
  link trust "/trust.html" "Trust";
  link about "/about.html" "About";
  link contact "/contact.html" "Contact";
  links elsewhere;
  link github "https://github.com/AgenticOp-io" "GitHub org" target blank rel noopener;
  link pypi "https://pypi.org/project/fragility-engine/" "PyPI · FDE" target blank rel noopener;
  link zenodo "https://doi.org/10.5281/zenodo.20455688" "Zenodo · FEL" target blank rel noopener;
  link demo "https://hub.agenticop.io/" "Demo hub" target blank rel noopener;
  link linkedin "https://www.linkedin.com/in/vibe-architect/" "LinkedIn" target blank rel noopener;
  chrome html """
<!DOCTYPE html>
<html lang="en">
<head>
<!-- cwl:charset -->
<!-- cwl:viewport -->
<!-- cwl:title -->
<!-- cwl:description -->
<!-- cwl:canonical -->
<!-- cwl:meta -->
<!-- cwl:icon -->
<!-- cwl:alternate -->
<!-- cwl:jsonld -->
<!-- cwl:preconnect -->
<!-- cwl:head -->
<!-- cwl:style -->
</head>
<body class="ao-page" data-ao-page="<!-- cwl:page -->">
  <div class="ao-bg-fx" aria-hidden="true">
    <div class="ao-vignette"></div>
    <div class="ao-orb ao-orb-a"></div>
    <div class="ao-orb ao-orb-b"></div>
    <div class="ao-grid"></div>
    <div class="ao-noise"></div>
  </div>
  <header class="ao-nav" role="banner" id="ao-site-nav">
    <div class="ao-wrap ao-nav-inner">
      <a class="ao-brand" href="/" aria-label="AgenticOps home">
        <img class="ao-brand-mark" src="<!-- cwl:image logo -->" alt="" width="56" height="56" loading="eager" />
        <span class="ao-brand-stack">
          <span class="ao-brand-name">AgenticOps</span>
          <span class="ao-brand-domain">agenticop.io</span>
        </span>
      </a>
      <nav class="ao-nav-links ao-nav-links--desktop" aria-label="Primary">
        <!-- cwl:links primary ao-nav-link ao-nav-link-active -->
      </nav>
      <input type="checkbox" id="ao-nav-open" class="ao-nav-open" />
      <label for="ao-nav-open" class="ao-nav-toggle">
        <span class="ao-nav-toggle-bars" aria-hidden="true"><span></span><span></span><span></span></span>
        Menu
      </label>
    </div>
    <div id="ao-nav-drawer" class="ao-nav-drawer">
      <nav class="ao-nav-links ao-nav-links--mobile" aria-label="Mobile">
        <!-- cwl:links primary ao-nav-link ao-nav-link-active -->
      </nav>
    </div>
  </header>
<!-- cwl:body -->
  <footer class="ao-footer" id="ao-site-footer">
    <div class="ao-wrap ao-footer-inner">
      <div class="ao-footer-top">
        <div class="ao-footer-brand-block">
          <a class="ao-footer-brand" href="/" aria-label="AgenticOps home">
            <img class="ao-footer-mark" src="<!-- cwl:image logo -->" alt="" width="48" height="48" loading="lazy" />
            <span class="ao-brand-stack">
              <span class="ao-brand-name ao-brand-name--footer">AgenticOps</span>
              <span class="ao-brand-domain">agenticop.io</span>
            </span>
          </a>
          <p class="ao-footer-tagline">CWL is the DNA of the web. Convert and Secure consume it. Traffic decides.</p>
        </div>
        <div class="ao-footer-cols">
          <nav class="ao-footer-col" aria-label="Chrysalis">
            <p class="ao-footer-col-title">Chrysalis</p>
            <!-- cwl:links chrysalis ao-footer-link ao-footer-link-active -->
          </nav>
          <nav class="ao-footer-col" aria-label="Projects">
            <p class="ao-footer-col-title">Projects</p>
            <!-- cwl:links projects ao-footer-link ao-footer-link-active -->
          </nav>
          <nav class="ao-footer-col" aria-label="Practice">
            <p class="ao-footer-col-title">Practice</p>
            <!-- cwl:links practice ao-footer-link ao-footer-link-active -->
          </nav>
          <nav class="ao-footer-col" aria-label="Elsewhere">
            <p class="ao-footer-col-title">Elsewhere</p>
            <!-- cwl:links elsewhere ao-footer-link ao-footer-link-active -->
          </nav>
        </div>
      </div>
      <div class="ao-footer-bottom">
        <p class="ao-footer-fine">© <!-- cwl:year --> AgenticOps. CWL tip 1.0.80 is public — Convert and Secure consume it; traffic decides what ships.</p>
      </div>
    </div>
  </footer>
</body>
</html>
  """;
}

layout missing {
  charset utf-8;
  viewport device;
  style "/agenticops.css";
  style "/fonts.css";
  image logo "/logo.svg";
  chrome html """
<!DOCTYPE html>
<html lang="en">
<head>
<!-- cwl:charset -->
<!-- cwl:viewport -->
<!-- cwl:title -->
<!-- cwl:description -->
<!-- cwl:canonical -->
<!-- cwl:meta -->
<!-- cwl:icon -->
<!-- cwl:alternate -->
<!-- cwl:jsonld -->
<!-- cwl:preconnect -->
<!-- cwl:head -->
<!-- cwl:style -->
</head>
<body class="ao-page">
  <div class="ao-bg-fx" aria-hidden="true">
    <div class="ao-vignette"></div>
    <div class="ao-orb ao-orb-a"></div>
    <div class="ao-orb ao-orb-b"></div>
    <div class="ao-grid"></div>
    <div class="ao-noise"></div>
  </div>
<!-- cwl:body -->
</body>
</html>
  """;
}

@page GET "/"
page home {
  effects: none;
  nav home;
  layout site;
  title "AgenticOps | CWL — DNA of the web";
  description "CWL tip 1.0.80: this site is a complete CWL marketing genome on Firebase — owned fonts and CSS, literal year, no host menu/device JS. Convert and Secure consume the language; traffic decides.";
  canonical "https://agenticop.io/";
  meta keywords "CWL, Chrysalis Web Language, tip 1.0.80, complete CWL site, DNA of the web, AgenticOps, Universal Translator, WebIR, Helix, Firebase";
  meta robots "index, follow, max-image-preview:large, max-snippet:-1";
  meta author "AgenticOps";
  meta theme "#020208";
  meta og type "website";
  meta og site "AgenticOps";
  meta og locale "en_US";
  meta og url "https://agenticop.io/";
  meta og title "CWL — DNA of the web · AgenticOps";
  meta og description "Tip 1.0.80 complete CWL site on Firebase. Genome + owned assets + emit:site. Convert and Secure consume — they do not own.";
  meta og image "https://agenticop.io/cwl-explainer.png";
  meta twitter card "summary_large_image";
  meta twitter title "CWL — DNA of the web";
  meta twitter description "CWL tip 1.0.80 — complete marketing site in CWL on Firebase. Traffic decides. No façades.";
  meta twitter image "https://agenticop.io/cwl-explainer.png";
  icon logo apple;
  alternate "text/plain" "https://agenticop.io/llms.txt" "LLM digest";
  jsonld """
{
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://agenticop.io/#org",
        "name": "AgenticOps",
        "url": "https://agenticop.io/",
        "logo": "https://agenticop.io/logo.svg",
        "email": "hello@agenticop.io",
        "sameAs": [
          "https://github.com/AgenticOp-io",
          "https://www.linkedin.com/in/vibe-architect/",
          "https://wisptools.io"
        ],
        "description": "Practice for verification-backed modernization using Chrysalis — CWL, Convert, and Secure."
      },
      {
        "@type": "WebSite",
        "@id": "https://agenticop.io/#website",
        "url": "https://agenticop.io/",
        "name": "AgenticOps",
        "description": "Building the DNA of the web: CWL, Universal Translator, Helix DNA firewall.",
        "publisher": { "@id": "https://agenticop.io/#org" },
        "inLanguage": "en-US"
      },
      {
        "@type": "WebPage",
        "@id": "https://agenticop.io/#webpage",
        "url": "https://agenticop.io/",
        "name": "AgenticOps — DNA of the web",
        "isPartOf": { "@id": "https://agenticop.io/#website" },
        "about": { "@id": "https://agenticop.io/#org" },
        "description": "CWL describes web apps. Convert translates. Secure proves with traffic. AI drafts; verification ships."
      }
    ]
  }
  """;
  return html """
<main id="main">
    <section class="ao-hero ao-hero--home ao-hero--graphic">
      <div class="ao-wrap ao-hero-inner">
        <div class="ao-hero-stage">
          <div class="ao-hero-brand">
            <div class="ao-hero-mark-glow" aria-hidden="true"></div>
            <img
              class="ao-hero-logo"
              src="/logo.svg"
              alt="AgenticOps"
              width="168"
              height="168"
              decoding="async"
            />
            <p class="ao-hero-wordmark">AgenticOps</p>
            <p class="ao-hero-domain">agenticop.io</p>
          </div>
          <div class="ao-hero-copy">
            <p class="ao-eyebrow"><span class="ao-pulse"></span> CWL tip 1.0.80 &middot; complete site on Firebase</p>
            <h1 class="ao-title">
              <span class="ao-grad">CWL</span>
              is the DNA of the web.
            </h1>
            <p class="ao-lead ao-lead--tight">
              Chrysalis Web Language describes what an app <em>is</em> —
              routes, pages, data, UI, effects — only what can be <strong>verified</strong>.
              <strong>This site is that genome:</strong> tip <strong>1.0.80</strong> on Firebase via certified <code>emit:site</code> —
              owned fonts and CSS, literal year, CSS menu, no host menu or device JavaScript.
              Convert and Secure consume the language — they do not redefine it.
            </p>
            <div class="ao-hero-ctas">
              <a class="ao-btn ao-btn-primary" href="/chrysalis.html">Explore CWL</a>
              <a class="ao-btn ao-btn-ghost" href="https://github.com/AgenticOp-io/chrysalis-cwl" target="_blank" rel="noopener">chrysalis-cwl on GitHub</a>
              <a class="ao-btn ao-btn-link" href="/press.html">Press · tip 1.0.80 &rarr;</a>
            </div>
          </div>
        </div>
        <ol class="ao-flow-strip ao-flow-strip--hero" aria-label="How we ship">
          <li class="ao-flow-step ao-flow-step--cwl">
            <span class="ao-flow-num">01</span>
            <strong>Write DNA</strong>
            <span>CWL genome</span>
          </li>
          <li class="ao-flow-pipe" aria-hidden="true"></li>
          <li class="ao-flow-step ao-flow-step--convert">
            <span class="ao-flow-num">02</span>
            <strong>Translate</strong>
            <span>Convert</span>
          </li>
          <li class="ao-flow-pipe" aria-hidden="true"></li>
          <li class="ao-flow-step ao-flow-step--secure">
            <span class="ao-flow-num">03</span>
            <strong>Prove</strong>
            <span>Helix traffic</span>
          </li>
          <li class="ao-flow-pipe" aria-hidden="true"></li>
          <li class="ao-flow-step ao-flow-step--ship">
            <span class="ao-flow-num">04</span>
            <strong>Ship</strong>
            <span>only when proven</span>
          </li>
        </ol>
      </div>
    </section>

    <section id="dna" class="ao-section ao-section-alt">
      <div class="ao-wrap">
        <p class="ao-kicker">Pillar 01 · language</p>
        <h2 class="ao-h2">CWL first. Convert and Secure consume it.</h2>
        <p class="ao-sub">
          The genome matures on its own so migration deadlines and firewall rollouts do not fork the language.
          Tip <strong>1.0.80</strong> — complete marketing genome: site shell, owned fonts/CSS, literal year, CSS menu, golds through <code>86</code>, certified <code>emit:site</code> on Firebase.
        </p>
<div class="ao-dna-grid">
          <a class="ao-dna-card ao-dna-card--cwl" href="/chrysalis.html">
            <span class="ao-dna-card-visual" aria-hidden="true">
              <svg viewBox="0 0 72 56" fill="none"><path d="M22 10h18l8 8v28H22V10z" stroke="currentColor" stroke-width="2"/><path d="M40 10v8h8M28 28h16M28 36h12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
            </span>
            <span class="ao-dna-card-tag">01 · CWL</span>
            <h3>DNA of the web</h3>
            <p class="ao-dna-role">Readable app genome</p>
            <p>Routes, handlers, effects, verified claims — Rosetta meaning Convert and Secure both consume.</p>
          </a>
          <a class="ao-dna-card ao-dna-card--convert" href="/convert.html">
            <span class="ao-dna-card-visual" aria-hidden="true">
              <svg viewBox="0 0 72 56" fill="none"><rect x="6" y="12" width="18" height="32" rx="3" stroke="currentColor" stroke-width="2"/><rect x="48" y="12" width="18" height="32" rx="3" stroke="currentColor" stroke-width="2"/><path d="M28 28h16M40 22l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </span>
            <span class="ao-dna-card-tag">02 · Convert</span>
            <h3>Universal Translator</h3>
            <p class="ao-dna-role">Origin → WebIR/CWL → emit</p>
            <p>Peel once, emit many. Languages in, modern out — see the full diagram below.</p>
          </a>
          <a class="ao-dna-card ao-dna-card--secure" href="/secure.html">
            <span class="ao-dna-card-visual" aria-hidden="true">
              <svg viewBox="0 0 72 56" fill="none"><path d="M36 8l20 8v14c0 14-8 22-20 24C24 52 16 44 16 30V16l20-8z" stroke="currentColor" stroke-width="2"/><path d="M27 29l6 6 12-14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </span>
            <span class="ao-dna-card-tag">03 · Secure</span>
            <h3>Helix DNA firewall</h3>
            <p class="ao-dna-role">Trust nothing until certified</p>
            <p>Learn → promote → shadow → enforce from traffic DNA. Optional CWL bridge.</p>
          </a>
        </div>
        <div class="ao-open-pillars" aria-label="Public Chrysalis repositories">
          <div class="ao-open-pillars-head">
            <p class="ao-kicker">Open source</p>
            <p><strong>CWL leads.</strong> Convert and Secure pin tip <strong>1.0.80</strong>. This public site is emitted from <code>site.cwl</code> — Apache-2.0.</p>
          </div>
          <ul class="ao-open-pillars-list">
            <li>
              <a href="https://github.com/AgenticOp-io/chrysalis-cwl" target="_blank" rel="noopener">
                <span>01 · CWL</span>
                <strong>chrysalis-cwl</strong>
                <em>github.com/AgenticOp-io/chrysalis-cwl</em>
              </a>
            </li>
            <li>
              <a href="https://github.com/AgenticOp-io/chrysalis" target="_blank" rel="noopener">
                <span>02 · Convert</span>
                <strong>chrysalis</strong>
                <em>github.com/AgenticOp-io/chrysalis</em>
              </a>
            </li>
            <li>
              <a href="https://github.com/AgenticOp-io/chrysalis-security" target="_blank" rel="noopener">
                <span>03 · Secure</span>
                <strong>chrysalis-security</strong>
                <em>github.com/AgenticOp-io/chrysalis-security</em>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <section id="read" class="ao-section">
      <div class="ao-wrap">
        <p class="ao-kicker">Read deeper</p>
        <h2 class="ao-h2">Docs and the full catalog</h2>
        <p class="ao-sub">
          Technical papers (CWL, WebIR, Convert, Helix, traffic bar) plus every public project —
          WPTP, FDE, Ghost Museum, Lane/MSP — with attribution where required.
        </p>
        <div class="ao-hero-ctas" style="margin-top:1.25rem">
          <a class="ao-btn ao-btn-primary" href="/docs.html">Docs / papers</a>
          <a class="ao-btn ao-btn-ghost" href="/published.html">Published work</a>
          <a class="ao-btn ao-btn-link" href="/press.html">Press &rarr;</a>
        </div>
      </div>
    </section>

    <section id="diagrams" class="ao-section ao-section--diagrams">
      <div class="ao-wrap">
        <p class="ao-kicker">See it</p>
        <h2 class="ao-h2">Three pillars. Three pictures.</h2>
        <p class="ao-sub ao-sub--wide">
          CWL is the readable genome. Convert is the language map. Helix is the traffic enforce loop.
        </p>
      </div>
      <div class="ao-diagram-stack">
        <a class="ao-diagram-tile ao-diagram-tile--cwl" href="/chrysalis.html">
          <span class="ao-diagram-label">01 &middot; CWL &middot; DNA of the web</span>
          <img class="ao-explainer-img" src="/cwl-explainer.png" alt="CWL DNA of the web: surfaces describe into a readable genome" width="1200" height="675" loading="lazy" />
          <span class="ao-diagram-go">Open DNA / Chrysalis &rarr;</span>
        </a>
        <div class="ao-diagram-pair">
          <a class="ao-diagram-tile" href="/convert.html">
            <span class="ao-diagram-label">02 &middot; Convert &middot; Universal Translator</span>
            <img class="ao-explainer-img" src="/chrysalis-explainer.png" alt="Languages flowing into WebIR and CWL, then out to modern stacks" width="1200" height="675" loading="lazy" />
            <span class="ao-diagram-go">Open Convert &rarr;</span>
          </a>
          <a class="ao-diagram-tile" href="/secure.html">
            <span class="ao-diagram-label">03 &middot; Secure &middot; Helix</span>
            <img class="ao-explainer-img" src="/helix-explainer.png" alt="Helix traffic DNA firewall pipeline" width="1200" height="675" loading="lazy" />
            <span class="ao-diagram-go">Open Secure &rarr;</span>
          </a>
        </div>
      </div>
    </section>

    <section id="what" class="ao-section ao-section-alt">
      <div class="ao-wrap">
        <p class="ao-kicker">What we actually do</p>
        <h2 class="ao-h2">We build the DNA of the web — then prove it ships.</h2>
        <div class="ao-storyboard">
          <article class="ao-story-panel ao-story-panel--genome">
            <div class="ao-story-art" aria-hidden="true">
              <svg viewBox="0 0 200 140" fill="none">
                <rect x="16" y="24" width="72" height="92" rx="10" stroke="currentColor" stroke-width="2" opacity=".35"/>
                <path d="M110 40c20-22 54-22 74 0M110 70c20-22 54-22 74 0M110 100c20-22 54-22 74 0" stroke="currentColor" stroke-width="2.2"/>
                <text x="28" y="52" fill="currentColor" font-size="11" font-family="ui-monospace,monospace">route</text>
                <text x="28" y="74" fill="currentColor" font-size="11" font-family="ui-monospace,monospace">handler</text>
                <text x="28" y="96" fill="currentColor" font-size="11" font-family="ui-monospace,monospace">gap?</text>
              </svg>
            </div>
            <h3>CWL genome</h3>
            <p>Write what the app <em>is</em> so a person can audit it. unproven claims stay unlabeled — never hidden guesses.</p>
          </article>
          <article class="ao-story-panel ao-story-panel--middle">
            <div class="ao-story-art" aria-hidden="true">
              <svg viewBox="0 0 200 140" fill="none">
                <circle cx="40" cy="70" r="22" stroke="currentColor" stroke-width="2"/>
                <circle cx="160" cy="70" r="22" stroke="currentColor" stroke-width="2"/>
                <rect x="78" y="48" width="44" height="44" rx="8" stroke="currentColor" stroke-width="2.2"/>
                <path d="M62 70h16M122 70h16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                <text x="86" y="74" fill="currentColor" font-size="10" font-family="ui-monospace,monospace">WebIR</text>
              </svg>
            </div>
            <h3>Convert middle</h3>
            <p>Peel any origin into WebIR/CWL once. Emit modern targets from the same DNA — not N×M one-offs.</p>
          </article>
          <article class="ao-story-panel ao-story-panel--traffic">
            <div class="ao-story-art" aria-hidden="true">
              <svg viewBox="0 0 200 140" fill="none">
                <path d="M30 100c20-50 50-50 70 0s50 50 70 0" stroke="currentColor" stroke-width="2.2"/>
                <circle cx="60" cy="70" r="5" fill="currentColor"/><circle cx="100" cy="100" r="5" fill="currentColor"/><circle cx="140" cy="70" r="5" fill="currentColor"/>
                <rect x="48" y="24" width="104" height="28" rx="8" stroke="currentColor" stroke-width="2"/>
                <text x="62" y="43" fill="currentColor" font-size="11" font-family="ui-monospace,monospace">traffic DNA</text>
              </svg>
            </div>
            <h3>Traffic decides</h3>
            <p>Helix learns and enforces from live identity. AI can draft — recorded traffic says ship or stop.</p>
          </article>
        </div>
        <p class="ao-story-note">
          <strong>Chrysalis</strong> is open source as three public pillars —
          <a href="https://github.com/AgenticOp-io/chrysalis-cwl" target="_blank" rel="noopener">CWL</a>,
          <a href="https://github.com/AgenticOp-io/chrysalis" target="_blank" rel="noopener">Convert</a>,
          <a href="https://github.com/AgenticOp-io/chrysalis-security" target="_blank" rel="noopener">Secure</a>.
          <strong>AgenticOps</strong> runs the practice with your team.
          <strong>wisptools.io</strong> is a separate product we still operate — proof we ship, kept apart so names don’t blur.
        </p>
      </div>
    </section>

    <section id="ai" class="ao-section">
      <div class="ao-wrap">
        <p class="ao-kicker">Where AI actually fits in</p>
        <h2 class="ao-h2">AI drafts. Traffic decides.</h2>
        <p class="ao-sub">We use agents throughout — we don’t ask you to trust them on faith.</p>
        <ol class="ao-helix-pipeline ao-helix-pipeline--graphic ao-ai-pipeline">
          <li class="ao-helix-stage ao-helix-stage--learn">
            <div class="ao-helix-stage-visual" aria-hidden="true">
              <svg viewBox="0 0 64 48" fill="none"><path d="M12 34c8-16 32-16 40 0" stroke="currentColor" stroke-width="2"/><circle cx="22" cy="22" r="6" stroke="currentColor" stroke-width="2"/><circle cx="42" cy="18" r="5" stroke="currentColor" stroke-width="2"/></svg>
            </div>
            <span class="ao-helix-stage-num">01</span>
            <h3>Draft</h3>
            <p class="ao-helix-stage-mode">AI proposes</p>
            <p>Agents read origin code, draft CWL, emit candidates, and flag uncertainty — every step logged.</p>
          </li>
          <li class="ao-helix-pipe" aria-hidden="true"><span></span></li>
          <li class="ao-helix-stage ao-helix-stage--promote">
            <div class="ao-helix-stage-visual" aria-hidden="true">
              <svg viewBox="0 0 64 48" fill="none"><rect x="10" y="10" width="20" height="28" rx="3" stroke="currentColor" stroke-width="2"/><path d="M36 24h16M46 18l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
            </div>
            <span class="ao-helix-stage-num">02</span>
            <h3>Reuse</h3>
            <p class="ao-helix-stage-mode">Intelligence Shorthand</p>
            <p>Proven patterns get saved. Next hit looks them up — faster, cheaper, no new untested risk.</p>
          </li>
          <li class="ao-helix-pipe" aria-hidden="true"><span></span></li>
          <li class="ao-helix-stage ao-helix-stage--enforce">
            <div class="ao-helix-stage-visual" aria-hidden="true">
              <svg viewBox="0 0 64 48" fill="none"><path d="M32 8l16 6v10c0 10-6 16-16 18S16 34 16 24V14l16-6z" stroke="currentColor" stroke-width="2"/><path d="M24 24l5 5 11-12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
            </div>
            <span class="ao-helix-stage-num">03</span>
            <h3>Decide</h3>
            <p class="ao-helix-stage-mode">Replay real traffic</p>
            <p>Recorded requests and effects must match. If they don’t, it doesn’t ship — human or AI authored.</p>
          </li>
        </ol>
      </div>
    </section>

    <section class="ao-section ao-hub-section ao-section-alt">
      <div class="ao-wrap">
        <p class="ao-kicker">Read more</p>
        <h2 class="ao-h2">The full story, one page at a time.</h2>
        <p class="ao-sub">Same idea, more detail — pick what’s relevant.</p>
        <div class="ao-hub-grid">
          <a class="ao-hub-card" href="/chrysalis.html">
            <span class="ao-hub-card-num">00</span>
            <h3>CWL / DNA</h3>
            <p>Complete genome — tip 1.0.80 on Firebase. Convert and Secure consume; they do not own.</p>
            <span class="ao-hub-card-go">Open →</span>
          </a>
          <a class="ao-hub-card" href="/services.html">
            <span class="ao-hub-card-num">01</span>
            <h3>Services</h3>
            <p>What a project with us actually looks like, step by step.</p>
            <span class="ao-hub-card-go">Open →</span>
          </a>
          <a class="ao-hub-card" href="/method.html">
            <span class="ao-hub-card-num">02</span>
            <h3>Method</h3>
            <p>How the process works in order — from recording traffic to rolling out safely.</p>
            <span class="ao-hub-card-go">Open →</span>
          </a>
          <a class="ao-hub-card" href="/proof.html">
            <span class="ao-hub-card-num">03</span>
            <h3>Proof</h3>
            <p>Real, working examples — plus a live product we built and still run.</p>
            <span class="ao-hub-card-go">Open →</span>
          </a>
          <a class="ao-hub-card" href="/hub.html">
            <span class="ao-hub-card-num">04</span>
            <h3>Hub</h3>
            <p>Live projects and hostnames — Translation Hub, FDE, corporate site.</p>
            <span class="ao-hub-card-go">Open →</span>
          </a>
          <a class="ao-hub-card" href="/trust.html">
            <span class="ao-hub-card-num">05</span>
            <h3>Trust</h3>
            <p>The rules we won't break, and why they matter.</p>
            <span class="ao-hub-card-go">Open →</span>
          </a>
          <a class="ao-hub-card" href="/about.html">
            <span class="ao-hub-card-num">06</span>
            <h3>About</h3>
            <p>Why we started building this, and where it's headed.</p>
            <span class="ao-hub-card-go">Open →</span>
          </a>
          <a class="ao-hub-card ao-hub-card--cta" href="/contact.html">
            <span class="ao-hub-card-num">→</span>
            <h3>Contact</h3>
            <p>Tell us about your stack — we'll tell you honestly if this fits.</p>
            <span class="ao-hub-card-go">Open →</span>
          </a>
        </div>
      </div>
    </section>
  </main>
  """;
}

@page GET "/404.html"
page missing {
  effects: none;
  layout missing;
  title "404 — AgenticOps";
  meta robots "noindex";
  icon logo;
  return html """
<main class="ao-section ao-cta" style="padding-top: 140px;">
    <div class="ao-wrap ao-cta-inner">
      <p class="ao-kicker" style="font-family: var(--ao-mono);">HTTP 404</p>
      <h1 class="ao-h2" style="font-size: clamp(2rem, 4vw, 3rem); max-width: 22ch; margin-inline: auto;">
        That route isn’t in the <span class="ao-grad">orchestration graph</span>.
      </h1>
      <p class="ao-sub">
        The page you’re looking for doesn’t exist — or an agent hasn’t built it yet. Head home or jump to a known node.
      </p>
      <div class="ao-cta-actions">
        <a class="ao-btn ao-btn-primary" href="/">Back to home</a>
        <a class="ao-btn ao-btn-ghost" href="https://wisptools.io" target="_blank" rel="noopener">Visit wisptools.io</a>
        <a class="ao-btn ao-btn-link" href="https://github.com/AgenticOp-io" target="_blank" rel="noopener">GitHub →</a>
      </div>
    </div>
  </main>
  """;
}

@page GET "/about.html"
page about {
  effects: none;
  nav about;
  layout site;
  title "About · Building the DNA of the web | AgenticOps";
  description "AgenticOps builds Chrysalis: CWL as the DNA of the web, Convert as the Universal Translator, Secure as traffic-proven identity. Migrations without guesswork.";
  canonical "https://agenticop.io/about.html";
  meta robots "index, follow, max-image-preview:large, max-snippet:-1";
  meta author "AgenticOps";
  meta theme "#020208";
  meta og type "website";
  meta og site "AgenticOps";
  meta og url "https://agenticop.io/about.html";
  meta og title "About AgenticOps — DNA of the web";
  meta og description "Why we built CWL, Convert, and Secure — and how AgenticOps runs the practice.";
  meta og image "https://agenticop.io/logo.svg";
  meta twitter card "summary";
  meta twitter title "About AgenticOps";
  meta twitter description "Building the DNA of the web with Chrysalis — CWL, Convert, Secure.";
  icon logo apple;
  jsonld """
{
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "url": "https://agenticop.io/about.html",
    "name": "About AgenticOps",
    "description": "Why AgenticOps builds the DNA of the web with Chrysalis.",
    "isPartOf": { "@type": "WebSite", "url": "https://agenticop.io/" },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://agenticop.io/" },
        { "@type": "ListItem", "position": 2, "name": "About", "item": "https://agenticop.io/about.html" }
      ]
    }
  }
  """;
  return html """
<main class="ao-page-main">
    <section class="ao-section ao-page-hero ao-about-hero">
      <div class="ao-wrap ao-about-hero-inner">
        <div class="ao-about-hero-copy">
          <p class="ao-kicker">About</p>
          <h1 class="ao-page-title ao-page-title--wide">We got tired of migrations that were just <span class="ao-grad">confident guessing.</span></h1>
          <p class="ao-sub ao-sub--wide">So we started building the DNA of the web — a readable genome for apps, a translator that respects it, and a way to prove identity from live traffic.</p>
        </div>
        <div class="ao-about-hero-mark" aria-hidden="true">
          <img src="/logo.svg" alt="" width="200" height="200" class="ao-about-logo" />
          <svg class="ao-about-dna-ring" viewBox="0 0 220 72" focusable="false">
            <defs>
              <linearGradient id="aboutDna" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="#22d3ee"/><stop offset="100%" stop-color="#a855f7"/>
              </linearGradient>
            </defs>
            <path d="M10 36c28-24 56-24 84 0s56 24 84 0 56-24 84 0" fill="none" stroke="url(#aboutDna)" stroke-width="2.2"/>
            <path d="M10 36c28 24 56 24 84 0s56-24 84 0 56 24 84 0" fill="none" stroke="url(#aboutDna)" stroke-width="2.2" opacity="0.5"/>
          </svg>
        </div>
      </div>
    </section>

    <section class="ao-section">
      <div class="ao-wrap">
        <p class="ao-kicker">The problem we refused</p>
        <h2 class="ao-h2">Guesswork dressed up as modernization.</h2>
        <div class="ao-about-pain">
          <article class="ao-about-pain-card">
            <div class="ao-about-pain-icon" aria-hidden="true">
              <svg viewBox="0 0 48 48" fill="none"><path d="M12 14h24M12 24h16M12 34h20" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/><path d="M34 28l8 8M42 28l-8 8" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>
            </div>
            <h3>Line-by-line rewrites</h3>
            <p>Someone relearns the same routes, sessions, and side effects in a new dialect — and hopes nothing was missed.</p>
          </article>
          <article class="ao-about-pain-card">
            <div class="ao-about-pain-icon" aria-hidden="true">
              <svg viewBox="0 0 48 48" fill="none"><rect x="10" y="12" width="12" height="24" rx="2" stroke="currentColor" stroke-width="2"/><rect x="26" y="12" width="12" height="24" rx="2" stroke="currentColor" stroke-width="2"/><path d="M22 24h4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
            </div>
            <h3>Syntax-to-syntax converters</h3>
            <p>They move tokens, not meaning. Behavior “should” match — until production proves otherwise.</p>
          </article>
          <article class="ao-about-pain-card">
            <div class="ao-about-pain-icon" aria-hidden="true">
              <svg viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="14" stroke="currentColor" stroke-width="2.2"/><path d="M24 16v10l6 4" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>
            </div>
            <h3>Confident AI diffs</h3>
            <p>Models sound sure. Confidence isn’t proof. We require recorded traffic to decide what ships.</p>
          </article>
        </div>
      </div>
    </section>

    <section class="ao-section ao-section-alt">
      <div class="ao-wrap">
        <p class="ao-kicker">What we built instead</p>
        <h2 class="ao-h2">Three pillars. One genome.</h2>
        <p class="ao-sub ao-sub--wide">
          <strong>CWL</strong> writes the app down so a person can read it. <strong>Convert</strong> translates through that DNA.
          <strong>Helix</strong> proves live identity from traffic. unproven claims stay unlabeled — never hidden guesses.
        </p>
        <div class="ao-dna-grid">
          <a class="ao-dna-card ao-dna-card--cwl" href="/chrysalis.html">
            <span class="ao-dna-card-tag">01 · CWL</span>
            <h3>DNA of the web</h3>
            <p class="ao-dna-role">Readable genome</p>
            <p>Routes, handlers, effects, verified claims — Rosetta meaning Convert and Secure both consume.</p>
          </a>
          <a class="ao-dna-card ao-dna-card--convert" href="/convert.html">
            <span class="ao-dna-card-tag">02 · Convert</span>
            <h3>Universal Translator</h3>
            <p class="ao-dna-role">Origin → modern</p>
            <p>WebIR + CWL in the middle. AI proposes; verify disposes. No façades.</p>
          </a>
          <a class="ao-dna-card ao-dna-card--secure" href="/secure.html">
            <span class="ao-dna-card-tag">03 · Secure</span>
            <h3>Helix DNA firewall</h3>
            <p class="ao-dna-role">Trust nothing until certified</p>
            <p>Learn → promote → shadow → enforce from traffic DNA. Optional CWL bridge.</p>
          </a>
        </div>
      </div>
    </section>

    <section class="ao-section">
      <div class="ao-wrap">
        <p class="ao-kicker">Timeline</p>
        <h2 class="ao-h2">How we got here.</h2>
        <ol class="ao-about-timeline">
          <li>
            <span class="ao-about-tl-year">2024–2026</span>
            <div class="ao-about-tl-card">
              <h3>wisptools.io</h3>
              <p>An internet-provider operations platform we built and still run — proof we ship real software, not just language theory.</p>
              <a href="https://wisptools.io" target="_blank" rel="noopener">wisptools.io →</a>
            </div>
          </li>
          <li>
            <span class="ao-about-tl-year">2026</span>
            <div class="ao-about-tl-card">
              <h3>Chrysalis split</h3>
              <p>CWL (DNA), Convert (translator), Secure (Helix) — open source, with a working demo hub online.</p>
              <a href="https://hub.agenticop.io/hub/#/guide" target="_blank" rel="noopener">hub.agenticop.io →</a>
            </div>
          </li>
          <li>
            <span class="ao-about-tl-year">2026 →</span>
            <div class="ao-about-tl-card">
              <h3>AgenticOps</h3>
              <p>The practice: we run the process with your team — inventory, translate, verify, cut over carefully.</p>
              <a href="/contact.html">Start a Pilot →</a>
            </div>
          </li>
        </ol>
      </div>
    </section>

    <section class="ao-section ao-section-alt">
      <div class="ao-wrap">
        <p class="ao-kicker">How the pieces fit</p>
        <div class="ao-about-map">
          <a class="ao-about-map-item" href="/chrysalis.html"><span>DNA</span><strong>CWL</strong></a>
          <span class="ao-about-map-arrow" aria-hidden="true">→</span>
          <a class="ao-about-map-item" href="/convert.html"><span>Translator</span><strong>Convert</strong></a>
          <span class="ao-about-map-arrow" aria-hidden="true">→</span>
          <a class="ao-about-map-item" href="/secure.html"><span>Identity</span><strong>Helix</strong></a>
        </div>
        <div class="ao-open-pillars" style="margin-top:1.5rem" aria-label="Public Chrysalis repositories">
          <div class="ao-open-pillars-head">
            <p class="ao-kicker">Open source</p>
            <p>Three public pillars · tip <strong>1.0.80</strong> · complete site · Apache-2.0</p>
          </div>
          <ul class="ao-open-pillars-list">
            <li>
              <a href="https://github.com/AgenticOp-io/chrysalis-cwl" target="_blank" rel="noopener">
                <span>01 · CWL</span>
                <strong>chrysalis-cwl</strong>
                <em>Language · DNA</em>
              </a>
            </li>
            <li>
              <a href="https://github.com/AgenticOp-io/chrysalis" target="_blank" rel="noopener">
                <span>02 · Convert</span>
                <strong>chrysalis</strong>
                <em>Universal Translator</em>
              </a>
            </li>
            <li>
              <a href="https://github.com/AgenticOp-io/chrysalis-security" target="_blank" rel="noopener">
                <span>03 · Secure</span>
                <strong>chrysalis-security</strong>
                <em>Helix</em>
              </a>
            </li>
          </ul>
        </div>
        <p class="ao-next-page"><a href="/published.html">Full published catalog (repos, DOIs, hosts) →</a> · <a href="/contact.html">Tell us about your stack →</a></p>
      </div>
    </section>

    <section class="ao-section">
      <div class="ao-wrap ao-wrap--doc">
        <p class="ao-kicker">People</p>
        <h2 class="ao-h2">David Peterson</h2>
        <div class="ao-prose">
          <p>
            Founder &amp; architect. Public work ships as <strong>AgenticOp-io</strong>.
            LinkedIn: <a href="https://www.linkedin.com/in/vibe-architect/" target="_blank" rel="noopener">vibe-architect</a>.
            Cite FDE/FEL via Zenodo concept DOI
            <a href="https://doi.org/10.5281/zenodo.20455688" target="_blank" rel="noopener">10.5281/zenodo.20455688</a>.
          </p>
          <p>
            Everything public in one place: <a href="/published.html">Published work</a>
            (pillars, WPTP, FDE, Ghost Museum, Lane/MSP, wisptools proof, live hosts).
          </p>
        </div>
      </div>
    </section>
  </main>
  """;
}

@page GET "/chrysalis.html"
page chrysalis {
  effects: none;
  nav chrysalis;
  layout site;
  title "CWL · DNA of the web — readable genome | AgenticOps";
  description "CWL is Chrysalis Web Language: the readable DNA of any web app. Routes, handlers, pages, data, effects — and Convert and Secure consume it; they do not redefine it.";
  canonical "https://agenticop.io/chrysalis.html";
  meta keywords "CWL, Chrysalis Web Language, DNA of the web, readable genome, WebIR, AgenticOps, Chrysalis";
  meta robots "index, follow, max-image-preview:large, max-snippet:-1";
  meta author "AgenticOps";
  meta theme "#020208";
  meta og type "website";
  meta og site "AgenticOps";
  meta og locale "en_US";
  meta og url "https://agenticop.io/chrysalis.html";
  meta og title "CWL — DNA of the web";
  meta og description "Readable genome for any web app. Humans audit. Machines emit. Only verified claims ship.";
  meta og image "https://agenticop.io/cwl-explainer.png";
  meta twitter card "summary_large_image";
  meta twitter title "CWL — DNA of the web";
  meta twitter description "Chrysalis Web Language: the readable genome Convert and Secure consume — they do not own.";
  meta twitter image "https://agenticop.io/cwl-explainer.png";
  icon logo apple;
  alternate "text/plain" "https://agenticop.io/llms.txt" "LLM digest";
  jsonld """
{
    "@context": "https://schema.org",
    "@type": "WebPage",
    "url": "https://agenticop.io/chrysalis.html",
    "name": "CWL — DNA of the web",
    "description": "Chrysalis Web Language is the readable genome for web apps: describe once, audit holes, let Convert and Secure consume.",
    "primaryImageOfPage": { "@type": "ImageObject", "url": "https://agenticop.io/cwl-explainer.png" },
    "isPartOf": { "@type": "WebSite", "url": "https://agenticop.io/" },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://agenticop.io/" },
        { "@type": "ListItem", "position": 2, "name": "CWL / DNA", "item": "https://agenticop.io/chrysalis.html" }
      ]
    }
  }
  """;
  return html """
<main id="main" class="ao-page-main">
    <section class="ao-section ao-page-hero ao-page-hero--brand ao-page-hero--cwl">
      <div class="ao-wrap">
        <p class="ao-kicker ao-kicker--loud">CWL &middot; tip 1.0.80 &middot; this page is the genome</p>
        <h1 class="ao-page-title ao-page-title--cwl">
          Chrysalis Web Language &mdash;
          <span class="ao-grad">the genome Convert and Secure consume.</span>
        </h1>
        <p class="ao-lead ao-lead--cwl">
          <strong>Chrysalis Web Language</strong> describes what a web app <em>is</em>:
          routes, handlers, pages, data, UI, effects &mdash; only what can be <strong>verified</strong>.
          Tip <strong>1.0.80</strong> ships a <strong>complete marketing genome</strong> —
          the same language that powers <a href="/">agenticop.io</a> on Firebase via <code>emit:site</code>.
          Convert and Secure consume it — they do not redefine it.
        </p>
        <ol class="ao-flow-strip ao-flow-strip--hero" aria-label="CWL path">
          <li class="ao-flow-step ao-flow-step--cwl">
            <span class="ao-flow-num">01</span>
            <strong>Surface in</strong>
            <span>routes, pages, effects</span>
          </li>
          <li class="ao-flow-pipe" aria-hidden="true"></li>
          <li class="ao-flow-step ao-flow-step--convert">
            <span class="ao-flow-num">02</span>
            <strong>Readable genome</strong>
            <span>CWL + verify</span>
          </li>
          <li class="ao-flow-pipe" aria-hidden="true"></li>
          <li class="ao-flow-step ao-flow-step--ship">
            <span class="ao-flow-num">03</span>
            <strong>Consumed</strong>
            <span>Convert &amp; Secure</span>
          </li>
        </ol>
      </div>
    </section>

    <section class="ao-explainer-band" aria-label="CWL DNA of the web diagram">
      <div class="ao-wrap">
        <img
          class="ao-explainer-img"
          src="/cwl-explainer.png"
          width="1200"
          height="675"
          alt="CWL DNA of the web: routes, pages, data, and contracts describe into a readable genome. Unproven when a claim is unsafe. Convert and Secure consume it; people can read it."
          loading="eager"
          decoding="async"
        />
      </div>
    </section>

    <section class="ao-section">
      <div class="ao-wrap">
        <p class="ao-kicker">How CWL works</p>
        <h2 class="ao-h2">Describe once. Verify every claim. Let others speak it.</h2>
        <div class="ao-pillars">
          <div class="ao-pillar">
            <span class="ao-pillar-tag">01</span>
            <h3>Surface in</h3>
            <p>Routes, handlers, pages, data, UI, and effects enter one readable model &mdash; not a one-off dialect for a single migration.</p>
          </div>
          <div class="ao-pillar-arrow" aria-hidden="true">&rarr;</div>
          <div class="ao-pillar ao-pillar-accent">
            <span class="ao-pillar-tag">02</span>
            <h3>Readable genome</h3>
            <p>Humans can audit what the app claims to be. Machines can emit from the same model. Missing truth stays unnamed until proven.</p>
          </div>
          <div class="ao-pillar-arrow" aria-hidden="true">&rarr;</div>
          <div class="ao-pillar">
            <span class="ao-pillar-tag">03</span>
            <h3>Consumed, not owned</h3>
            <p>Convert translates through CWL. Secure&rsquo;s default is traffic DNA; any CWL bridge must match this grammar &mdash; no fork inside Helix.</p>
          </div>
        </div>
        <div class="ao-creed">
          <p><strong>Grammar of its own.</strong> <strong>Not a migration dialect.</strong> <strong>Convert &amp; Secure consume &mdash; do not redefine.</strong></p>
        </div>

        <h3 class="ao-h3">Surfaces (tip 1.0.80)</h3>
        <div class="ao-doc-table-wrap" tabindex="0">
          <table class="ao-doc-table">
            <thead><tr><th>Surface</th><th>Status</th></tr></thead>
            <tbody>
              <tr><th scope="row">API <code>@route</code></th><td>Shipped — RFC-0001–0008</td></tr>
              <tr><th scope="row">Pages <code>@page</code></th><td>Shipped — RFC-0010/0011/0014</td></tr>
              <tr><th scope="row">Data <code>load</code></th><td>Partial — RFC-0013</td></tr>
              <tr><th scope="row">UI islands</th><td>Language shipped — RFC-0017–0019, 0024, 0028</td></tr>
              <tr><th scope="row">Effects</th><td>Declarative — RFC-0007, 0020</td></tr>
              <tr><th scope="row">DNA bridge</th><td>Contract — RFC-0022 (<code>app-dna-v1</code>)</td></tr>
            </tbody>
          </table>
        </div>

        <h3 class="ao-h3">Gates</h3>
        <div class="ao-prose">
          <ul>
            <li><code>npm run smoke:ut-spine</code> → <code>UT_SPINE_OK</code> (CWL owns this spine)</li>
            <li><code>npm run smoke:cwl-ingest-matrix</code> → <code>CWL_INGEST_MATRIX_OK</code></li>
            <li>Unsupported transport stays named outside the marketing genome — never silent stubs</li>
          </ul>
          <p>
            Full paper: <a href="/paper-cwl.html">CWL language</a> ·
            <a href="/paper-webir.html">WebIR</a> ·
            <a href="/docs.html">Docs index</a>
          </p>
        </div>

        <div class="ao-open-pillars" style="margin-top:2rem" aria-label="Public Chrysalis repositories">
          <div class="ao-open-pillars-head">
            <p class="ao-kicker">Open source</p>
            <p>All three pillars are public on GitHub. Tip language <strong>1.0.78</strong>. This site is that genome on Firebase.</p>
          </div>
          <ul class="ao-open-pillars-list">
            <li>
              <a href="https://github.com/AgenticOp-io/chrysalis-cwl" target="_blank" rel="noopener">
                <span>01 · CWL</span>
                <strong>chrysalis-cwl</strong>
                <em>Language · DNA</em>
              </a>
            </li>
            <li>
              <a href="https://github.com/AgenticOp-io/chrysalis" target="_blank" rel="noopener">
                <span>02 · Convert</span>
                <strong>chrysalis</strong>
                <em>Universal Translator</em>
              </a>
            </li>
            <li>
              <a href="https://github.com/AgenticOp-io/chrysalis-security" target="_blank" rel="noopener">
                <span>03 · Secure</span>
                <strong>chrysalis-security</strong>
                <em>Helix DNA firewall</em>
              </a>
            </li>
          </ul>
        </div>
        <div class="ao-hero-ctas" style="margin-top:2rem">
          <a class="ao-btn ao-btn-primary" href="/convert.html">Convert · Universal Translator</a>
          <a class="ao-btn ao-btn-ghost" href="/secure.html">Secure · Helix</a>
          <a class="ao-btn ao-btn-link" href="https://github.com/AgenticOp-io/chrysalis-cwl" target="_blank" rel="noopener">CWL on GitHub &rarr;</a>
        </div>
        <p class="ao-next-page"><a href="/method.html">See the migration method &rarr;</a></p>
      </div>
    </section>

    <section class="ao-section ao-section-alt">
      <div class="ao-wrap">
        <p class="ao-kicker">Sister pillars</p>
        <h2 class="ao-h2">Same genome. Different jobs.</h2>
      </div>
      <div class="ao-diagram-pair">
        <a class="ao-diagram-tile" href="/convert.html">
          <span class="ao-diagram-label">02 &middot; Convert</span>
          <img class="ao-explainer-img" src="/chrysalis-explainer.png" alt="Universal Translator language diagram" width="1200" height="675" loading="lazy" />
          <span class="ao-diagram-go">Open Convert &rarr;</span>
        </a>
        <a class="ao-diagram-tile" href="/secure.html">
          <span class="ao-diagram-label">03 &middot; Secure &middot; Helix</span>
          <img class="ao-explainer-img" src="/helix-explainer.png" alt="Helix DNA firewall diagram" width="1200" height="675" loading="lazy" />
          <span class="ao-diagram-go">Open Secure &rarr;</span>
        </a>
      </div>
    </section>
  </main>
  """;
}

@page GET "/contact.html"
page contact {
  effects: none;
  nav contact;
  layout site;
  title "Contact � Start a Pilot | AgenticOps";
  description "VP Eng / CTO with a legacy stack? Start a fixed-scope Pilot. hello@agenticop.io � DNA of the web, Universal Translator, traffic-proven cutover.";
  canonical "https://agenticop.io/contact.html";
  meta theme "#020208";
  meta robots "index, follow, max-image-preview:large, max-snippet:-1";
  meta author "AgenticOps";
  meta og type "website";
  meta og site "AgenticOps";
  meta og locale "en_US";
  meta og url "https://agenticop.io/contact.html";
  meta og title "Contact � AgenticOps";
  meta og description "VP Eng / CTO with a legacy stack? Start a fixed-scope Pilot. hello@agenticop.io � DNA of the web, Universal Translator, traffic-proven cutover.";
  meta og image "https://agenticop.io/logo.svg";
  meta twitter card "summary";
  meta twitter title "Contact � AgenticOps";
  meta twitter description "VP Eng / CTO with a legacy stack? Start a fixed-scope Pilot. hello@agenticop.io � DNA of the web, Universal Translator, traffic-proven cutover.";
  icon logo apple;
  jsonld """
{
    "@context": "https://schema.org",
    "@type": "WebPage",
    "url": "https://agenticop.io/contact.html",
    "name": "Contact",
    "description": "VP Eng / CTO with a legacy stack? Start a fixed-scope Pilot. hello@agenticop.io � DNA of the web, Universal Translator, traffic-proven cutover.",
    "isPartOf": { "@type": "WebSite", "url": "https://agenticop.io/" },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://agenticop.io/" },
        { "@type": "ListItem", "position": 2, "name": "Contact", "item": "https://agenticop.io/contact.html" }
      ]
    }
  }
  """;
  return html """
<main class="ao-page-main">
    <section class="ao-section ao-page-hero">
      <div class="ao-wrap">
        <p class="ao-kicker">Contact</p>
        <h1 class="ao-page-title">Have an old app that's hard to move forward? Let's talk.</h1>
        <p class="ao-sub">
          If you're a <strong>VP Engineering or CTO</strong> responsible for a legacy system — PHP, an old
          framework, a monolith nobody wants to touch — a Pilot is a low-risk way to find out if this approach
          actually fits your situation. It's a fixed scope, usually four to eight weeks, and the first
          conversation is free and short.
        </p>
      </div>
    </section>

    <section class="ao-section">
      <div class="ao-wrap ao-cta-inner" style="text-align:left;max-width:720px;margin:0 auto;">
        <div class="ao-cta-actions" style="justify-content:flex-start;">
          <a class="ao-btn ao-btn-primary" href="mailto:hello@agenticop.io?subject=AgenticOps%20Pilot%20-%20Discovery">Start a Pilot</a>
          <a class="ao-btn ao-btn-ghost" href="https://www.linkedin.com/in/vibe-architect/" target="_blank" rel="noopener">Connect on LinkedIn</a>
          <a class="ao-btn ao-btn-link" href="mailto:hello@agenticop.io?subject=CWL%20-%20Questions">Just have questions? →</a>
        </div>
      </div>
    </section>

    <section class="ao-section ao-section-alt">
      <div class="ao-wrap">
        <p class="ao-kicker">What we actually use</p>
        <h2 class="ao-h2">Nothing exotic.</h2>
        <p class="ao-sub">Tools that are well understood, well tested, and work well alongside AI assistance.</p>
        <div class="ao-stack-grid">
          <div><strong>How we describe apps</strong><span>CWL, WebIR, and the Translation Hub</span></div>
          <div><strong>Where we generate code</strong><span>Node.js — Hono, Fastify, sometimes Next.js</span></div>
          <div><strong>How we prove it works</strong><span>Recorded traffic, side-by-side comparison, gradual rollout</span></div>
          <div><strong>Languages we can read</strong><span>PHP, JavaScript, Python, Java, Go, and more — see the hub for exact coverage</span></div>
          <div><strong>Cloud</strong><span>Google Cloud, Firebase, Cloud Run, GCE</span></div>
          <div><strong>wisptools.io</strong><span>A separate live product we built and run (internet provider operations) — not part of CWL</span></div>
          <div><strong>Mapping / telecom</strong><span>Esri ArcGIS, EPC, HSS, CBRS, SIP, TR-069 — when relevant to a project</span></div>
          <div><strong>AI in the process</strong><span>Agents draft and assist; recorded traffic decides what actually ships</span></div>
        </div>
      </div>
    </section>
  </main>
  """;
}

@page GET "/convert.html"
page convert {
  effects: none;
  nav convert;
  layout site;
  title "Convert · Universal Translator — origin to modern | AgenticOps";
  description "Chrysalis Convert is the Universal Translator: PHP, COBOL, SvelteKit, Express, Java and more → WebIR + CWL → TypeScript, Python, Go, Hono. AI proposes; verify disposes. No façades.";
  canonical "https://agenticop.io/convert.html";
  meta keywords "Universal Translator, Chrysalis Convert, WebIR, CWL, PHP modernization, language pairs, legacy migration";
  meta robots "index, follow, max-image-preview:large, max-snippet:-1";
  meta author "AgenticOps";
  meta theme "#020208";
  meta og type "website";
  meta og site "AgenticOps";
  meta og url "https://agenticop.io/convert.html";
  meta og title "Convert — Universal Translator";
  meta og description "Origin to modern through WebIR + CWL. Translate only. Prove what you claim.";
  meta og image "https://agenticop.io/chrysalis-explainer.png";
  meta twitter card "summary_large_image";
  meta twitter title "Convert — Universal Translator";
  meta twitter description "Languages in → WebIR + CWL → languages out. verified claims when origin is missing.";
  meta twitter image "https://agenticop.io/chrysalis-explainer.png";
  icon logo apple;
  jsonld """
{
    "@context": "https://schema.org",
    "@type": "WebPage",
    "url": "https://agenticop.io/convert.html",
    "name": "Convert — Universal Translator",
    "description": "Chrysalis Convert translates origin stacks through WebIR and CWL to modern targets. Verify disposes; verified claims.",
    "primaryImageOfPage": { "@type": "ImageObject", "url": "https://agenticop.io/chrysalis-explainer.png" },
    "isPartOf": { "@type": "WebSite", "url": "https://agenticop.io/" },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://agenticop.io/" },
        { "@type": "ListItem", "position": 2, "name": "Convert", "item": "https://agenticop.io/convert.html" }
      ]
    }
  }
  """;
  return html """
<main id="main" class="ao-page-main">
    <section class="ao-section ao-page-hero ao-page-hero--brand ao-page-hero--convert">
      <div class="ao-wrap">
        <p class="ao-kicker ao-kicker--loud">Pillar 02 &middot; Convert</p>
        <h1 class="ao-page-title ao-page-title--convert">
          Universal Translator &mdash;
          <span class="ao-grad">old stack in, modern stack out.</span>
        </h1>
        <p class="ao-lead ao-lead--convert">
          Convert peels any origin into one middle (<strong>WebIR + CWL</strong>), then emits a modern target.
          AI can draft the work; <strong>recorded traffic</strong> decides what ships.
          If something cannot be claimed safely, it stays <strong>unproven</strong> &mdash; never a fake finish.
        </p>
        <ol class="ao-flow-strip ao-flow-strip--hero" aria-label="Convert path">
          <li class="ao-flow-step ao-flow-step--cwl">
            <span class="ao-flow-num">01</span>
            <strong>Origins in</strong>
            <span>PHP, Java, Node, &hellip;</span>
          </li>
          <li class="ao-flow-pipe" aria-hidden="true"></li>
          <li class="ao-flow-step ao-flow-step--convert">
            <span class="ao-flow-num">02</span>
            <strong>One middle</strong>
            <span>WebIR + readable CWL</span>
          </li>
          <li class="ao-flow-pipe" aria-hidden="true"></li>
          <li class="ao-flow-step ao-flow-step--ship">
            <span class="ao-flow-num">03</span>
            <strong>Modern out</strong>
            <span>after traffic matches</span>
          </li>
        </ol>
      </div>
    </section>

    <section class="ao-explainer-band" aria-label="Chrysalis Universal Translator diagram">
      <div class="ao-wrap">
        <img
          class="ao-explainer-img"
          src="/chrysalis-explainer.png"
          width="1200"
          height="675"
          alt="Chrysalis Universal Translator: PHP, COBOL, SvelteKit, Express, and Java translate only into WebIR plus CWL, then emit TypeScript, Java, Python, Go, and Hono. LLM proposes; verify disposes. Unproven when origin is missing. No invented runtimes, no demo façades, open path to fidelity."
          loading="eager"
          decoding="async"
        />
      </div>
    </section>

    <section class="ao-section">
      <div class="ao-wrap">
        <p class="ao-kicker">How Convert works</p>
        <h2 class="ao-h2">Translate only. Prove what you claim.</h2>
        <div class="ao-pillars">
          <div class="ao-pillar">
            <span class="ao-pillar-tag">01</span>
            <h3>Origins in</h3>
            <p>PHP, COBOL, SvelteKit, Express, Java, and more enter the same spine — not a one-off converter for every pairing.</p>
          </div>
          <div class="ao-pillar-arrow" aria-hidden="true">→</div>
          <div class="ao-pillar ao-pillar-accent">
            <span class="ao-pillar-tag">02</span>
            <h3>WebIR + CWL</h3>
            <p>Portable IR plus the readable genome. People can audit the lift; machines can emit from one model.</p>
          </div>
          <div class="ao-pillar-arrow" aria-hidden="true">→</div>
          <div class="ao-pillar">
            <span class="ao-pillar-tag">03</span>
            <h3>Modern out</h3>
            <p>TypeScript, Java, Python, Go, Hono, and other targets — only after replay matches recorded traffic.</p>
          </div>
        </div>
        <div class="ao-creed">
          <p><strong>No invented runtimes.</strong> <strong>No demo façades.</strong> <strong>Open path to fidelity.</strong></p>
        </div>

        <h3 class="ao-h3">Owns / does not</h3>
        <div class="ao-prose">
          <p>
            Convert owns peelers, emitters, Hub SPA, oracle harnesses, Pilot Kit, Chimera shell.
            It does <strong>not</strong> own CWL RFCs/golds or the UT DNA spine (<code>smoke:ut-spine</code> lives in chrysalis-cwl).
          </p>
          <ul>
              <li>Flagships: <code>laravel-min</code>, <code>tiny-blog</code></li>
              <li>Pilot Kit: <code>pilot:laravel-min</code>, <code>pilot:cobol-clbs</code> (COBOL inventory / GTM wedge — lives in Convert, not a separate PyPI package)</li>
              <li>Gate: <code>hub:traffic-decides-bar-smoke</code> → <code>TRAFFIC_DECIDES_CONVERT_OK</code></li>
              <li>Residuals stay labeled (Nest / LiveView / Flutter façades catalogued; COBOL EXTFMAP-class holes stay honest)</li>
            </ul>
            <p>
              Paper: <a href="/paper-convert.html">Universal Translator mechanics</a> ·
              COBOL note: <a href="/published.html#cobol">Published · COBOL</a> ·
              <a href="/paper-webir.html">WebIR</a> ·
              Live: <a href="https://hub.agenticop.io/hub/" target="_blank" rel="noopener">hub…/hub/</a>
            </p>
        </div>

        <div class="ao-hero-ctas" style="margin-top:2rem">
          <a class="ao-btn ao-btn-primary" href="https://hub.agenticop.io/#/guide" target="_blank" rel="noopener">Open the Translation Hub</a>
          <a class="ao-btn ao-btn-ghost" href="/paper-convert.html">Technical paper</a>
          <a class="ao-btn ao-btn-link" href="https://github.com/AgenticOp-io/chrysalis" target="_blank" rel="noopener">Convert on GitHub →</a>
        </div>
        <p class="ao-next-page"><a href="/method.html">See the migration method →</a></p>
      </div>
    </section>
  </main>
  """;
}

@page GET "/docs.html"
page docs {
  effects: none;
  nav docs;
  layout site;
  title "Docs — technical papers & references | AgenticOps";
  description "Technical documentation for Chrysalis: CWL tip 1.0.80 complete site, WebIR, Convert, Helix, traffic-decides bar, RFCs, and project references.";
  canonical "https://agenticop.io/docs.html";
  meta robots "index, follow";
  meta og title "Docs — AgenticOps";
  meta og description "Whitepapers and technical references. CWL is flagship.";
  meta og url "https://agenticop.io/docs.html";
  meta og image "https://agenticop.io/cwl-explainer.png";
  icon logo;
  return html """
<main id="main" class="ao-page-main ao-doc">
    <section class="ao-section ao-page-hero ao-page-hero--brand">
      <div class="ao-wrap ao-wrap--doc">
        <p class="ao-kicker ao-kicker--loud">Documentation</p>
        <h1 class="ao-page-title">Technical papers</h1>
        <p class="ao-lead ao-lead--doc">
          CWL is the flagship. Everything else consumes it or proves against traffic.
          These pages are the public technical record — RFCs, surfaces, gates, residuals —
          not a product brochure.
        </p>
        <div class="ao-cta-actions">
          <a class="ao-btn ao-btn-primary" href="/paper-cwl.html">CWL language paper</a>
          <a class="ao-btn ao-btn-ghost" href="/whitepaper.html">System overview</a>
          <a class="ao-btn ao-btn-link" href="https://github.com/AgenticOp-io/chrysalis-cwl" target="_blank" rel="noopener">chrysalis-cwl &rarr;</a>
        </div>
      </div>
    </section>

    <section class="ao-section">
      <div class="ao-wrap ao-wrap--doc">
        <p class="ao-kicker">Flagship</p>
        <h2 class="ao-h2">CWL first</h2>
        <div class="ao-project-list" role="list">
          <article class="ao-project" role="listitem">
            <div class="ao-project-top">
              <div>
                <h3 class="ao-project-name"><a href="/paper-cwl.html">CWL — language whitepaper</a></h3>
                <p class="ao-project-desc">From code: packages, parser AST, golds 01–86 (site shell through complete marketing genome), RFCs, dna-seed, diagnose, <code>smoke:ut-spine</code>, <code>emit:site</code>.</p>
              </div>
              <span class="ao-pill ao-pill-live">1.0.78</span>
            </div>
            <div class="ao-project-actions">
              <a class="ao-btn ao-btn-primary" href="/paper-cwl.html">Read</a>
              <a class="ao-btn ao-btn-ghost" href="/chrysalis.html">Product page</a>
            </div>
          </article>
          <article class="ao-project" role="listitem">
            <div class="ao-project-top">
              <div>
                <h3 class="ao-project-name"><a href="/paper-webir.html">WebIR &amp; Rosetta whitepaper</a></h3>
                <p class="ao-project-desc">From code: <code>@chrysalis/webir</code> 2.0.2, ingest/emit/verify lanes, core vs peel, DNA fingerprints, Hub grades.</p>
              </div>
            </div>
            <div class="ao-project-actions">
              <a class="ao-btn ao-btn-primary" href="/paper-webir.html">Read</a>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="ao-section ao-section-alt">
      <div class="ao-wrap ao-wrap--doc">
        <p class="ao-kicker">Pillars</p>
        <h2 class="ao-h2">Convert · Secure · shared bar</h2>
        <div class="ao-project-list" role="list">
          <article class="ao-project" role="listitem">
            <div class="ao-project-top">
              <div>
                <h3 class="ao-project-name"><a href="/paper-convert.html">Convert — Universal Translator whitepaper</a></h3>
                <p class="ao-project-desc">From code: Hub :19090, peel/emit modules, oracle TraceCorpus, D6448 residual ledger, COBOL EXTFMAP, Pilot Kit.</p>
              </div>
            </div>
            <div class="ao-project-actions">
              <a class="ao-btn ao-btn-primary" href="/paper-convert.html">Read</a>
              <a class="ao-btn ao-btn-ghost" href="/convert.html">Product page</a>
            </div>
          </article>
          <article class="ao-project" role="listitem">
            <div class="ao-project-top">
              <div>
                <h3 class="ao-project-name"><a href="/paper-helix.html">Helix — traffic DNA whitepaper</a></h3>
                <p class="ao-project-desc">From code: <code>helix-proxy</code>/<code>dna-core</code>, app-dna-v1 schema, HX-* codes, seed-cwl/cutover CLI, signed DNA, NGFW placement.</p>
              </div>
            </div>
            <div class="ao-project-actions">
              <a class="ao-btn ao-btn-primary" href="/paper-helix.html">Read</a>
              <a class="ao-btn ao-btn-ghost" href="/secure.html">Product page</a>
            </div>
          </article>
          <article class="ao-project" role="listitem">
            <div class="ao-project-top">
              <div>
                <h3 class="ao-project-name"><a href="/paper-traffic.html">Traffic decides — bar whitepaper</a></h3>
                <p class="ao-project-desc">From code: bar gates, <code>smoke:ut-spine</code> exact steps, declared vs observed, command-token table, soak residual.</p>
              </div>
            </div>
            <div class="ao-project-actions">
              <a class="ao-btn ao-btn-primary" href="/paper-traffic.html">Read</a>
              <a class="ao-btn ao-btn-ghost" href="/proof.html">Proof page</a>
            </div>
          </article>
          <article class="ao-project" role="listitem">
            <div class="ao-project-top">
              <div>
                <h3 class="ao-project-name"><a href="/whitepaper.html">System overview</a></h3>
                <p class="ao-project-desc">How the three pillars fit: architecture, loop, non-goals, platforms.</p>
              </div>
            </div>
            <div class="ao-project-actions">
              <a class="ao-btn ao-btn-primary" href="/whitepaper.html">Read</a>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="ao-section">
      <div class="ao-wrap ao-wrap--doc">
        <p class="ao-kicker">Also</p>
        <h2 class="ao-h2">Method, trust, projects</h2>
        <ul class="ao-bullets ao-bullets--doc">
          <li><a href="/method.html">Method</a> — watch → write DNA → emit → verify → cut over.</li>
          <li><a href="/trust.html">Trust</a> — standing bar in short form.</li>
          <li><a href="/published.html">Published work</a> — every public repo, host, PyPI, Zenodo DOI, COBOL note.</li>
          <li><a href="/press.html">Press</a> — CWL tip 1.0.80 complete site on Firebase; open-source catalog.</li>
          <li><a href="/projects.html">Projects catalog</a> — narrative index of surfaces.</li>
          <li><a href="/llms.txt">llms.txt</a> — machine digest.</li>
          <li>Repo docs (language source of truth):
            <a href="https://github.com/AgenticOp-io/chrysalis-cwl" target="_blank" rel="noopener">chrysalis-cwl</a>
            <code>docs/language/</code>.</li>
        </ul>
      </div>
    </section>
  </main>
  """;
}

@page GET "/fde.html"
page fde {
  effects: none;
  nav projects;
  layout site;
  title "Fragility Discovery Engine | AgenticOps";
  description "FDE v0.6.7: directed search over discrete-time simulations, evidence contracts, CLI and workbench at fragility.agenticop.io.";
  canonical "https://agenticop.io/fde.html";
  meta og title "Fragility Discovery Engine";
  meta og url "https://agenticop.io/fde.html";
  icon logo;
  return html """
<main id="main" class="ao-page-main ao-doc">
    <section class="ao-section ao-page-hero ao-page-hero--brand">
      <div class="ao-wrap ao-wrap--doc">
        <p class="ao-kicker">Evidence · search</p>
        <h1 class="ao-page-title">Fragility Discovery Engine</h1>
        <p class="ao-lead ao-lead--doc">
          Directed search (Monte Carlo / GA) over discrete-time simulations (+ BYOW).
          Exports replay schedules, minimized scenarios, and counterfactual attribution.
          Not a calibrated institutional risk model — a deterministic stress harness with JSON evidence contracts.
        </p>
        <div class="ao-cta-actions">
          <a class="ao-btn ao-btn-primary" href="https://fragility.agenticop.io/" target="_blank" rel="noopener">Workbench</a>
          <a class="ao-btn ao-btn-ghost" href="https://github.com/AgenticOp-io/fragility-discovery-engine" target="_blank" rel="noopener">GitHub</a>
          <a class="ao-btn ao-btn-link" href="https://pypi.org/project/fragility-engine/" target="_blank" rel="noopener">PyPI &rarr;</a>
        </div>
        <p class="ao-doc-meta"><a href="/projects.html">Projects</a> · v0.6.7 · CPython ≥ 3.11</p>
      </div>
    </section>

    <article class="ao-doc-body">
      <section class="ao-section">
        <div class="ao-wrap ao-wrap--doc">
          <h2 class="ao-h2">CLI surface</h2>
          <div class="ao-prose">
            <p><code>fragility search | illuminate | differential | falsify | certify</code></p>
            <ul>
              <li>Workbench: <a href="https://fragility.agenticop.io/" target="_blank" rel="noopener">fragility.agenticop.io</a> — browse-first; live runs API-key gated.</li>
              <li>Demo guide: <a href="https://fragility.agenticop.io/docs/demo-guide.html" target="_blank" rel="noopener">demo-guide.html</a></li>
              <li>GH Pages: <a href="https://agenticop-io.github.io/fragility-discovery-engine/" target="_blank" rel="noopener">static mirror</a></li>
              <li>Release: <a href="https://github.com/AgenticOp-io/fragility-discovery-engine/releases/tag/v0.6.7" target="_blank" rel="noopener">v0.6.7</a></li>
              <li>PyPI: <a href="https://pypi.org/project/fragility-engine/" target="_blank" rel="noopener">fragility-engine</a></li>
              <li>Own lane — not a Chrysalis pillar.</li>
            </ul>
          </div>
          <h3 class="ao-h3">Citation (Zenodo)</h3>
          <div class="ao-prose">
            <p>
              Author: David Peterson. Prefer concept DOI
              <a href="https://doi.org/10.5281/zenodo.20455688" target="_blank" rel="noopener">10.5281/zenodo.20455688</a>
              (FEL / FDE). FEL snapshot
              <a href="https://doi.org/10.5281/zenodo.20455689" target="_blank" rel="noopener">10.5281/zenodo.20455689</a>
              (<code>fel-v0.1.1</code>). Version DOIs 0.6.0–0.6.5 on Zenodo; full list on
              <a href="/published.html#fde">Published</a>. Machine cite: repo <code>CITATION.cff</code>.
            </p>
          </div>
        </div>
      </section>
    </article>
  </main>
  """;
}

@page GET "/field.html"
page field {
  effects: none;
  nav projects;
  layout site;
  title "Lane & PathfinderSSH MSP | AgenticOps";
  description "Lane last-mile plane and PathfinderSSH MSP fork. Upstream PathfinderSSH is Scott Peterman’s — AgenticOps does not claim it.";
  canonical "https://agenticop.io/field.html";
  meta og title "Lane & PathfinderSSH MSP";
  meta og url "https://agenticop.io/field.html";
  icon logo;
  return html """
<main id="main" class="ao-page-main ao-doc">
    <section class="ao-section ao-page-hero ao-page-hero--brand">
      <div class="ao-wrap ao-wrap--doc">
        <p class="ao-kicker">Field · SSH</p>
        <h1 class="ao-page-title">Lane and PathfinderSSH MSP</h1>
        <p class="ao-lead ao-lead--doc">
          Attribution first:
          <a href="https://github.com/scottpeterman/pathfinderssh" target="_blank" rel="noopener">PathfinderSSH</a>
          (upstream) is Scott Peterman’s project. AgenticOps maintains
          <strong>PathfinderSSH MSP</strong> and <strong>Lane</strong>. GPL-3.0 derivatives.
          Tracking fork for upstream PRs: <code>AgenticOp-io/pathfinderssh</code> — not product ownership.
        </p>
        <p class="ao-doc-meta"><a href="/projects.html">Projects</a></p>
      </div>
    </section>

    <article class="ao-doc-body">
      <section class="ao-section">
        <div class="ao-wrap ao-wrap--doc">
          <h2 class="ao-h2">Lane</h2>
          <div class="ao-prose">
            <p>
              Last-mile plane: keep CRT / PuTTY / OpenSSH in the operator workflow.
              Learned host→VPN path. CLI: <code>lane</code>.
              Repo: <a href="https://github.com/AgenticOp-io/lane" target="_blank" rel="noopener">AgenticOp-io/lane</a>.
            </p>
          </div>
        </div>
      </section>

      <section id="msp" class="ao-section ao-section-alt">
        <div class="ao-wrap ao-wrap--doc">
          <h2 class="ao-h2">PathfinderSSH MSP</h2>
          <div class="ao-prose">
            <p>
              MSP-oriented fork packaging: ops desk surfaces, PSA/RMM hooks, CRT import paths, incident bind.
              Repo: <a href="https://github.com/AgenticOp-io/pathfinderssh-msp" target="_blank" rel="noopener">AgenticOp-io/pathfinderssh-msp</a>.
            </p>
            <p>
              These are not Chrysalis pillars. They sit beside the CWL direction as field tooling —
              useful, attributed, separate.
            </p>
          </div>
        </div>
      </section>
    </article>
  </main>
  """;
}

@page GET "/ghosts.html"
page ghosts {
  effects: none;
  nav projects;
  layout site;
  title "Ghost Museum — still-answering hall | AgenticOps";
  description "Ghost Museum: public hall of interfaces that outlived their obituaries. Evidence of incomplete sunsets — not a scanner or exploit kit.";
  canonical "https://agenticop.io/ghosts.html";
  meta og title "Ghost Museum";
  meta og url "https://agenticop.io/ghosts.html";
  icon logo;
  return html """
<main id="main" class="ao-page-main ao-doc">
    <section class="ao-section ao-page-hero ao-page-hero--brand">
      <div class="ao-wrap ao-wrap--doc">
        <p class="ao-kicker">Evidence · hall</p>
        <h1 class="ao-page-title">Ghost Museum</h1>
        <p class="ao-lead ao-lead--doc">
          Interfaces that still answer after their obituaries.
          Census of hung and candidate endpoints; walls for still-answering, auth ghosts, successor façades, buried, banished.
          GET-only hunt. Not a Chrysalis addon. Do not integrate as a product dependency.
        </p>
        <div class="ao-cta-actions">
          <a class="ao-btn ao-btn-primary" href="https://ghosts.agenticop.io/" target="_blank" rel="noopener">Open hall</a>
          <a class="ao-btn ao-btn-ghost" href="https://github.com/AgenticOp-io/ghost-museum" target="_blank" rel="noopener">GitHub</a>
        </div>
        <p class="ao-doc-meta"><a href="/projects.html">Projects</a></p>
      </div>
    </section>

    <article class="ao-doc-body">
      <section class="ao-section">
        <div class="ao-wrap ao-wrap--doc">
          <h2 class="ao-h2">What it is / is not</h2>
          <div class="ao-prose">
            <ul>
              <li><strong>Is:</strong> public evidence hall; hang/curate/authority loops; incomplete sunset as a first-class phenomenon.</li>
              <li><strong>Is not:</strong> exploit kit, mass scanner product, Helix replacement, or Convert plugin.</li>
            </ul>
            <p>Live: <a href="https://ghosts.agenticop.io/" target="_blank" rel="noopener">ghosts.agenticop.io</a>.</p>
          </div>
        </div>
      </section>
    </article>
  </main>
  """;
}

@page GET "/hub.html"
page hub {
  effects: none;
  nav hub;
  layout site;
  title "Hub · Projects & hostnames · AgenticOps";
  description "AgenticOps projects: Chrysalis Translation Hub, Fragility Discovery Engine workbench, corporate site, and operator endpoints.";
  canonical "https://agenticop.io/hub.html";
  meta theme "#020208";
  meta og url "https://agenticop.io/hub.html";
  meta og title "Hub · AgenticOps project directory";
  meta og description "One branded list of live hostnames — Translation Hub, FDE workbench, corporate site, and operator endpoints.";
  meta og image "https://agenticop.io/logo.svg";
  icon logo;
  return html """
<main class="ao-page-main">
    <section class="ao-section ao-page-hero">
      <div class="ao-wrap">
        <p class="ao-kicker">Hub</p>
        <h1 class="ao-page-title">Projects on the AgenticOps network.</h1>
        <p class="ao-sub">
          One GCE host runs two products:
          <a href="https://chrysalis.agenticop.io/">Chrysalis Translation Hub</a>
          and the
          <a href="https://fragility.agenticop.io/">Fragility Discovery Engine</a>
          workbench. Prefer HTTPS names; IP links are operator fallbacks.
        </p>
        <div class="ao-hero-ctas" style="margin-top:1.25rem">
          <a class="ao-btn ao-btn-primary" href="https://hub.agenticop.io/">Open project directory</a>
          <a class="ao-btn ao-btn-ghost" href="https://chrysalis.agenticop.io/">Chrysalis</a>
          <a class="ao-btn ao-btn-ghost" href="https://fragility.agenticop.io/">FDE workbench</a>
        </div>
      </div>
    </section>

    <section class="ao-section ao-section-alt">
      <div class="ao-wrap">
        <p class="ao-kicker">Directory</p>
        <h2 class="ao-h2">Hostnames and endpoints</h2>
        <p class="ao-sub">Prefer HTTPS hostnames in the browser. Raw IP links are operator fallbacks on the same GCE box.</p>

        <div class="ao-project-list" role="list">
          <article class="ao-project" role="listitem">
            <div class="ao-project-top">
              <div>
                <h3 class="ao-project-name">Chrysalis Translation Hub</h3>
                <p class="ao-project-desc">
                  Demo and operator surface for CWL, WebIR, and cross-language paths.
                  Start at the guide; open the hub app for live translation work.
                </p>
              </div>
              <span class="ao-pill ao-pill-live">Live · HTTPS</span>
            </div>
            <p class="ao-project-host">
              <a href="https://chrysalis.agenticop.io/" target="_blank" rel="noopener">chrysalis.agenticop.io</a>
            </p>
            <div class="ao-project-actions">
              <a class="ao-btn ao-btn-primary" href="https://chrysalis.agenticop.io/" target="_blank" rel="noopener">Open Chrysalis</a>
              <a class="ao-btn ao-btn-ghost" href="https://chrysalis.agenticop.io/#/guide" target="_blank" rel="noopener">Guide</a>
              <a class="ao-btn ao-btn-link" href="https://hub.agenticop.io/hub/" target="_blank" rel="noopener">via hub…/hub/ →</a>
              <a class="ao-btn ao-btn-link" href="https://github.com/AgenticOp-io/chrysalis-cwl" target="_blank" rel="noopener">CWL →</a>
              <a class="ao-btn ao-btn-link" href="https://github.com/AgenticOp-io/chrysalis" target="_blank" rel="noopener">Convert →</a>
              <a class="ao-btn ao-btn-link" href="https://github.com/AgenticOp-io/chrysalis-security" target="_blank" rel="noopener">Secure →</a>
            </div>
          </article>

          <article class="ao-project" role="listitem">
            <div class="ao-project-top">
              <div>
                <h3 class="ao-project-name">Fragility Discovery Engine</h3>
                <p class="ao-project-desc">
                  Stress-search workbench — scenarios, replays, Pareto charts, and evidence samples.
                  Browse-first; live runs are API-key gated.
                </p>
              </div>
              <span class="ao-pill ao-pill-live">Live · HTTPS</span>
            </div>
            <p class="ao-project-host">
              <a href="https://fragility.agenticop.io/" target="_blank" rel="noopener">fragility.agenticop.io</a>
            </p>
            <div class="ao-project-actions">
              <a class="ao-btn ao-btn-primary" href="https://fragility.agenticop.io/" target="_blank" rel="noopener">Open workbench</a>
              <a class="ao-btn ao-btn-ghost" href="https://fragility.agenticop.io/docs/demo-guide.html" target="_blank" rel="noopener">Demo guide</a>
              <a class="ao-btn ao-btn-link" href="https://github.com/AgenticOp-io/fragility-discovery-engine" target="_blank" rel="noopener">GitHub →</a>
              <a class="ao-btn ao-btn-link" href="https://pypi.org/project/fragility-engine/" target="_blank" rel="noopener">PyPI →</a>
            </div>
          </article>

          <article class="ao-project" role="listitem">
            <div class="ao-project-top">
              <div>
                <h3 class="ao-project-name">WPTP platforms</h3>
                <p class="ao-project-desc">
                  Public IR hub, OpenAPI/HAR adapters, Next/Hono/Fastify emitters, and the compatibility matrix —
                  the convert orbit packages under AgenticOp-io.
                </p>
              </div>
              <span class="ao-pill ao-pill-live">Open source</span>
            </div>
            <p class="ao-project-host">
              <a href="https://github.com/AgenticOp-io/wptp-ir" target="_blank" rel="noopener">wptp-ir</a>
              · <a href="https://github.com/AgenticOp-io/wptp-matrix" target="_blank" rel="noopener">wptp-matrix</a>
            </p>
            <div class="ao-project-actions">
              <a class="ao-btn ao-btn-ghost" href="https://github.com/AgenticOp-io/wptp-ir" target="_blank" rel="noopener">IR hub</a>
              <a class="ao-btn ao-btn-ghost" href="https://github.com/AgenticOp-io/wptp-matrix" target="_blank" rel="noopener">Matrix</a>
              <a class="ao-btn ao-btn-link" href="https://github.com/AgenticOp-io?q=wptp-&amp;type=all" target="_blank" rel="noopener">All wptp-* →</a>
            </div>
          </article>

          <article class="ao-project" role="listitem">
            <div class="ao-project-top">
              <div>
                <h3 class="ao-project-name">Ghost Museum</h3>
                <p class="ao-project-desc">
                  Hall of interfaces that outlived their obituaries. Evidence of incomplete sunsets —
                  not a scanner and not something to integrate.
                </p>
              </div>
              <span class="ao-pill ao-pill-live">Open source</span>
            </div>
            <p class="ao-project-host">
              <a href="https://ghosts.agenticop.io/" target="_blank" rel="noopener">ghosts.agenticop.io</a>
            </p>
            <div class="ao-project-actions">
              <a class="ao-btn ao-btn-primary" href="https://ghosts.agenticop.io/" target="_blank" rel="noopener">Open hall</a>
              <a class="ao-btn ao-btn-link" href="https://github.com/AgenticOp-io/ghost-museum" target="_blank" rel="noopener">GitHub →</a>
            </div>
          </article>

          <article class="ao-project" role="listitem">
            <div class="ao-project-top">
              <div>
                <h3 class="ao-project-name">Corporate site</h3>
                <p class="ao-project-desc">
                  AgenticOps marketing and method pages — CWL story, services, proof, and contact.
                  Hosted on Firebase (project <code>agenticop-io</code>).
                </p>
              </div>
              <span class="ao-pill ao-pill-live">Live · HTTPS</span>
            </div>
            <p class="ao-project-host">
              <a href="https://agenticop.io/">agenticop.io</a>
            </p>
            <div class="ao-project-actions">
              <a class="ao-btn ao-btn-ghost" href="/">Home</a>
              <a class="ao-btn ao-btn-link" href="/contact.html">Start a Pilot →</a>
            </div>
          </article>

          <article class="ao-project" role="listitem">
            <div class="ao-project-top">
              <div>
                <h3 class="ao-project-name">Operator fallbacks</h3>
                <p class="ao-project-desc">
                  Raw IP endpoints when DNS or TLS is mid-change. Prefer the HTTPS names above for normal use.
                </p>
              </div>
              <span class="ao-pill ao-pill-live">Live · HTTP</span>
            </div>
            <p class="ao-project-host">
              FDE: <a href="http://34.61.255.147/" target="_blank" rel="noopener">34.61.255.147</a>
              · Hub: <a href="http://34.61.255.147:19090/" target="_blank" rel="noopener">34.61.255.147:19090</a>
            </p>
            <div class="ao-project-actions">
              <a class="ao-btn ao-btn-ghost" href="http://34.61.255.147/" target="_blank" rel="noopener">FDE IP</a>
              <a class="ao-btn ao-btn-ghost" href="http://34.61.255.147:19090/" target="_blank" rel="noopener">Hub direct</a>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="ao-section">
      <div class="ao-wrap">
        <p class="ao-kicker">Same GCE instance</p>
        <h2 class="ao-h2">How the box is laid out</h2>
        <p class="ao-sub">One machine, two public product surfaces, plus the corporate site elsewhere.</p>
        <div class="ao-stack-grid">
          <div>
            <strong>Project directory</strong>
            <span>hub.agenticop.io/</span>
          </div>
          <div>
            <strong>Chrysalis</strong>
            <span>chrysalis.agenticop.io → Translation Hub</span>
          </div>
          <div>
            <strong>Hub path</strong>
            <span>hub.agenticop.io/hub/ → same app</span>
          </div>
          <div>
            <strong>FDE workbench</strong>
            <span>fragility.agenticop.io · HTTPS</span>
          </div>
          <div>
            <strong>Corporate</strong>
            <span>agenticop.io · Firebase Hosting</span>
          </div>
          <div>
            <strong>Source</strong>
            <span>github.com/AgenticOp-io</span>
          </div>
        </div>
        <p class="ao-next-page"><a href="/proof.html">See proof &amp; open-source engines →</a></p>
      </div>
    </section>
  </main>
  """;
}

@page GET "/method.html"
page method {
  effects: none;
  nav method;
  layout site;
  title "Method · Traffic-proven migration through CWL DNA | AgenticOps";
  description "Record real traffic, describe the app in CWL (DNA of the web), let Convert translate, verify answers, then cut over carefully. AI drafts — traffic decides.";
  canonical "https://agenticop.io/method.html";
  meta theme "#020208";
  meta robots "index, follow, max-image-preview:large, max-snippet:-1";
  meta author "AgenticOps";
  meta og type "website";
  meta og site "AgenticOps";
  meta og url "https://agenticop.io/method.html";
  meta og title "Method · AgenticOps";
  meta og description "Record real traffic, describe the app in CWL, Convert translates, traffic decides what ships.";
  meta og image "https://agenticop.io/logo.svg";
  icon logo apple;
  return html """
<main class="ao-page-main">
    <section class="ao-section ao-page-hero ao-page-hero--brand">
      <div class="ao-wrap">
        <p class="ao-kicker">Method</p>
        <h1 class="ao-page-title">Watch. Write DNA. Translate. Prove. Ship.</h1>
        <p class="ao-sub ao-sub--wide">
          Every stack peels into one genome &mdash; <strong>CWL</strong>.
          <strong>Convert</strong> and <strong>Secure</strong> consume it. <strong>Recorded traffic</strong> decides what ships.
          AI drafts; unproven claims stay unlabeled.
        </p>
        <ol class="ao-flow-strip" aria-label="Method spine" style="border-top:none;padding-top:8px;width:min(100%,920px)">
          <li class="ao-flow-step ao-flow-step--cwl"><strong>Watch</strong><span>traffic</span></li>
          <li class="ao-flow-pipe" aria-hidden="true"></li>
          <li class="ao-flow-step ao-flow-step--convert"><strong>Write</strong><span>CWL</span></li>
          <li class="ao-flow-pipe" aria-hidden="true"></li>
          <li class="ao-flow-step ao-flow-step--secure"><strong>Verify</strong><span>replay</span></li>
          <li class="ao-flow-pipe" aria-hidden="true"></li>
          <li class="ao-flow-step ao-flow-step--ship"><strong>Cut over</strong><span>careful</span></li>
        </ol>
      </div>
    </section>
    <section class="ao-section ao-section-alt">
      <div class="ao-wrap">
        <p class="ao-kicker">Genome in the middle</p>
        <h2 class="ao-h2">Three moves. One DNA.</h2>
        <div class="ao-storyboard">
          <article class="ao-story-panel ao-story-panel--genome">
            <div class="ao-story-art" aria-hidden="true">
              <svg viewBox="0 0 200 140" fill="none">
                <path d="M40 30h50M40 55h70M40 80h40M40 105h55" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>
                <rect x="128" y="42" width="48" height="56" rx="8" stroke="currentColor" stroke-width="2.2"/>
                <path d="M140 62h24M140 78h18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              </svg>
            </div>
            <h3>Write it in CWL</h3>
            <p>Routes, handlers, Effects &mdash; only what we can claim yet.</p>
          </article>
          <article class="ao-story-panel ao-story-panel--middle">
            <div class="ao-story-art" aria-hidden="true">
              <svg viewBox="0 0 200 140" fill="none">
                <rect x="20" y="40" width="44" height="60" rx="8" stroke="currentColor" stroke-width="2"/>
                <rect x="136" y="40" width="44" height="60" rx="8" stroke="currentColor" stroke-width="2"/>
                <rect x="78" y="52" width="44" height="36" rx="8" stroke="currentColor" stroke-width="2.2"/>
                <path d="M64 70h14M122 70h14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              </svg>
            </div>
            <h3>WebIR middle</h3>
            <p>Peel once, emit many. No special-case translator for every language pair.</p>
          </article>
          <article class="ao-story-panel ao-story-panel--traffic">
            <div class="ao-story-art" aria-hidden="true">
              <svg viewBox="0 0 200 140" fill="none">
                <path d="M30 100c25-55 55-55 70 0s50 55 70 0" stroke="currentColor" stroke-width="2.2"/>
                <rect x="55" y="28" width="90" height="26" rx="8" stroke="currentColor" stroke-width="2"/>
                <text x="72" y="46" fill="currentColor" font-size="12" font-family="ui-monospace,monospace">match?</text>
              </svg>
            </div>
            <h3>Traffic decides</h3>
            <p>Replay recorded production behavior. Mismatch = no ship &mdash; human or AI authored.</p>
          </article>
        </div>
      </div>
    </section>
    <section class="ao-section">
      <div class="ao-wrap">
        <p class="ao-kicker">Six stages</p>
        <h2 class="ao-h2">The process, start to finish.</h2>
        <p class="ao-sub">Same spine for every origin language &mdash; depth of testing varies by pair (see the Hub).</p>
        <ol class="ao-brand-rail">
          <li class="ao-brand-rail-item">
            <span class="ao-brand-rail-icon" aria-hidden="true"><svg viewBox="0 0 36 36" fill="none"><circle cx="18" cy="18" r="10" stroke="currentColor" stroke-width="2"/><circle cx="18" cy="18" r="3" fill="currentColor"/></svg></span>
            <span class="ao-brand-rail-num">01 &middot; Watch</span>
            <h3>Record reality</h3>
            <p>Capture real requests, effects, and responses. That tape is the oracle &mdash; not a design memo.</p>
          </li>
          <li class="ao-brand-rail-item">
            <span class="ao-brand-rail-icon" aria-hidden="true"><svg viewBox="0 0 36 36" fill="none"><path d="M8 10h20M8 18h14M8 26h18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg></span>
            <span class="ao-brand-rail-num">02 &middot; Read</span>
            <h3>Peel to WebIR</h3>
            <p>Origin code to shared model. Or author routes directly in CWL when greenfield.</p>
          </li>
          <li class="ao-brand-rail-item">
            <span class="ao-brand-rail-icon" aria-hidden="true"><svg viewBox="0 0 36 36" fill="none"><circle cx="12" cy="14" r="5" stroke="currentColor" stroke-width="2"/><circle cx="24" cy="22" r="5" stroke="currentColor" stroke-width="2"/><path d="M16 16l4 4" stroke="currentColor" stroke-width="2"/></svg></span>
            <span class="ao-brand-rail-num">03 &middot; Draft</span>
            <h3>AI proposes</h3>
            <p>Agents suggest CWL and emits, flag uncertainty, reuse proven patterns (Intelligence Shorthand).</p>
          </li>
          <li class="ao-brand-rail-item">
            <span class="ao-brand-rail-icon" aria-hidden="true"><svg viewBox="0 0 36 36" fill="none"><rect x="7" y="8" width="10" height="20" rx="2" stroke="currentColor" stroke-width="2"/><path d="M20 18h8M24 14l4 4-4 4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg></span>
            <span class="ao-brand-rail-num">04 &middot; Emit</span>
            <h3>Real code out</h3>
            <p>Modern stack (Hono / Fastify / etc.) or CWL for review. Unsure pieces stay unproven — never façades.</p>
          </li>
          <li class="ao-brand-rail-item">
            <span class="ao-brand-rail-icon" aria-hidden="true"><svg viewBox="0 0 36 36" fill="none"><path d="M8 26c6-14 14-14 20 0" stroke="currentColor" stroke-width="2"/><path d="M12 18l4 4 8-10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg></span>
            <span class="ao-brand-rail-num">05 &middot; Verify</span>
            <h3>Replay the tape</h3>
            <p>Side-by-side against step one. Same bar for AI drafts and human edits.</p>
          </li>
          <li class="ao-brand-rail-item">
            <span class="ao-brand-rail-icon" aria-hidden="true"><svg viewBox="0 0 36 36" fill="none"><path d="M18 6l10 4v8c0 8-4 12-10 14S8 26 8 18V10l10-4z" stroke="currentColor" stroke-width="2"/></svg></span>
            <span class="ao-brand-rail-num">06 &middot; Cut over</span>
            <h3>Side by side</h3>
            <p>Mirror, then slice, then more. Any route rolls back the moment something looks wrong.</p>
          </li>
        </ol>
        <p class="ao-next-page"><a href="/proof.html">See what works today &rarr;</a></p>
      </div>
    </section>
  </main>
  """;
}

@page GET "/paper-convert.html"
page paper_convert {
  effects: none;
  nav docs;
  layout site;
  title "Convert whitepaper — Universal Translator | AgenticOps";
  description "From code: Hub :19090, peel/emit modules, oracle TraceCorpus, D6448 residual ledger, COBOL EXTFMAP, Pilot Kit tokens, CWL junctions.";
  canonical "https://agenticop.io/paper-convert.html";
  meta og title "Convert — Universal Translator whitepaper";
  meta og url "https://agenticop.io/paper-convert.html";
  meta og image "https://agenticop.io/chrysalis-explainer.png";
  icon logo;
  return html """
<main id="main" class="ao-page-main ao-doc">
    <section class="ao-section ao-page-hero ao-page-hero--brand ao-page-hero--convert">
      <div class="ao-wrap ao-wrap--doc">
        <p class="ao-kicker ao-kicker--loud">Whitepaper · Convert · from code</p>
        <h1 class="ao-page-title">Universal Translator</h1>
        <p class="ao-lead ao-lead--doc">
          Repo <a href="https://github.com/AgenticOp-io/chrysalis" target="_blank" rel="noopener">AgenticOp-io/chrysalis</a>
          · lane <code>engines/chrysalis-convert</code> (junction <code>PHP_converter</code>).
          Hub SPA on <code>:19090</code> / <a href="https://hub.agenticop.io/hub/" target="_blank" rel="noopener">hub.agenticop.io/hub/</a>.
          Models propose; WebIR + oracle + verify dispose. Convert does not own CWL grammar or <code>smoke:ut-spine</code>.
        </p>
        <p class="ao-doc-meta"><a href="/docs.html">Docs</a> · <a href="/convert.html">Product</a> · <a href="/paper-cwl.html">CWL</a> · <a href="/paper-webir.html">WebIR</a></p>
      </div>
    </section>

    <nav class="ao-doc-toc" aria-label="On this page">
      <div class="ao-wrap ao-wrap--doc">
        <p class="ao-doc-toc-label">On this page</p>
        <ol>
          <li><a href="#job">Job</a></li>
          <li><a href="#hub">Hub</a></li>
          <li><a href="#laws">Laws</a></li>
          <li><a href="#loop">Correctness loop</a></li>
          <li><a href="#pipeline">Peel / emit</a></li>
          <li><a href="#oracle">Oracle &amp; verify</a></li>
          <li><a href="#complete">Complete conversion</a></li>
          <li><a href="#cobol">COBOL</a></li>
          <li><a href="#cwl">CWL consume</a></li>
          <li><a href="#pilots">Pilot Kit</a></li>
          <li><a href="#owns">Owns / does not</a></li>
          <li><a href="#gates">Gates</a></li>
        </ol>
      </div>
    </nav>

    <article class="ao-doc-body">
      <section id="job" class="ao-section">
        <div class="ao-wrap ao-wrap--doc">
          <h2 class="ao-h2">Job</h2>
          <div class="ao-prose">
            <p>
              AI-assisted Universal Translator for the web (canon D6438): peel origin stacks into
              WebIR/CWL, emit modern targets, grow under Chimera — never one-shot dump trust.
              Four layers: engine · CWL hub · intelligence (propose only) · Hub ops / evidence.
              Adoption wedge historically: PHP → TypeScript (Hono / Fastify / Next).
              The 601/601 matrix is an <strong>oracle-product census</strong>, not “every stack rewritten.”
            </p>
          </div>
        </div>
      </section>

      <section id="hub" class="ao-section ao-section-alt">
        <div class="ao-wrap ao-wrap--doc">
          <h2 class="ao-h2">Hub architecture</h2>
          <div class="ao-doc-table-wrap" tabindex="0">
            <table class="ao-doc-table">
              <thead><tr><th>Piece</th><th>Fact</th></tr></thead>
              <tbody>
                <tr><th scope="row">Server</th><td><code>scripts/chrysalis-operator-web.mjs</code> — REST + SSE</td></tr>
                <tr><th scope="row">Port</th><td><code>CHRYSALIS_OPERATOR_PORT</code> ‖ <strong>19090</strong></td></tr>
                <tr><th scope="row">Start</th><td><code>pnpm run hub:serve</code></td></tr>
                <tr><th scope="row">Data</th><td><code>~/.chrysalis-hub/projects.json</code>, workspaces under <code>~/.chrysalis-hub/workspaces/</code></td></tr>
                <tr><th scope="row">Parallelism</th><td><code>CHRYSALIS_HUB_MAX_PARALLEL</code> (default 3)</td></tr>
                <tr><th scope="row">Auth</th><td><code>CHRYSALIS_OPERATOR_TOKEN</code> Bearer for writes</td></tr>
                <tr><th scope="row">Public</th><td>nginx <code>/hub/</code> → <code>127.0.0.1:19090</code></td></tr>
              </tbody>
            </table>
          </div>
          <div class="ao-prose">
            <p>
              API examples: <code>POST …/sites</code>, <code>POST …/run-batch</code>,
              <code>GET …/batch-progress</code>, <code>GET /api/hub/translation-path-matrix</code>,
              <code>GET /api/hub/language-readiness</code>.
            </p>
          </div>
        </div>
      </section>

      <section id="laws" class="ao-section">
        <div class="ao-wrap ao-wrap--doc">
          <h2 class="ao-h2">Laws</h2>
          <div class="ao-doc-table-wrap" tabindex="0">
            <table class="ao-doc-table">
              <thead><tr><th>ID</th><th>Law</th><th>Enforcement</th></tr></thead>
              <tbody>
                <tr><th scope="row">D6442</th><td>Translate only — no invent features/backends</td><td>Canon + holes on lower failure</td></tr>
                <tr><th scope="row">D6447</th><td>No demo-only / force-settle façades</td><td>Protocol refuses deep-lift-all-gaps as completeness</td></tr>
                <tr><th scope="row">D6448</th><td>close until zero <code>data-cwl-hole</code> or residual ledger</td><td><code>wisp-complete-conversion-protocol.mjs</code></td></tr>
                <tr><th scope="row">Propose ≠ dispose</th><td>LLM proposes; oracle + verify dispose</td><td>No LiteRT.js convert path</td></tr>
              </tbody>
            </table>
          </div>
          <div class="ao-prose">
            <p>
              Protocol constants: <code>COMPLETE_CONVERSION_KIND = chrysalis.complete-conversion-protocol</code>,
              <code>COMPLETE_CONVERSION_GATE = D6448</code>,
              <code>forceSettleResidualHoles: false</code> on every evidence round.
            </p>
          </div>
        </div>
      </section>

      <section id="loop" class="ao-section ao-section-alt">
        <div class="ao-wrap ao-wrap--doc">
          <h2 class="ao-h2">Correctness loop</h2>
<pre class="ao-doc-diagram"><code>Capture (oracle) → Lift (WebIR) → CWL ↔ emit → Verify (replay)
                         ↑                    │
              LLM / IS / chat propose         │
                         └────── dispose ─────┘</code></pre>
        </div>
      </section>

      <section id="pipeline" class="ao-section">
        <div class="ao-wrap ao-wrap--doc">
          <h2 class="ao-h2">Peel / emit modules</h2>
          <div class="ao-prose">
            <p>
              Dispatcher <code>hub-lift-dispatch.mjs</code> tries specialized peels before generic
              <code>lift-to-webir.mjs</code>. AST peels cover PHP, JS/TS, Python, Java, Go, Ruby, Rust,
              C#, Kotlin, Scala, Swift, Dart, Elixir, C++, Nest — plus SvelteKit / Next / Nitro.
              COBOL: <code>cobol-pattern-lift.mjs</code> / <code>cobol-pattern-emit.mjs</code>.
            </p>
            <p>
              Emit: <code>emit-*-from-hub.mjs</code> family, <code>emit-cwl-from-hub.mjs</code>,
              <code>emit-runtime-cwl-from-hub.mjs</code>, <code>wptp-emit-pipeline.mjs</code>.
              Packages: <code>ingest</code>, <code>webir</code> (junction), <code>verify</code>,
              <code>oracle</code> + language oracles, <code>emit-hono</code> / <code>emit-fastify</code>,
              <code>runtime-chimera</code>, <code>cwl</code> (junction).
            </p>
          </div>
        </div>
      </section>

      <section id="oracle" class="ao-section ao-section-alt">
        <div class="ao-wrap ao-wrap--doc">
          <h2 class="ao-h2">Oracle and verify</h2>
          <div class="ao-prose">
            <p>
              <code>@chrysalis/oracle</code>: capture legacy behavior into a <strong>TraceCorpus</strong>
              (NDJSON — header, body events, footer; schema version 1.0.0).
              Event types include <code>http.request</code>, <code>http.response</code>, <code>sql.query</code>,
              plus determinism hooks for time/RNG. <strong>Redaction is mandatory before persist</strong>.
              Oracle does not translate or replay.
            </p>
            <p>
              <code>@chrysalis/verify</code>: <code>replayCorpus</code> sorts traces, filters by route/traceId/shard,
              diffs responses via <code>replay-http</code>. Also SQL replay and UI markup/CSS parity helpers.
            </p>
          </div>
          <div class="ao-doc-table-wrap" tabindex="0">
            <table class="ao-doc-table">
              <thead><tr><th>Hub verify lane</th><th>When</th></tr></thead>
              <tbody>
                <tr><th scope="row"><code>legacy-oracle-php</code></th><td>PHP → TS/Hono/Fastify gold</td></tr>
                <tr><th scope="row"><code>hub-structural-gold</code></th><td>Literal → Hono/Fastify gold</td></tr>
                <tr><th scope="row"><code>hub-trace-replay</code></th><td>In-process <code>@chrysalis/verify</code></td></tr>
                <tr><th scope="row"><code>oracle-python</code> / <code>oracle-node</code></th><td>Live capture on origin hosts</td></tr>
                <tr><th scope="row"><code>wptp-contract</code></th><td>OpenAPI / Swagger / HAR</td></tr>
                <tr><th scope="row"><code>none</code></th><td>Silver/open — no trace parity claim</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section id="complete" class="ao-section">
        <div class="ao-wrap ao-wrap--doc">
          <h2 class="ao-h2">Complete conversion (D6448)</h2>
          <div class="ao-prose">
            <p>
              Close until zero <code>data-cwl-hole</code> (vendor islands excepted) or fail incomplete.
              Three rounds with no improvement → incomplete.
              CLI: <code>pnpm run hub:complete-conversion</code>
              (<code>--allow-incomplete</code> · <code>--max-rounds</code> · <code>--stop-after</code> · <code>--no-terminal-settle</code>.
              Bind traces with <code>forceSettleResidualHoles: false</code>.
            </p>
            <p>Residual ledger when <code>total !== 0</code> — <code>reports/wisp/complete-conversion-residuals.json</code>:</p>
          </div>
<pre class="ao-doc-diagram"><code>{
  "kind": "chrysalis.complete-conversion-residuals",
  "schemaVersion": 1,
  "gate": "D6448",
  "total": N,
  "buckets": { /* classifyCwlHoleBuckets */ },
  "reasons": { /* counts */ },
  "topPages": …,
  "engineDebt": [ "Close svelteInterp…", "…" ],
  "nextActions": [ "Improve packages/ingest…", "Do not use deep-lift-all-gaps" ]
}</code></pre>
          <div class="ao-prose">
            <p>
              D6448-ST prove profiles: <code>hub:complete-conversion-prove:plain-php</code>,
              <code>:tiny-blog</code> (RFC-0021), plus express/typescript/python/go/csharp/elixir/dart/wisp-ui variants.
            </p>
          </div>
        </div>
      </section>

      <section id="cobol" class="ao-section ao-section-alt">
        <div class="ao-wrap ao-wrap--doc">
          <h2 class="ao-h2">COBOL peels</h2>
          <div class="ao-prose">
            <p>
              <code>pnpm run pilot:cobol-clbs</code> — inventory + best-fit + residual; no Db2/CICS/VSAM invent.
              Residual ledger kind <code>chrysalis.cobol.residual.v1</code> with priorities P0–P3.
              <strong>EXTFMAP</strong> is the sole open COBOL P0 until licensed drop or
              <code>CHRYSALIS_EXTFMAP_ABSENT=1</code> attestation — never invent.
              Tokens: <code>EXTFMAP_RESIDUAL_HONEST_OK</code>; smokes
              <code>hub:cobol-best-fit-smoke</code>, <code>hub:cobol-clbs-prove-smoke</code>,
              <code>hub:cobol-extfmap-residual-smoke</code>.
            </p>
            <p>See <a href="/published.html#cobol">published.html#cobol</a>.</p>
          </div>
        </div>
      </section>

      <section id="cwl" class="ao-section">
        <div class="ao-wrap ao-wrap--doc">
          <h2 class="ao-h2">How Convert consumes CWL</h2>
          <div class="ao-doc-table-wrap" tabindex="0">
            <table class="ao-doc-table">
              <thead><tr><th>Mechanism</th><th>Fact</th></tr></thead>
              <tbody>
                <tr><th scope="row"><code>packages/cwl</code></th><td>Junction → <code>chrysalis-cwl/packages/cwl</code></td></tr>
                <tr><th scope="row"><code>packages/webir</code></th><td>Junction → <code>chrysalis-cwl/packages/webir</code></td></tr>
                <tr><th scope="row">Pin</th><td><code>file:../chrysalis-cwl/packages/cwl</code> (tip 1.0.80) or <code>@agenticop-io/cwl</code></td></tr>
                <tr><th scope="row">Prove</th><td><code>hub:cwl-pin-smoke</code>, <code>hub:cwl-language-pillar-smoke</code></td></tr>
                <tr><th scope="row">Cutover consume</th><td><code>hub:cwl-helix-cutover-smoke</code> → <code>CWL_HELIX_CUTOVER_OK</code> or honest <code>SKIP</code></td></tr>
                <tr><th scope="row">Fat stay Convert</th><td><code>cwl-ingest.mjs</code>, <code>cwl-control-lower.mjs</code> (not thin junction)</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section id="pilots" class="ao-section ao-section-alt">
        <div class="ao-wrap ao-wrap--doc">
          <h2 class="ao-h2">Pilot Kit</h2>
          <div class="ao-prose">
            <p>
              MCP + Cursor rule + <code>pilot:laravel-min</code> + optional COBOL.
              <code>hub:cursor-pilot-kit-smoke</code> → <code>PILOT_KIT_OK</code>.
              Explicit: Pilot Kit is GTM — <strong>not</strong> DNA cutover.
              Also: <code>PUBLIC_CLAIM_OK</code>, <code>OSS_SCRUB_OK</code>, <code>CONVERT_GRAVITY_OK</code>.
            </p>
          </div>
        </div>
      </section>

      <section id="owns" class="ao-section">
        <div class="ao-wrap ao-wrap--doc">
          <h2 class="ao-h2">Owns / does not</h2>
          <div class="ao-doc-table-wrap" tabindex="0">
            <table class="ao-doc-table">
              <thead><tr><th>Owns</th><th>Does not own</th></tr></thead>
              <tbody>
                <tr>
                  <td>Peelers, emitters, Hub SPA, oracle harnesses, Pilot Kit, Chimera shell</td>
                  <td>CWL RFCs/golds; Helix learn/enforce; <code>smoke:ut-spine</code></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="ao-prose">
            <p>Anti-patterns: IR-v0 as second DNA; editing CWL grammar under Convert; WISP chrome as north star.</p>
          </div>
        </div>
      </section>

      <section id="gates" class="ao-section ao-section-alt">
        <div class="ao-wrap ao-wrap--doc">
          <h2 class="ao-h2">Gates</h2>
          <div class="ao-prose">
            <ul>
              <li><code>CONVERT_WHOLE_SYSTEM_OK</code></li>
              <li><code>hub:traffic-decides-bar-smoke</code> → <code>TRAFFIC_DECIDES_CONVERT_OK</code></li>
              <li><code>hub:ut-maintain-packaging-smoke</code></li>
              <li><code>PILOT_KIT_OK</code> · <code>CWL_HELIX_CUTOVER_OK</code> / <code>SKIP</code></li>
            </ul>
            <p><a href="/paper-cwl.html">CWL</a> · <a href="/paper-traffic.html">Traffic decides</a> · <a href="/paper-helix.html">Helix</a></p>
          </div>
        </div>
      </section>
    </article>
  </main>
  """;
}

@page GET "/paper-cwl.html"
page paper_cwl {
  effects: none;
  nav docs;
  layout site;
  title "CWL whitepaper — Chrysalis Web Language tip 1.0.80 | AgenticOps";
  description "Technical whitepaper from chrysalis-cwl code: packages, parser, golds 01–86, site complete contract, emit:site, RFCs, dna-seed, UT spine, tip 1.0.80.";
  canonical "https://agenticop.io/paper-cwl.html";
  meta robots "index, follow";
  meta og title "CWL whitepaper — tip 1.0.80";
  meta og description "Readable DNA of the web: grammar, packages, golds, DNA seed, and the spine Convert and Secure consume.";
  meta og url "https://agenticop.io/paper-cwl.html";
  meta og image "https://agenticop.io/cwl-explainer.png";
  icon logo;
  return html """
<main id="main" class="ao-page-main ao-doc">
    <section class="ao-section ao-page-hero ao-page-hero--brand ao-page-hero--cwl">
      <div class="ao-wrap ao-wrap--doc">
        <p class="ao-kicker ao-kicker--loud">Whitepaper · language · from code</p>
        <h1 class="ao-page-title">Chrysalis Web Language</h1>
        <p class="ao-lead ao-lead--doc">
          Tip <strong>1.0.80</strong> (2026-10-05). Package <code>@chrysalis/cwl</code> / <code>@agenticop-io/cwl</code> · Apache-2.0 ·
          <a href="https://github.com/AgenticOp-io/chrysalis-cwl" target="_blank" rel="noopener">AgenticOp-io/chrysalis-cwl</a>.
          This paper follows the pillar tree: hand-written parser, WebIR twin, language golds 01–35,
          <code>dna-seed</code>, diagnose codes, and <code>smoke:ut-spine</code>.
        </p>
        <p class="ao-doc-meta">
          <a href="/docs.html">Docs</a> ·
          <a href="/chrysalis.html">Product</a> ·
          <a href="/paper-webir.html">WebIR</a> ·
          Source: <code>engines/chrysalis-cwl</code> ·
          Cite: <a href="https://doi.org/10.5281/zenodo.22691492" target="_blank" rel="noopener">10.5281/zenodo.22691492</a>
        </p>
      </div>
    </section>

    <nav class="ao-doc-toc" aria-label="On this page">
      <div class="ao-wrap ao-wrap--doc">
        <p class="ao-doc-toc-label">On this page</p>
        <ol>
          <li><a href="#thesis">Thesis</a></li>
          <li><a href="#packages">Packages</a></li>
          <li><a href="#pipeline">Pipeline</a></li>
          <li><a href="#parser">Parser &amp; AST</a></li>
          <li><a href="#surfaces">Surfaces</a></li>
          <li><a href="#syntax">Syntax</a></li>
          <li><a href="#golds">Language golds</a></li>
          <li><a href="#rfcs">RFCs</a></li>
          <li><a href="#dna">DNA seed</a></li>
          <li><a href="#diagnose">Diagnose</a></li>
          <li><a href="#tip">1.0.78</a></li>
          <li><a href="#tooling">CLI &amp; gates</a></li>
          <li><a href="#spine">UT spine</a></li>
          <li><a href="#nongoals">Non-goals</a></li>
        </ol>
      </div>
    </nav>

    <article class="ao-doc-body">
      <section id="thesis" class="ao-section">
        <div class="ao-wrap ao-wrap--doc">
          <h2 class="ao-h2">Thesis</h2>
          <div class="ao-prose">
            <p>
              A web application’s identity is the set of routes, pages, data loaders, UI islands, and effects
              that determine how requests are answered. Frameworks encode that identity in many dialects.
              <strong>CWL</strong> is one consolidated inscription — the DNA of the web — so humans can audit it
              and machines can emit from the same model.
            </p>
            <p>
              CWL maps <strong>1:1</strong> to <strong>WebIR</strong> (<code>@chrysalis/webir</code> 2.0.2).
              There is no second private IR for one migration sprint. Convert peels and emits through that pair;
              Secure may bridge surface to traffic DNA. Neither owns the grammar.
            </p>
            <p>
              If meaning cannot be recovered honestly, emit <code>hole reason;</code>.
              Guessing is a forged gene. Silent stubs are cancer.
            </p>
          </div>
        </div>
      </section>

      <section id="packages" class="ao-section ao-section-alt">
        <div class="ao-wrap ao-wrap--doc">
          <h2 class="ao-h2">Packages (pillar tree)</h2>
          <div class="ao-doc-table-wrap" tabindex="0">
            <table class="ao-doc-table">
              <thead><tr><th>Package</th><th>Version</th><th>Role</th></tr></thead>
              <tbody>
                <tr><th scope="row"><code>@chrysalis/cwl</code></th><td>1.0.78</td><td>Language pin + CLI. Site complete: <code>emit:site</code>, owned assets, golds 68–86. Exports <code>parser</code>, <code>print</code>, <code>diagnose</code>, <code>lsp-map</code>, <code>dna-seed</code></td></tr>
                <tr><th scope="row"><code>@chrysalis/webir</code></th><td>2.0.2</td><td>Semantic IR: <code>Module</code>, <code>Effect</code>, dialects <code>web-request</code> / <code>effect</code> / <code>data</code></td></tr>
                <tr><th scope="row"><code>@chrysalis/runtime-cwl</code></th><td>2.0.2</td><td>In-process HTTP simulate — <code>createCwlRuntime</code>, <code>compileCwlRoutes</code>, <code>startCwlServer</code></td></tr>
                <tr><th scope="row"><code>runtime-cwl-browser</code></th><td>2.0.2</td><td>RFC-0019 island contract markers (<code>data-cwl-island</code>) — no hydration claim</td></tr>
                <tr><th scope="row"><code>runtime-cwl-worker</code></th><td>2.0.2</td><td>Worker wrap of runtime fetch</td></tr>
                <tr><th scope="row"><code>emit-runtime-cwl</code></th><td>2.0.2</td><td>WebIR → deployable Node project (<code>routes.cwl</code>, <code>webir.json</code>, Dockerfile)</td></tr>
              </tbody>
            </table>
          </div>
          <div class="ao-prose">
            <p>
              DNA seed is not a separate npm package — it is <code>@chrysalis/cwl/dna-seed</code>
              (source staged from <code>scripts/hub-ingest/cwl-dna-seed.mjs</code>).
              Public npm is not the default path; GitHub Packages / <code>file:</code> pins.
              Convert junctions <code>packages/cwl</code> and <code>packages/webir</code> into this tree.
            </p>
          </div>
        </div>
      </section>

      <section id="pipeline" class="ao-section">
        <div class="ao-wrap ao-wrap--doc">
          <h2 class="ao-h2">Pipeline</h2>
<pre class="ao-doc-diagram"><code>.author.cwl
  → parseCwlModule / printCwlModule / diagnoseCwlSource
  → (optional) cwl-ingest → WebIR Module
  → runtime-cwl simulate  |  emit-runtime-cwl  |  thin emit reverse
  → dna-seed → draft app-dna-v1 (+ bridge envelope)
  → Secure Helix: strip → promote/sign → compare ⊆ DNA → enforce</code></pre>
          <div class="ao-prose">
            <p>
              Canonical sources live under <code>scripts/hub-ingest/</code> and sync into
              <code>packages/cwl/lib/</code> via <code>sync:cwl-package-lib</code>.
              Editor grammar (TextMate only): <code>editors/vscode/syntaxes/cwl.tmLanguage.json</code>
              — gate <code>test:cwl-grammar</code> → <code>CWL_GRAMMAR_OK</code>.
              There is no PEG/Ohm grammar; the parser is hand-written JavaScript.
            </p>
          </div>
        </div>
      </section>

      <section id="parser" class="ao-section ao-section-alt">
        <div class="ao-wrap ao-wrap--doc">
          <h2 class="ao-h2">Parser and AST</h2>
          <div class="ao-prose">
            <p>
              Primary files: <code>cwl-parser.mjs</code>, <code>cwl-print.mjs</code>,
              <code>cwl-diagnose.mjs</code> (schemaVersion <strong>6</strong>),
              <code>cwl-fmt.mjs</code>, <code>cwl-ingest.mjs</code>, <code>cwl-control-lower.mjs</code>.
            </p>
            <p><code>parseCwlModule</code> returns approximately:</p>
          </div>
<pre class="ao-doc-diagram"><code>{
  moduleName, moduleLine, file,
  routes[], moduleUses[], moduleAuthUses[],
  imports[], importLines[], components[]
}</code></pre>
          <div class="ao-prose">
            <p>
              Each route carries <code>method</code>, <code>path</code>, <code>pathParams</code>, <code>name</code>,
              <code>surfaceKind</code> (<code>api</code>|<code>page</code>), <code>effects</code>,
              handler param arrays (path/query/body/multipart), <code>responseStatus</code>,
              <code>streamKind</code>, <code>loadBody</code>, <code>earlyGuards</code>, <code>foreachBindings</code>,
              <code>attachmentHoles</code>, and <code>body</code>.
              Body kinds: <code>object</code> | <code>literal</code> | <code>html</code> | <code>ui</code> | <code>hole</code>.
            </p>
            <p>
              RFC-0021 projectable conditions lower to WebIR; opaque <code>g_*</code> residuals are
              <strong>skipped</strong> on ingest (no invented verify) and diagnosed as <code>opaque-residual</code> (info).
            </p>
          </div>
<pre class="ao-doc-diagram"><code>if_guard   ::= "if" cond_expr "{" (status | return)* "}"
cond_expr  ::= or_expr | opaque_ident
or_expr    ::= and_expr ("||" and_expr)*
and_expr   ::= unary_expr ("&&" unary_expr)*
unary_expr ::= "!" IDENT | cmp_expr
cmp_expr   ::= IDENT ("==" | "!=") literal
opaque_ident ::= IDENT   (* g_* residuals *)
foreach_bind ::= "foreach" IDENT "as" [IDENT "=>"] IDENT "{" (return)* "}"</code></pre>
        </div>
      </section>

      <section id="surfaces" class="ao-section">
        <div class="ao-wrap ao-wrap--doc">
          <h2 class="ao-h2">Named surfaces</h2>
          <div class="ao-doc-table-wrap" tabindex="0">
            <table class="ao-doc-table">
              <thead><tr><th>Surface</th><th>Syntax</th><th>RFCs</th><th>Status</th></tr></thead>
              <tbody>
                <tr><th scope="row">API</th><td><code>@route</code> + handler</td><td>0001–0008</td><td>Shipped · golds 01–08</td></tr>
                <tr><th scope="row">Pages</th><td><code>@page</code> + <code>return html</code></td><td>0010, 0011, 0014</td><td>Shipped</td></tr>
                <tr><th scope="row">Data</th><td><code>load { … }</code></td><td>0013</td><td>Deepening · gold 27 runtime-ok</td></tr>
                <tr><th scope="row">UI</th><td><code>return ui</code>, <code>@component</code>, islands</td><td>0017–0019, 0024, 0028</td><td>Language shipped; hydration non-goal</td></tr>
                <tr><th scope="row">Effects</th><td><code>effects:</code>, <code>use auth|json|urlencoded</code></td><td>0007, 0001, 0020</td><td>Presets + middleware golds 22/30</td></tr>
                <tr><th scope="row">Control</th><td><code>if</code> / <code>foreach</code></td><td>0021</td><td>Accepted · golds 19, 23</td></tr>
                <tr><th scope="row">Modules</th><td><code>module</code>, <code>import</code></td><td>0009</td><td>Shipped · gold 12</td></tr>
                <tr><th scope="row">DNA bridge</th><td>surface ↔ <code>app-dna-v1</code></td><td>0022, 0023</td><td>Contract · golds 24, 34</td></tr>
                <tr><th scope="row">Transport</th><td>multipart · SSE</td><td>0026, 0027</td><td>Accepted · golds 31, 32</td></tr>
              </tbody>
            </table>
          </div>
          <div class="ao-prose">
            <p>
              <strong>Not</strong> CWL surfaces: Chimera (migration shell), emit backends (targets),
              databases/queues/SDKs, or Helix traffic DNA itself.
            </p>
          </div>
        </div>
      </section>

      <section id="syntax" class="ao-section ao-section-alt">
        <div class="ao-wrap ao-wrap--doc">
          <h2 class="ao-h2">Minimal syntax</h2>
<pre class="ao-doc-diagram"><code>module api;
use json;
use urlencoded;

@route GET "/items/:id"
handler item_show {
  effects: none;
  param id;
  return { ok: true, id: id };
}

@page GET "/"
page home {
  effects: none;
  return html "&lt;h1&gt;Welcome&lt;/h1&gt;";
}

@route POST "/legacy"
handler legacy_post {
  effects: io, db;
  hole legacy:invoice_create "delegate to PHP stack";
}</code></pre>
        </div>
      </section>

      <section id="golds" class="ao-section">
        <div class="ao-wrap ao-wrap--doc">
          <h2 class="ao-h2">Language golds 01–35</h2>
          <div class="ao-prose">
            <p>Under <code>fixtures/language-gold/</code>. Gate: <code>npm run test:language</code>.</p>
          </div>
          <div class="ao-doc-table-wrap" tabindex="0">
            <table class="ao-doc-table">
              <thead><tr><th>Id</th><th>Proves</th></tr></thead>
              <tbody>
                <tr><th scope="row">01–08</th><td>Literals, path/query/header/cookie/body, status, auth effects, content-type</td></tr>
                <tr><th scope="row">09–16</th><td>Pages, load, holes, multi-file, middleware, headers, HTML interp, layout</td></tr>
                <tr><th scope="row">17–19</th><td>UI v0/v1, early-exit / foreach</td></tr>
                <tr><th scope="row">20–23</th><td>Probes, form-action residual, effects middleware, nested control</td></tr>
                <tr><th scope="row">24 / 34</th><td>DNA bridge + deploy profiles; surfaces deepen (SSE/multipart/HEAD)</td></tr>
                <tr><th scope="row">25–28</th><td>Island kinds, nested literals, load redirect/error/cookie, Set-Cookie header</td></tr>
                <tr><th scope="row">29–33</th><td>Transport holes, executable effects, multipart, SSE, named island contracts</td></tr>
                <tr><th scope="row">35</th><td>Urlencoded form POST + body (tip 1.0.26 · runtime-ok)</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section id="rfcs" class="ao-section ao-section-alt">
        <div class="ao-wrap ao-wrap--doc">
          <h2 class="ao-h2">RFC index (accepted)</h2>
          <div class="ao-prose">
            <p>
              Each RFC cites cross-language evidence and must lower to WebIR without a second IR.
              Canonical list: <code>docs/language/CWL-RFC.md</code>.
            </p>
          </div>
          <div class="ao-doc-table-wrap" tabindex="0">
            <table class="ao-doc-table">
              <thead><tr><th>RFC</th><th>Title</th></tr></thead>
              <tbody>
                <tr><th scope="row">0001</th><td>Module <code>use json</code> / <code>use urlencoded</code></td></tr>
                <tr><th scope="row">0002</th><td>Path parameters (<code>:id</code> templates)</td></tr>
                <tr><th scope="row">0003</th><td>Query parameters</td></tr>
                <tr><th scope="row">0004</th><td>Headers and cookies</td></tr>
                <tr><th scope="row">0005</th><td>JSON request body fields</td></tr>
                <tr><th scope="row">0006</th><td>Response status</td></tr>
                <tr><th scope="row">0007</th><td>Auth presets and effects</td></tr>
                <tr><th scope="row">0008</th><td>Response content-type</td></tr>
                <tr><th scope="row">0009</th><td>Multi-file modules (<code>import</code>)</td></tr>
                <tr><th scope="row">0010</th><td>Full-stack page surface</td></tr>
                <tr><th scope="row">0011</th><td>Layout imports + page params</td></tr>
                <tr><th scope="row">0012</th><td>Full-stack component holes (SvelteKit)</td></tr>
                <tr><th scope="row">0013</th><td>Page load / SSR data (v2: redirect/error/cookie)</td></tr>
                <tr><th scope="row">0014</th><td>HTML interpolation in <code>@page</code></td></tr>
                <tr><th scope="row">0015</th><td>Production readiness probes</td></tr>
                <tr><th scope="row">0016</th><td>Form action probe + residual catalog</td></tr>
                <tr><th scope="row">0017–0019</th><td>Native UI v0/v1, components, client islands</td></tr>
                <tr><th scope="row">0020</th><td>Effects middleware chains</td></tr>
                <tr><th scope="row">0021</th><td>Early-exit cond expressions + foreach</td></tr>
                <tr><th scope="row">0022</th><td>CWL ↔ <code>app-dna-v1</code> bridge (contract only)</td></tr>
                <tr><th scope="row">0023</th><td>Deploy / DNA profiles (<code>cwl-deploy-profile-v1</code>)</td></tr>
                <tr><th scope="row">0024</th><td>Island kinds (Wasm / vendor / opaque)</td></tr>
                <tr><th scope="row">0025</th><td>Nested structured object/array literals</td></tr>
                <tr><th scope="row">0026</th><td>Multipart field/file part bindings</td></tr>
                <tr><th scope="row">0027</th><td>SSE single-shot <code>stream sse;</code></td></tr>
                <tr><th scope="row">0028</th><td>Named client islands + form event contracts</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section id="dna" class="ao-section">
        <div class="ao-wrap ao-wrap--doc">
          <h2 class="ao-h2">DNA seed (RFC-0022 / 0023)</h2>
          <div class="ao-prose">
            <p>
              APIs: <code>cwlSurfaceToDraftDna</code>, <code>seedDraftDnaFromCwlPath</code>,
              <code>dnaBridgeContractEqual</code>, <code>pathTemplateShapeEqual</code>,
              <code>responseKeyFingerprint</code>, <code>loadDeployProfile</code>.
              Gate: <code>test:cwl-dna-bridge</code> → <code>CWL_DNA_BRIDGE_OK</code>.
            </p>
            <p>Identity key: <code>`${host} ${METHOD} ${path_template}`</code>. Per-route seed fields:</p>
          </div>
          <div class="ao-doc-table-wrap" tabindex="0">
            <table class="ao-doc-table">
              <thead><tr><th>Field</th><th>Rule</th></tr></thead>
              <tbody>
                <tr><th scope="row"><code>host</code></th><td>Profile / opts else <code>"default"</code>; unknown key in <code>hosts{}</code> throws</td></tr>
                <tr><th scope="row"><code>method</code></th><td>Uppercased</td></tr>
                <tr><th scope="row"><code>path_template</code></th><td>Authored path (named params kept)</td></tr>
                <tr><th scope="row"><code>content_class</code></th><td><code>html</code> if html/ui/page; <code>json</code> if object; <code>other</code> if SSE/opaque</td></tr>
                <tr><th scope="row"><code>status_classes</code></th><td>If status set → <code>[floor(N/100)*100]</code> else <code>[]</code></td></tr>
                <tr><th scope="row"><code>response_key_fingerprint</code></th><td>JSON only — sorted key paths depth ≤ 2; else null</td></tr>
                <tr><th scope="row"><code>request_key_fingerprint</code></th><td>Sorted body + multipart field/file names</td></tr>
                <tr><th scope="row"><code>query_key_fingerprint</code></th><td>Sorted query binding names</td></tr>
              </tbody>
            </table>
          </div>
          <div class="ao-prose">
            <p>
              Bridge envelope only (stripped before certified DNA): <code>cwl_surface</code>,
              <code>cwl_effects</code>, optional <code>cwl_stream</code> / multipart annotations.
              CWL holes are <strong>not</strong> copied into DNA <code>holes[]</code>.
              Path shape: <code>:id</code> ≡ <code>:userId</code> via <code>pathTemplateShapeEqual</code>.
              Deploy profile schema: <code>cwl-deploy-profile-v1</code> (external artifact).
            </p>
          </div>
        </div>
      </section>

      <section id="diagnose" class="ao-section ao-section-alt">
        <div class="ao-wrap ao-wrap--doc">
          <h2 class="ao-h2">Diagnose codes</h2>
          <div class="ao-doc-table-wrap" tabindex="0">
            <table class="ao-doc-table">
              <thead><tr><th>Code</th><th>Sev</th><th>Meaning</th></tr></thead>
              <tbody>
                <tr><th scope="row"><code>parse</code></th><td>error</td><td>Parser threw</td></tr>
                <tr><th scope="row"><code>module-name</code></th><td>warn</td><td>Missing <code>module</code></td></tr>
                <tr><th scope="row"><code>duplicate-route</code></th><td>warn</td><td>Same method+path twice</td></tr>
                <tr><th scope="row"><code>uncatalogued-hole</code></th><td>warn</td><td>Residual not in catalog</td></tr>
                <tr><th scope="row"><code>catalogued-hole</code></th><td>info</td><td>Catalogued residual</td></tr>
                <tr><th scope="row"><code>surface-mismatch</code></th><td>warn</td><td><code>@page</code> vs <code>@route</code> body kind mismatch</td></tr>
                <tr><th scope="row"><code>param-unused</code></th><td>warn</td><td>Declared param unused in HTML</td></tr>
                <tr><th scope="row"><code>opaque-residual</code></th><td>info</td><td>Authored <code>g_*</code> skipped on ingest</td></tr>
                <tr><th scope="row"><code>no-routes</code></th><td>info</td><td>Empty module</td></tr>
              </tbody>
            </table>
          </div>
          <div class="ao-prose">
            <p>
              <code>ok</code> = no errors; warns do not fail <code>check</code>.
              Catalog includes origin peels (<code>hub-svelte:*</code>, <code>hub-next:*</code>, …) and
              kept tip residual <code>unsupported:websocket</code>.
            </p>
          </div>
        </div>
      </section>

      <section id="tip" class="ao-section">
        <div class="ao-wrap ao-wrap--doc">
          <h2 class="ao-h2">Tip 1.0.80</h2>
          <div class="ao-prose">
            <p>
              <strong>Complete CWL marketing site</strong> (2026-10-05): public genome uses
              <code>year 2026;</code>, checkbox menu + owned CSS (no host drawer/device JS),
              owned fonts under <code>assets/</code>, certified <code>emit:site</code> freeze for Firebase.
              Gold <code>86-site-complete</code>. Token <code>CWL_SITE_COMPLETE_OK</code>.
              Contract: <code>docs/language/CWL-SITE-COMPLETE.md</code>.
            </p>
            <p>
              Recent path: host site emit (1.0.75) · 100% contract + asset SoR (1.0.76) · owned fonts (1.0.77) · complete (1.0.78).
              Earlier public land (1.0.26): HTML shell preserve + urlencoded forms (golds 27 / 35).
              WebSocket duplex remains <code>unsupported:websocket</code>. Deploy CLI stays ops.
            </p>
          </div>
          <div class="ao-doc-table-wrap" tabindex="0">
            <table class="ao-doc-table">
              <thead><tr><th>Smoke</th><th>Token</th></tr></thead>
              <tbody>
                <tr><th scope="row"><code>smoke:agenticop-site</code></th><td><code>CWL_AGENTICOP_SITE_OK</code></td></tr>
                <tr><th scope="row"><code>smoke:cwl-site-100</code></th><td><code>CWL_SITE_100_OK</code></td></tr>
                <tr><th scope="row"><code>smoke:cwl-site-complete</code></th><td><code>CWL_SITE_COMPLETE_OK</code></td></tr>
                <tr><th scope="row"><code>emit:site</code> + <code>deploy:demo</code></th><td><code>CWL_HOST_SITE_DEPLOY_OK</code> (demo only)</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section id="tooling" class="ao-section ao-section-alt">
        <div class="ao-wrap ao-wrap--doc">
          <h2 class="ao-h2">CLI and gates</h2>
          <div class="ao-prose">
            <p><code>cwl parse | print | fmt | diagnose | check | emit-check | dna-seed</code></p>
          </div>
          <div class="ao-doc-table-wrap" tabindex="0">
            <table class="ao-doc-table">
              <thead><tr><th>Command</th><th>Token</th></tr></thead>
              <tbody>
                <tr><th scope="row"><code>test:language</code></th><td>Full language chain</td></tr>
                <tr><th scope="row"><code>test:cwl-dna-bridge</code></th><td><code>CWL_DNA_BRIDGE_OK</code></td></tr>
                <tr><th scope="row"><code>test:cwl-hole-catalog</code></th><td><code>CWL_HOLE_CATALOG_OK</code></td></tr>
                <tr><th scope="row"><code>test:cwl-grammar</code></th><td><code>CWL_GRAMMAR_OK</code></td></tr>
                <tr><th scope="row"><code>smoke:ut-spine</code></th><td><code>UT_SPINE_OK</code></td></tr>
                <tr><th scope="row"><code>smoke:ut-evidence</code></th><td><code>UT_EVIDENCE_OK</code></td></tr>
              </tbody>
            </table>
          </div>
<pre class="ao-doc-diagram"><code>npm run build:webir
CWL_REQUIRE_WEBIR=1 npm run test:language
npm run smoke:cwl-ingest-matrix
npm run smoke:cwl-runtime-matrix
npm run smoke:cwl-emit</code></pre>
        </div>
      </section>

      <section id="spine" class="ao-section">
        <div class="ao-wrap ao-wrap--doc">
          <h2 class="ao-h2">UT ↔ Helix spine (CWL owns the gate)</h2>
          <div class="ao-prose">
            <p>
              <code>scripts/smoke-ut-spine.mjs</code> (G10125). Convert does not own this spine.
              Invariant: <em>CWL owns surface contract; Helix disposes DNA; Convert does not own this spine</em>.
            </p>
            <ol>
              <li>Assert gold <code>24-dna-bridge/routes.cwl</code></li>
              <li>Validate optional <code>deploy-profile.json</code></li>
              <li>Always run <code>gate-cwl-dna-bridge.mjs</code></li>
              <li>If sibling Secure present: seed → strip → promote+sign → compare ⊆ DNA → score allow/deny</li>
              <li>Write <code>reports/ut-spine/ut-spine.json</code>; print <code>UT_SPINE_OK</code></li>
            </ol>
          </div>
<pre class="ao-doc-diagram"><code>CWL gold (24-dna-bridge)
  → RFC-0022 contract gate
  → Helix seed → strip → promote(+HMAC)
  → compare: CWL surface ⊆ certified DNA
  → enforce allow/deny</code></pre>
          <div class="ao-prose">
            <p>More: <a href="/paper-traffic.html">Traffic decides</a> · <a href="/paper-helix.html">Helix</a> · <a href="/paper-webir.html">WebIR</a>.</p>
          </div>
        </div>
      </section>

      <section id="nongoals" class="ao-section ao-section-alt">
        <div class="ao-wrap ao-wrap--doc">
          <h2 class="ao-h2">Non-goals</h2>
          <div class="ao-prose">
            <ul>
              <li>Origin PL dialects as CWL grammar (Convert peels only).</li>
              <li>Nest / LiveView / Flutter / middleware-onion façades.</li>
              <li>Inventing mail/SQL/rate/EventSource/upload/WS runtimes.</li>
              <li>UI island hydration / client JS execution in <code>runtime-cwl</code>.</li>
              <li>Firewall policy (Secure); customer migrations (Convert).</li>
              <li>WebSocket duplex is a language gene; this marketing site does not require it.</li>
            </ul>
            <p>
              Edit language only in <code>chrysalis-cwl</code>; Convert syncs junctions.
              Next: <a href="/paper-webir.html">WebIR</a> ·
              <a href="/paper-convert.html">Convert</a> ·
              <a href="/paper-helix.html">Helix</a> ·
              <a href="/whitepaper.html">System overview</a>
            </p>
          </div>
        </div>
      </section>
    </article>
  </main>
  """;
}

@page GET "/paper-helix.html"
page paper_helix {
  effects: none;
  nav docs;
  layout site;
  title "Helix whitepaper — traffic DNA firewall | AgenticOps";
  description "From code: helix-proxy modes, app-dna-v1 schema, dna-core fingerprints, HX-* mismatch codes, seed-cwl/cutover CLI, signed DNA, NGFW placement.";
  canonical "https://agenticop.io/paper-helix.html";
  meta og title "Helix — traffic DNA firewall whitepaper";
  meta og url "https://agenticop.io/paper-helix.html";
  meta og image "https://agenticop.io/helix-explainer.png";
  icon logo;
  return html """
<main id="main" class="ao-page-main ao-doc">
    <section class="ao-section ao-page-hero ao-page-hero--brand ao-page-hero--secure">
      <div class="ao-wrap ao-wrap--doc">
        <p class="ao-kicker ao-kicker--loud">Whitepaper · Secure · from code</p>
        <h1 class="ao-page-title">Helix — traffic DNA firewall</h1>
        <p class="ao-lead ao-lead--doc">
          Repo <a href="https://github.com/AgenticOp-io/chrysalis-security" target="_blank" rel="noopener">AgenticOp-io/chrysalis-security</a>.
          Packages: <code>helix-proxy</code>, <code>dna-core</code>, <code>helix-cli</code>, <code>cwl-bridge</code>,
          <code>helix-agent</code>, <code>helix-bridge</code>. Schema:
          <code>schemas/app-dna-v1.json</code> (<code>$id</code> agenticop.io).
          Protect does not require Convert or CWL. Optional bridge matches chrysalis-cwl RFC-0022.
        </p>
        <p class="ao-doc-meta"><a href="/docs.html">Docs</a> · <a href="/secure.html">Product</a> · <a href="/paper-traffic.html">Traffic decides</a> · <a href="/paper-cwl.html">CWL</a></p>
      </div>
    </section>

    <nav class="ao-doc-toc" aria-label="On this page">
      <div class="ao-wrap ao-wrap--doc">
        <p class="ao-doc-toc-label">On this page</p>
        <ol>
          <li><a href="#thesis">Thesis</a></li>
          <li><a href="#packages">Packages</a></li>
          <li><a href="#dna">app-dna-v1</a></li>
          <li><a href="#fp">Fingerprints</a></li>
          <li><a href="#holes">Mismatch codes</a></li>
          <li><a href="#modes">Modes</a></li>
          <li><a href="#placement">Placement</a></li>
          <li><a href="#sign">Signed DNA</a></li>
          <li><a href="#cli">CLI</a></li>
          <li><a href="#bridge">CWL bridge</a></li>
          <li><a href="#nongoals">Non-goals</a></li>
        </ol>
      </div>
    </nav>

    <article class="ao-doc-body">
      <section id="thesis" class="ao-section">
        <div class="ao-wrap ao-wrap--doc">
          <h2 class="ao-h2">Thesis</h2>
          <div class="ao-prose">
            <p>
              Classic stack asks “is this packet weird?” Helix asks “is this still the certified app?”
              Canon: trust nothing until certified; DNA from traffic, not hope; change guilty until promoted.
              Buyer sentence: “We don’t allow app shape we didn’t certify.”
            </p>
<pre class="ao-doc-diagram"><code>Real traffic → learn → draft DNA → promote → certified DNA
                                              ↓
                         scoreRequest / scoreResponse → match allow · mismatch block

Before: NGFW + WAF + hope
After:  NGFW + WAF + Helix DNA certificate on the app hop</code></pre>
          </div>
        </div>
      </section>

      <section id="packages" class="ao-section ao-section-alt">
        <div class="ao-wrap ao-wrap--doc">
          <h2 class="ao-h2">Implementation packages</h2>
          <div class="ao-doc-table-wrap" tabindex="0">
            <table class="ao-doc-table">
              <thead><tr><th>Package</th><th>Role</th></tr></thead>
              <tbody>
                <tr><th scope="row"><code>helix-proxy</code></th><td><code>createHelixProxy</code> — learn/shadow/enforce; default port 4080; panel at <code>/__helix/</code></td></tr>
                <tr><th scope="row"><code>dna-core</code></th><td>Learn, score, promote, sign, path templates, fingerprints</td></tr>
                <tr><th scope="row"><code>helix-cli</code></th><td><code>helix learn|promote|seed-cwl|cutover|…</code></td></tr>
                <tr><th scope="row"><code>cwl-bridge</code></th><td>Optional seed/compare against CWL surface</td></tr>
                <tr><th scope="row"><code>helix-agent</code></th><td>Mode A soft host intercept</td></tr>
                <tr><th scope="row"><code>helix-bridge</code></th><td>Mode B / L2 transparent placement</td></tr>
              </tbody>
            </table>
          </div>
          <div class="ao-prose">
            <p>
              Env: <code>MODE</code>, <code>DNA</code>, <code>OBSERVE</code>, <code>SHADOW_LOG</code>,
              <code>SIEM_LOG</code>, <code>HELIX_DNA_KEY</code>, <code>HELIX_DNA_REQUIRE</code>,
              <code>HELIX_MAX_BODY_BYTES</code>, <code>PLACEMENT=proxy|bridge|agent</code>.
            </p>
          </div>
        </div>
      </section>

      <section id="dna" class="ao-section">
        <div class="ao-wrap ao-wrap--doc">
          <h2 class="ao-h2">Artifact: <code>app-dna-v1</code></h2>
          <div class="ao-prose">
            <p>Required root: <code>schema</code>, <code>app_id</code>, <code>created_at</code>, <code>mode</code> (<code>draft|certified</code>), <code>routes</code>. <code>additionalProperties: false</code>.</p>
          </div>
          <div class="ao-doc-table-wrap" tabindex="0">
            <table class="ao-doc-table">
              <thead><tr><th>Route field</th><th>Constraint</th></tr></thead>
              <tbody>
                <tr><th scope="row"><code>method</code>, <code>path_template</code>, <code>host</code></th><td>Required — identity with content_class</td></tr>
                <tr><th scope="row"><code>content_class</code></th><td><code>json</code> | <code>html</code> | <code>other</code></td></tr>
                <tr><th scope="row"><code>status_classes</code></th><td>integer[]</td></tr>
                <tr><th scope="row"><code>response_key_fingerprint</code></th><td>string \| null — sorted JSON key paths depth ≤ 2</td></tr>
                <tr><th scope="row"><code>request_key_fingerprint</code></th><td>string \| null</td></tr>
                <tr><th scope="row"><code>query_key_fingerprint</code></th><td>names only; <code>""</code> = none learned; null = do not enforce (legacy)</td></tr>
                <tr><th scope="row"><code>holes[]</code></th><td><code>{ code, reason, observed_at? }</code></td></tr>
                <tr><th scope="row"><code>signature</code></th><td>optional <code>hmac-sha256</code> | <code>ed25519</code></td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section id="fp" class="ao-section ao-section-alt">
        <div class="ao-wrap ao-wrap--doc">
          <h2 class="ao-h2">Fingerprints (<code>dna-core</code>)</h2>
          <div class="ao-doc-table-wrap" tabindex="0">
            <table class="ao-doc-table">
              <thead><tr><th>Function</th><th>Behavior</th></tr></thead>
              <tbody>
                <tr><th scope="row"><code>pathTemplate</code></th><td>Strip query; UUID/hex/digits → <code>/:id</code>; static assets → <code>/**/*.js</code> etc.</td></tr>
                <tr><th scope="row"><code>contentClass</code></th><td>From Content-Type → json/html/other</td></tr>
                <tr><th scope="row"><code>responseKeyFingerprint</code></th><td>Sorted key paths; arrays/scalars as leaves; maxDepth 2</td></tr>
                <tr><th scope="row"><code>queryKeyFingerprint</code></th><td>Sorted unique query <em>names</em> (values ignored)</td></tr>
                <tr><th scope="row"><code>routeKey</code></th><td><code>`${host} ${METHOD} ${path_template}`</code></td></tr>
                <tr><th scope="row"><code>scoreRequest</code> / <code>scoreResponse</code></th><td>Runtime checks before/after upstream</td></tr>
              </tbody>
            </table>
          </div>
          <div class="ao-prose">
            <p>HTML body hashes deliberately <strong>not</strong> in DNA v0 (CMS churn → false positives).</p>
          </div>
        </div>
      </section>

      <section id="holes" class="ao-section">
        <div class="ao-wrap ao-wrap--doc">
          <h2 class="ao-h2">Enforce mismatch codes</h2>
          <div class="ao-doc-table-wrap" tabindex="0">
            <table class="ao-doc-table">
              <thead><tr><th>Code</th><th>When</th></tr></thead>
              <tbody>
                <tr><th scope="row"><code>HX-NO-DNA</code></th><td>No certified DNA (fail-closed)</td></tr>
                <tr><th scope="row"><code>HX-ROUTE-UNKNOWN</code></th><td>Route not in DNA</td></tr>
                <tr><th scope="row"><code>HX-QUERY-SCHEMA-DRIFT</code></th><td>Query names ≠ learned</td></tr>
                <tr><th scope="row"><code>HX-REQUEST-SCHEMA-DRIFT</code></th><td>Request JSON keys ≠ learned</td></tr>
                <tr><th scope="row"><code>HX-STATUS-DRIFT</code></th><td>Status class not learned</td></tr>
                <tr><th scope="row"><code>HX-CONTENT-CLASS-DRIFT</code></th><td>Content class mismatch</td></tr>
                <tr><th scope="row"><code>HX-SCHEMA-DRIFT</code></th><td>Response JSON keys fail-closed</td></tr>
                <tr><th scope="row"><code>HX-DNA-UNSIGNED</code> / <code>HX-DNA-BAD-SIG</code></th><td>Signature policy failures</td></tr>
                <tr><th scope="row"><code>HX-BODY-TOO-LARGE</code></th><td>Over <code>HELIX_MAX_BODY_BYTES</code> → 413</td></tr>
              </tbody>
            </table>
          </div>
          <div class="ao-prose">
            <p>Enforce: mismatch → 403 + <code>x-helix-hole</code>. Shadow: allow + alert / <code>x-helix-shadow-hole</code>.</p>
          </div>
        </div>
      </section>

      <section id="modes" class="ao-section ao-section-alt">
        <div class="ao-wrap ao-wrap--doc">
          <h2 class="ao-h2">Modes</h2>
<pre class="ao-doc-diagram"><code>learn → promote → shadow → enforce → reload</code></pre>
          <div class="ao-doc-table-wrap" tabindex="0">
            <table class="ao-doc-table">
              <thead><tr><th>Mode</th><th>Traffic</th><th>Security</th></tr></thead>
              <tbody>
                <tr><th scope="row">learn</th><td>Pass</td><td>Append observations NDJSON</td></tr>
                <tr><th scope="row">shadow</th><td>Pass</td><td>Score; alert only</td></tr>
                <tr><th scope="row">enforce</th><td>Pass iff DNA match</td><td>block mismatches (403)</td></tr>
              </tbody>
            </table>
          </div>
          <div class="ao-prose">
            <p>
              Promote without downtime: write DNA → <code>POST /__helix/reload</code> (or SIGHUP/SIGUSR2).
              Ops: <code>/__helix/</code>, <code>/__helix/healthz</code>, <code>/__helix/status</code>,
              <code>/__helix/api/snapshot</code>.
            </p>
          </div>
        </div>
      </section>

      <section id="placement" class="ao-section">
        <div class="ao-wrap ao-wrap--doc">
          <h2 class="ao-h2">Placement / NGFW</h2>
          <div class="ao-doc-table-wrap" tabindex="0">
            <table class="ao-doc-table">
              <thead><tr><th>Mode</th><th>Role</th><th>Code</th></tr></thead>
              <tbody>
                <tr><th scope="row">A — host intercept</th><td>Product target; NGFW NAT unchanged</td><td><code>helix-agent</code></td></tr>
                <tr><th scope="row">B — L2 transparent</th><td>Segment-wide</td><td><code>helix-bridge</code></td></tr>
                <tr><th scope="row">C — reverse proxy</th><td>Lab / simple hop</td><td><code>helix-proxy</code> day-one path</td></tr>
              </tbody>
            </table>
          </div>
          <div class="ao-prose">
            <p>
              D1: no NGFW TLS dependency. D4: augment without NAT homework.
              No FortiOS blade / Snort inspector SDK — SIEM via <code>SIEM_LOG</code> NDJSON.
            </p>
          </div>
        </div>
      </section>

      <section id="sign" class="ao-section ao-section-alt">
        <div class="ao-wrap ao-wrap--doc">
          <h2 class="ao-h2">Signed DNA</h2>
          <div class="ao-prose">
            <p>
              <code>signDna</code> / <code>verifyDna</code>: HMAC-SHA256 (default) or Ed25519.
              <code>HELIX_DNA_REQUIRE=1</code> refuses unsigned. Smoke: <code>SIGN_SMOKE_OK</code>.
              Promote must <code>stripBridgeEnvelope</code> so CWL annotations never enter certified <code>routeKey</code>.
            </p>
          </div>
        </div>
      </section>

      <section id="cli" class="ao-section">
        <div class="ao-wrap ao-wrap--doc">
          <h2 class="ao-h2">CLI surface</h2>
<pre class="ao-doc-diagram"><code>helix learn      --in observations.ndjson --out dna.json
helix promote    --in draft.json --out certified.json [--alg] [--key]
helix verify     --in certified.json [--require]
helix seed-cwl   --in routes.cwl --out draft.json [--deploy-profile] [--strip-bridge]
helix cutover    --cwl routes.cwl --dna certified.json [--deploy-profile]
helix ready      --in dna.json --target shadow|enforce
helix diff       --a a.json --b b.json</code></pre>
        </div>
      </section>

      <section id="bridge" class="ao-section ao-section-alt">
        <div class="ao-wrap ao-wrap--doc">
          <h2 class="ao-h2">Optional CWL bridge</h2>
          <div class="ao-prose">
            <p>
              Protect stays DNA-only (D5). Cutover default: CWL surface ⊆ certified DNA.
              Consumes <code>@agenticop-io/cwl/dna-seed</code> (SoR in CWL pillar).
              Tokens: <code>CWL_BRIDGE_SMOKE_OK</code>, <code>CUTOVER_SMOKE_OK</code>,
              <code>CUTOVER_MULTIHOST_OK</code>, <code>LIVE_MATCH_OK</code>.
              CWL side: <code>smoke:ut-spine</code> → <code>UT_SPINE_OK</code>.
            </p>
          </div>
        </div>
      </section>

      <section id="nongoals" class="ao-section">
        <div class="ao-wrap ao-wrap--doc">
          <h2 class="ao-h2">Non-goals and residual</h2>
          <div class="ao-prose">
            <ul>
              <li>Replace WAF / UEBA / SQLi signature packs.</li>
              <li>Helix DSL instead of traffic DNA; forking CWL grammar into Helix.</li>
              <li>Requiring Convert monorepo to enforce.</li>
              <li>Inventing soak traffic — lab preflight ≠ customer soak.</li>
            </ul>
            <p>See <a href="/paper-traffic.html">Traffic decides</a>.</p>
          </div>
        </div>
      </section>
    </article>
  </main>
  """;
}

@page GET "/paper-traffic.html"
page paper_traffic {
  effects: none;
  nav docs;
  layout site;
  title "Traffic decides — whitepaper | AgenticOps";
  description "From code: TRAFFIC-DECIDES-BAR gates, smoke:ut-spine steps, declared vs observed, command tokens, ownership matrix, soak residual.";
  canonical "https://agenticop.io/paper-traffic.html";
  meta og title "Traffic decides whitepaper";
  meta og url "https://agenticop.io/paper-traffic.html";
  meta og image "https://agenticop.io/logo.svg";
  icon logo;
  return html """
<main id="main" class="ao-page-main ao-doc">
    <section class="ao-section ao-page-hero ao-page-hero--brand">
      <div class="ao-wrap ao-wrap--doc">
        <p class="ao-kicker ao-kicker--loud">Whitepaper · ship bar · from code</p>
        <h1 class="ao-page-title">Traffic decides</h1>
        <p class="ao-lead ao-lead--doc">
          AI drafts. Recorded traffic decides.
          Shared bar from <code>TRAFFIC-DECIDES-BAR.md</code>,
          <code>smoke-ut-spine.mjs</code>, Convert/Secure bar smokes, and RFC-0022/0023.
        </p>
        <p class="ao-doc-meta"><a href="/docs.html">Docs</a> · <a href="/proof.html">Proof</a> · <a href="/paper-cwl.html">CWL</a> · <a href="/paper-helix.html">Helix</a></p>
      </div>
    </section>

    <nav class="ao-doc-toc" aria-label="On this page">
      <div class="ao-wrap ao-wrap--doc">
        <p class="ao-doc-toc-label">On this page</p>
        <ol>
          <li><a href="#bar">Bar</a></li>
          <li><a href="#pillars">Pillars</a></li>
          <li><a href="#gates">Closed gates</a></li>
          <li><a href="#declared">Declared vs observed</a></li>
          <li><a href="#spine">UT spine steps</a></li>
          <li><a href="#tokens">Command tokens</a></li>
          <li><a href="#residual">Operator residual</a></li>
          <li><a href="#nongoals">Non-goals</a></li>
        </ol>
      </div>
    </nav>

    <article class="ao-doc-body">
      <section id="bar" class="ao-section">
        <div class="ao-wrap ao-wrap--doc">
          <h2 class="ao-h2">Bar</h2>
          <div class="ao-prose">
            <ul>
              <li><strong>Propose ≠ dispose</strong> — humans and LLMs face the same verify path.</li>
              <li><strong>verified claims</strong> — unproven stubs fail.</li>
              <li><strong>No façades</strong> — demo finish over missing origin fails (D6447).</li>
              <li><strong>Language first</strong> — CWL tip pins Convert/Secure consumers.</li>
              <li><strong>Traffic decides</strong> — recorded behavior beats migration memos.</li>
            </ul>
            <p>
              Helix canon: trust nothing until certified; DNA from traffic, not hope;
              change guilty until promoted.
            </p>
          </div>
        </div>
      </section>

      <section id="pillars" class="ao-section ao-section-alt">
        <div class="ao-wrap ao-wrap--doc">
          <h2 class="ao-h2">Three pillars + shared bar</h2>
<pre class="ao-doc-diagram"><code>                 ┌─────────────┐
                 │     CWL     │  language + specs + tooling
                 └──────┬──────┘
        ┌───────────────┼───────────────┐
        ▼               │               ▼
┌───────────────┐       │       ┌───────────────┐
│    Convert    │◄──────┴──────►│    Secure     │
│  (translator) │   shared bar  │   (Helix)     │
└───────────────┘  propose/     └───────────────┘
                   verify/holes</code></pre>
        </div>
      </section>

      <section id="gates" class="ao-section">
        <div class="ao-wrap ao-wrap--doc">
          <h2 class="ao-h2">Closed agent gates</h2>
          <div class="ao-doc-table-wrap" tabindex="0">
            <table class="ao-doc-table">
              <thead><tr><th>Gate</th><th>Owner</th><th>Token</th><th>Status</th></tr></thead>
              <tbody>
                <tr><th scope="row">Propose ≠ dispose + oracle replay</th><td>Convert</td><td><code>TRAFFIC_DECIDES_CONVERT_OK</code></td><td>Done</td></tr>
                <tr><th scope="row">Helix shadow-ready</th><td>Secure</td><td><code>TRAFFIC_DECIDES_SECURE_OK</code></td><td>Done</td></tr>
                <tr><th scope="row">Live customer soak → enforce</th><td>Operator</td><td>Real <code>SHADOW_LOG</code></td><td><strong>Open</strong></td></tr>
              </tbody>
            </table>
          </div>
          <div class="ao-prose">
            <p>
              Ship bar for agents = the first two gates. Prefer “recorded traffic” for Convert/oracle.
              Do not overclaim finished customer soak until real <code>SHADOW_LOG</code> exists.
            </p>
          </div>
        </div>
      </section>

      <section id="declared" class="ao-section ao-section-alt">
        <div class="ao-wrap ao-wrap--doc">
          <h2 class="ao-h2">Declared vs observed</h2>
          <div class="ao-prose">
            <ul>
              <li>CWL <code>effects:</code> are <em>declared</em>; DNA proves <em>observed</em> traffic.</li>
              <li>Seed may hint auth; certification still requires traffic or explicit promote (Helix-owned).</li>
              <li>RFC-0022 identity: method + path_template (+ host from deploy profile).</li>
              <li>CWL holes and DNA <code>holes[]</code> are different vocabularies — never auto-copy.</li>
              <li>Content-class drift (JSON route returning HTML errors) is DNA/Helix, not grammar.</li>
              <li>Static asset globs are DNA-only collapse via <code>pathTemplate</code>.</li>
              <li>HTML body hashes not in DNA v0.</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="spine" class="ao-section">
        <div class="ao-wrap ao-wrap--doc">
          <h2 class="ao-h2">UT ↔ Helix spine — exact steps</h2>
          <div class="ao-prose">
            <p>
              Owner: <code>engines/chrysalis-cwl/scripts/smoke-ut-spine.mjs</code> (G10125).
              Report: <code>reports/ut-spine/ut-spine.json</code>.
              Invariant string: <em>CWL owns surface contract; Helix disposes DNA; Convert does not own this spine</em>.
            </p>
            <ol>
              <li>Assert gold <code>fixtures/language-gold/24-dna-bridge/routes.cwl</code></li>
              <li>Validate optional <code>deploy-profile.json</code> (<code>cwl-deploy-profile-v1</code>)</li>
              <li>Always run <code>gate-cwl-dna-bridge.mjs</code> → contract equality</li>
              <li>If sibling Secure <code>packages/cwl-bridge</code> present:
                <ul>
                  <li><code>seedDnaFromCwlFile</code> → assert <code>app-dna-v1</code> + <code>bridge.kind === cwl-surface-seed</code></li>
                  <li><code>stripBridgeEnvelope</code></li>
                  <li>Promote <code>mode: certified</code> + <code>signDna</code> / <code>verifyDna</code></li>
                  <li><code>compareCwlSurfaceToDna</code> → cutover <code>cwl_surface_subseteq_dna</code></li>
                  <li><code>scoreRequest</code> allow <code>/api/health</code>, deny <code>/api/backdoor</code></li>
                  <li>Optional Secure <code>cutover-smoke</code> → <code>CUTOVER_SMOKE_OK</code></li>
                </ul>
              </li>
              <li>Print <code>UT_SPINE_OK</code> (Helix soft-skip without Secure unless <code>--require-helix</code>)</li>
            </ol>
          </div>
<pre class="ao-doc-diagram"><code>CWL language gold (24-dna-bridge)
  → RFC-0022 contract gate (chrysalis-cwl)
  → Helix seed → strip → promote(+HMAC)
  → compare: CWL surface ⊆ certified DNA
  → enforce allow/deny</code></pre>
          <div class="ao-doc-table-wrap" tabindex="0">
            <table class="ao-doc-table">
              <thead><tr><th>Pillar</th><th>Owns</th><th>Must not</th></tr></thead>
              <tbody>
                <tr><th scope="row">CWL</th><td>Surface contract, gold 24, <code>smoke:ut-spine</code></td><td>Become the firewall</td></tr>
                <tr><th scope="row">Secure</th><td>DNA seed/compare/enforce, <code>cutover-smoke</code></td><td>Fork CWL mapping; require Convert monorepo</td></tr>
                <tr><th scope="row">Convert</th><td>Origin → CWL; consumer cutover smoke</td><td>Own the spine; redefine language</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section id="tokens" class="ao-section ao-section-alt">
        <div class="ao-wrap ao-wrap--doc">
          <h2 class="ao-h2">Command tokens</h2>
          <div class="ao-doc-table-wrap" tabindex="0">
            <table class="ao-doc-table">
              <thead><tr><th>Where</th><th>Command</th><th>Token</th></tr></thead>
              <tbody>
                <tr><th scope="row">CWL</th><td><code>npm run test:cwl-dna-bridge</code></td><td><code>CWL_DNA_BRIDGE_OK</code></td></tr>
                <tr><th scope="row">CWL</th><td><code>npm run smoke:ut-spine</code></td><td><code>UT_SPINE_OK</code></td></tr>
                <tr><th scope="row">CWL</th><td><code>npm run smoke:ut-evidence</code></td><td><code>UT_EVIDENCE_OK</code></td></tr>
                <tr><th scope="row">Convert</th><td><code>pnpm run hub:traffic-decides-bar-smoke</code></td><td><code>TRAFFIC_DECIDES_CONVERT_OK</code></td></tr>
                <tr><th scope="row">Convert</th><td><code>pnpm run hub:cwl-helix-cutover-smoke</code></td><td><code>CWL_HELIX_CUTOVER_OK</code> / <code>SKIP</code></td></tr>
                <tr><th scope="row">Secure</th><td><code>npm run traffic-decides-bar-smoke</code></td><td><code>TRAFFIC_DECIDES_SECURE_OK</code></td></tr>
                <tr><th scope="row">Secure</th><td><code>npm run cutover-smoke</code></td><td><code>CUTOVER_SMOKE_OK</code></td></tr>
                <tr><th scope="row">Secure</th><td><code>npm run sign-smoke</code></td><td><code>SIGN_SMOKE_OK</code></td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section id="residual" class="ao-section">
        <div class="ao-wrap ao-wrap--doc">
          <h2 class="ao-h2">Operator residual</h2>
          <div class="ao-prose">
            <p>
              Live customer soak → enforce is not closed by lab preflight.
              Shadow through real peak and off-peak, then flip enforce.
              Do not invent customer soak traffic to paint the bar green.
              Preflight smoke ≠ soak.
            </p>
          </div>
        </div>
      </section>

      <section id="nongoals" class="ao-section ao-section-alt">
        <div class="ao-wrap ao-wrap--doc">
          <h2 class="ao-h2">Non-goals / stop list</h2>
          <div class="ao-prose">
            <ul>
              <li>Convert Pilot Kit ≠ DNA cutover.</li>
              <li>CWL is not the firewall.</li>
              <li>Secure must not require the Convert monorepo to enforce.</li>
              <li>No Nest / LiveView / Flutter façades; no EXTFMAP invent.</li>
              <li>NGFW: Helix augments; it does not absorb VIP/NAT homework as day-one.</li>
            </ul>
            <p><a href="/paper-cwl.html">CWL</a> · <a href="/paper-convert.html">Convert</a> · <a href="/paper-helix.html">Helix</a> · <a href="/proof.html">Proof</a></p>
          </div>
        </div>
      </section>
    </article>
  </main>
  """;
}

@page GET "/paper-webir.html"
page paper_webir {
  effects: none;
  nav docs;
  layout site;
  title "WebIR & Rosetta whitepaper | AgenticOps";
  description "From code: @chrysalis/webir 2.0.2 Module/Effect dialects, ingest→emit pipeline, core vs peel, DNA seed fingerprints, Hub grades, WPTP boundary.";
  canonical "https://agenticop.io/paper-webir.html";
  meta og title "WebIR & Rosetta whitepaper";
  meta og url "https://agenticop.io/paper-webir.html";
  meta og image "https://agenticop.io/chrysalis-explainer.png";
  icon logo;
  return html """
<main id="main" class="ao-page-main ao-doc">
    <section class="ao-section ao-page-hero ao-page-hero--brand">
      <div class="ao-wrap ao-wrap--doc">
        <p class="ao-kicker ao-kicker--loud">Whitepaper · IR · from code</p>
        <h1 class="ao-page-title">WebIR and the Rosetta path</h1>
        <p class="ao-lead ao-lead--doc">
          Package <code>@chrysalis/webir</code> <strong>2.0.2</strong> lives in
          <a href="https://github.com/AgenticOp-io/chrysalis-cwl" target="_blank" rel="noopener">chrysalis-cwl</a>
          (<code>packages/webir</code>. Convert junctions it — no second tree.
          Sourced from <code>ROSETTA-UT-PATH.md</code>, <code>WEBIR-REVERSE-HOME.md</code>,
          <code>CORE-VS-PEEL.md</code>, <code>HUB-TRANSLATION-PATHS.md</code>, and dna-seed code.
        </p>
        <p class="ao-doc-meta"><a href="/docs.html">Docs</a> · <a href="/paper-cwl.html">CWL</a> · <a href="/paper-convert.html">Convert</a> · <a href="/wptp.html">WPTP</a></p>
      </div>
    </section>

    <nav class="ao-doc-toc" aria-label="On this page">
      <div class="ao-wrap ao-wrap--doc">
        <p class="ao-doc-toc-label">On this page</p>
        <ol>
          <li><a href="#thesis">Thesis</a></li>
          <li><a href="#package">Package surface</a></li>
          <li><a href="#stack">Surface stack</a></li>
          <li><a href="#lanes">Ingest / emit / verify</a></li>
          <li><a href="#core">Core vs peel</a></li>
          <li><a href="#seed">DNA seed fields</a></li>
          <li><a href="#profile">Deploy profiles</a></li>
          <li><a href="#grades">Hub grades</a></li>
          <li><a href="#wptp">WPTP</a></li>
          <li><a href="#nongoals">Non-goals</a></li>
        </ol>
      </div>
    </nav>

    <article class="ao-doc-body">
      <section id="thesis" class="ao-section">
        <div class="ao-wrap ao-wrap--doc">
          <h2 class="ao-h2">Thesis</h2>
          <div class="ao-prose">
            <p>
              Frameworks are many writings of the same meaning. The Rosetta rule recovers that meaning
              without a lossy “regex lift” as the semantic spine. CWL → WebIR via ingest;
              WebIR → CWL via emit-from-hub tooling. <strong>WebIR is the only IR between languages</strong>
              — emit must not bypass it (<code>HUB-TRANSLATION-PATHS.md</code>).
            </p>
            <p>
              Honesty law: unsupported behavior → <code>hole reason;</code>.
              Guessing is a forged gene. Silent stubs are cancer.
            </p>
          </div>
        </div>
      </section>

      <section id="package" class="ao-section ao-section-alt">
        <div class="ao-wrap ao-wrap--doc">
          <h2 class="ao-h2">Package surface</h2>
          <div class="ao-doc-table-wrap" tabindex="0">
            <table class="ao-doc-table">
              <thead><tr><th>Export</th><th>Role</th></tr></thead>
              <tbody>
                <tr><th scope="row"><code>Module</code> / <code>NodeBase</code></th><td>IR graph root and node base</td></tr>
                <tr><th scope="row"><code>Effect</code> / <code>ModuleBuilder</code></th><td>Effects + construction helpers</td></tr>
                <tr><th scope="row">visit / merge / snapshot</th><td>Traversal and provenance helpers</td></tr>
                <tr><th scope="row"><code>./dialects/web-request</code></th><td>HTTP request/response dialect</td></tr>
                <tr><th scope="row"><code>./dialects/effect</code></th><td>Effect dialect</td></tr>
                <tr><th scope="row"><code>./dialects/data</code></th><td>Page/data dialect</td></tr>
              </tbody>
            </table>
          </div>
          <div class="ao-prose">
            <p>
              Convert: <code>pnpm run link:webir-from-cwl</code>; prove
              <code>hub:webir-resolve-smoke</code>, <code>hub:cwl-language-pillar-smoke</code>.
              Pillar: <code>npm run build:webir</code> / <code>link:webir</code>.
              Reverse authoring: <code>cwl fmt --webir</code>, <code>cwl emit-check</code>.
            </p>
          </div>
        </div>
      </section>

      <section id="stack" class="ao-section">
        <div class="ao-wrap ao-wrap--doc">
          <h2 class="ao-h2">Surface stack</h2>
<pre class="ao-doc-diagram"><code>Authoring (CWL surfaces)
┌─────────────────────────────────────────┐
│  CWL API    @route  → JSON handlers      │
│  CWL Pages  @page   → HTML / layouts     │
│  CWL Data   load    → page data sidecar  │
│  CWL UI     @component / islands         │
│  CWL Effects use / effects metadata      │
│  Control    if / foreach (RFC-0021)      │
└──────────────────┬──────────────────────┘
                   │ 1:1  (cwl-ingest / emit)
                   ▼
            WebIR (semantic IR)
                   │
       ┌───────────┼───────────┐
       ▼           ▼           ▼
  emit-hono   runtime-cwl   chimera
  emit-fastify              (migration)
                   │
                   ▼
            oracle / verify replay</code></pre>
        </div>
      </section>

      <section id="lanes" class="ao-section ao-section-alt">
        <div class="ao-wrap ao-wrap--doc">
          <h2 class="ao-h2">Ingest / emit / verify lanes</h2>
          <div class="ao-prose">
            <p>Convert Hub translation paths (WebIR always in the middle):</p>
          </div>
          <div class="ao-doc-table-wrap" tabindex="0">
            <table class="ao-doc-table">
              <thead><tr><th>Lane</th><th>Modules (examples)</th></tr></thead>
              <tbody>
                <tr><th scope="row">Ingest</th><td><code>chrysalis-ingest</code>, <code>hub-ast-lift</code>, <code>hub-pattern-lift</code>, <code>hub-file-lift</code>, <code>*-ast-ingest.mjs</code>, framework peels</td></tr>
                <tr><th scope="row">Emit</th><td><code>chrysalis-emit</code>, <code>hub-webir-typescript</code>, <code>hub-native-*</code>, <code>emit-*-from-hub.mjs</code>, <code>emit-cwl-from-hub.mjs</code></td></tr>
                <tr><th scope="row">Verify</th><td><code>legacy-oracle-php</code>, <code>hub-structural-gold</code>, <code>hub-trace-replay</code> (<code>@chrysalis/verify</code>), <code>wptp-contract</code>, <code>none</code></td></tr>
              </tbody>
            </table>
          </div>
          <div class="ao-prose">
            <p>
              Dispatcher: <code>hub-lift-dispatch.mjs</code> → specialized peels before generic
              <code>lift-to-webir.mjs</code>. Fat CWL control lowering stays Convert-side
              (<code>cwl-control-lower.mjs</code>; language grammar stays CWL pillar.
            </p>
          </div>
        </div>
      </section>

      <section id="core" class="ao-section">
        <div class="ao-wrap ao-wrap--doc">
          <h2 class="ao-h2">Core vs peel (D6551)</h2>
          <div class="ao-doc-table-wrap" tabindex="0">
            <table class="ao-doc-table">
              <thead><tr><th>Layer</th><th>What lives here</th></tr></thead>
              <tbody>
                <tr><th scope="row">Core</th><td>WebIR types; CWL grammar/AST/parse/print/diagnose; residual contracts; verify dispose semantics; provenance</td></tr>
                <tr><th scope="row">Peel</th><td>Origin dialect peels, Hub smokes/proves, COBOL adapters, emit backends, oracle sidecars, CLI orchestration</td></tr>
              </tbody>
            </table>
          </div>
          <div class="ao-prose">
            <p>
              Peels map into the genome or leave holes. They do not expand the grammar.
              Promotion to core only when IR/CWL/residual/verify <em>semantics</em> change —
              not when a prove script grows.
            </p>
          </div>
        </div>
      </section>

      <section id="seed" class="ao-section ao-section-alt">
        <div class="ao-wrap ao-wrap--doc">
          <h2 class="ao-h2">DNA seed from CWL surface</h2>
          <div class="ao-prose">
            <p>
              Implemented in <code>cwl-dna-seed.mjs</code>. Draft document:
              <code>schema: app-dna-v1</code>, <code>mode: draft</code>, <code>bridge.kind: cwl-surface-seed</code>,
              identity <code>`${host} ${METHOD} ${path_template}`</code>.
            </p>
          </div>
          <div class="ao-doc-table-wrap" tabindex="0">
            <table class="ao-doc-table">
              <thead><tr><th>Fingerprint</th><th>Computation</th></tr></thead>
              <tbody>
                <tr><th scope="row">response keys</th><td>Sorted JSON key paths depth ≤ 2; null for non-JSON / SSE</td></tr>
                <tr><th scope="row">request keys</th><td>Union of body + multipart field + file <em>names</em></td></tr>
                <tr><th scope="row">query keys</th><td>Sorted query binding names (values ignored)</td></tr>
                <tr><th scope="row">content_class</th><td><code>html</code> | <code>json</code> | <code>other</code> from return/surface/stream</td></tr>
                <tr><th scope="row">status_classes</th><td>Hundreds bucket if status present</td></tr>
              </tbody>
            </table>
          </div>
          <div class="ao-prose">
            <p>
              Envelope annotations (<code>cwl_effects</code>, <code>cwl_surface</code>, stream/multipart)
              never become certified DNA route fields. CWL holes ≠ DNA <code>holes[]</code>.
              Golds: <code>24-dna-bridge</code>, <code>34-dna-bridge-surfaces</code>.
            </p>
          </div>
        </div>
      </section>

      <section id="profile" class="ao-section">
        <div class="ao-wrap ao-wrap--doc">
          <h2 class="ao-h2">Deploy profiles (RFC-0023)</h2>
          <div class="ao-prose">
            <p>
              External artifact <code>cwl-deploy-profile-v1</code>: <code>app_id</code>, <code>host</code>,
              <code>hosts{}</code>, <code>path_shape_equality</code>, <code>content_class_from_cwl</code>.
              Not embedded in CWL grammar. Static asset globs (<code>/**/*.js</code>) are DNA-only collapse.
            </p>
          </div>
        </div>
      </section>

      <section id="grades" class="ao-section ao-section-alt">
        <div class="ao-wrap ao-wrap--doc">
          <h2 class="ao-h2">Hub grades</h2>
          <div class="ao-doc-table-wrap" tabindex="0">
            <table class="ao-doc-table">
              <thead><tr><th>Path</th><th>Signal</th></tr></thead>
              <tbody>
                <tr><th scope="row">cwl → hono / fastify / typescript</th><td>Gold when harness + corpus hold</td></tr>
                <tr><th scope="row">cwl → cwl</th><td>Gold (round-trip)</td></tr>
                <tr><th scope="row">any → cwl</th><td>Silver (holes preserved)</td></tr>
                <tr><th scope="row">verify lane <code>none</code></th><td>Silver/open — no trace parity claim</td></tr>
              </tbody>
            </table>
          </div>
          <div class="ao-prose"><p>Hub matrix / path knowledge APIs are the source of truth — not marketing greens.</p></div>
        </div>
      </section>

      <section id="wptp" class="ao-section">
        <div class="ao-wrap ao-wrap--doc">
          <h2 class="ao-h2">WPTP boundary</h2>
          <div class="ao-prose">
            <p>
              <a href="/wptp.html">WPTP</a> is a public platform orbit: <code>@wptp/ir</code>,
              OpenAPI/HAR adapters, bronze emitters, compatibility matrix.
              Hub verify lane <code>wptp-contract</code> can use that orbit.
              WPTP does not redefine CWL grammar. Prefer <code>platforms/wptp-*</code>
              over inventing a second DNA in Convert.
            </p>
          </div>
        </div>
      </section>

      <section id="nongoals" class="ao-section ao-section-alt">
        <div class="ao-wrap ao-wrap--doc">
          <h2 class="ao-h2">Non-goals</h2>
          <div class="ao-prose">
            <ul>
              <li>Do not fork <code>@chrysalis/webir</code> under Convert.</li>
              <li>Do not bypass WebIR in emit.</li>
              <li>CWL is not the firewall; WebIR is not a WAF.</li>
              <li>CWL does not replace databases, queues, or browser runtimes.</li>
            </ul>
            <p><a href="/paper-cwl.html">CWL</a> · <a href="/paper-convert.html">Convert</a> · <a href="/paper-helix.html">Helix</a></p>
          </div>
        </div>
      </section>
    </article>
  </main>
  """;
}

@page GET "/press.html"
page press {
  effects: none;
  nav press;
  layout site;
  title "CWL tip 1.0.80 — complete site on Firebase | AgenticOps Press";
  description "Press: CWL tip 1.0.80 ships a complete marketing site in CWL on Firebase — owned fonts/CSS, no host menu JS. Convert and Secure pin the tip. Full AgenticOp-io catalog.";
  canonical "https://agenticop.io/press.html";
  meta robots "index, follow";
  meta og type "article";
  meta og title "CWL tip 1.0.80 — complete CWL site on Firebase";
  meta og description "agenticop.io is emitted from site.cwl (tip 1.0.80). Convert translates. Helix proves from traffic.";
  meta og url "https://agenticop.io/press.html";
  meta og image "https://agenticop.io/linkedin-cwl-release.png";
  meta twitter card "summary_large_image";
  meta twitter title "CWL tip 1.0.80 — complete on Firebase";
  meta twitter description "Chrysalis Web Language and the AgenticOps open-source catalog.";
  meta twitter image "https://agenticop.io/linkedin-cwl-release.png";
  icon logo;
  jsonld """
{
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": "CWL tip 1.0.80 — complete marketing site on Firebase",
    "datePublished": "2026-09-10",
    "dateModified": "2026-10-06",
    "author": { "@type": "Person", "name": "David Peterson", "url": "https://agenticop.io/about.html" },
    "publisher": { "@type": "Organization", "name": "AgenticOps", "url": "https://agenticop.io/" },
    "image": "https://agenticop.io/linkedin-cwl-release.png",
    "mainEntityOfPage": "https://agenticop.io/press.html",
    "description": "CWL tip 1.0.80: complete CWL marketing genome on Firebase. Convert and Secure pin it. Full AgenticOp-io catalog."
  }
  """;
  return html """
<main id="main" class="ao-page-main ao-doc">
    <article class="ao-doc-body">
      <header class="ao-section ao-page-hero ao-page-hero--brand ao-page-hero--cwl">
        <div class="ao-wrap ao-wrap--doc">
          <p class="ao-kicker">Press · updated 6 October 2026</p>
          <h1 class="ao-page-title">CWL tip 1.0.80 — complete on Firebase</h1>
          <p class="ao-lead ao-lead--doc">
            <strong>agenticop.io</strong> is now a <strong>complete CWL marketing site</strong>:
            the public pages are the genome <code>site.cwl</code>, frozen with certified <code>emit:site</code>,
            hosted on Firebase — owned fonts and CSS, literal year, CSS menu, no host menu or device JavaScript.
            Tip <strong>1.0.80</strong> is the language pin Convert and Secure consume.
          </p>
          <p class="ao-doc-meta">
            Contact: <a href="mailto:hello@agenticop.io">hello@agenticop.io</a>
            · <a href="https://www.linkedin.com/in/vibe-architect/" target="_blank" rel="noopener">David Peterson</a>
            · Demo: <a href="https://agenticop-cwl-demo.web.app/" target="_blank" rel="noopener">agenticop-cwl-demo.web.app</a>
          </p>
        </div>
      </header>

      <section class="ao-section">
        <div class="ao-wrap ao-wrap--doc">
          <div class="ao-prose">
            <p>
              <strong>CWL</strong> describes what a web app <em>is</em>: routes, pages, data, UI, effects —
              and <strong>verified claims</strong> when a claim cannot be made safely.
              Tip <strong>1.0.80</strong> is available under Apache-2.0 at
              <a href="https://github.com/AgenticOp-io/chrysalis-cwl" target="_blank" rel="noopener">github.com/AgenticOp-io/chrysalis-cwl</a>.
              The complete-site contract is
              <a href="https://github.com/AgenticOp-io/chrysalis-cwl/blob/main/docs/language/CWL-SITE-COMPLETE.md" target="_blank" rel="noopener">CWL-SITE-COMPLETE.md</a>
              (token <code>CWL_SITE_COMPLETE_OK</code>).
            </p>
            <p>
              Progress since the first public tip: site document shell and nav (1.0.60–1.0.65),
              host assets and Firebase name (1.0.66), document identity and social card (1.0.69–1.0.70),
              live document / dynamic HTML / database engines (1.0.72–1.0.74),
              host site emit without a Cloud Function (1.0.75), 100% site contract and owned fonts (1.0.76–1.0.77),
              then <strong>complete</strong> marketing genome without host drawer/device JS (1.0.78).
            </p>
            <p>
              Two sister pillars consume that language; they do not redefine it.
              <strong>Convert</strong> is the Universal Translator: origin stacks peel through WebIR and CWL into modern emits,
              with COBOL inventory work and Pilot Kit wedge <code>pilot:cobol-clbs</code> included in the Convert tree.
              <strong>Secure (Helix)</strong> certifies live identity from traffic DNA (<code>app-dna-v1</code>),
              with an optional CWL bridge that must match chrysalis-cwl semantics.
              Across both: propose ≠ dispose; recorded traffic decides what ships.
              Firebase CLI deploy stays site/ops — outside language bytes.
            </p>
          </div>
          <figure class="ao-explainer-band ao-explainer-band--inset" style="margin-top:1.75rem">
            <img
              class="ao-explainer-img"
              src="/linkedin-cwl-release.svg"
              width="1280"
              height="720"
              alt="CWL — DNA of the web, tip 1.0.80 complete site, AgenticOp-io"
              loading="eager"
            />
            <figcaption class="ao-doc-meta" style="margin-top:0.75rem">CWL tip 1.0.80 — complete site — AgenticOp-io</figcaption>
          </figure>
        </div>
      </section>

      <section class="ao-section ao-section-alt">
        <div class="ao-wrap ao-wrap--doc">
          <h2 class="ao-h2">Open-source catalog</h2>
          <div class="ao-prose">
            <p>
              A single index of public hosts, repositories, packages, and citations is live at
              <a href="/published.html">agenticop.io/published.html</a>.
              Technical papers are collected under <a href="/docs.html">agenticop.io/docs.html</a>.
            </p>
          </div>
          <div class="ao-doc-table-wrap" tabindex="0">
            <table class="ao-doc-table">
              <thead><tr><th>Work</th><th>Where</th></tr></thead>
              <tbody>
                <tr>
                  <th scope="row">CWL</th>
                  <td><a href="https://github.com/AgenticOp-io/chrysalis-cwl" target="_blank" rel="noopener">chrysalis-cwl</a> · <a href="/chrysalis.html">chrysalis.html</a> · <a href="/paper-cwl.html">paper</a> · cite <a href="https://doi.org/10.5281/zenodo.22691492" target="_blank" rel="noopener">10.5281/zenodo.22691492</a></td>
                </tr>
                <tr>
                  <th scope="row">Convert</th>
                  <td><a href="https://github.com/AgenticOp-io/chrysalis" target="_blank" rel="noopener">chrysalis</a> · <a href="/convert.html">convert.html</a> · Hub <a href="https://hub.agenticop.io/hub/" target="_blank" rel="noopener">hub.agenticop.io/hub/</a></td>
                </tr>
                <tr>
                  <th scope="row">Secure / Helix</th>
                  <td><a href="https://github.com/AgenticOp-io/chrysalis-security" target="_blank" rel="noopener">chrysalis-security</a> · <a href="/secure.html">secure.html</a></td>
                </tr>
                <tr>
                  <th scope="row">WPTP</th>
                  <td>IR, adapters, emitters, matrix · <a href="https://agenticop-io.github.io/wptp-matrix/" target="_blank" rel="noopener">matrix viewer</a> · <a href="/wptp.html">wptp.html</a></td>
                </tr>
                <tr>
                  <th scope="row">Fragility Discovery Engine</th>
                  <td>v0.6.7 · <a href="https://pypi.org/project/fragility-engine/" target="_blank" rel="noopener">PyPI fragility-engine</a> · <a href="https://fragility.agenticop.io/" target="_blank" rel="noopener">fragility.agenticop.io</a> · cite <a href="https://doi.org/10.5281/zenodo.20455688" target="_blank" rel="noopener">10.5281/zenodo.20455688</a></td>
                </tr>
                <tr>
                  <th scope="row">Ghost Museum</th>
                  <td><a href="https://ghosts.agenticop.io/" target="_blank" rel="noopener">ghosts.agenticop.io</a> · <a href="https://github.com/AgenticOp-io/ghost-museum" target="_blank" rel="noopener">ghost-museum</a></td>
                </tr>
                <tr>
                  <th scope="row">Lane / PathfinderSSH MSP</th>
                  <td><a href="https://github.com/AgenticOp-io/lane" target="_blank" rel="noopener">lane</a> · <a href="https://github.com/AgenticOp-io/pathfinderssh-msp" target="_blank" rel="noopener">pathfinderssh-msp</a> · upstream PathfinderSSH by <a href="https://github.com/scottpeterman/pathfinderssh" target="_blank" rel="noopener">Scott Peterman</a></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="ao-prose" style="margin-top:1.25rem">
            <p>
              COBOL modernization peels and the <code>pilot:cobol-clbs</code> wedge ship inside Convert —
              not as a separate Python package. Details:
              <a href="/published.html#cobol">published.html#cobol</a>.
            </p>
            <p>
              Operator systems at <a href="https://wisptools.io" target="_blank" rel="noopener">wisptools.io</a>
              remain a separate product brand, cited here as shipped proof — not as AgenticOps naming.
            </p>
          </div>
        </div>
      </section>

      <section class="ao-section">
        <div class="ao-wrap ao-wrap--doc">
          <h2 class="ao-h2">About AgenticOps</h2>
          <div class="ao-prose">
            <p>
              AgenticOps builds verification-backed modernization tools around Chrysalis:
              language first (CWL), translation (Convert), and live identity (Helix).
              Founder and architect: David Peterson.
            </p>
            <p>
              Web: <a href="https://agenticop.io/">agenticop.io</a>
              · Overview: <a href="/whitepaper.html">whitepaper.html</a>
              · Org: <a href="https://github.com/AgenticOp-io" target="_blank" rel="noopener">github.com/AgenticOp-io</a>
              · Media: <a href="mailto:hello@agenticop.io">hello@agenticop.io</a>
            </p>
          </div>
        </div>
      </section>
    </article>
  </main>
  """;
}

@page GET "/projects.html"
page projects {
  effects: none;
  nav projects;
  layout site;
  title "Projects — AgenticOp-io catalog | AgenticOps";
  description "Full project catalog: CWL, Convert, Secure, WPTP, FDE, Ghost Museum, Lane, PathfinderSSH MSP, wisptools proof links.";
  canonical "https://agenticop.io/projects.html";
  meta og title "Projects catalog";
  meta og url "https://agenticop.io/projects.html";
  meta og image "https://agenticop.io/logo.svg";
  icon logo;
  return html """
<main id="main" class="ao-page-main">
    <section class="ao-section ao-page-hero ao-page-hero--brand">
      <div class="ao-wrap">
        <p class="ao-kicker ao-kicker--loud">Catalog</p>
        <h1 class="ao-page-title">Projects</h1>
        <p class="ao-sub ao-sub--wide">
          Flagship direction: <strong>CWL</strong>. Convert and Secure consume it.
          Everything else is either a consumer platform, an evidence surface, or a separately branded proof stack.
        </p>
        <div class="ao-cta-actions">
          <a class="ao-btn ao-btn-primary" href="/chrysalis.html">CWL</a>
          <a class="ao-btn ao-btn-ghost" href="/published.html">Published links</a>
          <a class="ao-btn ao-btn-link" href="/docs.html">Docs &rarr;</a>
        </div>
      </div>
    </section>

    <section class="ao-section">
      <div class="ao-wrap">
        <p class="ao-kicker">01 · Chrysalis pillars</p>
        <h2 class="ao-h2">Language · translator · firewall</h2>
        <div class="ao-project-list" role="list">
          <article class="ao-project" role="listitem">
            <div class="ao-project-top">
              <div>
                <h3 class="ao-project-name">CWL — chrysalis-cwl</h3>
                <p class="ao-project-desc">DNA of the web. Tip 1.0.80 complete site. Golds 01–86. Owns UT spine smokes.</p>
              </div>
              <span class="ao-pill ao-pill-live">Flagship</span>
            </div>
            <div class="ao-project-actions">
              <a class="ao-btn ao-btn-primary" href="/chrysalis.html">Page</a>
              <a class="ao-btn ao-btn-ghost" href="/paper-cwl.html">Paper</a>
              <a class="ao-btn ao-btn-link" href="https://github.com/AgenticOp-io/chrysalis-cwl" target="_blank" rel="noopener">GitHub &rarr;</a>
            </div>
          </article>
          <article class="ao-project" role="listitem">
            <div class="ao-project-top">
              <div>
                <h3 class="ao-project-name">Convert — chrysalis</h3>
                <p class="ao-project-desc">Universal Translator. Origin → WebIR/CWL → emit. COBOL inventory peels + pilot:cobol-clbs. Hub SPA on hub.agenticop.io/hub/.</p>
              </div>
            </div>
            <div class="ao-project-actions">
              <a class="ao-btn ao-btn-primary" href="/convert.html">Page</a>
              <a class="ao-btn ao-btn-ghost" href="/paper-convert.html">Paper</a>
              <a class="ao-btn ao-btn-link" href="https://github.com/AgenticOp-io/chrysalis" target="_blank" rel="noopener">GitHub &rarr;</a>
            </div>
          </article>
          <article class="ao-project" role="listitem">
            <div class="ao-project-top">
              <div>
                <h3 class="ao-project-name">Secure — chrysalis-security</h3>
                <p class="ao-project-desc">Helix DNA firewall. app-dna-v1. Learn → shadow → enforce. Optional CWL bridge.</p>
              </div>
            </div>
            <div class="ao-project-actions">
              <a class="ao-btn ao-btn-primary" href="/secure.html">Page</a>
              <a class="ao-btn ao-btn-ghost" href="/paper-helix.html">Paper</a>
              <a class="ao-btn ao-btn-link" href="https://github.com/AgenticOp-io/chrysalis-security" target="_blank" rel="noopener">GitHub &rarr;</a>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="ao-section ao-section-alt">
      <div class="ao-wrap">
        <p class="ao-kicker">02 · Platforms &amp; evidence</p>
        <h2 class="ao-h2">WPTP · FDE · Ghost Museum</h2>
        <div class="ao-project-list" role="list">
          <article class="ao-project" role="listitem">
            <div class="ao-project-top">
              <div>
                <h3 class="ao-project-name">WPTP</h3>
                <p class="ao-project-desc">IR hub, OpenAPI/HAR adapters, Hono/Next/Fastify emitters, compatibility matrix. Does not own CWL.</p>
              </div>
            </div>
            <div class="ao-project-actions">
              <a class="ao-btn ao-btn-primary" href="/wptp.html">Details</a>
              <a class="ao-btn ao-btn-link" href="https://github.com/AgenticOp-io/wptp-ir" target="_blank" rel="noopener">wptp-ir &rarr;</a>
            </div>
          </article>
          <article class="ao-project" role="listitem">
            <div class="ao-project-top">
              <div>
                <h3 class="ao-project-name">Fragility Discovery Engine</h3>
                <p class="ao-project-desc">Directed search over simulations. CLI + workbench. PyPI fragility-engine. v0.6.7.</p>
              </div>
            </div>
            <div class="ao-project-actions">
              <a class="ao-btn ao-btn-primary" href="/fde.html">Details</a>
              <a class="ao-btn ao-btn-ghost" href="https://fragility.agenticop.io/" target="_blank" rel="noopener">Workbench</a>
            </div>
          </article>
          <article class="ao-project" role="listitem">
            <div class="ao-project-top">
              <div>
                <h3 class="ao-project-name">Ghost Museum</h3>
                <p class="ao-project-desc">Still-answering hall. Evidence of incomplete sunsets. Not a scanner. Not a Chrysalis addon.</p>
              </div>
            </div>
            <div class="ao-project-actions">
              <a class="ao-btn ao-btn-primary" href="/ghosts.html">Details</a>
              <a class="ao-btn ao-btn-ghost" href="https://ghosts.agenticop.io/" target="_blank" rel="noopener">Hall</a>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="ao-section">
      <div class="ao-wrap">
        <p class="ao-kicker">03 · Field / SSH</p>
        <h2 class="ao-h2">Lane · PathfinderSSH MSP</h2>
        <div class="ao-prose" style="margin-bottom:1.25rem">
          <p>
            Upstream <a href="https://github.com/scottpeterman/pathfinderssh" target="_blank" rel="noopener">PathfinderSSH</a>
            is Scott Peterman’s. AgenticOps does not claim it. We ship an MSP fork and a last-mile plane named Lane.
          </p>
        </div>
        <div class="ao-project-list" role="list">
          <article class="ao-project" role="listitem">
            <div class="ao-project-top">
              <div>
                <h3 class="ao-project-name">Lane</h3>
                <p class="ao-project-desc">Last-mile plane. Keep CRT / PuTTY / OpenSSH. CLI <code>lane</code>. GPL-3.0 derivative.</p>
              </div>
            </div>
            <div class="ao-project-actions">
              <a class="ao-btn ao-btn-primary" href="/field.html">Details</a>
              <a class="ao-btn ao-btn-link" href="https://github.com/AgenticOp-io/lane" target="_blank" rel="noopener">GitHub &rarr;</a>
            </div>
          </article>
          <article class="ao-project" role="listitem">
            <div class="ao-project-top">
              <div>
                <h3 class="ao-project-name">PathfinderSSH MSP</h3>
                <p class="ao-project-desc">Our MSP packaging fork (ops desk, PSA/RMM hooks). Not upstream ownership.</p>
              </div>
            </div>
            <div class="ao-project-actions">
              <a class="ao-btn ao-btn-primary" href="/field.html#msp">Details</a>
              <a class="ao-btn ao-btn-link" href="https://github.com/AgenticOp-io/pathfinderssh-msp" target="_blank" rel="noopener">GitHub &rarr;</a>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="ao-section ao-section-alt">
      <div class="ao-wrap">
        <p class="ao-kicker">04 · Proof (separate brand)</p>
        <h2 class="ao-h2">wisptools.io</h2>
        <div class="ao-prose">
          <p>
            <a href="https://wisptools.io" target="_blank" rel="noopener">wisptools.io</a> and
            <a href="https://hss.wisptools.io/netperf/" target="_blank" rel="noopener">Bandwidth Test Manager</a>
            are shipped operator systems we point at for proof.
            They are <strong>not</strong> AgenticOps product names. Do not merge branding.
          </p>
        </div>
      </div>
    </section>
  </main>
  """;
}

@page GET "/proof.html"
page proof {
  effects: none;
  nav proof;
  layout site;
  title "Proof · Chrysalis works today | AgenticOps";
  description "AI drafts. Recorded traffic decides. Chrysalis proves Convert (oracle dispose) and Secure (Helix DNA) before anything ships. No façades. Traffic decides.";
  canonical "https://agenticop.io/proof.html";
  meta theme "#020208";
  meta robots "index, follow, max-image-preview:large, max-snippet:-1";
  meta author "AgenticOps";
  meta og type "website";
  meta og site "AgenticOps";
  meta og url "https://agenticop.io/proof.html";
  meta og title "Proof · AgenticOps";
  meta og description "Open-source Chrysalis, honest Hub grades, and wisptools.io as shipped proof.";
  meta og image "https://agenticop.io/logo.svg";
  icon logo apple;
  return html """
<main class="ao-page-main">
    <section class="ao-section ao-page-hero ao-page-hero--brand">
      <div class="ao-wrap">
        <p class="ao-kicker">Proof</p>
        <h1 class="ao-page-title">AI drafts. Recorded traffic decides.</h1>
        <p class="ao-sub ao-sub--wide">
          That is the ship bar &mdash; not a slogan we wave past.
          <strong>Chrysalis</strong> is open source and testable now.
          <strong>wisptools.io</strong> is separate proof we ship real systems &mdash; kept apart so names do not blur.
        </p>
        <div class="ao-metric-row">
          <div class="ao-metric"><strong>23&rarr;26</strong><span>sources &rarr; targets</span></div>
          <div class="ao-metric"><strong>Deep</strong><span>CWL &rarr; Node (Hono/Fastify)</span></div>
          <div class="ao-metric"><strong>Honest</strong><span>early pairs stay labeled</span></div>
        </div>
      </div>
    </section>
    <section class="ao-section ao-section-alt" id="traffic-decides">
      <div class="ao-wrap">
        <p class="ao-kicker">Ship bar</p>
        <h2 class="ao-h2">Nothing ships on AI confidence alone.</h2>
        <p class="ao-sub ao-sub--wide">
          Agents may draft CWL and emits. <strong>Recorded traffic</strong> (oracle / replay) and
          <strong>Helix traffic DNA</strong> (learn → shadow → ready) dispose. Unsure pieces stay unproven claims — never facades.
          Live customer soak → enforce is still an operator window (real shadow log), not a lab fake.
        </p>
        <ol class="ao-brand-rail" style="margin-top:1.5rem">
          <li class="ao-brand-rail-item">
            <span class="ao-brand-rail-num">01 · Draft</span>
            <h3>AI proposes</h3>
            <p>Agents / Intelligence Shorthand propose. Propose ≠ ship.</p>
          </li>
          <li class="ao-brand-rail-item">
            <span class="ao-brand-rail-num">02 · Dispose</span>
            <h3>Convert oracle</h3>
            <p>Verify-gated apply. Dispose Plane refuses merge without a green gate.</p>
          </li>
          <li class="ao-brand-rail-item">
            <span class="ao-brand-rail-num">03 · Shadow</span>
            <h3>Helix DNA</h3>
            <p>Learn → promote → shadow → <code>helix ready</code>. Optional CWL ⊆ DNA live-match.</p>
          </li>
          <li class="ao-brand-rail-item">
            <span class="ao-brand-rail-num">04 · Ops</span>
            <h3>Customer soak</h3>
            <p>Real peak/off-peak shadow log, then enforce. Lab preflight ≠ soak.</p>
          </li>
        </ol>
        <p class="ao-next-page" style="margin-top:1.25rem">
          <a href="/paper-traffic.html">Traffic decides paper &rarr;</a>
          &nbsp;·&nbsp;
          <a href="/method.html">Method spine &rarr;</a>
          &nbsp;·&nbsp;
          <a href="https://hub.agenticop.io/hub/#/guide" target="_blank" rel="noopener">Demo hub &rarr;</a>
        </p>
      </div>
    </section>
    <section class="ao-section">
      <div class="ao-wrap ao-wrap--doc">
        <p class="ao-kicker">CI tokens</p>
        <h2 class="ao-h2">What “closed” means in smoke</h2>
        <div class="ao-doc-table-wrap" tabindex="0">
          <table class="ao-doc-table">
            <thead><tr><th>Pillar</th><th>Smoke</th><th>Token</th></tr></thead>
            <tbody>
              <tr><th scope="row">CWL</th><td><code>smoke:ut-spine</code></td><td><code>UT_SPINE_OK</code></td></tr>
              <tr><th scope="row">Convert</th><td><code>hub:traffic-decides-bar-smoke</code></td><td><code>TRAFFIC_DECIDES_CONVERT_OK</code></td></tr>
              <tr><th scope="row">Secure</th><td><code>cutover-smoke</code> / traffic-decides</td><td><code>CUTOVER_SMOKE_OK</code> / <code>TRAFFIC_DECIDES_SECURE_OK</code></td></tr>
            </tbody>
          </table>
        </div>
        <div class="ao-prose" style="margin-top:1rem">
          <p>Customer soak → enforce remains an operator window. Lab green ≠ soak.</p>
        </div>
      </div>
    </section>
    <section class="ao-section ao-section--diagrams">
      <div class="ao-wrap">
        <p class="ao-kicker">See the spine</p>
        <h2 class="ao-h2">The diagrams behind the claims.</h2>
      </div>
      <div class="ao-diagram-pair">
        <a class="ao-diagram-tile" href="/convert.html">
          <span class="ao-diagram-label">Convert &middot; Universal Translator</span>
          <img class="ao-explainer-img" src="/chrysalis-explainer.png" alt="Languages into WebIR and CWL, then out to modern stacks" width="1200" height="675" loading="lazy" />
          <span class="ao-diagram-go">Open Convert &rarr;</span>
        </a>
        <a class="ao-diagram-tile" href="/secure.html">
          <span class="ao-diagram-label">Secure &middot; Helix</span>
          <img class="ao-explainer-img" src="/helix-explainer.png" alt="Helix traffic DNA firewall" width="1200" height="675" loading="lazy" />
          <span class="ao-diagram-go">Open Secure &rarr;</span>
        </a>
      </div>
    </section>
    <section class="ao-section">
      <div class="ao-wrap">
        <div class="ao-proof-split">
          <article class="ao-proof-panel" id="chrysalis">
            <p class="ao-kicker">The engine</p>
            <h2 class="ao-h2" style="font-size:1.6rem">Chrysalis &mdash; DNA &middot; Convert &middot; Secure</h2>
            <p style="color:var(--ao-text-dim);line-height:1.55">
              Reads PHP, JS/TS, Python, Java, Go, Ruby, C#, Rust, and more through one middle.
              The Hub tracks pairs and says which are deep versus early. Nothing is &ldquo;working&rdquo; without
              traffic checks; Unsure pieces stay unproven.
            </p>
            <ul class="ao-bullets">
              <li>Write and review <code>.cwl</code> directly</li>
              <li>tiny-blog + Laravel fixtures end-to-end</li>
              <li>Mirror &rarr; slice &rarr; cutover tested</li>
              <li><a href="https://github.com/AgenticOp-io/chrysalis-cwl" target="_blank" rel="noopener">CWL</a> ·
                <a href="https://github.com/AgenticOp-io/chrysalis" target="_blank" rel="noopener">Convert</a> ·
                <a href="https://github.com/AgenticOp-io/chrysalis-security" target="_blank" rel="noopener">Secure</a> ·
                <a href="https://hub.agenticop.io/hub/#/guide" target="_blank" rel="noopener">Demo hub</a></li>
            </ul>
          </article>
          <article class="ao-proof-panel ao-proof-panel--accent">
            <p class="ao-kicker">Separate product</p>
            <h2 class="ao-h2" style="font-size:1.6rem">wisptools.io</h2>
            <p style="color:var(--ao-text-dim);line-height:1.55">
              Live ISP ops platform we still run &mdash; network, voice, subscribers, mapping, speed tests.
              Proof we ship; not the CWL story.
            </p>
            <ul class="ao-bullets">
              <li><a href="https://wisptools.io" target="_blank" rel="noopener">wisptools.io</a></li>
              <li><a href="https://management.wisptools.io/login" target="_blank" rel="noopener">management app</a></li>
              <li><a href="https://hss.wisptools.io/netperf/" target="_blank" rel="noopener">Bandwidth Test Manager</a></li>
            </ul>
          </article>
        </div>
        <p class="ao-kicker" style="margin-top:2.5rem">Closer look</p>
        <h2 class="ao-h2">Pieces you can click.</h2>
        <div class="ao-hub-grid" style="margin-top:1rem">
          <a class="ao-hub-card" href="/method.html">
            <span class="ao-hub-card-num">CWL</span>
            <h3>Example genome</h3>
            <p>Working <code>.cwl</code> patterns checked against Node &mdash; what &ldquo;tested&rdquo; looks like.</p>
            <span class="ao-hub-card-go">Method &rarr;</span>
          </a>
          <a class="ao-hub-card" href="https://hss.wisptools.io/netperf/" target="_blank" rel="noopener">
            <span class="ao-hub-card-num">BTM</span>
            <h3>Bandwidth Test Manager</h3>
            <p>Scheduled speed tests, dashboard, alerts &mdash; live demo.</p>
            <span class="ao-hub-card-go">Demo &rarr;</span>
          </a>
          <a class="ao-hub-card" href="https://github.com/AgenticOp-io/WISP-Management" target="_blank" rel="noopener">
            <span class="ao-hub-card-num">WISP</span>
            <h3>Operator platform</h3>
            <p>Voice, field app, multi-tenant core &mdash; open source MIT.</p>
            <span class="ao-hub-card-go">GitHub &rarr;</span>
          </a>
          <a class="ao-hub-card ao-hub-card--cta" href="/contact.html">
            <span class="ao-hub-card-num">&rarr;</span>
            <h3>Your stack next</h3>
            <p>Legacy that needs to move? Start with a Pilot.</p>
            <span class="ao-hub-card-go">Contact &rarr;</span>
          </a>
        </div>
      </div>
    </section>
  </main>
  """;
}

@page GET "/published.html"
page published {
  effects: none;
  nav published;
  layout site;
  title "Published work — links, repos, DOIs | AgenticOps";
  description "Everything AgenticOps has published: CWL tip 1.0.80 complete site, Chrysalis pillars, WPTP, FDE Zenodo DOIs, Ghost Museum, Lane, wisptools proof, live demos.";
  canonical "https://agenticop.io/published.html";
  meta robots "index, follow";
  meta og title "Published work — AgenticOps";
  meta og description "Full catalog of public repos, demos, packages, and citations.";
  meta og url "https://agenticop.io/published.html";
  meta og image "https://agenticop.io/cwl-explainer.png";
  icon logo;
  return html """
<main id="main" class="ao-page-main ao-doc">
    <section class="ao-section ao-page-hero ao-page-hero--brand">
      <div class="ao-wrap ao-wrap--doc">
        <p class="ao-kicker ao-kicker--loud">Catalog</p>
        <h1 class="ao-page-title">Published work</h1>
        <p class="ao-lead ao-lead--doc">
          What David Peterson / AgenticOps has put in public:
          language (CWL), translator (Convert), firewall (Helix), platforms (WPTP),
          simulation search (FDE + Zenodo), evidence hall (Ghost Museum),
          field SSH (Lane / MSP), and the wisptools proof stack.
          Flagship direction remains <strong>CWL</strong>.
        </p>
        <p class="ao-doc-meta">
          Org: <a href="https://github.com/AgenticOp-io" target="_blank" rel="noopener">github.com/AgenticOp-io</a>
          · LinkedIn: <a href="https://www.linkedin.com/in/vibe-architect/" target="_blank" rel="noopener">vibe-architect</a>
          · <a href="mailto:hello@agenticop.io">hello@agenticop.io</a>
        </p>
        <div class="ao-cta-actions">
          <a class="ao-btn ao-btn-primary" href="/paper-cwl.html">CWL paper</a>
          <a class="ao-btn ao-btn-ghost" href="/press.html">Press</a>
          <a class="ao-btn ao-btn-link" href="/docs.html">Docs &rarr;</a>
        </div>
      </div>
    </section>

    <nav class="ao-doc-toc" aria-label="On this page">
      <div class="ao-wrap ao-wrap--doc">
        <p class="ao-doc-toc-label">On this page</p>
        <ol>
          <li><a href="#live">Live hosts</a></li>
          <li><a href="#chrysalis">Chrysalis</a></li>
          <li><a href="#cwl-zenodo">CWL papers (Zenodo)</a></li>
          <li><a href="#wptp">WPTP</a></li>
          <li><a href="#fde">FDE / Zenodo / PyPI</a></li>
          <li><a href="#cobol">COBOL (Convert)</a></li>
          <li><a href="#ghosts">Ghost Museum</a></li>
          <li><a href="#field">Lane / MSP</a></li>
          <li><a href="#wisp">wisptools proof</a></li>
          <li><a href="#site">This site</a></li>
          <li><a href="#contact">Contact</a></li>
        </ol>
      </div>
    </nav>

    <article class="ao-doc-body">
      <section id="live" class="ao-section">
        <div class="ao-wrap ao-wrap--doc">
          <h2 class="ao-h2">Live hosts</h2>
          <div class="ao-doc-table-wrap" tabindex="0">
            <table class="ao-doc-table">
              <thead><tr><th>URL</th><th>What</th></tr></thead>
              <tbody>
                <tr><th scope="row"><a href="https://agenticop.io/">agenticop.io</a></th><td>Corporate site (this property)</td></tr>
                <tr><th scope="row"><a href="https://hub.agenticop.io/" target="_blank" rel="noopener">hub.agenticop.io</a></th><td>Project directory</td></tr>
                <tr><th scope="row"><a href="https://hub.agenticop.io/hub/" target="_blank" rel="noopener">hub…/hub/</a></th><td>Translation Hub SPA (Convert)</td></tr>
                <tr><th scope="row"><a href="https://chrysalis.agenticop.io/" target="_blank" rel="noopener">chrysalis.agenticop.io</a></th><td>Hub HTTPS alias + guide</td></tr>
                <tr><th scope="row"><a href="https://fragility.agenticop.io/" target="_blank" rel="noopener">fragility.agenticop.io</a></th><td>FDE workbench</td></tr>
                <tr><th scope="row"><a href="https://ghosts.agenticop.io/" target="_blank" rel="noopener">ghosts.agenticop.io</a></th><td>Ghost Museum hall</td></tr>
                <tr><th scope="row"><a href="https://agenticop-io.github.io/fragility-discovery-engine/" target="_blank" rel="noopener">GH Pages · FDE</a></th><td>Static FDE mirror</td></tr>
                <tr><th scope="row"><a href="https://agenticop-io.github.io/wptp-matrix/" target="_blank" rel="noopener">GH Pages · WPTP matrix</a></th><td>Compatibility matrix viewer</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section id="chrysalis" class="ao-section ao-section-alt">
        <div class="ao-wrap ao-wrap--doc">
          <h2 class="ao-h2">Chrysalis pillars (public OSS)</h2>
          <div class="ao-prose">
            <p>Apache-2.0 under AgenticOp-io. CWL tip <strong>1.0.80</strong> is the language pin Convert and Secure consume — and this site is that genome on Firebase.</p>
          </div>
          <div class="ao-doc-table-wrap" tabindex="0">
            <table class="ao-doc-table">
              <thead><tr><th>Pillar</th><th>Repo</th><th>On this site</th></tr></thead>
              <tbody>
                <tr>
                  <th scope="row">CWL</th>
                  <td><a href="https://github.com/AgenticOp-io/chrysalis-cwl" target="_blank" rel="noopener">chrysalis-cwl</a></td>
                  <td><a href="/chrysalis.html">Product</a> · <a href="/paper-cwl.html">Paper</a></td>
                </tr>
                <tr>
                  <th scope="row">Convert</th>
                  <td><a href="https://github.com/AgenticOp-io/chrysalis" target="_blank" rel="noopener">chrysalis</a></td>
                  <td><a href="/convert.html">Product</a> · <a href="/paper-convert.html">Paper</a></td>
                </tr>
                <tr>
                  <th scope="row">Secure</th>
                  <td><a href="https://github.com/AgenticOp-io/chrysalis-security" target="_blank" rel="noopener">chrysalis-security</a></td>
                  <td><a href="/secure.html">Product</a> · <a href="/paper-helix.html">Paper</a></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="ao-prose">
            <ul>
              <li>System overview: <a href="/whitepaper.html">whitepaper.html</a></li>
              <li>WebIR / Rosetta: <a href="/paper-webir.html">paper-webir.html</a></li>
              <li>Ship bar: <a href="/paper-traffic.html">paper-traffic.html</a> · <a href="/proof.html">proof.html</a></li>
              <li>CWL language packages publish to <strong>GitHub Packages</strong> as <code>@agenticop-io/cwl</code> (not public npmjs by default).</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="cwl-zenodo" class="ao-section">
        <div class="ao-wrap ao-wrap--doc">
          <h2 class="ao-h2">CWL technical papers (Zenodo)</h2>
          <div class="ao-prose">
            <p>
              Zenodo pack for the public papers (CWL, WebIR, Convert, Helix, traffic-decides, system overview). Language tip now <strong>1.0.78</strong>.
              CC-BY-4.0 documentation deposit; language code remains Apache-2.0 in chrysalis-cwl.
            </p>
            <ul>
              <li><strong>Concept (cite this):</strong> <a href="https://doi.org/10.5281/zenodo.22691492" target="_blank" rel="noopener">10.5281/zenodo.22691492</a></li>
              <li>Zenodo version record: <a href="https://doi.org/10.5281/zenodo.22691493" target="_blank" rel="noopener">10.5281/zenodo.22691493</a> (concept <a href="https://doi.org/10.5281/zenodo.22691492" target="_blank" rel="noopener">22691492</a>)</li>
              <li>Record: <a href="https://zenodo.org/records/22691493" target="_blank" rel="noopener">zenodo.org/records/22691493</a></li>
              <li>Live HTML: <a href="/docs.html">docs.html</a> · <a href="/paper-cwl.html">paper-cwl.html</a></li>
            </ul>
          </div>
        </div>
      </section>

      <section id="wptp" class="ao-section ao-section-alt">
        <div class="ao-wrap ao-wrap--doc">
          <h2 class="ao-h2">WPTP platforms</h2>
          <div class="ao-prose">
            <p>Neutral IR hub, adapters, emitters, matrix. Does not own CWL grammar. Page: <a href="/wptp.html">wptp.html</a>.</p>
          </div>
          <ul class="ao-bullets ao-bullets--doc">
            <li><a href="https://github.com/AgenticOp-io/wptp-ir" target="_blank" rel="noopener">wptp-ir</a> — IR hub</li>
            <li><a href="https://github.com/AgenticOp-io/wptp-adapter-openapi" target="_blank" rel="noopener">wptp-adapter-openapi</a></li>
            <li><a href="https://github.com/AgenticOp-io/wptp-adapter-browser" target="_blank" rel="noopener">wptp-adapter-browser</a> — HAR</li>
            <li><a href="https://github.com/AgenticOp-io/wptp-emit-hono" target="_blank" rel="noopener">wptp-emit-hono</a></li>
            <li><a href="https://github.com/AgenticOp-io/wptp-emit-nextjs" target="_blank" rel="noopener">wptp-emit-nextjs</a></li>
            <li><a href="https://github.com/AgenticOp-io/wptp-emit-fastify" target="_blank" rel="noopener">wptp-emit-fastify</a></li>
            <li><a href="https://github.com/AgenticOp-io/wptp-matrix" target="_blank" rel="noopener">wptp-matrix</a> · live viewer <a href="https://agenticop-io.github.io/wptp-matrix/" target="_blank" rel="noopener">agenticop-io.github.io/wptp-matrix</a></li>
          </ul>
        </div>
      </section>

      <section id="fde" class="ao-section ao-section-alt">
        <div class="ao-wrap ao-wrap--doc">
          <h2 class="ao-h2">Fragility Discovery Engine · PyPI</h2>
          <div class="ao-prose">
            <p>
              Directed search over discrete-time simulations. Author: <strong>David Peterson</strong> (Agentic Ops).
              Software <strong>v0.6.7</strong> (Apache-2.0). Prefer concept DOI for citation.
            </p>
            <p>
              <strong>PyPI status (AgenticOps-authored):</strong> the only package we publish is
              <a href="https://pypi.org/project/fragility-engine/" target="_blank" rel="noopener"><code>fragility-engine</code></a>.
              CWL / Convert / Secure / WPTP / Ghost Museum / Lane are not Python registry packages
              (JS/TS or other; CWL uses GitHub Packages <code>@agenticop-io/cwl</code>, not public npmjs).
              No additional AgenticOps Python packages are queued for PyPI.
            </p>
          </div>
          <div class="ao-doc-table-wrap" tabindex="0">
            <table class="ao-doc-table">
              <thead><tr><th>Channel</th><th>Link</th></tr></thead>
              <tbody>
                <tr><th scope="row">Repo</th><td><a href="https://github.com/AgenticOp-io/fragility-discovery-engine" target="_blank" rel="noopener">fragility-discovery-engine</a></td></tr>
                <tr><th scope="row">Release</th><td><a href="https://github.com/AgenticOp-io/fragility-discovery-engine/releases/tag/v0.6.7" target="_blank" rel="noopener">v0.6.7</a></td></tr>
                <tr><th scope="row">PyPI</th><td><a href="https://pypi.org/project/fragility-engine/" target="_blank" rel="noopener">fragility-engine</a></td></tr>
                <tr><th scope="row">Workbench</th><td><a href="https://fragility.agenticop.io/" target="_blank" rel="noopener">fragility.agenticop.io</a></td></tr>
                <tr><th scope="row">Demo guide</th><td><a href="https://fragility.agenticop.io/docs/demo-guide.html" target="_blank" rel="noopener">docs/demo-guide.html</a></td></tr>
                <tr><th scope="row">GH Pages</th><td><a href="https://agenticop-io.github.io/fragility-discovery-engine/" target="_blank" rel="noopener">static mirror</a></td></tr>
                <tr><th scope="row">Site page</th><td><a href="/fde.html">fde.html</a></td></tr>
              </tbody>
            </table>
          </div>
          <h3 class="ao-h3">Zenodo / DOI</h3>
          <div class="ao-prose">
            <ul>
              <li><strong>Concept (cite this):</strong> <a href="https://doi.org/10.5281/zenodo.20455688" target="_blank" rel="noopener">10.5281/zenodo.20455688</a> — FEL / FDE</li>
              <li>FEL snapshot <code>fel-v0.1.1</code>: <a href="https://doi.org/10.5281/zenodo.20455689" target="_blank" rel="noopener">10.5281/zenodo.20455689</a></li>
              <li>v0.6.5: <a href="https://doi.org/10.5281/zenodo.21313024" target="_blank" rel="noopener">10.5281/zenodo.21313024</a></li>
              <li>v0.6.4: <a href="https://doi.org/10.5281/zenodo.21312735" target="_blank" rel="noopener">10.5281/zenodo.21312735</a></li>
              <li>v0.6.3: <a href="https://doi.org/10.5281/zenodo.21312495" target="_blank" rel="noopener">10.5281/zenodo.21312495</a></li>
              <li>v0.6.2: <a href="https://doi.org/10.5281/zenodo.21304265" target="_blank" rel="noopener">10.5281/zenodo.21304265</a></li>
              <li>v0.6.1: <a href="https://doi.org/10.5281/zenodo.21304131" target="_blank" rel="noopener">10.5281/zenodo.21304131</a></li>
              <li>v0.6.0: <a href="https://doi.org/10.5281/zenodo.21303841" target="_blank" rel="noopener">10.5281/zenodo.21303841</a></li>
            </ul>
            <p>
              Preferred citation title: <em>Fragility Evidence Language (FEL): A Semantic Contract for Reproducible
              Stress-Search and Attribution in Discrete-Time Simulations</em> (Peterson, 2026).
              Machine-readable: repo <code>CITATION.cff</code>.
            </p>
          </div>
        </div>
      </section>

      <section id="cobol" class="ao-section">
        <div class="ao-wrap ao-wrap--doc">
          <h2 class="ao-h2">COBOL (Convert dialect — not a separate PyPI package)</h2>
          <div class="ao-prose">
            <p>
              COBOL work ships inside
              <a href="https://github.com/AgenticOp-io/chrysalis" target="_blank" rel="noopener">AgenticOp-io/chrysalis</a>
              (Convert): inventory peels, WebIR deepen, Hub golds, and Pilot Kit wedge
              <code>pilot:cobol-clbs</code>. Prove/census paths run on GCE (<code>test:gce:cobol</code>) —
              not as a standalone Python distribution.
            </p>
            <ul>
              <li>Product / paper: <a href="/convert.html">convert.html</a> · <a href="/paper-convert.html">paper-convert.html</a></li>
              <li>Hub: <a href="https://hub.agenticop.io/hub/" target="_blank" rel="noopener">hub.agenticop.io/hub/</a></li>
              <li>Residuals stay labeled (e.g. EXTFMAP and related residuals stay honest — no invented parity).</li>
            </ul>
            <p>
              Local folder <code>engines/chrysalis-cobol-corpora</code> holds <strong>third-party</strong> corpora and tools
              for peel/census (JRecord, cb2xml, copybook-rs, cobol-check, CardDemo samples, etc.).
              Two Python tools already on PyPI under <em>their</em> authors — do not republish as AgenticOps:
            </p>
            <ul>
              <li><a href="https://pypi.org/project/cobol-copybook-to-json/" target="_blank" rel="noopener">cobol-copybook-to-json</a> (Arunkumar Selvam)</li>
              <li><a href="https://pypi.org/project/copybook/" target="_blank" rel="noopener">copybook</a> (Oren Elias / zalmane)</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="ghosts" class="ao-section ao-section-alt">
        <div class="ao-wrap ao-wrap--doc">
          <h2 class="ao-h2">Ghost Museum</h2>
          <div class="ao-prose">
            <ul>
              <li>Hall: <a href="https://ghosts.agenticop.io/" target="_blank" rel="noopener">ghosts.agenticop.io</a></li>
              <li>Repo: <a href="https://github.com/AgenticOp-io/ghost-museum" target="_blank" rel="noopener">ghost-museum</a></li>
              <li>Page: <a href="/ghosts.html">ghosts.html</a></li>
              <li>Evidence surface only — do not integrate as a product dependency.</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="field" class="ao-section">
        <div class="ao-wrap ao-wrap--doc">
          <h2 class="ao-h2">Lane · PathfinderSSH MSP</h2>
          <div class="ao-prose">
            <p>
              Upstream <a href="https://github.com/scottpeterman/pathfinderssh" target="_blank" rel="noopener">PathfinderSSH</a>
              is Scott Peterman’s. AgenticOps ships derivatives — not ownership of upstream.
            </p>
            <ul>
              <li><a href="https://github.com/AgenticOp-io/lane" target="_blank" rel="noopener">lane</a> — last-mile plane, CLI <code>lane</code></li>
              <li><a href="https://github.com/AgenticOp-io/pathfinderssh-msp" target="_blank" rel="noopener">pathfinderssh-msp</a> — MSP fork</li>
              <li><a href="https://github.com/AgenticOp-io/pathfinderssh" target="_blank" rel="noopener">pathfinderssh</a> — tracking fork for upstream PRs only</li>
              <li>Page: <a href="/field.html">field.html</a></li>
            </ul>
          </div>
        </div>
      </section>

      <section id="wisp" class="ao-section">
        <div class="ao-wrap ao-wrap--doc">
          <h2 class="ao-h2">wisptools proof stack</h2>
          <div class="ao-prose">
            <p>
              Separate product brand. Shipped operator software — cite as proof, do not merge names with AgenticOps.
            </p>
            <ul>
              <li><a href="https://wisptools.io" target="_blank" rel="noopener">wisptools.io</a></li>
              <li><a href="https://management.wisptools.io" target="_blank" rel="noopener">management.wisptools.io</a></li>
              <li><a href="https://hss.wisptools.io/netperf/" target="_blank" rel="noopener">Bandwidth Test Manager</a> (netperf demo)</li>
              <li>OSS mirrors:
                <a href="https://github.com/AgenticOp-io/WISP-Management" target="_blank" rel="noopener">WISP-Management</a> ·
                <a href="https://github.com/AgenticOp-io/Bandwidth-Test-Manager" target="_blank" rel="noopener">Bandwidth-Test-Manager</a>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section id="site" class="ao-section ao-section-alt">
        <div class="ao-wrap ao-wrap--doc">
          <h2 class="ao-h2">On agenticop.io</h2>
          <div class="ao-prose">
            <ul>
              <li><a href="/docs.html">Docs index</a> · <a href="/press.html">Press / LinkedIn</a> · <a href="/projects.html">Projects catalog</a> · <a href="/hub.html">Hostname directory</a></li>
              <li>Papers: <a href="/whitepaper.html">overview</a>, <a href="/paper-cwl.html">CWL</a>, <a href="/paper-webir.html">WebIR</a>, <a href="/paper-convert.html">Convert</a>, <a href="/paper-helix.html">Helix</a>, <a href="/paper-traffic.html">traffic</a></li>
              <li>Practice: <a href="/method.html">method</a>, <a href="/proof.html">proof</a>, <a href="/trust.html">trust</a>, <a href="/services.html">services</a></li>
              <li>Crawler: <a href="/llms.txt">llms.txt</a> · <a href="/humans.txt">humans.txt</a> · <a href="/sitemap.xml">sitemap.xml</a></li>
              <li>Assets: <a href="/cwl-explainer.png">CWL diagram</a>, <a href="/chrysalis-explainer.png">Convert</a>, <a href="/helix-explainer.png">Helix</a>, <a href="/linkedin-cwl-release.png">LinkedIn CWL banner</a></li>
            </ul>
            <p>
              Not listed as public OSS: private commercial repos (site source, other product forks).
              They exist under the org; they are not open engines.
            </p>
          </div>
        </div>
      </section>

      <section id="contact" class="ao-section">
        <div class="ao-wrap ao-wrap--doc">
          <h2 class="ao-h2">Contact</h2>
          <div class="ao-prose">
            <ul>
              <li>Pilots / questions: <a href="mailto:hello@agenticop.io">hello@agenticop.io</a> · <a href="/contact.html">contact page</a></li>
              <li>LinkedIn: <a href="https://www.linkedin.com/in/vibe-architect/" target="_blank" rel="noopener">linkedin.com/in/vibe-architect</a></li>
              <li>Git identity for OSS: AgenticOp-io · <code>opensource@agenticop.io</code></li>
            </ul>
          </div>
        </div>
      </section>
    </article>
  </main>
  """;
}

@page GET "/secure.html"
page secure {
  effects: none;
  nav secure;
  layout site;
  title "Helix · DNA firewall — if it isn’t certified, it doesn’t pass | AgenticOps";
  description "Helix is Chrysalis Secure: a DNA firewall that learns, shadows, then enforces from live traffic. Allow while securing. Augment your NGFW without NAT homework. Optional CWL bridge.";
  canonical "https://agenticop.io/secure.html";
  meta keywords "Helix, DNA firewall, traffic DNA, learn shadow enforce, app identity, Chrysalis Secure, NGFW, AgenticOps";
  meta robots "index, follow, max-image-preview:large, max-snippet:-1";
  meta author "AgenticOps";
  meta theme "#020208";
  meta og type "website";
  meta og site "AgenticOps";
  meta og url "https://agenticop.io/secure.html";
  meta og title "Helix — DNA firewall";
  meta og description "If it isn’t in certified DNA, it doesn’t pass. Learn → promote → shadow → enforce.";
  meta og image "https://agenticop.io/helix-explainer.png";
  meta twitter card "summary_large_image";
  meta twitter title "Helix — DNA firewall";
  meta twitter description "Trust nothing until certified. Traffic still flows while you secure.";
  meta twitter image "https://agenticop.io/helix-explainer.png";
  icon logo apple;
  jsonld """
{
    "@context": "https://schema.org",
    "@type": "WebPage",
    "url": "https://agenticop.io/secure.html",
    "name": "Helix — DNA firewall",
    "description": "Chrysalis Secure (Helix) certifies app identity from live traffic DNA: learn, shadow, enforce.",
    "primaryImageOfPage": { "@type": "ImageObject", "url": "https://agenticop.io/helix-explainer.png" },
    "isPartOf": { "@type": "WebSite", "url": "https://agenticop.io/" },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://agenticop.io/" },
        { "@type": "ListItem", "position": 2, "name": "Secure / Helix", "item": "https://agenticop.io/secure.html" }
      ]
    }
  }
  """;
  return html """
<main id="main" class="ao-page-main">
    <section class="ao-section ao-page-hero ao-page-hero--brand ao-page-hero--secure">
      <div class="ao-wrap">
        <p class="ao-kicker ao-kicker--loud">Pillar 03 &middot; Secure &middot; Helix</p>
        <h1 class="ao-page-title ao-page-title--secure">
          DNA firewall &mdash;
          <span class="ao-grad">if it isn&rsquo;t certified, it doesn&rsquo;t pass.</span>
        </h1>
        <p class="ao-lead ao-lead--secure">
          Helix asks one question: <strong>is this still the certified app?</strong>
          Learn, promote, shadow, then enforce from <strong>live traffic DNA</strong>.
          Allow while securing.
        </p>
        <ol class="ao-flow-strip ao-flow-strip--hero" aria-label="Helix stages">
          <li class="ao-flow-step ao-flow-step--cwl">
            <span class="ao-flow-num">01</span>
            <strong>Learn</strong>
            <span>record DNA</span>
          </li>
          <li class="ao-flow-pipe" aria-hidden="true"></li>
          <li class="ao-flow-step ao-flow-step--convert">
            <span class="ao-flow-num">02</span>
            <strong>Promote</strong>
            <span>sign identity</span>
          </li>
          <li class="ao-flow-pipe" aria-hidden="true"></li>
          <li class="ao-flow-step ao-flow-step--secure">
            <span class="ao-flow-num">03</span>
            <strong>Shadow</strong>
            <span>alert only</span>
          </li>
          <li class="ao-flow-pipe" aria-hidden="true"></li>
          <li class="ao-flow-step ao-flow-step--ship">
            <span class="ao-flow-num">04</span>
            <strong>Enforce</strong>
            <span>block mismatches</span>
          </li>
        </ol>
      </div>
    </section>

    <section class="ao-explainer-band" aria-label="Helix DNA firewall diagram">
      <div class="ao-wrap">
        <img
          class="ao-explainer-img"
          src="/helix-explainer.png"
          width="1200"
          height="675"
          alt="Helix DNA firewall: live traffic feeds certified app DNA (route, schema, status). Learn records, shadow alerts, enforce blocks DNA mismatches with 403. Allow while securing; augment NGFW; optional CWL bridge."
          loading="eager"
          decoding="async"
        />
      </div>
    </section>

    <section class="ao-section ao-section-alt">
      <div class="ao-wrap">
        <p class="ao-kicker">How Helix runs</p>
        <h2 class="ao-h2">Allow traffic while you secure it.</h2>
        <p class="ao-sub ao-sub--wide">Modes separate pass from trust. You never flip from “open internet” to “locked” in one scary click.</p>

        <div class="ao-helix-flow" aria-hidden="true">
          <svg class="ao-helix-flow-svg" viewBox="0 0 960 72" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="hxFlowGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stop-color="#22d3ee"/>
                <stop offset="50%" stop-color="#a855f7"/>
                <stop offset="100%" stop-color="#7c3aed"/>
              </linearGradient>
            </defs>
            <line x1="48" y1="36" x2="912" y2="36" stroke="url(#hxFlowGrad)" stroke-width="3" stroke-linecap="round" opacity="0.55"/>
            <circle cx="96" cy="36" r="14" fill="#061018" stroke="#22d3ee" stroke-width="3"/>
            <circle cx="352" cy="36" r="14" fill="#061018" stroke="#5eead4" stroke-width="3"/>
            <circle cx="608" cy="36" r="14" fill="#061018" stroke="#a855f7" stroke-width="3"/>
            <circle cx="864" cy="36" r="14" fill="#061018" stroke="#c084fc" stroke-width="3"/>
            <text x="96" y="68" text-anchor="middle" fill="#5eead4" font-family="JetBrains Mono, monospace" font-size="11">LEARN</text>
            <text x="352" y="68" text-anchor="middle" fill="#5eead4" font-family="JetBrains Mono, monospace" font-size="11">PROMOTE</text>
            <text x="608" y="68" text-anchor="middle" fill="#c084fc" font-family="JetBrains Mono, monospace" font-size="11">SHADOW</text>
            <text x="864" y="68" text-anchor="middle" fill="#c084fc" font-family="JetBrains Mono, monospace" font-size="11">ENFORCE</text>
          </svg>
        </div>

        <ol class="ao-helix-pipeline ao-helix-pipeline--graphic" aria-label="Helix lifecycle">
          <li class="ao-helix-stage ao-helix-stage--learn">
            <div class="ao-helix-stage-visual" aria-hidden="true">
              <svg viewBox="0 0 64 64" fill="none">
                <circle cx="32" cy="32" r="28" stroke="currentColor" stroke-width="2" opacity="0.35"/>
                <path d="M20 34c4-10 20-10 24 0" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/>
                <circle cx="26" cy="28" r="3" fill="currentColor"/>
                <circle cx="38" cy="28" r="3" fill="currentColor"/>
                <path d="M18 44h28" stroke="currentColor" stroke-width="2" stroke-linecap="round" opacity="0.6"/>
              </svg>
            </div>
            <span class="ao-helix-stage-num">01 · Learn</span>
            <span class="ao-helix-chip ao-helix-chip--pass">Pass + record</span>
            <h3>Watch production</h3>
            <p>Observe real requests and responses. Build <code>app-dna</code> from what the app actually does.</p>
            <ul class="ao-helix-stage-ticks">
              <li>Traffic still flows</li>
              <li>Baseline forms</li>
            </ul>
          </li>
          <li class="ao-helix-pipe" aria-hidden="true"><span></span></li>
          <li class="ao-helix-stage ao-helix-stage--promote">
            <div class="ao-helix-stage-visual" aria-hidden="true">
              <svg viewBox="0 0 64 64" fill="none">
                <rect x="16" y="12" width="32" height="40" rx="4" stroke="currentColor" stroke-width="2.2"/>
                <path d="M24 24h16M24 32h16M24 40h10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                <circle cx="44" cy="44" r="10" fill="#061018" stroke="currentColor" stroke-width="2"/>
                <path d="M40 44l3 3 6-7" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <span class="ao-helix-stage-num">02 · Promote</span>
            <span class="ao-helix-chip ao-helix-chip--sign">Review + sign</span>
            <h3>Certify the DNA</h3>
            <p>Diff the certificate. Promote only what you intend. Reload without downtime.</p>
            <ul class="ao-helix-stage-ticks">
              <li>Human-reviewed diff</li>
              <li>Hot reload</li>
            </ul>
          </li>
          <li class="ao-helix-pipe" aria-hidden="true"><span></span></li>
          <li class="ao-helix-stage ao-helix-stage--shadow">
            <div class="ao-helix-stage-visual" aria-hidden="true">
              <svg viewBox="0 0 64 64" fill="none">
                <path d="M32 10l18 8v14c0 12-8 20-18 24-10-4-18-12-18-24V18l18-8z" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"/>
                <path d="M32 26v12" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/>
                <circle cx="32" cy="44" r="2.5" fill="currentColor"/>
              </svg>
            </div>
            <span class="ao-helix-stage-num">03 · Shadow</span>
            <span class="ao-helix-chip ao-helix-chip--alert">Pass + alert</span>
            <h3>Score without blocking</h3>
            <p>Live traffic vs certified DNA. Holes alert only — users keep working.</p>
            <ul class="ao-helix-stage-ticks">
              <li>Drift visible</li>
              <li>Zero user impact</li>
            </ul>
          </li>
          <li class="ao-helix-pipe" aria-hidden="true"><span></span></li>
          <li class="ao-helix-stage ao-helix-stage--enforce">
            <div class="ao-helix-stage-visual" aria-hidden="true">
              <svg viewBox="0 0 64 64" fill="none">
                <rect x="18" y="28" width="28" height="24" rx="4" stroke="currentColor" stroke-width="2.2"/>
                <path d="M24 28v-6a8 8 0 0116 0v6" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>
                <circle cx="32" cy="40" r="3" fill="currentColor"/>
                <path d="M32 43v5" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>
              </svg>
            </div>
            <span class="ao-helix-stage-num">04 · Enforce</span>
            <span class="ao-helix-chip ao-helix-chip--block">Block · 403</span>
            <h3>Fail closed</h3>
            <p>Unauthorized surface stops. We don’t allow app shape we didn’t certify.</p>
            <ul class="ao-helix-stage-ticks">
              <li>Unknown routes die</li>
              <li>Certified shape holds</li>
            </ul>
          </li>
        </ol>
      </div>
    </section>

    <section class="ao-section">
      <div class="ao-wrap">
        <p class="ao-kicker">What DNA fingerprints</p>
        <h2 class="ao-h2">Identity, not payload theater.</h2>
        <div class="ao-helix-fingerprints">
          <article class="ao-helix-fp">
            <div class="ao-helix-fp-icon" aria-hidden="true">
              <svg viewBox="0 0 48 48" fill="none"><path d="M8 14h32M8 24h24M8 34h28" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/><circle cx="38" cy="24" r="4" stroke="currentColor" stroke-width="2"/></svg>
            </div>
            <h3>Routes</h3>
            <p>Which URLs and methods the app is allowed to expose — new paths stay unproven until promoted.</p>
          </article>
          <article class="ao-helix-fp">
            <div class="ao-helix-fp-icon" aria-hidden="true">
              <svg viewBox="0 0 48 48" fill="none"><rect x="10" y="10" width="28" height="28" rx="4" stroke="currentColor" stroke-width="2.2"/><path d="M16 20h16M16 26h12M16 32h8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
            </div>
            <h3>Schema · query</h3>
            <p>Shape of bodies and query strings that belong to certified routes — drift shows up as identity failure.</p>
          </article>
          <article class="ao-helix-fp">
            <div class="ao-helix-fp-icon" aria-hidden="true">
              <svg viewBox="0 0 48 48" fill="none"><path d="M24 8v32M8 24h32" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/><circle cx="24" cy="24" r="14" stroke="currentColor" stroke-width="2.2"/></svg>
            </div>
            <h3>Status · behavior</h3>
            <p>Expected response patterns for the certified surface &mdash; what &ldquo;normal&rdquo; looks like for that route.</p>
          </article>
        </div>
        <p class="ao-sub" style="margin-top:1.25rem">
          A DNA mismatch means Helix saw app shape it never certified (unknown route, schema drift, and so on).
          It is about identity, not scanning every payload for classic web attacks.
        </p>
      </div>
    </section>

    <section class="ao-section ao-section-alt">
      <div class="ao-wrap">
        <p class="ao-kicker">Where Helix sits</p>
        <h2 class="ao-h2">In front of your app. No firewall redesign.</h2>
        <p class="ao-sub ao-sub--wide">
          Internet clients hit Helix on the public port. Helix talks to your app on localhost.
          Your existing NGFW / NAT stays put &mdash; Helix is the identity layer in front of the process.
        </p>
        <div class="ao-helix-mode-a" role="img" aria-label="Clients connect to Helix; Helix connects to your app on localhost">
          <svg class="ao-helix-mode-svg" viewBox="0 0 720 160" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="hxLine" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stop-color="#22d3ee"/>
                <stop offset="100%" stop-color="#a855f7"/>
              </linearGradient>
            </defs>
            <rect x="20" y="48" width="140" height="64" rx="12" fill="rgba(15,23,42,0.9)" stroke="rgba(148,163,184,0.35)" stroke-width="1.5"/>
            <text x="90" y="78" text-anchor="middle" fill="#e8eefc" font-family="DM Sans, sans-serif" font-size="14" font-weight="600">Internet</text>
            <text x="90" y="98" text-anchor="middle" fill="#98a3b8" font-family="JetBrains Mono, monospace" font-size="11">clients</text>

            <path d="M170 80 H230" stroke="url(#hxLine)" stroke-width="2.5" fill="none"/>
            <polygon points="230,80 220,74 220,86" fill="#22d3ee"/>

            <rect x="240" y="36" width="200" height="88" rx="14" fill="rgba(6,182,212,0.08)" stroke="#22d3ee" stroke-width="2"/>
            <text x="340" y="70" text-anchor="middle" fill="#5eead4" font-family="DM Sans, sans-serif" font-size="15" font-weight="700">Helix</text>
            <text x="340" y="92" text-anchor="middle" fill="#e8eefc" font-family="JetBrains Mono, monospace" font-size="12">public port</text>
            <text x="340" y="110" text-anchor="middle" fill="#98a3b8" font-family="DM Sans, sans-serif" font-size="12">certifies traffic</text>

            <path d="M450 80 H510" stroke="url(#hxLine)" stroke-width="2.5" fill="none"/>
            <polygon points="510,80 500,74 500,86" fill="#a855f7"/>

            <rect x="520" y="48" width="180" height="64" rx="12" fill="rgba(15,23,42,0.9)" stroke="rgba(168,85,247,0.55)" stroke-width="1.5"/>
            <text x="610" y="78" text-anchor="middle" fill="#e8eefc" font-family="DM Sans, sans-serif" font-size="14" font-weight="600">Your app</text>
            <text x="610" y="98" text-anchor="middle" fill="#98a3b8" font-family="JetBrains Mono, monospace" font-size="11">localhost only</text>
          </svg>
        </div>
        <p class="ao-story-note" style="margin-top:1.5rem">
          Operators call this <strong>Mode A</strong>: same box, public listener moves to Helix, app binds loopback.
          You keep allowing traffic while Helix learns, shadows, then enforces.
        </p>
      </div>
    </section>

    <section class="ao-section">
      <div class="ao-wrap">
        <p class="ao-kicker">What Helix does</p>
        <h2 class="ao-h2">Only certified app behavior gets through.</h2>
        <p class="ao-sub ao-sub--wide">
          Helix watches real traffic, learns what your app normally does, then blocks new routes and shapes
          that were never part of that picture. You turn it on without CWL or Convert.
        </p>
        <p class="ao-story-note" style="margin-top:1.5rem;max-width:48ch">
          Chrysalis Web Language is a separate pillar for describing and translating apps.
          Helix does not need it to protect. If you later want a migration&rsquo;s claimed surface checked
          against live traffic, that is when CWL can connect &mdash; not before.
        </p>
        <div class="ao-hero-ctas" style="margin-top:2rem">
          <a class="ao-btn ao-btn-primary" href="/paper-helix.html">Helix technical paper</a>
          <a class="ao-btn ao-btn-ghost" href="/chrysalis.html">CWL</a>
          <a class="ao-btn ao-btn-link" href="https://github.com/AgenticOp-io/chrysalis-security" target="_blank" rel="noopener">Secure on GitHub &rarr;</a>
        </div>
      </div>
    </section>
  </main>
  """;
}

@page GET "/services.html"
page services {
  effects: none;
  nav services;
  layout site;
  title "Services · Pilots on the DNA of the web | AgenticOps";
  description "Fixed-scope pilots with AgenticOps: inventory legacy apps in CWL, translate with Convert, verify against recorded traffic. No façades. Traffic decides.";
  canonical "https://agenticop.io/services.html";
  meta theme "#020208";
  meta robots "index, follow, max-image-preview:large, max-snippet:-1";
  meta author "AgenticOps";
  meta og type "website";
  meta og site "AgenticOps";
  meta og url "https://agenticop.io/services.html";
  meta og title "Services · AgenticOps";
  meta og description "Pilot, Run, Enablement — inventory in CWL, Convert translates, traffic decides.";
  meta og image "https://agenticop.io/logo.svg";
  icon logo apple;
  return html """
<main class="ao-page-main">
    <section class="ao-section ao-page-hero ao-page-hero--brand">
      <div class="ao-wrap">
        <p class="ao-kicker">Services</p>
        <h1 class="ao-page-title">Practice on the DNA of the web.</h1>
        <p class="ao-sub ao-sub--wide">
          Same spine every engagement: inventory in <strong>CWL</strong>, translate with <strong>Convert</strong>,
          prove with <strong>traffic</strong>, cut over carefully. Chrysalis is open source underneath &mdash;
          <strong>AgenticOps</strong> runs it with you.
        </p>
      </div>
    </section>
    <section class="ao-section ao-section-alt">
      <div class="ao-wrap">
        <div class="ao-offer-grid">
          <article class="ao-offer">
            <div class="ao-offer-visual" aria-hidden="true">
              <svg viewBox="0 0 64 48" fill="none"><rect x="8" y="10" width="20" height="28" rx="4" stroke="currentColor" stroke-width="2"/><path d="M36 24h16M46 18l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><circle cx="18" cy="24" r="4" stroke="currentColor" stroke-width="1.8"/></svg>
            </div>
            <span class="ao-tag">Fixed scope &middot; 4&mdash;8 weeks</span>
            <h2>Pilot</h2>
            <p>Staging copy of your app &mdash; not production. Record traffic, translate a handful of routes, hand you readable CWL, emit modern code, wire replay checks. Real artifacts + a cutover plan &mdash; not a rewrite promise.</p>
            <ul class="ao-bullets">
              <li>Sanitized traffic recording</li>
              <li>CWL writeup of routes + residuals</li>
              <li>Working Hono / Fastify code, traffic-checked</li>
              <li>Step-by-step rollout plan</li>
            </ul>
          </article>
          <article class="ao-offer ao-offer--run">
            <div class="ao-offer-visual" aria-hidden="true">
              <svg viewBox="0 0 64 48" fill="none"><path d="M12 24c0-10 8-16 20-16s20 6 20 16-8 16-20 16" stroke="currentColor" stroke-width="2"/><path d="M32 14v10l7 4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M44 34h8M48 30l4 4-4 4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
            </div>
            <span class="ao-tag">Ongoing &middot; monthly</span>
            <h2>Run</h2>
            <p>After Pilot proves the spine: more routes, deeper coverage, tuned old/new split. New source languages never lower the honesty bar &mdash; maturity stays labeled.</p>
            <ul class="ao-bullets">
              <li>Keep recordings current; multi-source merge</li>
              <li>Per-route pass/fail in your CI</li>
              <li>Traffic-split tuning + rollback drills</li>
              <li>No &quot;supported&quot; claim without tests</li>
            </ul>
          </article>
          <article class="ao-offer ao-offer--enable">
            <div class="ao-offer-visual" aria-hidden="true">
              <svg viewBox="0 0 64 48" fill="none"><path d="M18 34V16l14-6 14 6v18l-14 6-14-6z" stroke="currentColor" stroke-width="2"/><path d="M32 18v16M24 28h16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
            </div>
            <span class="ao-tag">Workshop &middot; 1&mdash;3 days</span>
            <h2>Enablement</h2>
            <p>Your team reads CWL, interprets gap reports, designs recordings, and runs the checks &mdash; on your codebase, not a toy demo.</p>
            <ul class="ao-bullets">
              <li>Read/write CWL: routes, effects, residuals</li>
              <li>WebIR + Translation Hub literacy</li>
              <li>When to block a merge from replay</li>
              <li>Optional 30-day follow-up</li>
            </ul>
          </article>
        </div>
        <div class="ao-creed" style="margin-top:2rem">
          <p><strong>AI drafts.</strong> <strong>Recorded traffic decides.</strong> <strong>unproven claims stay unlabeled &mdash; never facades.</strong></p>
        </div>
        <p class="ao-next-page"><a href="/contact.html">Start a Pilot &rarr;</a></p>
      </div>
    </section>
  </main>
  """;
}

@page GET "/trust.html"
page trust {
  effects: none;
  nav trust;
  layout site;
  title "Trust · Propose, verify, verified claims | AgenticOps";
  description "Rules we will not break: propose is not dispose, traffic is the oracle, unproven claims stay unlabeled, no façades. How AgenticOps earns trust.";
  canonical "https://agenticop.io/trust.html";
  meta theme "#020208";
  meta robots "index, follow, max-image-preview:large, max-snippet:-1";
  meta author "AgenticOps";
  meta og type "website";
  meta og site "AgenticOps";
  meta og url "https://agenticop.io/trust.html";
  meta og title "Trust · AgenticOps";
  meta og description "Propose &ne; dispose. Traffic is the oracle. unproven claims stay unlabeled. No facades.";
  meta og image "https://agenticop.io/logo.svg";
  icon logo apple;
  return html """
<main class="ao-page-main">
    <section class="ao-section ao-page-hero ao-page-hero--brand">
      <div class="ao-wrap">
        <p class="ao-kicker">Trust</p>
        <h1 class="ao-page-title">The rules we will not break.</h1>
        <p class="ao-sub ao-sub--wide">
          A genome only matters if it is honest about its limits. These rules live in
          <strong>CWL</strong>, in <strong>Convert</strong>, in <strong>Helix</strong>, and in every pilot.
        </p>
        <div class="ao-creed" style="margin-top:1.5rem;max-width:42rem">
          <p><strong>Propose &ne; dispose.</strong> <strong>Traffic is the oracle.</strong> <strong>unproven claims stay unlabeled.</strong></p>
        </div>
      </div>
    </section>
    <section class="ao-section ao-section-alt">
      <div class="ao-wrap">
        <div class="ao-trust-grid">
          <article class="ao-trust-item">
            <span class="ao-trust-num">01 &middot; Genome</span>
            <h2 class="ao-trust-h">CWL shows what is in the model</h2>
            <p>Not a parallel story that can disagree with what gets checked. What you read is what verify sees.</p>
          </article>
          <article class="ao-trust-item">
            <span class="ao-trust-num">02 &middot; Holes</span>
            <h2 class="ao-trust-h">We say &ldquo;we do not know yet&rdquo;</h2>
            <p>Unsafe claims stay unproven with reasons &mdash; never confident-looking guesses.</p>
          </article>
          <article class="ao-trust-item">
            <span class="ao-trust-num">03 &middot; Oracle</span>
            <h2 class="ao-trust-h">If replay does not match, it does not ship</h2>
            <p>Recorded traffic is the gate. Same bar for human and AI authorship.</p>
          </article>
          <article class="ao-trust-item">
            <span class="ao-trust-num">04 &middot; Maturity</span>
            <h2 class="ao-trust-h">Deep vs early &mdash; said out loud</h2>
            <p>Language pairs are not equal. The Hub grades them; we do not pretend otherwise.</p>
          </article>
          <article class="ao-trust-item">
            <span class="ao-trust-num">05 &middot; Cutover</span>
            <h2 class="ao-trust-h">A person decides</h2>
            <p>Mirror &rarr; slice &rarr; more. Rolling back a single route is always one decision away.</p>
          </article>
          <article class="ao-trust-item">
            <span class="ao-trust-num">06 &middot; Open</span>
            <h2 class="ao-trust-h">Not a black box</h2>
            <p>Chrysalis is Apache-2.0. Your recordings, results, and CWL stay yours to audit or take elsewhere.</p>
          </article>
        </div>
        <p class="ao-next-page"><a href="/about.html">Why we are building this &rarr;</a></p>
      </div>
    </section>
  </main>
  """;
}

@page GET "/whitepaper.html"
page whitepaper {
  effects: none;
  nav about;
  layout site;
  title "How Chrysalis works — CWL, Convert, Secure | AgenticOps";
  description "Technical overview of Chrysalis: how CWL (DNA of the web), Convert (Universal Translator), and Secure (Helix) work together — WebIR, traffic decides.";
  canonical "https://agenticop.io/whitepaper.html";
  meta robots "index, follow, max-image-preview:large, max-snippet:-1";
  meta og type "article";
  meta og site "AgenticOps";
  meta og title "How Chrysalis works — CWL, Convert, Secure";
  meta og description "Readable genome, Universal Translator, DNA firewall — the full loop from origin stack to certified traffic.";
  meta og url "https://agenticop.io/whitepaper.html";
  meta og image "https://agenticop.io/chrysalis-explainer.png";
  meta twitter card "summary_large_image";
  meta twitter title "How Chrysalis works";
  meta twitter description "CWL is the language of record. Convert translates. Helix proves live identity. Traffic decides.";
  meta twitter image "https://agenticop.io/chrysalis-explainer.png";
  icon logo;
  jsonld """
{
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": "How Chrysalis works — CWL, Convert, Secure",
    "description": "Technical overview of Chrysalis Web Language, the Universal Translator, and the Helix DNA firewall.",
    "url": "https://agenticop.io/whitepaper.html",
    "author": { "@type": "Organization", "name": "AgenticOps", "url": "https://agenticop.io/" },
    "publisher": { "@type": "Organization", "name": "AgenticOps", "url": "https://agenticop.io/" },
    "image": "https://agenticop.io/chrysalis-explainer.png",
    "dateModified": "2026-09-10"
  }
  """;
  return html """
<main id="main" class="ao-page-main ao-doc">
    <section class="ao-section ao-page-hero ao-page-hero--brand">
      <div class="ao-wrap ao-wrap--doc">
        <p class="ao-kicker ao-kicker--loud">Technical overview</p>
        <h1 class="ao-page-title">How Chrysalis works</h1>
        <p class="ao-lead ao-lead--doc">
          Chrysalis is three pillars with one shared bar.
          <strong>CWL</strong> is the language of record — the readable DNA of a web app.
          <strong>Convert</strong> is the Universal Translator that peels origins into that DNA and emits modern stacks.
          <strong>Secure (Helix)</strong> certifies live identity from traffic DNA, and may bridge to CWL when surface must match what is live.
          Tip language <strong>1.0.78</strong>. Complete CWL marketing site on Firebase. Apache-2.0 under AgenticOp-io. <strong>Traffic decides what ships.</strong>
        </p>
        <ol class="ao-flow-strip ao-flow-strip--hero" aria-label="Pillar spine">
          <li class="ao-flow-step ao-flow-step--cwl">
            <span class="ao-flow-num">01</span>
            <strong>CWL</strong>
            <span>language of record</span>
          </li>
          <li class="ao-flow-pipe" aria-hidden="true"></li>
          <li class="ao-flow-step ao-flow-step--convert">
            <span class="ao-flow-num">02</span>
            <strong>Convert</strong>
            <span>Universal Translator</span>
          </li>
          <li class="ao-flow-pipe" aria-hidden="true"></li>
          <li class="ao-flow-step ao-flow-step--secure">
            <span class="ao-flow-num">03</span>
            <strong>Secure</strong>
            <span>Helix DNA firewall</span>
          </li>
          <li class="ao-flow-pipe" aria-hidden="true"></li>
          <li class="ao-flow-step ao-flow-step--ship">
            <span class="ao-flow-num">04</span>
            <strong>Ship</strong>
            <span>only when proven</span>
          </li>
        </ol>
        <div class="ao-cta-actions">
          <a class="ao-btn ao-btn-primary" href="https://github.com/AgenticOp-io/chrysalis-cwl" target="_blank" rel="noopener">chrysalis-cwl</a>
          <a class="ao-btn ao-btn-ghost" href="/paper-cwl.html">CWL paper</a>
          <a class="ao-btn ao-btn-link" href="/docs.html">All docs &rarr;</a>
        </div>
        <p class="ao-doc-meta" style="margin-top:1rem">
          Sister papers:
          <a href="/paper-cwl.html">CWL</a> ·
          <a href="/paper-webir.html">WebIR</a> ·
          <a href="/paper-convert.html">Convert</a> ·
          <a href="/paper-helix.html">Helix</a> ·
          <a href="/paper-traffic.html">Traffic decides</a>
        </p>
      </div>
    </section>

    <nav class="ao-doc-toc" aria-label="On this page">
      <div class="ao-wrap ao-wrap--doc">
        <p class="ao-doc-toc-label">On this page</p>
        <ol>
          <li><a href="#problem">The problem</a></li>
          <li><a href="#architecture">Architecture</a></li>
          <li><a href="#cwl">How CWL works</a></li>
          <li><a href="#convert">How Convert works</a></li>
          <li><a href="#secure">How Secure works</a></li>
          <li><a href="#together">How they connect</a></li>
          <li><a href="#loop">End-to-end loop</a></li>
          <li><a href="#bar">Standing bar</a></li>
          <li><a href="#platforms">Platforms &amp; siblings</a></li>
          <li><a href="#start">Where to start</a></li>
        </ol>
      </div>
    </nav>

    <article class="ao-doc-body">
      <section id="problem" class="ao-section">
        <div class="ao-wrap ao-wrap--doc">
          <p class="ao-kicker">01 · Why</p>
          <h2 class="ao-h2">Migration and security usually invent two different truths</h2>
          <div class="ao-prose">
            <p>
              Most modernization tools pick a pair — PHP→Node, Java→Go, COBOL→something — and encode
              meaning inside a one-off converter. Most app firewalls invent a second model of “what the app is”
              from packets alone. The two stories diverge the moment AI drafts a change, a framework edge case
              appears, or live traffic drifts from the last migration memo.
            </p>
            <p>
              Chrysalis separates those jobs on purpose, then forces them to share a bar:
            </p>
            <ul>
              <li><strong>One readable genome</strong> for what the app claims to be (CWL ↔ WebIR).</li>
              <li><strong>One translator</strong> that may propose emits — but must not invent finish (Convert).</li>
              <li><strong>One live identity</strong> learned from certified traffic (Helix), optionally compared to that genome.</li>
            </ul>
            <p>
              If a claim cannot be proven, it stays <strong>unproven</strong>. We do not ship façades.
              Humans and machines can read the same model. Recorded traffic disposes what actually ships.
            </p>
          </div>
        </div>
      </section>

      <section id="architecture" class="ao-section ao-section-alt">
        <div class="ao-wrap ao-wrap--doc">
          <p class="ao-kicker">02 · Shape</p>
          <h2 class="ao-h2">Three pillars. One middle. Shared bar.</h2>
          <div class="ao-prose">
            <p>
              CWL matures as a <em>language</em> — grammar, RFCs, parsers, gold fixtures — not as “whatever Convert needed this sprint.”
              Convert and Secure <strong>consume</strong> that language; they do not redefine it under migration or firewall deadlines.
            </p>
          </div>
          <pre class="ao-doc-diagram" aria-label="Pillar interaction diagram"><code>                 ┌─────────────┐
                 │     CWL     │  language + specs + tooling
                 │  (mature)   │  DNA of the web
                 └──────┬──────┘
            produce /   │   consume / bridge
            consume     │
        ┌───────────────┼───────────────┐
        ▼               │               ▼
┌───────────────┐       │       ┌───────────────┐
│    Convert    │◄──────┴──────►│    Secure     │
│  (translator) │   shared bar  │   (Helix)     │
└───────────────┘  propose /    └───────────────┘
                   verify / holes</code></pre>
          <div class="ao-pillars" style="margin-top:2rem">
            <div class="ao-pillar">
              <span class="ao-pillar-tag">CWL</span>
              <h3>Language of record</h3>
              <p>Routes, pages, data, UI, effects, Maps 1:1 to WebIR. Humans audit; machines emit.</p>
            </div>
            <div class="ao-pillar-arrow" aria-hidden="true">&rarr;</div>
            <div class="ao-pillar ao-pillar-accent">
              <span class="ao-pillar-tag">WebIR</span>
              <h3>Semantic middle</h3>
              <p>Shared intermediate representation. Peel once, emit many — not a private IR per language pair.</p>
            </div>
            <div class="ao-pillar-arrow" aria-hidden="true">&rarr;</div>
            <div class="ao-pillar">
              <span class="ao-pillar-tag">Traffic</span>
              <h3>Dispose</h3>
              <p>Replay and DNA cutover decide. AI may draft; oracles and certified traffic dispose.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="cwl" class="ao-section">
        <div class="ao-wrap ao-wrap--doc">
          <p class="ao-kicker">03 · CWL</p>
          <h2 class="ao-h2">How Chrysalis Web Language works</h2>
          <div class="ao-prose">
            <p>
              <strong>CWL</strong> (Chrysalis Web Language) is not another web framework and not a general-purpose programming language.
              It is the <strong>canonical inscription</strong> of web-app identity — what the app <em>is</em> on the wire and on the page —
              written so people can audit it and so Convert / Secure can consume the same meaning.
            </p>
            <p>Tip <strong>1.0.80</strong> is public at
              <a href="https://github.com/AgenticOp-io/chrysalis-cwl" target="_blank" rel="noopener">AgenticOp-io/chrysalis-cwl</a>.
              CWL maps <strong>1:1</strong> to <strong>WebIR</strong>: WebIR is the semantic IR; CWL is the readable surface.
            </p>
          </div>

          <h3 class="ao-h3">What a genome contains</h3>
          <dl class="ao-doc-defs">
            <div>
              <dt>CWL API</dt>
              <dd>HTTP routes and handlers — methods, paths, params, status contracts.</dd>
            </div>
            <div>
              <dt>CWL Pages</dt>
              <dd>HTML / page shells, including redirect and error shells that must be preserved honestly.</dd>
            </div>
            <div>
              <dt>CWL Data</dt>
              <dd>Page data loaders and request-bound data shapes.</dd>
            </div>
            <div>
              <dt>CWL UI</dt>
              <dd>Component / island UI surface when it is part of the app identity.</dd>
            </div>
            <div>
              <dt>CWL Effects</dt>
              <dd>Middleware and side effects that change how a request is answered.</dd>
            </div>
            <div>
              <dt>Verify dispose</dt>
              <dd>Explicit unsupported regions — typed reasons, never silent stubs or invented runtimes.</dd>
            </div>
          </dl>

          <div class="ao-prose">
            <p>
              Language work is judged as language work: spec clarity, versioned breaking changes, golden fixtures
              independent of one customer POC, and tooling to parse / print / diff / validate.
              Convert and Secure <strong>pull</strong> CWL releases; they do not own the north star.
            </p>
            <p>
              Deep dive: <a href="/chrysalis.html">CWL story</a> ·
              <a href="https://github.com/AgenticOp-io/chrysalis-cwl" target="_blank" rel="noopener">repo</a>.
            </p>
          </div>
          <div class="ao-explainer-band ao-explainer-band--inset" aria-label="CWL diagram">
            <img
              class="ao-explainer-img"
              src="/cwl-explainer.png"
              width="1200"
              height="675"
              alt="CWL DNA of the web: routes, pages, data, and contracts describe into a readable genome."
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </section>

      <section id="convert" class="ao-section ao-section-alt">
        <div class="ao-wrap ao-wrap--doc">
          <p class="ao-kicker">04 · Convert</p>
          <h2 class="ao-h2">How the Universal Translator works</h2>
          <div class="ao-prose">
            <p>
              <strong>Convert</strong> peels an origin stack into the shared middle (<strong>WebIR + CWL</strong>), then emits a modern target.
              The job is <em>translate only</em>. It does not own the language, does not own the DNA cutover spine,
              and does not get to invent a finished app when origin truth is missing.
            </p>
          </div>

          <ol class="ao-brand-rail ao-brand-rail--compact">
            <li class="ao-brand-rail-item">
              <span class="ao-brand-rail-num">01</span>
              <h3>Peel</h3>
              <p>Origin code (PHP, Java, Node, COBOL, &hellip;) → WebIR. Dialects deepen over time; residuals stay catalogued.</p>
            </li>
            <li class="ao-brand-rail-item">
              <span class="ao-brand-rail-num">02</span>
              <h3>Inscribe</h3>
              <p>WebIR ↔ readable CWL. Humans review the genome. unproven claims stay unlabeled with reasons.</p>
            </li>
            <li class="ao-brand-rail-item">
              <span class="ao-brand-rail-num">03</span>
              <h3>Propose</h3>
              <p>AI / agents may draft CWL and emits (Intelligence Shorthand). Draft ≠ dispose.</p>
            </li>
            <li class="ao-brand-rail-item">
              <span class="ao-brand-rail-num">04</span>
              <h3>Emit</h3>
              <p>Modern stacks out (Hono, Fastify, TypeScript, Python, Go, &hellip;) or CWL for review — from the same middle.</p>
            </li>
            <li class="ao-brand-rail-item">
              <span class="ao-brand-rail-num">05</span>
              <h3>Verify</h3>
              <p>Replay recorded production behavior. Mismatch = no ship, whether the draft was human or AI.</p>
            </li>
          </ol>

          <div class="ao-prose">
            <p>
              Because every honest pair shares one middle, Convert does not need a special-case translator for every
              language pairing. Depth varies by pair — the Hub shows what is green today versus an honest residual.
              Nest / LiveView / Flutter façades remain catalogued residuals, not marketing greens.
            </p>
            <p>
              More: <a href="/convert.html">Convert</a> ·
              <a href="https://github.com/AgenticOp-io/chrysalis" target="_blank" rel="noopener">AgenticOp-io/chrysalis</a> ·
              <a href="https://hub.agenticop.io/" target="_blank" rel="noopener">hub.agenticop.io</a>.
            </p>
          </div>
          <div class="ao-explainer-band ao-explainer-band--inset" aria-label="Convert diagram">
            <img
              class="ao-explainer-img"
              src="/chrysalis-explainer.png"
              width="1200"
              height="675"
              alt="Universal Translator: origins peel into WebIR plus CWL, then emit modern stacks. LLM proposes; verify disposes."
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </section>

      <section id="secure" class="ao-section">
        <div class="ao-wrap ao-wrap--doc">
          <p class="ao-kicker">05 · Secure</p>
          <h2 class="ao-h2">How Helix (the DNA firewall) works</h2>
          <div class="ao-prose">
            <p>
              <strong>Secure</strong> asks one question: <em>is this still the certified app?</em>
              Out of the box it does <strong>not</strong> require CWL. Its primary identity artifact is
              <strong>app-dna-v1</strong> — traffic-proved DNA (routes, schemas, statuses) learned from live requests.
            </p>
            <p>
              Modes separate pass from trust so you can <strong>allow while securing</strong> — augment an NGFW
              without rewriting NAT homework overnight.
            </p>
          </div>

          <ol class="ao-flow-strip ao-flow-strip--hero" aria-label="Helix stages" style="margin:1.5rem 0 2rem">
            <li class="ao-flow-step ao-flow-step--cwl">
              <span class="ao-flow-num">01</span>
              <strong>Learn</strong>
              <span>record DNA</span>
            </li>
            <li class="ao-flow-pipe" aria-hidden="true"></li>
            <li class="ao-flow-step ao-flow-step--convert">
              <span class="ao-flow-num">02</span>
              <strong>Promote</strong>
              <span>sign identity</span>
            </li>
            <li class="ao-flow-pipe" aria-hidden="true"></li>
            <li class="ao-flow-step ao-flow-step--secure">
              <span class="ao-flow-num">03</span>
              <strong>Shadow</strong>
              <span>alert only</span>
            </li>
            <li class="ao-flow-pipe" aria-hidden="true"></li>
            <li class="ao-flow-step ao-flow-step--ship">
              <span class="ao-flow-num">04</span>
              <strong>Enforce</strong>
              <span>block DNA mismatches</span>
            </li>
          </ol>

          <div class="ao-prose">
            <p>
              <strong>Optional CWL bridge:</strong> seed DNA from a CWL surface, or export DNA→CWL to compare with Convert.
              Any bridge must follow <code>chrysalis-cwl</code> semantics — Helix must not fork the language.
              CWL is not the firewall; Secure must not require the Convert monorepo to enforce.
            </p>
            <p>
              More: <a href="/secure.html">Secure / Helix</a> ·
              <a href="https://github.com/AgenticOp-io/chrysalis-security" target="_blank" rel="noopener">AgenticOp-io/chrysalis-security</a>.
            </p>
          </div>
          <div class="ao-explainer-band ao-explainer-band--inset" aria-label="Helix diagram">
            <img
              class="ao-explainer-img"
              src="/helix-explainer.png"
              width="1200"
              height="675"
              alt="Helix DNA firewall: learn, shadow, enforce from certified app DNA. Allow while securing."
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </section>

      <section id="together" class="ao-section ao-section-alt">
        <div class="ao-wrap ao-wrap--doc">
          <p class="ao-kicker">06 · Interaction</p>
          <h2 class="ao-h2">How the pillars connect</h2>
          <div class="ao-prose">
            <p>
              Convert authors and closes gaps in CWL terms. CWL upgrades unlock better peels and emits.
              Secure learns and enforces without needing CWL. When cutover demands that a migration matches live identity,
              the shared spine compares CWL surface ⊆ certified DNA.
            </p>
          </div>

          <div class="ao-doc-table-wrap" role="region" aria-label="Pillar interactions" tabindex="0">
            <table class="ao-doc-table">
              <thead>
                <tr>
                  <th scope="col">From → To</th>
                  <th scope="col">What happens</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">Convert → CWL</th>
                  <td>Emit / author CWL; close gaps in CWL terms.</td>
                </tr>
                <tr>
                  <th scope="row">CWL → Convert</th>
                  <td>Language tip upgrades unlock better peels and emits.</td>
                </tr>
                <tr>
                  <th scope="row">Secure → DNA</th>
                  <td>Learn / shadow / enforce without requiring CWL.</td>
                </tr>
                <tr>
                  <th scope="row">CWL ↔ Secure</th>
                  <td>Optional bridge: CWL route surface ↔ DNA routes; cutover gate “convert matches live DNA.”</td>
                </tr>
                <tr>
                  <th scope="row">All three</th>
                  <td>Same bar: propose · verify dispose · no façades.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="ao-prose">
            <p>
              The Universal Translator <strong>identity gate</strong> (CWL ↔ Helix spine) is owned by CWL, not Convert:
              language gold → contract gate → Helix seed / promote → compare CWL surface ⊆ certified DNA → allow/deny.
              Convert translates into that world; it does not own the spine.
            </p>
          </div>
          <div class="ao-creed">
            <p><strong>Propose ≠ dispose.</strong> <strong>unproven claims stay unlabeled.</strong> <strong>No façades.</strong> <strong>Traffic decides.</strong></p>
          </div>
        </div>
      </section>

      <section id="loop" class="ao-section">
        <div class="ao-wrap ao-wrap--doc">
          <p class="ao-kicker">07 · Loop</p>
          <h2 class="ao-h2">End-to-end: watch → write DNA → prove → ship</h2>
          <div class="ao-prose">
            <p>
              The operational loop is the same whether you are lifting a legacy PHP app or authoring greenfield CWL.
              Depth of testing varies by language pair; the spine does not.
            </p>
          </div>
          <ol class="ao-brand-rail">
            <li class="ao-brand-rail-item">
              <span class="ao-brand-rail-num">01 · Watch</span>
              <h3>Record reality</h3>
              <p>Capture real requests, effects, and responses. That tape is the oracle — not a design memo.</p>
            </li>
            <li class="ao-brand-rail-item">
              <span class="ao-brand-rail-num">02 · Read</span>
              <h3>Peel to WebIR / CWL</h3>
              <p>Origin code to shared model — or author routes directly in CWL when greenfield.</p>
            </li>
            <li class="ao-brand-rail-item">
              <span class="ao-brand-rail-num">03 · Draft</span>
              <h3>AI proposes</h3>
              <p>Agents suggest CWL and emits, flag uncertainty, reuse proven patterns. Draft is never dispose.</p>
            </li>
            <li class="ao-brand-rail-item">
              <span class="ao-brand-rail-num">04 · Emit</span>
              <h3>Real code out</h3>
              <p>Modern stack or CWL for review. Unsure pieces stay unproven — never façades.</p>
            </li>
            <li class="ao-brand-rail-item">
              <span class="ao-brand-rail-num">05 · Verify</span>
              <h3>Replay the tape</h3>
              <p>Side-by-side against step one. Same bar for AI drafts and human edits.</p>
            </li>
            <li class="ao-brand-rail-item">
              <span class="ao-brand-rail-num">06 · Cut over</span>
              <h3>Side by side</h3>
              <p>Mirror, then slice, then more. Any route rolls back the moment DNA or replay looks wrong.</p>
            </li>
          </ol>
          <p class="ao-next-page"><a href="/method.html">Method page (shorter) &rarr;</a> · <a href="/proof.html">What works today &rarr;</a></p>
        </div>
      </section>

      <section id="bar" class="ao-section ao-section-alt">
        <div class="ao-wrap ao-wrap--doc">
          <p class="ao-kicker">08 · Law</p>
          <h2 class="ao-h2">Standing bar — and what this is not</h2>
          <div class="ao-prose">
            <ul>
              <li><strong>Propose ≠ dispose</strong> — LLMs and agents draft; oracles and traffic dispose.</li>
              <li><strong>Verify dispose</strong> — unsupported truth stays unlabeled; never silent invention.</li>
              <li><strong>No façades</strong> — demo finishes that paper over missing origin fail the bar.</li>
              <li><strong>Language first</strong> — CWL semantics land in <code>chrysalis-cwl</code>; Convert/Secure pull.</li>
              <li><strong>Traffic decides</strong> — recorded behavior beats migration memos.</li>
            </ul>
            <p><strong>This is not:</strong></p>
            <ul>
              <li>“CWL is the firewall.”</li>
              <li>“Secure must load the Convert monorepo.”</li>
              <li>One mega-repo forever — pillars stay separate so the language can mature.</li>
              <li>A claim that every framework pair is finished — residuals stay catalogued.</li>
            </ul>
            <p>
              Public npm is still GitHub Packages / <code>file:</code> pins by default.
              Patent and counsel drafts stay private.
            </p>
          </div>
        </div>
      </section>

      <section id="platforms" class="ao-section">
        <div class="ao-wrap ao-wrap--doc">
          <p class="ao-kicker">09 · Ecosystem</p>
          <h2 class="ao-h2">Platforms &amp; siblings under the same org</h2>
          <ul class="ao-bullets ao-bullets--doc">
            <li><strong>WPTP</strong> —
              <a href="https://github.com/AgenticOp-io/wptp-ir" target="_blank" rel="noopener">wptp-ir</a>,
              adapters, emitters,
              <a href="https://github.com/AgenticOp-io/wptp-matrix" target="_blank" rel="noopener">wptp-matrix</a>
              — compatibility grades, not marketing greens.</li>
            <li><a href="https://github.com/AgenticOp-io/fragility-discovery-engine" target="_blank" rel="noopener">fragility-discovery-engine</a>
              — adversarial search over simulations.</li>
            <li><a href="https://github.com/AgenticOp-io/ghost-museum" target="_blank" rel="noopener">ghost-museum</a>
              — still-answering hall. Evidence surface; do not integrate as a product dependency.</li>
          </ul>
        </div>
      </section>

      <section id="start" class="ao-section ao-section-alt">
        <div class="ao-wrap ao-wrap--doc">
          <p class="ao-kicker">10 · Start</p>
          <h2 class="ao-h2">Where to go next</h2>
          <div class="ao-open-pillars" aria-label="Public Chrysalis repositories">
            <div class="ao-open-pillars-head">
              <p class="ao-kicker">Open source</p>
              <p>All three pillars are public. Tip language <strong>1.0.78</strong>. This site is that genome on Firebase.</p>
            </div>
            <ul class="ao-open-pillars-list">
              <li>
                <a href="https://github.com/AgenticOp-io/chrysalis-cwl" target="_blank" rel="noopener">
                  <span>01 · CWL</span>
                  <strong>chrysalis-cwl</strong>
                  <em>Language · DNA</em>
                </a>
              </li>
              <li>
                <a href="https://github.com/AgenticOp-io/chrysalis" target="_blank" rel="noopener">
                  <span>02 · Convert</span>
                  <strong>chrysalis</strong>
                  <em>Universal Translator</em>
                </a>
              </li>
              <li>
                <a href="https://github.com/AgenticOp-io/chrysalis-security" target="_blank" rel="noopener">
                  <span>03 · Secure</span>
                  <strong>chrysalis-security</strong>
                  <em>Helix DNA firewall</em>
                </a>
              </li>
            </ul>
          </div>
          <div class="ao-hero-ctas" style="margin-top:2rem">
            <a class="ao-btn ao-btn-primary" href="/chrysalis.html">Explore CWL</a>
            <a class="ao-btn ao-btn-ghost" href="https://hub.agenticop.io/" target="_blank" rel="noopener">Demo hub</a>
            <a class="ao-btn ao-btn-link" href="/contact.html">Contact &amp; pilots &rarr;</a>
          </div>
        </div>
      </section>
    </article>
  </main>
  """;
}

@page GET "/wptp.html"
page wptp {
  effects: none;
  nav projects;
  layout site;
  title "WPTP — WebIR platforms | AgenticOps";
  description "WPTP: @wptp/ir, OpenAPI/HAR adapters, Hono/Next/Fastify emitters, compatibility matrix. Related to Chrysalis WebIR; does not own CWL.";
  canonical "https://agenticop.io/wptp.html";
  meta og title "WPTP platforms";
  meta og url "https://agenticop.io/wptp.html";
  icon logo;
  return html """
<main id="main" class="ao-page-main ao-doc">
    <section class="ao-section ao-page-hero ao-page-hero--brand">
      <div class="ao-wrap ao-wrap--doc">
        <p class="ao-kicker">Platforms</p>
        <h1 class="ao-page-title">WPTP</h1>
        <p class="ao-lead ao-lead--doc">
          Public packages for a neutral IR hub, contract adapters, bronze emitters, and a source×target×verification matrix.
          Chrysalis WebIR + CWL remain language authority. WPTP does not redefine the genome.
        </p>
        <p class="ao-doc-meta"><a href="/projects.html">Projects</a> · <a href="/paper-webir.html">WebIR paper</a></p>
      </div>
    </section>

    <article class="ao-doc-body">
      <section class="ao-section">
        <div class="ao-wrap ao-wrap--doc">
          <h2 class="ao-h2">Packages</h2>
          <div class="ao-doc-table-wrap" tabindex="0">
            <table class="ao-doc-table">
              <thead><tr><th>Package</th><th>Role</th><th>Ver (approx)</th></tr></thead>
              <tbody>
                <tr><th scope="row"><a href="https://github.com/AgenticOp-io/wptp-ir" target="_blank" rel="noopener">@wptp/ir</a></th><td>Neutral IR hub; can import Chrysalis WebIR bundles; explicit <code>losses[]</code></td><td>0.1.x</td></tr>
                <tr><th scope="row"><a href="https://github.com/AgenticOp-io/wptp-adapter-openapi" target="_blank" rel="noopener">adapter-openapi</a></th><td>OpenAPI 3 → IR</td><td>0.1.x</td></tr>
                <tr><th scope="row"><a href="https://github.com/AgenticOp-io/wptp-adapter-browser" target="_blank" rel="noopener">adapter-browser</a></th><td>HAR → IR</td><td>0.1.x</td></tr>
                <tr><th scope="row"><a href="https://github.com/AgenticOp-io/wptp-emit-hono" target="_blank" rel="noopener">wptp-emit-hono</a></th><td>IR → Hono (bronze stubs where noted)</td><td>0.1.x</td></tr>
                <tr><th scope="row"><a href="https://github.com/AgenticOp-io/wptp-emit-nextjs" target="_blank" rel="noopener">wptp-emit-nextjs</a></th><td>IR → Next App Router</td><td>0.1.x</td></tr>
                <tr><th scope="row"><a href="https://github.com/AgenticOp-io/wptp-emit-fastify" target="_blank" rel="noopener">wptp-emit-fastify</a></th><td>IR → Fastify</td><td>0.1.x</td></tr>
                <tr><th scope="row"><a href="https://github.com/AgenticOp-io/wptp-matrix" target="_blank" rel="noopener">wptp-matrix</a></th><td>Grades — Gold needs harness + corpus/CI · <a href="https://agenticop-io.github.io/wptp-matrix/" target="_blank" rel="noopener">GH Pages viewer</a></td><td>0.1.x</td></tr>
              </tbody>
            </table>
          </div>
          <div class="ao-prose">
            <p>
              Documented CI path: Chrysalis <code>webir-bundle-to-wptp-ir</code> imports tiny-blog with zero losses.
              That proves interoperability; it does not demote <code>@chrysalis/webir</code>.
              Full catalog: <a href="/published.html#wptp">Published · WPTP</a>.
            </p>
          </div>
        </div>
      </section>
    </article>
  </main>
  """;
}

