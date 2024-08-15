import { Disclosure } from '@headlessui/react'
import { MinusIcon, PlusIcon } from '@heroicons/react/20/solid'
import PropTypes from 'prop-types'

Filters.propTypes = {
  filtersOptions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      options: PropTypes.arrayOf(
        PropTypes.shape({
          value: PropTypes.string.isRequired,
          label: PropTypes.string.isRequired,
        }).isRequired
      ).isRequired,
    }).isRequired
  ).isRequired,
  filter: PropTypes.object.isRequired,
  setFilter: PropTypes.func.isRequired,
}

function Filters({ filtersOptions, filter, setFilter }) {
  const handleFilter = (event, section, option) => {
    const newFilter = { ...filter }

    /*

    //TODO: On server it will support multiple categories
    if (event.target.checked) {
      if (newFilter[section.id]) {
        newFilter[section.id].push(option.value)
      } else {
        newFilter[section.id] = [option.value]
      }
    } else {
      const index = newFilter[section.id].findIndex((el) => el === option.value)
      newFilter[section.id].splice(index, 1)
      // newFilter[section.id] = newFilter[section.id].filter(
      //   (el) => el !== option.value
      // )
    }


    */

    if (event.target.checked) {
      newFilter[section.id] = [option.value]
    } else {
      newFilter[section.id] = []
    }

    setFilter(newFilter)
  }
  return (
    <form className="hidden lg:block">
      {filtersOptions.map((section) => (
        <Disclosure
          as="div"
          key={section.id}
          className="border-b border-gray-200 py-6"
        >
          {({ open }) => (
            <>
              <h3 className="-my-3 flow-root">
                <Disclosure.Button
                  className="flex w-full 
                          items-center justify-between
                           bg-white py-3 text-sm
                            text-gray-400
                             hover:text-gray-500"
                >
                  <span
                    className="font-medium
                             text-gray-900"
                  >
                    {section.name}
                  </span>
                  <span className="ml-6 flex items-center">
                    {open ? (
                      <MinusIcon className="h-5 w-5" aria-hidden="true" />
                    ) : (
                      <PlusIcon className="h-5 w-5" aria-hidden="true" />
                    )}
                  </span>
                </Disclosure.Button>
              </h3>
              <Disclosure.Panel className="pt-6">
                <div className="space-y-4">
                  {section.options.map((option, optionIdx) => (
                    <div key={option.value} className="flex items-center">
                      <input
                        id={`filter-${section.id}-${optionIdx}`}
                        name={`${section.id}[]`}
                        defaultValue={option.value}
                        type="checkbox"
                        //defaultChecked={option.checked}
                        checked={
                          filter[section.id]?.includes(option.value) || false
                        }
                        className="h-4 w-4 rounded
                                                 border-gray-300
                                                 text-indigo-600
                                                 focus:ring-indigo-500"
                        onChange={(event) =>
                          handleFilter(event, section, option)
                        }
                      />
                      <label
                        htmlFor={`filter-${section.id}-${optionIdx}`}
                        className="ml-3 text-sm text-gray-600"
                      >
                        {option.label}
                      </label>
                    </div>
                  ))}
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      ))}
    </form>
  )
}

export default Filters
