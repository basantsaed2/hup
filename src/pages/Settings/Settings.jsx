import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from '../../ProtectedRoute/ProtectedRoute.jsx'; // أو المسار الصحيح

import PaymentMethods from './PaymentMethods';
import Nationality from './Nationality';
import Fees from './Fees';
import SubjectComplaints from './SubjectComplaints';
import OperatorPayment from './OperatorPayment';
import AddSubjectComplaints from './Addpage/AddSubjectComplaints';
import AddOperatorPayment from './Addpage/AddOperatorPayment';
import AddPaymentMethods from './Addpage/AddPaymentMethods';
import AddNationality from './Addpage/AddNationality';
import AddFees from './Addpage/AddFees';

const Settings = () => {
  return (
    <div>
      <Routes>
        <Route
          path="/Fees"
          element={
            <ProtectedRoute moduleName="fees" requiredAction="view">
              <Fees />
            </ProtectedRoute>
          }
        />
        <Route
          path="/AddFees"
          element={
            <ProtectedRoute moduleName="fees" requiredAction="add">
              <AddFees />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Nationality"
          element={
            <ProtectedRoute moduleName="nationalities" requiredAction="view">
              <Nationality />
            </ProtectedRoute>
          }
        />
        <Route
          path="/AddNationality"
          element={
            <ProtectedRoute moduleName="nationalities" requiredAction="add">
              <AddNationality />
            </ProtectedRoute>
          }
        />
        <Route
          path="/PaymentMethods"
          element={
            <ProtectedRoute moduleName="payment_methods" requiredAction="view">
              <PaymentMethods />
            </ProtectedRoute>
          }
        />
        <Route
          path="/AddPaymentMethods"
          element={
            <ProtectedRoute moduleName="payment_methods" requiredAction="add">
              <AddPaymentMethods />
            </ProtectedRoute>
          }
        />
        <Route
          path="/OperatorPayment"
          element={
            <ProtectedRoute moduleName="operator_payment_methods" requiredAction="view">
              <OperatorPayment />
            </ProtectedRoute>
          }
        />
        <Route
          path="/AddOperatorPayment"
          element={
            <ProtectedRoute moduleName="operator_payment_methods" requiredAction="add">
              <AddOperatorPayment />
            </ProtectedRoute>
          }
        />
        <Route
          path="/SubjectComplaints"
          element={
            <ProtectedRoute moduleName="complaint_subject" requiredAction="view">
              <SubjectComplaints />
            </ProtectedRoute>
          }
        />
        <Route
          path="/AddSubjectComplaints"
          element={
            <ProtectedRoute moduleName="complaint_subject" requiredAction="add">
              <AddSubjectComplaints />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default Settings;
