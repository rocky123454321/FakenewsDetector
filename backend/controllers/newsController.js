import axios from "axios";

export const checkNews = async (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "No text provided" });
  }

  try {
   const  response = await axios.post(
       "https://openrouter.ai/api/v1/chat/completions",
       {
        model:"nvidia/nemotron-3-super-120b-a12b:free",
           messages: [{
            role:"system",
            content:`Return ONLY JSON:

{
  "result": "FAKE",
  "level": "9/10",
  "explanation": "No scientific evidence supports the claim.",

}`   
           }, {
            role:"user",
            content:text
           }
        ]
       }, {
           headers: {
               Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
               'content-Type': "Application/json"
           }
       }
   )

   const result = JSON.parse(response.data.choices[0].message.content);

   return res.json(result);

  } catch (error) {
    console.error(error.response?.data || error.message);

    return res.status(500).json({
      error: "AI request failed",
    });
  }
};