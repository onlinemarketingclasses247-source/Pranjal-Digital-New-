export default async function handler(req, res) {
  try {
    // ✅ IMPORTANT: Parse body properly
    const { prompt } = typeof req.body === "string"
      ? JSON.parse(req.body)
      : req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt missing" });
    }

    const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [
          {
            role: "system",
            content: "You are a high-converting ad copywriter.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
      }),
    });

    const data = await response.json();

    // ✅ DEBUG LOG (IMPORTANT)
    console.log("DeepSeek response:", data);

    if (!response.ok) {
      return res.status(500).json({ error: data });
    }

    return res.status(200).json(data);

  } catch (error) {
    console.error("SERVER ERROR:", error);
    return res.status(500).json({ error: "Server failed" });
  }
}
