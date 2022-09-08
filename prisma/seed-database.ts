import { PrismaClient, Prisma } from '@prisma/client';
const prisma = new PrismaClient();

const fakeUser: Prisma.UserUncheckedCreateInput = {
  name: 'Jay Chiarella',
  email: 'jay.gch93@gmail.com',
  organizationId: '1',
  emailVerified: null,
  image: null,
};

const organization: Prisma.OrganizationUncheckedCreateInput = {
  id: '1',
  name: 'heybugs',
};

async function main() {
  console.log(`Start seeding ...`);

  const user = await prisma.user.create({ data: fakeUser });
  console.log(`Created user with id: ${user.id}`);

  const org = await prisma.organization.create({ data: organization });
  console.log(`Created org with id: ${org.id}`);
  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
