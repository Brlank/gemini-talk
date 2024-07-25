// public/script.js
document.getElementById('send-button').addEventListener('click', sendMessage);
document.getElementById('chat-input').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        sendMessage();
    }
});

async function sendMessage() {
    const input = document.getElementById('chat-input');
    const message = input.value;
    if (message.trim() === '') return;

    appendMessage('user', message);
    input.value = '';

    try {
        const response = await fetch('/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message })
        });

        if (response.ok) {
            const data = await response.json();
            appendMessage('bot', data.reply);
        } else {
            appendMessage('bot', 'Error: Unable to get response.');
        }
    } catch (error) {
        appendMessage('bot', 'Error: Network issue.');
    }
}

function appendMessage(sender, message) {
    const chatBox = document.getElementById('chat-box');
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', sender);

    const contentElement = document.createElement('div');
    contentElement.classList.add('content');
    contentElement.textContent = message;

    const timeElement = document.createElement('div');
    timeElement.classList.add('time');
    timeElement.textContent = new Date().toLocaleTimeString();

    messageElement.appendChild(contentElement);
    messageElement.appendChild(timeElement);
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}
