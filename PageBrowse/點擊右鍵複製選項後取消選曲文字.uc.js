document.querySelector("#context-copy").addEventListener('click', function (event){
setTimeout('content.document.getSelection().removeAllRanges();',100);
    },false);