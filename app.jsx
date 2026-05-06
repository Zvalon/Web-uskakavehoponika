const { useState, useEffect, useRef } = React;

// ============ TWEAKABLE DEFAULTS ============
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "palette": "cream",
  "fontPair": "serif-sans"
}/*EDITMODE-END*/;

const PALETTES = {
  cream: {
    bg: "#F5EFE0",
    bg2: "#EFE6D2",
    bgDeep: "#E9DEC0",
    ink: "#1F3A2E",
    inkSoft: "#3A5346",
    accent: "#E8A23C",
    accentSoft: "#F4C77B",
    accentDeep: "#C7842A",
    line: "#1F3A2E",
  },
  forest: {
    bg: "#EFE6D2",
    bg2: "#E5D9BC",
    bgDeep: "#D9CBA8",
    ink: "#102820",
    inkSoft: "#2A4438",
    accent: "#D98E2B",
    accentSoft: "#EAB663",
    accentDeep: "#A66816",
    line: "#102820",
  },
  dusk: {
    bg: "#F2EADA",
    bg2: "#EAE0CB",
    bgDeep: "#DCCEAE",
    ink: "#2B1F12",
    inkSoft: "#4A3826",
    accent: "#C8632B",
    accentSoft: "#E8A87E",
    accentDeep: "#9A4818",
    line: "#2B1F12",
  },
  sage: {
    bg: "#EEEBDB",
    bg2: "#E2DEC8",
    bgDeep: "#CFCBA9",
    ink: "#1B342A",
    inkSoft: "#3D5144",
    accent: "#D4A24C",
    accentSoft: "#E9C887",
    accentDeep: "#A87625",
    line: "#1B342A",
  },
};

const FONT_PAIRS = {
  "serif-sans": {
    display: '"DM Serif Display", "Times New Roman", serif',
    body: '"Outfit", system-ui, sans-serif',
    mono: '"JetBrains Mono", monospace',
    displayWeight: 400,
    label: "DM Serif × Outfit",
  },
  "fraunces": {
    display: '"Fraunces", Georgia, serif',
    body: '"Inter Tight", system-ui, sans-serif',
    mono: '"JetBrains Mono", monospace',
    displayWeight: 600,
    label: "Fraunces × Inter Tight",
  },
  "playfair": {
    display: '"Playfair Display", Georgia, serif',
    body: '"Manrope", system-ui, sans-serif',
    mono: '"JetBrains Mono", monospace',
    displayWeight: 700,
    label: "Playfair × Manrope",
  },
  "instrument": {
    display: '"Instrument Serif", Georgia, serif',
    body: '"Geist", system-ui, sans-serif',
    mono: '"JetBrains Mono", monospace',
    displayWeight: 400,
    label: "Instrument × Geist",
  },
};

// ============ ICONS / ILLUSTRATIONS ============
const CupIcon = ({ size = 28, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none" stroke={color} strokeWidth="1.5">
    <path d="M8 14 H30 V24 C30 28 26 31 22 31 H16 C12 31 8 28 8 24 Z" />
    <path d="M30 17 C34 17 35 19 35 22 C35 25 34 27 30 27" />
    <path d="M14 9 C14 11 16 11 16 13 M19 8 C19 10 21 10 21 12 M24 9 C24 11 26 11 26 13" strokeLinecap="round" />
  </svg>
);

const BeanIcon = ({ size = 24, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none" stroke={color} strokeWidth="1.5">
    <ellipse cx="20" cy="20" rx="9" ry="14" transform="rotate(30 20 20)" />
    <path d="M14 11 C18 16 22 24 26 29" strokeLinecap="round" />
  </svg>
);

const LeafBranch = ({ color = "currentColor", style }) => (
  <svg viewBox="0 0 200 280" fill="none" stroke={color} strokeWidth="1.4" strokeLinecap="round" style={style}>
    <path d="M100 270 C100 200 100 130 100 20" />
    {[...Array(7)].map((_, i) => {
      const y = 50 + i * 30;
      const side = i % 2 === 0 ? 1 : -1;
      return (
        <g key={i}>
          <path d={`M100 ${y} Q${100 + side * 30} ${y - 10} ${100 + side * 55} ${y - 5}`} />
          <ellipse cx={100 + side * 50} cy={y - 5} rx="22" ry="11" transform={`rotate(${side * 15} ${100 + side * 50} ${y - 5})`} />
          <path d={`M${100 + side * 30} ${y - 5} L${100 + side * 70} ${y - 5}`} opacity="0.5" />
        </g>
      );
    })}
    {[
      [70, 80], [130, 110], [75, 150], [128, 180], [78, 215]
    ].map(([cx, cy], i) => (
      <g key={i}>
        <circle cx={cx} cy={cy} r="5" />
        <circle cx={cx + 6} cy={cy + 2} r="5" />
      </g>
    ))}
  </svg>
);

const PourIllustration = ({ color = "currentColor", style }) => (
  <svg viewBox="0 0 220 280" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={style}>
    {/* Turkish coffee pot */}
    <path d="M40 60 L55 50 L75 50 L90 60" />
    <path d="M55 60 L55 110 Q55 130 75 135 L75 145" />
    <path d="M90 60 C100 65 105 75 105 90 C105 110 95 125 80 130" />
    <path d="M105 80 L150 60" strokeWidth="2" />
    {/* pour stream */}
    <path d="M75 145 C75 165 85 175 95 185 C100 195 95 210 105 215 C115 220 130 215 135 225" strokeWidth="2.5" />
    {/* cup */}
    <path d="M115 230 L115 255 Q115 270 135 270 L165 270 Q185 270 185 255 L185 230 Z" />
    <ellipse cx="150" cy="230" rx="35" ry="6" />
    <path d="M185 240 Q200 240 200 250 Q200 260 185 260" />
    {/* saucer */}
    <ellipse cx="150" cy="275" rx="50" ry="5" />
    {/* cookie */}
    <circle cx="195" cy="265" r="8" />
    <circle cx="192" cy="263" r="1" />
    <circle cx="198" cy="266" r="1" />
    <circle cx="195" cy="268" r="1" />
  </svg>
);

const SteamCup = ({ color = "currentColor", style }) => (
  <svg viewBox="0 0 80 80" fill="none" stroke={color} strokeWidth="1.4" strokeLinecap="round" style={style}>
    <path d="M28 10 C28 14 32 14 32 18 M40 8 C40 12 44 12 44 16 M52 10 C52 14 56 14 56 18" />
    <path d="M20 28 H58 V44 C58 52 52 58 44 58 H34 C26 58 20 52 20 44 Z" />
    <path d="M58 32 C64 32 66 36 66 40 C66 44 64 48 58 48" />
    <ellipse cx="39" cy="36" rx="10" ry="3" />
    <path d="M34 36 C36 38 42 38 44 36" />
  </svg>
);

// ============ TOP NAV ============
const TopNav = ({ lang, setLang, P }) => {
  const [open, setOpen] = useState(false);
  const items = lang === "sk"
    ? ["O nás", "Aktivity", "Udalosti", "Blog", "Galéria", "Tím", "Kontakt"]
    : ["About", "Activities", "Events", "Blog", "Gallery", "Team", "Contact"];

  return (
    <header style={{
      position: "sticky", top: 0, zIndex: 50,
      background: P.bg + "EE",
      backdropFilter: "blur(8px)",
      borderBottom: `1px solid ${P.ink}15`,
    }}>
      <div style={{
        maxWidth: 1400, margin: "0 auto",
        padding: "20px 40px",
        display: "grid",
        gridTemplateColumns: "1fr auto 1fr",
        alignItems: "center",
        gap: 32,
      }}>
        {/* Left nav */}
        <nav style={{ display: "flex", gap: 28, fontSize: 14, fontWeight: 500, letterSpacing: "0.02em" }}>
          {items.slice(0, 3).map((it, i) => (
            <a key={it} href={`#${it}`} style={{
              color: i === 0 ? P.accent : P.ink,
              textDecoration: "none",
              fontStyle: i === 0 ? "italic" : "normal",
              borderBottom: i === 0 ? `1px solid ${P.accent}` : "1px solid transparent",
              paddingBottom: 2,
              transition: "all 0.2s",
            }}>{it}</a>
          ))}
        </nav>

        {/* Logo */}
        <a href="#top" style={{
          fontFamily: "var(--ff-display)",
          fontSize: 28,
          fontWeight: 600,
          color: P.ink,
          textDecoration: "none",
          letterSpacing: "-0.01em",
          textAlign: "center",
          lineHeight: 1,
        }}>
          U šálky <span style={{ color: P.accent, fontStyle: "italic" }}>kávy</span>
          <div style={{ fontSize: 10, fontFamily: "var(--ff-mono)", color: P.inkSoft, letterSpacing: "0.3em", marginTop: 4, fontWeight: 400 }}>
            O · H O P O N I K E
          </div>
        </a>

        {/* Right */}
        <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 20 }}>
          <nav style={{ display: "flex", gap: 24, fontSize: 14, fontWeight: 500 }}>
            {items.slice(3, 5).map(it => (
              <a key={it} href={`#${it}`} style={{ color: P.ink, textDecoration: "none" }}>{it}</a>
            ))}
          </nav>
          <div style={{ display: "flex", gap: 4, fontSize: 12, fontFamily: "var(--ff-mono)" }}>
            <button onClick={() => setLang("sk")} style={{
              border: "none", background: lang === "sk" ? P.ink : "transparent",
              color: lang === "sk" ? P.bg : P.ink,
              padding: "4px 8px", cursor: "pointer", borderRadius: 12, fontFamily: "inherit",
            }}>SK</button>
            <button onClick={() => setLang("en")} style={{
              border: "none", background: lang === "en" ? P.ink : "transparent",
              color: lang === "en" ? P.bg : P.ink,
              padding: "4px 8px", cursor: "pointer", borderRadius: 12, fontFamily: "inherit",
            }}>EN</button>
          </div>
          <button style={{
            border: `1px solid ${P.ink}`,
            background: "transparent",
            color: P.ink,
            padding: "10px 22px",
            borderRadius: 999,
            cursor: "pointer",
            fontSize: 13,
            fontWeight: 500,
            fontFamily: "inherit",
          }}>{lang === "sk" ? "Podporiť nás" : "Support us"}</button>
        </div>
      </div>
    </header>
  );
};

// ============ HERO ============
const Hero = ({ lang, P }) => {
  const t = lang === "sk" ? {
    eyebrow: "OBČIANSKE ZDRUŽENIE · 2019",
    line1: "Pri šálke kávy",
    line2: "tvoríme",
    line3: "komunitu",
    sub: "Sme dobrovoľnícke združenie spod Hoponiky. Spájame ľudí pri rozhovoroch, kultúre a malých veciach, na ktorých záleží.",
    cta: "Podporiť nás",
    secondary: "Naše aktivity",
  } : {
    eyebrow: "NON-PROFIT ASSOCIATION · 2019",
    line1: "Over a cup of",
    line2: "coffee, we",
    line3: "build community",
    sub: "A volunteer-run association from beneath Hoponika hill. We bring people together through conversation, culture, and the small things that matter.",
    cta: "Support us",
    secondary: "Our activities",
  };

  return (
    <section id="top" style={{ position: "relative", overflow: "hidden", paddingBottom: 0 }}>
      {/* Decorative branches */}
      <div style={{ position: "absolute", left: -20, top: 80, width: 220, height: 360, opacity: 0.55, pointerEvents: "none" }}>
        <LeafBranch color={P.ink} style={{ width: "100%", height: "100%" }} />
      </div>
      <div style={{ position: "absolute", right: -10, top: 60, width: 280, height: 360, opacity: 0.7, pointerEvents: "none" }}>
        <PourIllustration color={P.ink} style={{ width: "100%", height: "100%" }} />
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "80px 40px 60px", textAlign: "center", position: "relative" }}>
        <div style={{
          fontFamily: "var(--ff-mono)", fontSize: 11, letterSpacing: "0.3em",
          color: P.inkSoft, marginBottom: 32,
        }}>
          {t.eyebrow}
        </div>

        <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
          <SteamCup color={P.ink} style={{ width: 56, height: 56 }} />
        </div>

        <h1 style={{
          fontFamily: "var(--ff-display)",
          fontWeight: "var(--fw-display)",
          fontSize: "clamp(56px, 8vw, 112px)",
          lineHeight: 0.95,
          color: P.ink,
          margin: "0 0 28px",
          letterSpacing: "-0.02em",
        }}>
          {t.line1}<br />
          {t.line2} <em style={{ color: P.accentDeep, fontStyle: "italic", fontWeight: "inherit" }}>{t.line3}</em>
        </h1>

        <p style={{
          maxWidth: 520, margin: "0 auto 36px",
          fontSize: 17, lineHeight: 1.55, color: P.inkSoft,
        }}>
          {t.sub}
        </p>

        <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
          <button style={{
            background: P.accent, color: P.ink,
            border: `1.5px solid ${P.ink}`,
            padding: "16px 32px", borderRadius: 999, cursor: "pointer",
            fontSize: 15, fontWeight: 600, fontFamily: "inherit",
            boxShadow: `4px 4px 0 ${P.ink}`,
            transition: "transform 0.15s",
          }}
          onMouseEnter={e => e.currentTarget.style.transform = "translate(-2px, -2px)"}
          onMouseLeave={e => e.currentTarget.style.transform = "translate(0,0)"}
          >{t.cta} →</button>
          <button style={{
            background: "transparent", color: P.ink,
            border: `1.5px solid ${P.ink}`,
            padding: "16px 32px", borderRadius: 999, cursor: "pointer",
            fontSize: 15, fontWeight: 500, fontFamily: "inherit",
          }}>{t.secondary}</button>
        </div>
      </div>

      {/* Stamp + visual breaker */}
      <div style={{ display: "flex", justifyContent: "center", paddingBottom: 60, position: "relative", zIndex: 2 }}>
        <Stamp lang={lang} P={P} />
      </div>
    </section>
  );
};

const Stamp = ({ lang, P }) => (
  <div style={{
    border: `1.5px solid ${P.ink}`,
    borderRadius: 14,
    padding: "18px 28px",
    background: P.bg,
    display: "flex",
    alignItems: "center",
    gap: 18,
    boxShadow: `3px 3px 0 ${P.ink}`,
    transform: "rotate(-2deg)",
  }}>
    <CupIcon size={36} color={P.ink} />
    <div style={{ textAlign: "center" }}>
      <div style={{ fontFamily: "var(--ff-mono)", fontSize: 9, letterSpacing: "0.4em", color: P.inkSoft, marginBottom: 4 }}>
        EST · 2019 · POD HOPONIKOU
      </div>
      <div style={{ fontFamily: "var(--ff-display)", fontWeight: "var(--fw-display)", fontSize: 22, color: P.ink, lineHeight: 1 }}>
        U šálky kávy
      </div>
      <div style={{ fontFamily: "var(--ff-mono)", fontSize: 9, letterSpacing: "0.3em", color: P.inkSoft, marginTop: 4 }}>
        ★ ★ ★  COMMUNITY  ★ ★ ★
      </div>
    </div>
    <BeanIcon size={28} color={P.ink} />
  </div>
);

// ============ WAVE MARQUEE ============
const WaveMarquee = ({ lang, P }) => {
  const items = lang === "sk"
    ? ["Káva pre každého", "Komunitné stretnutia", "Kultúra pod Hoponikou", "Otvorené srdcia", "Dobrovoľníctvo od 2019"]
    : ["Coffee for everyone", "Community gatherings", "Culture beneath Hoponika", "Open hearts", "Volunteering since 2019"];
  const repeated = [...items, ...items, ...items];

  return (
    <div style={{ position: "relative", margin: "20px 0 80px", overflow: "hidden" }}>
      {/* Wavy band */}
      <svg viewBox="0 0 1600 200" preserveAspectRatio="none" style={{ width: "100%", height: 200, display: "block", transform: "rotate(-2deg)", marginLeft: "-2%", width: "104%" }}>
        <defs>
          <path id="wavePath" d="M0,100 Q100,40 200,100 T400,100 T600,100 T800,100 T1000,100 T1200,100 T1400,100 T1600,100 L1600,200 L0,200 Z" />
          <clipPath id="waveClip">
            <path d="M0,100 Q100,40 200,100 T400,100 T600,100 T800,100 T1000,100 T1200,100 T1400,100 T1600,100 L1600,200 L0,200 Z" />
          </clipPath>
          <path id="waveTextPath" d="M0,80 Q100,20 200,80 T400,80 T600,80 T800,80 T1000,80 T1200,80 T1400,80 T1600,80" />
        </defs>
        <path d="M0,100 Q100,40 200,100 T400,100 T600,100 T800,100 T1000,100 T1200,100 T1400,100 T1600,100 L1600,200 L0,200 Z" fill={P.accent} />
        <path d="M0,100 Q100,40 200,100 T400,100 T600,100 T800,100 T1000,100 T1200,100 T1400,100 T1600,100" fill="none" stroke={P.ink} strokeWidth="1" opacity="0.2" />
      </svg>

      {/* Marquee text overlay */}
      <div style={{
        position: "absolute", inset: 0,
        display: "flex", alignItems: "center",
        transform: "rotate(-2deg)",
        pointerEvents: "none",
      }}>
        <div style={{
          display: "flex", gap: 48, whiteSpace: "nowrap",
          animation: "marquee 40s linear infinite",
          fontFamily: "var(--ff-display)", fontWeight: "var(--fw-display)",
          fontSize: 28, color: P.ink,
        }}>
          {repeated.map((it, i) => (
            <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 32 }}>
              <span style={{ fontStyle: i % 2 ? "italic" : "normal" }}>{it}</span>
              <BeanIcon size={22} color={P.ink} />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

// ============ ABOUT ============
const About = ({ lang, P }) => {
  const t = lang === "sk" ? {
    eyebrow: "O ZDRUŽENÍ",
    title: "Spájame ľudí",
    titleEm: "jeden rozhovor",
    titleEnd: "naraz",
    body: "Združenie U šálky kávy o Hoponike vzniklo v roku 2019 ako miesto, kde sa miestni ľudia môžu stretávať mimo bežných náhlivých dní. Veríme, že najkrajšie veci sa dejú pri šálke dobrej kávy — výmena nápadov, susedské zoznámenia, malé kultúrne podujatia.",
    body2: "Pracujeme dobrovoľnícky a financujeme sa z grantov, členských príspevkov a darov. Všetko, čo robíme, robíme s ľuďmi a pre ľudí.",
    cta: "Naša história",
  } : {
    eyebrow: "ABOUT",
    title: "Bringing people together,",
    titleEm: "one conversation",
    titleEnd: "at a time",
    body: "Founded in 2019, U šálky kávy o Hoponike is a place where locals can meet outside the rush of everyday life. We believe the best things happen over a good cup of coffee — exchanges of ideas, neighborhood introductions, small cultural events.",
    body2: "We run on volunteer power and are funded by grants, member contributions, and donations. Everything we do, we do with people and for people.",
    cta: "Our story",
  };

  return (
    <section id="O nás" style={{ background: P.bg, padding: "100px 40px", position: "relative" }}>
      <div style={{
        maxWidth: 1200, margin: "0 auto",
        display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 80, alignItems: "start",
      }}>
        <div>
          <div style={{ fontFamily: "var(--ff-mono)", fontSize: 11, letterSpacing: "0.3em", color: P.inkSoft, marginBottom: 24 }}>
            ━━ {t.eyebrow}
          </div>
          {/* Image placeholder */}
          <div style={{
            aspectRatio: "4/5", background: P.bgDeep,
            border: `1.5px solid ${P.ink}`, borderRadius: 14,
            position: "relative", overflow: "hidden",
            backgroundImage: `repeating-linear-gradient(135deg, ${P.ink}08 0 2px, transparent 2px 14px)`,
          }}>
            <div style={{ position: "absolute", inset: 14, border: `1px dashed ${P.ink}50`, borderRadius: 8, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12 }}>
              <CupIcon size={48} color={P.ink} />
              <div style={{ fontFamily: "var(--ff-mono)", fontSize: 11, letterSpacing: "0.2em", color: P.inkSoft, textAlign: "center", padding: "0 20px" }}>
                [ FOTO Z KOMUNITNÉHO STRETNUTIA ]
              </div>
            </div>
            {/* Corner stamp */}
            <div style={{ position: "absolute", bottom: 16, right: 16, background: P.accent, color: P.ink, padding: "6px 12px", borderRadius: 999, fontFamily: "var(--ff-mono)", fontSize: 10, letterSpacing: "0.2em", border: `1px solid ${P.ink}` }}>
              SINCE 2019
            </div>
          </div>
        </div>

        <div style={{ paddingTop: 40 }}>
          <h2 style={{
            fontFamily: "var(--ff-display)", fontWeight: "var(--fw-display)",
            fontSize: "clamp(40px, 5vw, 68px)",
            color: P.ink, lineHeight: 1, margin: 0, letterSpacing: "-0.02em",
          }}>
            {t.title}<br />
            <em style={{ color: P.accentDeep, fontStyle: "italic" }}>{t.titleEm}</em><br />
            {t.titleEnd}
          </h2>
          <p style={{ fontSize: 17, lineHeight: 1.6, color: P.inkSoft, marginTop: 36, maxWidth: 520 }}>
            {t.body}
          </p>
          <p style={{ fontSize: 17, lineHeight: 1.6, color: P.inkSoft, marginTop: 20, maxWidth: 520 }}>
            {t.body2}
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, marginTop: 48, maxWidth: 520 }}>
            {[
              { n: "180+", l: lang === "sk" ? "Členov" : "Members" },
              { n: "47", l: lang === "sk" ? "Podujatí" : "Events" },
              { n: "6", l: lang === "sk" ? "Rokov spolu" : "Years together" },
            ].map((s, i) => (
              <div key={i} style={{ borderTop: `1.5px solid ${P.ink}`, paddingTop: 14 }}>
                <div style={{ fontFamily: "var(--ff-display)", fontWeight: "var(--fw-display)", fontSize: 44, color: P.ink, lineHeight: 1 }}>{s.n}</div>
                <div style={{ fontFamily: "var(--ff-mono)", fontSize: 11, letterSpacing: "0.2em", color: P.inkSoft, marginTop: 6 }}>{s.l.toUpperCase()}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// ============ ACTIVITIES ============
const Activities = ({ lang, P }) => {
  const items = lang === "sk" ? [
    { title: "Literárne kruhy", desc: "Stretnutia milovníkov kníh každú druhú stredu. Prinášame autorov, čítania a živé rozhovory pri káve.", tag: "Pravidelne" },
    { title: "Susedské brigády", desc: "Spoločne udržiavame okolie Hoponiky — čistíme cesty, sadíme stromy, opravujeme lavičky.", tag: "Sezónne" },
    { title: "Hudobné večery", desc: "Akustické koncerty miestnych aj hosťujúcich umelcov v komornej atmosfére.", tag: "Mesačne" },
    { title: "Detské soboty", desc: "Tvorivé dielne pre deti od 4 rokov — pečenie, výtvarka, rozprávky pri ohni.", tag: "2× mesačne" },
  ] : [
    { title: "Reading circles", desc: "Book lovers meet every other Wednesday. We invite authors, host readings, and have lively chats over coffee.", tag: "Regular" },
    { title: "Neighborhood workdays", desc: "Together we care for Hoponika's surroundings — clearing paths, planting trees, fixing benches.", tag: "Seasonal" },
    { title: "Music nights", desc: "Acoustic concerts by local and visiting artists in an intimate atmosphere.", tag: "Monthly" },
    { title: "Kids' Saturdays", desc: "Creative workshops for kids aged 4+ — baking, art, fireside stories.", tag: "Twice monthly" },
  ];

  return (
    <section id="Aktivity" style={{ background: P.bg2, padding: "100px 40px", position: "relative", borderTop: `1px solid ${P.ink}15`, borderBottom: `1px solid ${P.ink}15` }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 60, flexWrap: "wrap", gap: 24 }}>
          <div>
            <div style={{ fontFamily: "var(--ff-mono)", fontSize: 11, letterSpacing: "0.3em", color: P.inkSoft, marginBottom: 18 }}>
              ━━ {lang === "sk" ? "ČO ROBÍME" : "WHAT WE DO"}
            </div>
            <h2 style={{
              fontFamily: "var(--ff-display)", fontWeight: "var(--fw-display)",
              fontSize: "clamp(40px, 5vw, 64px)",
              color: P.ink, lineHeight: 1, margin: 0, letterSpacing: "-0.02em", maxWidth: 700,
            }}>
              {lang === "sk" ? <>Naše <em style={{ color: P.accentDeep, fontStyle: "italic" }}>aktivity</em></> : <>Our <em style={{ color: P.accentDeep, fontStyle: "italic" }}>activities</em></>}
            </h2>
          </div>
          <a href="#" style={{ color: P.ink, fontSize: 14, fontFamily: "var(--ff-mono)", letterSpacing: "0.1em" }}>
            {lang === "sk" ? "VIDIEŤ VŠETKY →" : "VIEW ALL →"}
          </a>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24 }}>
          {items.map((it, i) => (
            <div key={i} style={{
              background: P.bg,
              border: `1.5px solid ${P.ink}`,
              borderRadius: 18,
              padding: "32px 32px 28px",
              position: "relative",
              boxShadow: `4px 4px 0 ${P.ink}`,
              transition: "transform 0.2s",
            }}
            onMouseEnter={e => e.currentTarget.style.transform = "translate(-2px, -2px)"}
            onMouseLeave={e => e.currentTarget.style.transform = "translate(0, 0)"}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
                <div style={{ fontFamily: "var(--ff-display)", fontWeight: "var(--fw-display)", fontSize: 64, color: P.accentDeep, lineHeight: 0.8, fontStyle: "italic" }}>
                  0{i + 1}
                </div>
                <div style={{ background: P.accentSoft, color: P.ink, padding: "5px 12px", borderRadius: 999, fontFamily: "var(--ff-mono)", fontSize: 10, letterSpacing: "0.2em", border: `1px solid ${P.ink}` }}>
                  {it.tag.toUpperCase()}
                </div>
              </div>
              <h3 style={{
                fontFamily: "var(--ff-display)", fontWeight: "var(--fw-display)",
                fontSize: 30, color: P.ink, margin: "0 0 12px", letterSpacing: "-0.01em",
              }}>{it.title}</h3>
              <p style={{ fontSize: 15.5, lineHeight: 1.55, color: P.inkSoft, margin: 0 }}>{it.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============ EVENTS ============
const Events = ({ lang, P }) => {
  const events = lang === "sk" ? [
    { d: "12", m: "MÁJ", title: "Čítanie: Mária Modrovich", time: "19:00", place: "Klubovňa, Hlavná 12", tag: "Literatúra" },
    { d: "21", m: "MÁJ", title: "Susedská brigáda — chodník k prameňu", time: "9:00", place: "Pri kostole", tag: "Brigáda" },
    { d: "29", m: "MÁJ", title: "Akustický večer: Trio Borovica", time: "20:00", place: "Záhrada U šálky", tag: "Hudba" },
    { d: "07", m: "JÚN", title: "Detská sobota: Pečenie chleba", time: "10:00", place: "Klubovňa", tag: "Deti" },
  ] : [
    { d: "12", m: "MAY", title: "Reading: Mária Modrovich", time: "19:00", place: "Clubroom, Hlavná 12", tag: "Literature" },
    { d: "21", m: "MAY", title: "Workday — path to the spring", time: "9:00", place: "By the church", tag: "Workday" },
    { d: "29", m: "MAY", title: "Acoustic night: Trio Borovica", time: "20:00", place: "Garden U šálky", tag: "Music" },
    { d: "07", m: "JUN", title: "Kids' Saturday: Baking bread", time: "10:00", place: "Clubroom", tag: "Kids" },
  ];

  return (
    <section id="Udalosti" style={{ padding: "100px 40px", background: P.bg }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ marginBottom: 48 }}>
          <div style={{ fontFamily: "var(--ff-mono)", fontSize: 11, letterSpacing: "0.3em", color: P.inkSoft, marginBottom: 18 }}>
            ━━ {lang === "sk" ? "KALENDÁR" : "CALENDAR"}
          </div>
          <h2 style={{
            fontFamily: "var(--ff-display)", fontWeight: "var(--fw-display)",
            fontSize: "clamp(40px, 5vw, 64px)",
            color: P.ink, lineHeight: 1, margin: 0, letterSpacing: "-0.02em",
          }}>
            {lang === "sk" ? <>Najbližšie <em style={{ color: P.accentDeep, fontStyle: "italic" }}>udalosti</em></> : <>Upcoming <em style={{ color: P.accentDeep, fontStyle: "italic" }}>events</em></>}
          </h2>
        </div>

        <div style={{ border: `1.5px solid ${P.ink}`, borderRadius: 18, overflow: "hidden", background: P.bg2 }}>
          {events.map((e, i) => (
            <div key={i} style={{
              display: "grid",
              gridTemplateColumns: "120px 1fr auto auto",
              gap: 32,
              alignItems: "center",
              padding: "28px 32px",
              borderBottom: i < events.length - 1 ? `1px solid ${P.ink}25` : "none",
              transition: "background 0.2s",
              cursor: "pointer",
            }}
            onMouseEnter={e => e.currentTarget.style.background = P.bgDeep}
            onMouseLeave={e => e.currentTarget.style.background = "transparent"}
            >
              <div style={{ borderRight: `1px solid ${P.ink}25`, paddingRight: 24 }}>
                <div style={{ fontFamily: "var(--ff-display)", fontWeight: "var(--fw-display)", fontSize: 56, color: P.ink, lineHeight: 0.9 }}>{e.d}</div>
                <div style={{ fontFamily: "var(--ff-mono)", fontSize: 11, letterSpacing: "0.3em", color: P.inkSoft, marginTop: 4 }}>{e.m}</div>
              </div>
              <div>
                <div style={{ fontFamily: "var(--ff-mono)", fontSize: 10, letterSpacing: "0.25em", color: P.accentDeep, marginBottom: 6 }}>
                  {e.tag.toUpperCase()}
                </div>
                <div style={{ fontFamily: "var(--ff-display)", fontWeight: "var(--fw-display)", fontSize: 26, color: P.ink, lineHeight: 1.1, letterSpacing: "-0.01em" }}>{e.title}</div>
              </div>
              <div style={{ fontSize: 14, color: P.inkSoft, textAlign: "right" }}>
                <div style={{ fontFamily: "var(--ff-mono)", fontSize: 13, color: P.ink, marginBottom: 4 }}>{e.time}</div>
                <div>{e.place}</div>
              </div>
              <div style={{
                width: 44, height: 44, borderRadius: 999,
                border: `1.5px solid ${P.ink}`, background: P.bg,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 18, color: P.ink,
              }}>→</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============ GALLERY ============
const Gallery = ({ lang, P }) => {
  const captions = lang === "sk" ? [
    "Literárny večer · marec 2025",
    "Brigáda pri prameni · apríl 2025",
    "Hudobný večer · Trio Borovica",
    "Detská sobota · pečenie",
    "Susedské raňajky",
    "Výročie 5 rokov združenia",
  ] : [
    "Literary night · March 2025",
    "Spring workday · April 2025",
    "Music night · Trio Borovica",
    "Kids' Saturday · baking",
    "Neighborhood breakfast",
    "5-year anniversary",
  ];

  return (
    <section id="Galéria" style={{ padding: "100px 40px", background: P.bg2, borderTop: `1px solid ${P.ink}15` }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 48, flexWrap: "wrap", gap: 24 }}>
          <div>
            <div style={{ fontFamily: "var(--ff-mono)", fontSize: 11, letterSpacing: "0.3em", color: P.inkSoft, marginBottom: 18 }}>
              ━━ {lang === "sk" ? "GALÉRIA" : "GALLERY"}
            </div>
            <h2 style={{
              fontFamily: "var(--ff-display)", fontWeight: "var(--fw-display)",
              fontSize: "clamp(40px, 5vw, 64px)",
              color: P.ink, lineHeight: 1, margin: 0, letterSpacing: "-0.02em",
            }}>
              {lang === "sk" ? <>Spomienky pri <em style={{ color: P.accentDeep, fontStyle: "italic" }}>káve</em></> : <>Memories over <em style={{ color: P.accentDeep, fontStyle: "italic" }}>coffee</em></>}
            </h2>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr", gridTemplateRows: "260px 260px", gap: 16 }}>
          {captions.map((c, i) => {
            const layouts = [
              { gridColumn: "1 / 2", gridRow: "1 / 3" },
              { gridColumn: "2 / 3", gridRow: "1 / 2" },
              { gridColumn: "3 / 4", gridRow: "1 / 2" },
              { gridColumn: "2 / 3", gridRow: "2 / 3" },
              { gridColumn: "3 / 4", gridRow: "2 / 3" },
            ];
            if (i >= layouts.length) return null;
            return (
              <div key={i} style={{
                ...layouts[i],
                background: i % 2 ? P.bgDeep : P.accentSoft + "60",
                border: `1.5px solid ${P.ink}`,
                borderRadius: 14,
                position: "relative",
                overflow: "hidden",
                backgroundImage: `repeating-linear-gradient(${i * 30}deg, ${P.ink}10 0 2px, transparent 2px 16px)`,
              }}>
                <div style={{ position: "absolute", inset: 14, border: `1px dashed ${P.ink}40`, borderRadius: 8 }} />
                <div style={{
                  position: "absolute", bottom: 16, left: 16, right: 16,
                  fontFamily: "var(--ff-mono)", fontSize: 11, color: P.ink,
                  background: P.bg + "DD", padding: "8px 12px", borderRadius: 999,
                  textAlign: "center", letterSpacing: "0.05em",
                }}>
                  {c}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// ============ TEAM ============
const Team = ({ lang, P }) => {
  const team = lang === "sk" ? [
    { name: "Zuzana Hrubá", role: "Predsedníčka", since: "od 2019", note: "Zakladateľka, zodpovedá za víziu a partnerov." },
    { name: "Marek Polák", role: "Podpredseda", since: "od 2020", note: "Stará sa o brigády a údržbu okolia." },
    { name: "Eva Kollárová", role: "Pokladníčka", since: "od 2021", note: "Granty, financie, výročné správy." },
    { name: "Ján Sloboda", role: "Kultúrny program", since: "od 2022", note: "Hudobné a literárne večery." },
  ] : [
    { name: "Zuzana Hrubá", role: "Chairperson", since: "since 2019", note: "Founder, leads the vision and partnerships." },
    { name: "Marek Polák", role: "Vice-chair", since: "since 2020", note: "Runs workdays and outdoor maintenance." },
    { name: "Eva Kollárová", role: "Treasurer", since: "since 2021", note: "Grants, finance, annual reports." },
    { name: "Ján Sloboda", role: "Cultural program", since: "since 2022", note: "Music and literary nights." },
  ];

  return (
    <section id="Tím" style={{ padding: "100px 40px", background: P.bg }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ marginBottom: 56 }}>
          <div style={{ fontFamily: "var(--ff-mono)", fontSize: 11, letterSpacing: "0.3em", color: P.inkSoft, marginBottom: 18 }}>
            ━━ {lang === "sk" ? "ĽUDIA" : "PEOPLE"}
          </div>
          <h2 style={{
            fontFamily: "var(--ff-display)", fontWeight: "var(--fw-display)",
            fontSize: "clamp(40px, 5vw, 64px)",
            color: P.ink, lineHeight: 1, margin: 0, letterSpacing: "-0.02em",
          }}>
            {lang === "sk" ? <>Tím za <em style={{ color: P.accentDeep, fontStyle: "italic" }}>šálkou</em></> : <>The team behind <em style={{ color: P.accentDeep, fontStyle: "italic" }}>the cup</em></>}
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
          {team.map((p, i) => (
            <div key={i} style={{
              border: `1.5px solid ${P.ink}`, borderRadius: 14, overflow: "hidden",
              background: P.bg2,
            }}>
              <div style={{
                aspectRatio: "1/1.1", background: P.bgDeep,
                backgroundImage: `repeating-linear-gradient(${i * 45}deg, ${P.ink}12 0 2px, transparent 2px 12px)`,
                position: "relative",
                borderBottom: `1.5px solid ${P.ink}`,
              }}>
                <div style={{ position: "absolute", inset: 12, border: `1px dashed ${P.ink}40`, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <div style={{
                    width: 70, height: 70, borderRadius: 999,
                    background: P.accentSoft, border: `1.5px solid ${P.ink}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontFamily: "var(--ff-display)", fontWeight: "var(--fw-display)", fontSize: 28, color: P.ink,
                  }}>
                    {p.name.split(" ").map(n => n[0]).join("")}
                  </div>
                </div>
                <div style={{ position: "absolute", top: 12, right: 12, fontFamily: "var(--ff-mono)", fontSize: 9, letterSpacing: "0.2em", color: P.inkSoft, background: P.bg, padding: "4px 8px", borderRadius: 999, border: `1px solid ${P.ink}30` }}>
                  {p.since.toUpperCase()}
                </div>
              </div>
              <div style={{ padding: "20px 18px" }}>
                <div style={{ fontFamily: "var(--ff-mono)", fontSize: 10, letterSpacing: "0.25em", color: P.accentDeep, marginBottom: 6 }}>
                  {p.role.toUpperCase()}
                </div>
                <div style={{ fontFamily: "var(--ff-display)", fontWeight: "var(--fw-display)", fontSize: 22, color: P.ink, marginBottom: 8, letterSpacing: "-0.01em" }}>
                  {p.name}
                </div>
                <div style={{ fontSize: 13, lineHeight: 1.5, color: P.inkSoft }}>{p.note}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============ BLOG ============
const Blog = ({ lang, P }) => {
  const posts = lang === "sk" ? [
    { date: "28. APR 2026", cat: "Reportáž", title: "Ako sme sadili pri prameni — fotky a postrehy", read: "5 min" },
    { date: "12. APR 2026", cat: "Rozhovor", title: "S Máriou Modrovich o čítaní v malých obciach", read: "8 min" },
    { date: "29. MAR 2026", cat: "Z denníka", title: "Tri roky detských sobôt — čo sa naučili deti aj my", read: "6 min" },
  ] : [
    { date: "APR 28, 2026", cat: "Report", title: "Planting by the spring — photos & notes", read: "5 min" },
    { date: "APR 12, 2026", cat: "Interview", title: "Mária Modrovich on reading in small villages", read: "8 min" },
    { date: "MAR 29, 2026", cat: "Diary", title: "Three years of kids' Saturdays — what we all learned", read: "6 min" },
  ];

  return (
    <section id="Blog" style={{ padding: "100px 40px", background: P.bg2, borderTop: `1px solid ${P.ink}15` }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 48, flexWrap: "wrap", gap: 24 }}>
          <div>
            <div style={{ fontFamily: "var(--ff-mono)", fontSize: 11, letterSpacing: "0.3em", color: P.inkSoft, marginBottom: 18 }}>
              ━━ {lang === "sk" ? "DENNÍK" : "JOURNAL"}
            </div>
            <h2 style={{
              fontFamily: "var(--ff-display)", fontWeight: "var(--fw-display)",
              fontSize: "clamp(40px, 5vw, 64px)",
              color: P.ink, lineHeight: 1, margin: 0, letterSpacing: "-0.02em",
            }}>
              {lang === "sk" ? <>Z nášho <em style={{ color: P.accentDeep, fontStyle: "italic" }}>denníka</em></> : <>From our <em style={{ color: P.accentDeep, fontStyle: "italic" }}>journal</em></>}
            </h2>
          </div>
          <a href="#" style={{ color: P.ink, fontSize: 14, fontFamily: "var(--ff-mono)", letterSpacing: "0.1em" }}>
            {lang === "sk" ? "VŠETKY ČLÁNKY →" : "ALL POSTS →"}
          </a>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          {posts.map((p, i) => (
            <article key={i} style={{
              background: P.bg,
              border: `1.5px solid ${P.ink}`,
              borderRadius: 14,
              overflow: "hidden",
              cursor: "pointer",
              transition: "transform 0.2s",
            }}
            onMouseEnter={e => e.currentTarget.style.transform = "translateY(-4px)"}
            onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
            >
              <div style={{
                aspectRatio: "16/10", background: P.bgDeep,
                backgroundImage: `repeating-linear-gradient(${45 + i * 40}deg, ${P.ink}10 0 2px, transparent 2px 14px)`,
                borderBottom: `1.5px solid ${P.ink}`, position: "relative",
              }}>
                <div style={{ position: "absolute", top: 14, left: 14, background: P.bg, color: P.ink, padding: "5px 12px", borderRadius: 999, fontFamily: "var(--ff-mono)", fontSize: 10, letterSpacing: "0.2em", border: `1px solid ${P.ink}` }}>
                  {p.cat.toUpperCase()}
                </div>
              </div>
              <div style={{ padding: "22px 24px 26px" }}>
                <div style={{ fontFamily: "var(--ff-mono)", fontSize: 10, letterSpacing: "0.2em", color: P.inkSoft, marginBottom: 12 }}>
                  {p.date} · {p.read}
                </div>
                <h3 style={{
                  fontFamily: "var(--ff-display)", fontWeight: "var(--fw-display)",
                  fontSize: 24, color: P.ink, margin: 0, lineHeight: 1.2, letterSpacing: "-0.01em",
                }}>{p.title}</h3>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============ SUPPORT CTA ============
const Support = ({ lang, P }) => {
  const t = lang === "sk" ? {
    eyebrow: "PODPORA",
    title: "Pridajte sa",
    titleEm: "k nám",
    body: "Sme dobrovoľnícke združenie a každá pomoc nám robí radosť — od 2 % z dane, cez jednorazový dar, až po členstvo či dobrovoľnícky čas.",
    options: [
      { t: "2 % z dane", d: "Tlačivo a údaje na stiahnutie. Termín: 30. apríl.", a: "Stiahnuť tlačivo" },
      { t: "Pravidelný dar", d: "Mesačne 5 €, 10 €, alebo ľubovoľnou sumou.", a: "Nastaviť trvalý príkaz" },
      { t: "Dobrovoľníctvo", d: "Príďte na brigády alebo nám pomôžte s podujatiami.", a: "Napíšte nám" },
    ],
  } : {
    eyebrow: "SUPPORT",
    title: "Join us",
    titleEm: "with us",
    body: "We're a volunteer association and every kind of help makes us happy — from 2% tax donations, to one-time gifts, to membership or volunteer hours.",
    options: [
      { t: "2% tax donation", d: "Form and bank info available. Deadline: April 30.", a: "Download form" },
      { t: "Recurring gift", d: "Monthly €5, €10, or any amount you choose.", a: "Set up standing order" },
      { t: "Volunteer", d: "Come to workdays or help with our events.", a: "Get in touch" },
    ],
  };

  return (
    <section id="Podporiť" style={{ padding: "100px 40px", background: P.ink, color: P.bg, position: "relative", overflow: "hidden" }}>
      {/* decorative leaves */}
      <div style={{ position: "absolute", left: -40, top: 40, width: 200, height: 320, opacity: 0.25, pointerEvents: "none" }}>
        <LeafBranch color={P.accent} style={{ width: "100%", height: "100%" }} />
      </div>
      <div style={{ position: "absolute", right: -40, bottom: 40, width: 220, height: 300, opacity: 0.2, pointerEvents: "none", transform: "scaleX(-1)" }}>
        <LeafBranch color={P.accent} style={{ width: "100%", height: "100%" }} />
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", textAlign: "center", position: "relative" }}>
        <div style={{ fontFamily: "var(--ff-mono)", fontSize: 11, letterSpacing: "0.3em", color: P.accentSoft, marginBottom: 24 }}>
          ━━ {t.eyebrow} ━━
        </div>
        <h2 style={{
          fontFamily: "var(--ff-display)", fontWeight: "var(--fw-display)",
          fontSize: "clamp(48px, 6vw, 88px)",
          color: P.bg, lineHeight: 0.95, margin: "0 0 24px", letterSpacing: "-0.02em",
        }}>
          {t.title} <em style={{ color: P.accent, fontStyle: "italic" }}>{t.titleEm}</em>
        </h2>
        <p style={{ fontSize: 17, lineHeight: 1.6, color: P.bg + "CC", maxWidth: 580, margin: "0 auto 56px" }}>
          {t.body}
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {t.options.map((o, i) => (
            <div key={i} style={{
              background: P.bg, color: P.ink,
              border: `1.5px solid ${P.bg}`,
              borderRadius: 18, padding: "32px 26px",
              textAlign: "left",
              boxShadow: `4px 4px 0 ${P.accent}`,
            }}>
              <div style={{ fontFamily: "var(--ff-display)", fontWeight: "var(--fw-display)", fontStyle: "italic", fontSize: 32, color: P.accentDeep, lineHeight: 1, marginBottom: 14 }}>
                0{i + 1}
              </div>
              <h3 style={{ fontFamily: "var(--ff-display)", fontWeight: "var(--fw-display)", fontSize: 24, color: P.ink, margin: "0 0 10px", letterSpacing: "-0.01em" }}>
                {o.t}
              </h3>
              <p style={{ fontSize: 14.5, lineHeight: 1.55, color: P.inkSoft, margin: "0 0 24px" }}>{o.d}</p>
              <button style={{
                background: P.accent, color: P.ink,
                border: `1.5px solid ${P.ink}`,
                padding: "10px 18px", borderRadius: 999, cursor: "pointer",
                fontSize: 13, fontWeight: 600, fontFamily: "inherit", width: "100%",
              }}>{o.a} →</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============ FOOTER ============
const Footer = ({ lang, P }) => {
  const t = lang === "sk" ? {
    cols: [
      { h: "Združenie", links: ["O nás", "Tím", "Stanovy", "Výročné správy"] },
      { h: "Aktivity", links: ["Literárne kruhy", "Brigády", "Hudba", "Detské soboty"] },
      { h: "Pomoc", links: ["2 % z dane", "Pravidelný dar", "Členstvo", "Dobrovoľníctvo"] },
    ],
    nl: "Newsletter raz mesačne, žiadny spam.",
    nlcta: "Prihlásiť",
    addr: "U šálky kávy o Hoponike, o.z.\nHlavná 12, 962 12 Detva\nIČO: 52 348 119",
    bottom: "© 2019 – 2026 · Vyrobené s láskou pod Hoponikou",
  } : {
    cols: [
      { h: "Association", links: ["About", "Team", "Statutes", "Annual reports"] },
      { h: "Activities", links: ["Reading circles", "Workdays", "Music", "Kids' Saturdays"] },
      { h: "Help", links: ["2% tax", "Recurring gift", "Membership", "Volunteer"] },
    ],
    nl: "Newsletter once a month, no spam.",
    nlcta: "Subscribe",
    addr: "U šálky kávy o Hoponike, n.p.o.\nHlavná 12, 962 12 Detva\nReg. No.: 52 348 119",
    bottom: "© 2019 – 2026 · Made with love beneath Hoponika",
  };

  return (
    <footer id="Kontakt" style={{ background: P.bg, padding: "80px 40px 32px", borderTop: `1.5px solid ${P.ink}` }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 1fr 1.2fr", gap: 40, marginBottom: 64 }}>
          <div>
            <div style={{ fontFamily: "var(--ff-display)", fontWeight: "var(--fw-display)", fontSize: 28, color: P.ink, lineHeight: 1, letterSpacing: "-0.01em" }}>
              U šálky <em style={{ color: P.accent, fontStyle: "italic" }}>kávy</em>
            </div>
            <div style={{ fontSize: 11, fontFamily: "var(--ff-mono)", color: P.inkSoft, letterSpacing: "0.3em", marginTop: 6, marginBottom: 24 }}>
              O · H O P O N I K E
            </div>
            <div style={{ fontSize: 14, lineHeight: 1.6, color: P.inkSoft, whiteSpace: "pre-line" }}>{t.addr}</div>
          </div>

          {t.cols.map((c, i) => (
            <div key={i}>
              <div style={{ fontFamily: "var(--ff-mono)", fontSize: 11, letterSpacing: "0.25em", color: P.ink, marginBottom: 18 }}>
                {c.h.toUpperCase()}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {c.links.map(l => (
                  <a key={l} href="#" style={{ color: P.inkSoft, textDecoration: "none", fontSize: 14 }}>{l}</a>
                ))}
              </div>
            </div>
          ))}

          <div>
            <div style={{ fontFamily: "var(--ff-mono)", fontSize: 11, letterSpacing: "0.25em", color: P.ink, marginBottom: 18 }}>
              NEWSLETTER
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.5, color: P.inkSoft, margin: "0 0 16px" }}>{t.nl}</p>
            <div style={{ display: "flex", gap: 8 }}>
              <input placeholder="vas@email.sk" style={{
                flex: 1, background: P.bg2, border: `1.5px solid ${P.ink}`,
                borderRadius: 999, padding: "10px 16px",
                fontFamily: "inherit", fontSize: 13, color: P.ink, outline: "none",
              }} />
              <button style={{
                background: P.accent, color: P.ink, border: `1.5px solid ${P.ink}`,
                borderRadius: 999, padding: "10px 18px", cursor: "pointer",
                fontFamily: "inherit", fontSize: 13, fontWeight: 600,
              }}>{t.nlcta}</button>
            </div>
          </div>
        </div>

        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          paddingTop: 28, borderTop: `1px solid ${P.ink}25`,
          fontFamily: "var(--ff-mono)", fontSize: 11, letterSpacing: "0.15em", color: P.inkSoft,
          flexWrap: "wrap", gap: 16,
        }}>
          <div>{t.bottom}</div>
          <div style={{ display: "flex", gap: 18 }}>
            <a href="#" style={{ color: P.inkSoft }}>INSTAGRAM</a>
            <a href="#" style={{ color: P.inkSoft }}>FACEBOOK</a>
            <a href="#" style={{ color: P.inkSoft }}>YOUTUBE</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// ============ TWEAKS UI ============
const TweaksUI = ({ tweaks, setTweak }) => (
  <TweaksPanel title="Tweaks" defaultPos={{ right: 24, bottom: 24 }}>
    <TweakSection title="Paleta">
      <TweakColor
        label="Téma"
        value={tweaks.palette}
        onChange={v => setTweak("palette", v)}
        options={[
          ["#F5EFE0", "#1F3A2E", "#E8A23C"],
          ["#EFE6D2", "#102820", "#D98E2B"],
          ["#F2EADA", "#2B1F12", "#C8632B"],
          ["#EEEBDB", "#1B342A", "#D4A24C"],
        ]}
      />
      <div style={{ display: "flex", gap: 6, marginTop: 8, fontSize: 11, opacity: 0.7 }}>
        {Object.keys(PALETTES).map(k => (
          <span key={k} style={{ flex: 1, textAlign: "center" }}>{k}</span>
        ))}
      </div>
    </TweakSection>
    <TweakSection title="Typografia">
      <TweakSelect
        label="Font pairing"
        value={tweaks.fontPair}
        onChange={v => setTweak("fontPair", v)}
        options={Object.entries(FONT_PAIRS).map(([k, v]) => ({ value: k, label: v.label }))}
      />
    </TweakSection>
  </TweaksPanel>
);

// Map color array back to palette name
const colorToPalette = (arr) => {
  const map = {
    "#F5EFE0,#1F3A2E,#E8A23C": "cream",
    "#EFE6D2,#102820,#D98E2B": "forest",
    "#F2EADA,#2B1F12,#C8632B": "dusk",
    "#EEEBDB,#1B342A,#D4A24C": "sage",
  };
  if (Array.isArray(arr)) return map[arr.join(",")] || "cream";
  return arr;
};

// ============ APP ============
const App = () => {
  const tw = useTweaks(TWEAK_DEFAULTS);
  const tweaks = tw.tweaks;
  const setTweak = tw.setTweak;

  const paletteKey = colorToPalette(tweaks.palette);
  const P = PALETTES[paletteKey] || PALETTES.cream;
  const F = FONT_PAIRS[tweaks.fontPair] || FONT_PAIRS["serif-sans"];
  const [lang, setLang] = useState("sk");

  useEffect(() => {
    document.body.style.background = P.bg;
    document.documentElement.style.setProperty("--ff-display", F.display);
    document.documentElement.style.setProperty("--ff-body", F.body);
    document.documentElement.style.setProperty("--ff-mono", F.mono);
    document.documentElement.style.setProperty("--fw-display", F.displayWeight);
  }, [P, F]);

  return (
    <div style={{
      fontFamily: F.body,
      color: P.ink,
      background: P.bg,
      minHeight: "100vh",
    }}>
      <TopNav lang={lang} setLang={setLang} P={P} />
      <Hero lang={lang} P={P} />
      <WaveMarquee lang={lang} P={P} />
      <About lang={lang} P={P} />
      <Activities lang={lang} P={P} />
      <Events lang={lang} P={P} />
      <Gallery lang={lang} P={P} />
      <Team lang={lang} P={P} />
      <Blog lang={lang} P={P} />
      <Support lang={lang} P={P} />
      <Footer lang={lang} P={P} />
      <TweaksUI tweaks={tweaks} setTweak={setTweak} />
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
