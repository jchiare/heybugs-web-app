import { PrismaClient, Prisma } from '@prisma/client';
const prisma = new PrismaClient();

const fakeBug: Prisma.BugUncheckedCreateInput = {
  description: "can't access dashboard",
  productAreaId: 1,
  organizationId: 1,
};

const fakeProductArea: Prisma.ProductAreaUncheckedCreateInput = {
  name: 'John doe',
};

const fakeUser: Prisma.UserUncheckedCreateInput = {
  name: 'Jay Chiarella',
  email: 'jay.gch93@gmail.com',
  organizationId: 1,
  emailVerified: null,
  image: null,
};

const organization: Prisma.OrganizationUncheckedCreateInput = {
  id: 1,
  name: 'heybugs',
};

async function main() {
  console.log(`Start seeding ...`);

  // const user = await prisma.user.create({ data: fakeUser });
  // console.log(`Created user with id: ${user.id}`);

  // const org = await prisma.organization.create({ data: organization });
  // console.log(`Created org with id: ${org.id}`);

  const bug = await prisma.bug.create({ data: fakeBug });
  console.log(`Created bug with id: ${bug.id}`);

  const productArea = await prisma.productArea.create({
    data: fakeProductArea,
  });
  console.log(`Created productArea with id: ${productArea.id}`);

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
