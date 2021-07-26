import './TransactionFilters.css'

const TransactionFilters = ({onFiltersChange}) => {

    const handleCheckboxChange = () => {
        const checkFilters = Array.from(document.querySelectorAll('.cont-filters .check-filter'))
        const arrayFilters = []

        checkFilters.forEach((checkBox, index) => {
            if (checkBox.checked) arrayFilters.push(index + 1)
        })
        onFiltersChange(arrayFilters)
    }

    
    return (
        <div className='cont-filters'>
            <h3>Showing</h3>
            <div>
                <label>Incomes:
                    <input type='checkbox' 
                        className='check-filter'
                        defaultChecked={true}
                        name='filterIncomes' 
                        onChange={handleCheckboxChange} />
                </label>
                <label>Outcomes:
                    <input type='checkbox' 
                        className='check-filter'
                        defaultChecked={true}
                        name='filterOutcomes' 
                        onChange={handleCheckboxChange} />
                </label>
            </div>
        </div>
    )
}

export default TransactionFilters
