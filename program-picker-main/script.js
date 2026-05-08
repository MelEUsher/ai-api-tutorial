// Grab references to the elements we'll be working with
const form = document.getElementById("quiz-form");
const submitBtn = document.getElementById("submit-btn");
const resultDiv = document.getElementById("result");
const resultContent = document.getElementById("result-content");
const loadingDiv = document.getElementById("loading");
const errorDiv = document.getElementById("error");
const resetBtn = document.getElementById("reset-btn");

// Listen for the form submission
form.addEventListener("submit", async (event) => {
  // Stop the form from refreshing the page
  event.preventDefault();

  // Hide any old results or errors
  resultDiv.classList.add("hidden");
  errorDiv.classList.add("hidden");

  // Show the loading message
  loadingDiv.classList.remove("hidden");
  submitBtn.disabled = true;

  // Collect the user's answers from the form
  const formData = new FormData(form);
  const answers = {
    experience: formData.get("experience"),
    goal: formData.get("goal"),
    time: formData.get("time"),
    budget: formData.get("budget"),
  };

  try {
    // Send the answers to OUR backend (NOT directly to Gemini)
    const response = await fetch("/api/recommend", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(answers),
    });

    // If the backend returned an error, throw so we hit the catch block
    if (!response.ok) {
      throw new Error("Backend request failed");
    }

    // Parse the JSON response from our backend
    const data = await response.json();

    // Show the recommendation
    resultContent.textContent = data.recommendation;
    resultDiv.classList.remove("hidden");
  } catch (err) {
    console.error(err);
    errorDiv.classList.remove("hidden");
  } finally {
    // Always hide the loading message and re-enable the button
    loadingDiv.classList.add("hidden");
    submitBtn.disabled = false;
  }
});

// Let the user start over
resetBtn.addEventListener("click", () => {
  form.reset();
  resultDiv.classList.add("hidden");
});
