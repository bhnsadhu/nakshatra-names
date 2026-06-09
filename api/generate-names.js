const { GoogleGenerativeAI } = require('@google/generative-ai');

module.exports = async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Validate API key is configured
  if (!process.env.GEMINI_API_KEY) {
    console.error('GEMINI_API_KEY is not configured');
    return res.status(500).json({ error: 'API key not configured' });
  }

  try {
    const { nakshatra, gender } = req.body;

    // Validate input
    if (!nakshatra || !nakshatra.name || !gender) {
      return res.status(400).json({ error: 'Missing required fields: nakshatra and gender' });
    }

    const genderText = gender === 'any' ? 'both boys and girls (mix)' : `${gender}s`;
    const prompt = `You are an expert in Sanskrit names and Vedic tradition. A baby is born under nakshatra ${nakshatra.name}, ruled by ${nakshatra.planet}, deity ${nakshatra.deity}. Quality: ${nakshatra.quality}. Sacred syllables: ${nakshatra.syllables.join(', ')}.

Generate exactly 8 beautiful Sanskrit/Indian names for ${genderText}. Each must start with one of the syllables. Use a variety of syllables.

Respond ONLY with a JSON array, no markdown, no preamble:
[{"name":"...","meaning":"...","syllable":"...","gender":"boy/girl/neutral"},...]

Make meanings poetic and accurate. Names should feel timeless.`;

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    const result = await model.generateContent(prompt);
    const text = result.response.text();
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
