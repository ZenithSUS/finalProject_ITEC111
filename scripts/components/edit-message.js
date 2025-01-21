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
  });

  console.log(messageId);

  document.querySelector("#edit-button").addEventListener("click", () => {
    const message = getMessagesById(messageId);
    if(otpDecryptCipher(message.message, message.otp) === editInput.value) {
      showMesage("Message is the same as before!");
      return;
    }

    updateMessage(editInput.value, messageId);
    window.location.href = `index.html?message=Message updated successfully`;
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
      editSection.style.display = "block";
      const decryptedMessage = otpDecryptCipher(message.message, otp);
      editInput.value = decryptedMessage;
      // showMesage(`Decrypted Message: ${decryptedMessage}`);
    });

  // Close the modal in decryption process
  document
    .querySelector("#decrypt-modal #close-button")
    .addEventListener("click", () => {
      document.getElementById("decrypt-modal").style.display = "none";
      document.getElementById("otp").value = "";
    });
});
