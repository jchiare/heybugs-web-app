import { useRouter } from 'next/router';
import { Container } from '@mantine/core';
import { TableScrollArea, BugTableData } from '../../components/BugTable';

import type { NextPage } from 'next/types';

const KNOWN_BUG_TYPES = ['reported', 'verified', 'escalated'];

const data: BugTableData = [
  {
    name: 'john',
    email: 'jo@do.msn.com',
    company: 'anycomapny',
  },
];

const BugStatus: NextPage = () => {
  const router = useRouter();
  const bugStatus = router.query.status as string;

  if (!KNOWN_BUG_TYPES.includes(bugStatus?.toLowerCase())) {
    return <div>should be a 404 error</div>;
  }

  return (
    <Container>
      your bug status is {bugStatus}
      <TableScrollArea data={data} />
    </Container>
  );
};

export default BugStatus;
