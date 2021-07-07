
const savePost = (title, body) => {
    const endpoint = "https://apikoder-b2ce0-default-rtdb.firebaseio.com/jorge/posts/.json";

    // Preparando el payload
    const postObject = {title:title, body:body,comments:['clave_inicial']}
    const postString = JSON.stringify(postObject)
    console.log(postString);
    // Creando el objeto
    var xhttp = new XMLHttpRequest();
    // Configurando qué va a pasar cuando recibamos respuesta
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            const respuesta = xhttp.responseText;
            console.log(respuesta)
        }
    };
    // Configurar el verbo, la dirección
    xhttp.open("POST", endpoint, true);
    // Enviar la solicitud
    xhttp.send(postString);
}

const deletePost = (key) => {
    const endpoint = `https://apikoder-b2ce0-default-rtdb.firebaseio.com/jorge/posts/${key}/.json`;
    // Preparando el payload
    // Creando el objeto
    var xhttp = new XMLHttpRequest();
    // Configurando qué va a pasar cuando recibamos respuesta
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            const respuesta = xhttp.responseText;
            console.log(respuesta)
        }
    };
    // Configurar el verbo, la dirección
    xhttp.open("DELETE", endpoint, true);
    // Enviar la solicitud
    xhttp.send();
}

const bringAllPosts = () => {
    const endpoint = `https://apikoder-b2ce0-default-rtdb.firebaseio.com/jorge/posts/.json`;
    // Preparando el payload
    // Creando el objeto
    var xhttp = new XMLHttpRequest();
    // Configurando qué va a pasar cuando recibamos respuesta
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let respuesta = JSON.parse(xhttp.responseText);
            if(respuesta != null){
                let arrayRespuestas = Object.entries(respuesta);
                console.log(arrayRespuestas);
                let padre = document.querySelector(".cards-father");
                padre.innerHTML="";
                arrayRespuestas.forEach(item=>{
                padre.innerHTML+=createCard(item[0],item[1].title,item[1].body);
                })
            }
        }
    };
    // Configurar el verbo, la dirección
    xhttp.open("GET", endpoint, true);
    // Enviar la solicitud
    xhttp.send();
}

const updatePost = (key,post) => {
    const endpoint = `https://apikoder-b2ce0-default-rtdb.firebaseio.com/jorge/posts/${key}/.json`;
    // Preparando el payload
    // Creando el objeto
    var xhttp = new XMLHttpRequest();
    // Configurando qué va a pasar cuando recibamos respuesta
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            const respuesta = JSON.parse(xhttp.responseText);
            console.log(respuesta)
            return respuesta;
        }
    };
    // Configurar el verbo, la dirección
    xhttp.open("PATCH", endpoint, true);
    // Enviar la solicitud
    xhttp.send(post);
}


const saveComment = (keyPost,person,body) => {
    const endpoint = `https://apikoder-b2ce0-default-rtdb.firebaseio.com/jorge/comments/.json`;
    // Preparando el payload
    const commentObject = {person, body}
    const commentString = JSON.stringify(commentObject)
    // Creando el objeto
    var xhttpComment = new XMLHttpRequest();
    // Configurando qué va a pasar cuando recibamos respuesta
    xhttpComment.onreadystatechange = function() {
        if (xhttpComment.readyState == 4 && xhttpComment.status == 200) {
            let comentario = JSON.parse(xhttpComment.responseText);
            let key = comentario.name;
            console.log(comentario.name);
           //traemos el post para agregarle la referencia a un nuevo comentarioa//
            const endpoint = `https://apikoder-b2ce0-default-rtdb.firebaseio.com/jorge/posts/${keyPost}/.json`;
            // Preparando el payload
            // Creando el objeto
            var xhttpPost = new XMLHttpRequest();
            // Configurando qué va a pasar cuando recibamos respuesta
            xhttpPost.onreadystatechange = function() {
                if (xhttpPost.readyState == 4 && xhttpPost.status == 200) {
                    let post = JSON.parse(xhttpPost.responseText);
                    console.log(post,key);
                    console.log(post.comments);
                    updatedComments = post.comments.concat(key)
                    console.log(updatedComments);
                    post.comments = updatedComments;
                    console.log(post);
                    let postString = JSON.stringify(post)
                    updatePost(keyPost,postString);
                }
            };
            // Configurar el verbo, la dirección
            xhttpPost.open("GET", endpoint, true);
            // Enviar la solicitud
            xhttpPost.send();
        }
    };
    // Configurar el verbo, la dirección
    xhttpComment.open("POST", endpoint, true);
    // Enviar la solicitud
    xhttpComment.send(commentString);
}
const bringComment = (key) => {
    const endpoint = `https://apikoder-b2ce0-default-rtdb.firebaseio.com/jorge/comments/${key}/.json`;
    // Preparando el payload
    // Creando el objeto
    var xhttp = new XMLHttpRequest();
    // Configurando qué va a pasar cuando recibamos respuesta
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let respuesta = JSON.parse(xhttp.responseText);
            console.log(respuesta);
            return respuesta
        }
    };
    // Configurar el verbo, la dirección
    xhttp.open("GET", endpoint, true);
    // Enviar la solicitud
    xhttp.send();
}

(function(){
    bringAllPosts();
    let createPostButton = document.getElementById('cardButton');
    createPostButton.addEventListener('click',(event)=>{
        let title = document.getElementById('cardTitle').value;
        let body = document.getElementById('cardBody').value;
        event.preventDefault();

        savePost(title,body);
        bringAllPosts();
    });
})()

function createCard(key,title,body){
    let cuerpo = body.slice(0,50).concat("...");
    let card = `
    <div class="card mb-3" >
        <div class="card-body">
            <h5 class="card-title">${title}</h5>
            <p class="card-text">${cuerpo}</p>
            <div class="d-flex justify-content-between">
                <a href="second.html?data=${key}" target="_blank" data-key="${key}" class="btn btn-primary ver">ver Post</a>
                <a href="#" data-key="${key}" class="btn btn-danger eliminar">Borrar Post</a>
            </div>
        </div>
    </div>`
    return card;
}


