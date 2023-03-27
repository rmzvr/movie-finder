import { NextRouter, useRouter } from 'next/router'

export const useRouterQueries = (...queries: string[]) => {
  const router: NextRouter = useRouter()

  const queryList = queries.reduce(
    (acc: any, value) => ({
      ...acc,
      [value]: router.query[value]?.toString() ?? '',
    }),
    {}
  )

  return queryList
}
