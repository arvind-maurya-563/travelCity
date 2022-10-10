import "./HotelList.scss";
import { Hotelcard } from "./HotelCard";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import StarRateIcon from "@material-ui/icons/StarRate";
import logo from "../../logo.svg";
import Ads from "../HotelDetails/Ads";
import {
  FormControlLabel,
  makeStyles,
  Radio,
  Button,
  FormControl,
  RadioGroup,
  CircularProgress,
} from "@material-ui/core";
// import { useCallback } from "react";
import { SearchByProperty } from "./Filters/SearchByProperty";
import { PopularFilter } from "./Filters/PopularFilter";
// import { SliderRange } from "./Filters/SliderRange";
import { GuestRating } from "./Filters/GuestRating";
import { PaymentType } from "./Filters/PaymentType";
import { PropertyType } from "./Filters/PropertyType";
import { PopularLocation } from "./Filters/PopularLocation";
import { Mealplans } from "./Filters/MealPlans";
// import { useHistory } from "react-router-dom";
// import { useAxios } from "../../Hooks/useAxios";
import { useNavigate } from "react-router-dom";
import NativePickers from "../Carbook/HeaderInputs";
// import HeaderInput from "./HeaderInput";

const useStyle = makeStyles({
  button: {
    margin: "10px 10px 0 0",
    background: "white",
    border:"0.1px solid grey",
    padding : "6ppx 0px"
    // width:"10px"
    
  },

  selected: {
    display: "flex",
    background: "#f0f3f5",
  },
});
const Buttondive = styled.div`
       display:flex;
       gap:20px;
       margin:20px 0px;
       &>button{
        border:1px solid rgb(41 39 39 / 87%);
       }

`
const Wrapper = styled.div`
  width: 75%;
  margin: 30px auto;
  display: grid;
  grid-template-columns: 22% 63% 15%;
  grid-gap: 1.5rem;

  .filter-title {
    font-size: 1rem;
    font-weight: 700;
    margin: 1.5rem 0;
  }

  .popular-filter {
    display: flex;
    flex-direction: column;
    color: #505c66;
  }

  .progress {
    width: 20%;
    margin: 200px auto;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .progress > img {
    margin-bottom: 10px;
    width: 100px;
  }
`;
const starControl = {
     OneStar:false,
     TwoStar:false,
     ThreeStar:false,
     FourStar:false,
     FiveStar:false,
     Min:-1,
     Max:-1
}
export const HotelList = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setloading] = useState(false);
  const classes = useStyle();
  const [priceFilter, setPriceFilter] = useState("");
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [Stardata,SetStardata] = useState(starControl);
  useEffect(() => {
    getData();
  }, [Stardata]);

  const handleQueryChange = (value) => {

    searchHotels(value)
    setSearchQuery(value);
  
    function searchHotels(searchValue){
      searchValue = searchValue.toLowerCase();
      var SearchedData  = hotels.filter(function(hotel){
          if(hotel.name.toLowerCase().includes(searchValue)){
          return true;
          }
          return false;
      })

      if(SearchedData.length===0 || value ==="") getData();
       else setHotels(SearchedData)
      }
  };

  const handleChange = (event) => {
    const range = event.target.value.split(" ").map(Number);
    setPriceFilter(event.target.value);
    handlePriceFilter(range[0], range[1]);
  };

  const handlePriceFilter = (a, b) => {
    SetStardata((pre)=>({
      ...pre,
      Min:a,
      Max:b
    }));
     
    // setloading(true);
    // const newData = hotels.filter((item) => {
    //   return item.price >= a && item.price < b;
    // });
    // setHotels(newData);
    // setTimeout(() => {
    //   setloading(false);
    // }, 2000);
  };
 const SetDatabyRating = ()=>{
  const {OneStar,TwoStar,ThreeStar,FourStar,FiveStar,Min,Max} = Stardata;
   let arr = [];
   if(OneStar) arr.push(1)
   if(TwoStar) arr.push(2)
   if(ThreeStar) arr.push(3)
   if(FourStar) arr.push(4)
   if(FiveStar) arr.push(5)
   
   let obj = {
    ratings:arr
   }
   if(Min>=0&&Max>0){
    obj.Min = Min
    obj.Max = Max
   }
   setloading(true)
   fetch('https://travelcity-car-hotal.herokuapp.com/hotalByrating',{
        method:"POST",
        body:JSON.stringify(obj),
        headers:{"content-type":"application/json"}
   })
   .then((res)=>{
      return res.json()
   })
   .then((res)=>{
    setHotels(res)
   })
   .catch((err)=>{
     console.log(err)
   })
   .finally(()=>{
    setloading(false)
   })
 }
 const GetdatabetweenMinMax = ()=>{
        setloading(true)
        let obj = {
          Min:Stardata.Min,
          Max:Stardata.Max
        }
        fetch('https://travelcity-car-hotal.herokuapp.com/hotal/GetHotalByprice',{
        method:"POST",
        body:JSON.stringify(obj),
        headers:{"content-type":"application/json"}
   })
   .then((res)=>{
      return res.json()
   })
   .then((res)=>{
    setHotels(res)
   })
   .catch((err)=>{
     console.log(err)
   })
   .finally(()=>{
    setloading(false)
   })
 }
  const getData = () => {
    if(Stardata.FiveStar||Stardata.FourStar||Stardata.ThreeStar||Stardata.TwoStar||Stardata.OneStar){
        SetDatabyRating();
        return;
    }
    console.log(Stardata.Max,Stardata.Min)
    if(Stardata.Min>=0&&Stardata.Max>0){
         GetdatabetweenMinMax();
         return;
    }
    setloading(true);
    axios
      // .get("https://my-api-data.herokuapp.com/data")
      .get("https://travelcity-car-hotal.herokuapp.com/hotals")
      .then((res) => {
        const { data } = res;
        // setData(data);
        setHotels(data);
        setloading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleStar = (star)=>{
      if(star===1){
        SetStardata((pre)=>({
          ...pre,
          OneStar:!pre.OneStar
        }));
      }
      else if(star===2){
        SetStardata((pre)=>({
          ...pre,
          TwoStar:!pre.TwoStar
        }));
      }
      else if(star===3){
        SetStardata((pre)=>({
          ...pre,
          ThreeStar:!pre.ThreeStar
        }));
      }
      else if(star===4){
        SetStardata((pre)=>({
          ...pre,
          FourStar:!pre.FourStar
        }));
      }
      else if(star===5){
        SetStardata((pre)=>({
          ...pre,
          FiveStar:!pre.FiveStar
        }));
      }
    }

  const handleOpenHotel = (id) => {
    navigate(`/hotels/${id}`);
  };

    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

    // import
const {OneStar,TwoStar,ThreeStar,FourStar,FiveStar} = Stardata;
// console.log(OneStar)
  return (
    <>
     <NativePickers/>
      <Wrapper className="Wrapper">
        <div className="sorting">
        <iframe 
          style={{border:"1px solid grey", marginTop:"8px"}}
          width="220"
          height="150"
           src={`https://maps.google.com/maps?q=Goa&t=&z=15&ie=UTF8&iwloc=&output=embed`}>
          </iframe>
          <SearchByProperty
            handleQueryChange={handleQueryChange}
            query={searchQuery}
          />

          {/* ---------------------------------------------------------------------------------------------------Star rating  */}
          <div className="filter-title">Star rating</div>
          <Buttondive>
          <Button
            onClick={() => {
              handleStar(1);
            }}
            // className={classes.button}
            variant="contained"
            color={OneStar ? "primary" : "default"}
            // backgroundColor={OneStar ? "blue" : "white"}
            endIcon={<StarRateIcon />}
          >
            1
          </Button>
          <Button
            onClick={() => {
              handleStar(2);
            }}
            // className={classes.button}
            variant="contained"
            color={TwoStar ? "primary" : "default"}
            endIcon={<StarRateIcon />}
          >
            2
          </Button>
          <Button
            onClick={() => {
              handleStar(3);
            }}
            // className={classes.button}
            variant="contained"
            color={ThreeStar ? "primary" : "default"}
            endIcon={<StarRateIcon />}
          >
            3
          </Button>
          </Buttondive>

          <Buttondive>
          <Button
            onClick={() => {
              handleStar(4);
            }}
            // className={classes.button}
            variant="contained"
            color={FourStar ? "primary" : "default"}
            endIcon={<StarRateIcon />}
          >
            4
          </Button>
          <Button
            onClick={() => {
              handleStar(5);
            }}
            // className={classes.button}
            variant="contained"
            color={FiveStar ? "primary" : "default"}
            endIcon={<StarRateIcon />}
          >
            5
          </Button>
          </Buttondive>
          {/* ------------------------------------------------------------------------------------------------------- Your Budget rating  */}
          <div className="filter-title">Your Budget</div>
          <div className="popular-filter">
            <FormControl component="fieldset">
              <RadioGroup
                aria-label="guest-rating"
                name="guest-rating"
                value={priceFilter}
                onChange={handleChange}
              >
                <FormControlLabel
                  value="0 75"
                  control={<Radio color="primary" />}
                  label="Less than 75$"
                />
                <FormControlLabel
                  value="75 125"
                  control={<Radio color="primary" />}
                  label="75$ to 125$"
                  labelPlacement="end"
                />
                <FormControlLabel
                  value="125 200"
                  control={<Radio color="primary" />}
                  label="125$ to 200$"
                  labelPlacement="end"
                />
                <FormControlLabel
                  value="200 300"
                  control={<Radio color="primary" />}
                  label="200$ to 300$"
                  labelPlacement="end"
                />
                <FormControlLabel
                  value="300 1000"
                  control={<Radio color="primary" />}
                  label="300$ and above"
                  labelPlacement="end"
                />
              </RadioGroup>
            </FormControl>
          </div>
          <PopularFilter />
          {/* <SliderRange /> Not working */}
          <GuestRating />
          <PaymentType />
          <PropertyType />
          <PopularLocation />
          <Mealplans />
        </div>

        {/*------------------------------------------------------------------------------------------>>>>>> Hotel List  */}

        <div className="list">
          {loading ? (
            <div className="progress">
              <img src={logo} alt="" />
              <CircularProgress />
            </div>
          ) : hotels.length>=1 ? (
            hotels.map((item) => {
              return (
                <Hotelcard
                  handleOpenHotel={handleOpenHotel}
                  key={item._id}
                  data={item}
                  
                />
              );
            })
          ) : (<h1 style={{color : "red", textAlign:"center", marginTop:"300px"}}>No hotels exist !</h1>)
        }
        </div>
        <div className="advSection">
          <Ads />
          <Ads />
        </div>
      </Wrapper>
    </>
  );
};
