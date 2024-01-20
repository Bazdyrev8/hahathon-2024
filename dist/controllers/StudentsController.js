"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentsController = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class StudentsController {
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const students = yield prisma.students.findMany({
                where: {
                    school_id: Number(req.params.id),
                }
            });
            // const school  = await prisma.school.findMany({
            //     where:{
            //         id: req.params.id,
            //     }
            // });
            console.log(req.params.id);
            res.render('students/index', {
                'students': students,
                schoolID: req.params.id,
                admin: req.session.admin
            });
        });
    }
    students(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const students = yield prisma.students.findMany({});
            // const school  = await prisma.school.findMany({
            //     where:{
            //         id: req.params.id,
            //     }
            // });
            console.log(req.params.id);
            res.render('students/students', {
                'students': students,
                admin: req.session.admin
            });
        });
    }
    show(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!Number(req.params.id)) {
                res.redirect('/items');
            }
            if (Number(req.params.id)) {
                const students = yield prisma.students.findUnique({
                    where: {
                        id: Number(req.params.id)
                    }
                });
                res.render('students/show', {
                    'students': students,
                    admin: req.session.admin,
                    user: req.session.username,
                });
            }
        });
    }
    form_create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.render('students/create', {
                admin: req.session.admin,
                schoolID: req.params.id
            });
        });
    }
    ///!!!!!!!!!!!!!!!!!!
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { first_name, surname, date_of_birth } = req.body;
            yield prisma.students.create({
                data: {
                    first_name: first_name,
                    surname: surname,
                    date_of_birth: date_of_birth,
                    school_id: Number(req.params.id)
                }
            });
            res.redirect('/school/' + req.params.id + '/students');
        });
    }
    ///!!!!!!!!!!!!!!!!!!
    destroy(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.body;
            console.log(id);
            yield prisma.students.deleteMany({
                where: {
                    id: Number(id)
                }
            });
            res.redirect('/school/' + req.params.id + '/students');
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, first_name, surname, date_of_birth } = req.body;
            yield prisma.students.update({
                where: {
                    id: Number(id),
                },
                data: {
                    first_name: first_name,
                    surname: surname,
                    date_of_birth: date_of_birth,
                }
            });
            res.redirect('/items');
        });
    }
    //Поиск книг
    searchItem(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("______");
            const { title } = req.body;
            console.log(title);
            const items = yield prisma.items.findMany({
                where: {
                    title: {
                        contains: String(title),
                    },
                },
            });
            console.log(items);
            const categories = yield prisma.categories.findMany();
            res.render('items/index', {
                'items': items,
                number: 1,
                categories: categories,
                admin: req.session.admin
            });
        });
    }
}
exports.StudentsController = StudentsController;
