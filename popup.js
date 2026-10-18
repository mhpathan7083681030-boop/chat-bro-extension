const BACKEND_URL = "https://chat-bro-backend.onrender.com";

document.addEventListener("DOMContentLoaded", async () => {
  const chatBox = document.getElementById("chat-box");
  const userInput = document.getElementById("user-input");
  const sendBtn = document.getElementById("send-btn");
  const statusText = document.getElementById("status-text");

  // Check server status
  try {
    const res = await fetch(`${BACKEND_URL}/api/health`);
    const data = await res.json();
    if (data.status === "OK") {
      chatBox.innerHTML = '<p style="color: green;">Connected to Chat Bro Server! 🚀</p>';
      statusText.innerText = "Server: Online 🟢";
    }
  } catch (err) {
    chatBox.innerHTML = '<p style="color: red;">Failed to connect to server.</p>';
    statusText.innerText = "Server: Offline 🔴";
  }

  // Send message function
  async function sendMessage() {
    const text = userInput.value.trim();
    if (!text) return;

    // Append user message
    chatBox.innerHTML += `<p><b>You:</b> ${text}</p>`;
    userInput.value = "";
    chatBox.scrollTop = chatBox.scrollHeight;

    try {
      const response = await fetch(`${BACKEND_URL}/`, {
        method: "GET"
      });
      const reply = await response.text();
      
      chatBox.innerHTML += `<p><b>Bot:</b> ${reply}</p>`;
      chatBox.scrollTop = chatBox.scrollHeight;
    } catch (error) {
      chatBox.innerHTML += `<p style="color: red;">Error sending message.</p>`;
    }
  }

  sendBtn.addEventListener("click", sendMessage);
  userInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  });
});
