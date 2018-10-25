function init(){
	onTabSelected('tab-curso'); //tab-curso');
	
}

function onTabSelected(dataId){
	
	var option = jQuery('#nav-profesor ul [data-id="' + dataId+ '"]');
	
	var li = jQuery(option).parent();
	li.addClass('active');

	jQuery('#nav-profesor ul a').removeClass('active-link'); 
	option.addClass('active-link');	

	jQuery('#nav-profesor i.glyphicon').removeClass('glyphicon-menu-hamburger').addClass('glyphicon-ok');

	var icon = jQuery(option).find('i.glyphicon');
	icon.removeClass('glyphicon-ok').addClass('glyphicon-menu-hamburger');
	
	var tabTitle = jQuery(option).find('.tab-title')[0].innerHTML;

	//Espera a que el titulo haya salido de la pantalla antes de volver a iniciar la animacion
	jQuery('.tab-container .active-tab-name').removeClass('animate');	
	setTimeout(function (){ 			
		jQuery('.tab-container .active-tab-name').text(tabTitle);
		jQuery('.tab-container .active-tab-name').addClass('animate');
	}, 100);
	
	//Oculta el activo anterior y lo desmarca como activo
	jQuery(".tab-container .tab-content").hide();
	//Muestra el nuevo activo	
	jQuery(".tab-container #"+dataId).show();
	
	
	
	

	
	

}

window.addEventListener("load", function(event){
	init();
	

	jQuery('body').on('click', '.prof-menu-item a', function(e){		
		
		var id = jQuery(this).data('id');
		onTabSelected(id);		
	});
}, false);


/*
* Cargue de la página y retorno de información
*/
function setResponse(resp){
	if(typeof(resp) != "undefined" && resp !== null){
		if(resp.status){
			jQuery('#prof_ajax_url').parent().append(resp.data);
		}else{
			serError(resp.msg);
		}
	}else{
		serError('Error desconocido, por favor intente de nuevo.');
	}
}

//en caso de error, ya sea por catch o por lógica
function serError(e){
	jQuery('#prof_error span.error').text(e);
	jQuery('#prof_error').show();
}

/*Ajax functions*/
function getInfo(){
	if(jQuery('#prof_ajax_url').length){
		ajaxurl = jQuery('#prof_ajax_url').val();
		console.log('Inicia ajax de consulta de información');
		try{
			jQuery.ajax({
				url: ajaxurl,
				type: 'get',
				dataType: "json",
				beforeSend: function(){
					jQuery('#prof_wait').show();
				},
				success: function(json){
					setResponse(json);
				},
				error: function(e){
					serError(e);
				},
				complete: function(jqXHR){
					//se ejecuta en todos loa casos, sea error, o success
					console.log('La consulta finaliza con estado: ' + jqXHR.status + ' (' + jqXHR.statusText + ').' );
					jQuery('#prof_wait').hide();
				}
			});
		}catch(e){
			jQuery('#prof_wait').hide();
			serError(e);
		}
	}else{
		console.log('no fue posible obtener la url de consulta.');
	}
}
