// Function to get messages from localStorage or initialize with default messages
const getMessages = () => {
  let messages = [];

  // Try to load message data from localStorage
  const storedMessages = localStorage.getItem("messages");
  if (storedMessages) {
    messages = JSON.parse(storedMessages);
  } else {
    // If no data in localStorage, use default data
    const defaultMessages = [
      "Hello World!",
      "Love is not blind!",
      "Pogi Ako",
      "BoomPanet",
      "Wassup",
      "Pogi Mo Sir!",
    ];
    messages = defaultMessages.map((msg, index) => {
      const otp = generateOTP(msg.length);
      return {
        id: index + 1,
        username: `user${index + 1}`,
        message: otpEncryptCipher(msg, otp),
        otp: otp,
        date: new Date(),
      };
    });
    localStorage.setItem("messages", JSON.stringify(messages));
  }

  return messages;
};

// Function to get users from localStorage or initialize with default users
const getMessagesById = (id) => {
  const messages = getMessages();
  const message = messages.find((message) => message.id === id);
  return message;
};

// Function to insert a new message
const insertMessage = (newMessage) => {
  const messages = getMessages();
  messages.push(newMessage);
  localStorage.setItem("messages", JSON.stringify(messages));
};

// Function to update a message
const updateMessage = (updatedMessage, id) => {
  let messages = getMessages();
  const message = messages.find((message) => message.id === id);

  const updatedMsg = {
    ...message,
    message: updatedMessage,
  };

  localStorage.setItem(
    "messages",
    JSON.stringify([
      ...messages.filter((message) => message.id !== id),
      updatedMsg,
    ])
  );

  const newMsgs = JSON.parse(localStorage.getItem("messages"));

  messages = newMsgs.map((msg) => {
    const otp = generateOTP(msg.message.length);
    if (msg.id === id) {
      return {
        ...msg,
        message: otpEncryptCipher(updatedMessage, otp),
        otp,
      };
    } else {
      return msg;
    }
  });

  localStorage.setItem("messages", JSON.stringify(messages));
};

// Function to delete a message
const deleteMessage = (messageId) => {
  if (!confirm("Are you sure you want to delete this message?")) return;

  const messages = getMessages();
  const messageIndex = messages.findIndex(
    (message) => message.id === messageId
  );
  messages.splice(messageIndex, 1);
  localStorage.setItem("messages", JSON.stringify(messages));
  displayMessages();
};

const displayMessages = () => {
  const messages = getMessages();
  const messageContainer = document.querySelector(".message-container");
  messageContainer.innerHTML = messages
    .map(
      (message) => `
        <tr>
            <td>${message.id}</td>
            <td>${message.username}</td>
            <td>${message.message}</td>
            <td>${message.otp}</td>
            <td>${DateFormat(message.date)}</td>
            <td>
                <button class="open-button" data-id="${
                  message.id
                }">View</button>
                <button class="edit-button" data-id="${
                  message.id
                }">Edit</button>
                <button class="delete-button" data-id="${
                  message.id
                }" onclick="deleteMessage(${message.id})">Delete</button>
            </td>
        </tr>
    `
    )
    .join("");
};

const displayMessage = (messageId) => {
  const message = getMessagesById(messageId);
  console.log(message);
  const messageContainer = document.querySelector(".message-container");
  messageContainer.innerHTML = `
       <div class="message">
           <h2>Ciphered Message: ${message.message}</h2>
           <p>Message By: ${message.username}</p>
           <p>OTP: ${message.otp}</p>
           <p>Date: ${DateFormat(message.date)}</p>
           <strong>Open the message to decrypt</strong>
           <div class="button-container">
                <button class="open-button" id="decrypt-button" data-id="${
                  message.id
                }">Unlock Message</button>
                <button class="close-button">Close</button>
           </div>
       </div>
    `;
};

const DateFormat = (date) => {
  const newDate = new Date(date);
  const dateFormat =
    newDate.toLocaleString("default", { month: "short" }) +
    " " +
    newDate.getDate() +
    " " +
    newDate.getFullYear();
  return dateFormat;
};
