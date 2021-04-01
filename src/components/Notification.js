import react from 'react'

const Notification = (props) => {
    return (
        <div className={`notification-container ${props.showNotification ? 'show' : ''}`}>
            <p>You have already entered this letter</p>
        </div>
    )
}

export default Notification