import { useState } from 'react';
import {
  Group,
  Box,
  Collapse,
  ThemeIcon,
  UnstyledButton,
  createStyles,
  NavLink,
} from '@mantine/core';
import { TablerIcon, IconChevronLeft, IconChevronRight } from '@tabler/icons';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

const useStyles = createStyles((theme) => ({
  control: {
    fontWeight: 500,
    display: 'block',
    width: '100%',
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
    color: theme.colorScheme === 'dark' ? theme.colors?.dark?.[0] : theme.black,
    fontSize: theme.fontSizes.sm,

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors?.dark?.[7]
          : theme.colors?.gray?.[0],
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    },
  },

  link: {
    fontWeight: 500,
    display: 'block',
    textDecoration: 'none',
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
    paddingLeft: 31,
    marginLeft: 30,
    fontSize: theme.fontSizes.sm,
    color:
      theme.colorScheme === 'dark'
        ? theme.colors?.dark?.[0]
        : theme.colors?.gray?.[7],
    borderLeft: `1px solid ${
      theme.colorScheme === 'dark'
        ? theme.colors?.dark?.[4]
        : theme.colors?.gray?.[3]
    }`,

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors?.dark?.[7]
          : theme.colors?.gray?.[0],
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    },
  },

  chevron: {
    transition: 'transform 200ms ease',
  },
}));

type LinksGroupProps = {
  icon: TablerIcon;
  label: string;
  initiallyOpened?: boolean;
  links?: { label: string; link: string }[];
};

export function LinksGroup({
  icon: Icon,
  label,
  initiallyOpened,
  links,
}: LinksGroupProps) {
  const router = useRouter();
  const { classes, theme } = useStyles();
  const [opened, setOpened] = useState(initiallyOpened || false);
  const ChevronIcon = theme.dir === 'ltr' ? IconChevronRight : IconChevronLeft;
  const linkText =
    Array.isArray(links) &&
    links.map((link) => (
      <NextLink href={link.link} passHref key={link.label}>
        <NavLink<'a'>
          label={link.label}
          component="a"
          className={classes.link}
          key={link.label}
          active={router.pathname === `${link.link}`}
        />
      </NextLink>
    ));

  return (
    <>
      <UnstyledButton
        onClick={() => setOpened((o) => !o)}
        className={classes.control}
      >
        <Group position="apart" spacing={0}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <ThemeIcon variant="light" size={30}>
              <Icon size={18} />
            </ThemeIcon>
            <Box ml="md">{label}</Box>
          </Box>
          {linkText && (
            <ChevronIcon
              className={classes.chevron}
              size={14}
              stroke={1.5}
              style={{
                transform: opened
                  ? `rotate(${theme.dir === 'rtl' ? -90 : 90}deg)`
                  : 'none',
              }}
            />
          )}
        </Group>
      </UnstyledButton>
      {linkText && <Collapse in={opened}>{linkText}</Collapse>}
    </>
  );
}
