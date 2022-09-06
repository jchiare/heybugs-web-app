import { unstable_getServerSession as getServerSession } from 'next-auth';
import type { GetServerSidePropsContext } from 'next/types';
import { authOptions as nextAuthOptions } from '../../pages/api/auth/[...nextauth]';
import { prisma } from '../db/client';

export const createContext = async (ctx: {
  req: GetServerSidePropsContext['req'];
  res: GetServerSidePropsContext['res'];
}) => {
  const session = await getServerSession(ctx.req, ctx.res, nextAuthOptions);

  return {
    session,
    prisma,
  };
};
