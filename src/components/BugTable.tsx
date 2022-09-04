import { useState } from 'react';
import { createStyles, Table, ScrollArea } from '@mantine/core';

// TODO - fix colors
// and add support for darkmode
const useStyles = createStyles((theme) => ({
  header: {
    position: 'sticky',
    top: 0,
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors?.dark?.[7] : theme.white,
    transition: 'box-shadow 150ms ease',

    '&::after': {
      content: '""',
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      borderBottom: `1px solid ${
        theme.colorScheme === 'dark'
          ? theme.colors?.dark?.[3]
          : theme.colors?.gray?.[2]
      }`,
    },
  },

  scrolled: {
    boxShadow: theme.shadows.sm,
  },
}));

export type BugTableData = Array<{
  productArea: string;
  description: string;
  status: string;
  views: number;
  reports: number;
}>;

export function TableScrollArea({ data }: { data: BugTableData }) {
  const { classes, cx } = useStyles();
  const [scrolled, setScrolled] = useState(false);

  const rows = data.map((row) => (
    <tr key={row.description}>
      <td>{row.productArea}</td>
      <td>{row.description}</td>
      <td style={{ textAlign: 'right' }}>{row.reports}</td>
      <td style={{ textAlign: 'right' }}>{row.views}</td>
    </tr>
  ));

  return (
    <ScrollArea
      sx={{ height: 300 }}
      onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
    >
      <Table sx={{ minWidth: 700, backgroundColor: '#DEE2E6' }}>
        <thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
          <tr>
            <th>Product Area</th>
            <th>Description</th>
            <th style={{ textAlign: 'right', width: '100px' }}>Reported #</th>
            <th style={{ textAlign: 'right', width: '80px' }}>Views</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
}
