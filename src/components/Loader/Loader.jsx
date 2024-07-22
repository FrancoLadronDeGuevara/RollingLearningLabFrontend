import "./Loader.css"

import Lottie from "lottie-react";

import loading from "../../assets/loader/loader-animation.json"

const Loader = () => {
    return (
        <div className="wrapper">
            <Lottie animationData={loading} loop={true} style={{width: 300}}/>
        </div>
    )
}

export default Loader;