(function($) {
	$.fn.extend({
	  tagger: function (options) {
      var defaults = {source: []};
      var options = $.extend(defaults, options);
	    
	    return this.each(function() {
    		var $el = $(this);

        
    		var field_name;
    		$el.addClass("tagger");
    		if (/^(\w+?)_(.*)$/.match( $el.attr("id") )) {
          var result = /^(\w+?)_(.*)$/.exec( $el.attr("id") );  
          field_name = result[1]+"["+result[2]+"][]";
    		} else {
    		  field_name = $el.attrib("id");
    		}

    		$el.append("<li class=\"tagger-new\"><input class=\"tagger-input\" type=\"text\" /></li>\n");
    		var $input	= $(".tagger-input", $el);
    		
    		$("li", $el).not(".tagger-new").each(function (index, li){
    		  $(li).remove();
          create_item($(li).text());
        });
        
    		$el.click(function(e){
    			if (e.target.tagName == 'A')
    				$(e.target).parent().remove();
    			else
    				$input.focus();
    		});
    		
    		$input.blur(function() { add_item(); })
    		  .keydown(function(event) {
    			  if (event.which == 8 && $input.val() == "")
      					$el.children(".tagger-item:last").remove();})
      		.keypress(function(event) {
    			  if (event.which == 44 || event.which == 13 )
    				  add_item();})
    		  .autocomplete({ source: options.source, select: autocompleteSelect });
    		
    		function autocompleteSelect(event,ui){
  				if (is_new (ui.item.value))
  					create_item(ui.item.value);
  				$input.val("");
  				return false;
  			}
    		function add_item() {
    		  event.preventDefault();
    		  var typed = $input.val().replace(/,+$/, "").trim();
    			if (typed != "") {
    				if (is_new (typed))
    					create_item(typed);
    				$input.val("");
            $(".tagger-input").autocomplete("option", "source", $.merge( options.source, [typed] ));
    			}
    		}
    		function is_new(value){
    		  var result = true;
    			$input.parents("ul").children(".tagger-item").each(function(i){
    				if (value == $(this).children("input").val()) {
    					result = false;
    					return false;
    				}
    			})
    			return result;
    		}
    		function create_item(value){
    			var el = "";
    			el  = "<li class=\"tagger-item\">\n";
    			el += value + "\n";
    			el += "<a class=\"close\">x</a>\n";
    			el += "<input type=\"hidden\" style=\"display:none;\" value=\""+value+"\" name=\""+field_name+"\">\n";
    			el += "</li>\n";
    			$(el).insertBefore($input.parent());
    			$input.val("");
    		}
      	String.prototype.trim = function() {
      		return this.replace(/^\s+|\s+$/g,"");
      	};
      });
	  }
  });
})(jQuery);
