

const socket = io();

$('#chat-box').hide().hide();

$('#send-btn').on('click' , ()=>{
    const msgText = $('#inp').val();
    // console.log(msgText)
    if(!msgText){
        return
    }
    else{
        socket.emit('Send-msg' , {
            msg:msgText
        })
    }

    $('#inp').val("")
})

socket.on('recive-msg', (data)=>{
    console.log(data);
    $('#chat').append(`<li class="border mb-2 p-2 rounded-pill"> <span class="fw-bold">${data.username}</span> -> ${data.msg}</li>`)
})

$('#login-btn').on('click' , ()=>{
    // console.log('clicked');
    const username = $('#username').val();

    socket.emit('login' , {
        username:username
    })

    $('#login').hide().hide();
    $('#chat-box').hide().show();
    $('#username').val("")
})