doydoyClone
===========

#Principle:
The principle is to clone a group of elements (div, span, fieldset, form ...) by managing id and name attributes that have been created.
The created group will be added before or after another element with the After() , before(), append() and prepend() methods.

#Installation:
After the declaration of jquery:

`<script type="text/javascript" src="js/jquery.doydoyclone.min.js"></script>`

#Use:
To Clone id_origine block after id_target element:

`$("#id_origine").doydoyClone({target: $("#id_target"), method:"after"});`


#Parameters:
##method :
The method parameter determines how the cloned group will be added (after(), before(), append() and prepend()).
```
    $("#div_id_init").doydoyClone({
                                target: $("#div_target"), 
                                method: "after" // or before, or append, or prepend
                                });
```                            
##target :
The target parameter is used to select the target where will be added to the group cloned by the chosen method (after(), before(), append() and prepend()).
```
$("#div_id_init").doydoyClone({
                            target: $("#div_target"),
                            });
```
##impact_name :
The impact_name parameter is used to take account the incrementation of the name attribute.

`$("#div_id_init").doydoyClone({impact_name: true});`

##impact_for :
The impact_for parameter ais used to take account the incrementation of the for attribute.

`$("#div_id_init").doydoyClone({impact_for: true});`

##new_name :
The new_name parameter is used to add the name attribute to the cloned container.

`$("#div_id_init").doydoyClone({new_name: true});`

##new_all_name :
The new_all_name parameter is used to add the name attribute of the container cloned and the name attribute of all children of this container.

`$("#div_id_init").doydoyClone({new_all_name: true});`

##new_all_id :
The new_all_id parameter is used to add the id attribute of all children of this container.

`$("#div_id_init").doydoyClone({new_all_id: true});`

##prefix_new_elt :
The prefix_new_elt parameter is used to change the prefix of a new id or name attribute has been created.

`$("#div_id_init").doydoyClone({prefix_new_elt: 'nouvel_id'});`
 
##callback parametre :
The plugin allows you to insert functions at different time of treatment
###callback :
The callback parameter is a function that, if entered, is called at the end of cloning. This is the last action of the plugin.

`$("#div_id_init").doydoyClone({callback:function);`
        
        
###each_callback :
The each_callback parameter is a function that, if entered, is called at the end of the treatment of a container for each cloning.
```
$("#div_id_init").doydoyClone({each_callback:function("indice_clonage", 
                                                      id_conteneur_cloné){ ... }
                                                      });
```
###each_child_callback :
The each_child_callback parameter is a function that, if entered, is called at the end of treatment for each child of a container for each cloning.
```
$("#div_id_init").doydoyClone({each_child_callback:function("indice_clonage", 
                                                            id_conteneur_cloné, 
                                                            indice_enfant_cloné, 
                                                            id_enfant_cloné){ ... }
                                                            });
```


Documentation and examples (in french):  http://www.doydoyclone.doydoy44.com/

Licence : MIT
