const AccessToLocalizationNotification = ({isAccessToLocalization}) => {
    return(
        <div className={`localization-notification ${isAccessToLocalization === false && 'active'}`}>
            <h3>no access to the location</h3>
        </div>
    )
}

export default AccessToLocalizationNotification