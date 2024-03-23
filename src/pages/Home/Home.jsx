import { Header } from "../../common/Header/Header";
import './Home.css'

import Carousel from 'react-bootstrap/Carousel';

export const Home = () => {

    return (
        <>
            <Header />
            <section className='homeDesign'>

                <Carousel>
                    <Carousel.Item>
                        <img
                            className="d-block carouselImage"
                            src="https://static.vecteezy.com/system/resources/previews/028/595/021/non_2x/modern-and-creative-tattoo-parlor-with-a-chair-brutal-interior-design-photo.jpg"
                            alt="First slide"
                        />
                        <Carousel.Caption>
                            <h5>First slide label</h5>
                            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block carouselImage"
                            src="https://pics.craiyon.com/2023-12-20/TDG1WuvzQEa1yQhB8EkV_g.webp"
                            alt="Second slide"
                        />
                        <Carousel.Caption>
                            <h5>Second slide label</h5>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block carouselImage"
                            src="https://www.tattooboxmontreal.com/wp-content/uploads/2023/11/BDEA60AC-82EB-4AC8-BAF8-0CF637521086.jpeg"
                            alt="Third slide"
                        />
                        <Carousel.Caption>
                            <h5>Third slide label</h5>
                            <p>
                                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                            </p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>


            </section>
        </>

    )

}
