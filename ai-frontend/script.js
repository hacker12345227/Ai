const API_URL = "https://JOUW-BACKEND-URL.onrender.com/chat"; // <-- aanpassen!

async function sendMessage() {
    const input = document.getElementById("user-input");
    const text = input.value.trim();
    if (!text) return;

    addMessage("user", text);
    input.value = "";

    addMessage("ai", "•••");

    const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text })
    });

    const data = await response.json();
    const aiMsg = data.choices?.[0]?.message?.content || "(geen antwoord)";
    
    replaceLastMessage("ai", aiMsg);
}

function addMessage(sender, text) {
    const box = document.getElementById("chat-box");
    const msg = document.createElement("div");
    msg.className = `msg ${sender}`;
    msg.innerText = text;
    box.appendChild(msg);
    box.scrollTop = box.scrollHeight;
}

function replaceLastMessage(sender, text) {
    const msgs = document.querySelectorAll(`.msg.${sender}`);
    msgs[msgs.length - 1].innerText = text;
}
