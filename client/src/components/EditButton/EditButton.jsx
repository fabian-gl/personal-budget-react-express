import './EditButton.css'

const EditButton = ({onEditClick}) => {
    return (
        <div className='cont-edit-button' onClick={onEditClick}>
            &#x2807;
        </div>
    )
}

export default EditButton
