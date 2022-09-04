import { useRouter } from 'next/router';
import { Container, Text, Button } from '@mantine/core';
import { TableScrollArea, BugTableData } from '../../components/BugTable';

import type { NextPage } from 'next/types';

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
      <Text weight={500} size={'xl'} pt={'32px'}>
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

export default BugStatus;
