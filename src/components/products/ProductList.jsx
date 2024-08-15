import { useEffect } from 'react'

import { useState, Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import {
  ChevronDownIcon,
  FunnelIcon,
  Squares2X2Icon,
} from '@heroicons/react/20/solid'
import MobileFilterDialog from './MobileFilterDialog'
import ProductGrid from './ProductGrid'
import Pagination from './Pagination'
import Filters from './Filters'
import { useSelector } from 'react-redux'
import useThunk from '../../hooks/use-thunk'
import { ITEMS_PER_PAGE } from '../../constants'
import { fetchProductsByFilter } from '../../store'
//import { fetchBrands } from '../../store'
import { fetchCategories } from '../../store'

const sortOptions = [
  { name: 'Best Rating', sort: 'rating', order: 'desc', current: false },
  { name: 'Price: Low to High', sort: 'price', order: 'asc', current: false },
  { name: 'Price: High to Low', sort: 'price', order: 'desc', current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function ProductList() {
  const [filter, setFilter] = useState({})
  const [sort, setSort] = useState({})
  const [page, setPage] = useState(1)
  // const [doFetchProducts, isLoadingProducts, loadingProductsError] =
  //   useThunk(fetchProducts)
  const [doFetchProductsByFilter] = useThunk(fetchProductsByFilter)
  // const [doFetchBrands] = useThunk(fetchBrands)
  const [doFetchCategories] = useThunk(fetchCategories)
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  const { productsData, totalItems, categories } = useSelector((state) => {
    return state.products
  })

  const startIndex = (page - 1) * ITEMS_PER_PAGE
  const paginatedProducts = productsData.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  )

  const filtersOptions = [
    {
      id: 'category',
      name: 'Category',
      options: categories,
    },
    // {
    //   id: 'brand',
    //   name: 'Brand',
    //   options: brands,
    // },
  ]

  const handleSort = (option) => {
    const sort = { _sort: option.sort, _order: option.order }
    setSort(sort)
  }

  const handlePage = (page) => {
    setPage(page)
  }

  useEffect(() => {
    //doFetchBrands()
    doFetchCategories()
    const pagination = { _page: page, _limit: ITEMS_PER_PAGE }
    doFetchProductsByFilter({ filter, sort, pagination })
  }, [
    doFetchProductsByFilter,
    filter,
    sort,
    page,
    //doFetchBrands,
    doFetchCategories,
  ])

  useEffect(() => {
    setPage(1)
  }, [totalItems, sort])

  return (
    <div className="bg-white">
      <div>
        <MobileFilterDialog
          isOpen={mobileFiltersOpen}
          onClose={() => setMobileFiltersOpen(false)}
          filtersOptions={filtersOptions}
          filter={filter}
          setFilter={setFilter}
          //doFetchProductsByFilter={doFetchProductsByFilter}
        />

        <main
          className="mx-auto 
        max-w-7xl px-4 
        sm:px-6 lg:px-8"
        >
          <div
            className="flex 
          items-baseline justify-between 
          border-b border-gray-200 pb-6 pt-24"
          >
            <h1
              className="text-4xl 
            font-bold tracking-tight
             text-gray-900"
            >
              All Products
            </h1>

            <div className="flex items-center">
              <Menu
                as="div"
                className="relative 
              inline-block text-left"
              >
                <div>
                  <Menu.Button
                    className="group 
                  inline-flex justify-center 
                  text-sm font-medium text-gray-700
                   hover:text-gray-900"
                  >
                    Sort
                    <ChevronDownIcon
                      className="-mr-1 ml-1 
                      h-5 w-5 flex-shrink-0
                       text-gray-400
                        group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items
                    className="absolute 
                  right-0 z-10 mt-2 w-40 
                  origin-top-right rounded-md
                   bg-white shadow-2xl ring-1
                    ring-black ring-opacity-5 
                    focus:outline-none"
                  >
                    <div className="py-1">
                      {sortOptions.map((option) => (
                        <Menu.Item key={option.name}>
                          {({ active }) => (
                            <p
                              onClick={() => handleSort(option)}
                              className={classNames(
                                option.current
                                  ? 'font-medium text-gray-900'
                                  : 'text-gray-500',
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm'
                              )}
                            >
                              {option.name}
                            </p>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>

              <button
                type="button"
                className="-m-2 
              ml-5 p-2 text-gray-400
               hover:text-gray-500 sm:ml-7"
              >
                <span className="sr-only">View grid</span>
                <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                className="-m-2 ml-4 
                p-2 text-gray-400
                 hover:text-gray-500 
                 sm:ml-6 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div
              className="grid 
            grid-cols-1 gap-x-8 
            gap-y-10 lg:grid-cols-4"
            >
              {/* Filters */}
              <Filters
                filtersOptions={filtersOptions}
                filter={filter}
                setFilter={setFilter}
              />

              {/* Product grid */}
              <div className="lg:col-span-3">
                <ProductGrid products={paginatedProducts} />
              </div>
            </div>
          </section>

          <Pagination
            handlePage={handlePage}
            page={page}
            setPage={setPage}
            totalItems={productsData.length}
          />
        </main>
      </div>
    </div>
  )
}

export default ProductList
