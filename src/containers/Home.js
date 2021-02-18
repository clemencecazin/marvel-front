import logo from "../assets/logo1.png";
import image from "../assets/image.jpg";

const Home = () => {
    return (
        <div className="bloc">
            <div className="logo">
                <img src={logo} alt="" />
                <img src={image} alt="" />
            </div>
        </div>
    );
};

export default Home;
