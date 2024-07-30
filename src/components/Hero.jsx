import { Link } from "react-router-dom";
import "../styles/Hero.css";
const Hero = () => {
  return (
    <div className="hero bg-base-200 ">
    <div className="hero-content text-center">
      <div className="max-w-xl">
        <h1 className="text-6xl font-bold max-md:text-4xl text-white">Best Clothing Shop Of The Year!</h1>
        <p className="py-6 text-2xl max-md:text-lg text-white">
          Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
          excepturi exercitationem quasi. In deleniti eaque aut repudiandae
          et a id nisi.
        </p>
        <Link to="/shop" className="btn btn-wide bg-[#dc0000] hover:bg-[#ffcc00] border-none text-white">Shop Now</Link>
      </div>
    </div>
  </div>
  )
}

export default Hero