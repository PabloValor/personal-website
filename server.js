var express				=		require('express'),
	app					=		express(),
	swig				=		require('swig'),
	cookieParser		=		require('cookie-parser'),
	i18n				=		require('i18n-2'),
	PORT				= 		process.env.PORT || 6060;
	isProduction		= 		true;

/*	Getting the current enviroment	*/
if(process.env.NODE_ENV === 'development') {
	isProduction = false;
	console.log('App running on Development enviroment...');
}

/*	View Engine Setup	*/
app.engine('html', swig.renderFile);
app.set('view engine', 'html');

if(!isProduction) {
	app.set('view cache', false);
	swig.setDefaults({ cache: false });
}

/*	Set static files path	*/
app.use(express.static(__dirname + '/app/public/'));

/*	Set views path	*/
app.set('views', __dirname + '/app/views/');


/*	Setup Middlewares	*/
app.use(cookieParser('un gran secreto'));

	//setup i18n
i18n.expressBind(app, {
	locales: ['es','en'],
	defaultLocale: 'es',
	cookiename: 'locale'
});
app.use(function(req, res, next){
	req.i18n.setLocaleFromCookie();
	next();
});

/*	Routes	*/
app.get('/', function(req, res){
	res.render('layout', {
			isProduction: isProduction,
			headerTitle: req.i18n.__('headerTitle'),
			headerQuote: req.i18n.__('headerQuote'),
			headerText: req.i18n.__('headerText')
		});
});

app.listen(PORT, function() {
	console.log('app running on port: %d', PORT);
});


