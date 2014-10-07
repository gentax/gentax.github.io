function addThumbnail(img, options) {

	// default configuration properties
	var defaults = {
		selectX: 300,
		selectY: 200,
		selectX2: 600,
		selectY2: 300,
		aspectRatio: 1.0
	}

	options = $.extend(defaults, options);

	// utility variables
	var boundx, boundy;

	// image to work with
	var memoryImg = new Image();

	// actions for the new image
	memoryImg.onload = function() {
		var newWidth = memoryImg.width;
		var newHeight = memoryImg.height;

		var $target = $('.target');

		var cropperContainer = $target.parent();

		// initialize JCrop
		$target.Jcrop({
			aspectRatio : options.aspectRatio,
			setSelect : [ options.selectX, options.selectY, options.selectX2, options.selectY2 ],
			boxWidth : cropperContainer.width(),
			boxHeight : cropperContainer.width(),
			trueSize : [ newWidth, newHeight ],
			onChange : function(coords) {
				console.log(coords);
				x = coords.x;
				x2 = coords.x2;
				y = coords.y;
				y2 = coords.y2;
				w = coords.w;
				h = coords.h;
				updatePreview(coords);
			},
			onSelect: function(coords) {
				x = coords.x;
				x2 = coords.x2;
				y = coords.y;
				y2 = coords.y2;
				w = coords.w;
				h = coords.h;
				updatePreview(coords);
			}
		}, function() {
			var bounds = this.getBounds();
			boundx = bounds[0];
			boundy = bounds[1];

			// Store the API in the jcrop_api variable
			jcrop_api = this;
		}).trigger('change');
	};

	// create new image
	memoryImg.src = img.attr('src');

	// utility function to update the preview.
	function updatePreview(coords) {

		// default configuration properties
		var defaults = {
			previewWidth: 128,
			previewHeight: 128
		}

		options = $.extend(defaults, options);

		if (parseInt(coords.w) > 0) {

			var rx = options.previewWidth / coords.w;
			var ry = options.previewHeight / coords.h;
console.log(options.previewWidth,coords.w);
console.log(options.previewHeight,coords.h);
			$('.jcrop-preview').css({
				width: Math.round(rx * boundx) + 'px',
				height: Math.round(ry * boundy) + 'px',
				marginLeft: '-' + Math.round(rx * coords.x) + 'px',
				marginTop: '-' + Math.round(ry * coords.y) + 'px'
			});
		}
	}


	$('#sendCoords').off('click').on('click', function() {
		console.log('x1 :: ' + x,'y1 :: ' + y,'x2 :: ' + x2,'y2 :: ' + y2, 'w :: ' + w, 'h :: ' + h);
	});


}


$(function(){

	addThumbnail($('#originalImage img'));

})