/**
* Doydoy Clone
*
* @brief JQuery plugin to clone a group of elements with the management of ids
*
* @author doydoy44
* @version 1.1
*
*/

(function ($) {
    "use strict";
    /////////////////////////////////////////////////////
    // Variables globales au plugin mais priv�e        //
    // (non accessible en dehors du plugin)            //
    /////////////////////////////////////////////////////
    var
    // nbre de clonage pour �viter d'avoir les m�mes ids
        doydoy_counter = 0,
    // nouvel id du conteneur(parent) cr��
        doydoy_new_id = null,
    // pr�fix d'un nouvel id au cas o� l'id n'existerait pas
        glob_prefix_new_elt = "id_doydoy_clone_",
    // Liste de tous les �l�ments cloner depuis le d�but
        doydoy_all_clones = [],
    // Liste de tous les �l�ments cloner lors du dernier clonage
        doydoy_last_clones = [];

    //////////////////////////////////////////////////////////
    // LISTE DES FONCTIONS DISPONIBLES EN DEHORS DU CLONAGE //
    //////////////////////////////////////////////////////////
    // R�cup�ration du nombre de clonage effectu�
    $.fn.doydoyGetCounter = function () {
        return doydoy_counter;
    };

    // R�cup�ration de la liste de tous les �l�ments cloner depuis le d�but
    $.fn.doydoyGetAllClones = function () {
        return doydoy_all_clones;
    };

    // R�cup�ration de la liste de tous les �l�ments cloner lors du dernier clonage
    $.fn.doydoyGetLastClones = function () {
        return doydoy_last_clones;
    };

    // R�cup�ration de l'id du dernier conteneur (parent) cr��
    $.fn.doydoyGetLastNewId = function () {
        return doydoy_new_id;
    };

    // Affectation du pr�fix pour un nouvel id au cas o� l'id n'existerait pas
    $.fn.doydoySetPrefixNewId = function (prefix_new_elt) {
        glob_prefix_new_elt = prefix_new_elt;
        return this;
    };

    // R�initialisation de la liste de tous les �l�ments cloner depuis le d�but
    $.fn.initAllClonesList = function () {
        doydoy_all_clones = [];
        return this;
    };

    /////////////////////////////////////////////////////
    // LISTE DES METHODES RACCOURCIES                  //
    /////////////////////////////////////////////////////
    // M�thode after pour le clonage
    $.fn.doydoyCloneAfter = function (params) {
        params = $.extend(params, {method : "after"});
        return this.doydoyClone(params);
    };
    // M�thode before pour le clonage
    $.fn.doydoyCloneBefore = function (params) {
        params = $.extend(params, {method : "before"});
        return this.doydoyClone(params);
    };
    // M�thode append pour le clonage
    $.fn.doydoyCloneAppend = function (params) {
        params = $.extend(params, {method : "append"});
        return this.doydoyClone(params);
    };
    // M�thode prepend pour le clonage
    $.fn.doydoyClonePrepend = function (params) {
        params = $.extend(params, {method : "prepend"});
        return this.doydoyClone(params);
    };

    /////////////////////////////////////////////////////
    // Plugin de clonage                               //
    /////////////////////////////////////////////////////
    $.fn.doydoyClone = function (params) {
        // type de traitement pour la fonction eval (after par d�faut)
        var function_plugin_name = 'after';

        // Fusionner les param�tres par d�faut et ceux de l'utilisateur
        params = $.extend({
            method         : "",
            target         : "",
            impact_name    : true,
            impact_for     : true,
            new_name       : false,
            new_all_name   : false,
            new_all_id     : false,
            prefix_new_elt : glob_prefix_new_elt
        }, params);

        if (params.new_all_name) {
            params.new_name = true;
        }

        // Incr�mentation du compter pour commencer � avoir des id � partir de 1 (idfoo_1) et sup�rieur au dernier clonage
        doydoy_counter += 1;

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
        this.each(function () {
            var
            // id sans le num�ro d'incr�mentation du futur conteneur (parent)
                id_elt,
            // �l�ment � cloner
                elt_a_cloner = this,
            // num�ro d'incr�mentation du futur conteneur (parent)
                doydoy_counter_clone = doydoy_counter,
            // R�cup�ration de l'�l�ment � qui rajouter les �l�ments
                dernier_element = "",
            // Num�ro de l'enfant par rapport � son parent
                cpt_child = 0,
            // id d'origine de l'enfant avant son nouvel id
                id_before = "",
            // nouvel id de l'enfant
                new_id = "",
            // nouveau nom de l'enfant
                new_name = "",
            // compteur for
                cpt_for = "";

            // Initialisation des derniers �l�ments clon�s
            doydoy_last_clones = [];

            // Initialisation du nouvel id
            doydoy_new_id = null;

            // D�finition de l'id (sans le num�ro d'incr�mentation) du futur conteneur (parent)
            if ($(this).attr('id') === undefined) {
                if ($(this).attr('name') !== undefined) {
                    id_elt = params.prefix_new_elt + $(this).attr('name');
                } else {
                    id_elt = params.prefix_new_elt + $(this).prop('tagName');
                }
            } else {
                id_elt = $(this).attr('id');
            }

            // R�cup�ration de l'�l�ment � qui rajouter les �l�ments clon�s et y affecter la m�thode after, before, ...
            // si non renseign�, on prend l'�l�ment � cloner
            if (params.target !== "") {
                dernier_element = params.target;
            } else {
                dernier_element = $(this);
            }

            // Clonage de l'ensemble des �l�ments
            function function_clone() {

                // retour de l'ensemble des �lements clon�s
                return $(elt_a_cloner).clone(true).each(function () {
                    // D�termination de l'd du parent clon�
                    doydoy_new_id = id_elt + "_" + doydoy_counter_clone;

                    $(this).attr('id', doydoy_new_id);

                    // D�termination du nouveau nom du parent clon� si on a choisi l'option
                    var new_name_parent = "";
                    if ($(this).attr('name') !== undefined) {
                        new_name_parent = $(this).attr('name');
                        if (params.new_name || params.impact_name) {
                            new_name_parent += "_" + doydoy_counter_clone;
                            $(this).attr('name', new_name_parent);
                        }
                    } else {
                        if (params.new_name) {
                            new_name_parent = doydoy_new_id;
                            $(this).attr('name', new_name_parent);
                        }
                    }

                    // Changement de l'attribut for qui fait r�f�rence � l'ancien id d'un input + "_" + num�ro de clonage
                    if ($(this).attr('for') !== undefined) {
                        if (params.impact_for) {
                            $(this).attr('for', $(this).attr('for') + "_" + doydoy_counter_clone);
                        }
                    }

                    // Sauvegarde de ce nouveau parent dans la liste de tous les �l�ments clon�s depuis le d�but
                    if (doydoy_all_clones['"' + doydoy_counter_clone + '"'] === undefined) {
                        doydoy_all_clones['"' + doydoy_counter_clone + '"'] = [];
                    }

                    doydoy_all_clones['"' + doydoy_counter_clone + '"'].parent = {id        : doydoy_new_id,
                                                                                     id_before : id_elt,
                                                                                     num_clone : doydoy_counter_clone,
                                                                                     name      : new_name_parent,
                                                                                     elt       : $(this)};
                    // Sauvegarde de ce nouveau parent dans la liste de tous les �l�ments clon�s lors du dernier clonage
                    doydoy_last_clones.parent = {id        : doydoy_new_id,
                                                    id_before : id_elt,
                                                    num_clone : doydoy_counter_clone,
                                                    name      : new_name_parent,
                                                    elt       : $(this)};
                    // incr�mentation du num�ro de clonage pour �viter d'avoir les m�mes ids
                    doydoy_counter_clone += 1;
                });
            }

            // parcourt de tous les enfants du conteneur cpt_for
            function each_child(cpt_for) {
                cpt_child = 0;

                $("#" + id_elt + "_" + cpt_for + " *").each(function () {
                    // D�termination du nouvel id de l'enfant en cours
                    if ($(this).attr('id') !== undefined) {
                        // r�cup�ration de l'id d'origine de l'enfant
                        id_before = $(this).attr('id');
                        new_id    = id_before + "_" + cpt_for;
                        // changement de l'id
                        $(this).attr('id', new_id);
                    } else {
                        // Initialisation de l'id d'origine et du nouvel id (car il n'en avait pas forc�ment)
                        id_before = "";
                        if (params.new_all_id) {
                            if ($(this).attr('name') !== undefined) {
                                new_id = params.prefix_new_elt + $(this).attr('name') + "_" + cpt_for;
                            } else {
                                new_id = params.prefix_new_elt + $(this).prop('tagName') + "_" + cpt_for;
                            }
                            // Changement de l'id
                            $(this).attr('id', new_id);
                        } else {
                            new_id = "";
                        }
                    }

                    // Changement du nom si on l'a demand� (params.new_name : true)
                    if ($(this).attr('name') !== undefined) {
                        new_name = $(this).attr('name');
                        if (params.new_all_name || params.impact_name) {
                            new_name += "_" + cpt_for;
                            $(this).attr('name', new_name);
                        }
                    } else {
                        if (params.new_all_name) {
                            if (new_id !== "") {
                                new_name = new_id;
                            } else {
                                new_name = params.prefix_new_elt + $(this).prop('tagName') + "_" + cpt_for;
                            }
                            $(this).attr('name', new_name);
                        } else {
                            new_name = "";
                        }
                    }

                    // nouvel r�f�rence pour l'attribut "for" d'un label qui fait r�f�rence � l'ancien id d'un input + "_" + num�ro de clonage
                    if ($(this).attr('for') !== undefined) {
                        if (params.impact_for) {
                            $(this).attr('for', $(this).attr('for') + "_" + cpt_for);
                        }
                    }

                    // Sauvegarde de ce nouvel enfant dans la liste de tous les �l�ments clon�s depuis le d�but
                    if (doydoy_all_clones['"' + cpt_for + '"'].child === undefined) {
                        doydoy_all_clones['"' + cpt_for + '"'].child = [];
                    }
                    doydoy_all_clones['"' + cpt_for + '"'].child[cpt_child] = {id        : new_id,
                                                                            id_before : id_before,
                                                                            num_clone : cpt_for,
                                                                            name      : new_name,
                                                                            elt       : $(this)};

                    // Sauvegarde de ce nouvel enfant dans la liste de tous les �l�ments clon�s lors du dernier clonage
                    if (cpt_for === (doydoy_counter_clone - 1)) {
                        doydoy_last_clones.child[cpt_child] = {id        : new_id,
                                                                  id_before : id_before,
                                                                  num_clone : cpt_for,
                                                                  name      : new_name,
                                                                  elt       : $(this)};
                        /*                                          
                        // fonction appel�e apr�s la cr�ation d'un nouvel enfant du dernier conteneur
                        if (params.each_last_child_callback != undefined){
                            params.each_last_child_callback('"' + cpt_for + '"', id_elt + "_" + cpt_for, cpt_child, new_id);
                        }
                        */
                    }

                    // fonction appel�e apr�s la cr�ation d'un nouveau conteneur
                    if (params.each_child_callback !== undefined) {
                        // param�tre 1 : "cpt_for"              correspond � l'index du conteneur -> doydoy_all_clones[cpt_for]                     -> commence � 1 => Num�ro du clonage
                        // param�tre 2 : id_elt + "_" + cpt_for correspond � l'id du conteneur clon�
                        // param�tre 3 : cpt_child        correspond � l'index de l'enfant  -> doydoy_all_clones[cpt_for]['child'][cpt_child] -> commence � 0
                        // param�tre 4 : new_id           correspond � l'id de l'enfant clon�
                        params.each_child_callback('"' + cpt_for + '"', id_elt + "_" + cpt_for, cpt_child, new_id);
                    }
                    // Incr�mentation de l'enfant pour passer au suivant
                    cpt_child += 1;
                });

                // fonction appel�e apr�s la cr�ation d'un nouveau conteneur
                if (params.each_callback !== undefined) {
                    // param�tre 1 : "cpt_for" correspond � l'index du conteneur -> doydoy_all_clones[cpt_for] -> commence � 1 => Num�ro du clonage
                    // param�tre 2 : id_elt + "_" + cpt_for correspond � l'id du conteneur clon�
                    params.each_callback('"' + cpt_for + '"', id_elt + "_" + cpt_for);
                }
            }
            // Ajout de l'ensemble clon� � l'�l�ment choisi avec la m�thode choisie (after, begin, prepend, append)
            //
            switch (function_plugin_name) {
            case "after":
                $(dernier_element).each(function () { $(this).after(function_clone()); });
                break;
            case "before":
                $(dernier_element).each(function () { $(this).before(function_clone()); });
                break;
            case "append":
                $(dernier_element).each(function () { $(this).append(function_clone()); });
                break;
            case "prepend":
                $(dernier_element).each(function () { $(this).prepend(function_clone()); });
                break;
            }
            // Initialisation de la liste des derniers enfants cr��s
            doydoy_last_clones.child = [];

            // R�-attribution des ids des �lements des conteneurs qui ont �t� cr��s
            for (cpt_for = doydoy_counter; cpt_for < doydoy_counter_clone; cpt_for += 1) {
                each_child(cpt_for);
            }
            // R�-initialisation du compteur de conteneurs (parents) cr��s
            doydoy_counter = doydoy_counter_clone - 1;
        });

        // fonction appel�e apr�s la cr�ation de tous les nouveaux conteneurs
        if (params.callback !== undefined) {
            params.callback();
        }

        // Permettre le cha�nage par jQuery
        return this;
    };
})(jQuery);
