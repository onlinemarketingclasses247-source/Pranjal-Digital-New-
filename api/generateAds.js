export default async function handler(req, res) {
  try {
    const body =
      typeof req.body === "string" ? JSON.parse(req.body) : req.body;

    const { brand, company, adsText } = body;

    const prompt = `
You are a Google Ads expert.

Brand: ${brand}
Competitor: ${company}

Ads Data:
${adsText}

Generate:
- 5 Headlines
- 5 Descriptions
- Keywords (Exact, Phrase, Broad)
`;

    const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": \`Bearer ${process.env.DEEPSEEK_API_KEY}\`,
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [{ role: "user", content: prompt }],
      }),
    });

    const data = await response.json();

    return res.status(200).json(data);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "API failed" });
  }
}
