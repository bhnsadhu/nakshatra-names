module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!process.env.MISTRAL_API_KEY) {
    console.error('MISTRAL_API_KEY is not configured');
    return res.status(500).json({ error: 'API key not configured' });
  }

  try {
    const { nakshatra, gender } = req.body;

    if (!nakshatra || !nakshatra.name || !gender) {
      return res.status(400).json({ error: 'Missing required fields: nakshatra and gender' });
    }

    const genderText = gender === 'any' ? 'both boys and girls (mix)' : `${gender}s`;
    const prompt = `You are an expert in Sanskrit names and Vedic tradition. A baby is born under nakshatra ${nakshatra.name}, ruled by ${nakshatra.planet}, deity ${nakshatra.deity}. Quality: ${nakshatra.quality}. Sacred syllables: ${nakshatra.syllables.join(', ')}.

Generate exactly 8 beautiful Sanskrit/Indian names for ${genderText}. Each must start with one of the syllables. Use a variety of syllables.

Respond ONLY with a JSON array, no markdown, no preamble:
[{"name":"...","meaning":"...","syllable":"...","gender":"boy/girl/neutral"},...]

Make meanings poetic and accurate. Names should feel timeless.`;

    const apiRes = await fetch('https://api.mistral.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.MISTRAL_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'mistral-small-latest',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 1000
      })
    });

    if (!apiRes.ok) {
      throw new Error(`Mistral API error: ${apiRes.status}`);
    }

    const data = await apiRes.json();
    const text = data.choices[0].message.content;
    const clean = text.replace(/```json|```/g, '').trim();
    const names = JSON.parse(clean);

    return res.status(200).json({ names });
  } catch (error) {
    console.error('Error generating names:', error);
    return res.status(500).json({
      error: 'Failed to generate names',
      message: error.message
    });
  }
};
