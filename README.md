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

`$("#div_id_init").doydoyClone({prefix_new_elt: 'new_id'});`
 
##callback parametre :
The plugin allows you to insert functions at different time of treatment
###callback :
The callback parameter is a function that, if entered, is called at the end of cloning. This is the last action of the plugin.

`$("#div_id_init").doydoyClone({callback:function);`
        
        
###each_callback :
The each_callback parameter is a function that, if entered, is called at the end of the treatment of a container for each cloning.
```
$("#div_id_init").doydoyClone({each_callback:function("index_cloning", 
                                                      id_cloned_container){ ... }
                                                      });
```
###each_child_callback :
The each_child_callback parameter is a function that, if entered, is called at the end of treatment for each child of a container for each cloning.
```
$("#div_id_init").doydoyClone({each_child_callback:function("index_cloning", 
                                                            id_cloned_container, 
                                                            indice_cloned_child, 
                                                            id_cloned_child){ ... }
                                                            });
```

#Functions:
##doydoyGetCounter :
The doydoyGetCounter() function simply lets you know the number of clones that have occurred.

`var nbre_clone = $().doydoyGetCounter();`

##doydoyGetAllClones :
The doydoyGetLastClones() function to retrieve all elements cloned during the last cloning.
The function returns an array like this:  
```        
        array['"' + cloning_number + '"']['parent'] = {id        : doydoy_new_id,
                                                       id_before : id_elt,
                                                       num_clone : doydoy_counter_clone,
                                                       name      : new_name,
                                                       elt       : $(this)}
                                         ['child'][child_number] = {id        : new_id,
                                                                    id_before : id_before,
                                                                    num_clone : i,
                                                                    name      : new_name,
                                                                    elt       : $(this)}
```                                                                        
Call:
`$().doydoyGetAllClones();`

##doydoyGetLastClones :
The doydoyGetLastClones () function to retrieve all elements cloned during the last cloning.
The function returns an array like this:  
```        
        array['parent'] = {id        : doydoy_new_id,
                           id_before : id_elt,
                           num_clone : cloning_number,
                           name      : new_name,
                           elt       : $(this)}
             ['child'][child_number] = {id        : new_id,
                                         id_before : id_before,
                                         num_clone : cloning_number,
                                         name      : new_name,
                                         elt       : $(this)}
```                                                                 
Call:
`$().doydoyGetLastClones();`   

##doydoyGetLastNewId :   
The doydoyGetLastNewId () function simply retrieves the id of the last cloned container.

`var nbre_clone = $().doydoyGetLastNewId();`
       
##doydoySetPrefixNewId :
The doydoySetPrefixNewId() function lets you create for all cloning a new id attribute with the name attribute of the element or tag more the cloning number.
Indeed, the plugin requires the new container to have an id attribute.
If the container had already an id attribute "id_origine" his clone will have an id attribute like "id_origine_" + cloning_number.
Otherwise the container will necessarily have a new id attribute like this:

* If the container has a name attribute, the generated id attribute will be like "id_doydoy_clone_" + name_element + "_" + cloning_number.
* If the container has no id neither name attribute, the generated id attribute will be of the form "id_doydoy_clone_" + tag_element + "_" + cloning_number.
    
It is the same for all the children of the container if the new_all_id parameter was filled to true.
    
The doydoySetPrefixNewId() function allows to change the "id_doydoy_clone_" prefix that you want.
The prefix "id_doydoy_clone_" can also be changed each cloning through prefix_new_elt parameter.
    
`$().doydoySetPrefixNewId('new_id');`

##initAllClonesList :
The initAllClonesList() function allows you to reset the array containing the list of cloned elements (cf. new_all_id)

`$().initAllClonesList();`

#Shortcuts
##doydoyCloneAfter :
The doydoyCloneAfter function is exactly the same function as the method parameter doydoyClone filled with "after"

`$("#div_id_after").doydoyCloneAfter({target: $("#div_target_after")});`
with doydoyClone : 
```      
        $("#div_id_after").doydoyClone({
                                        target: $("#div_target_after"),
                                        method: "after"
                                        });
```        

##doydoyCloneBefore :
The doydoyCloneBefore function is exactly the same function as the method parameter doydoyClone filled with "before"

`$("#div_id_before").doydoyCloneBefore({target: $("#div_target_before")});`
with doydoyClone : 
```      
        $("#div_id_before").doydoyClone({
                                        target: $("#div_target_before"), 
                                        method: "before"
                                        });
```               
                                            
##doydoyCloneAppend :
The doydoyCloneAppend function is exactly the same function as the method parameter doydoyClone filled with "append"

`$("#div_id_append").doydoyCloneAppend({target: $("#div_target_append")});`
with doydoyClone : 
```             
        $("#div_id_append").doydoyClone({
                                        target: $("#div_target_append"), 
                                        method: "append"
                                        });
```            
                                               
##doydoyClonePrepend :
The doydoyClonePrepend function is exactly the same function as the method parameter doydoyClone filled with "prepend"

`$("#div_id_prepend").doydoyClonePrepend({target: $("#div_target_prepend")});`
with doydoyClone : 
```      
        $("#div_id_prepend").doydoyClone({
                                        target: $("#div_target_prepend"), 
                                        method: "prepend"
                                        });
```                

Documentation and examples (in french):  http://www.doydoyclone.doydoy44.com/

Licence : MIT
