// DOM Elements
const contactList = document.getElementById('contact-list');
const chatHeader = document.getElementById('chat-header');
const chatHeaderTitle = document.getElementById('chat-header-title');
const chatMessages = document.getElementById('chat-messages');
const optionContainer = document.getElementById('option-container');
const chatOption = document.getElementById('chat-option');
const resetButton = document.getElementById('reset-button');
const chatPlaceholder = document.getElementById('chat-placeholder');
const backButton = document.getElementById('back-button'); // New DOM element

let currentChatId = null;
let conversationStep = 0;

// Chat Data with Story-Driven Progression (unchanged)
const chatData = {
    "ryan": {
        name: "Ryan Gomez (HR)",
        status: "Online",
        conversation: [
            { bot: "Detective Alice, it’s Ryan from HR. I’m swamped—can we make this quick? What do you need about Reid?", userOption: "I’m investigating Reid’s last days. Did you notice anything unusual?" },
            { bot: "Unusual? Not really… he seemed off, but I was too busy. The CEO was on my case about some missing reports—total mess.", userOption: "Where were you on March 4? Did you see Reid that day?" },
            { bot: "March 4? I was in my office, dealing with that mess. I sent Jake to drop off some items at Reid’s desk—routine stuff, nothing special. Candice might’ve seen him—she was around.", userOption: "How much do you know about Project Eclipse." },
            { bot: "Eclipse? Ofcourse It was the Project Dr. Reid was incharge of, he took it away from Dr.Anoop after convincing my brother. Honestly I think something suspicious was going on with that project, and Reid was....It's over now there is nothing left about that project, I have to go now..." , userOption: null }
        ]
    },
    "candice": {
        name: "Candice Bennett(Reid's Ex)",
        status: "Online",
        conversation: [
            { bot: "Detective Alice, it’s Candice. I don’t want to be dragged into this—Samuel’s death is too much! Why are you asking me?", userOption: "Ryan said you were around on March 4. Did you see Samuel that day?" },
            { bot: "March 4? I… I saw him in the lab, yeah. He was pacing, muttering about Eclipse—said it was ‘dangerous.’ He didn’t trust anyone, not even Mira.", userOption: "Did he seem off in any other way? What was he doing?" },
            { bot: "He was… breathing heavily, like he was stressed. I thought he was just upset about Eclipse. Later, I saw Jake hanging around the lab—acting all sneaky.", userOption: "Jake? What was he doing there? Did you notice anything else in the lab?" },
            { bot: "Jake was near Reid’s desk, looking nervous—like he didn’t want to be seen. The lab… smelled strange, like something burnt. I thought it was normal for the lab, but now I’m not sure.", userOption: "A burnt smell? Did you ask anyone about it?" },
            { bot: "No, I didn’t think much of it then. But Lila was going on about some chemical spill—maybe she knows more? I just wanted to get out of there.", userOption: null }
        ]
    },
    "anoop": {
        name: "Dr. Anoop A. Rao",
        status: "Online",
        conversation: [
            { bot: "Detective Alice, Dr. Rao here. I’m swamped with my own work—Reid’s death isn’t my problem. What do you want?", userOption: "Ryan mentioned a weird smell in the lab. Did you notice anything like that on March 4?" },
            { bot: "A weird smell? Yeah, there was a faint burning odor—I thought it was from my experiments. Harley(new intern) was messing around with some chemicals that day, probably his fault.", userOption: "Harley? What was he doing? Did you see Reid that day?" },
            { bot: "Harley was fumbling with some equipment—said he mixed up some chemicals by mistake. Reid was there earlier, muttering about Eclipse and some ‘threat’ from the CEO.", userOption: "A threat? What did Reid say about it? Was the smell connected to him?" },
            { bot: "He said the CEO was hiding something about Eclipse—thought he was in danger. The smell? I don’t think so… but Reid was acting strange, kept reaching for his pocket. Ask Mira—she was with him.", userOption: "Did you see anyone else around the lab—like Jake or Ethan?" },
            { bot: "Jake was in the lab, dropping something off at Reid’s desk—he left fast. Ethan was lurking by the entrance, as usual. I don’t trust either of them.", userOption: null }
        ]
    },
    "mira": {
        name: "Mira D. (Lab Assistant)",
        status: "Online",
        conversation: [
            { bot: "Detective Alice, I’m Mira, Dr. Reid’s assistant. I… I don’t want any trouble. Please, I just want to stay out of this!", userOption: "Dr. Rao said you were with Reid on March 4. Did you notice anything unusual about him?" },
            { bot: "Unusual? He was… on edge, kept saying Eclipse was ‘dangerous.’ He was breathing heavily right after using his inhaler—I thought he was just anxious.", userOption: "His inhaler? Did you see him use it? What else was going on?" },
            { bot: "Yeah, he pulled it out of his pocket and used it right in front of me. The lab smelled odd that day—like something was burnt . I noticed a faint burning odor residue.", userOption: "Burning odor residue? Could that be related to the smell? Did you see anyone suspicious?" },
            { bot: "I… I don’t know. Maybe? Harley was there, acting strange—he said he mixed up some chemicals. Jake dropped off a package for Reid—he seemed really nervous.", userOption: "A package? What did Reid say about it? Did anyone else mention the smell?" },
            { bot: "Reid looked uneasy when he saw the package, said something about ‘not trusting anyone above.’ Candice mentioned the smell too—she thought it was a chemical spill. Maybe ask her again?", userOption: null }
        ]
    },
    "lila": {
        name: "Lila Carter",
        status: "Online",
        conversation: [
            { bot: "Oh, Detective Alice! It’s Lila, the receptionist. I heard you’re investigating Reid’s death—how exciting! What do you want to know?", userOption: "Candice mentioned a chemical spill in the lab. Did you hear anything about that?" },
            { bot: "A chemical spill? Oh, yes! I heard there was a big mess in the lab—smelled awful, like burnt chemical! I bet Harley did it—he’s always so clumsy!", userOption: "Burnt chemical? Did you see Harley in the lab? What else did you hear?" },
            { bot: "I didn’t see him myself, but everyone’s saying he messed up some experiment. Oh, and I saw Candice crying in the break room that day—said Reid was onto something big with Eclipse!", userOption: "Candice was crying? What did she say about Reid? Did you notice anything else?" },
            { bot: "She was a mess, said Reid was ‘asking too many questions.’ I also heard Ryan arguing with the CEO that day—big drama! Something about missing reports and Eclipse.", userOption: "Ryan and the CEO? Did you see anyone else around the lab—like Jake or Ethan?" },
            { bot: "Jake was running around like a headless chicken—HR always keeps him busy. Ethan was near the lab entrance, watching everyone. He’s so creepy!", userOption: null }
        ]
    },
    "ethan": {
        name: "Ethan Moore (Security)",
        status: "Online",
        conversation: [
            { bot: "Detective Alice, it’s Ethan, security. I don’t have time for chit-chat—what do you want? Reid’s death is above my pay grade.", userOption: "I heard you were near the lab on March 4. Did you see anything suspicious?" },
            { bot: "Suspicious? Always. I saw Candice sneaking out of the lab—she looked upset, like she’d been crying. Wouldn’t even make eye contact.", userOption: "What about Reid? Did you see him that day?" },
            { bot: "Reid? Yeah, he was in the lab, pacing like a caged animal. I saw him fiddling with something in his pocket—thought he was hiding something.", userOption: "Did you notice anyone else around the lab—like Jake or Harley?" },
            { bot: "Jake was there, dropping off a package at Reid’s desk—left in a hurry. Harley was messing with some equipment, looked nervous. Some equipment was malfunctioning that day—kept glitching.", userOption: "Did you notice any unusual smells or activity in the lab?" },
            { bot: "Smells? Yeah, there was a weird burning odor stench—thought it was a lab thing. Dr. Rao was in there too, muttering to himself—creepy, if you ask me.", userOption: null }
        ]
    },
    "priya": {
        name: "Dr. Priya Sharma (Consultant)",
        status: "Online",
        conversation: [
            { bot: "Detective Alice, this is Dr. Priya Sharma, research consultant. I’m only here on contract—Reid’s death doesn’t concern me. What do you need?", userOption: "You were working on Project Eclipse. Did Reid ever mention it to you?" },
            { bot: "Eclipse? Yes, he was… overly emotional about it. Kept saying it was ‘unethical.’ I told him to focus on the data, not conspiracy theories.", userOption: "Did you notice anything unusual in the lab on March 4?" },
            { bot: "March 4? I was in the lab briefly—there was a faint burning odor, but I assumed it was from an experiment. Reid was there, looking agitated.", userOption: "Agitated? Did he say anything? What about others in the lab?" },
            { bot: "He muttered something about ‘not trusting HR.’ I didn’t care to listen. Dr. Rao was there, acting all secretive—he’s always up to something.", userOption: "Did you hear any rumors or see anything else suspicious?" },
            { bot: "Rumors? Lila was spreading nonsense about a chemical spill—ridiculous. Ethan mentioned some equipment issues, but I didn’t see anything myself. This place is a mess.", userOption: null }
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
        chatData[chatId].conversation.forEach(step => {
            appendMessage('bot', step.bot, false);
            if (step.userOption) appendMessage('user', step.userOption, false);
        });
        chatOption.textContent = "Chat Ended (Offline)";
        chatOption.disabled = true;
        resetButton.style.display = 'none';
    } else {
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

    localStorage.removeItem(`chat_${currentChatId}`);
    conversationStep = 0;
    loadChat(currentChatId);
}

// Handle back button click
function handleBackClick() {
    window.location.href = 'welcome.html';
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
backButton.addEventListener('click', handleBackClick); // New event listener

// Load initial state on page load
document.addEventListener('DOMContentLoaded', () => {
    toggleChatElements(false);
});
