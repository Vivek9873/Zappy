import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Camera, MapPin, Clock } from "lucide-react";
import { setCheckInData } from "../redux/slices/eventSlice";
import {
  setCurrentStep,
  setGeneratedOTP,
  setLoading,
} from "../redux/slices/appSlice";
import { checkInVendor, sendOTP } from "../api/services";

const CheckInScreen = () => {
  const dispatch = useDispatch();
  const { checkIn } = useSelector((state) => state.event);
  const { eventId } = useSelector((state) => state.vendor);
  const [photo, setPhoto] = useState(null);
  const [photoFile, setPhotoFile] = useState(null);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const locationData = {
            location: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
            timestamp: new Date().toISOString(),
          };
          dispatch(setCheckInData(locationData));
        },
        () => {
          const locationData = {
            location: { lat: 28.7041, lng: 77.1025 },
            timestamp: new Date().toISOString(),
          };
          dispatch(setCheckInData(locationData));
        }
      );
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhotoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCheckIn = async () => {
    if (!photo || !checkIn.location) {
      alert("Please upload photo and capture location");
      return;
    }

    try {
      dispatch(setLoading(true));

      const formData = new FormData();
      formData.append("photo", photoFile);
      formData.append("eventId", eventId);
      formData.append("latitude", checkIn.location.lat);
      formData.append("longitude", checkIn.location.lng);
      formData.append("timestamp", checkIn.timestamp);

      await checkInVendor(formData);

      const otpResponse = await sendOTP({ eventId, type: "start" });
      dispatch(setGeneratedOTP(otpResponse.otp));
      // alert(`OTP sent to customer: ${otpResponse.otp}`);

      dispatch(setCurrentStep("verifyOTP"));
    } catch (error) {
      alert(error.response?.data?.message || "Check-in failed");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Vendor Check-In
          </h2>
          <p className="text-gray-600">Event ID: {eventId}</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <Camera className="inline mr-2" size={20} />
              Upload Arrival Photo
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-purple-500 transition"
            />
            {photo && (
              <img
                src={photo}
                alt="Check-in"
                className="mt-4 w-full h-48 object-cover rounded-xl"
              />
            )}
          </div>

          <button
            onClick={getLocation}
            className="w-full bg-blue-500 text-white py-3 rounded-xl font-semibold hover:bg-blue-600 transition flex items-center justify-center"
          >
            <MapPin className="mr-2" size={20} />
            Capture Location
          </button>

          {checkIn.location && (
            <div className="bg-green-50 p-4 rounded-xl">
              <p className="text-sm text-green-800">
                <Clock className="inline mr-2" size={16} />
                Location captured at:{" "}
                {new Date(checkIn.timestamp).toLocaleString()}
              </p>
              <p className="text-sm text-green-800 mt-2">
                Lat: {checkIn.location.lat.toFixed(4)}, Lng:{" "}
                {checkIn.location.lng.toFixed(4)}
              </p>
            </div>
          )}

          <button
            onClick={handleCheckIn}
            disabled={!photo || !checkIn.location}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Complete Check-In
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckInScreen;
