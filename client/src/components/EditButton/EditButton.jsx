import './EditButton.css'

import { useContext } from 'react';
import { GlobalContext } from '../../context/GlobalState'


const EditButton = ({id}) => {
    const { showModal } = useContext(GlobalContext)

    const onEditClick = () => showModal(id)

    return (
        <div className='cont-edit-button' onClick={onEditClick}>
            &#x2807;
        </div>
    )
}

export default EditButton
