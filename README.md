# API Sprint Tutorial — TekInnov8rs May 2026

> Learn how to safely integrate an AI API into a real web app. Covers API basics, key security, serverless backends, and deployment — all with free tools.

This tutorial walks you through how to build an AI-powered web app from scratch using HTML, JavaScript, a free Google Gemini API, and Vercel serverless functions. Even if you've never touched an API before, you can follow along.

**How this tutorial works:**

- The **`main` branch** of this repo contains a finished example app (a "program picker" that recommends Elev8Tek programs). You can reference it any time.
- The **`starter` branch** contains a scaffolded version with `TODO` comments you can fill in.
- The tutorial below teaches you the concepts and walks through how the example was built.
- **You don't have to build the example.** You can build anything you want using the same pattern. Section 5 explains the challenge.

---

## Table of Contents

1. [What is an API?](#1-what-is-an-api)
2. [What is an API Key?](#2-what-is-an-api-key-and-why-does-it-need-to-be-hidden)
3. [What is a Serverless Function?](#3-what-is-a-serverless-function-and-why-are-we-using-one)
4. [The Build (Walkthrough)](#4-the-build-walkthrough)
5. [Your Turn — The Elevate Challenge](#5-your-turn--the-elevate-challenge)

---

## 1. What is an API?

**API** stands for **Application Programming Interface**. That might sound intimidating if you've never worked with them before, but the concept is simple.

**Think of an API like a waiter at a restaurant.**

You (the customer) don't go into the kitchen and cook your own food. You sit at a table, look at the menu, and tell the waiter what you want. The waiter takes your order to the chef, the chef prepares it, and the waiter brings the food back to you.

In tech terms:

- **You** = your app (the frontend)
- **The chef** = some other service that has data or can do something useful (like Google Gemini, a weather service, or a database)
- **The waiter** = the API

You don't need to know *how* the chef makes the food. You just need to know **what to ask for** and **what you'll get back**.

### Why does this matter?

APIs are how apps talk to each other — the lines of communication. Every time you:

- Log in with Google
- See a weather widget
- Get a Spotify recommendation
- Ask ChatGPT a question

…there's an API call happening behind the scenes.

This weekend, **you'll be the one writing the order**. You'll send a question to Google's Gemini AI, and Gemini will send back an answer your app can use.

---

## 2. What is an API Key (and why does it need to be hidden)?

When you use someone else's API — like Google Gemini — they need a way to know **who** is making the request. That's where an **API key** comes in.

**Think of an API key like a hotel keycard.**

The hotel gives you a keycard when you check in. It identifies you, tracks which room you're using, and lets the hotel know how much to charge you. If someone else got ahold of your keycard, they could rack up charges on your account or get into rooms they shouldn't.

An API key works the same way:

- It identifies **you** (or your app) to the service
- It tracks how much you're using
- If you're on a paid plan, it's tied to **your bill**

### Why hiding the key matters

If you put your API key directly in your frontend code (the HTML/JavaScript a user's browser loads) or commit it to your public repo on GitHub, anyone can see it.

In fact, there are **bots that scan public GitHub repos 24/7** specifically looking for exposed API keys. Keys can be stolen within minutes of being pushed.

If someone steals your key, they can:

- Use up your free tier (so your app stops working)
- Run up huge bills if you're on a paid plan
- Get your account banned for abuse
- Gain access to sensitive information that can lead to problems/stolen information for you or your clients

### So how do we hide it?

We don't put the key in the frontend or commit it to a repo at all. Instead, we:

1. **Store the key in a `.env` file** — a special file that holds environment variables (like API keys) separately from your code.
2. **Add `.env` to your `.gitignore`** — this tells Git to *never* push that file to GitHub.
3. **Put the key on a backend** — a piece of code that runs on a server, where users can't see it.

### What if you accidentally commit a key?

- **Don't just delete the commit.** Git history keeps it forever.
- **Immediately rotate (regenerate) the key** in the API provider's dashboard.
- **Then** clean up your repo.

Treat exposed keys like spilled milk — you can't put it back, but you can replace it fast.

---

## 3. What is a Serverless Function (and why are we using one)?

A **serverless function** is a small piece of code that runs only when called. We're using **Vercel** because it's free and you've already used it.

**Think of a serverless function like a vending machine.** It just sits there until someone walks up and presses a button. Then it does its one job and goes back to sleep.

### Why this is perfect for any AI/API project

Your backend just needs to:

1. Receive input from the frontend
2. Hold the API key safely
3. Send a request to the AI/external API
4. Send the response back to the frontend

Vercel makes serverless functions easy: you create a file in an `/api` folder, and Vercel automatically turns it into a working endpoint when you deploy.

---

## 4. The Build (Walkthrough)

The rest of this section walks through how the example app on the **`main` branch** was built — a "program picker" that asks users a few questions and uses Gemini to recommend an Elev8Tek program.

**You don't have to build the program picker.** It's an example to teach the pattern. You can:

- **Follow along step by step** to build the example exactly as shown
- **Skim the example** to understand the pattern, then jump to Section 5 and build something completely different
- **Clone the `starter` branch** and use it as scaffolding for your own idea

Whatever you choose, the same steps apply.

---

### 4.1 — The Example Project

The example on the `main` branch is a **program picker**: a small web app where users answer 4 quick questions, and Gemini returns a personalized Elev8Tek program recommendation.

Here's the flow:

[ User fills out form ]
↓
[ Frontend sends input to the backend ]
↓
[ Backend sends a prompt to Gemini AI ]
↓
[ Gemini sends a response back ]
↓
[ User sees the AI-generated result ]

This same architecture is what professional developers use to integrate Stripe, OpenAI, Twilio, weather APIs, and more.

---

### 4.2 — Before You Start (Prerequisites)

| What | Why | Cost |
|---|---|---|
| [Google account](https://accounts.google.com/) | For a free Gemini API key | Free |
| [GitHub account](https://github.com/) | To store your code | Free |
| [Vercel account](https://vercel.com/signup) | To host your app | Free |
| [VS Code](https://code.visualstudio.com/download) | Code editor | Free |
| [Node.js](https://nodejs.org/) (LTS) | Runs the Vercel CLI | Free |
| [Git](https://git-scm.com/downloads) | Version control | Free |

---

### 4.3 — Get Your Gemini API Key

1. Go to [Google AI Studio](https://aistudio.google.com/).
2. Sign in with your Google account.
3. Click **Get API key** in the sidebar.
4. Click **Create API key** → **Create API key in new project**.
5. Copy the key.

> ⚠️ **Keep this key private.** Treat it like a password.

**Cost note:** Free tier = 1,500 requests/day. No credit card required.

---

### 4.4 — Set Up the Project Folder

**Option A — Clone the starter branch:**

```bash
git clone --branch starter https://github.com/MelEUsher/ai-api-tutorial.git my-project
cd my-project
```

**Option B — Build from scratch:**
my-project/
├── api/
│   └── recommend.js
├── .env
├── .gitignore
├── index.html
├── package.json
├── script.js
└── style.css

Create your `.env` file:
`GEMINI_API_KEY=paste_your_key_here`

Confirm `.env` is in your `.gitignore`:
.env
node_modules/
.vercel
.DS_Store

> ⚠️ If `.env` is not in `.gitignore`, your key WILL leak when you push to GitHub.

---

### 4.5 — Build the Frontend

The frontend collects user input. It can be a form, text box, buttons — whatever fits your idea.

**Example `index.html`** (excerpt — see full file on `main` branch):

```html
<form id="quiz-form">
  <div class="question">
    <label for="experience">What's your current coding experience?</label>
    <select id="experience" name="experience" required>
      <option value="">-- Select one --</option>
      <option value="none">None</option>
      <option value="beginner">Beginner</option>
      <option value="intermediate">Intermediate</option>
      <option value="advanced">Advanced</option>
    </select>
  </div>
  <!-- more questions... -->
  <button type="submit" id="submit-btn">Get My Recommendation</button>
</form>

<div id="result" class="hidden">
  <h2>Your Recommended Path</h2>
  <div id="result-content"></div>
</div>

<div id="loading" class="hidden"><p>Thinking...</p></div>
<div id="error" class="hidden"><p>Something went wrong.</p></div>
```

> 📂 **Full file:** see [`index.html` on the `main` branch](../../blob/main/index.html).

**For your project**, swap out the form for whatever inputs your app needs.

The `style.css` file is on the `main` branch — copy it as a starting point.

---

### 4.6 — Build the Backend (Serverless Function)

This is the most important file. It runs on Vercel's servers, holds the API key safely, and talks to Gemini.

**Example `api/recommend.js`:**

```javascript
export default async function handler(request, response) {
  if (request.method !== "POST") {
    return response.status(405).json({ error: "Method not allowed" });
  }

  const { experience, goal, time, budget } = request.body;

  if (!experience || !goal || !time || !budget) {
    return response.status(400).json({ error: "Missing answers" });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return response.status(500).json({ error: "API key not configured" });
  }

  const prompt = `
You are a friendly advisor for Elev8Tek.
Recommend ONE program based on the user's answers and explain why in 2-3 sentences.

Programs: VibeCoder, Tek Innov8rs, Tek Founders, ScaleTek, Enterprise, Sovereign State

User answers:
- Experience: ${experience}
- Goal: ${goal}
- Time: ${time}
- Budget: ${budget}
`;

  try {
    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
      }
    );

    if (!geminiResponse.ok) throw new Error("Gemini request failed");

    const data = await geminiResponse.json();
    const recommendation =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No recommendation generated.";

    return response.status(200).json({ recommendation });
  } catch (err) {
    console.error(err);
    return response.status(500).json({ error: "Something went wrong" });
  }
}
```

> 📂 **Full file:** see [`api/recommend.js` on the `main` branch](../../blob/main/api/recommend.js).

You also need a `package.json`:

```json
{
  "name": "my-project",
  "version": "1.0.0",
  "type": "module",
  "scripts": { "dev": "vercel dev" }
}
```

**For your project**, change the variables, validation, and prompt to fit your idea. Everything else stays the same.

---

### 4.7 — Connect Frontend to Backend

**Example `script.js`:**

```javascript
const form = document.getElementById("quiz-form");
const submitBtn = document.getElementById("submit-btn");
const resultDiv = document.getElementById("result");
const resultContent = document.getElementById("result-content");
const loadingDiv = document.getElementById("loading");
const errorDiv = document.getElementById("error");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  resultDiv.classList.add("hidden");
  errorDiv.classList.add("hidden");
  loadingDiv.classList.remove("hidden");
  submitBtn.disabled = true;

  const formData = new FormData(form);
  const answers = {
    experience: formData.get("experience"),
    goal: formData.get("goal"),
    time: formData.get("time"),
    budget: formData.get("budget"),
  };

  try {
    const response = await fetch("/api/recommend", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(answers),
    });

    if (!response.ok) throw new Error("Backend failed");

    const data = await response.json();
    resultContent.textContent = data.recommendation;
    resultDiv.classList.remove("hidden");
  } catch (err) {
    console.error(err);
    errorDiv.classList.remove("hidden");
  } finally {
    loadingDiv.classList.add("hidden");
    submitBtn.disabled = false;
  }
});
```

> 📂 **Full file:** see [`script.js` on the `main` branch](../../blob/main/script.js).

**Key thing to notice:** the frontend calls `/api/recommend` — your own backend. It NEVER touches the Gemini URL. **This is the entire point.**

---

### 4.8 — Test Locally

Install the Vercel CLI:

```bash
npm install -g vercel
vercel login
vercel dev
```

Open `http://localhost:3000` and test.

**Common errors:**

| Error | Fix |
|---|---|
| "API key not configured" | Check `.env` has `GEMINI_API_KEY=...` |
| "Backend request failed" | Check Gemini key is valid |
| Page is blank | Open dev tools (F12) → Console |
| Port 3000 in use | Run `vercel dev --listen 3001` |

---

### 4.9 — Push to GitHub

**Triple-check `.gitignore`:**

```bash
cat .gitignore
```

`.env` should be listed. Then:

```bash
git init
git add .
git status
```

> 🔍 **Make sure `.env` is NOT in the `git status` output.**

```bash
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
git push -u origin main
```

---

### 4.10 — Deploy to Vercel

1. Go to [vercel.com/new](https://vercel.com/new).
2. Import your GitHub repo.
3. **Framework Preset:** Other.
4. Expand **Environment Variables**, add `GEMINI_API_KEY` with your key.
5. Click **Deploy**.

Visit the live URL and test it.

**Cost note:** Vercel Hobby tier is free — you won't hit the limits.

---

### 4.11 — You Did It! 🎉

You built:

- ✅ A working AI-powered web app
- ✅ A secure backend that hides your API key
- ✅ Real production patterns
- ✅ A live URL
- ✅ A portfolio piece

If you followed the example, you can submit it. If you skipped ahead, head to Section 5.

---

## 5. Your Turn — The Elevate Challenge

Your sprint project should be themed around **"Elevate"** — help someone **level up, improve, decide, or grow**.

### What's required

1. ✅ Frontend that takes user input
2. ✅ Serverless function to hide your API key
3. ✅ Calls Gemini (or another free AI API)
4. ✅ Displays the result
5. ✅ Deployed live on Vercel
6. ✅ On GitHub with `.env` gitignored
7. ✅ Has a README

### Sample project ideas

- **Elevate Your Career** — side hustle recommender
- **Elevate Your Plate** — what to cook tonight
- **Elevate Your Workout** — daily workout generator
- **Elevate Your Reading** — book recommender
- **Elevate Your Mind** — affirmation/journal prompt generator
- **Elevate Your Style** — outfit suggester
- **Elevate Your Trip** — weekend getaway recommender
- **Elevate Your Code** — "what should I learn next?"
- **Elevate Your Inbox** — message rewriter
- **Elevate Your Pitch** — startup pitch generator
- **Elevate the Example** — improve the program picker

Or come up with something better.

### Submission

- Public GitHub repo
- Live Vercel URL
- Drop both links in Discord by **Wednesday Scrum**
- Demo at the Wednesday showcase

### Tips

- Start simple
- Run `git status` before every commit
- Test locally with `vercel dev` first
- A thoughtful prompt is the magic
- Make the UI yours

---

## Branches

- **`main`** — finished example program picker
- **`starter`** — scaffolded version with `TODO` comments

## License

MIT
