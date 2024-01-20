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
exports.SchoolController = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class SchoolController {
    home(req, res) {
        const school = prisma.school.findMany();
        res.render('school/index', {
            'school': school,
            admin: req.session.admin
        });
    }
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const school = yield prisma.school.findMany();
            res.render('school/index', {
                'school': school,
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
                const school = yield prisma.school.findUnique({
                    where: {
                        id: Number(req.params.id)
                    }
                });
                res.render('school/show', {
                    'school': school,
                    admin: req.session.admin,
                    user: req.session.username,
                });
            }
        });
    }
    form_create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.render('school/create', {
                admin: req.session.admin
            });
        });
    }
    ///!!!!!!!!!!!!!!!!!!
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name } = req.body;
            yield prisma.school.create({
                data: {
                    name
                }
            });
            res.redirect('/school');
        });
    }
    ///!!!!!!!!!!!!!!!!!!
    destroy(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.body;
            yield prisma.school.deleteMany({
                where: {
                    id: Number(id)
                }
            });
            res.redirect('/');
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, name } = req.body;
            yield prisma.school.update({
                where: {
                    id: Number(id),
                },
                data: {
                    name: name,
                }
            });
            res.redirect('/school');
        });
    }
}
exports.SchoolController = SchoolController;
