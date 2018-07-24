const express = require("express"),
	path = require("path"),
	favicon = require('serve-favicon'),
	logger = require("morgan"),
	cookieParser = require("cookie-parser"),
	bodyParser = require("body-parser"),
	app = express();

//Controllers
var controllerIndex = require('./controllers/index');
var controllerTemplate = require('./controllers/template');
var controllerWorker = require('./controllers/worker');
var controllerApiV1 = require('./controllers/api-v1');

//view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

//uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use('/', controllerIndex);
app.use('/template', controllerTemplate);
app.use('/worker', controllerWorker);
app.use('/api/v1', controllerApiV1);

//catch 404 and forward to error handler
app.use(function (req, res, next) {
	const err = new Error("Not Found");
	err.status = 404;
	next(err);
});

//error handlers

//development error handler
//will print stacktrace
if (app.get("env") === "development") {
	app.use(function (err, req, res) {
		res.status(err.status || 500);
		res.render("error", {
			message: err.message,
			error: err
		});
	});
}

//production error handler
//no stacktraces leaked to user
app.use(function (err, req, res) {
	res.status(err.status || 500);
	res.render("error", {
		message: err.message,
		error: {}
	});
});

module.exports = app;
