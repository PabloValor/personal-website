var express		=		require('express'),
	app			=		express(),
	swig		=		require('swig'),
	PORT		= 		process.env.PORT || 5050;


app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/app/views/');

app.get('/', function(req, res){
	res.render('layout', {});
});

app.listen(PORT, function() {
	console.log('app running on port: %d', PORT);
});


