import './EditButton.css'

const EditButton = ({id}) => {
    const handleClick = () => {
        console.log(id)
    }
    return (
        <div className='cont-edit-button' onClick={handleClick}>
            &#x2807;
        </div>
    )
}

export default EditButton
