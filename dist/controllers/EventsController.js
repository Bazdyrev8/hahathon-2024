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
exports.EventsController = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class EventsController {
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const events = yield prisma.events.findMany({
                where: {
                    school_id: Number(req.params.id),
                }
            });
            const students = yield prisma.students.findMany({});
            console.log(events);
            console.log(students);
            // const school  = await prisma.school.findMany({
            //     where:{
            //         id: req.params.id,
            //     }
            // });
            console.log(req.params.id);
            res.render('events/index', {
                'events': events,
                students: students,
                schoolID: req.params.id,
                admin: req.session.admin
            });
        });
    }
    events(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const events = yield prisma.events.findMany({});
            res.render('events/events', {
                'events': events,
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
                const events = yield prisma.events.findUnique({
                    where: {
                        id: Number(req.params.id)
                    }
                });
                res.render('events/show', {
                    'events': events,
                    admin: req.session.admin,
                    user: req.session.username,
                });
            }
        });
    }
    form_create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.render('events/create', {
                admin: req.session.admin,
                schoolID: req.params.id
            });
        });
    }
    ///!!!!!!!!!!!!!!!!!!
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, first_top, second_top, third_top, date } = req.body;
            yield prisma.events.create({
                data: {
                    name: name,
                    date: date,
                    first_top: Number(first_top),
                    second_top: Number(second_top),
                    third_top: Number(third_top),
                    school_id: Number(req.params.id)
                }
            });
            res.redirect('/school/' + req.params.id + '/events');
        });
    }
    ///!!!!!!!!!!!!!!!!!!
    destroy(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.body;
            yield prisma.events.deleteMany({
                where: {
                    id: Number(id)
                }
            });
            res.redirect('/');
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, name, first_top, second_top, third_top, date } = req.body;
            yield prisma.events.update({
                where: {
                    id: Number(id),
                },
                data: {
                    name: name,
                    date: date,
                    first_top: Number(first_top),
                    second_top: Number(second_top),
                    third_top: Number(third_top),
                    school_id: Number(req.params.id)
                }
            });
            res.redirect('/items');
        });
    }
}
exports.EventsController = EventsController;
