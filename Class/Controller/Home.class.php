<?php
class Home {
    private $nomeTabela;
    private $nome;
    private $id;

    public function __construct(){

    }

    public function controller(){
        $template = new Template('View/pages/home.tpl');
        $conteudoNavbar = new Template('View/dynamic/navbarHome.tpl');

        $retorno['msg'] = $template->out();
        $retorno['navbar'] = $conteudoNavbar->out();
        return $retorno;
    }

    public function controllerAjax(){
    }
}
?>