# API Sprint Tutorial — TekInnov8rs May 2026

> Learn how to safely integrate an AI API into a real web app. Covers API basics, key security, serverless backends, and deployment — all with free tools.

This tutorial walks you through building a working AI-powered recommender app from scratch using HTML, JavaScript, a free Google Gemini API, and Vercel serverless functions. Even if you've never touched an API before, you can follow along.

---

## Table of Contents

1. [What is an API?](#1-what-is-an-api)
2. [What is an API Key?](#2-what-is-an-api-key-and-why-does-it-need-to-be-hidden)
3. [What is a Serverless Function?](#3-what-is-a-serverless-function-and-why-are-we-using-one)
4. [The Build](#4-the-build)

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

This weekend, **you'll be the one writing the order**. In the example, we'll send a question to Google's Gemini AI, and Gemini will send back an answer our app can use.

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

If you put your API key directly in your frontend code (the HTML/JavaScript a user's browser loads) or commit it to your public repo on GitHub, anyone can see it. All they have to do is right-click → "View Page Source" or open the browser dev tools — or, in the case of GitHub, just browse your code.

In fact, there are **bots that scan public GitHub repos 24/7** specifically looking for exposed API keys. Keys can be stolen within minutes of being pushed.

If someone steals your key, they can:

- Use up your free tier (so your app stops working)
- Run up huge bills if you're on a paid plan
- Get your account banned for abuse
- Gain access to sensitive information that can lead to problems/stolen information for you or your clients

### So how do we hide it?

We don't put the key in the frontend or commit it to a repo at all. Instead, we:

1. **Store the key in a `.env` file** — a special file that holds environment variables (like API keys) separately from your code.
2. **Add `.env` to your `.gitignore`** — this tells Git to *never* push that file to GitHub. Your key stays on your local machine and on your server, but never in your public code.
3. **Put the key on a backend** — a piece of code that runs on a server, where users can't see it. The frontend asks the backend, and the backend talks to the API.

That's exactly what we'll be building this weekend.

### What if you accidentally commit a key?

It happens — even to senior devs. If it does:

- **Don't just delete the commit.** Git history keeps it forever, and anyone who already cloned the repo still has it.
- **Immediately rotate (regenerate) the key** in the API provider's dashboard. The old key becomes useless.
- **Then** clean up your repo (or just move on with the new key).

Treat exposed keys like spilled milk — you can't put it back, but you can replace it fast.

---

## 3. What is a Serverless Function (and why are we using one)?

Now that we know the API key has to live somewhere safe, let's talk about *where*.

Traditionally, you'd spin up a server — a computer running somewhere in the cloud, always on, waiting for requests. You'd have to set it up, maintain it, pay for it even when nobody was using your app, and keep it secure. That's a lot of work for a small project.

A **serverless function** skips all of that.

**Think of a serverless function like a vending machine.**

A vending machine doesn't run 24/7 making snacks just in case someone shows up. It just sits there. When someone walks up and presses a button, *then* it does its one job — drops the snack — and goes back to sleep.

A serverless function works the same way:

- It's a small piece of code that lives on a cloud platform (we're using **Vercel**)
- It only runs **when someone calls it**
- When it's done, it shuts down
- You don't manage a server, patch it, or pay for idle time

### Why this is perfect for our project

For our example program picker, we need a backend that can:

1. Receive the user's quiz answers from the frontend
2. Hold the Gemini API key safely
3. Send the request to Gemini
4. Send Gemini's response back to the frontend

That's it. We don't need a server running 24/7 — we just need a tiny function that runs when someone takes the quiz.

### Why Vercel?

You've already deployed to Vercel for your vibe-coded apps, so you're familiar with it. Vercel makes serverless functions easy: you just create a file in an `/api` folder, and Vercel automatically turns it into a working endpoint when you deploy. No extra setup.

This is also the **real-world pattern** professional developers use for projects like this — so what you build this weekend is portfolio-worthy.

---

## 4. The Build

> 🚧 *Full walkthrough with screenshots and code coming soon. Outline below.*

### 4.1 — What We're Building

Quick recap of the program picker: quiz → backend → Gemini → recommendation displayed.

### 4.2 — Before You Start (Prerequisites)

- Free Google account (for Gemini API key)
- Free GitHub account
- Free Vercel account (linked to GitHub)
- Code editor (VS Code recommended)
- Node.js installed

### 4.3 — Get Your Gemini API Key

- Walk through Google AI Studio
- Generate the key
- Where to safely store it for now

### 4.4 — Set Up the Project Folder

- Folder structure
- Create `index.html`, `style.css`, `script.js`, `/api/recommend.js`
- Create `.env` and `.gitignore`

### 4.5 — Build the Frontend (Quiz UI)

- HTML structure of the quiz
- CSS for basic styling
- JavaScript to capture answers

### 4.6 — Build the Backend (Serverless Function)

- Anatomy of a Vercel serverless function
- Receiving the quiz answers
- Sending the prompt to Gemini
- Returning the response

### 4.7 — Connect Frontend to Backend

- Using `fetch()` to call your own `/api/recommend` endpoint
- Handling the response
- Displaying the recommendation to the user

### 4.8 — Test Locally

- Running it locally with `vercel dev`
- Common errors and how to fix them

### 4.9 — Push to GitHub

- Initialize the repo
- Verify `.env` is ignored
- Push the code

### 4.10 — Deploy to Vercel

- Connect the repo
- Add the API key as an environment variable in Vercel
- Deploy and test the live version

### 4.11 — You Did It! 🎉

- Recap what you built
- Bridge into Section 5 (their turn)

---

## Branches

- **`main`** — the finished, working version of the project. Use this as a reference.
- **`starter`** — a scaffolded version with `TODO` comments. Start here if you want to build along with the tutorial.

## License

MIT
