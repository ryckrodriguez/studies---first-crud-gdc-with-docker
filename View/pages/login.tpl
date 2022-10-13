<!DOCTYPE html>

<html lang="pt-br">
  <head>
    <title>Login GDC</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
    <link rel="stylesheet" href="/assets/css/style.css">
    <link href="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/css/toastr.min.css">
    <script src="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <script src="//cdn.datatables.net/1.10.20/js/jquery.dataTables.min.js"></script>
    <script src="/controler/acesso.js"></script>
    <style>
      
    </style>
  </head>

  <body>
      <div class="wrapper fadeInDown">
          <div id="formContent">
        
            <div class="fadeIn first">
              <img src="/assets/imagens/global_dotcom.png" style="width: 50%; margin: 20px;" id="icon" alt="GDC"/>
            </div>
        
            <form id="formLogin">
              <input type="text" id="login" class="fadeIn second" name="login" placeholder="Usuario" required>
              <input type="password" id="senha" class="fadeIn third" name="senha" placeholder="Senha" required>
              <input type="submit">
            </form>
        
            <!-- cadastro
            <div id="formFooter">
              <a class="underlineHover" href="/crud/view/cad_usuario.html">Não tem cadastro?</a>
            </div>-->
        
          </div>
      </div>

      <script src="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/js/toastr.min.js"></script>
  </body>
</html>