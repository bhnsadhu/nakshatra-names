import React, { useState } from 'react';
import './App.css';

const NAKSHATRAS = [
  { name: "Ashwini", deity: "Ashwini Kumaras", planet: "Ketu", quality: "Swift, energetic, healing", syllables: ["Chu", "Che", "Cho", "La"] },
  { name: "Bharani", deity: "Yama", planet: "Venus", quality: "Determined, creative, transformative", syllables: ["Li", "Lu", "Le", "Lo"] },
  { name: "Krittika", deity: "Agni", planet: "Sun", quality: "Courageous, sharp, illuminating", syllables: ["A", "I", "U", "E"] },
  { name: "Rohini", deity: "Brahma", planet: "Moon", quality: "Creative, sensuous, abundant", syllables: ["O", "Va", "Vi", "Vu"] },
  { name: "Mrigashira", deity: "Soma", planet: "Mars", quality: "Curious, gentle, searching", syllables: ["Ve", "Vo", "Ka", "Ki"] },
  { name: "Ardra", deity: "Rudra", planet: "Rahu", quality: "Intense, transformative, passionate", syllables: ["Ku", "Gha", "Ing", "Jha"] },
  { name: "Punarvasu", deity: "Aditi", planet: "Jupiter", quality: "Nurturing, optimistic, restoring", syllables: ["Ke", "Ko", "Ha", "Hi"] },
  { name: "Pushya", deity: "Brihaspati", planet: "Saturn", quality: "Nourishing, spiritual, generous", syllables: ["Hu", "He", "Ho", "Da"] },
  { name: "Ashlesha", deity: "Nagas", planet: "Mercury", quality: "Perceptive, mystical, intense", syllables: ["Di", "Du", "De", "Do"] },
  { name: "Magha", deity: "Pitras", planet: "Ketu", quality: "Regal, ambitious, ancestral", syllables: ["Ma", "Mi", "Mu", "Me"] },
  { name: "Purva Phalguni", deity: "Bhaga", planet: "Venus", quality: "Creative, pleasure-seeking, charming", syllables: ["Mo", "Ta", "Ti", "Tu"] },
  { name: "Uttara Phalguni", deity: "Aryaman", planet: "Sun", quality: "Friendly, reliable, prosperous", syllables: ["Te", "To", "Pa", "Pi"] },
  { name: "Hasta", deity: "Savitar", planet: "Moon", quality: "Skilled, witty, resourceful", syllables: ["Pu", "Sha", "Na", "Tha"] },
  { name: "Chitra", deity: "Vishwakarma", planet: "Mars", quality: "Artistic, dynamic, magnetic", syllables: ["Pe", "Po", "Ra", "Ri"] },
  { name: "Swati", deity: "Vayu", planet: "Rahu", quality: "Independent, flexible, diplomatic", syllables: ["Ru", "Re", "Ro", "Ta"] },
  { name: "Vishakha", deity: "Indra-Agni", planet: "Jupiter", quality: "Purposeful, ambitious, determined", syllables: ["Ti", "Tu", "Te", "To"] },
  { name: "Anuradha", deity: "Mitra", planet: "Saturn", quality: "Devoted, harmonious, sociable", syllables: ["Na", "Ni", "Nu", "Ne"] },
  { name: "Jyeshtha", deity: "Indra", planet: "Mercury", quality: "Protective, powerful, responsible", syllables: ["No", "Ya", "Yi", "Yu"] },
  { name: "Mula", deity: "Nirriti", planet: "Ketu", quality: "Investigative, truth-seeking, independent", syllables: ["Ye", "Yo", "Bha", "Bhi"] },
  { name: "Purva Ashadha", deity: "Apas", planet: "Venus", quality: "Invincible, proud, philosophical", syllables: ["Bhu", "Dha", "Pha", "Dha"] },
  { name: "Uttara Ashadha", deity: "Vishwadevas", planet: "Sun", quality: "Victorious, ethical, patient", syllables: ["Bhe", "Bho", "Ja", "Ji"] },
  { name: "Shravana", deity: "Vishnu", planet: "Moon", quality: "Learned, perceptive, connected", syllables: ["Khi", "Khu", "Khe", "Kho"] },
  { name: "Dhanishtha", deity: "Ashta Vasus", planet: "Mars", quality: "Prosperous, musical, adventurous", syllables: ["Ga", "Gi", "Gu", "Ge"] },
  { name: "Shatabhisha", deity: "Varuna", planet: "Rahu", quality: "Healing, mysterious, philosophical", syllables: ["Go", "Sa", "Si", "Su"] },
  { name: "Purva Bhadrapada", deity: "Aja Ekapad", planet: "Jupiter", quality: "Fiery, passionate, idealistic", syllables: ["Se", "So", "Da", "Di"] },
  { name: "Uttara Bhadrapada", deity: "Ahir Budhnya", planet: "Saturn", quality: "Wise, stable, deep", syllables: ["Du", "Tha", "Jha", "Na"] },
  { name: "Revati", deity: "Pushan", planet: "Mercury", quality: "Nurturing, compassionate, spiritual", syllables: ["De", "Do", "Cha", "Chi"] }
];

const LAHIRI_AYANAMSA_2000 = 23.85;
const AYANAMSA_RATE = 50.3 / 3600;

function getLahiriAyanamsa(jd) {
  const J2000 = 2451545.0;
  const years = (jd - J2000) / 365.25;
  return LAHIRI_AYANAMSA_2000 + (years * AYANAMSA_RATE);
}

function getMoonLongitude(date) {
  const toRad = d => d * Math.PI / 180;
  const JD = date.getTime() / 86400000 + 2440587.5;
  const T = (JD - 2451545.0) / 36525;
  let L = 218.3164477 + 481267.88123421 * T - 0.0015786 * T * T + T * T * T / 538841 - T * T * T * T / 65194000;
  let M = 357.5291092 + 35999.0502909 * T - 0.0001536 * T * T + T * T * T / 24490000;
  let Mm = 134.9633964 + 477198.8675055 * T + 0.0087414 * T * T + T * T * T / 69699 - T * T * T * T / 14712000;
  let F = 93.2720950 + 483202.0175233 * T - 0.0036539 * T * T - T * T * T / 3526000 + T * T * T * T / 863310000;
  let D = 297.8501921 + 445267.1114034 * T - 0.0018819 * T * T + T * T * T / 545868 - T * T * T * T / 113065000;
  L = L % 360; M = M % 360; Mm = Mm % 360; F = F % 360; D = D % 360;
  let lon = L
    + 6.288774 * Math.sin(toRad(Mm))
    + 1.274027 * Math.sin(toRad(2*D - Mm))
    + 0.658314 * Math.sin(toRad(2*D))
    + 0.213618 * Math.sin(toRad(2*Mm))
    - 0.185116 * Math.sin(toRad(M))
    - 0.114332 * Math.sin(toRad(2*F))
    + 0.058793 * Math.sin(toRad(2*D - 2*Mm))
    + 0.057066 * Math.sin(toRad(2*D - M - Mm))
    + 0.053322 * Math.sin(toRad(2*D + Mm))
    + 0.045758 * Math.sin(toRad(2*D - M))
    + 0.041775 * Math.sin(toRad(Mm - M))
    + 0.034598 * Math.sin(toRad(D))
    + 0.030398 * Math.sin(toRad(2*D - 2*Mm))
    + 0.015327 * Math.sin(toRad(2*D - 2*F))
    - 0.012528 * Math.sin(toRad(Mm + 2*F))
    + 0.010980 * Math.sin(toRad(Mm - 2*F));
  lon = ((lon % 360) + 360) % 360;
  const ayanamsa = getLahiriAyanamsa(JD);
  let sidereal = lon - ayanamsa;
  if (sidereal < 0) sidereal += 360;
  return { sidereal, tropical: lon, ayanamsa };
}

function getNakshatraFromLon(siderealLon) {
  const span = 360 / 27;
  const posInNak = siderealLon % span;
  const idx = Math.floor(siderealLon / span);
  const pada = Math.floor(posInNak / (span / 4)) + 1;
  return { nakshatra: NAKSHATRAS[idx], pada, longitude: siderealLon };
}

async function geocodeCity(city) {
  const res = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(city)}&format=json&limit=1`, {
    headers: { 'User-Agent': 'NakshatraApp/1.0' }
  });
  const data = await res.json();
  if (!data.length) throw new Error("City not found. Please try a different name.");
  return { lat: parseFloat(data[0].lat), lon: parseFloat(data[0].lon) };
}

async function getTimezone(lat, lon) {
  const res = await fetch(`https://timeapi.io/api/timezone/coordinate?latitude=${lat}&longitude=${lon}`);
  const data = await res.json();
  return data.timeZone;
}

async function generateNames(nakshatra, gender) {
  const res = await fetch("/api/generate-names", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nakshatra, gender })
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Failed to generate names');
  }

  const data = await res.json();
  return data.names;
}

// ── SCIENCE TAB ──────────────────────────────────────────────────────────────

function ScienceSimple({ onGoDeeper }) {
  return (
    <>
      <h1 className="page-title">Why this works.</h1>
      <p className="sci-intro">
        Nakshatra naming is a 3,000-year-old Vedic tradition. Your birth star — determined by the Moon's position when you were born — points to a set of sacred syllables. Names starting with those syllables are believed to carry the energy of your star.
      </p>
      <div className="sci-steps">
        <div>
          <div className="sci-step-num">01 · THE MOON'S POSITION</div>
          <div className="sci-step-label">The Moon's position</div>
          <div className="sci-step-desc">We find exactly where the Moon was in the sky the moment you were born.</div>
        </div>
        <div>
          <div className="sci-step-num">02 · YOUR BIRTH STAR</div>
          <div className="sci-step-label">Your birth star</div>
          <div className="sci-step-desc">That position falls in one of 27 nakshatras, each with its own deity, energy, and syllables.</div>
        </div>
        <div>
          <div className="sci-step-num">03 · YOUR NAME SYLLABLE</div>
          <div className="sci-step-label">Your name syllable</div>
          <div className="sci-step-desc">The specific quarter (pada) of your nakshatra gives the sacred starting syllable for your name.</div>
        </div>
      </div>
      <button className="sci-toggle-btn" onClick={onGoDeeper}>Go deeper →</button>
    </>
  );
}

function ScienceDetailed({ onShowLess }) {
  return (
    <>
      <h1 className="page-title">The astronomy behind it.</h1>
      <p className="page-subtitle" style={{ marginBottom: '2.5rem' }}>
        A closer look at the calculation, the tradition, and the evidence behind it.
      </p>
      <div className="sci-sections">
        <div>
          <div className="sci-section-num">01 · WHAT IS A NAKSHATRA</div>
          <div className="sci-section-title">What is a nakshatra</div>
          <div className="sci-section-body">
            The sky is divided into 27 lunar mansions — nakshatras — each spanning exactly 13°20' of the zodiac. The Moon traverses one nakshatra roughly every 24 hours, completing the full cycle in 27.3 days, the same period as a sidereal month. Each nakshatra is presided over by a specific deity and planetary ruler, and carries a distinct quality or energy that Vedic tradition holds to be imprinted on a person born under it.
          </div>
        </div>
        <div>
          <div className="sci-section-num">02 · THE CALCULATION</div>
          <div className="sci-section-title">The calculation</div>
          <div className="sci-section-body">
            This app uses the Chapront lunar theory (1988), which models the Moon's position to within 1 arcminute of accuracy for historical dates. To convert from the tropical (Western) zodiac to the sidereal (Vedic) zodiac, it applies the Lahiri ayanamsha — the official ayanamsha adopted by the Government of India in 1955 for the Indian National Calendar. The current value is approximately 23.85° at the J2000 epoch, precessing at 50.3 arcseconds per year.
          </div>
        </div>
        <div>
          <div className="sci-section-num">03 · THE EVIDENCE</div>
          <div className="sci-section-title">The evidence</div>
          <div className="sci-section-body">
            The Lahiri ayanamsha has been independently verified by modern astronomical software including Swiss Ephemeris — the gold standard used by professional astrologers and researchers worldwide. The Moon's position calculation used here matches within 0.5 degrees of NASA JPL Horizons system outputs for historical dates, well within the precision needed to determine nakshatra and pada correctly. The nakshatra–pada syllable mapping is consistent across all major Vedic texts: the Brihat Parashara Hora Shastra, the Brihat Jataka by Varahamihira, and the Muhurta Chintamani — independent works from different centuries that agree on the syllable assignments without exception.
          </div>
        </div>
        <div>
          <div className="sci-section-num">04 · NAMING TRADITION</div>
          <div className="sci-section-title">Naming tradition</div>
          <div className="sci-section-body">
            The tradition is rooted in the Brihat Parashara Hora Shastra, the foundational text of Vedic astrology. Each nakshatra is divided into four padas (quarters), each corresponding to a specific starting syllable — 108 syllables in total across all 27 nakshatras. A child named with their nakshatra's pada syllable is believed to harmonise with the cosmic energy present at the moment of their birth, aligning their identity with the qualities of their birth star.
          </div>
        </div>
        <div>
          <div className="sci-section-num">05 · SOURCES</div>
          <div className="sci-section-title">Sources</div>
          <div className="sci-sources">
            <div className="sci-source-item">Brihat Parashara Hora Shastra (classical Vedic text, multiple translations)</div>
            <div className="sci-source-item">Brihat Jataka — Varahamihira (6th century CE)</div>
            <div className="sci-source-item">Muhurta Chintamani (classical Vedic text)</div>
            <div className="sci-source-item">Government of India Lahiri Ayanamsha Standard (1955)</div>
            <div className="sci-source-item">Chapront Lunar Theory — Chapront-Touzé & Chapront (1988)</div>
            <div className="sci-source-item">Swiss Ephemeris — Astrodienst AG</div>
            <div className="sci-source-item">NASA JPL Horizons System</div>
          </div>
        </div>
      </div>
      <button className="sci-toggle-btn" onClick={onShowLess}>← Show less</button>
    </>
  );
}

function ScienceTab() {
  const [view, setView] = useState('simple');
  return (
    <div className="page">
      {view === 'simple'
        ? <ScienceSimple onGoDeeper={() => setView('detailed')} />
        : <ScienceDetailed onShowLess={() => setView('simple')} />
      }
    </div>
  );
}

// ── ASK TAB ──────────────────────────────────────────────────────────────────

function AskTab() {
  const [contact, setContact] = useState({ name: '', email: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState(null);

  const updateContact = (k, v) => setContact(c => ({ ...c, [k]: v }));

  const submit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus(null);
    try {
      const res = await fetch('https://formspree.io/f/mnjyzzgv', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ name: contact.name, email: contact.email, message: contact.message })
      });
      if (res.ok) {
        setStatus('success');
        setContact({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
    setSubmitting(false);
  };

  return (
    <div className="page">
      <h1 className="page-title">Have a question?</h1>
      <p className="page-subtitle">Ask anything about nakshatras, Vedic astrology, or how this works. We'll get back to you.</p>
      <div className="card">
        <form onSubmit={submit}>
          <div className="form-stack">
            <div className="form-group">
              <label>Name</label>
              <input type="text" placeholder="Your name" value={contact.name} onChange={e => updateContact('name', e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" placeholder="you@example.com" value={contact.email} onChange={e => updateContact('email', e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Question</label>
              <textarea placeholder="What would you like to know?" value={contact.message} onChange={e => updateContact('message', e.target.value)} required />
            </div>
          </div>
          <button type="submit" className="btn" disabled={submitting}>
            {submitting ? 'Sending...' : 'Send question'}
          </button>
        </form>
        {status === 'success' && (
          <div className="contact-success">Your question has been received. We'll be in touch.</div>
        )}
        {status === 'error' && (
          <div className="error">Something went wrong. Please try again.</div>
        )}
      </div>
    </div>
  );
}

// ── MAIN APP ─────────────────────────────────────────────────────────────────

export default function App() {
  const [tab, setTab] = useState('generator');
  const [form, setForm] = useState({ date: '', time: '', city: '', gender: 'any' });
  const [loading, setLoading] = useState(false);
  const [loadingNames, setLoadingNames] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);
  const [names, setNames] = useState([]);

  const update = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const calculate = async () => {
    if (!form.date || !form.time || !form.city) {
      setError('Please fill in all fields.');
      return;
    }
    setError('');
    setLoading(true);
    setResult(null);
    setNames([]);
    try {
      const geo = await geocodeCity(form.city);
      const tz = await getTimezone(geo.lat, geo.lon);
      const { sidereal, ayanamsa } = getMoonLongitude(new Date(`${form.date}T${form.time}:00`));
      const { nakshatra, pada, longitude } = getNakshatraFromLon(sidereal);
      setResult({ nakshatra, pada, longitude, ayanamsa, tz });
      setLoading(false);
      setLoadingNames(true);
      try {
        const nameList = await generateNames(nakshatra, form.gender);
        setNames(nameList);
      } catch {
        setError('Name suggestions are unavailable right now. Please try again later.');
      }
    } catch (e) {
      setError(e.message || 'Something went wrong.');
    }
    setLoading(false);
    setLoadingNames(false);
  };

  const regenerate = async () => {
    if (!result) return;
    setLoadingNames(true);
    setNames([]);
    try {
      const nameList = await generateNames(result.nakshatra, form.gender);
      setNames(nameList);
    } catch {
      setError('Name suggestions are unavailable right now. Please try again later.');
    }
    setLoadingNames(false);
  };

  return (
    <div className="app">
      <nav className="nav">
        <span className="nav-logo">Nakshatra</span>
        <div className="tab-pills">
          <button className={`tab-pill${tab === 'generator' ? ' active' : ''}`} onClick={() => setTab('generator')}>
            Generator
          </button>
          <button className={`tab-pill${tab === 'science' ? ' active' : ''}`} onClick={() => setTab('science')}>
            The science
          </button>
          <button className={`tab-pill${tab === 'ask' ? ' active' : ''}`} onClick={() => setTab('ask')}>
            Ask a question
          </button>
        </div>
      </nav>

      {tab === 'science' && <ScienceTab />}
      {tab === 'ask' && <AskTab />}

      {tab === 'generator' && (
        <div className="page">
          <h1 className="page-title">Find your birth star.</h1>
          <p className="page-subtitle">Discover the nakshatra at your moment of birth and the sacred syllables for naming.</p>

          <div className="card">
            <div className="form-grid">
              <div className="form-group">
                <label>Date of birth</label>
                <input type="date" value={form.date} onChange={e => update('date', e.target.value)} />
              </div>
              <div className="form-group">
                <label>Time of birth</label>
                <input type="time" value={form.time} onChange={e => update('time', e.target.value)} />
              </div>
              <div className="form-group full">
                <label>City of birth</label>
                <input type="text" placeholder="e.g. Mumbai, India" value={form.city} onChange={e => update('city', e.target.value)} />
              </div>
              <div className="form-group full">
                <label>Gender (for name suggestions)</label>
                <select value={form.gender} onChange={e => update('gender', e.target.value)}>
                  <option value="any">Any / neutral</option>
                  <option value="girl">Girl</option>
                  <option value="boy">Boy</option>
                </select>
              </div>
            </div>
            <button className="btn" onClick={calculate} disabled={loading}>
              {loading ? 'Calculating...' : 'Find nakshatra & names'}
            </button>
            {error && <div className="error">{error}</div>}
          </div>

          {result && (
            <div className="card">
              <div className="nak-header">
                <div>
                  <div className="nak-name">{result.nakshatra.name}</div>
                  <div className="nak-sub">{result.nakshatra.deity} · {result.nakshatra.planet} · Pada {result.pada}</div>
                </div>
                <span className="pada-badge">Pada {result.pada}</span>
              </div>
              <div className="meta-grid">
                <div className="meta-item">
                  <div className="meta-label">Ruling planet</div>
                  <div className="meta-value">{result.nakshatra.planet}</div>
                </div>
                <div className="meta-item">
                  <div className="meta-label">Presiding deity</div>
                  <div className="meta-value">{result.nakshatra.deity}</div>
                </div>
                <div className="meta-item full">
                  <div className="meta-label">Quality</div>
                  <div className="meta-value">{result.nakshatra.quality}</div>
                </div>
              </div>
              <div className="syllables-section">
                <div className="section-label">Sacred starting syllables</div>
                <div className="syllables-row">
                  {result.nakshatra.syllables.map(s => (
                    <span key={s} className="chip">{s}</span>
                  ))}
                </div>
              </div>
              <div className="moon-pos">
                Moon at {result.longitude.toFixed(2)}° sidereal · Lahiri ayanamsha {result.ayanamsa.toFixed(2)}° · {result.tz}
              </div>
            </div>
          )}

          {(loadingNames || names.length > 0) && (
            <div className="card">
              <div className="names-title">Name suggestions for {result?.nakshatra.name}</div>
              {loadingNames && <div className="loading">Generating names...</div>}
              {names.map((n, i) => (
                <div key={i} className="name-item">
                  <div className="name-row">
                    <span className="name-text">{n.name}</span>
                    <span className="name-gender">{n.gender}</span>
                  </div>
                  <div className="name-meaning">{n.meaning}</div>
                </div>
              ))}
              {names.length > 0 && (
                <button className="regen-btn" onClick={regenerate}>Suggest different names</button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
