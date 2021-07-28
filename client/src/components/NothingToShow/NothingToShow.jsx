import './NothingToShow.css'
import nothingToShowImage from '../../assets/nothing-to-show.png'

const NothingToShow = ({message}) => {
    return (
        <div className='cont-nothing-to-show'>
            <img src={nothingToShowImage} alt="" />
            <h3 className='message'>{message}</h3>
        </div>
    )
}

export default NothingToShow
