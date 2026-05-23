const form = document.getElementById("message-form");
const messagesDiv = document.getElementById("messages");

const server = "http://localhost:3000";

async function getMessages() {
  const response = await fetch(`${server}/messages`);
  const messages = await response.json();

  messagesDiv.innerHTML = "";

  messages.forEach((message) => {
    const div = document.createElement("div");
    div.className = "message";

    div.innerHTML = `
      <strong>${message.username}</strong>
      <p>${message.text}</p>
      <button onclick="likeMessage(${message.id})">💗 Like ${message.likes}</button>
      <button onclick="dislikeMessage(${message.id})">👎 Dislike ${message.dislikes}</button>
    `;

    messagesDiv.appendChild(div);
  });
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const username = document.getElementById("username").value;
  const text = document.getElementById("message-input").value;

  await fetch(`${server}/messages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, text }),
  });

  form.reset();
  getMessages();
});

async function likeMessage(id) {
  await fetch(`${server}/messages/${id}/like`, {
    method: "POST",
  });

  getMessages();
}

async function dislikeMessage(id) {
  await fetch(`${server}/messages/${id}/dislike`, {
    method: "POST",
  });

  getMessages();
}

getMessages();