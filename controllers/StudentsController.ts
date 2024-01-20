import { Request, Response } from 'express';
import {  PrismaClient } from '@prisma/client';
import { type } from 'os';
import multer from 'multer';
import path from 'path';
import * as fs from 'node:fs';
const prisma: PrismaClient = new PrismaClient();

export class StudentsController {

    async index(req: Request, res: Response) {
        const students = await prisma.students.findMany({
            where:{
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

    }

    async students(req: Request, res: Response) {
        const students = await prisma.students.findMany({
        });
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

    }


    async show(req: Request, res: Response) {
        if (!Number(req.params.id)) {
            res.redirect('/items');
        }
        if (Number(req.params.id)) {
            const students = await prisma.students.findUnique({
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
    }

    async form_create(req: Request, res: Response) {
        res.render('students/create', {
            admin: req.session.admin,
            schoolID: req.params.id
        });
    }

    ///!!!!!!!!!!!!!!!!!!
    async create(req: Request, res: Response) {
        const {first_name, surname, date_of_birth} = req.body;
        await prisma.students.create({
            data: {
                first_name: first_name,
                surname: surname,
                date_of_birth: date_of_birth,
                school_id: Number(req.params.id)
            }
        });

        res.redirect('/school/' + req.params.id + '/students');
    }

    ///!!!!!!!!!!!!!!!!!!
    async destroy(req: Request, res: Response) {
        const { id } = req.body;
        console.log(id);
        await prisma.students.deleteMany({
            where: {
                id: Number(id)
            }
        });
        res.redirect('/school/' + req.params.id + '/students');
    }

    async update(req: Request, res: Response) {
        const { id, first_name, surname, date_of_birth} = req.body;
        await prisma.students.update({
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
    }
}