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

    console.log("API RESPONSE:", data); // ✅ DEBUG

    if (!response.ok) {
      return "API failed";
    }

    return data?.choices?.[0]?.message?.content || "No response";

  } catch (error) {
    console.error("FRONTEND ERROR:", error);
    return "API failed";
  }
}
