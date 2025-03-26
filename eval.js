// DOM Elements
const chatMessages = document.getElementById('chat-messages');
const optionContainer = document.getElementById('option-container');
const resetButton = document.getElementById('reset-button');
const resultDiv = document.getElementById('result');

let conversationStep = 0;
let selectedSuspects = [];

// Obfuscated correct answers using a hash function
function generateCheckValue(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash;
}

// Pre-calculated check values for correct answers (alice, charlie, edward)
const checkValues = [
  generateCheckValue('Ryan'),
  generateCheckValue('CEO'),
  generateCheckValue('Jake')
];

// Conversation flow with player options
const conversation = [
  { 
    bot: "Greetings, Detective! I’m Captain Harrison. Reid’s case has us all on edge. What’s your initial take on this mess?",
    options: [
      "It’s a tough one, Captain. I think it’s tied to Project Eclipse.",
      "Not sure yet, but something feels off about the lab reports."
    ]
  },
  { 
    bot: "Eclipse, you say? Or maybe the lab? I’ve been digging through reports—Reid was poking around where he shouldn’t have. What’s your next move?",
    options: [
      "I’ll start with the lab—something’s not right there.",
      "I want to focus on who Reid was talking to last."
    ]
  },
  { 
    bot: "Good call. The lab’s been a mess, and Reid’s contacts are all over the place. Did you hear about that odd smell everyone’s mentioning?",
    options: [
      "Yeah, I’ll check into that smell—could be a clue.",
      "No, but I’ll dig into his last conversations instead."
    ]
  },
  { 
    bot: "Alright, you’re on the right track. We’ve got 10 suspects who were around that day. I need your sharp mind to narrow it down. Ready to name your top suspects?",
    options: [
      "Absolutely, let’s get to it.",
      "Give me a moment to think, then I’ll pick."
    ]
  },
  { 
    bot: "Here’s the list, Detective. Pick 5 you think are the culprits—just click their names. I’ll trust your gut on this one:",
    suspectOptions: true 
  }
];

// Suspect list
const suspects = [
  "Alice", "Ryan ", "Jake", "Candice", "Dr.Anoop A Rao",
  "Mira D.", "Lila", "Ethan", "Dr. Priya Sharma", "Sophia Reid","CEO"
];

// Utility to scroll to bottom
function scrollToBottom() {
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Show typing indicator
function showTypingIndicator(type) {
  const typingDiv = document.createElement('div');
  typingDiv.className = 'typing-indicator';
  typingDiv.innerHTML = '<span>.</span><span>.</span><span>.</span>';
  typingDiv.style.alignSelf = type === 'user' ? 'flex-end' : 'flex-start';
  chatMessages.appendChild(typingDiv);
  scrollToBottom();
  return typingDiv;
}

// Remove typing indicator
function removeTypingIndicator(typingDiv) {
  if (typingDiv && typingDiv.parentNode) {
    chatMessages.removeChild(typingDiv);
  }
}

// Append message with typing effect
function appendMessage(type, text, callback) {
  const typingDiv = showTypingIndicator(type);
  setTimeout(() => {
    removeTypingIndicator(typingDiv);
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = text;
    chatMessages.appendChild(messageDiv);
    scrollToBottom();
    if (callback) callback();
  }, 1000); // 1-second typing delay
}

// Show conversation options
function showOptions(options) {
  optionContainer.innerHTML = '';
  options.forEach(option => {
    const button = document.createElement('button');
    button.className = 'chat-option';
    button.textContent = option;
    button.addEventListener('click', () => handleOptionClick(option));
    optionContainer.appendChild(button);
  });
  optionContainer.style.display = 'flex';
}

// Show suspect options
function showSuspectOptions() {
  optionContainer.innerHTML = '';
  suspects.forEach(suspect => {
    const button = document.createElement('button');
    button.className = 'chat-option';
    button.textContent = suspect;
    button.dataset.value = suspect.toLowerCase();
    button.addEventListener('click', () => handleSuspectSelection(button));
    optionContainer.appendChild(button);
  });
  optionContainer.style.display = 'flex';
}

// Handle regular option click
function handleOptionClick(option) {
  optionContainer.style.display = 'none';
  appendMessage('user', option, () => {
    conversationStep++;
    progressChat();
  });
}

// Handle suspect selection
function handleSuspectSelection(button) {
  const suspect = button.textContent;
  if (selectedSuspects.includes(suspect)) {
    selectedSuspects = selectedSuspects.filter(s => s !== suspect);
    button.classList.remove('selected');
  } else if (selectedSuspects.length < 5) {
    selectedSuspects.push(suspect);
    button.classList.add('selected');
  } else {
    appendMessage('bot', "Detective, you’ve already picked 5. Deselect someone if you want to change your list.");
    return;
  }

  if (selectedSuspects.length === 5) {
    optionContainer.style.display = 'none';
    sendSuspects();
  }
}

// Send selected suspects
function sendSuspects() {
  let delay = 0;
  selectedSuspects.forEach((suspect, index) => {
    setTimeout(() => {
      appendMessage('user', suspect, () => {
        if (index === selectedSuspects.length - 1) {
          evaluateSelections();
        }
      });
    }, delay);
    delay += 1200; // Staggered sending with typing effect
  });
}

// Evaluate selections
function evaluateSelections() {
  appendMessage('bot', "Let me review your picks…", () => {
    const selectedValues = selectedSuspects.map(suspect => generateCheckValue(suspect.toLowerCase()));
    let correctCount = 0;
    selectedValues.forEach(val => {
      if (checkValues.includes(val)) {
        correctCount++;
      }
    });

    setTimeout(() => {
      resultDiv.style.display = 'flex';
      if (correctCount >= 3) {
        resultDiv.style.backgroundColor = 'green';
        resultDiv.textContent = 'Great Job Detective,You Passed!'+'\n\n Call your volunteer nearby to move to next Round';
      } else {
        resultDiv.style.backgroundColor = 'red';
        resultDiv.textContent = 'Player Eliminated'+'\n\n You did not end up chooisng the correct suspects!!';
      }
    }, 1500); // Delay for dramatic effect
  });
}

// Progress chat
function progressChat() {
  if (conversationStep >= conversation.length) return;

  const step = conversation[conversationStep];
  appendMessage('bot', step.bot, () => {
    if (step.options) {
      showOptions(step.options);
    } else if (step.suspectOptions) {
      showSuspectOptions();
    }
  });
}

// Reset chat
function resetChat() {
  conversationStep = 0;
  selectedSuspects = [];
  chatMessages.innerHTML = '';
  optionContainer.innerHTML = '';
  optionContainer.style.display = 'none';
  resultDiv.style.display = 'none';
  resetButton.style.display = 'block';
  progressChat();
}

// Event Listeners
resetButton.addEventListener('click', resetChat);

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  resetButton.style.display = 'block';
  progressChat();
});