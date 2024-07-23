function Spinner () {
    return (
        <div className="spinner-container d-flex aligh-items-center justify-ccontent-center">
            <div className="spinner-border"></div>
            <div className="spinner-dot d-flex flex-reverse">
                <p>Loading</p>
                <div className="spinner-grow spinner-grow-sm spinner-grow-1"></div>
                <div className="spinner-grow spinner-grow-sm spinner-grow-2"></div>
                <div className="spinner-grow spinner-grow-sm spinner-grow-3"></div>                
            </div>
        </div>
    ); 
}

export default Spinner;