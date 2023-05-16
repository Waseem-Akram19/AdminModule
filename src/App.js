import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import ManageUser from './components/ManageUser';
import ManageFood from './components/ManageFood';
// import Chat from './components/Chat';
import AddUser from './components/AddUser';
import EditUser from './components/EditUser';
import AddFood from './components/AddFood';
import AddSingleItem from './components/AddSingleItem';
import AddBiscuits from './components/AddBiscuits';
import ViewUsers from './components/ViewUsers';
import AdminMessage from './components/AdminMessage';
import ChatHandling from './components/ChatHandling';
import ViewFoodDrinks from './components/ViewFoodDrinks';
import ViewFoodFastFood from './components/ViewFoodFastFood';
import ViewFoodBiscuits from './components/ViewFoodBiscuits';
import ManageOrder from './components/ManageOrder';
import UpdateOrder from './components/UpdateOrder';
import UpdateFoodBiscuits from './components/UpdateFoodBiscuits';
import UpdatedFoodDrinks from './components/UpdatedFoodDrinks';
import UpdatedFoodFastFood from './components/UpdatedFoodFastFood';

import AddVouchers from './components/AddVouchers';
import ApplyVouchers from './components/ApplyVouchers';
const App = () => {
  return ( 
      <Router>
        <div>
          <Routes>
              <Route path='/' element={<Dashboard/>} />
              <Route path='/manageuser' element={<ManageUser/>} />
              <Route path='/managefood' element={<ManageFood/>} />
              {/* <Route path='/chat' element={<Chat/>} /> */}
              <Route path='/adduser' element={<AddUser/>} />
              <Route path='/updateuser/:id' element={<EditUser/>} />
              <Route path='/addfood' element={<AddFood/>} />
              <Route path='/addsingleitem' element={<AddSingleItem/>} />
              <Route path='/addbiscuits' element={<AddBiscuits/>} />
              <Route path='/viewusers' element={<ViewUsers/>} />
              <Route path='/adminmessage' element={<AdminMessage/>} />
              <Route path='/chathandling/:userKey' element={<ChatHandling/>} />
              <Route path='/viewfoodbiscuits' element={<ViewFoodBiscuits/>} />
              <Route path='/updatefoodbiscuits/:id' element={<UpdateFoodBiscuits/>} />
              <Route path='/viewfooddrinks' element={<ViewFoodDrinks/>} />
              <Route path='/updatefooddrinks/:id' element={<UpdatedFoodDrinks/>} />
              <Route path='/viewfoodfastfood' element={<ViewFoodFastFood/>} />
              <Route path='/updatefoodfastfood/:id' element={<UpdatedFoodFastFood/>} />
              <Route path='/manageorder' element={<ManageOrder/>} />
              <Route path='/updateorder/:userKey' element={<UpdateOrder/>} />
              <Route path='/addvouchers' element={<AddVouchers/>} />
              <Route path='/applyvouchers' element={<ApplyVouchers/>} />
          </Routes>
        </div>
       </Router>
  );
};
export default App;
