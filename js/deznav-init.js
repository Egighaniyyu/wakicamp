
"use strict"

var dezSettingsOptions = {};

function getUrlParams(dParam) 
	{
		var dPageURL = window.location.search.substring(1),
			dURLVariables = dPageURL.split('&'),
			dParameterName,
			i;

		for (i = 0; i < dURLVariables.length; i++) {
			dParameterName = dURLVariables[i].split('=');

			if (dParameterName[0] === dParam) {
				return dParameterName[1] === undefined ? true : decodeURIComponent(dParameterName[1]);
			}
		}
	}

(function($) {
	
	"use strict"
	
	var direction =  getUrlParams('dir');
	
	if(direction == 'rtl'){
        direction = 'rtl'; 
    }else{
        direction = 'ltr'; 
    }
	
	dezSettingsOptions = {
		typography: "poppins",
		version: getCookie('version') || "light",
		layout: "vertical",
		primary: "color_9",
		headerBg: "color_9",
		navheaderBg: "color_9",
		sidebarBg: "color_9",
		sidebarStyle: "full",
		sidebarPosition: "fixed",
		headerPosition: "fixed",
		containerLayout: "full",
		direction: direction
	};
	
	
	new dezSettings(dezSettingsOptions); 

	jQuery(window).on('resize',function(){
		/*Check container layout on resize */
		///alert(dezSettingsOptions.primary);
		
		dezSettingsOptions.containerLayout = $('#container_layout').val();
		
		/*Check container layout on resize END */
		new dezSettings(dezSettingsOptions); 
		
	});

	if(direction == 'rtl' || body.attr('direction') == 'rtl'){ 
		direction = 'rtl';
		jQuery('.main-css').attr('href','css/style-rtl.css');
	}else{
		direction = 'ltr';
		jQuery('.main-css').attr('href','css/style.css');
	}
	
	if (jQuery(".dz-theme-mode").length > 0) {
		jQuery('.dz-theme-mode').on('click', function () {
			jQuery(this).toggleClass('active');
			var isActive = jQuery(this).hasClass('active');
			var isTheme = isActive ? 'dark' : 'light';

			jQuery('body').attr('data-theme-version', isTheme);
			setCookie('version', isTheme);
			jQuery('#theme_version').val(isTheme);

			var logoSrc = isActive ? "./images/logo-white.png" : "./images/logo.png";
			var logoSrcText = isActive ? "images/logo-text-white.png" : "images/logo-text.png";
			
			jQuery(".nav-header .logo-abbr").attr("src", logoSrc);
			jQuery(".nav-header .logo-compact").attr("src", logoSrcText);
			jQuery(".nav-header .brand-title").attr("src", logoSrcText);

			setCookie('logo_src', logoSrc);
			setCookie('logo_src2', logoSrcText);

			$('.default-select').selectpicker('refresh');

			// Sync settings
			dezSettingsOptions.version = isTheme;
		});

		// Initialize theme mode based on cookie
		var version = getCookie('version') || dezSettingsOptions.version;
		jQuery('body').attr('data-theme-version', version);
		
		if (version === "dark") {
			jQuery('.dz-theme-mode').addClass('active');
		}
	}
	
})(jQuery);

/* Cookies Function */
function setCookie(cname, cvalue, exhours) 
	{
		var d = new Date();
		d.setTime(d.getTime() + (30*60*1000)); /* 30 Minutes */
		var expires = "expires="+ d.toString();
		document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
	}

function getCookie(cname) 
	{
		var name = cname + "=";
		var decodedCookie = decodeURIComponent(document.cookie);
		var ca = decodedCookie.split(';');
		for(var i = 0; i <ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) == ' ') {
				c = c.substring(1);
			}
			if (c.indexOf(name) == 0) {
				return c.substring(name.length, c.length);
			}
		}
		return "";
	}

function deleteCookie(cname) 
	{
		var d = new Date();
		d.setTime(d.getTime() + (1)); // 1/1000 second
		var expires = "expires="+ d.toString();
		//document.cookie = cname + "=1;" + expires + ";path=/";
		document.cookie = cname + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT"+";path=/";
	}

function deleteAllCookie(reload = true)
	{
		jQuery.each(themeOptionArr, function(optionKey, optionValue) {
				deleteCookie(optionKey);
		});
		if(reload){
			location.reload();
		}
	}
 	
/* Cookies Function END */	
 	