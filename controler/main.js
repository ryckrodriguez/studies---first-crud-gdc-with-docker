$(document).ready(function(){

	$('#myGrid').mouseleave(function(){
		var cols = gridOptions.columnApi.getAllGridColumns();
		var colToNameFunc = function(col, index) {
			//console.log(col);
			return data = {
				headerName: col.colDef.headerName,
				field: col.getId(),
				hide: (col.visible)?false:true
			}
		};
		//console.log(cols);
		var colNames = cols.map(colToNameFunc);
		//console.log('columnDefs = ', colNames);
		//localStorage.setItem('Colunas', JSON.stringify(colNames));
	});
	
	$('#prejuizo').mask('#.##0,00', {reverse: true});
	calculaPrejuizo();
	carregarGrid();
	formularioIncidentes();
	adicionarFuncionario();
	buscarEndereco();

	$("#btn_formatacao_grid").unbind("click").click(function(){
		$("#format_table_body tr").remove();
		gridOptions.columnApi.getAllColumns().forEach(function(column) {
			//console.log(column);
			let field = {
				headerName: column.colDef.headerName, 
				field: column.colDef.field,
				hide: (column.visible)?false:true
			}
			let data = JSON.stringify(field);
			let anchor = "";
			if(!field.hide){
				anchor = '<a class="changeDelete" onclick="changeRow(this, true)"><i class="fas fa-eye"></i></a>';
			} else {
				anchor = '<a class="changeAdd" onclick="changeRow(this, false)"><i class="fas fa-eye-slash"></i></a>';
			}
			$("#format_table_body").append(
				`<tr class="format_row">
					<td class="up_desc" >
						<a class="up" onclick="moveRow(this, 'up')"><i class="fas fa-sort-up"></i></a> 
						<a class="desc" onclick="moveRow(this, 'down')"><i class="fas fa-sort-down"></i></a>
					</td>
					<td class="format_responsavel" >${column.colDef.headerName}</td>
					<td class="toggle_row" > ${anchor} </td>
					<input type="hidden" name="columns[]" value='${data}'/>
				</tr>`
			);
		});
		$(".format_row").mousedown(function(){
			$(this).css("cursor", "grabbing");
		});
		$(".format_row").mouseup(function(){
			$(this).css("cursor", "grab");
		});
		$("tr:has(a.changeAdd)").addClass('row_opacity');
		$("#format_table_body").sortable();
		$("#salvar_formatacao").unbind("click").click(function(){
			localStorage.setItem('Colunas', JSON.stringify(generateGrid('format_table_body', gridOptions)));
			$("#modalFormatacao").modal('hide');
		});
	});
});

changeRow = (change, visible) => {
	let anchor = "";
	let i = change.parentNode.parentNode.rowIndex -1;
	let value = $("#format_table_body").find("input[type='hidden']").eq(i).val();
	let valueJson = JSON.parse(value);
	valueJson.hide = visible;
	$("#format_table_body").find("input[type='hidden']").eq(i).val(JSON.stringify(valueJson));
	if(visible){
		anchor = '<a class="changeAdd" onclick="changeRow(this, false)"><i class="fas fa-eye-slash"></i></a>';
		$("#format_table_body").find(".format_row").eq(i).addClass('row_opacity');
	} else {
		anchor = '<a class="changeDelete" onclick="changeRow(this, true)"><i class="fas fa-eye"></i></a>';
		$("#format_table_body").find(".format_row").eq(i).removeClass('row_opacity');
	}
	$("#format_table_body").find(".toggle_row").eq(i).html(anchor);
}

moveRow = (move, direction) => {
	let i = move.parentNode.parentNode.rowIndex -1;
	let tbody = $(move).parent().parent().parent();
	let conteudo = $(tbody).find("tr").eq(i).detach();
	if(direction == "up"){
		$(tbody).find("tr").eq(i-1).before(conteudo);
	} else {
		$(tbody).find("tr").eq(i).after(conteudo);
	}
}

function calculaPrejuizo(){
	let dados = {page: 'grid', acao: 'prejuizo'};
	$.post('Class/index.php', dados, function(retorno){
		$("#prejuizoTotal").text(parseFloat(retorno).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }));
	});
}

var array_itensGrid = new Array();

var columnDefs = (localStorage.Colunas) ? JSON.parse(localStorage.Colunas) : [
	{headerName: "ID", field: "cod"},
	{headerName: "Responsavel", field: "responsavel"},
	{headerName: "Tipo", field: "tipo"},
	{headerName: "Descricao", field: "descricao"},
	{headerName: "Prejuizo", field: "prejuizo"},
	{headerName: "Data", field: "data_incidente"}
];

var gridOptions = {
	columnDefs: columnDefs,
	rowSelection: 'single',
	onRowSelected: onRowSelectedId,
	onRowDoubleClicked: onRowDoubleClicked,
	animateRows: true,
	defaultColDef: {
		flex: 1,
		sortable: true,
		filter: true
	},
	getRowNodeId: function(data) {
		return data.id;
	}
};

function carregarGrid(){
	$("#filtroModal").modal({ 
		backdrop: 'static'
	});
	$("#filtrar_incidente").unbind("click").click(function(){
		var gridDiv = document.querySelector('#myGrid');
		new agGrid.Grid(gridDiv, gridOptions);
		event.preventDefault();
		$("#formModalFiltro input[name=acao]").val("incidentes");
		$("#formModalFiltro input[name=page]").val("grid");
		let formdata = new FormData($("#formModalFiltro")[0]);
		$.ajax({
			url: 'Class/index.php',
			type: 'POST',
			data: formdata,
			cache: false,
			processData: false,
			contentType: false,
			success: function(result){
				let retorno = JSON.parse(result);
				if (!retorno.error) {
					gridOptions.api.setRowData(retorno.msg);
					carregarResponsavel();
				} else {
					toastr["error"]('Não foi possível editar o Incidente!');
				}
			}
		});
		$("#filtroModal").modal('hide');
	});
}

function onRowDoubleClicked(event){
	if(event.node.selected){
		$("#editarIncidente, #btnExcluir, #resetIncidente").css("display", "block");
		$("#salvarIncidente, #opresponsavel, #optipo").css("display", "none");
		let id = event.node.data.id;
		$("#addmodal").modal('show');
		$("#formModalIncidentes input[name=acao]").val("leitura");
		$("#formModalIncidentes input[name=page]").val("grid");
		$("#formModalIncidentes input[name=id]").val(id);
		$("#formModalIncidentes").submit();
	}
}

function onRowSelectedId(event) {
	if(event.node.selected){
		let id = event.node.data.id;
		$("#formModalIncidentes input[name=id]").val(id);
	}
}

function formularioIncidentes(){
	$("#salvarIncidente").unbind("click").click(function(){
		event.preventDefault();
		$("#formModalIncidentes input[name=acao]").val("add");
		$("#formModalIncidentes input[name=page]").val("grid");
		$("#formModalIncidentes").submit();
	});


	$("#editarIncidente").unbind("click").click(function(){
		event.preventDefault();
		$("#formModalIncidentes input[name=acao]").val("edit");
		$("#formModalIncidentes input[name=page]").val("grid");
		$("#formModalIncidentes").submit();
	});

	$("#btn_leitura_modal").unbind("click").click(function(){
		event.preventDefault();
		if($("#formModalIncidentes input[name=id]").val() === ""){
			swal("Nenhum item a ser exibido, por favor selecione o item desejado e tente novamente!", {
				icon: "info",
			});
		} else {
			$("#LeituraModal").modal('show');
			$("#formModalIncidentes input[name=acao]").val("leitura");
			$("#formModalIncidentes input[name=page]").val("grid");
			$("#formModalIncidentes").submit();
		}
	});

	$("#btn_prejuizo_modal").unbind("click").click(function(){
		let prejuizo = 0;
		gridOptions.api.forEachNode(function(rowNode, index) {
			if(!isNaN(parseFloat(rowNode.data.prejuizo_))){
				prejuizo += parseFloat(rowNode.data.prejuizo_);
			}
			$("#prejuizoModal").modal('show');
			$("#destinoPrejuizo").text(prejuizo.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }));
		});
	});

	$("#btn_add_modal").unbind("click").click(function(){
		$("#editarIncidente, #btnExcluir, #resetIncidente").css("display", "none");
		$("#salvarIncidente").css("display", "block");
		$("#formModalIncidentes").trigger('reset');
		initMap(-23.550667428085106, -46.632885610975634);
	});

	$("#btnExcluir").unbind("click").click(function(){
		swal({	
			title: "Você tem certeza?",
			text: 'Clicando em "ok", Você deleta seu arquivo!',
			icon: "warning",
			buttons: ["Não!!!", true],
			dangerMode: true,
		}).then((willDelete) => {
			if (willDelete) {
				$("#formModalIncidentes input[name=acao]").val("delete");
				$("#formModalIncidentes input[name=page]").val("grid");
				var selectedData = gridOptions.api.getSelectedRows();
				var res = gridOptions.api.updateRowData({ remove: selectedData });
				$("#addmodal").modal('hide');
				swal("Seu arquivo foi deletado com sucesso!", {
					icon: "success",
				});
				$("#formModalIncidentes").submit();
			} else {
				swal("Arquivo não foi excluido!");
			}
		});
	});

	$("#formModalIncidentes").submit(function(event) {
		event.preventDefault();
		let formdata = new FormData($("#formModalIncidentes")[0]);
		$.ajax({
			url: 'Class/index.php',
			type: 'POST',
			data: formdata,
			processData: false,
			contentType: false,		
			success: function(result){
				let retorno = JSON.parse(result);
				switch ($("#formModalIncidentes input[name=acao]").val()) {
					case 'delete':
						if(!retorno.error){
							console.log(retorno);
						}
	
						break;

					case 'edit':
						if(!retorno.error) {
							let selectedData = gridOptions.api.getRowNode($("#formModalIncidentes input[name=id]").val());
							let newData = {
								id: retorno.msg.id,
								cod: '1',
								tipo: retorno.msg.tipo, 
								responsavel: 'Aguardando ...', 
								matricula: retorno.msg.matricula, 
								descricao: retorno.msg.descricao, 
								prejuizo: retorno.msg.prejuizo,
								prejuizo_: retorno.msg.prejuizo,
								data_incidente: retorno.msg.data_incidente
							};
							selectedData.setData(newData);
							$("#formModalIncidentes").trigger('reset');
							initMap(-23.550667428085106, -46.632885610975634);
							$("#addmodal").modal('hide');
							toastr["success"]('Editado com sucesso!');
						} else {
							toastr["error"]('Não foi possível editar o Incidente!');
						}
						break;

					case 'leitura':
						if(!retorno.error){
							initMap(retorno.msg.lat, retorno.msg.lng);
							$("#formid").val(retorno.msg.id);
							$("#tipo").val(retorno.msg.tipo);
							$("#responsavel").val(retorno.msg.matricula);
							$("#descricaoIncidente").val(retorno.msg.descricao);
							$("#prejuizo").val(retorno.msg.prejuizo);
							$("#input_lat").val(retorno.msg.lat);
							$("#input_lng").val(retorno.msg.lng);
							$("#data_incidente").val(retorno.msg.data_incidente);
							$("#resetIncidente").val("Limpar formulário");
							$("#leituraModalTitle").text("ID: " + retorno.msg.id + " - Tipo: " + retorno.msg.tipo);
							$("#nomeLeitura").text(retorno.responsavel);
							$("#descricaoLeitura").text(retorno.msg.descricao);
							$("#prejuizoLeitura").text(retorno.msg.prejuizo).mask('#.##0,00', {reverse: true});
						} else {
							toastr['error'](retorno.title);
						}
	
						break;

					case 'add':
						if(!retorno.error) {
							let newData = {
								id: retorno.msg.id,
								cod: retorno.msg.cod,
								tipo: retorno.msg.tipo, 
								responsavel: retorno.msg.responsavel, 
								matricula: retorno.msg.matricula,
								descricao: retorno.msg.descricao, 
								prejuizo: retorno.msg.prejuizo,
								prejuizo_: retorno.msg.prejuizo_,
								data_incidente: retorno.msg.data_incidente
							};
							var newItems = [newData];
							var res = gridOptions.api.updateRowData({ add: newItems });
							swal("Incidente adicionado com sucesso!", {
								icon: "success",
							});
							$("#formModalIncidentes").trigger('reset');
							initMap(-23.550667428085106, -46.632885610975634);
							$("#addmodal").modal('hide');
						} else {
							toastr["error"](retorno.title);
						}
	
						break;

					default:
						toastr["error"]('ERRO NA TRANSAÇÂO!');
						break;
				}
			}
		});
	});
}



function carregarResponsavel(){
	gridOptions.api.forEachNode(function(rowNode, index) {
		let dados = {page: 'grid', acao: "pegarResponsavel", matricula: rowNode.data.matricula, id: rowNode.data.id};
		array_itensGrid.push(dados);
	});
	callLineGrid(0);
	callLineGrid(1);
	callLineGrid(2);
	callLineGrid(3);
	callLineGrid(4);
}

callLineGrid = (index) => {
	if(index < array_itensGrid.length){
		let dados = array_itensGrid[index];
		let itemsToUpdate = [];
		let rowNode = gridOptions.api.getRowNode(dados.id);
		let load = {
			cod: index+1,
			id: dados.id,
			tipo: rowNode.data.tipo, 
			responsavel: "Processando ...", 
			matricula: rowNode.data.matricula, 
			descricao: rowNode.data.descricao, 
			prejuizo: rowNode.data.prejuizo,
			prejuizo_: rowNode.data.prejuizo_,
			data_incidente: rowNode.data.data_incidente
		};
		//rowNode.setData(load);
		itemsToUpdate.push(load);
		let res = gridOptions.api.applyTransaction({ update: itemsToUpdate });
		$.post('Class/index.php',dados , function(retorno){
			if(!retorno.error){
				let newData = {
					cod: index+1,
					id: dados.id,
					tipo: rowNode.data.tipo, 
					responsavel: retorno.msg.nome + " " + retorno.msg.sobrenome, 
					matricula: rowNode.data.matricula,
					descricao: rowNode.data.descricao, 
					prejuizo: rowNode.data.prejuizo,
					prejuizo_: rowNode.data.prejuizo_,
					data_incidente: rowNode.data.data_incidente
				};
				//rowNode.setData(newData);
				itemsToUpdate.push(newData);
				let res = gridOptions.api.applyTransaction({ update: itemsToUpdate });
			} else {
				console.log(retorno.msg);
			}
			callLineGrid(index+5);
		}, 'JSON');
	}
}

// Resetar a formatação colunas
function resetColunas() {
	gridOptions.columnApi.getAllColumns().forEach(function(column) {
		//console.log(column.colId);
		gridOptions.columnApi.setColumnVisible(
			column.colId,
		 	true
		);
	});
	localStorage.removeItem('Colunas');
	gridOptions.api.setColumnDefs(columnDefs);
	fitColumns(gridOptions);
}

generateGrid = (id, gridOptionParam) => {
	let columns = new Array();
	$(`#${id} tr`).each(function(key, item){
		let input = $(item).find("input[type='hidden']").eq(0).val();
		let dado = JSON.parse(input);
		columns.push(dado);
	});
	gridOptionParam.api.setColumnDefs(columns);
	return columns;
}

function fitColumns(gridOptionParam){
	var allColumnIds = [];
	gridOptionParam.columnApi.getAllColumns().forEach(function(column) {
	  allColumnIds.push(column.colId);
	});
	gridOptionParam.columnApi.autoSizeColumns(allColumnIds);
}

function carregarPagina(pagina) {
	$("button[name='btnSidebar']:disabled").prop('disabled', false);
	$("#"+pagina+"Sidebar").prop('disabled', true);
	let data = {recharge: true, page: pagina};
	$.get('index.php',data , function(retorno){
		event.preventDefault();
		$('main').html(retorno);
		$.getScript('controler/main.js');
	});
}