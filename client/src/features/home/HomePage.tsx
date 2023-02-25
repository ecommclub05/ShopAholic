import { Box, Typography } from "@mui/material";
import Slider from "react-slick";

export default function HomePage() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      };
    return (
        <>
            <Slider>
                <div>
                    <img src="/images/Group2.jpg" alt="hero" style={{display: 'block', width: '100%', maxHeight: 500}} />
                </div>
                <div>
                    <img src="/images/toys_Carousel.jpg" alt="hero" style={{display: 'block', width: '100%', maxHeight: 500}} />
                </div>
                <div>
                    <img src="/images/lights_Carousel.jpg" alt="hero" style={{display: 'block', width: '100%', maxHeight: 500}} />
                </div>
            </Slider>

            <Box display="flex" justifyContent="center" sx={{p: 4}}>
                <Typography variant="h2">
                    Shop till you drop with Shopaholic!
                </Typography>
            </Box>
            
        </>
    )
}