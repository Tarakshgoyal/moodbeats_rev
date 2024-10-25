// Get modal elements and buttons
const chatbotPopup = document.getElementById('chatbot-popup');
const openChatbotBtn = document.getElementById('open-chatbot-btn');
const closeChatbotBtn = document.getElementById('close-chatbot-btn');
const messagesDiv = document.getElementById('messages');
const chatInput = document.getElementById('chat-input');
const sendBtn = document.getElementById('send-btn');

// Open chatbot modal with animation
openChatbotBtn.onclick = function() {
    chatbotPopup.style.display = 'flex'; // Make the modal visible
    setTimeout(() => {
        chatbotPopup.style.opacity = '1'; // Apply fade-in effect
    }, 10); // Delay added for smooth transition
};


// Close chatbot modal
closeChatbotBtn.onclick = function() {
    chatbotPopup.style.opacity = '0'; // Start fade-out
    setTimeout(() => {
        chatbotPopup.style.display = 'none'; // Hide the modal after fade-out completes
    }, 400); // Ensure this matches the CSS transition timing
};

// Close modal when clicking outside content
window.onclick = function(event) {
    if (event.target === chatbotPopup) {
        chatbotPopup.style.opacity = '0'; // Start fade-out when clicking outside
        setTimeout(() => {
            chatbotPopup.style.display = 'none'; // Hide the modal after fade-out
        }, 400); // Match the transition timing
    }
};
// Send button functionality
sendBtn.onclick = async function() {
    const userMessage = chatInput.value;
    if (userMessage.trim() !== '') {
        displayMessage('You', userMessage);
        chatInput.value = ''; // Clear input field

        try {
            const response = await fetch('/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ query: userMessage }),
            });

            const data = await response.json();
            displayMessage('Sonify', data.botMessage);
            if (data.playlist && data.playlist.length) {
                displayMessage('Sonify', `Here are some songs for you: ${data.playlist.join(', ')}`);
            }
        } catch (error) {
            displayMessage('Sonify', 'Sorry, something went wrong. Please try again later.');
        }
    }
};

// Function to display messages
function displayMessage(sender, message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = sender === 'You' ? 'user-message' : 'bot-message';
    messageDiv.textContent = `${sender}: ${message}`;
    messagesDiv.appendChild(messageDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight; // Scroll to the bottom
}

// Optional: Handle 'Enter' key for sending messages
chatInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        sendBtn.click(); // Trigger the send button click
    }
});