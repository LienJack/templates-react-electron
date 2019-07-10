// document.documentElement.style.fontSize = document.body.clientWidth / 7.5 + 'px'
changeFontSize()
window.onresize = function () {
    // document.documentElement.style.fontSize = document.body.clientWidth / 7.5 + 'px' 
    changeFontSize()
}
function changeFontSize () {
    let clientWidth = document.getElementsByTagName("html")[0].getBoundingClientRect().width
    document.documentElement.style.fontSize = clientWidth / 7.5 + 'px' 
}