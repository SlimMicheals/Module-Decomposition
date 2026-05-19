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
    `;

    messagesDiv.appendChild(div);
  });
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const username = document.getElementById("username").value;
  const text = document.getElementById("message-input").value;

  const newMessage = {
    username,
    text,
  };

  await fetch(`${server}/messages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newMessage),
  });

  form.reset();

  getMessages();
});

getMessages();