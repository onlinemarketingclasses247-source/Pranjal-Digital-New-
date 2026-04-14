export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ text: "Only POST allowed" });
  }

  try {
    const { brand, company, adsText } = req.body;

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyBYOmGaUQ3ZAlk3Ft5v9JuWXDp3-DRojA8",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [
                {
                  text: `Rewrite this Google ad:

Brand: ${brand}
Competitor: ${company}

Ad:
${adsText}

Give:
- 5 Headlines
- 3 Descriptions
- 1 CTA
- 10 Keywords`,
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    const text =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "❌ No response from AI";

    return res.status(200).json({ text });

  } catch (error) {
    return res.status(500).json({ text: "❌ Backend error" });
  }
}
