import { Link } from 'react-router-dom'
import { StarIcon } from '@heroicons/react/20/solid'
import PropTypes from 'prop-types'

ProductGrid.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      title: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      discountPercentage: PropTypes.number,
      rating: PropTypes.shape({
        rate: PropTypes.number.isRequired,
      }).isRequired,
    })
  ).isRequired,
}

function ProductGrid({ products }) {
  return (
    <div className="bg-white">
      <div
        className="mx-auto max-w-2xl 
      px-4 py-0 sm:px-6 sm:py-0 
      lg:max-w-7xl lg:px-8"
      >
        <div
          className="mt-6 grid grid-cols-1 
        gap-x-6 gap-y-10 sm:grid-cols-2 
        lg:grid-cols-3 xl:gap-x-8"
        >
          {products.map((product) => (
            <Link to={`/product-detail/${product.id}`} key={product.id}>
              <div
                key={product.id}
                className="group 
            relative border-solid border-2 p-2
             border-gray-200"
              >
                <div
                  className="aspect-h-1
               aspect-w-1 w-full min-h-60
               overflow-hidden rounded-md
                bg-gray-200 lg:aspect-none 
                group-hover:opacity-75 lg:h-60"
                >
                  <img
                    src={product.image}
                    alt={product.title}
                    className="h-full w-full 
                  object-cover object-center 
                  lg:h-full lg:w-full"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <div href={product.thumbnail}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.title}
                      </div>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      <StarIcon className="w-6 h-6 inline" />
                      <span className="align-bottom">
                        {product.rating.rate}
                      </span>
                    </p>
                  </div>
                  <div>
                    <p
                      className="text-sm block font-medium
                  text-gray-900"
                    >
                      $
                      {Math.round(
                        product.price * (1 - product.discountPercentage / 100)
                      )}
                    </p>
                    <p
                      className="text-sm block font-medium
                  text-gray-400 line-through"
                    >
                      ${product.price}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProductGrid
