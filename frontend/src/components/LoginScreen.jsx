import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Camera } from "lucide-react";
import { setVendorData } from "../redux/slices/vendorSlice";
import { setCurrentStep, setLoading, setError } from "../redux/slices/appSlice";
import { vendorLogin } from "../api/services";

const LoginScreen = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    eventId: "",
    phone: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    if (!formData.name || !formData.eventId || !formData.phone) {
      alert("Please fill all fields");
      return;
    }

    try {
      dispatch(setLoading(true));
      const response = await vendorLogin(formData);

      dispatch(setVendorData(formData));
      localStorage.setItem("vendorToken", response.token);
      dispatch(setCurrentStep("checkIn"));
    } catch (error) {
      dispatch(setError(error.response?.data?.message || "Login failed"));
      alert(error.response?.data?.message || "Login failed");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center">
            <Camera className="text-white" size={40} />
          </div>
          <h1 className="text-3xl font-bold text-gray-800">Zappy Vendor</h1>
          <p className="text-gray-600 mt-2">Event Day Tracker</p>
        </div>

        <div className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Vendor Name"
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition"
            value={formData.name}
            onChange={handleChange}
          />
          <input
            type="text"
            name="eventId"
            placeholder="Event ID"
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition"
            value={formData.eventId}
            onChange={handleChange}
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition"
            value={formData.phone}
            onChange={handleChange}
          />
          <button
            onClick={handleLogin}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition transform hover:scale-105"
          >
            Start Event
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
