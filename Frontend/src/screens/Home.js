import React, { useEffect, useState } from "react";
import MyCard from "../components/MyCard";
import Footer from "../components/Footer";
import Header from "../components/Header";
import "../style/home.css";
import Carousel from "react-bootstrap/Carousel";
import IMG1 from "../style/image/food1.jpg"
import IMG2 from "../style/image/food2.jpg"
import IMG3 from "../style/image/food3.jpg"


function Home() {
  const [foodData, setFoodData] = useState([]);
  const [foodCat, setFoodCat] = useState([]);
  const [index, setIndex] = useState(0);
  const [searchText, setSearchText] = useState("");

  const loadData = async () => {
    try{
    
    let response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/food-data`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    response = await response.json();
    setFoodData(response[0]);
    setFoodCat(response[1]);
    console.log(response[0],response[1]);
  }
  catch(error){
    console.log(`${process.env.REACT_APP_BASE_URL}`)
    console.log("error",error)
  }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  const items = [
    {
      id: 1,
      imageUrl:IMG1,
    },
    {
      id: 2,
      imageUrl: IMG2,
    },
    {
      id: 3,
      imageUrl: IMG3,
    },
  ];

  const filteredItems = items.filter((item) =>
    item.imageUrl.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div>
      <Header />
      <Carousel activeIndex={index} onSelect={handleSelect} style={{ height: "350px" }}>
        {filteredItems.map((item) => (
          <Carousel.Item key={item.id}>
            <img
              className="d-block w-100"
              src={item.imageUrl}
              alt="Slide"
              style={{ height: "350px", objectFit: "cover !importent" }}
            />
          </Carousel.Item>
        ))}
        <Carousel.Caption className="d-flex justify-content-center align-items-center" style={{ zIndex: "10" }}>
          <div className="input-group rounded mb-3">
            <input
              type="search"
              className="form-control rounded"
              placeholder="Search The Food Item....."
              aria-label="Search"
              aria-describedby="search-addon"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            
          </div>
        </Carousel.Caption>
      </Carousel>
      <div className="container">
        {foodCat !== [] ? (
          foodCat.map((data) => {
            return (
              <div className="row mb-3">
                <div key={data._id} className="fs-3 m-3">
                  {data.CategoryName}
                </div>
                <hr />
                {foodData !== [] ? (
                  foodData
                    .filter((item) => item.CategoryName === data.CategoryName && 
                    (item.name.toLowerCase().includes(searchText))) 
                    .map((filterItems) => (
                      <div key={filterItems._id} className="col-12 col-md-6 col-lg-4 ml-3">
                        <MyCard foodItem ={filterItems} options ={filterItems.options[0]}/>
                      </div>
                    ))
                ) : (
                  <div>No data found</div>
                )}
              </div>
            );
          })
        ) : (
          <div>........</div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Home;
