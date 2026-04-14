export async function generateAds(prompt) {
  try {
    const response = await fetch("/api/generateAds", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error("API failed");
    }

    return data.choices[0].message.content;

  } catch (error) {
    console.error(error);
    return "API failed";
  }
}
