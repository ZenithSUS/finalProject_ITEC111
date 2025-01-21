// Global variables
let currentPage = 1;
const pageSize = 5;
const totalPages = () => Math.ceil(getMessages().length / pageSize);
const prevPage = document.getElementById('prev-page');
const nextPage = document.getElementById('next-page');

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

  // Update the message
  localStorage.setItem(
    "messages",
    JSON.stringify([
      ...messages.filter((message) => message.id !== id),
      updatedMsg,
    ])
  );

  // Get the updated messages
  const newMsgs = JSON.parse(localStorage.getItem("messages"));

  // Update the OTP for the updated message
  messages = newMsgs.map((msg) => {
    // If the message is the updated message, update the OTP
    if (msg.id === id) {
    // Generate a new OTP
    const otp = generateOTP(msg.message.length);
      return {
        ...msg,
        message: otpEncryptCipher(updatedMessage, otp),
        otp,
        date: new Date(),
      };
    // If the message is not the updated message, return it as is
    } else {
      return msg;
    }
  });

  localStorage.setItem("messages", JSON.stringify(messages));
};

// Function to delete a message
const deleteMessage = (messageId) => {
  const messages = getMessages();
  // Get the index of the message
  const messageIndex = messages.findIndex((message) => message.id === messageId);
  console.log(messageIndex);
  // Delete the message base on the id
  messages.splice(messageIndex, 1);
  localStorage.setItem("messages", JSON.stringify(messages));
  checkPage();
  displayMessages(currentPage);
};

// Function to display messages
const displayMessages = (page = 1) => {
  const messages = getPaginatedMessages(page, pageSize);
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
              <div class="button-options">
                <button class="view-button" data-id="${message.id}">View</button>
                <button class="edit-button" data-id="${message.id}">Edit</button>
                <button class="delete-button" data-id="${message.id}">Delete</button>
              </div>
            </td>
        </tr>
    `
    )
    .join("");

  document.getElementById('page-info').innerText = `Page ${page } of ${totalPages()}`;
};

// Function to display a single message
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
           <strong style="text-align: center;">Open the message to decrypt</strong>
           <div class="button-container">
                <button class="open-button" id="decrypt-button" data-id="${
                  message.id
                }">Unlock Message</button>
                <button class="close-button">Close</button>
           </div>
       </div>
    `;
};

// Function to format date
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


// Function to add a new message
const addMessage = (message) => {
  const otp = generateOTP(message.length);
  const newMessage = {
    id: getMessages().length + 1,
    username: JSON.parse(localStorage.getItem("userInfo")).username,
    message: otpEncryptCipher(message, otp),
    otp,
    date: new Date(),
  };
  insertMessage(newMessage);
  checkPage(currentPage);
  displayMessages(currentPage);
};

// Function to sort messages by id 
const sortMessagesById = () => {
  const messages = getMessages();
  messages.sort((a, b) => a.id - b.id);
  localStorage.setItem("messages", JSON.stringify(messages));
  currentPage = 1;
  checkPage();
  displayMessages(currentPage);
};

// Function to sort messages by date
const sortMessagesByDate = () => {
  const messages = getMessages();
  messages.sort((a, b) => new Date(b.date) - new Date(a.date));
  localStorage.setItem("messages", JSON.stringify(messages));
  currentPage = 1;
  checkPage();
  displayMessages(currentPage);
};

// Function to sort messages by username
const sortMessagesByUsername = () => {
  const messages = getMessages();
  messages.sort((a, b) => a.username.localeCompare(b.username));
  localStorage.setItem("messages", JSON.stringify(messages));
  currentPage = 1;
  checkPage();
  displayMessages(currentPage);
};

const sortMessagesByCipheredMessage = () => {
    const messages = getMessages();
    messages.sort((a, b) => b.message.length - a.message.length);
    localStorage.setItem("messages", JSON.stringify(messages));
    currentPage = 1;
    checkPage();
    displayMessages(currentPage);
}

// Function to get paginated messages
const getPaginatedMessages = (page = 1, pageSize = 5) => {
  const messages = getMessages();
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  return messages.slice(start, end);
};

const checkPage = (currentPage = 1) => {
  currentPage === 1 ? prevPage.disabled = true : prevPage.disabled = false;
  currentPage === totalPages() ? nextPage.disabled = true : nextPage.disabled = false;
}

checkPage(currentPage);