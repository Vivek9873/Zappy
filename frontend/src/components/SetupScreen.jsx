import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CheckCircle, Image } from "lucide-react";
import { setSetupData } from "../redux/slices/eventSlice";
import {
  setCurrentStep,
  setGeneratedOTP,
  setLoading,
} from "../redux/slices/appSlice";
import { uploadSetupPhotos, sendOTP } from "../api/services";

const SetupScreen = () => {
  const dispatch = useDispatch();
  const { setup } = useSelector((state) => state.event);
  const { eventId } = useSelector((state) => state.vendor);
  const [preSetupPhoto, setPreSetupPhoto] = useState(null);
  const [postSetupPhoto, setPostSetupPhoto] = useState(null);
  const [preSetupFile, setPreSetupFile] = useState(null);
  const [postSetupFile, setPostSetupFile] = useState(null);
  const [notes, setNotes] = useState("");

  const handleFileUpload = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === "pre") {
          setPreSetupPhoto(reader.result);
          setPreSetupFile(file);
        } else {
          setPostSetupPhoto(reader.result);
          setPostSetupFile(file);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSetupComplete = async () => {
    if (!preSetupFile || !postSetupFile) {
      alert("Please upload both setup photos");
      return;
    }

    try {
      dispatch(setLoading(true));

      const formData = new FormData();
      formData.append("preSetupPhoto", preSetupFile);
      formData.append("postSetupPhoto", postSetupFile);
      formData.append("eventId", eventId);
      formData.append("notes", notes);

      await uploadSetupPhotos(formData);

      const otpResponse = await sendOTP({ eventId, type: "complete" });
      dispatch(setGeneratedOTP(otpResponse.otp));
      // alert(`Closing OTP sent to customer: ${otpResponse.otp}`);

      dispatch(setCurrentStep("closing"));
    } catch (error) {
      alert(error.response?.data?.message || "Setup upload failed");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Event Setup Progress
          </h2>
          <div className="flex items-center text-green-600">
            <CheckCircle size={20} className="mr-2" />
            <span className="font-semibold">Event In Progress</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <Image className="inline mr-2" size={20} />
              Pre-Setup Photo
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileUpload(e, "pre")}
              className="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-purple-500 transition"
            />
            {preSetupPhoto && (
              <img
                src={preSetupPhoto}
                alt="Pre-setup"
                className="mt-4 w-full h-48 object-cover rounded-xl"
              />
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <Image className="inline mr-2" size={20} />
              Post-Setup Photo
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileUpload(e, "post")}
              className="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-purple-500 transition"
            />
            {postSetupPhoto && (
              <img
                src={postSetupPhoto}
                alt="Post-setup"
                className="mt-4 w-full h-48 object-cover rounded-xl"
              />
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Notes (Optional)
            </label>
            <textarea
              placeholder="Add any notes about the setup..."
              rows="4"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          <button
            onClick={handleSetupComplete}
            disabled={!preSetupFile || !postSetupFile}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Complete Setup
          </button>
        </div>
      </div>
    </div>
  );
};

export default SetupScreen;
