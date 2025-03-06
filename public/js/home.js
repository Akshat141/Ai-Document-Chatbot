const typingText = document.getElementById('typing-text');
const text = typingText.getAttribute('data-text');
let index = 0;
const sendbtn = document.querySelector(".send")
const chatContainer = document.querySelector(".chat-container")

function typeLetter() {
  if (index < text.length) {
    typingText.innerHTML = text.substring(0, index + 1);
    index++;
    setTimeout(() => requestAnimationFrame(typeLetter), 80);
  }
}

typingText.innerHTML = '';
requestAnimationFrame(typeLetter);

sendbtn.addEventListener("click",function(event){
  event.preventDefault();
  
})

async function sendMessage() {
  let userInput = document.querySelector("#user-input").value
  let chatBox =  document.querySelector("#chat-box")
if(userInput === ""){
       alert("Write some thing")
       typingText.style.display="none"
   }else{
       let userMessage = document.createElement("div")
  userMessage.classList.add("message","user")
  userMessage.innerHTML = `<p>${userInput}</p>`
  chatBox.appendChild(userMessage)
  document.querySelector("#user-input").value = ""
  chatBox.scrollTop = chatBox.scrollHeight;

  typingText.style.display="none"

  let response = await fetch("http://localhost:5000/chat", {
   method: "POST",
   headers: { "Content-Type": "application/json" },
   body: JSON.stringify({ message: userInput })
});

   let data = await response.json(); 
   let botMessage = document.createElement("div")
   botMessage.classList.add("message","bot")  
   botMessage.innerHTML = `<p>${data.replay}</p>`
   chatBox.appendChild(botMessage)
   chatBox.scrollTop = chatBox.scrollHeight;
   }
}
function uploadFile() {
   let fileInput = document.getElementById("file-input");
   let file = fileInput.files[0];
   if (file) {
       alert("File uploaded: " + file.name);
   }
}
