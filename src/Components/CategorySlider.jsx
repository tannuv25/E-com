// import React, { useEffect, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux';
// import { Swiper, SwiperSlide } from 'swiper/react';

// // Import Swiper styles
// import 'swiper/css';
// import 'swiper/css/effect-coverflow';
// import 'swiper/css/effect-cards';
// import 'swiper/css/pagination';

// import { EffectCards, EffectCoverflow, Pagination } from 'swiper/modules';
// import { Link, useNavigate } from 'react-router-dom';

// export default function CategorySlider({ title, data }) {
//     let [slidesPerView, setSlidesPerView] = useState(window.innerWidth < 1000 ? 1 : 3)
//     let [slideType, setSlideType] = useState(window.innerWidth < 1000 ? 'cards' : 'coverflow')
//     let navigate = useNavigate()
//     let options = {
//         effect: slideType,
//         grabCursor: true,
//         centeredSlides: false,
//         slidesPerView: slidesPerView,
//         coverflowEffect: {
//             rotate: 50,
//             stretch: 0,
//             depth: 100,
//             modifier: 1,
//             slideShadows: true,
//         },
//         loop: true,
//         pagination: false,
//         modules: [EffectCoverflow, Pagination, EffectCards],
//         className: "mySwiper"
//     }
//     function handelWindoResize() {
//         setSlidesPerView(window.innerWidth < 1000 ? 1 : 3)
//         setSlideType(window.innerWidth < 1000 ? 'cards' : 'coverflow')
//         navigate(0)
//     }
//     window.addEventListener("resize", handelWindoResize);
//     return (
//         <>
//             <div className="container-fluid Maincategory py-5 mb-5">
//                 <div className="container">
//                     <div className="text-center mx-auto pb-5 wow fadeIn" data-wow-delay=".3s" style={{ maxWidth: "600px" }}>
//                         <h5 className="text-primary">Our {title}</h5>
//                         <h3>We Deals in Following!</h3>
//                     </div>

//                     <Swiper {...options}>
//                         {data?.map(item => {
//                             return <SwiperSlide key={item.id}>
//                                 <div className='slider-container'>
//                                     <img src={`${process.env.REACT_APP_BACKEND_SERVER}/${item.pic}`} height={400} alt="" />
//                                     <div className='slider-card-elements'>
//                                         <h4 className='text-primary'>{item.name}</h4>
//                                         <Link to={title === "Maincategory" ? `/shop?mc=${item.name}` : title === "Subcategory" ? `/shop?sc=${item.name}` : `/shop?br=${item.name}`} className='btn text-light border-3 border-light'>Shop Now</Link>
//                                     </div>
//                                 </div>
//                             </SwiperSlide>
//                         })}
//                     </Swiper>
//                 </div>
//             </div >
//         </>
//     )
// }


import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/effect-cards';
import 'swiper/css/pagination';
import { EffectCards, EffectCoverflow, Pagination } from 'swiper/modules';
import { Link, useNavigate } from 'react-router-dom';

// 🧩 Import dummy data
import dummyData from '../data/Maincategorydata.json';

export default function CategorySlider({ title = "Maincategory", data }) {
  let [slidesPerView, setSlidesPerView] = useState(window.innerWidth < 1000 ? 1 : 3);
  let [slideType, setSlideType] = useState(window.innerWidth < 1000 ? 'cards' : 'coverflow');
  let navigate = useNavigate();

  let options = {
    effect: slideType,
    grabCursor: true,
    centeredSlides: false,
    slidesPerView: slidesPerView,
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    },
    loop: true,
    pagination: false,
    modules: [EffectCoverflow, Pagination, EffectCards],
    className: "mySwiper"
  };

  function handelWindoResize() {
    setSlidesPerView(window.innerWidth < 1000 ? 1 : 3);
    setSlideType(window.innerWidth < 1000 ? 'cards' : 'coverflow');
    navigate(0);
  }

  useEffect(() => {
    window.addEventListener("resize", handelWindoResize);
    return () => window.removeEventListener("resize", handelWindoResize);
  }, []);

  // 🧠 If no data passed, use dummy data
  const displayData = data && data.length > 0 ? data : dummyData;

  return (
    <div className="container-fluid Maincategory py-5 mb-5">
      <div className="container">
        <div
          className="text-center mx-auto pb-5 wow fadeIn"
          data-wow-delay=".3s"
          style={{ maxWidth: "600px" }}
        >
          <h5 className="text-primary">Our {title}</h5>
          <h3>We Deals in Following!</h3>
        </div>

        <Swiper {...options}>
          {displayData.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="slider-container">
                <img
                  src={item.pic}
                  height={400}
                  alt={item.name}
                  className="rounded-xl"
                />
                <div className="slider-card-elements">
                  <h4 className="text-primary">{item.name}</h4>
                  <Link
                    to={
                      title === "Maincategory"
                        ? `/shop?mc=${item.name}`
                        : title === "Subcategory"
                        ? `/shop?sc=${item.name}`
                        : `/shop?br=${item.name}`
                    }
                    className="btn text-light border-3 border-light"
                  >
                    Shop Now
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
