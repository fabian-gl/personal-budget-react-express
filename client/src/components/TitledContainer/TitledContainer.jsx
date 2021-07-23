import './TitledContainer.css'

const TitledContainer = ({ title, children }) => {
    let sanitizedChildren = []

    if (children)
    {
        if (Array.isArray(children)) sanitizedChildren = children
        else sanitizedChildren.push(children)
    }

    return (
        <div className='cont-titled-container'>
            <div className="cont-title">
                <div>{ title }</div>
            </div>
            <div className="cont-content">
                { sanitizedChildren.map(child => child) }
            </div>
        </div>
    )
}

export default TitledContainer
