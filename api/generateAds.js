export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ text: "Only POST allowed" });
  }

  try {
    const { brand, company, adsText } = req.body;

    if (!adsText || adsText.length < 10) {
      return res.status(200).json({
        text: "❌ No ad content detected. Paste screenshot properly.",
      });
    }

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=AIzaSyBYOmGaUQ3ZAlk3Ft5v9JuWXDp3-DRojA8",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `You are a Google Ads expert.

Rewrite this ad into HIGH converting Google Ads.

Brand: ${brand}
Competitor: ${company}

Ad:
${adsText}

Give output in this format:

HEADLINES:
- 5 options

DESCRIPTIONS:
- 3 options

CTA:
- 1 strong CTA

KEYWORDS:
- 10 keywords`,
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    const text =
      data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      return res.status(200).json({
        text: "❌ Gemini returned empty response",
      });
    }

    return res.status(200).json({ text });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      text: "❌ Backend error",
    });
  }
}
