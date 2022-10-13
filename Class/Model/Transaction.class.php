<?php

final class Transaction{
    private static $connect;

    private function __construct(){
    }

    public static function open(){
        if(empty($connect)){
            self::$connect = Connection::connect();
            return self::$connect;
        }
    }
    public static function get(){
        return self::$connect;
    }
    public static function close(){
        if(self::$connect){
            self::$connect = null;
        }
    }
}
?>