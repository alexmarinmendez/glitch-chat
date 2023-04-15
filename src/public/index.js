 
    let socket
    let user = ''
    let chatBox = document.getElementById('chatBox')

Swal.fire({
    title: 'Chat de Coder',
    input: 'text',
    text: 'Set your username for the chat',
    inputValidator: value => {
        return !value.trim() && 'Please write a username'
    },
    allowOutsideClick: false
})
    .then(result => {
        user = result.value
        document.getElementById('username').innerHTML = user
        socket = io()
  

    chatBox.addEventListener('keyup', evt => {
        if (evt.key == "Enter")  {
            if (chatBox.value.trim().length > 0) {
                socket.emit('message', {
                    user,
                    message: chatBox.value
                })

            }
            chatBox.value = ""
            }
        })

    socket.on('history', data => {
    let history = document.getElementById('history')
    let messages = ''
    data.reverse().forEach(item => {
            messages+= `<p>[<i>${item.user}</i>] dice: ${item.message}<br />`
        })
        history.innerHTML = messages
    })

})