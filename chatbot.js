let lastTopic = null;

function sendMessage() {
  const input = document.getElementById('userInput');
  const message = input.value.trim();
  if (!message) return;

  addMessage("Tú", message);
  input.value = "";

  setTimeout(() => {
    const botReply = getBotReply(message);
    addMessage("Bot", botReply);
    scrollChatToBottom();
  }, 700); // simula que “piensa”
}

function addMessage(sender, text) {
  const chatbox = document.getElementById('chatbox');
  chatbox.innerHTML += `<div><strong>${sender}:</strong> ${text}</div>`;
}

function scrollChatToBottom() {
  const chatbox = document.getElementById('chatbox');
  chatbox.scrollTop = chatbox.scrollHeight;
}

function getBotReply(userMsg) {
  const msg = userMsg.toLowerCase();

  if (msg.includes("triste") || msg.includes("deprimido")) {
    lastTopic = "tristeza";
    return pick([
      "Siento mucho que te sientas así... ¿Quieres contarme más? 🌱",
      "Aquí estoy para escucharte. ❤️ Cuéntame qué ha pasado.",
      "No estás solo/a, quiero entenderte mejor."
    ]);
  }
  else if (msg.includes("feliz") || msg.includes("alegre")) {
    lastTopic = "felicidad";
    return pick([
      "¡Me alegra mucho escuchar eso! 😄 ¿Qué te hace sentir tan bien?",
      "Genial 🌼 Cuéntame qué te alegró el día.",
      "¡Qué bonito! 😊 Cuéntame más."
    ]);
  }
  else if (msg.includes("estresado") || msg.includes("ansioso") || msg.includes("estres")) {
    lastTopic = "estres";
    return pick([
      "Lo entiendo... ¿Te gustaría que hagamos un ejercicio de respiración? 🧘‍♂️",
      "A veces ayuda detenerse, respirar hondo... ¿Quieres intentarlo?",
      "Cuéntame qué está causando ese estrés."
    ]);
  }
  else if (lastTopic === "estres" && msg.includes("sí")) {
    lastTopic = null;
    return "Perfecto. Inhala profundo durante 4 segundos, retén 4, exhala 4... repítelo varias veces. 🌿";
  }
  else if (msg.includes("gracias")) {
    return pick([
      "¡De nada! ❤️ Me alegra poder acompañarte.",
      "Estoy aquí para ti cuando me necesites. 🌼",
      "Gracias a ti por confiar en mí. 🌱"
    ]);
  }
  else {
    return pick([
      "Cuéntame más sobre eso, quiero saber cómo te sientes.",
      "Me interesa lo que dices, ¿puedes explicarme un poco más?",
      "Aquí estoy para escuchar todo lo que quieras compartir. ❤️"
    ]);
  }
}

// función para elegir una respuesta aleatoria
function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
