// DOM Elements
const chatMessages = document.getElementById('chat-messages');
const optionContainer = document.getElementById('option-container');
const resetButton = document.getElementById('reset-button');
const resultDiv = document.getElementById('result');

let conversationStep = 0;
let selectedSuspects = [];

localStorage.setItem('evalauth', 'true');

function generateCheckValue(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash = hash & hash; 
  }
  return hash;
}

const checkValues = [
  generateCheckValue(atob("amFrZQ==")),
  generateCheckValue(atob("cnlhbg==")),
  generateCheckValue(atob("Y2Vv"))
];

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
  "Jake", "Lila", "Mira D.", "Ethan", "Candice",
  "Ryan", "Dr.Anoop", "Dr. Priya", "CEO", "Harley"
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

    const playerName = localStorage.getItem('playerName') || 'Unknown'; // Use playerName instead of playerId
    const submissionTime = new Date().toLocaleString(); // Current date and time
    const status = correctCount >= 3 ? 'Pass' : 'Fail';

    setTimeout(() => {
      resultDiv.style.display = 'flex';
      resultDiv.innerHTML = ''; // Clear previous content
      resultDiv.classList.remove('eliminated', 'passed');

      if (correctCount >= 3) {
        resultDiv.classList.add('passed');
        resultDiv.innerHTML = `
          You Passed! Good Job Detective<br>
          Name: ${playerName}<br>
          Submitted: ${submissionTime}
        `;
      } else {
        resultDiv.classList.add('eliminated');
        resultDiv.innerHTML = `
          Player Eliminated<br>
          Name: ${playerName}<br>
          Submitted: ${submissionTime}
        `;
      }

      // Save to Google Spreadsheet with playerName instead of playerId
      saveToGoogleSpreadsheet(playerName, submissionTime, status, selectedSuspects);
    }, 1500); // Delay for dramatic effect
  });
}

// Function to save data to Google Spreadsheet
function saveToGoogleSpreadsheet(playerName, submissionTime, status, selectedSuspects) {
  const data = {
    playerName: playerName, // Changed from playerId to playerName
    submissionTime: submissionTime,
    status: status,
    suspect1: selectedSuspects[0] || '',
    suspect2: selectedSuspects[1] || '',
    suspect3: selectedSuspects[2] || '',
    suspect4: selectedSuspects[3] || '',
    suspect5: selectedSuspects[4] || ''
  };

  fetch('https://script.google.com/macros/s/AKfycbyKaTAwzIz6OjZ5CWqFvYYcAVGQ2q_3FI9o78gbqWqdYhTA5yOOTfEvsZ2A0oVurR_t0Q/exec', {
    method: 'POST',
    mode: 'no-cors', // Required for Google Apps Script due to CORS limitations
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(() => console.log('Data sent to Google Spreadsheet'))
  .catch(error => console.error('Error saving to spreadsheet:', error));
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
  resultDiv.className = ''; // Reset class
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
