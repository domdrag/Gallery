$(document).ready(function(){
    	$('img').hide();
	$('p').hide();
	init();
	$(':button').on('click', show_gallery);
});

function init(){
	var number_of_galleries = $('.gallery').length;
    	for (var i = 0; i < number_of_galleries; ++i){
        	var gallery_name = $('<h1>')
                	.html( $('div').eq(i).attr('title') )
                 	.css('font-size', 'medium');

       		var button = $('<button>')
			.prop('id', i)
			.prop('disabled', null)
                	.html('Pogledaj galeriju!');
                
        	$('div').eq(i).append(gallery_name);
        	$('div').eq(i).append(button);
        }
}

function show_gallery(){

	for (var i = 0; i < $('.gallery').length; ++i){
		$('div').eq(i).find('button').attr('disabled','true');
	}
	
	//var div = $('<div>')
	//	.prop('id','gallery')
	//	.css('position', 'absolute')
        //	.css('left', '10%')
       	//	.css('top', '10%')
        //	.css('width', '80%')
        //	.css('height', '80%')
        //	.css('background-color', '#0000A0')

	var div = document.createElement("div");
	div.style.position = 'absolute';
	div.id = 'gallery';
	div.style.left = '10%';
	div.style.top = '10%';
	div.style.width = '80%';
	div.style.height = '80%';
	div.style.backgroundColor = '#0000A0';

	
	var images_contain = false;
	var number_of_pics = 0;
	var div_number = this.id;

	$('.gallery').each(function() {
    		if ($(this).find('img').length > 1 && $('div').eq(div_number).attr('title') == $(this).attr('title') ) {
        		images_contain = true;	
			number_of_pics = $(this).find('img').length;	
    		}
	});


	var next = $('<button>')
		.prop('id','next')
		.prop('disabled', null)
		.html('>> </button>')
		.css('position', 'absolute')
        	.css('bottom','0%')
		.css('right','26%')
		.css('height', '50')
		.css('width', '50')
        	.css('background-color', 'green');

	var previous = $('<button>')
		.html('<<' + '</button>')
		.prop('id', 'previous')
		.prop('disabled', 'true')
		.css('position', 'absolute')
		.css('left', '20%')
        	.css('bottom', '0%')
       		.css('height', '50')
		.css('width', '50')
        	.css('background-color', '#D3D3D3');

	var close = $('<button>')
		.prop('id','close')
		.html('X </button>')
        	.css('position', 'absolute')
       		.css('right', '0')
        	.css('top', '0')
		.css('height', '50')
		.css('width', '50')
        	.css('background-color', 'red');


	if (!images_contain)
		next.css('background-color', '#D3D3D3');

	var current_image = 0;
	//prva slika u div-u
	var image = $('<img>')
		.prop('id','image')
		.prop('src', $("div:eq('"+div_number+"') img").attr('src'))
		.css('position', 'absolute')
		.css('padding-left', '10%')
        	.css('padding-top', '2%');
	
	//Namjestam odgovarajucu velicinu slike tako da omjer ostane isti
	//Krecem od toga da mi max_height bude <= 80% visine div-a
	var w = image.prop("naturalWidth");
	var h = image.prop("naturalHeight");
	$('body').append(div);
	var div_width = document.getElementById('gallery').clientWidth;
	var div_height = document.getElementById('gallery').clientHeight;
	//var div_width = (80*document.documentElement.clientWidth) / 100;
	//var div_height = (80*document.documentElement.clientHeight) / 100;
	var index = 1;
	var max_height = (80*div_height) / 100;
	while ( (max_height*w)/h > (80*div_width)/100 ){
		max_height = ((80-index)*div_height)/100;
		index++;
	}

	image.css('width',(max_height*w)/h);
	image.css('height', max_height);
	
	
	//trazim paragraph za sliku
	for (var i = 0; i < number_of_pics; ++i)
		if ($('div').eq(div_number).find('p')[i].getAttribute('data-target') == $("div:eq('"+div_number+"') img").attr('src'))
			break;

	var paragraph = $('<p>')
		.html($('div').eq(div_number).find('p')[i].innerText)
		.css('position', 'absolute')
		.css('bottom','4%')
		.css('left','40%')
		.css('display', 'inline')
		.css('color', 'white')
		.css('height', '2%')
		.css('width', '20%')
		.css('white-space','wrap')
        	.css('background-color', '#0000A0');

	var pictures = $('<p>')
		.html('Slika 1/' + number_of_pics)
		.css('position', 'absolute')
		.css('bottom','12%')
		.css('left','45%')
		.css('display', 'inline')
		.css('color', 'white')
		.css('height', '1%')
		.css('width', '10%')
		.css('white-space','wrap')
        	.css('background-color', '#0000A0');

	$(div).append(image);
	$(div).append(paragraph);
	$(div).append(pictures);
	if (number_of_pics > 0){
		$(div).append(next);
		$(div).append(previous);
	}
	$(div).append(close);

	$('#close').on( 'click', function(){
		for (var i = 0; i < $('.gallery').length; ++i){
			$('div').eq(i).find('button').attr('disabled',null);
		}

		$('#gallery').remove();
	
	});

	//Ako se klikne sljedeca slika
	$('#next').on( 'click', function(){
		if (current_image >= number_of_pics - 1 )
			return;
		for(var i = 0; i < number_of_pics; ++i){
			if ($('div').eq(div_number).find('img')[i].src == image.prop('src')){
				image.prop('src', $('div').eq(div_number).find('img')[i+1].src);
				current_image++;
				break;
			}
		}

		var w = image.prop("naturalWidth");
		var h = image.prop("naturalHeight");
		var index = 1;
		var max_height = (80*div_height) / 100;
		while ( (max_height*w)/h > (80*div_width)/100 ){
			max_height = ((80-index)*div_height)/100;
			index++;
		}
		image.css('width',(max_height*w)/h);
		image.css('height', max_height);

		i=i+2;
		pictures.html('Slika ' + i +'/' + number_of_pics);

		for (var i = 0; i < number_of_pics; ++i){
			var str = image.prop('src');
			str = str.substring(str.lastIndexOf('/')+1);
			if ($('div').eq(div_number).find('p')[i].getAttribute('data-target') == str ){
				paragraph.html($('div').eq(div_number).find('p')[i].innerText);
				break;
			}
		}

		if (current_image == number_of_pics - 1){
			next.css('background-color', '#D3D3D3');
			next.prop('disabled', true);
		}
		if (current_image > 0){
			previous.css('background-color', 'green');
			previous.prop('disabled', null);
		}
	});

	//Ako se klikne prethodna slika
	$('#previous').on( 'click', function(){
		if (current_image == 0 )
			return;
	
		for(var i = 0; i < number_of_pics; ++i){
			if ($('div').eq(div_number).find('img')[i].src == image.prop('src')){
				image.prop('src', $('div').eq(div_number).find('img')[i-1].src);
				current_image--;
				break;
			}
		}

		var w = image.prop("naturalWidth");
		var h = image.prop("naturalHeight");
		var index = 1;
		var max_height = (80*div_height) / 100;
		while ( (max_height*w)/h > (80*div_width)/100 ){
			max_height = ((80-index)*div_height)/100;
			index++;
		}
		image.css('width',(max_height*w)/h);
		image.css('height', max_height);

		pictures.html('Slika ' + i +'/' + number_of_pics);

		for (var i = 0; i < number_of_pics; ++i){
			var str = image.prop('src');
			str = str.substring(str.lastIndexOf('/')+1);
			if ($('div').eq(div_number).find('p')[i].getAttribute('data-target') == str ){
				paragraph.html($('div').eq(div_number).find('p')[i].innerText);
				break;
			}
		}


		if (current_image == 0){
			previous.css('background-color', '#D3D3D3');
			previous.prop('disabled', true);
		}
		if (current_image < number_of_pics-1){
			next.css('background-color', 'green');
			next.prop('disabled', null);
		}

	});

}