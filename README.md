---
import '../styles/global.**s';**mport Brand from '../components/B**nd.astro';
import { SITE, ADS, AN**YTICS, PILLARS, PILLAR_KEYS, FOOT**_LINKS } from '../config';
import** getReviews, areasOf** from '../lib/util';

interface P**ps {** title?: string;
  description?: **ring;
  image?: string;
  noAds?:**oolean;
  noindex?: boolean;
  js**Ld?: Record<string,**nknown>;
}
const { title, descrip**on = SITE.description, image = '/**and/icon-512.png', noAds = false,**oindex = false, js**Ld } = Astro.props;
const fullTit** = title ? `${**tle} – ${SITE.name}` : `${SITE.na**} – ${SITE.tagline}`;
const canon**al = new URL(Astro.url.pathname, **t**.site ?? SITE.url).href;
const og**age = new URL(image, Astro.site ?**SITE.url**href;
const path = Astro.url.path**me;
const isHome = path**== '/';
const isExplore = /^\/(**views|explore|area|review)\//.tes****th);
const areas = areasOf(await **tReviews()).slice(0,**);
const loadAds = ADS.enabled &&**!ADS.client && !noAds;
const gaId** ANALYTICS?.gaId || '';
const loa*** = !!gaId && !import.meta.env.DEV**---
<!doctype html>
<html lang**en-IN">
<head>
  <meta charset="u**-8" />
  <meta name="vi**port" content="width=device-width**initial-scale=1, viewport-f**=cover" />
  <title>{fullTitle}</**tle>
  **eta name="description" content={d**cription} />
  <link rel="canonic**" href={canonical} />
  {noindex ** <meta name="robots" content="noi**ex" />}
  <meta name="theme-color**content="#5b2a86" />
  <link rel=**con" href="/favicon.svg" type**image/svg+xml" />
  <link rel="ic**" href="/brand/icon-32.png" sizes**32x32**/>
  <link rel="apple-touch-icon"**ref="/brand/icon-192.png" />
  <m**a property="og:type" content="web**te" />
  <meta property="og**ite_name" content={SITE.name} />
**<meta property="og:title**content={fullTitle} />
  <meta pr**erty="og:description" content={de**ription} />
  <meta property="og:**l" content={canonical} />
  <me** property="og:image" content={ogI**ge} />
  <meta name="twitter:card**content="summary_large_image" />
**<link rel="sitemap" href="/sitema**index.xml" />
  <link rel="precon**ct" href="https://**nts.googleapis.com" />
  <link re**"preconnect" href="https://fonts.**tatic.com" cr**sorigin />
  <link href="https://**nts.googleapis.com/css2?family=Ca**at:wght@700&family**oppins:wght@400;500;600;700&displ**=swap" rel**stylesheet" />
  {ADS.client && <**ta name="google-adsense-account" **ntent={ADS.client} />}** {loadAds && <script is:inline async src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADS.client}`} crossorigin="anonymous"></script>}
  {jsonLd && <script type="application/ld+json" set:html={JSON.stringify(jsonLd)} />}

  <!-- Google Analytics 4 (live site only, not on your Mac) -->
  {loadGA && <script is:inline async src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}></script>}
  {loadGA && (
    <script is:inline define:vars={{ gaId }}>
      window.dataLayer = window.dataLayer || [];
      window.gtag = function () { window.dataLayer.push(arguments); };
      window.gtag('js', new Date());
      window.gtag('config', gaId);
    </script>
  )}
</head>
<body>
  <a class="skip-link" href="#main">Skip to content</a>
  <header class="site-header">
    <div class="nav">
      <Brand href="/" />
      <nav class="main-nav" aria-label="Primary">
        <ul>
          {PILLAR_KEYS.map((k) => (
            <li><a href={`/explore/${k}/`} aria-current={path === `/explore/${k}/` ? 'page' : undefined}>{PILLARS[k].name}</a></li>
          ))}
          <li><a href="/stories/" aria-current={path.startsWith('/stories/') ? 'page' : undefined}>Stories</a></li>
        </ul>
      </nav>
      <div class="nav-actions">
        <a href="/reviews/" class="btn">Explore</a>
        <button class="icon-btn" type="button" data-drawer-open aria-controls="vb-drawer" aria-expanded="false" aria-label="Open menu">☰</button>
      </div>
    </div>
  </header>

  <div class="drawer" id="vb-drawer" aria-hidden="true">
    <div class="drawer-bg" data-drawer-close></div>
    <div class="drawer-panel" role="dialog" aria-modal="true" aria-label="Menu">
      <div class="drawer-head">
        <Brand />
        <button class="icon-btn" type="button" data-drawer-close aria-label="Close menu">✕</button>
      </div>
      <form action="/reviews/" method="get" role="search">
        <label class="sr-only" for="vb-drawer-q">Search</label>
        <input id="vb-drawer-q" type="search" name="q" placeholder="Search thali, gym, temple…" />
        <button class="btn" type="submit" aria-label="Search">🔍</button>
      </form>
      <div class="drawer-pillars">
        {PILLAR_KEYS.map((k) => (
          <a href={`/explore/${k}/`}><span style="font-size:22px">{PILLARS[k].icon}</span><span>{PILLARS[k].name}<small>{PILLARS[k].hi}</small></span></a>
        ))}
      </div>
      <ul>
        <li><a href="/stories/">Stories & Trails</a></li>
        {FOOTER_LINKS.map((l) => <li><a href={l.href}>{l.label}</a></li>)}
      </ul>
    </div>
  </div>

  <main id="main"><slot /></main>

  <footer class="site-footer">
    <div class="wrap">
      <div class="foot">
        <div>
          <Brand href="/" />
          <p style="margin-top:10px;max-width:340px">Honest, first-hand reviews of places to eat, sip, travel, pray, play and stay. We pay our own bills.</p>
        </div>
        <div><h4>Explore</h4>{PILLAR_KEYS.map((k) => <a href={`/explore/${k}/`}>{PILLARS[k].icon} {PILLARS[k].name}</a>)}</div>
        <div><h4>Popular Areas</h4>{areas.map((a) => <a href={`/area/${a.slug}/`}>{a.name}</a>)}</div>
        <div><h4>About</h4>{FOOTER_LINKS.map((l) => <a href={l.href}>{l.label}</a>)}</div>
      </div>
      <div class="copy">© {new Date().getFullYear()} {SITE.name} · All photos are our own unless stated.</div>
    </div>
  </footer>

  <nav class="bottom-nav" aria-label="Quick navigation">
    <a href="/" class={isHome ? 'is-active' : ''}><span class="bi">🏠</span>Home</a>
    <a href="/reviews/" class={isExplore ? 'is-active' : ''}><span class="bi">🧭</span>Explore</a>
    <button type="button" data-drawer-open data-focus-search><span class="bi">🔍</span>Search</button>
    <button type="button" data-drawer-open><span class="bi">☰</span>Menu</button>
  </nav>
  <script is:inline src="/js/main.js" defer></script>
</body>
</html>
