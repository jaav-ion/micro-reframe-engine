// src/api.js
import axios from 'axios';

const openaiKey = process.env.REACT_APP_OPENAI_API_KEY;

export const getReframe = async (situation, loudestThought, wishToHear) => {
  const prompt = `
You are a compassionate, neuroscience-savvy mental health coach.

Given the following:
- Situation: ${situation}
- Loudest Thought: ${loudestThought}
- What they wish someone would say: ${wishToHear}

Please return:
1. A compassionate, neuroscience-based reframe (1–2 sentences)
2. One grounding cue (e.g., breath, body scan, or sensory cue)
3. One micro-action the user can take today to regain agency

Respond in this format:
Reframe:
Grounding Cue:
Micro-Action:
  `;

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${openaiKey}`
        }
      }
    );

    const reply = response.data.choices[0].message.content.trim();
    return reply;
  } catch (err) {
    console.error('OpenAI API error:', err);
    return 'Something went wrong. Try again.';
  }
};
