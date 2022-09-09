import { useRouter } from 'next/router';
import { Container, Text, Button } from '@mantine/core';
import { TableScrollArea } from '../../components/BugTable';
import { getServerAuthSession } from '../../server/services/server-side-auth.service';
import { prisma } from '../../server/db/client';

import type {
  NextPage,
  GetServerSideProps,
  InferGetServerSidePropsType,
} from 'next/types';

const KNOWN_BUG_TYPES = ['reported', 'verified', 'escalated'];

const BugStatus: NextPage = ({
  bugs,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const bugStatus = router.query.status as string;

  if (!KNOWN_BUG_TYPES.includes(bugStatus?.toLowerCase())) {
    return <div>should be a 404 error</div>;
  }

  return (
    <>
      <Text align="center" weight={500} size={'xl'} pt={'32px'} pr={'60px'}>
        {bugStatus} bugs
      </Text>
      <Button sx={{ float: 'right', marginRight: '48px', top: '-36px' }}>
        Create Bug
      </Button>
      <Container fluid sx={{ padding: '48px' }}>
        <TableScrollArea data={bugs} />
      </Container>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getServerAuthSession({ req, res });
  console.log(session);

  const bugs = await prisma.bug.findMany({
    where: {
      organizationId: 1,
    },
    include: {
      ProductArea: true,
    },
  });

  console.log(JSON.parse(JSON.stringify(bugs)));

  return {
    props: { bugs: JSON.parse(JSON.stringify(bugs)) }, // will be passed to the page component as props
  };
};

export default BugStatus;
