<?php

final class Connection {
  private function __construct(){
  }
  
  public static function connect(){
    try{
      $server = "db";
      $user = "root";
      $pass = "";
      $db = "db_crud";
      $connect = new PDO("mysql:host={$server};dbname={$db}", $user, $pass);
      return $connect;
    } catch (Exception $e) {
      echo "Falha na conexão: " . $e->getMessage();
      die();
    }
  }

  function search($sql){
    try {
        $connect = Transaction::get();
        $resultado = $connect->Query($sql);
        if($resultado->rowCount()==0) {
            $retorno["error"] = true;
            $retorno["msg"] = "Nenhum valor encontrado!";
        } else {
                if($resultado->rowCount()==1){
                    $tabela = $resultado->fetchObject();
                }else{

                    while($dados = $resultado->fetchObject()) {
                        $tabela[] = $dados;
                    }
                }
            $retorno["id"] = $connect->lastInsertId();
            $retorno["msg"] = $tabela;
            $retorno["error"] = false;
            $retorno["title"] = "Sucesso";
        }

    } catch(Exception $e) {
        $retorno["error"] = true;
        $retorno["msg"] = "Ocorreu um erro entre em contato com o Administrador {$e->getMessage()}";
        //.$e->getMessage()
    }
    return $retorno;
  }

}

?>