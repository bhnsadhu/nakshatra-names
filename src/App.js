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
  const toDeg = r => r * 180 / Math.PI;
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
  const idx = Math.floor(siderealLon / span);
  const posInNak = siderealLon % span;
  const pada = Math.floor(posInNak / (span / 4)) + 1;
  return { nakshatra: NAKSHATRAS[idx], pada, longitude: siderealLon };
}

async function geocodeCity(city) {
  const res = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(city)}&format=json&limit=1`, {
    headers: { 'User-Agent': 'NakshatraApp/1.0' }
  });
  const data = await res.json();
  if (!data.length) throw new Error("City not found. Please try a different name.");
  return { lat: parseFloat(data[0].lat), lon: parseFloat(data[0].lon), display: data[0].display_name };
}

async function getTimezone(lat, lon) {
  const res = await fetch(`https://timeapi.io/api/timezone/coordinate?latitude=${lat}&longitude=${lon}`);
  const data = await res.json();
  return data.timeZone;
}

async function generateNames(nakshatra, gender) {
  const genderText = gender === 'any' ? 'both boys and girls (mix)' : `${gender}s`;
  const prompt = `You are an expert in Sanskrit names and Vedic tradition. A baby is born under nakshatra ${nakshatra.name}, ruled by ${nakshatra.planet}, deity ${nakshatra.deity}. Quality: ${nakshatra.quality}. Sacred syllables: ${nakshatra.syllables.join(', ')}.

Generate exactly 8 beautiful Sanskrit/Indian names for ${genderText}. Each must start with one of the syllables. Use a variety of syllables.

Respond ONLY with a JSON array, no markdown, no preamble:
[{"name":"...","meaning":"...","syllable":"...","gender":"boy/girl/neutral"},...]

Make meanings poetic and accurate. Names should feel timeless.`;

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      messages: [{ role: "user", content: prompt }]
    })
  });
  const data = await res.json();
  const text = data.content.map(i => i.text || "").join("");
  const clean = text.replace(/```json|```/g, "").trim();
  return JSON.parse(clean);
}

export default function App() {
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
      const dtStr = `${form.date}T${form.time}:00`;
      const birthDate = new Date(new Intl.DateTimeFormat('en-US', {
        timeZone: tz,
        year: 'numeric', month: '2-digit', day: '2-digit',
        hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
      }).format(new Date(dtStr)));

      const { sidereal, ayanamsa } = getMoonLongitude(new Date(dtStr));
      const { nakshatra, pada, longitude } = getNakshatraFromLon(sidereal);
      setResult({ nakshatra, pada, longitude, ayanamsa, geo, tz });
      setLoading(false);
      setLoadingNames(true);
      const nameList = await generateNames(nakshatra, form.gender);
      setNames(nameList);
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
    } catch (e) {
      setError('Could not generate names.');
    }
    setLoadingNames(false);
  };

  return (
    <div className="app">
      <div className="header">
        <h1>Nakshatra name finder</h1>
        <p>Enter birth details to find the birth star and discover names from the sacred syllables.</p>
      </div>

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
              <div className="nak-sub">{result.nakshatra.deity} · {result.nakshatra.planet}</div>
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
              {result.nakshatra.syllables.map(s => <span key={s} className="chip">{s}</span>)}
            </div>
          </div>
          <div className="moon-pos">Moon at {result.longitude.toFixed(2)}° sidereal · Lahiri ayanamsha {result.ayanamsa.toFixed(2)}° · {result.tz}</div>
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
  );
}