import express, { Express, Request, Response } from 'express';
import path from 'path';
import session from 'express-session';
import multer from 'multer';
import { SchoolController } from './controllers/SchoolController';
import { StudentsController } from './controllers/StudentsController';
import { EventsController } from './controllers/EventsController';
const app: Express = express();
const scoolController = new  SchoolController();
const studentsController = new  StudentsController();
const eventsController = new  EventsController();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(session({ secret: "Secret", resave: false, saveUninitialized: true }));
// app.use(multer({ dest: "public/img" }).single("file"));

declare module "express-session" {
  interface SessionData {
    auth: boolean,
    username: string,
    password: string,
    admin: boolean,
  }
};

// MULTER
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/img/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
let upload = multer({ storage: storage });


//
app.listen(1415, () => {
  console.log('Server is running on port 1415');
});



app.get("/", (req: Request, res: Response) => {
  scoolController.home(req, res);
});

app.get("/school", (req: Request, res: Response) => {
  scoolController.index(req, res);
});

app.get("/school/:id", (req: Request, res: Response) => {
  scoolController.show(req, res);
});

app.get("/school/action/create", (req: Request, res: Response) => {
  scoolController.form_create(req, res);
});

app.post("/school/create", upload.single('file'), (req: Request, res: Response, next) => {
  scoolController.create(req, res);
});

app.post("/school/update", upload.single('file'), (req: Request, res: Response) => {
  scoolController.update(req, res);
});

app.post("school/destroy", (req: Request, res: Response) => {
  scoolController.destroy(req, res);
});



//************************** */
///
// СТУДЕНТЫ

app.get("/students", (req: Request, res: Response) => {
  studentsController.students(req, res);
});

app.get("/school/:id/students", (req: Request, res: Response) => {
  studentsController.index(req, res);
});

app.get("/students/:id", (req: Request, res: Response) => {
  studentsController.show(req, res);
});

app.post("/school/:id/students/create", upload.single('file'), (req: Request, res: Response, next) => {
  studentsController.create(req, res);
});

app.post("/school/:id/students/update", upload.single('file'), (req: Request, res: Response) => {
  studentsController.update(req, res);
});

app.post("/school/:id/students/destroy", (req: Request, res: Response) => {
  studentsController.destroy(req, res);
});


//************************** */
///
// МЕРОПРИПРИЯТИЯ

app.get("/events", (req: Request, res: Response) => {
  eventsController.events(req, res);
});

app.get("/school/:id/events", (req: Request, res: Response) => {
  eventsController.index(req, res);
});

app.post("/school/:id/events/create", upload.single('file'), (req: Request, res: Response, next) => {
  eventsController.create(req, res);
});

app.post("/school/:id/events/update", upload.single('file'), (req: Request, res: Response) => {
  eventsController.update(req, res);
});

app.post("/school/:id/events/destroy", (req: Request, res: Response) => {
  eventsController.destroy(req, res);
});
