import { useRouter } from 'next/router';
import { Container, Text, Button } from '@mantine/core';
import { TableScrollArea, BugTableData } from '../../components/BugTable';
import { prisma } from '../../server/db/client';

import type { NextPage, GetServerSideProps } from 'next/types';

const KNOWN_BUG_TYPES = ['reported', 'verified', 'escalated'];

const data: BugTableData = [
  {
    productArea: 'john',
    description: 'jo@do.msn.com',
    views: 0,
    status: 'reported',
    reports: 0,
  },
  {
    productArea: 'anywhere',
    description:
      'jo@do.msn.com jo@do.msn.com jo@do.msn.com jo@do.msn.com jo@do.msn.com jo@do.msn.com jo@do.msn.com',
    views: 0,
    status: 'reported',
    reports: 0,
  },
];

const BugStatus: NextPage = () => {
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
        <TableScrollArea data={data} />
      </Container>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {}, // will be passed to the page component as props
  };
};

export default BugStatus;
