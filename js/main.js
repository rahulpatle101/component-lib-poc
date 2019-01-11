//Activate Tooltipster
$(document).ready(function() {
	// Init Tooltip
	$('.tooltip').tooltipster({
		theme: 'tooltipster-theme-alarm',
		arrow: false,
		contentCloning: true,
		contentAsHTML: true,
    functionInit: function(instance, helper){
        var $origin = $(helper.origin),
            dataOptions = $origin.attr('data-tooltipster');
        if(dataOptions){
            dataOptions = JSON.parse(dataOptions);
            $.each(dataOptions, function(name, option){
                instance.option(name, option);
            });
        }
    }
	});

// Init Popover which is extended from Tooltip
	$('.popover').tooltipster({
		contentCloning: true,
		contentAsHTML: true,
		theme: 'tooltipster-theme-light',
		trigger: 'click',
		interactive: true,
		triggerClose: 'custom',
		maxWidth: 360,
		maxHeight: 260,
    functionInit: function(instance, helper){
      var $origin = $(helper.origin),
          dataOptions = $origin.attr('data-tooltipster');
      if(dataOptions){
        dataOptions = JSON.parse(dataOptions);
        $.each(dataOptions, function(name, option){
            instance.option(name, option);
						if (name == 'popover-size') {
							if (option == 'large') {
								instance.option('maxWidth', 420);
								instance.option('maxHeight', 320);
							} else if (option == 'extra-small') {
								instance.option('maxWidth', 400);
								instance.option('maxHeight', 60);
							}
						}
						if (name == 'theme') {
							if (option == 'dark') {
								instance.option('theme', 'tooltipster-theme-alarm');
							} else if (option == 'light') {
								instance.option('theme', 'tooltipster-theme-light');
							}
						}
        });
      }
    },
		functionPosition: function(instance, helper, position){
			var $origin = $(helper.origin),
          dataOptions = $origin.attr('data-tooltipster');
      if(dataOptions){
        dataOptions = JSON.parse(dataOptions);
        $.each(dataOptions, function(name, option){
            instance.option(name, option);
						if (name == 'popover-size') {
							if (option == 'large') {
								instance.option('maxWidth', 420);
								instance.option('maxHeight', 320);
							} else if (option == 'extra-small') {
								instance.option('maxWidth', 400);
								instance.option('maxHeight', 60);
							}
						}
						if (name == 'theme') {
							if (option == 'dark') {
								instance.option('theme', 'tooltipster-theme-alarm');
							} else if (option == 'light') {
								instance.option('theme', 'tooltipster-theme-light');
							}
						}
						if (name == 'placement') {
							if (option == 'right-top' || option == 'left-top') {
									console.log('right-top, left-top');
								  position.coord.top += 10;
					        return position;

								} else if (option == 'right-bottom'|| option == 'left-bottom'){
									console.log('right-bottom, left-bottom');
									position.coord.top -= 10;
									instance.option('minIntersection', 40);
									return position;

								} else if (option == 'top-left' || option == 'bottom-left') {
									console.log('top-left');
									instance.option('minIntersection', 10);
									position.coord.left += 130;
									return position;
								}
								 else if (option == 'bottom-right' || option == 'top-right') {
									console.log('bottom-right, top-right');
									position.coord.left -= 130;
									return position;
							}
						}
        });
      }
        return position;
    }

	});
});

//closes popover onclicking the Close (X) icon
function closePopover() {
	$('.popover').tooltipster('close');
}

function navOffEdge() {
  if ($(window).width() < 1111) {
    $(".dropdown-content.small").addClass("right-edge");
  } else {
    $(".dropdown-content.small").removeClass("right-edge");
  }
}

$(function(){
  $(window).resize(function() {
    navOffEdge();
  });
  navOffEdge();
});

//Making the accordion anchor active
var anchorSelector = ".liContainer li a"
$(anchorSelector).on('click', function(){
	$(anchorSelector).removeClass('active');
	$(this).addClass('active');
});

//File Upload
$('.file-upload input').change(function () {
	$('.file-upload p').text(this.files.length + " file(s) selected");
});

//Toggle Code Snippet
function toggleSnippet(element) {
	$( "."+element ).slideToggle( "slow");
	var text = $("#"+element).text();
	$("#"+element).text(text == "Show Code Snippet" ? "Hide Code Snippet" : "Show Code Snippet");
}
