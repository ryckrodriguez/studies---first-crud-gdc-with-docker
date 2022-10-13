<?php
/*
	*
	* @className Template
	* @author Alexandre Carvalho
	* @since 2017-07-25
	* @version 2.7.13
	*
*/
class Template {
	private $file;
	private $valores = array();

	public function __construct($file) {
		$this->file = $file;
	}

	public function set($chave, $valor) {
		$this->valores[$chave] = $valor;
	}

	public function out() {
		if (!file_exists($this->file)) {
			return "Error to loading file template ($this->file).<br />";
		}

		$saida = file_get_contents($this->file);
		foreach ($this->valores as $chave => $valor) {
			$tagToValor = "[@$chave]";
			$saida = str_replace($tagToValor, $valor, $saida);
		}
		return $saida;
	}

	static public function join($templates, $separador = "\n") {

		$saida = "";

		foreach ($templates as $template) {
			if(get_class($template) !== "Template") {
				$conteudo = "Erro, tipo incorreto - Template esperado.";
			}
			else {
				$conteudo =  $template->out();

			}
			$saida .= $conteudo . $separador;
		}
		return $saida;
	}
}
?>
