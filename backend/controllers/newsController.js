import axios from "axios";

export const checkNews = async (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "No text provided" });
  }

  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "nvidia/nemotron-3-super-120b-a12b:free",
        messages: [
          {
            role: "system",
            content: `Return ONLY JSON, no markdown, no explanation:
{
  "result": "FAKE or REAL",
  "level": "0 to/10",
  "explanation": "supports the claim a fact ."
}`
          },
          {
            role: "user",
            content: text
          }
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': "application/json"  // ✅ fixed casing
        }
      }
    );

    const raw = response.data.choices[0].message.content;
    const cleaned = raw.replace(/```json|```/g, "").trim(); // ✅ strip markdown
    const result = JSON.parse(cleaned);

    return res.json(result);

  } catch (error) {
    console.error("💥 OpenRouter error:", error.response?.data || error.message);
    return res.status(500).json({
      error: "AI request failed",
      detail: error.response?.data || error.message  // ✅ helpful for debugging
    });
  }
};