<?php
class CadastrarFuncionario {
    private $nomeTabela;
    private $nome;
    private $id;

    public function __construct(){

    }

    public function controller(){
        $conteudoNavbar = new Template('View/dynamic/navbarFuncionarios.tpl');
        $template = new Template('View/pages/funcionarios.tpl');

        $retorno['msg'] =  $template->out();
        $retorno['navbar'] = $conteudoNavbar->out();
        return $retorno;
    }

    public function controllerAjax(){
        $connect = Transaction::get();
        switch ($_POST['acao']) {
            case "addfuncionario":
                    
                $nome = $connect->quote(trim($_POST['nome']));
                $sobrenome = $connect->quote(trim($_POST['sobrenome']));
                $telefone = $connect->quote(trim($_POST['telefone']));
                $email = $connect->quote(trim($_POST['email']));
                $data_nascimento = $connect->quote(trim($_POST['data_nascimento']));
                $sexo = $connect->quote(trim($_POST['sexo']));

                try {
                    $query = "SELECT email FROM t_funcionarios WHERE email = {$email}";
                    $verifica = Connection::search($query);
                    
                    if(!$verifica['error']) {
                        $retorno['error'] = true;
                        $retorno['msg'] = "Funcionário já cadastrado em sua base de dados!";
                    } else {
                        $query = "INSERT INTO t_funcionarios (nome, sobrenome, telefone, email, data_nascimento, sexo)
                        VALUES ({$nome}, {$sobrenome}, {$telefone}, {$email}, {$data_nascimento}, {$sexo})";
                        $result = Connection::search($query);
                        
                        if(!$result['error']) {
                            $retorno['error'] = false;
                            $retorno['msg'] = "Funcionario salvo com sucesso";
                            $retorno['id'] = $result['id'];
                        } else {
                            $retorno['error'] = true;
                            $retorno['msg'] = "Não foi possível adicionar o funcionário";
                        }
                    }    
                } catch (Exception $e) {    
                    $retorno['error'] = true;
                    echo "Ocorreu um erro entre em contato com o administrador: {$e->getMessage()}"; 
                }
                break;
        
            default:
                $retorno['error'] = true;
                break;
        }
        return $retorno;
    }
}
?>