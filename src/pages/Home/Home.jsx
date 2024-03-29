import { Header } from "../../common/Header/Header";
import './Home.css'
import video1 from "../../../img/videoHome2.mp4"
import video2 from "../../../img/videoHome3.mp4"
import video3 from "../../../img/home3.png"
import Carousel from 'react-bootstrap/Carousel';

export const Home = () => {

    return (
        <>
            <Header />
            <section className='homeDesign'>

                <Carousel>
                    <Carousel.Item interval={6000}>
                        <video className="d-block carouselVideo" loop autoPlay muted >
                            <source src={video1} type="video/mp4" />
                        </video>
                        <Carousel.Caption>
                            <h5></h5>
                            <p></p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item interval={3000}>
                        <video className="d-block carouselVideo" loop autoPlay muted >
                            <source src={video2} type="video/mp4" />
                        </video>
                        <Carousel.Caption>
                            <h5></h5>
                            <p></p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block carouselImage"
                            src={video3}
                            alt="Third slide"
                        />
                        <Carousel.Caption>
                            <h5></h5>
                            <p></p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>


            </section>
        </>

    )

}
