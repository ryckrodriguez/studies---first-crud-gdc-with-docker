<div class="modal fade" id="addmodal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Cadastrar incidente</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
            <form name="formModalIncidentes" id="formModalIncidentes" enctype="multipart/form-data">
                <div class="form-group">
                    <input type="hidden" name="id" id="formid">

                    <select name="tipo" id="tipo" class="form-control" style="margin: 5px;" required>
                        <option value="Acidente" >Acidente</option>
                        <option value="Carro quebrou" >Carro quebrou</option>
                        <option value="Colisao" >Colisão</option>
                        <option value="Outro">Outro...</option>
                    </select>
                    
                    <select name="responsavel" id="responsavel" class="form-control" style="margin: 5px;" required>
                        [@funcionarios]
                    </select>

                    <div>
                        <input type="search" class="form-control" name="input_busca_endereco" id="input_busca_endereco" placeholder=" Procurar...">
                        <div name="map" id="map" ></div>
                        <input type="hidden" name="input_lat" id="input_lat" required>
                        <input type="hidden" name="input_lng" id="input_lng" required>
                    </div>

                    <textarea name="descricao" id="descricaoIncidente" class="form-control" style="margin: 5px; height: 140px;" placeholder="Descrição" required></textarea>
                    <input type="text" name="prejuizo" id="prejuizo" class="form-control" style="margin: 5px;" placeholder="R$ Prejuizo" required>
                    <input type="hidden" name="data_incidente" id="data_incidente" required>
                    <input type="hidden" name="acao">
                    <input type="hidden" name="page">
                    <input type="reset" id="resetIncidente" style="margin: 5px 5px 5px auto;" class="btn btn-dark">
                    <div class="modal-footer">
                        <button type="button" style="margin: auto auto auto 0px;" class="delete btn btn-danger" id="btnExcluir" >Remover</button>
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                        <button type="button" id="salvarIncidente" class="btn btn-primary">Salvar incidente</button>
                        <button type="button" id="editarIncidente" class="btn btn-primary">Editar incidente</button>
                    </div>
                </div>
            </form>
        </div>
        </div>
    </div>
</div>