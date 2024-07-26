(function(){

    const app = document.querySelector(".app");
    const socket = io();

    let uname;

    // Function to send message
    function sendMessage() {
        let message = app.querySelector(".chat-screen #message-input").value;
        if(message.length  == 0){
            return;
        }
        renderMessage("my",{
            username:uname,
            text:message
        });
        socket.emit("chat",{
            username:uname,
            text:message
        });
        app.querySelector(".chat-screen #message-input").value = "";
    }

    // Event listener for "Join" button
    app.querySelector(".join-screen #join-user").addEventListener("click",function(){
        let username = app.querySelector(".join-screen #username").value;
        if(username.length == 0){
            return;
        }
        socket.emit("newuser",username);
        uname = username;
        app.querySelector(".join-screen").classList.remove("active");
        app.querySelector(".chat-screen").classList.add("active");
    });

    // Event listener for "Send" button
    app.querySelector(".chat-screen #send-message").addEventListener("click", sendMessage);

    // Event listener for "Enter" key press
    app.querySelector(".chat-screen #message-input").addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            sendMessage();
        }
    });

    // Event listener for "Exit" button
    app.querySelector(".chat-screen #exit-chat").addEventListener("click",function(){
        socket.emit("exituser",uname);
        window.location.href = window.location.href;
    });

    socket.on("update",function(update){
        renderMessage("update",update);
    });
    
    socket.on("chat",function(message){
        renderMessage("other",message);
    });

    function renderMessage(type,message){
        let messageContainer = app.querySelector(".chat-screen .messages");
        if(type == "my"){
            let el = document.createElement("div");
            el.setAttribute("class","message my-message");
            el.innerHTML = `
                <div>
                    <div class="name">You</div>
                    <div class="text">${message.text}</div>
                </div>
            `;
            messageContainer.appendChild(el);
        } else if(type == "other"){
            let el = document.createElement("div");
            el.setAttribute("class","message other-message");
            el.innerHTML = `
                <div>
                    <div class="name">${message.username}</div>
                    <div class="text">${message.text}</div>
                </div>
            `;
            messageContainer.appendChild(el);
        } else if(type == "update"){
            let el = document.createElement("div");
            el.setAttribute("class","update");
            el.innerText = message;
            messageContainer.appendChild(el);
        }
        // scroll chat to end
        messageContainer.scrollTop = messageContainer.scrollHeight - messageContainer.clientHeight;
    }

    // Responsive view for mobile
    function checkViewport() {
        if (window.innerWidth < 768) {
            app.classList.add("mobile-view");
        } else {
            app.classList.remove("mobile-view");
        }
    }

    // Check viewport on load and resize
    window.addEventListener("load", checkViewport);
    window.addEventListener("resize", checkViewport);

})();
