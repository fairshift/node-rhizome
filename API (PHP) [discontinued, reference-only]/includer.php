<?php
	//Customizations to API?
	  function includer($name){
	  	$domain = $GLOBALS['site']['domain'];
		if($domain && file_exists("/_custom/{$domain}/{$name}.php")){
			require_once("_custom/{$domain}/{$name}.php");
		} else {
			require_once("main/{$name}.php");
		}
	  }

	  includer('include');
?>