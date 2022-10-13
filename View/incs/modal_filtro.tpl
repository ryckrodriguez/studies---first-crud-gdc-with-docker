<div class="modal fade" id="filtroModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
        <div >
            <p style="background-color: rgb(200, 200, 200); margin: auto"> 
                <b>Filtro::</b><i class="fas fa-filter"></i>
            </p>
        </div>
        <div class="modal-body">
            <form name="formModalFiltro" id="formModalFiltro" enctype="multipart/form-data">
                <div class="row">
                    <div class="col-md-6" style="height: 200px; overflow: auto; padding: 0px 20px; margin: 10px">
                        <div style="position: sticky; top: 0px; background-color: snow;">
                            <legend class="col-form-label col-sm-2 pt-0"><b>Funcionário</b></legend>
                        </div>
                        [@checkfuncionarios]
                    </div>
                    <div class="col-md-5 ml-auto" style=" height: 200px; padding: 0px 20px; margin: 5px">
                        <legend class="col-form-label col-sm-2 pt-0"><b>Tipo</b></legend>
                        <input type="checkbox" name="tipo[]" id="tipoAcidente" value="Acidente">
                        <label for="tipo[]">Acidente</label><br>
                        <input type="checkbox" name="tipo[]" id="tipoCarroQuebrou" value="Carro quebrou">
                        <label for="tipo[]">Carro quebrou</label><br>
                        <input type="checkbox" name="tipo[]" id="tipoColisao" value="Colisão">
                        <label for="tipo[]">Colisão</label><br>
                        <input type="checkbox" name="tipo[]" id="tipoOutro" value="Outro">
                        <label for="tipo[]">Outro...</label>
                    </div>
                </div>
                <div>
                    <button type="button" id="filtrar_incidente" class="btn btn-info btn-sm btn-block">Filtrar</button>
                </div>
                <input type="hidden" name="acao">
                <input type="hidden" name="page">
            </form>
        </div>
        </div>
    </div>
</div>