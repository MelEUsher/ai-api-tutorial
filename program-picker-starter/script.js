// ============================================
// FRONTEND JAVASCRIPT
// This file runs in the user's browser.
// It collects quiz answers and sends them to OUR backend.
// IMPORTANT: This file should NEVER contain your API key!
// ============================================

// TODO 1: Get references to the elements you'll need.
// Hint: use document.getElementById() for each.
// You'll need: form, submit button, result div, result content,
// loading div, error div, and reset button.



// TODO 2: Listen for the form's submit event.
// Use form.addEventListener("submit", async (event) => { ... });
// Inside the listener:
//   a. Call event.preventDefault() to stop the page from refreshing
//   b. Hide the result and error divs
//   c. Show the loading div
//   d. Disable the submit button



// TODO 3: Collect the user's answers from the form.
// Hint: use new FormData(form) and formData.get("name_of_field")
// Build an object like { experience: "...", goal: "...", etc. }



// TODO 4: Send the answers to your backend using fetch().
// - URL: "/api/recommend"
// - Method: "POST"
// - Headers: { "Content-Type": "application/json" }
// - Body: JSON.stringify(yourAnswersObject)
// Wrap this in a try/catch block.



// TODO 5: Handle the response.
// - Check if response.ok is true; if not, throw an error
// - Parse the JSON response with response.json()
// - Display the recommendation in the #result-content div
// - Show the result div



// TODO 6: In the catch block, show the error div and log the error.



// TODO 7: In a finally block, hide the loading div and re-enable the button.



// TODO 8: Add a click listener to the reset button that:
//   - Resets the form (form.reset())
//   - Hides the result div
