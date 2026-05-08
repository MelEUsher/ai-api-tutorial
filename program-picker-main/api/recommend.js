// This is a Vercel serverless function.
// It runs on Vercel's servers — NOT in the user's browser.
// That's why it's safe to use the API key here.

export default async function handler(request, response) {
  // Only accept POST requests
  if (request.method !== "POST") {
    return response.status(405).json({ error: "Method not allowed" });
  }

  // Pull the answers out of the request body
  const { experience, goal, time, budget } = request.body;

  // Basic validation — make sure all answers came through
  if (!experience || !goal || !time || !budget) {
    return response.status(400).json({ error: "Missing answers" });
  }

  // Grab the API key from environment variables
  // (set in Vercel dashboard, never in code)
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return response.status(500).json({ error: "API key not configured" });
  }

  // Build the prompt we'll send to Gemini
  const prompt = `
You are a friendly advisor for Elev8Tek, a tech education company.
Based on the user's answers below, recommend ONE Elev8Tek program and explain why in 2-3 sentences.

Available programs:
- VibeCoder: Beginner-friendly course teaching people to "vibe code" using AI tools. Great for non-coders or hobbyists.
- Tek Innov8rs: 12-week elite program for developers who already know how to code and want to become AI-fluent and job-ready.
- Tek Founders: For founders or aspiring founders who want to build and ship their own SaaS or product.
- ScaleTek: For people scaling an existing business with custom tech.
- Enterprise: For companies needing enterprise-grade builds.
- Sovereign State: High-touch consulting for serious investors who want a done-for-you build.

User's answers:
- Coding experience: ${experience}
- Main goal: ${goal}
- Weekly time commitment: ${time}
- Investment comfort: ${budget}

Respond with the program name on its own line, followed by 2-3 sentences explaining why it's the right fit.
`;

  try {
    // Call the Gemini API
    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );

    if (!geminiResponse.ok) {
      throw new Error("Gemini API request failed");
    }

    const geminiData = await geminiResponse.json();

    // Pull the actual text out of Gemini's response shape
    const recommendation =
      geminiData.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Sorry, no recommendation could be generated.";

    // Send it back to the frontend
    return response.status(200).json({ recommendation });
  } catch (err) {
    console.error(err);
    return response.status(500).json({ error: "Something went wrong" });
  }
}
