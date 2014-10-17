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
	// Variables globales au plugin mais privée 	   //
	// (non accessible en dehors du plugin)			   //
	/////////////////////////////////////////////////////	
	// nbre de clonage pour éviter d'avoir les mêmes ids
	var doydoy_counter = 0;
	// nouvel id du conteneur(parent) créé
	var doydoy_new_id = null;
	// préfix d'un nouvel id au cas où l'id n'existerait pas
	var glob_prefix_new_elt = "id_doydoy_clone_";	
	// Liste de tous les éléments cloner depuis le début	
	var doydoy_all_clones = new Array();
	// Liste de tous les éléments cloner lors du dernier clonage
	var doydoy_last_clones = new Array();
	
	//////////////////////////////////////////////////////////
	// LISTE DES FONCTIONS DISPONIBLES EN DEHORS DU CLONAGE	//
	//////////////////////////////////////////////////////////
	// Récupération du nombre de clonage effectué
	$.fn.doydoyGetCounter = function(){
		return doydoy_counter;
	}
	
	// Récupération de la liste de tous les éléments cloner depuis le début	
	$.fn.doydoyGetAllClones = function(){
		return doydoy_all_clones;
	}
	
	// Récupération de la liste de tous les éléments cloner lors du dernier clonage
	$.fn.doydoyGetLastClones = function(){
		return doydoy_last_clones;
	}
	
	// Récupération de l'id du dernier conteneur(parent) créé
	$.fn.doydoyGetLastNewId = function(){
		return doydoy_new_id;
	}
	
	// Affectation du préfix pour un nouvel id au cas où l'id n'existerait pas
	$.fn.doydoySetPrefixNewId = function(prefix_new_elt){
		glob_prefix_new_elt = prefix_new_elt;
		return this;
	}
	
	// Réinitialisation de la liste de tous les éléments cloner depuis le début	
	$.fn.initAllClonesList = function(){
		doydoy_all_clones = new Array();
		return this;
	}
	
	/////////////////////////////////////////////////////
	// LISTE DES METHODES RACCOURCIES				   //
	/////////////////////////////////////////////////////
	// Méthode after pour le clonage
	$.fn.doydoyCloneAfter = function(params){
		params = $.extend( params, {method : "after"});
		return this.doydoyClone(params);
	}		
	// Méthode before pour le clonage
	$.fn.doydoyCloneBefore = function(params){
		params = $.extend( params, {method : "before"});
		return this.doydoyClone(params);
	}
	// Méthode append pour le clonage
	$.fn.doydoyCloneAppend = function(params){
		params = $.extend( params, {method : "append"});
		return this.doydoyClone(params);
	}	
	// Méthode prepend pour le clonage
	$.fn.doydoyClonePrepend = function(params){
		params = $.extend( params, {method : "prepend"});
		return this.doydoyClone(params);
	}
	
	/////////////////////////////////////////////////////
	// Plugin de clonage							   //
	/////////////////////////////////////////////////////
	$.fn.doydoyClone = function(params) {
		// type de traitement pour la fonction eval (after par défaut)
		var function_plugin_name = 'after';
		
		// Fusionner les paramètres par défaut et ceux de l'utilisateur
		params = $.extend( {
							method		   : "",
							target		   : "",
							new_name       : false,
							prefix_new_elt : glob_prefix_new_elt
							},
							params);
	
		// Incrémentation du compter pour commencer à avoir des id à partir de 1 (idfoo_1) et supérieur au dernier clonage
		doydoy_counter++;
		
		// Récupération du type de traitement pour la fonction eval (after par défaut)
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
		
		// Traverser tous les nœuds.
		this.each(function() {
			// id sans le numéro d'incrémentation du futur conteneur (parent)
			var id_elt;	
			// élément à cloner
			var elt_a_cloner = this;
			// numéro d'incrémentation du futur conteneur (parent)
			var doydoy_counter_clone = doydoy_counter;
			
			// Initialisation des derniers éléments cloner
			doydoy_last_clones = null;
			doydoy_last_clones = new Array();
			
			// Initiaisation du nouvel id
			doydoy_new_id = null;
						
			// Définition de l'id (sans le numéro d'incrémentation) du futur conteneur (parent)
			if ($(this).attr('id') == undefined){
				if ($(this).attr('name') != undefined)
					id_elt = params.prefix_new_elt + $(this).attr('name');
				else
					id_elt = params.prefix_new_elt + $(this).prop('tagName');
			}
			else
				id_elt = $(this).attr('id');
				
			// Récupération de l'élément à qui rajouter les éléments clonés et y affecter la méthode after, before, ...
			// si non renseigné, on prend l'élément à cloner
			if (params.target != "")
				dernier_element = params.target;
			else
				dernier_element = $(this);
				
			
			// Clonage de l'ensemble des éléments
			function function_clone(){
				// retour de l'ensemble des élements clonés
				return $(elt_a_cloner).clone(true).each(function(){
					// Détermination de l'd du parent cloné
					doydoy_new_id = id_elt + "_" + doydoy_counter_clone;
					
					$(this).attr('id', doydoy_new_id);
					
					// Détermination du nouveau nom du parent cloner si on a choisi l'option
					if (params.new_name){
						if (typeof($(this).attr('name')) != 'undefined'){
							$(this).attr('name', $(this).attr('name') + "_" + doydoy_counter_clone);
						}
					}
					// Sauvegarde de ce nouveau parent dans la liste de tous les éléments cloner depuis le début	
					if (typeof(doydoy_all_clones[doydoy_counter_clone - 1]) == 'undefined'){	
						doydoy_all_clones[doydoy_counter_clone - 1] = new Array();
					}
						
					doydoy_all_clones[doydoy_counter_clone - 1]['parent'] = {id:doydoy_new_id,
																			   id_before:id_elt,
																			   num_clone: doydoy_counter_clone,
																			   name:((typeof($(this).attr('name')) == 'undefined') ? "" : $(this).attr('name')),
																			   elt:$(this)};
					// Sauvegarde de ce nouveau parent dans la liste de tous les éléments cloner lors du dernier clonage
					doydoy_last_clones['parent'] = {id:doydoy_new_id,
												      id_before:id_elt,
													  num_clone: doydoy_counter_clone,
													  name:((typeof($(this).attr('name')) == 'undefined') ? "" : $(this).attr('name')),
													  elt:$(this)};
					// incrémentation du numéro de clonage pour éviter d'voir les mêmes ids
					doydoy_counter_clone++;
				});
			}
			
			// Ajout de l'ensemble cloné à l'élément choisi avec la méthode choisie (after, begin, prepend, append)
			eval("$(dernier_element).each(function(){ $(this)." + function_plugin_name + "(function_clone())})");
			
			// Initialisation de la liste des derniers enfants créés
			doydoy_last_clones['child'] = new Array();
		
			// Ré-attribution des id des élements des conteneurs qui ont été créés
			for(var i = doydoy_counter; i < (doydoy_counter_clone); i++){
				// Numéro de l'enfant par rapport à son parent
				var cpt_child = 0;
				// id d'origine de l'enfant avant son nouvel id
				var id_before = "";
				
				// parcourt de tous les enfants du conteneur
				$("#" + id_elt + "_" + i + " *").each(function(){
					// Innitialisation de l'id d'origine (car il n'en avait pas forcément)
					id_before = "";
					
					// Détermination du nouvel id de l'enfant en court
					if (typeof($(this).attr('id')) != 'undefined'){
						// rcupération de l'id d'origine de l'enfant
						id_before = $(this).attr('id');
						// changement de l'id
						$(this).attr('id', id_before + "_" + i);						
					}
					// changement du nom si on l'a demandé (params.new_name : true)
					if (params.new_name){
						if (typeof($(this).attr('name')) != 'undefined'){
							$(this).attr('name', $(this).attr('name') + "_" + i);
						}
					}	
					
					// Sauvegarde de ce nouvel enfant dans la liste de tous les éléments cloner depuis le début
					if (typeof(doydoy_all_clones[i - 1]['child']) == 'undefined'){	
						doydoy_all_clones[i - 1]['child'] = new Array();
					}
					doydoy_all_clones[i - 1]['child'][cpt_child] = {id:((typeof($(this).attr('id')) == 'undefined') ? "" : $(this).attr('id')),
																	  id_before:id_before,
																	  num_clone: i,
																	  name:((typeof($(this).attr('name')) == 'undefined') ? "" : $(this).attr('name')),
																	  elt:$(this)};
					
					// Sauvegarde de ce nouvel enfant dans la liste de tous les éléments cloner lors du dernier clonage
					if (i == (doydoy_counter_clone - 1)){
						doydoy_last_clones['child'][cpt_child] = {id:((typeof($(this).attr('id')) == 'undefined') ? "" : $(this).attr('id')),
																	id_before:id_before,
																	num_clone: i,
																	name:((typeof($(this).attr('name')) == 'undefined') ? "" : $(this).attr('name')),
																	elt:$(this)};
					}
					// Incrémentattion de l'enfant pour passer au suivant
					cpt_child++;
				});
				
				// fonction appelée après la création d'un nouveau conteneur
				if (params.each_callback != undefined){
					params.each_callback();
				}	
			}
			// Ré-initialisation du compteur de conteneurs (parents) créés
			doydoy_counter = doydoy_counter_clone - 1;
		});
		
		// fonction appelée après la création de tous les nouveaux conteneurs
		if (params.callback != undefined){
			params.callback();
		}	
		
		// Permettre le chaînage par jQuery
		return this;
	};
})(jQuery);
