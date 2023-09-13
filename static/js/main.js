//variables
let chatName = ''
let chatSocket = null
let chatWindowUrl = window.location.href
let chatRoomUuid = Math.random().toString(36).slice(2, 12)
const chatElement = document.querySelector('#chat')
var hasAlreadyJoined = false


//Elements
const chatOpenElement = document.querySelector('#chat_open')
const joinWindowClose = document.querySelector('#chat_join_close.window-close')
const chatWindowClose = document.querySelector('#chat_message_close')

const chatJoinElement = document.querySelector('#chat_join')

const chatIconElement = document.querySelector('#chat_icon')
const chatWelcomeElement =
    document.querySelector('#chat_welcome')

const chatRoomElement = document.querySelector("#chat_room")


const chatNameElement = document.querySelector('#chat_name')

const chatLogElement = document.querySelector('#chat_log')

const chatInputElement = document.querySelector('#chat_message_input')

const chatSubmitElement = document.querySelector('#chat_message_submit')


// Functions

function scrollToBottom() {
    chatLogElement.scrollTop = chatLogElement.scrollHeight
}

function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

function sendMessage() {
    chatSocket.send(JSON.stringify({
        'type': 'message',
        'message': chatInputElement.value,
        "name": chatNameElement.value
    }))

    chatInputElement.value = ''
}


function onChatMessage(data) {
    if (data.type == 'chat_message') {
        let tmpInfo = document.querySelector('.tmp-info')
        if (tmpInfo) {
            tmpInfo.remove()
        }

        if (data.agent) {
            chatLogElement.innerHTML += `
            <div class = "flex w-full mt-2 space-x-3 max-w-md text-cyan-200">
                <div class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300 text-center pt-2">
                     ${data.initials} 
                </div>    
                <div> 
                    <div class="bg-gray-300 p-3 rounded-l-lg rounded-br-lg"> 
                        <p class="text-sm">${data.message}
                        </p> 
                    </div>  
                    <span class="text-xs text-gray-500 leading-none"> ${data.created_at} ago </span>
                </div>   
            </div>
            `
        } else {
            chatLogElement.innerHTML += `
            <div class = "flex w-full mt-2 space-x-3 max-w-md ml-auto justify-end">
                <div> 
                    <div class="bg-blue-300 p-3 rounded-lg rounded-br-lg"> 
                        <p class="text-sm">${data.message}
                        </p> 
                    </div>  
                    <span class="teext-xs text-gray-500 leading-none"> ${data.created_at} ago </span>
                </div> 
                <div class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300 text-center pt-2">Me 
            </div>  
            </div>
            `
        }

    } else if (data.type == 'users_update') {
        chatLogElement.innerHTML += '<p class="mt-2">The Admin/agent has joined the chat !'
    } else if (data.type == 'writing_active') {
        if (data.agent) {
            let tmpInfo = document.querySelector('.tmp-info')
            if (tmpInfo) {
                tmpInfo.remove()
            }
            chatLogElement.innerHTML += `
            <div class = "tmp-info flex w-full mt-2 space-x-3 max-w-md text-cyan-200">
                <div class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300 text-center pt-2">
                     ${data.initials} 
                </div>    
                <div> 
                    <div class="bg-gray-300 p-3 rounded-l-lg rounded-br-lg"> 
                        <p class="text-sm">The Admin is writing ...
                        </p>
                    </div>  
                </div>   
            </div>
            `
        }
    }
    scrollToBottom()
}

async function joinChatRoom() {
    var chatName = chatNameElement.value;
    var data = new FormData();
    data.append('name', chatName);
    data.append('url', chatWindowUrl);

    await fetch(`/chat/api/create-room/${chatRoomUuid}/`, {
            method: 'POST',
            headers: {
                'X-CSRFToken': getCookie('csrftoken')
            },
            body: data
        })
        .then(function(response) {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(function(data) {
            console.log('data', data);
            // Handle the response data as needed
        })
        .catch(function(error) {
            console.error('Error:', error);
        });

    chatSocket = new WebSocket(`ws://${window.location.host}/ws/chat/${chatRoomUuid}/`)

    chatSocket.onmessage = function(e) {
        console.log('onMessage')
        onChatMessage(JSON.parse(e.data))
    }

    chatSocket.onopen = function(e) {
        console.log('onOpen - chat was opened')
        scrollToBottom()
    }

    chatSocket.onclose = function(e) {
        console.log('onClose - chat socket was closed')
    }

}

//Event listeners
chatOpenElement.onclick = function(e) {
    e.preventDefault() 
    if (hasAlreadyJoined == false) {
        chatIconElement.classList.add('hidden')
        chatWelcomeElement.classList.remove('hidden') 
        hasAlreadyJoined = true
    }else{
        chatIconElement.classList.add('hidden')
        chatRoomElement.classList.remove('hidden')
    }
    
    return false
}

joinWindowClose.onclick = function(e){
    e.preventDefault()
    chatWelcomeElement.classList.add('hidden') 
    chatIconElement.classList.remove('hidden')
}

chatWindowClose.onclick = function(e) {
    e.preventDefault()
    chatRoomElement.classList.add('hidden')
    chatIconElement.classList.remove('hidden')
}



chatJoinElement.onclick = function(e) {
    e.preventDefault()

    chatWelcomeElement.classList.add('hidden')
    chatRoomElement.classList.remove('hidden')
    joinChatRoom()
    return false
}

chatSubmitElement.onclick = function(e) {
    e.preventDefault()
    sendMessage()
    return false
}

chatInputElement.onkeyup = function(e) {
    if (e.keyCode == 13) {
        sendMessage()
    }
}

chatInputElement.onfocus = function(e) {
    chatSocket.send(JSON.stringify({
        'type': 'update',
        'message': 'writing_active',
        'name': chatName,
    }))
}


    const chat_message_file_input = document.querySelector('#chat_message_file_input')  
    const selectedFileName = document.querySelector('#selected_file_name'); 

    chat_message_file_input.addEventListener('change', function() {
    const file = chat_message_file_input.files[0];
        console.log(chat_message_file_input)
        console.log(selectedFileName)
    if (file) {
      selectedFileName.textContent = file.name;
    } else {
      selectedFileName.textContent = '';
    }
  });