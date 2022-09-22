class Receta {
    constructor(id, nombre, categoria, sabor, tiempo, imagen) {
        this.id = id
        this.nombre = nombre
        this.categoria = categoria
        this.sabor = sabor
        this.tiempo = tiempo
        this.imagen = imagen
    }
}

class Ingrediente {
    constructor(nombre, ingrediente, cantidad) {
        this.nombre = nombre
        this.ingrediente = ingrediente
        this.cantidad = cantidad
    }
}

class IMC {
    constructor(peso, altura) {
        this.peso = peso
        this.altura = altura
    }
    calcular() {
        this.altura = this.altura / 100
        let resultadoIMC = (this.peso / (this.altura * this.altura)).toFixed(2)
        return resultadoIMC
    }
}



