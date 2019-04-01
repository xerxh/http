if (navigator.serviceWorker) {
    navigator.serviceWorker.register('./service-worker.js', {
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