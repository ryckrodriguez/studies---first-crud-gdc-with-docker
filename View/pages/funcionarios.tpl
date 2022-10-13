<form id="formulario_funcionario" enctype="multipart/form-data">
    <div class="form-group">
        <input type="hidden" name="acao">
        <input type="hidden" name="page">
        <input type="text" name="nome" id="nome" class="form-control" placeholder="Nome" required>
        <input type="text" name="sobrenome" id="sobrenome" class="form-control" placeholder="Sobrenome" required>
        <input type="tel" name="telefone" id="telefone" class="form-control" placeholder="Telefone" required>
        <input type="email" name="email" id="email" class="form-control" placeholder="Email" required>
        <input type="date" style="margin-bottom: 15px" name="data_nascimento" id="data_nascimento" class="form-control" placeholder="Data de Nascimento" required>
        <fieldset class="form-group">
            <div class="row">
                <div class="col-sm-10">
                    <legend class="col-form-label col-sm-2 pt-0">Sexo: </legend>
                    <div class="form-check">
                        <label>
                            <input class="form-check-input" type="radio" name="sexo" id="masculino" value="M">
                            Masculino
                        </label>
                    </div>
                    <div class="form-check">
                        <label>
                            <input class="form-check-input" type="radio" name="sexo" id="feminino" value="F">
                            Feminino 
                        </label>
                    </div>
                </div>
            </div>
        </fieldset>
        <div class="modal-footer">
            <button type="button" id="btn_cadastrar_funcionário" class="btn btn-primary">Cadastrar funcionário</button>
        </div>
    </div>
</form>