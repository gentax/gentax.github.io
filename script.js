var boundx, boundy;


function addThumbnail(targetImage, options) {
	// local variables
	var x, x2, y, y2, w, h;

	// the new image, a clone of the real one, with the right dimensions
	var memoryImg = new Image();

	// default configuration properties
	var defaults = {
		selectX: 400,
		selectY: 200,
		selectX2: 600,
		selectY2: 600,
		// 1 square, you can choose 16 / 9 or whatever
		aspectRatio: 1,
		sendCoords: '#sendCoords',
		targetImage: '#target',
		previewPane: '.jcrop-preview'
	}
	
	// override defaults properties
	options = $.extend(defaults, options);

	// the main function
	memoryImg.onload = function() {
		
		var newWidth = memoryImg.width;
		var newHeight = memoryImg.height;

		var $target = $(options.targetImage);
		var cropperContainer =  $target.parent();

		// let jCrop do the heavy stuffs, with the right coordinates
		$target.Jcrop({
			aspectRatio : options.aspectRatio,
			setSelect : [ options.selectX, options.selectY, options.selectX2, options.selectY2  ],
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
			}
		}, function() {
			var bounds = this.getBounds();
			boundx = bounds[0];
			boundy = bounds[1];

			// Store the API in the jcrop_api variable
			jcrop_api = this;
		});
	};
	
	// setting the src, will invoke the onload function 
	memoryImg.src = targetImage.src;
	
	// this function update the preview managing the preview coordinates
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

			$(options.previewPane).css({
				width: Math.round(rx * boundx) + 'px',
				height: Math.round(ry * boundy) + 'px',
				marginLeft: '-' + Math.round(rx * coords.x) + 'px',
				marginTop: '-' + Math.round(ry * coords.y) + 'px'
			});
		}
	}


	// write the coordinates in console
	$(options.sendCoords).off('click').on('click', function() {
		console.log('x1 :: ' + x,'y1 :: ' + y,'x2 :: ' + x2,'y2 :: ' + y2, 'w :: ' + w, 'h :: ' + h);
	});
}