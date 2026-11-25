const formularioRegistro = document.getElementById("registroForm");

formularioRegistro.addEventListener("submit", function(event) {
    event.preventDefault();
    const nombre = document.getElementById("nombre").value.trim();
    const control = document.getElementById("control").value.trim();
    const password = document.getElementById("password").value;
    const confirmar = document.getElementById("confirmar").value;
    const semestre = document.getElementById("semestre").value;

    if (password !== confirmar) {
        alert("las contrasenas no coinciden.");
        return;
    }
    if (password.length < 8) {
        alert("la contrasena debe tener 8 caracteres");
        return;
    }

    const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");
    const existe = usuarios.some(usuario => usuario.control === control);
    if (existe) {
        alert("el numero de control ya existe");
        return;
    }

    const nuevoUsuario = {
        nombre: nombre,
        control: control,
        password: password,
        semestre: semestre
    };
    usuarios.push(nuevoUsuario);

    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    alert("registro exitoso");
    window.location.href = "login.html";
});
