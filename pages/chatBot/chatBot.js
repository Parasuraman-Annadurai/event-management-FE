import { loadHeader, loadFooter } from '/utility/utility.js';

document.addEventListener("DOMContentLoaded", function() {
    // Load header and footer
    loadHeader();
    loadFooter();

    const chatboxMessages = document.getElementById("chatbox__messages");
    const chatInput = document.getElementById("chatInput");
    const sendBtn = document.getElementById("sendBtn");

    let userType = null;
    let greetedUser = false;

    // Display initial message only once
    if (!greetedUser) {
        appendMessage("bot", "Hi! Are you a customer or organizer?");
        greetedUser = true;
    }

    sendBtn.addEventListener("click", sendMessage);
    chatInput.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            sendMessage();
        }
    });

    function sendMessage() {
        const message = chatInput.value.trim();
        if (message) {
            appendMessage("customer", message);
            chatInput.value = "";
            respondToMessage(message);
        }
    }

    function appendMessage(sender, message) {
        const messageElement = document.createElement("div");
        messageElement.classList.add("message", sender);
        messageElement.innerHTML = `<p>${message}</p>`;
        chatboxMessages.appendChild(messageElement);
        chatboxMessages.scrollTop = chatboxMessages.scrollHeight;
    }

    function respondToMessage(message) {
        if (!userType) {
            if (message.toLowerCase().includes("customer")) {
                userType = "customer";
                appendMessage("bot", "Great! How can I assist you today?");
            } else if (message.toLowerCase().includes("organizer")) {
                userType = "organizer";
                appendMessage("bot", "Thank you! How can I help you with your organizing needs?");
            } else {
                appendMessage("bot", "Please specify if you are a customer or organizer.");
            }
            return;
        }

        // Handle common queries
        const commonResponses = {
            "hi": "Hello! How can I assist you today?",
            "hello": "Hi there! What can I do for you?",
            "good morning": "Good morning! How can I help you today?",
            "good afternoon": "Good afternoon! What would you like to know?",
            "good evening": "Good evening! How can I assist you?",
            "how are you": "I'm just a bot, but I'm here to help you!",
            "I love you": "Thank you, It shows how our services impressed you, I'm just a bot, but I'm here to help you!",
            "I love you too": "You're welcome! It shows how our services impressed you, How can I assist you further?",
            "love":"I'm just a bot, but I'm here to help you!,I have no feelings and no Idea about love, but we need love and support always, How can I assist you further?",
            "what's your name": "I'm the EventSpot chatbot, here to assist you with any event-related queries."
        };

        const mandatoryResponses = {
            "event": "Events are individual services like makeup, venue, catering, photoshoots, and music/DJ services. You can select specific services for your event needs.",
            "package": "Packages include all necessary event services bundled together for special occasions such as weddings, birthdays, and baby showers. This makes it easier to organize a comprehensive event.",
            "organise": "To organize an event or package, click on the respective button. You will be redirected to a form where you can add details about your service. After submission, it will be displayed on our website.",
            "payment": "Payments are ₹10,000 per month for displaying event services and ₹50,000 per month for displaying packages on our platform. If you encounter any payment issues, please contact our support team.",
            "report": "For reporting issues or complaints, please email us at support@example.com, or call us at 9629886074.",
            "doubts": "For any doubts, queries, or issues, please call us at 9629886074. Our team is here to assist you."
        };

        const sanitizedMessage = message.toLowerCase().trim();
        let response = commonResponses[sanitizedMessage] || findMatchingResponse(sanitizedMessage, mandatoryResponses);

        if (response) {
            appendMessage("bot", response);
        } else {
            appendMessage("bot", "I'm sorry, I didn't understand that.");
            offerOptions();
        }
    }

    function findMatchingResponse(message, responses) {
        const fuzzyMatches = Object.keys(responses).filter(keyword => message.includes(keyword));
        return fuzzyMatches.length > 0 ? responses[fuzzyMatches[0]] : null;
    }

    function offerOptions() {
        const options = userType === "customer" ? [
            "Report an issue",
            "Complaint against an organizer",
            "Any doubts in our services",
            "Other questions"
        ] : [
            "Report an issue",
            "Complaint against a customer",
            "Any doubts in organizing",
            "Other questions"
        ];

        appendMessage("bot", "Please select an option:");
        options.forEach(option => {
            appendMessage("bot", `<button onclick="handleOption('${option}')">${option}</button>`);
        });
    }

    window.handleOption = function(option) {
        const followUpMessages = {
            "Report an issue": "Please email us at theetshithaldckap@gmail.com to report an issue.",
            "Complaint against an organizer": "Please email us at event.spot@gmail.com to file a complaint.",
            "Any doubts in our services": "Please call us at 9629886074 for any doubts.",
            "Other questions": "Please call us at 9629886074 for any other queries.",
            "Complaint against a customer": "Please email us at theetshitha@gmail.com to file a complaint.",
            "Any doubts in organizing": "Please call us at 9994808176 for any doubts."
        };

        appendMessage("bot", followUpMessages[option]);
    }
});
