import styled from 'styled-components'
import React from 'react'
import { Filter } from '../Filters/CarFilter'
import { Ads } from './Ads'
import { MidCar } from './MidCar';
import BarcodeSection from "../../Resources/Barcodesection.PNG";
import NativePickers from './HeaderInputs';
import "./Carbook.scss";


const CardetailsSection = styled.div`
display : flex;
width : 80%;
margin : auto;
justify-content : space-between;

@media (max-width: 600px) {
  width : 100%;
}
#left{
  @media (max-width: 600px) {
    display:none
    
  }

}
#right{
  @media (max-width: 600px) {
    display:none
    
  }
}
`

export const Carbook = () => {
  const [carData, setCarData] = React.useState([])
  return (
    <div style={{ backgroundColor: "#F5F5F5" }}>
      <NativePickers/>
      <CardetailsSection>

        <div id='left'>
          <iframe 
          style={{border:"1px solid grey", marginTop:"8px"}}
          width="230"
          height="150"
           src={`https://maps.google.com/maps?q=Delhi&t=&z=15&ie=UTF8&iwloc=&output=embed`}>

          </iframe>
          <Filter />
          </div>
        <div className='mid' >
          <MidCar />
        </div>
        <div id='right'>
          <Ads />
        </div>
      </CardetailsSection>

      <div className="BarcodeSection">
        <p>The makes/models shown are examples only. We are unable to guarantee a specific make/model. Actual makes/models are subject to availability and vary by rental car company</p>
        <img src={BarcodeSection} alt="" />
      </div>
    </div>
  )
}
