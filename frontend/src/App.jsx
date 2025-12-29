import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import LoginScreen from "./components/LoginScreen";
import CheckInScreen from "./components/CheckInScreen";
import OTPScreen from "./components/OTPScreen";
import SetupScreen from "./components/SetupScreen";
import ClosingScreen from "./components/ClosingScreen";
import SuccessScreen from "./components/SuccessScreen";
import { setCurrentStep } from "./redux/slices/appSlice";

const App = () => {
  const dispatch = useDispatch();
  const { currentStep } = useSelector((state) => state.app);

  return (
    <div className="app">
      {currentStep === "login" && <LoginScreen />}
      {currentStep === "checkIn" && <CheckInScreen />}
      {currentStep === "verifyOTP" && <OTPScreen />}
      {currentStep === "setup" && <SetupScreen />}
      {currentStep === "closing" && <ClosingScreen />}
      {currentStep === "success" && <SuccessScreen />}
    </div>
  );
};

export default App;
