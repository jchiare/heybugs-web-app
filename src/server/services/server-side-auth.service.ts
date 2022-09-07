import {
  Session,
  unstable_getServerSession as getServerSession,
} from 'next-auth';
import type { GetServerSidePropsContext } from 'next/types';
import { authOptions as nextAuthOptions } from '../../pages/api/auth/[...nextauth]';

type SessionContext = {
  req: GetServerSidePropsContext['req'];
  res: GetServerSidePropsContext['res'];
};

export async function getServerAuthSession(
  ctx: SessionContext
): Promise<Session | null> {
  return await getServerSession(ctx.req, ctx.res, nextAuthOptions);
}

export async function getProtectedServerSession(
  ctx: SessionContext
): Promise<Session | Error> {
  const session = await getServerSession(ctx.req, ctx.res, nextAuthOptions);
  if (!session) {
    throw new Error('not authenticated for protected route');
  }
  return session;
}
