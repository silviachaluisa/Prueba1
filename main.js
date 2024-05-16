function obtenerPersonajes(done){
    const results = fetch("https://rickandmortyapi.com/api/character")
    results
        .then(response => response.json())
        .then(data =>{
            done(data)
        });
}

document.addEventListener('DOMContentLoaded', function() {
    obtenerPersonajes(data => {
        data.results.forEach(personaje => {
            const article = document.createRange().createContextualFragment(/*html*/`
                <article>
                    <div class="image-container">
                        <img src="${personaje.image}" alt="Personaje">
                    </div>
                    <h2>${personaje.name}</h2>
                    <span>${personaje.status}</span>
                </article>
            `);
            const main = document.querySelector("main");
            main.append(article);
        });
    });
});

document.addEventListener('DOMContentLoaded', function() { //Esta linea agrega un evento de escucha que se activa cuando el DOM esta cargado y listo para ser manipulado
    const button = document.getElementById("cargar-personajes"); //obtiene una referencia al elemento del boton con el ID y lo asigna a la variable button
    button.addEventListener("click", function() { //Agrega un evento de escucha al boton que se activa cuando se hace clic en él
        obtenerPersonajes(data => { //Llama a la funcion obtener personajes y pasa una funcion de devolucion de llamada como argumento. La funcion de devolucion de llamada se ejecutara una vez que se hayan obtenido los datos de los personajes
            const personajesAleatorios = data.results.sort(() => 0.5 - Math.random()).slice(0, 6); //Esta linea ordena de manera aleatoria los resultados de los 
                                                                                                    //personajes(data.results) utilizando el metodo sort() junto con la funcion de comparacion que devuelve un numero aleatorio entre -0.5 y 0.5
                                                                                                    //luego utiliza el metodo slice() para obtener solo los primeros 6 personajes aleatorios
            const main = document.querySelector("main"); //Esta línea obtiene una referencia al elemento <main> de la página y lo asigna a la variable main.
            main.innerHTML = ""; // Esta línea borra todo el contenido dentro del elemento <main>. Esto se hace para eliminar los personajes anteriores antes de agregar los nuevos personajes aleatorios.
            personajesAleatorios.forEach(personaje => { //Esta línea inicia un bucle forEach que recorre cada uno de los personajes aleatorios en la matriz personajesAleatorios.
                const article = document.createRange().createContextualFragment(/*html*/` 
            
                    <article>
                        <div class="image-container">
                            <img src="${personaje.image}" alt="Personaje">
                        </div>
                        <h2>${personaje.name}</h2>
                        <span>${personaje.status}</span>
                    </article>
                `);
                main.append(article); //main.append(article);: Esta línea agrega el artículo de personaje creado dinámicamente al final del elemento <main> de la página.
            });
        });
    });
});


// -------------------------------------------


document.addEventListener('DOMContentLoaded', function() {
    const botonHumanos = document.getElementById("humanos");
    const botonAliens = document.getElementById("aliens");

    botonHumanos.addEventListener("click", function() {
        obtenerPersonajes(data => {
            const personajesHumanos = data.results.filter(personaje => personaje.species === "Human");
            mostrarPersonajes(personajesHumanos);
        });
    });

    botonAliens.addEventListener("click", function() {
        obtenerPersonajes(data => {
            const personajesAliens = data.results.filter(personaje => personaje.species == "Alien");
            mostrarPersonajes(personajesAliens);
        });
    });

    function mostrarPersonajes(personajes) {
        const main = document.querySelector("main");
        main.innerHTML = ""; // Limpia el contenido anterior
        personajes.forEach(personaje => {
            const article = document.createRange().createContextualFragment(/*html*/`
                <article>
                    <div class="image-container">
                        <img src="${personaje.image}" alt="Personaje">
                    </div>
                    <h2>${personaje.name}</h2>
                    <span>${personaje.status}</span>
                </article>
            `);
            main.append(article);
        });
    }
});

