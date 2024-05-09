const ul = document.querySelector("ul"),
input = ul.querySelector("input"),
countNumb = document.querySelector(".details span");

let maxTags = 10
let tags = []

countTag()

const countTag = () => {
    input.focus()
    countNumb.innerText = maxTags - tags.length   //sustrayendo valor maximo con la medida de los tags
}

const createTag = () => {
//removiendo todos los li tags antes de agregar asi no habra tags duplicados
    ul.querySelectorAll("li").forEach(li => li.remove())
    tags.slice().reverse().forEach(tag => {
        let liTag = `<li>${tag} <i class="uit uit-multiply" onclick="remove(this, '${tag}')"></i></li>`
        ul.insertAdjacentHTML("afterbegin", liTag)  //insertando li dentro del ul tag
    })
    countTag()                                //actualizando el contador de etiquetas
} 

function remove(element, tag){
    let index = tags.indexOf(tag)   //removiendo indice del tag
    tags = [...tags.slice(0, index), ...tags.slice(index + 1)]
    element.parentElement.remove()   //removiendo li del tag removido
} 

const addTag = (event) => {
    if (event.key == "Enter"){
        let tag = event.target.value.replace(/[A-Z])\w+/g, " ") // removiendo espacios no esperados en el user tag
        if(tag.length > 1 && !tags.includes(tag)){   //si la medida de tag es mayor que 1 y el tag no existe
            if(tag.length > 10){
                tag.split(',').forEach(tag => {   //separando cada tag por coma (,)
                    tags.push(tag)   //agregando cada tag dentro del array
                    createTag()
                })
            }
        }
        event.target.value = ""
    }
}


input.addEventListener("keyup", addTag)
const removeBtn = document.querySelector("button")
removeBtn.addEventListener("click", () => {
    tags.length = 0   //vaciando el array
    ul.querySelectorAll("li").forEach(li => li.remove())
    countTag()
})