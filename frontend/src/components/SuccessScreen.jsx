import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { CheckCircle } from "lucide-react";
import { resetApp } from "../redux/slices/appSlice";
import { resetVendor } from "../redux/slices/vendorSlice";
import { resetEvent } from "../redux/slices/eventSlice";

const SuccessScreen = () => {
  const dispatch = useDispatch();
  const { name, eventId } = useSelector((state) => state.vendor);

  const handleNewEvent = () => {
    dispatch(resetApp());
    dispatch(resetVendor());
    dispatch(resetEvent());
    localStorage.removeItem("vendorToken");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md text-center">
        <div className="bg-green-100 w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center animate-bounce">
          <CheckCircle className="text-green-600" size={60} />
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Event Completed!
        </h2>
        <p className="text-gray-600 mb-6">All tasks successfully finished</p>

        <div className="bg-gray-50 rounded-xl p-4 mb-6 text-left">
          <p className="text-sm text-gray-600">
            Event ID: <span className="font-semibold">{eventId}</span>
          </p>
          <p className="text-sm text-gray-600 mt-2">
            Vendor: <span className="font-semibold">{name}</span>
          </p>
          <p className="text-sm text-gray-600 mt-2">
            Status:{" "}
            <span className="font-semibold text-green-600">Completed</span>
          </p>
        </div>

        <button
          onClick={handleNewEvent}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition"
        >
          Start New Event
        </button>
      </div>
    </div>
  );
};

export default SuccessScreen;
