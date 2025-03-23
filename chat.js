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
    "ryan": {
      name: "Ryan Gomez (HR)",
      status: "Online",
      conversation: [
        { bot: "Detective Alice, it’s Ryan Gomez from HR. I heard you’ve been asking more questions about Reid. What do you need?", userOption: "I’m following up on Reid’s complaints about Project Eclipse. Did he ever mention feeling threatened?" },
        { bot: "He was… worried about the project, yes. Threatened? Not to me, but he was always a bit paranoid, you know? Kept looking over his shoulder.", userOption: "Paranoid about what? Did he mention any specific concerns?" },
        { bot: "He thought Project Eclipse was… unethical. Said it wasn’t what it seemed. I told him to take it up with the CEO, but he wouldn’t listen.", userOption: "Did you know about his health conditions—asthma and anemia?" },
        { bot: "Yes, I… I knew. It was in his employee file. He used an inhaler regularly. Why does that matter now? You don’t think… that’s related, do you?", userOption: "Just covering all angles. Did anyone else know about his health?" },
        { bot: "I’m not sure… maybe the lab staff? I didn’t share that information with anyone. Honestly, I… I don’t like where this is going, Detective.", userOption: "One last thing—did you see Reid on the night of March 4?" },
        { bot: "March 4? I… I was in my office, handling some paperwork. I didn’t see him, no. Why are you asking? You’re making me nervous, Detective.", userOption: null }
      ]
    },
    "candice": {
      name: "Candice Bennett",
      status: "Online",
      conversation: [
        { bot: "Detective Alice, this is Candice Bennett. Why are you contacting me about Samuel? I don’t want to get dragged into this mess.", userOption: "You were Samuel’s ex. Did you two have any recent conflicts?" },
        { bot: "No, that was years ago! I moved on, but he didn’t. He kept trying to reconnect, even after I started working for the CEO. It was… exhausting.", userOption: "Did he ever talk to you about Project Eclipse?" },
        { bot: "Not really. He mentioned it once, said it was ‘dangerous.’ I thought he was just being dramatic—Samuel always had a flair for that.", userOption: "Did the CEO ever mention Samuel or Project Eclipse?" },
        { bot: "The CEO… he didn’t like Samuel’s attitude. Said he was asking too many questions, stirring up trouble. But that’s all I know, I swear!", userOption: "Did you notice anything unusual about Samuel before his death?" },
        { bot: "He seemed… stressed, always looking over his shoulder. I saw him arguing with someone in the lab a few days before… before it happened.", userOption: "Arguing with who? This could be important." },
        { bot: "I… I don’t know. It was late, and I was leaving. I think it was Dr. Rao, but I’m not sure. Please, don’t tell the CEO I said anything!", userOption: null }
      ]
    },
    "anoop": {
      name: "Dr. Anoop A. Rao",
      status: "Online",
      conversation: [
        { bot: "Detective Alice, it’s Dr. Anoop Rao. I heard you’re investigating Reid’s death. What do you want from me? I’m a busy man.", userOption: "You and Reid were rivals. Were you angry when he got you removed from Project Eclipse?" },
        { bot: "Angry? Of course I was! I deserved that project, not him. He swooped in, took all the credit, and got me kicked off. It was humiliating.", userOption: "Did you ever confront him about it?" },
        { bot: "Confront him? Hah! I tried, but he brushed me off. Said I was ‘too emotional’ to handle the project. The nerve of that man!", userOption: "Where were you on the night of March 4?" },
        { bot: "March 4… I was in my office, working late. Alone. I don’t have an alibi, but I didn’t need to kill him to get even. I’m better than that.", userOption: "Did you know what Project Eclipse really was?" },
        { bot: "I had my suspicions… it wasn’t just a medical device. I overheard Reid talking about ‘cognitive manipulation.’ But I was off the project by then.", userOption: "Did you ever argue with Reid in the lab a few days before his death?" },
        { bot: "Argue? No, I avoided him. But… I did see him in the lab, talking to that intern, Harley. They looked tense. Maybe you should ask him.", userOption: null }
      ]
    },
    "mira": {
      name: "Mira D. (Lab Assistant)",
      status: "Online",
      conversation: [
        { bot: "Detective Alice, I’m Mira, Dr. Reid’s lab assistant. I don’t want any trouble. What do you need? Please, I… I just want to stay out of this.", userOption: "What was Dr. Reid working on before his death?" },
        { bot: "He was obsessed with Project Eclipse. He asked me to find some encrypted files a day before he died. He was… frantic, almost scared.", userOption: "Encrypted files? What were they about?" },
        { bot: "I only saw a little—something about cognitive manipulation. He said it was dangerous and told me to stay quiet. I… I didn’t want to get involved.", userOption: "Did he mention anyone threatening him?" },
        { bot: "Not directly, but he was paranoid. He kept saying, ‘They can’t know I’m looking into this.’ I don’t know who he meant, but he was terrified.", userOption: "Did you see anyone suspicious around the lab that day?" },
        { bot: "I… I saw the janitor hanging around longer than usual. He was near Dr. Reid’s desk, but I thought he was just cleaning. Now I’m not so sure…", userOption: "Did Reid ever mention the CEO or Ryan Gomez?" },
        { bot: "He mentioned Ryan once, said he tried to talk to him about the project but got shut down. He didn’t trust him. That’s all I know, I swear!", userOption: null }
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