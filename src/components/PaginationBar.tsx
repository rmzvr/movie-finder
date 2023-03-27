import { ChangeEvent, memo, useState } from 'react'

import { NextRouter, useRouter } from 'next/router'

import { Pagination } from '@mui/material'

import { useMediaBreakPoints } from '@/hooks'

import {
  MAX_MOVIES_PER_PAGE,
  MOBILE_PAGINATION_SIBLING_COUNT,
  DESKTOP_PAGINATION_SIBLING_COUNT,
  MOBILE_PAGINATION_BOUNDARY_COUNT,
  DESKTOP_PAGINATION_BOUNDARY_COUNT,
} from '@/constants'

export const PaginationBar = memo(
  ({ totalResults = 0, searchQuery, pageQuery = 1 }: any) => {
    const router: NextRouter = useRouter()

    const [currentPage, setCurrentPage] = useState<number>(pageQuery)

    const [isPhonesMediaQuery] = useMediaBreakPoints()

    const paginationSiblingCount: number = isPhonesMediaQuery
      ? MOBILE_PAGINATION_SIBLING_COUNT
      : DESKTOP_PAGINATION_SIBLING_COUNT

    const paginationBoundaryCount: number = isPhonesMediaQuery
      ? MOBILE_PAGINATION_BOUNDARY_COUNT
      : DESKTOP_PAGINATION_BOUNDARY_COUNT

    const totalPages: number = Math.ceil(totalResults / MAX_MOVIES_PER_PAGE)

    const handleChange = (event: ChangeEvent<unknown>, page: number) => {
      setCurrentPage(page)

      router.push(`/movies?search=${searchQuery}&page=${page}`, undefined, {
        shallow: true,
      })
    }

    return (
      <Pagination
        count={totalPages}
        page={currentPage}
        siblingCount={paginationSiblingCount}
        boundaryCount={paginationBoundaryCount}
        onChange={handleChange}
        variant='outlined'
        shape='rounded'
        size='large'
      />
    )
  }
)
