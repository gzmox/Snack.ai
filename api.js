const { OpenAI } = require("openai");

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { goal, allergies, snacks } = req.body;

    const prompt = `
Suggest ${snacks} snack ideas for someone who wants a ${goal} diet.
Avoid: ${allergies}. Keep it concise and bulleted.
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 300,
      temperature: 0.5
    });

    res.status(200).json({ result: completion.choices[0].message.content });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to generate snacks." });
  }
};
