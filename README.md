TAGGER.JS
=========

Tagger.js is a jQuery plugin for tagging models

DEPENDENCIES
============

* jQuery (tested with 1.4.2)
* jQueryUI (tested with 1.8.2)
* jQueryUI-autocomplete

USAGE
=====

html with no preexisting tags:

    <ul id="user_tags"></ul>

with preexisting tags:
    
    <ul id="user_tags">
      <li>weldyss</li>
      <li>samflores</li>
    </ul>

javascript:

    $(function() { $("#user_tags").tagger(); });


PARAMETERS
==========

**source**: an array with the preexisting tags

    $("#user_tags").tagger({ 
      source: [
        "dmitrynix", "cleitonfco", "samflores",
        "caironoleto", "weldyss", "cyruscavalcante", 
        "italoveloso", "ewertonsjp", "pauloh"
      ] 
    });