# AI Prompt Templates for Quiz Content

Use these prompts to generate new questions compatible with the quiz application.

## 1. Image/PDF to JSON Extraction

**Goal:** Extract raw text and structure from exam screenshots or PDFs.

**Prompt:**

```text
Extract the questions from this image/PDF into a JSON array.
Each question object should have:
- "text": The question text.
- "options": An array of objects, each with "text" (the option content).
- "correct_answer_index": The 0-based index of the correct option (if marked).

Output ONLY the raw JSON.
```

## 2. Content Enrichment & Formatting

**Goal:** Transform raw questions into the rich format required by the app (with explanations and references).

**Prompt:**

```text
You are an expert PHP tutor. I will provide a JSON array of questions.
Please transform them into the following schema for my quiz app:

{
  "id": "generate_unique_id_here",
  "text": "Question Text",
  "options": [
    {
      "text": "Option A Text",
      "isCorrect": boolean,
      "explanation": "<h3>Detailed Title</h3><p>Explanation of WHY this is correct...</p>", // Only for correct option
      "reverse": "Short explanation of why this option is WRONG." // Only for incorrect options
    }
    // ... other options
  ],
  "reference_links": [
    "https://www.w3schools.com/php/..." // Relevant W3Schools link(s)
  ]
}

**Requirements:**
1. **Explanations (Correct Answer)**: Must use HTML tags (<h3>, <p>, <ul>). Explain the concept in detail (in Arabic).
2. **Reverse (Incorrect Answers)**: Explain briefly (in Arabic) why this specific option is wrong or under what different scenario it *might* be correct.
3. **Reference Links**: Provide at least one valid W3Schools PHP tutorial link related to the topic.
4. **Language**: All explanations must be in Arabic (RTL friendly).
5. **JSON Only**: Output valid JSON array.

**Input Data:**
[PASTE YOUR EXTRACTED JSON HERE]
```

## 3. Adding to the App

1. Generate the JSON using the prompts above.
2. Open `src/data/questions.json`.
3. Add the new questions to the appropriate category array, or create a new category.
4. Update logical IDs (e.g., ensure they are unique).
