// DOM Elements
const contactList = document.getElementById('contact-list');
const chatHeader = document.getElementById('chat-header');
const chatHeaderTitle = document.getElementById('chat-header-title');
const chatMessages = document.getElementById('chat-messages');
const optionContainer = document.getElementById('option-container');
const chatOption = document.getElementById('chat-option');
const resetButton = document.getElementById('reset-button');
const chatPlaceholder = document.getElementById('chat-placeholder');

let currentChatId = null;
let conversationStep = 0;

// Chat Data with Cryptic Conversations and Office Boy (Jake) as a Suspect
const chatData = {
    "ryan": {
        name: "Ryan Gomez (HR)",
        status: "Online",
        conversation: [
            { bot: "Detective Alice, it’s Ryan from HR. I’m busy, so let’s make this quick. What do you need about Reid?", userOption: "I’m looking into Reid’s last days. Did he seem off to you?" },
            { bot: "Off? He was always a bit… intense. Kept to himself, always carrying that thing around. I don’t know, I didn’t pay much attention.", userOption: "Did you interact with him much before March 4?" },
            { bot: "March 4? I… I was in my office, working late. I had Jake—the office boy—drop off some paperwork to him that day. That’s it!", userOption: "Paperwork? What kind? And why Jake?" },
            { bot: "Just… routine stuff! I don’t know, Jake’s always running errands for me. Look, Reid was paranoid, okay? Kept talking about the CEO watching him.", userOption: "Did Reid ever mention Project Eclipse to you?" },
            { bot: "Eclipse? Yeah, he rambled about it being ‘wrong.’ I told him to take it up with Dr. Rao or the CEO. I didn’t want to get involved!", userOption: null }
        ]
    },
    "candice": {
        name: "Candice Bennett",
        status: "Online",
        conversation: [
            { bot: "Detective Alice, it’s Candice. I don’t want to talk about Samuel. Why are you even asking me? I’ve moved on!", userOption: "You were close to Samuel once. Did he seem stressed before he died?" },
            { bot: "Stressed? Maybe… he was always so dramatic. Kept saying he didn’t trust anyone here. I saw him coughing a lot that last week, though.", userOption: "Coughing? Did you notice anything else unusual?" },
            { bot: "Not really… well, the lab smelled weird that day—like something metallic. And I saw Jake, the office boy, hanging around, acting all nervous.", userOption: "Jake? What was he doing there?" },
            { bot: "I don’t know! He was near Samuel’s desk, then left quickly. I thought he was just delivering something, but… maybe not? I didn’t stick around.", userOption: "Did Samuel ever mention Project Eclipse?" },
            { bot: "Once… said it was ‘dangerous’ and that the CEO knew more than he let on. But Samuel was always paranoid, so I didn’t take it seriously.", userOption: null }
        ]
    },
    "anoop": {
        name: "Dr. Anoop A. Rao",
        status: "Online",
        conversation: [
            { bot: "Detective Alice, Dr. Rao here. I don’t have time for your questions. Reid’s death isn’t my problem. What do you want?", userOption: "You and Reid didn’t get along. Did you see him on March 4?" },
            { bot: "March 4? I was in the lab, working late. Didn’t see Reid, but… Jake, the office boy, was there. Kept lurking around, acting strange.", userOption: "Jake? What was he doing in the lab?" },
            { bot: "No idea! He’s always running errands for HR, but he seemed… off. Maybe he was spying for someone? I don’t trust anyone around here.", userOption: "What do you know about Project Eclipse?" },
            { bot: "Eclipse? It was… experimental. I heard whispers about some tech—something dangerous. Reid was obsessed with it, always digging too deep.", userOption: "Did you notice anything unusual in the lab that day?" },
            { bot: "Unusual? There was some metallic residue on a table—thought it was from an experiment. And Reid was… off, kept reaching for his pocket.", userOption: null }
        ]
    },
    "mira": {
        name: "Mira D. (Lab Assistant)",
        status: "Online",
        conversation: [
            { bot: "Detective Alice, I’m Mira, Dr. Reid’s assistant. I… I don’t want trouble. Please, I don’t know anything!", userOption: "What was Dr. Reid like before his death?" },
            { bot: "He was… nervous. Always whispering, saying he couldn’t trust anyone. He needed his meds a lot that day—kept reaching for his pocket.", userOption: "Did you see anyone suspicious around the lab?" },
            { bot: "Suspicious? Well… Jake, the office boy, dropped something off at Reid’s desk. He looked nervous, kept glancing around. I don’t know why!", userOption: "What did Jake drop off? Did Reid say anything?" },
            { bot: "I didn’t see what it was—just a small package. Reid didn’t say much, just… muttered something about HR not being honest. I didn’t ask!", userOption: "Did Reid mention Project Eclipse?" },
            { bot: "Yes… he said it was ‘not what it seems.’ He was scared, kept looking over his shoulder. I think the CEO knew something, but I’m not sure!", userOption: null }
        ]
    }
};

// Utility to scroll to bottom
function scrollToBottom() {
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Show or hide chat elements
function toggleChatElements(show) {
    chatMessages.style.display = show ? 'flex' : 'none';
    optionContainer.style.display = show ? 'flex' : 'none';
    chatPlaceholder.style.display = show ? 'none' : 'flex';
    resetButton.style.display = show ? 'block' : 'none';
    chatHeaderTitle.textContent = show ? chatData[currentChatId].name : "Select a Contact";
}

// Load chat history from localStorage or start fresh
function loadChat(chatId) {
    const savedHistory = JSON.parse(localStorage.getItem(`chat_${chatId}`)) || { messages: [], step: 0 };
    const isDeadChat = chatData[chatId].status === "Offline";
    
    chatMessages.innerHTML = '';
    toggleChatElements(true);

    if (isDeadChat) {
        // Load dead chat fully
        chatData[chatId].conversation.forEach(step => {
            appendMessage('bot', step.bot, false);
            if (step.userOption) appendMessage('user', step.userOption, false);
        });
        chatOption.textContent = "Chat Ended (Offline)";
        chatOption.disabled = true;
        resetButton.style.display = 'none';
    } else {
        // Load active chat with history or initial message
        conversationStep = savedHistory.step;
        if (savedHistory.messages.length > 0) {
            savedHistory.messages.forEach(msg => appendMessage(msg.type, msg.text, false));
        } else {
            appendMessage('bot', chatData[chatId].conversation[0].bot, false);
        }
        updateOption(chatId);
        resetButton.style.display = 'block';
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

// Load initial state on page load
document.addEventListener('DOMContentLoaded', () => {
    toggleChatElements(false); // Show placeholder initially
});