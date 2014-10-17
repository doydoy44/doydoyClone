/**
* Doydoy Clone
*
* @brief JQuery plugin to clone a group of elements with the management of ids
*
* @author doydoy44
* @version 1.0
*
*/	
(function($) {
	/////////////////////////////////////////////////////
	// Variables globales au plugin mais priv�e 	   //
	// (non accessible en dehors du plugin)			   //
	/////////////////////////////////////////////////////	
	// nbre de clonage pour �viter d'avoir les m�mes ids
	var doydoy_counter = 0;
	// nouvel id du conteneur(parent) cr��
	var doydoy_new_id = null;
	// pr�fix d'un nouvel id au cas o� l'id n'existerait pas
	var glob_prefix_new_elt = "id_doydoy_clone_";	
	// Liste de tous les �l�ments cloner depuis le d�but	
	var doydoy_all_clones = new Array();
	// Liste de tous les �l�ments cloner lors du dernier clonage
	var doydoy_last_clones = new Array();
	
	//////////////////////////////////////////////////////////
	// LISTE DES FONCTIONS DISPONIBLES EN DEHORS DU CLONAGE	//
	//////////////////////////////////////////////////////////
	// R�cup�ration du nombre de clonage effectu�
	$.fn.doydoyGetCounter = function(){
		return doydoy_counter;
	}
	
	// R�cup�ration de la liste de tous les �l�ments cloner depuis le d�but	
	$.fn.doydoyGetAllClones = function(){
		return doydoy_all_clones;
	}
	
	// R�cup�ration de la liste de tous les �l�ments cloner lors du dernier clonage
	$.fn.doydoyGetLastClones = function(){
		return doydoy_last_clones;
	}
	
	// R�cup�ration de l'id du dernier conteneur(parent) cr��
	$.fn.doydoyGetLastNewId = function(){
		return doydoy_new_id;
	}
	
	// Affectation du pr�fix pour un nouvel id au cas o� l'id n'existerait pas
	$.fn.doydoySetPrefixNewId = function(prefix_new_elt){
		glob_prefix_new_elt = prefix_new_elt;
		return this;
	}
	
	// R�initialisation de la liste de tous les �l�ments cloner depuis le d�but	
	$.fn.initAllClonesList = function(){
		doydoy_all_clones = new Array();
		return this;
	}
	
	/////////////////////////////////////////////////////
	// LISTE DES METHODES RACCOURCIES				   //
	/////////////////////////////////////////////////////
	// M�thode after pour le clonage
	$.fn.doydoyCloneAfter = function(params){
		params = $.extend( params, {method : "after"});
		return this.doydoyClone(params);
	}		
	// M�thode before pour le clonage
	$.fn.doydoyCloneBefore = function(params){
		params = $.extend( params, {method : "before"});
		return this.doydoyClone(params);
	}
	// M�thode append pour le clonage
	$.fn.doydoyCloneAppend = function(params){
		params = $.extend( params, {method : "append"});
		return this.doydoyClone(params);
	}	
	// M�thode prepend pour le clonage
	$.fn.doydoyClonePrepend = function(params){
		params = $.extend( params, {method : "prepend"});
		return this.doydoyClone(params);
	}
	
	/////////////////////////////////////////////////////
	// Plugin de clonage							   //
	/////////////////////////////////////////////////////
	$.fn.doydoyClone = function(params) {
		// type de traitement pour la fonction eval (after par d�faut)
		var function_plugin_name = 'after';
		
		// Fusionner les param�tres par d�faut et ceux de l'utilisateur
		params = $.extend( {
							method		   : "",
							target		   : "",
							new_name       : false,
							prefix_new_elt : glob_prefix_new_elt
							},
							params);
	
		// Incr�mentation du compter pour commencer � avoir des id � partir de 1 (idfoo_1) et sup�rieur au dernier clonage
		doydoy_counter++;
		
		// R�cup�ration du type de traitement pour la fonction eval (after par d�faut)
		switch (params.method) {
			case "after":
			case "before":
			case "append":
			case "prepend":
				function_plugin_name = params.method;
				break;
			default:
				function_plugin_name = 'after';
				break;
		}
		
		// Traverser tous les n�uds.
		this.each(function() {
			// id sans le num�ro d'incr�mentation du futur conteneur (parent)
			var id_elt;	
			// �l�ment � cloner
			var elt_a_cloner = this;
			// num�ro d'incr�mentation du futur conteneur (parent)
			var doydoy_counter_clone = doydoy_counter;
			
			// Initialisation des derniers �l�ments cloner
			doydoy_last_clones = null;
			doydoy_last_clones = new Array();
			
			// Initiaisation du nouvel id
			doydoy_new_id = null;
						
			// D�finition de l'id (sans le num�ro d'incr�mentation) du futur conteneur (parent)
			if ($(this).attr('id') == undefined){
				if ($(this).attr('name') != undefined)
					id_elt = params.prefix_new_elt + $(this).attr('name');
				else
					id_elt = params.prefix_new_elt + $(this).prop('tagName');
			}
			else
				id_elt = $(this).attr('id');
				
			// R�cup�ration de l'�l�ment � qui rajouter les �l�ments clon�s et y affecter la m�thode after, before, ...
			// si non renseign�, on prend l'�l�ment � cloner
			if (params.target != "")
				dernier_element = params.target;
			else
				dernier_element = $(this);
				
			
			// Clonage de l'ensemble des �l�ments
			function function_clone(){
				// retour de l'ensemble des �lements clon�s
				return $(elt_a_cloner).clone(true).each(function(){
					// D�termination de l'd du parent clon�
					doydoy_new_id = id_elt + "_" + doydoy_counter_clone;
					
					$(this).attr('id', doydoy_new_id);
					
					// D�termination du nouveau nom du parent cloner si on a choisi l'option
					if (params.new_name){
						if (typeof($(this).attr('name')) != 'undefined'){
							$(this).attr('name', $(this).attr('name') + "_" + doydoy_counter_clone);
						}
					}
					// Sauvegarde de ce nouveau parent dans la liste de tous les �l�ments cloner depuis le d�but	
					if (typeof(doydoy_all_clones[doydoy_counter_clone - 1]) == 'undefined'){	
						doydoy_all_clones[doydoy_counter_clone - 1] = new Array();
					}
						
					doydoy_all_clones[doydoy_counter_clone - 1]['parent'] = {id:doydoy_new_id,
																			   id_before:id_elt,
																			   num_clone: doydoy_counter_clone,
																			   name:((typeof($(this).attr('name')) == 'undefined') ? "" : $(this).attr('name')),
																			   elt:$(this)};
					// Sauvegarde de ce nouveau parent dans la liste de tous les �l�ments cloner lors du dernier clonage
					doydoy_last_clones['parent'] = {id:doydoy_new_id,
												      id_before:id_elt,
													  num_clone: doydoy_counter_clone,
													  name:((typeof($(this).attr('name')) == 'undefined') ? "" : $(this).attr('name')),
													  elt:$(this)};
					// incr�mentation du num�ro de clonage pour �viter d'voir les m�mes ids
					doydoy_counter_clone++;
				});
			}
			
			// Ajout de l'ensemble clon� � l'�l�ment choisi avec la m�thode choisie (after, begin, prepend, append)
			eval("$(dernier_element).each(function(){ $(this)." + function_plugin_name + "(function_clone())})");
			
			// Initialisation de la liste des derniers enfants cr��s
			doydoy_last_clones['child'] = new Array();
		
			// R�-attribution des id des �lements des conteneurs qui ont �t� cr��s
			for(var i = doydoy_counter; i < (doydoy_counter_clone); i++){
				// Num�ro de l'enfant par rapport � son parent
				var cpt_child = 0;
				// id d'origine de l'enfant avant son nouvel id
				var id_before = "";
				
				// parcourt de tous les enfants du conteneur
				$("#" + id_elt + "_" + i + " *").each(function(){
					// Innitialisation de l'id d'origine (car il n'en avait pas forc�ment)
					id_before = "";
					
					// D�termination du nouvel id de l'enfant en court
					if (typeof($(this).attr('id')) != 'undefined'){
						// rcup�ration de l'id d'origine de l'enfant
						id_before = $(this).attr('id');
						// changement de l'id
						$(this).attr('id', id_before + "_" + i);						
					}
					// changement du nom si on l'a demand� (params.new_name : true)
					if (params.new_name){
						if (typeof($(this).attr('name')) != 'undefined'){
							$(this).attr('name', $(this).attr('name') + "_" + i);
						}
					}	
					
					// Sauvegarde de ce nouvel enfant dans la liste de tous les �l�ments cloner depuis le d�but
					if (typeof(doydoy_all_clones[i - 1]['child']) == 'undefined'){	
						doydoy_all_clones[i - 1]['child'] = new Array();
					}
					doydoy_all_clones[i - 1]['child'][cpt_child] = {id:((typeof($(this).attr('id')) == 'undefined') ? "" : $(this).attr('id')),
																	  id_before:id_before,
																	  num_clone: i,
																	  name:((typeof($(this).attr('name')) == 'undefined') ? "" : $(this).attr('name')),
																	  elt:$(this)};
					
					// Sauvegarde de ce nouvel enfant dans la liste de tous les �l�ments cloner lors du dernier clonage
					if (i == (doydoy_counter_clone - 1)){
						doydoy_last_clones['child'][cpt_child] = {id:((typeof($(this).attr('id')) == 'undefined') ? "" : $(this).attr('id')),
																	id_before:id_before,
																	num_clone: i,
																	name:((typeof($(this).attr('name')) == 'undefined') ? "" : $(this).attr('name')),
																	elt:$(this)};
					}
					// Incr�mentattion de l'enfant pour passer au suivant
					cpt_child++;
				});
				
				// fonction appel�e apr�s la cr�ation d'un nouveau conteneur
				if (params.each_callback != undefined){
					params.each_callback();
				}	
			}
			// R�-initialisation du compteur de conteneurs (parents) cr��s
			doydoy_counter = doydoy_counter_clone - 1;
		});
		
		// fonction appel�e apr�s la cr�ation de tous les nouveaux conteneurs
		if (params.callback != undefined){
			params.callback();
		}	
		
		// Permettre le cha�nage par jQuery
		return this;
	};
})(jQuery);
