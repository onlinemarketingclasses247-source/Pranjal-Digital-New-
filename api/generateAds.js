export default async function handler(req, res) {
  // ✅ Allow only POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // ✅ Safe body parsing
    const body =
      typeof req.body === "string" ? JSON.parse(req.body) : req.body;

    const { brand, company, adsText } = body || {};

    if (!brand || !adsText) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const prompt = `
You are a Google Ads expert.

Brand: ${brand}
Competitor: ${company}

Ads Data:
${adsText}

Generate:
1. 5 Headlines
2. 5 Descriptions
3. Keywords:
   - Exact match
   - Phrase match
   - Broad match

Return clean structured output.
`;

    // ✅ CALL DEEPSEEK
    const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [{ role: "user", content: prompt }],
      }),
    });

    const data = await response.json();

    // ✅ DEBUG LOG (IMPORTANT)
    console.log("DEEPSEEK RESPONSE:", data);

    // ❌ HANDLE API ERROR
    if (!response.ok) {
      return res.status(500).json({
        error: data?.error?.message || "DeepSeek API failed",
      });
    }

    return res.status(200).json(data);

  } catch (error) {
    console.error("SERVER ERROR:", error);
    return res.status(500).json({ error: "Server crashed" });
  }
}
