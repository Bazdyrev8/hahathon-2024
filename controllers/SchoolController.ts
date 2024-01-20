import { Request, Response } from 'express';
import { items, PrismaClient } from '@prisma/client';
import { type } from 'os';
import multer from 'multer';
import path from 'path';
import * as fs from 'node:fs';
const prisma: PrismaClient = new PrismaClient();

export class SchoolController {

    home(req: Request, res: Response) {
        res.render('home', {
            admin: req.session.admin
        });
    }

    async index(req: Request, res: Response) {
        const school = await prisma.school.findMany();

        res.render('school/index', {
            'school': school,
            admin: req.session.admin
        });

    }

    async show(req: Request, res: Response) {
        if (!Number(req.params.id)) {
            res.redirect('/items');
        }
        if (Number(req.params.id)) {
            const school = await prisma.school.findUnique({
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
    }

    async form_create(req: Request, res: Response) {
        res.render('school/create', {
            admin: req.session.admin
        });
    }

    ///!!!!!!!!!!!!!!!!!!
    async create(req: Request, res: Response) {
        const { name} = req.body;
        await prisma.school.create({
            data: {
                name
            }
        });

        res.redirect('/school');
    }

    ///!!!!!!!!!!!!!!!!!!
    async destroy(req: Request, res: Response) {
        const { id } = req.body;
        await prisma.school.deleteMany({
            where: {
                id: Number(id)
            }
        });
        res.redirect('/');
    }

    async update(req: Request, res: Response) {
        const { id, name} = req.body;
        await prisma.school.update({
            where: {
                id: Number(id),
            },
            data: {
                name: name,
            }
        });

        res.redirect('/school');
    }


    //Поиск книг
    async searchItem(req: Request, res: Response) {
        console.log("______");
        const { title } = req.body;
        console.log(title);
        const items = await prisma.school.findMany({
            where: {
                title: {
                    contains: String(title),
                },
            },
        });

        console.log(items);

        res.render('school/index', {
            'items': items,
            number: 1,
            admin: req.session.admin
        });
    }
}