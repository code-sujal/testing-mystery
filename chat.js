// DOM Elements
const contactList = document.getElementById('contact-list');
const chatHeader = document.getElementById('chat-header');
const chatMessages = document.getElementById('chat-messages');
const optionContainer = document.getElementById('option-container');
const chatOption = document.getElementById('chat-option');
const resetButton = document.getElementById('reset-button');

let currentChatId = "cyrus";

// Chat Data with Single-Option Conversation Flow and Dead Chats
const chatData = {
  "cyrus": {
    name: "Cyrus (CEO)",
    status: "Online",
    conversation: [
      { bot: "Greetings, Detective. My intel comes at a price—what’s your question?", userOption: "Ask about the biochip" },
      { bot: "The biochip’s part of Project Eclipse—a mind-control experiment. Curious?", userOption: "Who funded it?" },
      { bot: "Luminatech bankrolled it, but I suspect bigger players. Thoughts?", userOption: "What’s Luminatech hiding?" },
      { bot: "They buried Reid’s complaints—someone wanted him silent. That’s all for now.", userOption: null }
    ]
  },
  "shadow": {
    name: "Shadow",
    status: "Online",
    conversation: [
      { bot: "I’ve got dirt the cops missed. Ask fast.", userOption: "What about the logs?" },
      { bot: "Wiped clean after a biochip breach. Someone’s scared.", userOption: "Can you recover them?" },
      { bot: "Maybe. I’ll need time and a favor. Deal?", userOption: "What favor?" },
      { bot: "Get me Reid’s old files. I’ll handle the rest.", userOption: null }
    ]
  },
  "byte": {
    name: "Byte",
    status: "Online",
    conversation: [
      { bot: "Data’s my game. What do you need cracked?", userOption: "Can you hack Luminatech?" },
      { bot: "Their firewall’s tight, but I’ve got a backdoor. What’re we looking for?", userOption: "Project Eclipse data" },
      { bot: "Found encrypted files—biochip specs. Need more?", userOption: "Decrypt them" },
      { bot: "Done. It’s mind-control tech. Watch your back.", userOption: null }
    ]
  },
  "evelyn": {
    name: "Dr. Evelyn",
    status: "Online",
    conversation: [
      { bot: "Science holds the answers. What’s your inquiry?", userOption: "Tell me about Project Eclipse" },
      { bot: "It’s a neural override system—biochip-driven. Fascinating, no?", userOption: "How does it work?" },
      { bot: "Implants rewrite brain signals. Ethics aside, it’s genius.", userOption: "Who designed it?" },
      { bot: "I did, under duress. That’s all you get.", userOption: null }
    ]
  },
  "reid": {
    name: "Reid (Deceased)",
    status: "Offline",
    conversation: [
      { bot: "Hey, Detective. Found something big at Luminatech—Project Eclipse. It’s bad.", userOption: null },
      { user: "What did you find?", bot: "Biochip controls people. I’ve got proof—meeting tomorrow to expose it." },
      { bot: "[Last message: March 15, 2025] I think they’re onto me. If I don’t make it, check my files.", userOption: null }
    ]
  }
};

// Utility to scroll to bottom
function scrollToBottom() {
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Load chat history from localStorage or start fresh
function loadChat(chatId) {
  const savedHistory = JSON.parse(localStorage.getItem(`chat_${chatId}`)) || { messages: [], step: 0 };
  const isDeadChat = chatData[chatId].status === "Offline";
  
  chatMessages.innerHTML = '';
  chatHeader.querySelector('h2').textContent = chatData[chatId].name;

  if (isDeadChat) {
    // Load dead chat fully
    chatData[chatId].conversation.forEach(step => {
      appendMessage('bot', step.bot, false);
      if (step.userOption) appendMessage('user', step.userOption, false);
    });
    chatOption.textContent = "Chat Ended (Offline)";
    chatOption.disabled = true;
    resetButton.style.display = 'none'; // Hide reset button for dead chats
  } else {
    // Load active chat with history or initial message
    conversationStep = savedHistory.step;
    if (savedHistory.messages.length > 0) {
      savedHistory.messages.forEach(msg => appendMessage(msg.type, msg.text, false));
    } else {
      appendMessage('bot', chatData[chatId].conversation[0].bot, false);
    }
    updateOption(chatId);
    resetButton.style.display = 'block'; // Show reset button for active chats
  }
  
  scrollToBottom();
}

// Append message and optionally save to localStorage
function appendMessage(type, text, save = true) {
  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${type}`;
  messageDiv.textContent = text;
  chatMessages.appendChild(messageDiv);
  scrollToBottom();

  if (save) {
    saveChatHistory();
  }
}

// Save chat history to localStorage (only for active chats)
function saveChatHistory() {
  if (chatData[currentChatId].status === "Offline") return;

  const messages = Array.from(chatMessages.children)
    .filter(el => el.classList.contains('message'))
    .map(el => ({
      type: el.classList.contains('user') ? 'user' : 'bot',
      text: el.textContent
    }));
  const history = { messages, step: conversationStep };
  localStorage.setItem(`chat_${currentChatId}`, JSON.stringify(history));
}

// Show typing indicator
function showTypingIndicator() {
  const typingDiv = document.createElement('div');
  typingDiv.className = 'typing-indicator';
  typingDiv.innerHTML = 'Typing<span>.</span><span>.</span><span>.</span>';
  chatMessages.appendChild(typingDiv);
  scrollToBottom();
  return typingDiv;
}

// Remove typing indicator
function removeTypingIndicator(typingDiv) {
  if (typingDiv && typingDiv.parentNode) {
    typingDiv.parentNode.removeChild(typingDiv);
  }
}

// Update the single option button (only for active chats)
function updateOption(chatId) {
  const stepData = chatData[chatId].conversation[conversationStep];
  if (stepData && stepData.userOption) {
    chatOption.textContent = stepData.userOption;
    chatOption.disabled = false;
  } else {
    chatOption.textContent = "Conversation Ended";
    chatOption.disabled = true;
  }
}

// Handle option click (only for active chats)
function handleOptionClick() {
  if (chatData[currentChatId].status === "Offline") return;

  const stepData = chatData[currentChatId].conversation[conversationStep];
  appendMessage('user', stepData.userOption);

  chatOption.disabled = true;
  const typingDiv = showTypingIndicator();

  setTimeout(() => {
    removeTypingIndicator(typingDiv);
    conversationStep++;
    if (conversationStep < chatData[currentChatId].conversation.length) {
      appendMessage('bot', chatData[currentChatId].conversation[conversationStep].bot);
      updateOption(currentChatId);
    } else {
      updateOption(currentChatId);
    }
  }, 1200);
}

// Reset chat for the current contact
function resetChat() {
  if (chatData[currentChatId].status === "Offline") return;

  // Clear localStorage for this chat
  localStorage.removeItem(`chat_${currentChatId}`);
  conversationStep = 0;
  loadChat(currentChatId);
}

// Contact selection
contactList.addEventListener('click', (e) => {
  const contact = e.target.closest('.contact');
  if (contact && contact.dataset.id) {
    const selectedChatId = contact.dataset.id;
    document.querySelectorAll('.contact').forEach(c => c.classList.remove('active'));
    contact.classList.add('active');

    currentChatId = selectedChatId;
    localStorage.setItem('currentChatId', currentChatId);
    loadChat(currentChatId);
  }
});

// Event Listeners
chatOption.addEventListener('click', handleOptionClick);
resetButton.addEventListener('click', resetChat);

// Load initial chat on page load
document.addEventListener('DOMContentLoaded', () => {
  const savedChatId = localStorage.getItem('currentChatId') || 'cyrus';
  currentChatId = savedChatId;
  document.querySelector(`.contact[data-id="${currentChatId}"]`).classList.add('active');
  loadChat(currentChatId);
});