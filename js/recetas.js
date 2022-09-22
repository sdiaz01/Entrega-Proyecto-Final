const detalle = document.querySelector("section#detalle")
const URLING = "https://6319f4066b4c78d91b48a2e5.mockapi.io/ingredientes/"
let ingredientesJSON = []


const objDetalle = JSON.parse(localStorage.getItem("detalle"))

const cargarInfo = () => {

    if (localStorage.detalle) {

        try {

            detalle.innerHTML += ` <div class="cardD">
                                        <div class="imgBoxD">
                                        <img src="${objDetalle.imagen}" alt="${objDetalle.nombre}" title="${objDetalle.nombre}">
                                        </div>
                                        <div class="detalles">
                                            <center>
                                            <div class="nombre">
                                            <h2>${objDetalle.nombre}</h2>
                                            </div>
                                            </center>
                                            <div class="categoria">
                                            <small>Categoria: </small>
                                            <h6>${objDetalle.categoria}</h6>
                                            </div>
                                            <div class="sabor">
                                            <small>Sabor: </small>
                                            <h6>${objDetalle.sabor}</h6>
                                            </div>
                                            <div class="tiempo">
                                            <small>Tiempo: </small>
                                            <h6>${objDetalle.tiempo}</h6>
                                            </div>
                                            <hr>
                                            <table>
                                            <thead>
                                                <tr>
                                                    <th>Ingrediente</th>
                                                    <th>Cantidad</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            </tbody>
                                            </table>
                                            <hr>
                                            <div id="agregandoIngrediente">
                                            <input class="form-control me-2" type="text" id="ingrediente" placeholder="Ingrediente">
                                            <input class="form-control me-2" type="text" id="cantidad" placeholder="Cantidad">
                                            </div>
                                            <ul></ul>
                                            <button class="btn btn-outline-success" id="btnIngrediente">+</button>
                                            <div class="loaderIng">
                                            <center>
                                            <ul></ul>
                                            <h2><img src="https://res.cloudinary.com/daxw5llgw/image/upload/v1663605507/loading_pxekdf.gif" width="25px"></h2>
                                            </center>
                                          </div>
                                        </div>
                                        </div>
                                    </div>
                                `

        } catch (error) {

            toastSwal("Error al cargar receta", "error", "white")

        } finally {

            document.querySelector(".loaderIng").style.display = 'block';

            const toastSwal = (mensaje, icono, bgcolor) => {
                Swal.fire({
                    title: mensaje,
                    icon: icono,
                    background: bgcolor,
                    color: 'black'
                })
            }

            const agregarIngrediente = async () => {

                if (ingrediente.value != "" && cantidad.value != "") {
                    try {
                        document.querySelector(".loaderIng").style.display = 'block';
                        const datos = {
                            nombre: objDetalle.nombre,
                            ingrediente: (ingrediente.value).toUpperCase(),
                            cantidad: (cantidad.value).toUpperCase()
                        }
                        const BODY = JSON.stringify(datos)
                        const OPTIONS = {
                            method: 'POST',
                            headers: { 'Content-Type': 'Application/json' },
                            body: BODY
                        }
                        const response = await fetch(URLING, OPTIONS)
                        respuesta = await response.json()
                        ingrediente.value = ""
                        cantidad.value = ""
                    } catch (error) {
                        toastSwal("Error al agregar ingrediente", "error", "white")
                    } finally {
                        cargarIngredientes()
                    }

                } else {
                    toastSwal("Debe ingresar todos los valores", "error", "white")
                }
            }

            const cargarIngredientes = async () => {

                try {
                    debugger
                    filas.innerHTML = ""
                    ingredientes = await peticionFetch()
                    const busquedaIng = ingredientes.filter(ingrediente => ingrediente.nombre === (objDetalle.nombre).toUpperCase())
                    busquedaIng.forEach(ingrediente => {
                        filas.innerHTML += `
                            <tr>
                            <td>${ingrediente.ingrediente}</td>
                            <td>${ingrediente.cantidad}</td> 
                            <td><button class="btn btn-outline-danger btn-sm" id="btnBorrarIng" onclick="borrarIngrediente('${ingrediente.id}')"></button></td>
                            </tr>
                                `
                    })
                } catch (error) {
                    toastSwal("Error al agregar ingrediente", "error", "white")
                } finally {
                    document.querySelector(".loaderIng").style.display = 'none';
                }
            }

            const peticionFetch = async () => {
                const response = await fetch(URLING)
                const data = await response.json()
                return data
            }

            const filas = document.querySelector("tbody")
            const btnIngrediente = document.querySelector("#btnIngrediente")
            const ingrediente = document.querySelector("#ingrediente")
            const cantidad = document.querySelector("#cantidad")
            btnIngrediente.addEventListener("click", agregarIngrediente)

            cargarIngredientes()

        }

    }

}


cargarInfo()

const borrarIngrediente = async (id) => {

    document.querySelector(".loaderIng").style.display = 'block';

    const FULLURL = `${URLING}${id}`
    const OPTIONS = {
        method: 'DELETE',
        headers: { 'Content-Type': 'Application/json' }
    }
    const response = await fetch(FULLURL, OPTIONS)
    respuesta = await response.json()
    location.reload()

} 
