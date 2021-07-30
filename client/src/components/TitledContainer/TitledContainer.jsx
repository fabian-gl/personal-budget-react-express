import './TitledContainer.css'

const TitledContainer = ({ title, children }) => {
    let arrayChildren = []

    if (children)
    {
        if (Array.isArray(children)) arrayChildren = children
        else arrayChildren.push(children)
    }

    return (
        <div className='cont-titled-container'>
            {title && <div className="cont-title">{title}</div>}
            <div className="cont-content">
                { arrayChildren.map(child => child) }
            </div>
        </div>
    )
}

export default TitledContainer
