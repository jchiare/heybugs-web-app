import type { NextPage } from 'next';
import {
  Navbar,
  Group,
  Text,
  ScrollArea,
  createStyles,
  Grid,
  Container,
} from '@mantine/core';
import {
  IconNotes,
  IconCalendarStats,
  IconGauge,
  IconPresentationAnalytics,
  IconFileAnalytics,
  IconAdjustments,
} from '@tabler/icons';
import { UserButton } from './UserButton';
import { LinksGroup } from './NavBarLinksGroup';
import { Logo } from '../Logo';

const mockdata = [
  { label: 'Dashboard', icon: IconGauge },
  {
    label: 'Bugs',
    icon: IconNotes,
    initiallyOpened: true,
    links: [
      { label: 'Reported', link: '/bugs/reported' },
      { label: 'Verified', link: '/bugs/verified' },
      { label: 'Escalated', link: '/bugs/escalated' },
    ],
  },
  {
    label: 'Releases',
    icon: IconCalendarStats,
    links: [
      { label: 'Upcoming releases', link: '/' },
      { label: 'Previous releases', link: '/' },
      { label: 'Releases schedule', link: '/' },
    ],
  },
  { label: 'Analytics', icon: IconPresentationAnalytics },
  { label: 'Contracts', icon: IconFileAnalytics },
  { label: 'Admin', icon: IconAdjustments },
];

const useStyles = createStyles((theme) => ({
  navbar: {
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors?.dark?.[6] : theme.white,
    paddingBottom: 0,
  },

  header: {
    padding: theme.spacing.md,
    paddingTop: 0,
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    borderBottom: `1px solid ${
      theme.colorScheme === 'dark'
        ? theme.colors?.dark?.[4]
        : theme.colors?.gray?.[3]
    }`,
  },

  links: {
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
  },

  linksInner: {
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,
  },

  footer: {
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
    borderTop: `1px solid ${
      theme.colorScheme === 'dark'
        ? theme.colors?.dark?.[4]
        : theme.colors?.gray?.[3]
    }`,
  },
}));

type LayoutProps = {
  children: React.ReactNode;
};

const NavBar: NextPage<LayoutProps> = ({ children }) => {
  const { classes } = useStyles();
  const links = mockdata.map((item) => (
    <LinksGroup {...item} key={item.label} />
  ));

  return (
    <Grid>
      <Navbar
        height={800}
        width={{ sm: 300 }}
        p="md"
        className={classes.navbar}
      >
        <Navbar.Section className={classes.header}>
          <Group spacing={0}>
            <Logo />
            <Text>heybugs</Text>
          </Group>
        </Navbar.Section>

        <Navbar.Section grow className={classes.links} component={ScrollArea}>
          <div className={classes.linksInner}>{links}</div>
        </Navbar.Section>

        <Navbar.Section className={classes.footer}>
          <UserButton
            image="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80"
            name="Ann Nullpointer"
            email="anullpointer@yahoo.com"
          />
        </Navbar.Section>
      </Navbar>
      <Container fluid p={16}>
        {children}
      </Container>
    </Grid>
  );
};

export default NavBar;
