# Nakshatra Names

A web app for discovering Vedic birth star names rooted in real astronomical calculation.

## What it does

Enter your birth date, time, and location. The app calculates the exact position of the Moon at your moment of birth using the Chapront lunar theory, applies the Lahiri ayanamsha to convert to sidereal coordinates, and maps the result to one of the 27 nakshatras in the Vedic tradition. It then generates culturally accurate Sanskrit name suggestions based on the sacred syllables of your birth star's pada.

## Features

- Accurate lunar position calculation using the Chapront lunar theory
- Lahiri ayanamsha conversion, the official standard adopted by the Government of India in 1955
- All 27 nakshatras with deity, ruling planet, quality, and pada syllables
- Timezone-aware birth time handling
- AI-generated Sanskrit name suggestions with meanings
- Step by step birth detail input
- The science page explaining the methodology and sources
- Ask a question form for user inquiries

## Tech stack

- React
- Vercel serverless functions
- Mistral AI API for name generation
- Formspree for question submissions

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file in the root directory and add your Mistral API key:
   ```
   MISTRAL_API_KEY=your_actual_api_key_here
   ```
   Get your API key from [Mistral Console](https://console.mistral.ai/api-keys).

3. Run locally with Vercel CLI:
   ```bash
   vercel dev
   ```

## Methodology

The Moon's ecliptic longitude is calculated using truncated Chapront ELP2000 terms, accurate to within 1 arcminute. The Lahiri ayanamsha is applied to convert from tropical to sidereal longitude. The resulting sidereal longitude is divided into 27 equal segments of 13 degrees 20 minutes to determine the nakshatra, and further into 4 padas of 3 degrees 20 minutes each.

## Sources

- Brihat Parashara Hora Shastra
- Government of India Lahiri Ayanamsha adoption (1955)
- Chapront Lunar Theory (1988)
- Indian Ephemeris and Nautical Almanac

## Live

nakshatra-names.vercel.app
