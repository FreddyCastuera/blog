
function getKeyFromURL(){
    let data = document.URL.slice(document.URL.indexOf("?")+1)
    key = data.slice((data.indexOf('=')+1));
    return key;
}
const bringPost = (key) => {
    const endpoint = `https://apikoder-b2ce0-default-rtdb.firebaseio.com/jorge/posts/${key}/.json`;
    // Preparando el payload
    // Creando el objeto
    var xhttp = new XMLHttpRequest();
    // Configurando qué va a pasar cuando recibamos respuesta
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let respuesta = JSON.parse(xhttp.responseText);
            console.log(respuesta);
            createPost(respuesta.title,respuesta.body);
        }

    };
    // Configurar el verbo, la dirección
    xhttp.open("GET", endpoint, true);
    // Enviar la solicitud
    xhttp.send();
}
function createPost(title,body){
    let titulo = document.getElementById("post-title");
    let cuerpo = document.getElementById("post-content");
    titulo.textContent = title;
    cuerpo.textContent = body;
}

(function(){
    bringPost(getKeyFromURL())
})()
