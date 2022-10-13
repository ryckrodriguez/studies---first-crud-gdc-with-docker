<?php
function __autoload($classe){
    $folders = array('Model', 'Controller');
    foreach ($folders as $folder)	{
      if (file_exists("{$folder}/{$classe}.class.php")){
        require_once "{$folder}/{$classe}.class.php";
      }
    }
}

final class Aplicacao { 

    public static function run(){
        Transaction::open();
        $action = (!empty($_POST['page'])) ? $_POST['page'] : "default";
        switch ($action) {
            case 'grid':
                $classe = new Grid();
                break;

            case 'funcionarios':
                $classe = new CadastrarFuncionario();
                break;

            case 'pagina2':
                $classe = new Pagina2();
                break;

            default:
                die();
                break;
        }  
        $return = $classe->controllerAjax();
        Transaction::close();
        echo json_encode($return);
    }
}

Aplicacao::run();
?>