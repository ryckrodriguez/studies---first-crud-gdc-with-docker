$(document).ready(function(){
    //cadastrarUsuario();
    logar();
});

/*
function cadastrarUsuario() {
	$("#cad_usuario").submit(function(event){
		event.preventDefault();
		var usuario = $("#usuario").val();
		var telefone = $("#telefone").val();
		var email = $("#email").val();
		var senha = $("#senha").val();
		$.ajax({
			url: "../Class/Controller/cad_usuario.php",
			type: "POST",
			data: {usuario: usuario, telefone: telefone,
			email: email, senha: senha},
			success: function (result) {
				console.log(result);
				let retorno = JSON.parse(result);
				if(!retorno.error){
					toastr["success"](retorno.msg);
					setTimeout(function(){
						location.href= '../View/login.html';
					}, 750);
				} else {
					$("#cad_usuario").each(function(){
						this.reset();
					});
					toastr["error"](retorno.msg);
				}
			}
		});
	});
}
*/

function logout(){
	let data = {page: 'pagina2', acao: "logout"};
	$.post("Class/index.php", data, function(dados){
		toastr['info']("Encerrando sessão...");
		setTimeout(function(){
			location.href='login';
		}, 400);
	});
}

function logar() {
	$('#formLogin').submit(function(event){
		event.preventDefault();
		var login = $('#login').val();
		var senha = $('#senha').val();
		$.ajax({
			url:"Class/index.php",
			type: "post",
			data: {page: 'pagina2', acao: 'login', login: login, senha: senha},
			   success: function (result){
				let retorno = JSON.parse(result);
				if(!retorno.error){			
					toastr["success"](retorno.title);
					setTimeout(function(){
						location.href='home';
					}, 300);
				}else{
					toastr["error"](retorno.msg);
					$('#formLogin').each(function(){
						this.reset();
					});
				}
			}
		});
	});
}
