import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CheckCircle } from "lucide-react";
import { setEventStatus } from "../redux/slices/eventSlice";
import { setCurrentStep, setLoading } from "../redux/slices/appSlice";
import { completeEvent } from "../api/services";

const ClosingScreen = () => {
  const dispatch = useDispatch();
  const [otp, setOtp] = useState("");
  const { generatedOTP } = useSelector((state) => state.app);
  const { eventId } = useSelector((state) => state.vendor);

  const handleEventComplete = async () => {
    try {
      dispatch(setLoading(true));

      await completeEvent({ eventId, otp, type: "complete" });

      dispatch(setEventStatus("completed"));
      dispatch(setCurrentStep("success"));
    } catch (error) {
      alert(error.response?.data?.message || "Invalid OTP");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <div className="text-center mb-6">
          <div className="bg-green-100 w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center">
            <CheckCircle className="text-green-600" size={32} />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Event Completion</h2>
          <p className="text-gray-600 mt-2">Get final OTP from customer</p>
          <p className="text-sm text-green-600 mt-2 font-mono bg-green-50 py-2 px-4 rounded-lg">
            Demo OTP: {generatedOTP}
          </p>
        </div>

        <input
          type="text"
          placeholder="Enter closing OTP"
          maxLength="4"
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition text-center text-2xl font-bold tracking-widest mb-6"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />

        <button
          onClick={handleEventComplete}
          className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition"
        >
          Complete Event
        </button>
      </div>
    </div>
  );
};

export default ClosingScreen;
