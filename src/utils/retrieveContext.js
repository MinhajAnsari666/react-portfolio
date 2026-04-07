import data from "../data/minhajData.json";

export function retrieveRelevantContext(question = "") {
  const q = question.toLowerCase();
  let context = "";

  // basic keyword match; adjust to taste
  for (const item of data) {
    if (q.includes(item.topic) || q.split(" ").some((w) => item.content.toLowerCase().includes(w))) {
      context += item.content + "\n";
    }
  }

  // fallback: include full profile
  if (!context) {
    context = data.map((d) => `${d.topic}: ${d.content}`).join("\n");
  }

  return context;
}
