# The Bonsai API Cheat Sheet

## APIs To Use In Your Movie

### Movie Controls

Stop and play a movie

    movie.play();
    movie.stop();
    movie.pause();

Control movie timeline

    movie.goto(2);     // Goto frame 2
    movie.goto('10s'); // Goto 10 seconds after start

## Stage

Set background color

	stage.setBackgroundColor('red');

Set Framerate of the movie (frames per second)

	stage.setFramerate(30);

Freeze and unfreeze the movie

	stage.freeze();
	stage.unfreeze();

### Draw a Shape

Create a new shape with a specified path.  (still invisible)

    shape = new Shape();
    shape.moveTo(0, 0).lineTo(100, 0);
    shape.addTo(stage);

Use SVG-like paths to create the same shape. (visible)

    shape = new Shape('M0,0 l100,0');
    shape.attr({lineWidth:1, lineColor:'red'});
    shape.addTo(stage);

### Draw a rectangle

Overview

    Shape.rect(x, y, width, height, cornerRadius)

Draw a rectangle, at 0x0 of size 100x100 (still invisible)

    Shape.rect(0, 0, 100, 100).addTo(stage);

Rectangle, with rounded corners of radius 5px (still invisible)

    Shape.rect(0, 0, 100, 100, 5).addTo(stage);

Red rectangle with green border, 10px wide (visible)

    Shape.rect(0, 0, 100, 100)
      .attr({ fillColor:'red', lineWidth:10, lineColor:'green' })
      .addTo(stage);

Rectangle with 1px borders of color 0xFFAABB, no fill color

    Shape.rect(0, 0, 100, 100)
      .attr({ lineWidth:1, lineColor:0xFFAABB})
      .addTo(stage);

Half opaque rectangle of color rgba(100,100,255,0.5)

    Shape.rect(0, 0, 100, 100)
      .attr('fillColor', 'rgba(100,100,255,.5)')
      .addTo(stage);

### Draw a circle

Overview

    Shape.circle(x, y, radius)

Draw a circle at {200,200} with radius 100px (no fill, invisible)

    Shape.circle(200, 200, 100).addTo(stage);

Draw a circle filled with red

    Shape.circle(200,200,100)
      .attr({fillColor:'red'})
      .addTo(stage);

### Draw an ellipse

Overview

    Shape.ellipse(x, y, width, height)

Draw an ellipse with center at {200,200} and 100px wide, 50px high

    Shape.ellipse(200, 200, 100/2, 50/2)
      .attr({fillColor: 'orange'})
      .addTo(stage);

### Draw a star

Overview

    Shape.star(x, y, radius, rays, factor)

Draw a star with a radius of 100 and 5 tips:

    Shape.star(0, 0, 100, 5)

Draw a star with a radius of 100 and 10 tips:

    Shape.star(0, 0, 100, 10)

### Draw an arc (donat, pizza slice)

Overview

    Shape.arc(x, y, radius, startAngle, endAngle[, anticlockwise])

    new Shape().arc(x, y, radius, startAngle, endAngle[, anticlockwise])

Draw a circle at 100x100 with a radius of 50

    Shape.arc(100, 100, 50, 0, Math.PI*2)
      .attr('lineWidth', 1)
      .addTo(stage);

Draw half of a donat at 100x100 with a radius of 50

    Shape.arc(100, 100, 50, 0, Math.PI, 0)
      .attr('lineWidth', 20)
      .addTo(stage);

Draw a pizza slice at 100x100 with a radius of 50

    var center = {x: 100, y:100}, radius = 50;
    new Shape()
      .moveTo(center.x, center.y)
      .lineBy(radius, 0)
      .arc(center.x, center.y, radius, 0, Math.PI*0.3)
      .closePath()
      .attr('fillColor', 'red')
      .addTo(stage);

### Draw a polygon

Overview

    Shape.polygon(x, y, radius, sides)

Draw a polygon at 100x100 with a radius of 50 and 5 sides

    Shape.polygon(100, 100, 50, 5)
      .attr('lineWidth', 2)
      .addTo(stage);

### Modify Shapes (attr)

Overview

    aShape.attr(propertyName, value);
    aShape.attr(propertyMap);

Move a shape to the given x and y coordinates

    aShape.attr({ x: 100, y: 200 })

Set opacity to 50%

    aShape.attr('opacity', 0.5)

### Bitmap

Overview

    new Bitmap(source)

Add a Bitmap to the stage

    new Bitmap('url/to/image')
      .addTo(stage);

Add data in-line via data-uri

    new Bitmap('data:image/png;base64,R0laeUZE…')
      .addTo(stage);

Wait until image is loaded before adding it to the stage

    new Bitmap('url/to/image', {
      onload: function() {
        this.attr('filters', filter.blur(2))
          .addTo(stage);
      }
    });

### Animation

Overview

    var anim = new Animation(duration, properties, options);
    aDisplayObject.animate(anim);

    aDisplayObject.animate(duration, properties, options)

Animate `x` position to 300px in 1 second

    var anim = new Animation('1000ms', { x: 300 });
    Shape.rect(0,0,100,100).attr('fillColor', 'red')
      .addTo(stage)
      .animate(anim);

Animate `x` position to 300px in 1 second (shortcut version)

    Shape.rect(0,0,100,100).attr('fillColor', 'red')
      .addTo(stage)
      .animate('1s', { x: 300 });

Animate fill color from 'red' to 'blue'.

    Shape.rect(0,0,100,100).attr('fillColor', 'red')
      .addTo(stage)
      .animate('3s', {fillColor: 'blue'});

Rotate a shape around its left upper corner in 2 seconds

    Shape.rect(0,0,100,100).attr('fillColor', 'red')
      .addTo(stage)
      .animate('2s', { rotation: Math.PI*2 });

Animate multiple properties

    Shape.rect(0,0,100,100).attr('fillColor', 'red')
      .addTo(stage)
      .animate('3s', {
        x: 300,
        y: 300,
        opacity: 0
    }, { easing:'linear' });

Apply animation object on multiple shapes

    var shape1 = Shape.rect(0,0,100,100).attr('fillColor', 'red')
      .addTo(stage);
    var shape2 = Shape.rect(200,0,100,100).attr('fillColor', 'blue')
      .addTo(stage);
    [shape1, shape2].forEach(function(shape) {
          shape.animate('1s', {y: 100});
        });

### Animation Callbacks

Hook onto events of the animation, using 'on()'

    anim = new Animation('1s',{x:300});
    anim.on('play', onStart);
    anim.on('end', onEnd);
    aDisplayObject.animate(anim);

Hook events animation, using the options parameter

    aDisplayObject.animate('2s', { x:300 }, { onEnd:onEnd, onPlay:onStart });

Keyframe animation

    var anim = new KeyframeAnimation('2s', {
        '0s': {x:0, y:0},
        '1s': {x:200, y:0},
        '2s': {x:200, y:200}
    });
    Shape.rect(0,0,100,100)
      .attr('fillColor', 'red')
      .addTo(stage)
      .animate(anim);

### Animate Options

easing

    aDisplayObject.animate('1s', {x:300}, {easing:'xxx'}

    linear, quadIn, quadOut, quadInOut, cubicIn, cubicOut, cubicInOut,
    quartIn, quartOut, quartInOut, quintIn, quintOut, quintInOut, sineIn,
    sineOut, sineInOut, expoIn, expoOut, expoInOut, circIn, circOut,
    circInOut, backIn, backOut, backInOut, elasticIn, elasticOut,
    elasticInOut, bounceIn, bounceOut, bounceInOut

repeat

    aDisplayObject.animate('1s', {x:300}, {repeat:3} // 0 - Infinity

### Gradients

Overview:

    gradient.linear(direction, colorStops, doRepeat)
    gradient.radial(colorStops, radius, cx, cy, doRepeat)

Applying a gradient as the fill of a shape

    shape.attr({
        fillGradient: gradient.linear(...)
    });

** Note: a fillGradient will appear in front of a fillColor

Animate a gradient to 0º-red-orange to -45º-blue-orange

    shape.attr({
        fillGradient: gradient.linear(0, ['red','orange'])
    }).animate('3s', {
        fillGradient: gradient.linear(-45, ['blue','orange'])
    });

Define a linear gradient going towards the left, with a color-stop of green at 20%

    gradient.linear('left', [
        'rgb(255,25,5)',
        ['green', 20],
        'yellow'
    ])

Define a radial gradient going from blue (center) to yellow (outer)

    gradient.radial(['blue', 'yellow']);

Define a radial gradient with a radius of 50 and a {cx,cy} or {0,0}

    gradient.radial(['blue', 'yellow'], 50, 0, 0);

### Colors

Create a color instance

    color('red');
    color('#F00');
    color('#FF0000');
    color('#FF0000FF'); // #RRGGBBAA
    color('rgb(255,0,0)');
    color('rgba(255,0,0,1)');
    color('hsl(0,100%,50%)');
    color('hsla(0,100%,50%,1)');

Spawn a color a bit darker than red

    color('red').darker(0.2)

Spawn a random color by randomizing the hue of blue

    color('blue').randomize(['hue'])

Adjust a color

    color('#F0F').r(200).g(25).b(100); // rgb(200,25,100)

Output a color as an RGBA string

    color('red').rgba(); // => 'rgba(255,0,0,1)'

### Events

Hook on the click event of a shape

    shape.on('click', function(data){});

Catch the drag event on a shape

    shape.on('drag', function(data){});

Set the hand cursor when dragging

    shape.on('drag', function(data){
      this.attr('cursor', 'pointer');
    });

Bind to the next event only (use `once()`)

    shape.once('click', function() {});

### Text

Print "Hello World"

    text = new Text('Hello World');
    stage.addChild(text);

Position baseline of text at {100,100}

    text.attr({ x:100, y:100 });

Position top of text at {100,100}

    text.attr({ x:100, y:100, textOrigin: 'top' });

Setting font family and size

    text.attr({ fontFamily:'Arial', fontSize:'20px' });

Setting text color and line color

    text.attr({ 
    	textFillColor:'orange', 
    	textLineColor:'blue',
    	textLineWidth:2 
    });

Setting custom `fontFamily`

    var myFont = new FontFamily('myFont', [
        'path/to/myFont.ttf',
        'path/to/myFont.woff',
        'path/to/myFont.svg'
    ]);
    text.attr('fontFamily', myFont);

### Video

Start video playback

    video = new Video({url:'', type:''}).attr({
      width:320,
      height:240
    });
    stage.addChild(video);

Start video playback with onload event listener *

    video = new Video([
        'video.ogg',
        'video.mpg'
    ], {
        onload: function() {
          this.attr({
            width:320,
            height:240
          }).addTo(stage);
        }
    });

** Most mobile browsers don't allow autoplaying of videos due to excessive bandwidth consumption and therefore shorter battery life. If you're targeting such devices please make sure to avoid ´onload´ event listeners because it won't be fired without user interaction.

Other loadLevel settings

    options.loadLevel = 'start-with-nothing'; // nothing to play
    options.loadLevel = 'metadata'; // nothing to play but metadata
    options.loadLevel = 'risky-to-play'; // loaded data but not enough to play
    options.loadLevel = 'can-play'; // can play (default)
    options.loadLevel = 'can-play-through'; // can play through

### Filter

Apply a blur filter (level of 3) on a DisplayObject

    aDisplayObject.attr('filters', filter.blur(3)); // 0 - Infinity

Apply a brightness filter on a DisplayObject

    aDisplayObject.attr('filters', filter.brightness(2)); // 0 - Infinity

Apply a colorMatrix filter on a DisplayObject

    var aMatrix = [
      1, 0, 0, 0, 0,
      0, 1, 0, 1, 0,
      0, 0, 1, 0, 0,
      0, 0, 0, 1, 0
    ];
    aDisplayObject.attr('filters', filter.colorMatrix(aMatrix));

Apply a contrast filter on a DisplayObject

    aDisplayObject.attr('filters', filter.contrast(2)); // 0 - Infinity

Apply a dropShadow filter on a DisplayObject

    // [offsetX, offsetY, blurRadius, color]
    aDisplayObject.attr('filters', filter.dropShadow([1, 1, 2, 0x000000FF]));

Apply a grayscale filter on a DisplayObject

    aDisplayObject.attr('filters', filter.grayscale(1)); // 0 - 1

Apply a hueRotate filter on a DisplayObject

    aDisplayObject.attr('filters', filter.hueRotate(90)); // 0 - 360

Apply a invert filter on a DisplayObject

    aDisplayObject.attr('filters', filter.invert(1)); // 0 - 1

Apply a saturate filter on a DisplayObject

    aDisplayObject.attr('filters', filter.saturate(5)); // 0 - Infinity

Apply a sepia filter on a DisplayObject

    aDisplayObject.attr('filters', filter.sepia(1)); // 0 - 1

Apply multiple filters on a DisplayObject

    aDisplayObject.attr('filters', [
        filter.blur(1),
        filter.saturate(2)
    ]);

## Add Bonsai to your web page

### Development Mode

To use bonsai in development mode, requirejs needs to be included and configured. Development mode is useful when developing bonsai itself, not when debugging a movie.

	<script>
		var require = {
			baseUrl: 'bonsai/src'
		};
	</script>
	<script src="bonsai/lib/requirejs/require.js"></script>
	<script>
		require.config({
			paths: {
				bonsai: 'bonsai/src'
		});
		require([
			'bonsai/_dev/iframe'
			//or, for a worker environment: 'bonsai/_dev/worker'
		], function(bonsai) {
			// Do something with bonsai here (see below)
		});
	</script>


### Production Mode

When using bonsai to create a movie, you should use the built version of bonsai.

	<script src="bonsai.min.js"></script><!-- creates window.bonsai -->
	<!-- <script src="bonsai.iframe.min.js"></script> for the iframe runner -->
	<script>
		// do something with the bonsai object (see below)
	</script>

## Embed a Movie Into Your Page

	// The node the movie will be appended to
	var node = document.getElementById('movie');

	// options for the movie
	var options = {
		/*
			possible options:
		*/

		// boolean, whether to debug plugins. Default: true
		pluginDebug: true,

		// string, where to look for plugins. Default: relative to current page.
		pluginUrl: 'bonsai/plugins',

		// list of plugins to use, all relative to pluginUrl
		plugins: ['a-plugin.js', '../../bonsai-plugins/my-plugin.js'],

		// positive integer, the desired frame rate. Default: 30
		framerate: 24,

		// positive integer, the desired width of the movie. Default: Infinity
		width: 500,

		// positive integer, the desired height of the movie. Default: Infinity
		height: 310,

		// boolean or function, whether to display a frame rate
		// if true, the frame rate is displayed within the movie.
		// if function, the frame rate is passed to the function every second.
		// Default: false
		fpsLog: true
	};

	// A movie from a file
	var movie = bonsai
		.run(node,
			// path to the movie to play
			'movies/example.js',
			options
		);

	// A movie from source code
	var movie = bonsai
		.runCode(node,
			     // the code to execute
			     'Shape.rect(0, 0, 100, 100).attr({"fill": "red"})',			     // base path for assets, relative to the current page
			     'movies/assets',
			     options
		);

	movie.stop(); // stops the movie
	movie.play(); // plays the movie
	movie.destroy(); // completely destroys the movie




