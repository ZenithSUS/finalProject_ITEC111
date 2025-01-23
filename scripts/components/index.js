document.addEventListener("DOMContentLoaded", () => {

  // Add event listener to next and previous page buttons
  nextPage.addEventListener("click", () => changePage(1));
  prevPage.addEventListener("click", () => changePage(-1));

  // Display messages on page load
  displayMessages(1);

  // Add event listener to add message button
  document.querySelector("#add-message").addEventListener("click", () => {
    document.querySelector(".add-message-modal").style.display = "block";
  });


  // If the user clicks enter, add the message
  document.querySelector("#addMessageForm").addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      document.querySelector("#confirm-message-button").click();
    }
  });

  // Add event listener to add confirm button
  document.querySelector("#confirm-message-button").addEventListener("click", (e) => {
    e.preventDefault();
    const message = document.getElementById("message").value.trim();

    if(message === "") {
      document.getElementById('message-error').innerHTML = 'Message cannot be empty!';
      return;
    }


    showMesage("Message added successfully");
    addMessage(message);
    document.getElementById("message").value = "";
    document.querySelector(".add-message-modal").style.display = "none";
    messageOptions();
  })

  // Add event listener to cancel add message button
  document.querySelector("#cancel-message-button").addEventListener("click", () => {
      document.getElementById("message").value = "";
      document.getElementById('message-error').innerHTML = '';
      document.querySelector(".add-message-modal").style.display = "none";
    });

  // Add event listener to change message input
  document.querySelector("#message").addEventListener("input", () => {
    document.getElementById('message-error').innerHTML = '';
  });

  // Add event listener to sort messages by id
  document.querySelector("#sort-by-id").addEventListener("click", () => {
    sortMessagesById();
    messageOptions();
  });

  // Add event listener to sort messages by date
  document.querySelector("#sort-by-date").addEventListener("click", () => {
    sortMessagesByDate();
    messageOptions();
  });

  // Add event listener to sort messages by username
  document.querySelector("#sort-by-username").addEventListener("click", () => {
    sortMessagesByUsername();
    messageOptions();
  });

  // Add event listener to sort messages by ciphered message
  document.querySelector("#sort-by-ciphered").addEventListener("click", () => {
    sortMessagesByCipheredMessage();
    messageOptions();
  });

  messageOptions();
});

// Add event listener to view messages button
function messageOptions() {
  const viewMessagesButton = document.querySelectorAll(".view-button");
  
  if (viewMessagesButton) {
    viewMessagesButton.forEach((button) =>
      button.addEventListener("click", () => {
        const messageId = button.getAttribute("data-id");
        window.location.href = `message.html?id=${messageId}`;
      })
    );
  }

  const editMessageButton = document.querySelectorAll(".edit-button");

  if (editMessageButton) {
    editMessageButton.forEach((button) =>
        button.addEventListener("click", () => {
          const messageId = button.getAttribute("data-id");
          window.location.href = `edit.html?id=${messageId}`;
        })
      );
    }

    const deleteMessageButton = document.querySelectorAll(".delete-button");

    if (deleteMessageButton) {
        deleteMessageButton.forEach((button) =>
          button.addEventListener("click", () => {
            if(!confirm("Are you sure you want to delete this message?")) return;
              
            showMesage("Message deleted successfully");
            const messageId = parseInt(button.getAttribute("data-id"));
            deleteMessage(messageId);
            messageOptions();
          })
        );
      }
    
      
  }

const changePage = (direction) => {
  currentPage += direction;

  checkPage(currentPage);
  displayMessages(currentPage);
  messageOptions();
};




