const borrarReceta = async () => {

    if (datosCompletosBorrar(true)) {
        let borrarR = borrar.value.toUpperCase()
        borrando = recetas.find(r => r.nombre == borrarR) || false
        if (!borrando) {
            toastSwal("La receta ingresada no existe", "error", "white")
            borrar.value = ""
            borrar.focus()
        } else {
            document.querySelector(".loaderBorrar").style.display = 'block';
            recetas.forEach(receta => {
                if (receta.nombre == borrarR) {
                    idR = receta.id
                }
            })

            const FULLURL = `${URLMOCK}${idR}`
            const OPTIONS = {
                method: 'DELETE',
                headers: { 'Content-Type': 'Application/json' }
            }
            const response = await fetch(FULLURL, OPTIONS)
            respuesta = await response.json()
            borrar.value = ""
            cerrarBorrar()
            cargarRecetas()
            toastSwal("La receta fue borrada", "warning", "white")
            document.querySelector(".loaderBorrar").style.display = 'none';
        }
    } else {
        toastSwal("Debe ingresar un nombre.", "error", "white")
    }


}

const buscarReceta = () => {

    const busqueda = recetas.filter(receta => receta.nombre.includes(buscar.value.toUpperCase()))
    const cuerpo = document.getElementById("cuerpo")
    cuerpo.innerHTML = ""

    busqueda.forEach(receta => {
        cuerpo.innerHTML += `
                            <div class="grid-item">
                            <div class="card">
                              <img class="card-img" src="${receta.imagen}">
                              <div class="card-content">
                                <h1 class="card-header">${receta.nombre}</h1>
                                <br><br>
                                 <p class="card-text">${receta.categoria}</p>
                                 <p class="card-text">${receta.sabor}</p>
                                 <p class="card-text">${receta.tiempo}</p>
                                <button class="card-btn" id="ver" onclick="guardarContenidoEnLS('${receta.id}')">Ver <span>&rarr;</span></button>
                              </div>
                            </div>
                            </div>
                            `
    })

    if (busqueda.length === 0) {
        document.getElementById("noEncontrado").style.display = 'block';
    } else {
        document.getElementById("noEncontrado").style.display = 'none';
    }

    if (buscar.value == "") {
        cargarRecetas()
    }
}



const calcularIMC = () => {

    const imc = new IMC(peso.value, altura.value)
    let resultadoIMC = imc.calcular()
    if (datosCompletosIMC(true)) {

        valorIMC.innerText = resultadoIMC

        if (resultadoIMC >= 18.5 && resultadoIMC <= 24.9) {
            toastSwal("Su peso se encuentra normal", "succces", "white")
            peso.value = ""
            altura.value = ""
            peso.focus()
        } else if (resultadoIMC > 25) {
            toastSwal("Su peso se encuentra por arriba del limite", "warning", "white")
            peso.value = ""
            altura.value = ""
            peso.focus()
        } else if (resultadoIMC < 18.4) {
            toastSwal("Su peso se encuentra por debajo del limite", "warning", "white")
            peso.value = ""
            altura.value = ""
            peso.focus()

        }

    } else {
        toastSwal("Debe ingresar valores correctos!", "error", "white")
    }



}

const agregarReceta = async () => {

    const resultado = recetas.some(receta => receta.nombre === (nombre.value).toUpperCase())

    if (datosCompletosAgregar(true) && resultado === false) {
        document.querySelector(".loaderAgregar").style.display = 'block';
        const datos = {
            nombre: (nombre.value).toUpperCase(),
            categoria: (categoria.value).toUpperCase(),
            sabor: (sabor.value).toUpperCase(),
            tiempo: (tiempo.value).toUpperCase(),
            imagen: imagen.src
        }
        const BODY = JSON.stringify(datos)
        const OPTIONS = {
            method: 'POST',
            headers: { 'Content-Type': 'Application/json' },
            body: BODY
        }
        const response = await fetch(URLMOCK, OPTIONS)
        respuesta = await response.json()
        nombre.value = ""
        categoria.value = ""
        sabor.value = ""
        tiempo.value = ""
        imagen.src = ""
        cerrarAgregar()
        toastSwal("La receta fue agregada", "success", "white")
        document.querySelector(".loaderAgregar").style.display = 'none';
        cargarRecetas()

    } else if (datosCompletosAgregar(true) && resultado === true) {
        nombre.value = ""
        categoria.value = ""
        sabor.value = ""
        tiempo.value = ""
        nombre.focus()
        toastSwal("La receta ingresada ya existe", "error", "white")
    } else {
        toastSwal("Debe ingresar todos los valores", "error", "white")
    }


}

const cargarRecetas = async () => {

    cuerpo.innerHTML = ""
    try {
        recetas = await peticionFetch()
        recetas.reverse()
        recetas.forEach(receta => {
            cuerpo.innerHTML += `
                <div class="grid-item" onclick="guardarContenidoEnLS('${receta.id}')">
                <div class="card">
                  <img class="card-img" src="${receta.imagen}">
                  <div class="card-content">
                    <h1 class="card-header">${receta.nombre}</h1>
                    <br><br>
                     <p class="card-text">${receta.categoria}</p>
                     <p class="card-text">${receta.sabor}</p>
                     <p class="card-text">${receta.tiempo}</p>
                    <button class="card-btn" id="ver" onclick="guardarContenidoEnLS('${receta.id}')">Ver <span>&rarr;</span></button>
                  </div>
                </div>
                </div>
                `
        })
    } catch (error) {
        toastSwal("Error al cargar las recetas", "error", "white")
    } finally {
        document.querySelector(".loading").style.display = 'none';
    }
}

const peticionFetch = async () => {
    const response = await fetch(URLMOCK)
    const data = await response.json()
    return data
}

cargarRecetas()

const toastSwal = (mensaje, icono, bgcolor) => {
    Swal.fire({
        title: mensaje,
        icon: icono,
        background: bgcolor,
        color: 'black'
    })
}

const guardarContenidoEnLS = (id) => {
    let resultado = recetas.find((receta) => receta.id == id)
    if (resultado) {
        localStorage.setItem("detalle", JSON.stringify(resultado))
        location.href = "detalle.html"
    }
}