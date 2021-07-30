import './TransactionFilters.css'

const TransactionFilters = ({onFiltersChange}) => {

    const handleCheckboxChange = () => {
        const checkFilters = Array.from(document.querySelectorAll('.cont-filters .check-filter'))
        const arrayFilters = []

        checkFilters.forEach( checkBox => {
            if (checkBox.checked) arrayFilters.push(parseInt(checkBox.dataset.type))
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
                        data-type={1}
                        name='filterIncomes' 
                        onChange={handleCheckboxChange} />
                </label>
                <label>Outcomes:
                    <input type='checkbox' 
                        className='check-filter'
                        defaultChecked={true}
                        data-type={-1}
                        name='filterOutcomes' 
                        onChange={handleCheckboxChange} />
                </label>
            </div>
        </div>
    )
}

export default TransactionFilters
