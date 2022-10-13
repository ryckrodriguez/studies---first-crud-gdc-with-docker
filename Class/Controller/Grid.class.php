<?php
class Grid {
    private $nomeTabela;
    private $nome;
    private $id;

    public function __construct(){

    }

    public function controller(){ 
        $query = "SELECT matricula, nome, sobrenome FROM t_funcionarios";
        $retorno = Connection::search($query);

        $funcionario = "";

        if(!$retorno['error']){
            foreach ($retorno['msg'] as $key => $value) {
                $responsavel[$value->nome] = new Template('View/dynamic/option.tpl');
                $checkresponsavel[$value->nome] = new Template('View/dynamic/checkbox.tpl');
                $funcionarios = $value->nome . " " . $value->sobrenome;
                $checkresponsavel[$value->nome]->set('responsavel', $funcionarios);
                $checkresponsavel[$value->nome]->set('matricula', $value->matricula);
                $responsavel[$value->nome]->set('responsavel', $funcionarios);
                $responsavel[$value->nome]->set('matricula', $value->matricula);
            }
        }
        $conteudoNavbar = new Template('View/dynamic/btns_grid.tpl');
        $modalIncidentes = new Template('View/incs/modal_incidentes.tpl');
        $modalLeitura = new Template('View/incs/modal_leitura.tpl');
        $modalFiltro = new Template('View/incs/modal_filtro.tpl');
        $modalFormatacao = new Template('View/incs/modal_formatacao.tpl');
        $modalPrejuizo = new Template('View/incs/modal_prejuizo.tpl');
        $template = new Template('View/pages/grid.tpl');

        $modalIncidentes->set('funcionarios', Template::join($responsavel));
        $modalFiltro->set('checkfuncionarios', Template::join($checkresponsavel));
        $template->set('modalIncidentes', $modalIncidentes->out());
        $template->set('modalLeitura', $modalLeitura->out());
        $template->set('modalFiltro', $modalFiltro->out());
        $template->set('modalFormatacao', $modalFormatacao->out());
        $template->set('modalPrejuizo', $modalPrejuizo->out());

        $retorno['msg'] =  $template->out();
        $retorno['navbar'] = $conteudoNavbar->out();
        return $retorno;
    }

    public function controllerAjax(){
        $connect = Transaction::get();
        switch ($_POST['acao']) {
            case 'add':
                $tipo = $connect->quote(trim($_POST['tipo']));
                $responsavel = $connect->quote(trim($_POST['responsavel']));
                $lat = $connect->quote(floatval($_POST['input_lat']));
                $lng = $connect->quote(floatval($_POST['input_lng']));
                $descricao = $connect->quote(trim($_POST['descricao']));
                $prejuizo_ = str_replace(array(".", "'"), "", $_POST['prejuizo']);
                $prejuizo = $connect->quote(floatval($prejuizo_));

                $query = "INSERT INTO t_incidentes (tipo, descricao, matricula, lat, lng, prejuizo, data_incidente) 
                    VALUES ({$tipo}, {$descricao}, {$responsavel}, {$lat}, {$lng}, {$prejuizo}, NOW())";
                $retorno = Connection::search($query);

                $query = "SELECT * FROM t_incidentes WHERE id = {$retorno['id']}";
                $retorno = Connection::search($query);
                
                $value = "";

                $value = $retorno['msg'];

                $i = 0;
                $obj = new stdClass;
                $obj->id = $value->id;
                $obj->cod = ++$i;
                $obj->matricula = $value->matricula;
                $obj->responsavel = "Aguardando ...";
                $obj->tipo = $value->tipo;
                $obj->descricao = $value->descricao;
                $obj->prejuizo = "R$ " . number_format($value->prejuizo,2,",",".");
                $obj->prejuizo_ = $value->prejuizo;
                $obj->data_incidente = date("d/m/Y H:i", strtotime($value->data_incidente));
                
                
                $retorno['msg'] = $obj;
                break;

            case "delete":
                $id = $connect->quote($_POST['id']);
                $query = "DELETE FROM t_incidentes WHERE id = {$id}";
                $retorno = Connection::search($query);
                break;

            case "pegarResponsavel":
                $matricula = $connect->quote($_POST['matricula']);
                $query = "SELECT nome, sobrenome FROM t_funcionarios WHERE matricula={$matricula}" ;
                $retorno = Connection::search($query);
                break;

            case 'incidentes':
                $tipos = isset($_POST['tipo']) ? implode("','", $_POST['tipo']) : null; 
                $matriculas = isset($_POST['funcionario']) ? implode("','", $_POST['funcionario']) : null;
                if(!empty($tipos) && !empty($matriculas)) {
                    $sql = "AND matricula IN ('{$matriculas}')";
                    $query = "SELECT * FROM t_incidentes WHERE tipo IN ('{$tipos}') {$sql}";
                } else if(!empty($tipos)) {
                    $query = "SELECT * FROM t_incidentes WHERE tipo IN ('{$tipos}')";
                } else if(!empty($matriculas)) {
                    $query = "SELECT * FROM t_incidentes WHERE matricula IN ('{$matriculas}')";
                } else {
                    $query = "SELECT * FROM t_incidentes";
                }

                $retorno = Connection::search($query);
                $i = 0;
                foreach ($retorno['msg'] as $key => $value) {
                    $obj = new stdClass;
                    $obj->id = $value->id;
                    $obj->cod = ++$i;
                    $obj->matricula = $value->matricula;
                    $obj->responsavel = "Aguardando ...";
                    $obj->tipo = $value->tipo;
                    $obj->descricao = $value->descricao;
                    $obj->prejuizo = "R$ " . number_format($value->prejuizo,2,",",".");
                    $obj->prejuizo_ = $value->prejuizo;
                    $obj->data_incidente = date("d/m/Y H:i", strtotime($value->data_incidente));
                    $grid[] = $obj;
                }
                $retorno['msg'] = $grid;
                break;

            case 'prejuizo':
                $query = "SELECT prejuizo FROM t_incidentes";

                $return = Connection::search($query);
                $retorno = null;
                if(!$return['error']){
                    foreach ($return['msg'] as $key => $value) {
                        $retorno += $value->prejuizo;
                    }
                }
                break;

            case "edit":                
                $id = $connect->quote($_POST['id']);
                $tipo = $connect->quote($_POST['tipo']);
                $lat = $connect->quote($_POST['input_lat']);
                $lng = $connect->quote($_POST['input_lng']);
                $responsavel = $connect->quote($_POST['responsavel']);
                $descricao = $connect->quote($_POST['descricao']);
                $prejuizo = $connect->quote(trim($_POST['prejuizo']));

                $query = "UPDATE t_incidentes SET tipo={$tipo}, matricula={$responsavel},
                    descricao={$descricao}, lat={$lat}, lng={$lng}, prejuizo={$prejuizo} WHERE id = {$id}";
                $retorno = Connection::search($query);
                
                $query = "SELECT * FROM t_incidentes WHERE id = {$id}";
                $retorno = Connection::search($query);
                
                $value = "";

                $value = $retorno['msg'];

                $i = 0;
                $obj = new stdClass;
                $obj->id = $value->id;
                $obj->cod = ++$i;
                $obj->matricula = $value->matricula;
                $obj->responsavel = "Aguardando ...";
                $obj->tipo = $value->tipo;
                $obj->descricao = $value->descricao;
                $obj->prejuizo = "R$ " . number_format($value->prejuizo,2,",",".");
                $obj->prejuizo_ = $value->prejuizo;
                $obj->data_incidente = date("d/m/Y H:i", strtotime($value->data_incidente));
                
                
                $retorno['msg'] = $obj;
                break;

            case "leitura":
                $id = $connect->quote(trim($_POST['id']));
                $query = "SELECT * FROM t_incidentes WHERE id = {$id}";
                $retorno = Connection::search($query);

                $responsavel = $retorno['msg'];
                $matricula = $responsavel->matricula;

                $query = "SELECT nome, sobrenome FROM t_funcionarios WHERE matricula={$matricula}" ;
                $result = Connection::search($query);

                $responsavel = $result['msg'];

                $retorno['responsavel'] = $responsavel->nome . " " . $responsavel->sobrenome;
                break;

            default:
                $retorno['error'] = true;
                break;
        }
        return $retorno;
    }
}
?>