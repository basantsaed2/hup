import React from 'react';
import { Route, Routes } from 'react-router-dom';
import TrainType from './TrainType';
import TrainClass from './TrainClass';
import TrainRoute from './TrainRoute';
import Trains from './Trains';
import AddTraintype from './Addpage/AddTraintype';
import AddTrainRoute from './Addpage/AddTrainRoute';
import AddTrainClass from './Addpage/AddTrainClass';
import Addtrains from './Addpage/Addtrains';
const Tarin = () => {
  return (
    <div>
        
       <Routes>
        <Route path="/" element={<TrainType/>} />
        <Route path="/AddTraintype" element={<AddTraintype/>} />
        <Route path="/AddTrainClass" element={<AddTrainClass/>} />
        <Route path="/AddTrainRoute" element={<AddTrainRoute/>} />
        <Route path="/Addtrains" element={<Addtrains/>} />
        <Route path="/TrainClass" element={<TrainClass/>} />
        <Route path="/TrainRoute" element={<TrainRoute/>} />
        <Route path="/Trains" element={<Trains/>} />
      </Routes>
    </div>
  )
}

export default Tarin
