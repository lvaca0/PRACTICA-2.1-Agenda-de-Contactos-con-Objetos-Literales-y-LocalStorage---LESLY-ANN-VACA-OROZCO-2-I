// cargar contactos
let listaContactos = JSON.parse(localStorage.getItem("agenda")) || [];

let indiceEditar = -1;

// guardar contacto
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

<img src="${c.urlFoto || 'https://via.placeholder.com/80'}" width="80">

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


// eliminar contacto
function eliminarContacto(index){

if(confirm("¿Eliminar este contacto?")){

listaContactos.splice(index,1);
localStorage.setItem("agenda", JSON.stringify(listaContactos));
mostrarContactos();

}

}


// editar contacto
function editarContacto(index){

let c = listaContactos[index];

document.getElementById("nombre").value = c.nombre;
document.getElementById("direccion").value = c.direccion;
document.getElementById("telefono").value = c.telefono;
document.getElementById("correo").value = c.correo;
document.getElementById("foto").value = c.urlFoto;

indiceEditar = index;

}


// limpiar formulario
function limpiarFormulario(){

document.getElementById("nombre").value="";
document.getElementById("direccion").value="";
document.getElementById("telefono").value="";
document.getElementById("correo").value="";
document.getElementById("foto").value="";

}


// filtro (lo que pidio el profe a ultima hora)
document.getElementById("buscar").addEventListener("input", filtrarContactos);
document.getElementById("filtroCampo").addEventListener("change", filtrarContactos);

function filtrarContactos(){

let texto = document.getElementById("buscar").value.toLowerCase();
let campo = document.getElementById("filtroCampo").value;

let contenedor = document.getElementById("listaContactos");
contenedor.innerHTML = "";

listaContactos.forEach((c,index)=>{

let coincide = false;

if(campo === "todos"){
coincide =
c.nombre.toLowerCase().includes(texto) ||
c.direccion.toLowerCase().includes(texto) ||
c.telefono.includes(texto) ||
c.correo.toLowerCase().includes(texto);
}else{
coincide = c[campo].toLowerCase().includes(texto);
}

if(coincide){

contenedor.innerHTML += `
<div class="contacto">

<img src="${c.urlFoto || 'https://via.placeholder.com/80'}" width="80">

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

}


// solo números en teléfono
document.getElementById("telefono").addEventListener("input", function(){
this.value = this.value.replace(/[^0-9]/g,'');
});


// limpiar toda la agenda
function limpiarAgenda(){

if(confirm("¿Seguro que deseas eliminar todos los contactos?")){

localStorage.removeItem("agenda");
listaContactos = [];
mostrarContactos();

}

}


// mostrar al iniciar
mostrarContactos();
