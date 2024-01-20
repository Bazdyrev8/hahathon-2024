import { Request, Response } from 'express';
import {  PrismaClient } from '@prisma/client';
import { type } from 'os';
import multer from 'multer';
import path from 'path';
import * as fs from 'node:fs';
const prisma: PrismaClient = new PrismaClient();

export class EventsController {

    async index(req: Request, res: Response) {
        const events = await prisma.events.findMany({
            where:{
                school_id: Number(req.params.id),
            }
        });

        const students = await prisma.students.findMany({
        });

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

    }

    async events(req: Request, res: Response) {
        const events = await prisma.events.findMany({
        });

        res.render('events/events', {
            'events': events,
            admin: req.session.admin
        });

    }

    async show(req: Request, res: Response) {
        if (!Number(req.params.id)) {
            res.redirect('/items');
        }
        if (Number(req.params.id)) {
            const events = await prisma.events.findUnique({
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
    }

    async form_create(req: Request, res: Response) {
        res.render('events/create', {
            admin: req.session.admin,
            schoolID: req.params.id
        });
    }

    ///!!!!!!!!!!!!!!!!!!
    async create(req: Request, res: Response) {
        const {name, first_top, second_top, third_top, date} = req.body;
        await prisma.events.create({
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
    }

    ///!!!!!!!!!!!!!!!!!!
    async destroy(req: Request, res: Response) {
        const { id } = req.body;
        await prisma.events.deleteMany({
            where: {
                id: Number(id)
            }
        });
        res.redirect('/');
    }

    async update(req: Request, res: Response) {
        const { id, name, first_top, second_top, third_top, date} = req.body;
        await prisma.events.update({
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
    }


}