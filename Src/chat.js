export async function sendMessage(messages) {
  const res = await fetch("/.netlify/functions/chat", {
    method: "POST",
    body: JSON.stringify({ messages })
  });

  const json = await res.json();
  return json.choices[0].message.content;
}
