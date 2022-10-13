<?php
session_start();
if(!isset($_SESSION["login"])){
    $tpl = 'View/pages/login.tpl';
    $template = new Template($tpl);
    echo $template->out();
    exit();
}
function __autoload($classe){
    $folders = array('Model', 'Controller');
    foreach ($folders as $folder)	{
      if (file_exists("Class/{$folder}/{$classe}.class.php")){
        require_once "Class/{$folder}/{$classe}.class.php";
      }
    }
}

final class Aplicacao {
    public static function run(){
        Transaction::open();
        $action = (!empty($_GET['page'])) ? $_GET['page'] : "default";
        switch ($action) {
            case 'grid':
                $classe = new Grid();
            
                break;
            
            case 'pagina2':
                $classe = new Pagina2();
            
                break;

            case 'funcionarios':
                $classe = new CadastrarFuncionario();
            
                break;
            
            case 'home':
                $classe = new Home();

                break;
            
            default:
                
                die('ERRO 404!');
        }
        (!empty($classe)) ? $return = $classe->controller() : $classe = null ;
        if(!empty($_GET['recharge'])){
            $template = new Template('View/dynamic/main.tpl') ;
        } else{
            $template = new Template('View/layout.tpl');
            $sidebar = new Template('View/incs/sidebar.tpl');
            $footer = new Template('View/incs/footer.tpl');
            $template->set('sidebar', $sidebar->out());
            $template->set('Footer', $footer->out());
        } 
        $navbar = new Template('View/incs/navbar.tpl');
        $navbar->set('conteudoNavbar', $return['navbar']);
        $template->set('navbar', $navbar->out());
        $template->set('Page', $return['msg']);
        Transaction::close();
        echo $template->out();
    }
}

Aplicacao::run();
?>          