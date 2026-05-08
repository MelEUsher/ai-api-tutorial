// ============================================
// BACKEND SERVERLESS FUNCTION
// This file runs on Vercel's servers — NOT in the browser.
// THIS is where your API key lives safely.
// ============================================

export default async function handler(request, response) {
  // TODO 1: Only accept POST requests.
  // If request.method is not "POST", return a 405 status with an error message.



  // TODO 2: Pull the user's answers out of request.body.
  // Example: const { experience, goal, time, budget } = request.body;



  // TODO 3: Validate that all expected answers are present.
  // If any are missing, return a 400 status with an error message.



  // TODO 4: Get your API key from environment variables.
  // Hint: process.env.GEMINI_API_KEY
  // If it's missing, return a 500 error.



  // TODO 5: Build a prompt for Gemini.
  // The prompt should:
  //   - Tell Gemini what role to play (e.g., "You are a friendly advisor for ___")
  //   - List the available options (programs, products, paths, etc.)
  //   - Include the user's answers
  //   - Tell it how to format its response
  // Tip: use a template literal (backticks) so you can write it across multiple lines.



  // TODO 6: Call the Gemini API using fetch().
  // URL: https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=YOUR_KEY
  // Method: POST
  // Headers: { "Content-Type": "application/json" }
  // Body: JSON.stringify({ contents: [{ parts: [{ text: yourPrompt }] }] })
  // Wrap this in a try/catch.



  // TODO 7: Parse Gemini's response.
  // The text comes back at: data.candidates[0].content.parts[0].text
  // Use optional chaining (?.) so you don't crash if the shape is unexpected.



  // TODO 8: Send the recommendation back to the frontend.
  // return response.status(200).json({ recommendation: yourText });



  // TODO 9: In the catch block, log the error and return a 500 status.
}
