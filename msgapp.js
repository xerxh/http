if (navigator.serviceWorker) {
    var sendBtn = document.getElementById('send-msg-button')
    var msgInput = document.getElementById('msg-input')
    var msgBox = document.getElementById('msg-box')
    
    sendBtn.addEventListener('click', function(){
        // 主页面发送信息到serviceworker
        navigator.serviceWorker.controller.postMessage(msgInput.value)
    })
    navigator.serviceWorker.addEventListener('message', function(event){
        msgBox.innerHTML = msg.innerHTML + ('<li>' + event.data + '</li>')
    })
    navigator.serviceWorker.register('./msgsw.js', {
        scope: './'
    })
    .then((res) => {
        console.log(res)
    })
    .catch((error) => {
        console.log(error)
    })


} else {
    alert('service woorkers is not supported')
}