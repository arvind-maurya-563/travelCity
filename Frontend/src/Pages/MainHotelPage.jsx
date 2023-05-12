import React, { useState, useEffect } from 'react'
import MainHotel from '../Components/HotelDetails/MainHotel'
import { useParams } from 'react-router-dom'
// import { useAxios } from '../Hooks/useAxios'
import axios from 'axios'
import { CircularProgress } from '@material-ui/core'
import logo from '../logo.svg'

const MainHotelPage = () => {
    const { id } = useParams()
    const [isLoading, setIsLoading] = useState(true)
    const [hotelData,Sethotaldata] = useState({});
   const Getdata = ()=>{
     setIsLoading(true)
    axios.get(`https://travelcityproject563.onrender.com/hotals/${id}`)
    .then((res)=>{
        Sethotaldata(res.data);
    })
    .then(()=>{
        setIsLoading(false)
    })
   }
    useEffect(() => {
        Getdata()
    }, [])
    const styles = {
        progress: {
            width: '20%',
            margin: '200px auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
        },

        img: {
            width: '100px',
        },

    }

    return (
        <>
            {!isLoading && hotelData ?
                <div>
                    <MainHotel hotelData={hotelData} id={id} />
                </div>
                : <div style={styles.progress}>
                    <img src={logo} alt="" style={styles.img} />
                    <CircularProgress />
                </div>}
        </>
    )
}

export default MainHotelPage
