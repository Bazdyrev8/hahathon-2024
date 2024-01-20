"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const express_session_1 = __importDefault(require("express-session"));
const multer_1 = __importDefault(require("multer"));
const SchoolController_1 = require("./controllers/SchoolController");
const StudentsController_1 = require("./controllers/StudentsController");
const EventsController_1 = require("./controllers/EventsController");
const app = (0, express_1.default)();
const scoolController = new SchoolController_1.SchoolController();
const studentsController = new StudentsController_1.StudentsController();
const eventsController = new EventsController_1.EventsController();
app.use(express_1.default.static('public'));
app.use(express_1.default.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path_1.default.join(__dirname, 'views'));
app.use((0, express_session_1.default)({ secret: "Secret", resave: false, saveUninitialized: true }));
;
// MULTER
let storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/img/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});
let upload = (0, multer_1.default)({ storage: storage });
//
app.listen(1415, () => {
    console.log('Server is running on port 1415');
});
app.get("/", (req, res) => {
    scoolController.home(req, res);
});
app.get("/school", (req, res) => {
    scoolController.index(req, res);
});
app.get("/school/:id", (req, res) => {
    scoolController.show(req, res);
});
app.get("/school/action/create", (req, res) => {
    scoolController.form_create(req, res);
});
app.post("/school/create", upload.single('file'), (req, res, next) => {
    scoolController.create(req, res);
});
app.post("/school/update", upload.single('file'), (req, res) => {
    scoolController.update(req, res);
});
app.post("school/destroy", (req, res) => {
    scoolController.destroy(req, res);
});
//************************** */
///
// СТУДЕНТЫ
app.get("/students", (req, res) => {
    studentsController.students(req, res);
});
app.get("/school/:id/students", (req, res) => {
    studentsController.index(req, res);
});
app.get("/students/:id", (req, res) => {
    studentsController.show(req, res);
});
app.post("/school/:id/students/create", upload.single('file'), (req, res, next) => {
    studentsController.create(req, res);
});
app.post("/school/:id/students/update", upload.single('file'), (req, res) => {
    studentsController.update(req, res);
});
app.post("/school/:id/students/destroy", (req, res) => {
    studentsController.destroy(req, res);
});
//************************** */
///
// МЕРОПРИПРИЯТИЯ
app.get("/events", (req, res) => {
    eventsController.events(req, res);
});
app.get("/school/:id/events", (req, res) => {
    eventsController.index(req, res);
});
app.post("/school/:id/events/create", upload.single('file'), (req, res, next) => {
    eventsController.create(req, res);
});
app.post("/school/:id/events/update", upload.single('file'), (req, res) => {
    eventsController.update(req, res);
});
app.post("/school/:id/events/destroy", (req, res) => {
    eventsController.destroy(req, res);
});
