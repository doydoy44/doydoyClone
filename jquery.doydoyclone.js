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
    // Variables globales au plugin mais privée        //
    // (non accessible en dehors du plugin)            //
    /////////////////////////////////////////////////////
    var
    // nbre de clonage pour éviter d'avoir les mêmes ids
        doydoy_counter = 0,
    // nouvel id du conteneur(parent) créé
        doydoy_new_id = null,
    // préfix d'un nouvel id au cas où l'id n'existerait pas
        glob_prefix_new_elt = "id_doydoy_clone_",
    // Liste de tous les éléments cloner depuis le début
        doydoy_all_clones = [],
    // Liste de tous les éléments cloner lors du dernier clonage
        doydoy_last_clones = [];

    //////////////////////////////////////////////////////////
    // LISTE DES FONCTIONS DISPONIBLES EN DEHORS DU CLONAGE //
    //////////////////////////////////////////////////////////
    // Récupération du nombre de clonage effectué
    $.fn.doydoyGetCounter = function () {
        return doydoy_counter;
    };

    // Récupération de la liste de tous les éléments cloner depuis le début
    $.fn.doydoyGetAllClones = function () {
        return doydoy_all_clones;
    };

    // Récupération de la liste de tous les éléments cloner lors du dernier clonage
    $.fn.doydoyGetLastClones = function () {
        return doydoy_last_clones;
    };

    // Récupération de l'id du dernier conteneur (parent) créé
    $.fn.doydoyGetLastNewId = function () {
        return doydoy_new_id;
    };

    // Affectation du préfix pour un nouvel id au cas où l'id n'existerait pas
    $.fn.doydoySetPrefixNewId = function (prefix_new_elt) {
        glob_prefix_new_elt = prefix_new_elt;
        return this;
    };

    // Réinitialisation de la liste de tous les éléments cloner depuis le début
    $.fn.initAllClonesList = function () {
        doydoy_all_clones = [];
        return this;
    };

    /////////////////////////////////////////////////////
    // LISTE DES METHODES RACCOURCIES                  //
    /////////////////////////////////////////////////////
    // Méthode after pour le clonage
    $.fn.doydoyCloneAfter = function (params) {
        params = $.extend(params, {method : "after"});
        return this.doydoyClone(params);
    };
    // Méthode before pour le clonage
    $.fn.doydoyCloneBefore = function (params) {
        params = $.extend(params, {method : "before"});
        return this.doydoyClone(params);
    };
    // Méthode append pour le clonage
    $.fn.doydoyCloneAppend = function (params) {
        params = $.extend(params, {method : "append"});
        return this.doydoyClone(params);
    };
    // Méthode prepend pour le clonage
    $.fn.doydoyClonePrepend = function (params) {
        params = $.extend(params, {method : "prepend"});
        return this.doydoyClone(params);
    };

    /////////////////////////////////////////////////////
    // Plugin de clonage                               //
    /////////////////////////////////////////////////////
    $.fn.doydoyClone = function (params) {
        // type de traitement pour la fonction eval (after par défaut)
        var function_plugin_name = 'after';

        // Fusionner les paramètres par défaut et ceux de l'utilisateur
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

        // Incrémentation du compter pour commencer à avoir des id à partir de 1 (idfoo_1) et supérieur au dernier clonage
        doydoy_counter += 1;

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
        this.each(function () {
            var
            // id sans le numéro d'incrémentation du futur conteneur (parent)
                id_elt,
            // élément à cloner
                elt_a_cloner = this,
            // numéro d'incrémentation du futur conteneur (parent)
                doydoy_counter_clone = doydoy_counter,
            // Récupération de l'élément à qui rajouter les éléments
                dernier_element = "",
            // Numéro de l'enfant par rapport à son parent
                cpt_child = 0,
            // id d'origine de l'enfant avant son nouvel id
                id_before = "",
            // nouvel id de l'enfant
                new_id = "",
            // nouveau nom de l'enfant
                new_name = "",
            // compteur for
                cpt_for = "";

            // Initialisation des derniers éléments clonés
            doydoy_last_clones = [];

            // Initialisation du nouvel id
            doydoy_new_id = null;

            // Définition de l'id (sans le numéro d'incrémentation) du futur conteneur (parent)
            if ($(this).attr('id') === undefined) {
                if ($(this).attr('name') !== undefined) {
                    id_elt = params.prefix_new_elt + $(this).attr('name');
                } else {
                    id_elt = params.prefix_new_elt + $(this).prop('tagName');
                }
            } else {
                id_elt = $(this).attr('id');
            }

            // Récupération de l'élément à qui rajouter les éléments clonés et y affecter la méthode after, before, ...
            // si non renseigné, on prend l'élément à cloner
            if (params.target !== "") {
                dernier_element = params.target;
            } else {
                dernier_element = $(this);
            }

            // Clonage de l'ensemble des éléments
            function function_clone() {

                // retour de l'ensemble des élements clonés
                return $(elt_a_cloner).clone(true).each(function () {
                    // Détermination de l'd du parent cloné
                    doydoy_new_id = id_elt + "_" + doydoy_counter_clone;

                    $(this).attr('id', doydoy_new_id);

                    // Détermination du nouveau nom du parent cloné si on a choisi l'option
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

                    // Changement de l'attribut for qui fait référence à l'ancien id d'un input + "_" + numéro de clonage
                    if ($(this).attr('for') !== undefined) {
                        if (params.impact_for) {
                            $(this).attr('for', $(this).attr('for') + "_" + doydoy_counter_clone);
                        }
                    }

                    // Sauvegarde de ce nouveau parent dans la liste de tous les éléments clonés depuis le début
                    if (doydoy_all_clones['"' + doydoy_counter_clone + '"'] === undefined) {
                        doydoy_all_clones['"' + doydoy_counter_clone + '"'] = [];
                    }

                    doydoy_all_clones['"' + doydoy_counter_clone + '"'].parent = {id        : doydoy_new_id,
                                                                                     id_before : id_elt,
                                                                                     num_clone : doydoy_counter_clone,
                                                                                     name      : new_name_parent,
                                                                                     elt       : $(this)};
                    // Sauvegarde de ce nouveau parent dans la liste de tous les éléments clonés lors du dernier clonage
                    doydoy_last_clones.parent = {id        : doydoy_new_id,
                                                    id_before : id_elt,
                                                    num_clone : doydoy_counter_clone,
                                                    name      : new_name_parent,
                                                    elt       : $(this)};
                    // incrémentation du numéro de clonage pour éviter d'avoir les mêmes ids
                    doydoy_counter_clone += 1;
                });
            }

            // parcourt de tous les enfants du conteneur cpt_for
            function each_child(cpt_for) {
                cpt_child = 0;

                $("#" + id_elt + "_" + cpt_for + " *").each(function () {
                    // Détermination du nouvel id de l'enfant en cours
                    if ($(this).attr('id') !== undefined) {
                        // récupération de l'id d'origine de l'enfant
                        id_before = $(this).attr('id');
                        new_id    = id_before + "_" + cpt_for;
                        // changement de l'id
                        $(this).attr('id', new_id);
                    } else {
                        // Initialisation de l'id d'origine et du nouvel id (car il n'en avait pas forcément)
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

                    // Changement du nom si on l'a demandé (params.new_name : true)
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

                    // nouvel référence pour l'attribut "for" d'un label qui fait référence à l'ancien id d'un input + "_" + numéro de clonage
                    if ($(this).attr('for') !== undefined) {
                        if (params.impact_for) {
                            $(this).attr('for', $(this).attr('for') + "_" + cpt_for);
                        }
                    }

                    // Sauvegarde de ce nouvel enfant dans la liste de tous les éléments clonés depuis le début
                    if (doydoy_all_clones['"' + cpt_for + '"'].child === undefined) {
                        doydoy_all_clones['"' + cpt_for + '"'].child = [];
                    }
                    doydoy_all_clones['"' + cpt_for + '"'].child[cpt_child] = {id        : new_id,
                                                                            id_before : id_before,
                                                                            num_clone : cpt_for,
                                                                            name      : new_name,
                                                                            elt       : $(this)};

                    // Sauvegarde de ce nouvel enfant dans la liste de tous les éléments clonés lors du dernier clonage
                    if (cpt_for === (doydoy_counter_clone - 1)) {
                        doydoy_last_clones.child[cpt_child] = {id        : new_id,
                                                                  id_before : id_before,
                                                                  num_clone : cpt_for,
                                                                  name      : new_name,
                                                                  elt       : $(this)};
                        /*                                          
                        // fonction appelée après la création d'un nouvel enfant du dernier conteneur
                        if (params.each_last_child_callback != undefined){
                            params.each_last_child_callback('"' + cpt_for + '"', id_elt + "_" + cpt_for, cpt_child, new_id);
                        }
                        */
                    }

                    // fonction appelée après la création d'un nouveau conteneur
                    if (params.each_child_callback !== undefined) {
                        // paramètre 1 : "cpt_for"              correspond à l'index du conteneur -> doydoy_all_clones[cpt_for]                     -> commence à 1 => Numéro du clonage
                        // paramètre 2 : id_elt + "_" + cpt_for correspond à l'id du conteneur cloné
                        // paramètre 3 : cpt_child        correspond à l'index de l'enfant  -> doydoy_all_clones[cpt_for]['child'][cpt_child] -> commence à 0
                        // paramètre 4 : new_id           correspond à l'id de l'enfant cloné
                        params.each_child_callback('"' + cpt_for + '"', id_elt + "_" + cpt_for, cpt_child, new_id);
                    }
                    // Incrémentation de l'enfant pour passer au suivant
                    cpt_child += 1;
                });

                // fonction appelée après la création d'un nouveau conteneur
                if (params.each_callback !== undefined) {
                    // paramètre 1 : "cpt_for" correspond à l'index du conteneur -> doydoy_all_clones[cpt_for] -> commence à 1 => Numéro du clonage
                    // paramètre 2 : id_elt + "_" + cpt_for correspond à l'id du conteneur cloné
                    params.each_callback('"' + cpt_for + '"', id_elt + "_" + cpt_for);
                }
            }
            // Ajout de l'ensemble cloné à l'élément choisi avec la méthode choisie (after, begin, prepend, append)
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
            // Initialisation de la liste des derniers enfants créés
            doydoy_last_clones.child = [];

            // Ré-attribution des ids des élements des conteneurs qui ont été créés
            for (cpt_for = doydoy_counter; cpt_for < doydoy_counter_clone; cpt_for += 1) {
                each_child(cpt_for);
            }
            // Ré-initialisation du compteur de conteneurs (parents) créés
            doydoy_counter = doydoy_counter_clone - 1;
        });

        // fonction appelée après la création de tous les nouveaux conteneurs
        if (params.callback !== undefined) {
            params.callback();
        }

        // Permettre le chaînage par jQuery
        return this;
    };
})(jQuery);
