// helper module for calling OpenAI API
// prompt, url and secretKey are placeholders and should be replaced with real values

const OPENAI_URL = 'https://api.chatanywhere.tech/v1/chat/completions';
const OPENAI_KEY = 'sk-8F2bpQVAV8sCoPSuOW2P6ZAXYYHk7xsispnjTIrSmxHWP1Fk';

/**
 * Send a text prompt to OpenAI and return the parsed response.
 * @param {string} promptText - the text to send as prompt
 * @returns {Promise<string>} the text returned by the API
 */
export async function sendToOpenAI(promptText) {
  try {
    // build moderation prompt
    const formattedPrompt = `You are a content moderation evaluator.

    Analyze a user comment and assign three sentiment proportions that sum to 100%.

    Categories:
    - Positive: friendly, supportive, approving, or empathetic tone.
    - Neutral: objective statements, factual discussion, or emotionally neutral language.
    - Negative: confrontational, accusatory, insulting, sarcastic, or aggressive tone

    Rules:
    - Positive + Neutral + Negative must equal 100.
    - Negative ≥ 70 indicates high risk of extremism.

    Output format:
    Return ONLY a JSON object:
    {"positive":X,"neutral":Y,"negative":Z}

    Do not output explanations or additional text.

    Comment:
    ${promptText}`;

    const body = {
        model: "gpt-3.5-turbo",
        messages: [
            {
            role: "user",
            content: formattedPrompt
            }
        ],
        temperature: 0.7,
      // ...other model parameters you need
    };

    const response = await fetch(OPENAI_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${OPENAI_KEY}`,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`OpenAI request failed: ${response.status} ${errorText}`);
    }

    const data = await response.json();

    if (data.choices && data.choices.length > 0) {
        const text = data.choices[0].message.content.trim();

        try {
            return JSON.parse(text); // 转成字典
        } catch (err) {
            console.warn("JSON parse failed:", text);
            return { positive: 0, neutral: 100, negative: 0 };
        }
        }

    return JSON.stringify(data);

  } catch (err) {
    console.error('Error calling OpenAI:', err);
    throw err;
  }

}
