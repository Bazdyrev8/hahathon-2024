const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function Items() {
    const createMany = await prisma.school.createMany({
        data: [
            { 
                title: "",
                image: "",
                categ_id: Number(1),
                description: ""
            },
            { 
                title: "",
                image: "",
                categ_id: Number(1),
                description: ""
            },
        ],
        skipDuplicates: true
        }
    );
}

async function UserAdmin() {
    const createMany = await prisma.users.createMany({
        data: [
            { username: "A" ,
              password: "A", 
              type: "A" }
        ],
        skipDuplicates: true
        }
    );
}

Categories()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.log(e);
        await prisma.$disconnect();
        process.exit(1); 
    })

Items()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.log(e);
        await prisma.$disconnect();
        process.exit(1); 
    })

UserAdmin()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.log(e);
        await prisma.$disconnect();
        process.exit(1); 
    })