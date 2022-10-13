<?php
class Pagina2 {
    private $nomeTabela;
    private $nome;
    private $id;

    public function __construct(){

    }

    public function controller(){
        $conteudoNavbar = new Template('View/dynamic/navbarPag2.tpl');
        $template = new Template('View/pages/pagina2.tpl');

        $retorno['msg'] =  $template->out();
        $retorno['navbar'] = $conteudoNavbar->out();
        return $retorno;
    }

    public function controllerAjax(){
        $connect = Transaction::get();
        switch ($_POST['acao']) {
            case "logout":
                session_start();
                session_destroy();
                exit();
                
            case "login":
                session_start();
                $login = $connect->quote(trim($_POST['login']));
                $senha = $connect->quote(trim(md5($_POST['senha'])));
                
                try {
                $query = "SELECT * FROM t_usuarios WHERE usuario = {$login} AND senha = md5({$login}{$senha})";
                $retorno = Connection::search($query);
                
                if(!$retorno['error']){
                    $retorno['error'] = false;
                    $retorno['msg'] = "Sucesso";
                    $_SESSION['login'] = $login;
                } else {
                    $retorno['error'] = true;
                    $retorno['msg'] = "Usuário ou senha inválidos";
                }
                } catch (Exception $e) {
                $retorno['error'] = true;
                $retorno['msg'] = "Ocorreu um erro entre em contato com o administrador {$e->getMessage()}";
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