// para tener los contactos guardados
let listaContactos = JSON.parse(localStorage.getItem("agenda")) || [];

let indiceEditar = -1;

// guardar el contacto
function guardarContacto(){

let nombre = document.getElementById("nombre").value;
let direccion = document.getElementById("direccion").value;
let telefono = document.getElementById("telefono").value;
let correo = document.getElementById("correo").value;
let foto = document.getElementById("foto").value;

// objeto literal
let contacto = {
nombre: nombre,
direccion: direccion,
telefono: telefono,
correo: correo,
urlFoto: foto
};

if(indiceEditar === -1){
listaContactos.push(contacto);
}else{
listaContactos[indiceEditar] = contacto;
indiceEditar = -1;
}

// guardar en localStorage
localStorage.setItem("agenda", JSON.stringify(listaContactos));

limpiarFormulario();
mostrarContactos();
}


// mostrar contactos
function mostrarContactos(){

let contenedor = document.getElementById("listaContactos");
contenedor.innerHTML = "";

listaContactos.forEach((c,index)=>{

contenedor.innerHTML += `
<div class="contacto">

<img src="${c.urlFoto}" width="80">

<p><b>Nombre:</b> ${c.nombre}</p>
<p><b>Dirección:</b> ${c.direccion}</p>
<p><b>Teléfono:</b> ${c.telefono}</p>
<p><b>Correo:</b> ${c.correo}</p>

<button onclick="editarContacto(${index})">Editar</button>
<button onclick="eliminarContacto(${index})">Eliminar</button>

</div>
`;

});

}


// eliminar
function eliminarContacto(index){

if(confirm("¿Eliminar este contacto?")){

listaContactos.splice(index,1);

localStorage.setItem("agenda", JSON.stringify(listaContactos));

mostrarContactos();

}

}


// editar
function editarContacto(index){

let c = listaContactos[index];

document.getElementById("nombre").value = c.nombre;
document.getElementById("direccion").value = c.direccion;
document.getElementById("telefono").value = c.telefono;
document.getElementById("correo").value = c.correo;
document.getElementById("foto").value = c.urlFoto;

indiceEditar = index;

}


// limpiar la agenda
function limpiarFormulario(){

document.getElementById("nombre").value="";
document.getElementById("direccion").value="";
document.getElementById("telefono").value="";
document.getElementById("correo").value="";
document.getElementById("foto").value="";

}


// el buscador
document.getElementById("buscar").addEventListener("input", function(){

let texto = this.value.toLowerCase();

let contenedor = document.getElementById("listaContactos");
contenedor.innerHTML = "";

listaContactos.forEach((c,index)=>{

if(
c.nombre.toLowerCase().includes(texto) ||
c.direccion.toLowerCase().includes(texto) ||
c.telefono.includes(texto) ||
c.correo.toLowerCase().includes(texto)
){

contenedor.innerHTML += `
<div class="contacto">

<img src="${c.urlFoto}" width="80">

<p><b>Nombre:</b> ${c.nombre}</p>
<p><b>Dirección:</b> ${c.direccion}</p>
<p><b>Teléfono:</b> ${c.telefono}</p>
<p><b>Correo:</b> ${c.correo}</p>

<button onclick="editarContacto(${index})">Editar</button>
<button onclick="eliminarContacto(${index})">Eliminar</button>

</div>
`;

}

});

});


// solo para que se puedan ponernúmeros en teléfono
document.getElementById("telefono").addEventListener("input", function(){

this.value = this.value.replace(/[^0-9]/g,'');

});


// esto se muestra al iniciar
mostrarContactos();

function limpiarAgenda(){

if(confirm("¿Seguro que deseas eliminar todos los contactos?")){

localStorage.removeItem("agenda");

listaContactos = [];

mostrarContactos();

}

}