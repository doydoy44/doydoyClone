/**
 * Doydoy Clone
 *
 * @brief		JQuery plugin to clone a group of elements with the management of ids
 * 				
 * @author    doydoy44
 * @version   1.0
 * 
 */	
(function($) {

		// Variables globales au plugin mais privée (non accessible en dehors du plugin)
		var clones_group = new Array();
		var doydoy_counter = 0;
		var doydoy_new_id = null;
		var glob_prefix_new_elt = "id_doydoy_clone_";
		
		// Variables globales à la page:
		$.doydoy_all_clones = new Array();
		/*
			$.myApp = {
				version: "0.1",
				author:  "Author Name",
				url:     "http://www.example.com",
			}

			// Usage
			$.myApp.author;  // "Author Name"
		*/
		
		$.fn.doydoyGetCounter = function(){
			return doydoy_counter;
		}
		$.fn.doydoyGetLastNewId = function(){
			return doydoy_new_id;
		}
		
		$.fn.doydoySetPrefixNewId = function(prefix_new_elt){
			glob_prefix_new_elt = prefix_new_elt;
			return this;
		}
		$.fn.initAllClonesList = function(){
			$.doydoy_all_clones = new Array();
			return this;
		}
		
        // définition du plugin jQuery
        $.fn.doydoyClone = function(params) {
		
			var function_plugin_name = 'after';
			
			doydoy_new_id = null;
		
			// Fusionner les paramètres par défaut et ceux de l'utilisateur
			params = $.extend( {
								after : "",
								before: "",
								append: "",
								prepend: "",
								new_name : false,
								prefix_new_elt : glob_prefix_new_elt
								}, 
								params);
						
			doydoy_counter++;
			
			$.doydoy_all_clones[doydoy_counter] = new Array();
			
			if (params.after == ""){
				if (params.append != ""){
					function_plugin_name = 'append';
				}
				else if (params.prepend != ""){
					function_plugin_name = 'prepend';
				}
				else if (params.before != ""){
					function_plugin_name = 'before';
				}
			}
			
			
			// Traverser tous les nœuds.
			this.each(function() {
			
				var id_elt;				
				
				if ($(this).attr('id') == undefined){
					if ($(this).attr('name') != undefined)
						id_elt = params.prefix_new_elt + $(this).attr('name');
					else
						id_elt = params.prefix_new_elt + $(this).prop('tagName');
				}
				else
					id_elt = $(this).attr('id');
				
				var elt_a_cloner = this;
				
				if (clones_group[id_elt] == undefined)
				{
					//On ajoute l'objet et ses attributs dans le tableau global 
					clones_group[id_elt] = new Array();
					clones_group[id_elt]['counter'] = 0;
				}				
				
				if (params.after != "")
					dernier_element = params.after;
				else if (params.before != ""){
					dernier_element = params.before;
				}
				else if (params.append != ""){
					dernier_element = params.append;
				}
				else if (params.prepend != ""){
					dernier_element = params.prepend;
				}
				else{
					if (0 == clones_group[id_elt]['counter'])
						dernier_element = $(this);
					else
						dernier_element = id_elt + '_' + clones_group[id_elt]['counter'];
				}			
				clones_group[id_elt]['counter'] = doydoy_counter;
				
				doydoy_new_id = id_elt + "_" + clones_group[id_elt]['counter'];
				
				// Clonage de l'ensemble des éléments 
				function function_clone(){
					return $(elt_a_cloner).clone(true).each(function(index){
						$(this).attr('id', doydoy_new_id);
						if (params.new_name){
							if (typeof($(this).attr('name')) != 'undefined'){
								$(this).attr('name', $(this).attr('name') + "_" + clones_group[id_elt]['counter']);
							}
						}
						$.doydoy_all_clones[doydoy_counter]['parent'] = {id:doydoy_new_id,
																		 name:((typeof($(this).attr('name')) == 'undefined') ? "" : $(this).attr('name')),
																		 elt:$(this)};
					});
				}
				// Ajout de l'ensemble cloner à l'élément choisi avec la méthode choisie (after, prepend, append)
				eval("$(dernier_element)." + function_plugin_name + "(function_clone())");
					
				var cpt_child = 0;
				$.doydoy_all_clones[doydoy_counter]['child'] = new Array();
				
				// Réattribution d'un id
				$("#" + id_elt + "_" + clones_group[id_elt]['counter'] + " *").each(function(){
																	 
					if (typeof($(this).attr('id')) != 'undefined'){
						$(this).attr('id', $(this).attr('id') + "_" + clones_group[id_elt]['counter']);
					}
					if (params.new_name){
						if (typeof($(this).attr('name')) != 'undefined'){
							$(this).attr('name', $(this).attr('name') + "_" + clones_group[id_elt]['counter']);
						}
					}
					$.doydoy_all_clones[doydoy_counter]['child'][cpt_child++] = {id:((typeof($(this).attr('id')) == 'undefined') ? "" : $(this).attr('id')),
																				 name:((typeof($(this).attr('name')) == 'undefined') ? "" : $(this).attr('name')),
																				 elt:$(this)};
				});
			});
			
			if (params.callback != undefined){
				params.callback();
			}				
				
			// Permettre le chaînage par jQuery
			return this;
        };
})(jQuery);