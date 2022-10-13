function adicionarFuncionario() {
	$("#btn_cadastrar_funcionário").unbind("click").click(function(){
		event.preventDefault();
		$("#formulario_funcionario input[name=acao]").val("addfuncionario");
		$("#formulario_funcionario input[name=page]").val("funcionarios");
		$("#formulario_funcionario").submit();
	});

	$("#formulario_funcionario").submit(function(event){
		event.preventDefault();
		$("#btnCadastrar").prop('disabled', true);
		let formdata = new FormData($("#formulario_funcionario")[0]);
		$.ajax({
			url: 'Class/index.php',
			type: 'POST',
			data: formdata,
			processData: false,
			contentType: false,	
			success: function (result) {
				let retorno = JSON.parse(result);
				if(!retorno.error){
					event.preventDefault();
					toastr["success"](retorno.msg);
					$("#formulario_funcionario").each(function(){
						this.reset();
					});
					$("#btnCadastrar").prop('disabled', false);
				} else {
					event.preventDefault();
					toastr["error"](retorno.msg);
					$("#btnCadastrar").prop('disabled', false);
				}
			}
		});
	});
}