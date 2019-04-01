self.addEventListener('message', function(event){
    var promise = self.clients.matchAll()
    .then(function(client){
        var senderID = event.source ? event.source.id : 'unknown'
        client.forEach(function(item){
            if (item.id == senderID) {
                return
            }else{
                item.postMessage({
                    item:senderID,
                    message: event.data
                })
            }
        })
    })
    event.waitUntil(promise)
})