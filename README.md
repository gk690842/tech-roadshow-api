---
import '../styles/global.css';
import Brand from '../components/Brand.astro';
import { SITE, ADS, ANALYTICS, PILLARS, PILLAR_KEYS, FOOTER_LINKS } from '../config';
import { getReviews, areasOf } from '../lib/util';

interface Props {
  title?: string;
  description?: string;
  image?: string;
  noAds?: boolean;
  noindex?: boolean;
  jsonLd?: Record<string, unknown>;
}
const { title, description = SITE.description, image = '/brand/icon-512.png', noAds = false, noindex = false, jsonLd } = Astro.props;
const fullTitle = title ? `${title} – ${SITE.name}` : `${SITE.name} – ${SITE.tagline}`;
const canonical = new URL(Astro.url.pathname, Astro.site ?? SITE.url).href;
const ogImage = new URL(image, Astro.site ?? SITE.url).href;
const path = Astro.url.pathname;
const isHome = path === '/';
const isExplore = /^\/(reviews|explore|area|review)\//.test(path);
const areas = areasOf(await getReviews()).slice(0, 6);
const loadAds = ADS.enabled && !!ADS.client && !noAds;
---
<!doctype html>
<html lang="en-IN">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
  <title>{fullTitle}</title>
  <meta name="description" content={description} />
  <link rel="canonical" href={canonical} />
  {noindex && <meta name="robots" content="noindex" />}
  <meta name="theme-color" content="#5b2a86" />
  <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
  <link rel="icon" href="/brand/icon-32.png" sizes="32x32" />
  <link rel="apple-touch-icon" href="/brand/icon-192.png" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content={SITE.name} />
  <meta property="og:title" content={fullTitle} />
  <meta property="og:description" content={description} />
  <meta property="og:url" content={canonical} />
  <meta property="og:image" content={ogImage} />
  <meta name="twitter:card" content="summary_large_image" />
  <link rel="sitemap" href="/sitemap-index.xml" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Caveat:wght@700&family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet" />
  {ADS.client && <meta name="google-adsense-account" content={ADS.client} />}
  {loadAds && <script async src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADS.client}`} crossorigin="anonymous"></script>}
  {jsonLd && <script type="application/ld+json" set:html={JSON.stringify(jsonLd)} />}
  {ANALYTICS.gaID && !import.meta.env.DEV && (
    <>
     <script async src={`https://www.googletagmanager.com/gtag/js?
     id=${ANALYTICS.gaID}`}></script>
     <script is:inline set:html={``
      window.dataLayer = window.datalayer || [];
      function gtag(){dataLayer.push(arguments);}
      window.gtag = gtag;
      gtag('js', new Date());
      gtag('config', '${ANALYTICS.gaID}');
      `} />
      </>
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
