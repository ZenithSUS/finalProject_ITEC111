document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const messageId = parseInt(urlParams.get("id"));

  if (isNaN(messageId)) {
    window.location.href = `index.html`;
  }

  displayMessage(messageId);

  const editInput = document.querySelector("#edit-message");
  const editSection = document.querySelector("#edit-section");

  // Close the message
  document.querySelector(".close-button").addEventListener("click", () => {
    window.location.href = `index.html`;
  });

  // Open the decryption modal
  document.querySelector("#decrypt-button").addEventListener("click", () => {
    document.getElementById("decrypt-modal").style.display = "block";
    editSection.style.display = "none";
  });

  console.log(messageId);

  // Add an event when the user press enter in editing message
  document.querySelector("#edit-section").addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      document.querySelector("#edit-section #edit-button").click();
    }
  });

  // Edit the message
  document.querySelector("#edit-button").addEventListener("click", () => {
    const message = getMessagesById(messageId);
    if(otpDecryptCipher(message.message, message.otp) === editInput.value) {
      showMesage("Message is the same as before!");
      return;
    }

    updateMessage(editInput.value, messageId);
    window.location.href = `index.html?message=Message updated successfully`;
  });

  // Add an event when the user press enter in unlocking message
  document.querySelector("#decrypt-modal").addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      document.querySelector("#decrypt-modal #decrypt-button").click();
    }
  });

  // Decrypt the message
  document
    .querySelector("#decrypt-modal #decrypt-button")
    .addEventListener("click", () => {
      const otp = document.getElementById("otp").value.trim();
      const message = getMessagesById(messageId);
      if (otp !== message.otp) {
        showMesage("Wrong OTP");
        return;
      }
      document.querySelector("#decrypt-modal").style.display = "none";
      document.getElementById("otp").value = "";
      editSection.style.display = "block";
      const decryptedMessage = otpDecryptCipher(message.message, otp);
      editInput.value = decryptedMessage;
      updateMessage(decryptedMessage, messageId);

      const newMessage = getMessagesById(messageId);
      document.getElementById("message-text").innerHTML = `Ciphered Message: ${newMessage.message}`;
      document.getElementById("otp-text").innerHTML = `OTP: ${newMessage.otp}`;
    });

  // Close the modal in decryption process
  document
    .querySelector("#decrypt-modal #close-button")
    .addEventListener("click", () => {
      document.getElementById("decrypt-modal").style.display = "none";
      document.getElementById("otp").value = "";
    });
});
