import React, { useState } from "react";
import { supabase } from "../lib/supabaseClient";

interface ReviewFormData {
  name: string;
  email: string;
  rating: number;
  message: string;
  photo: string | null;
  avatar: string;
}

const avatarEmojis = [
  // People
  "👨", "👩", "👦", "👧", "🧑", "👨‍🦱", "👩‍🦱",
  // Food & Snacks
  "🍪", "🍩", "🍰", "🧁", "🍫", "🥜", "🍌", "🍎",
  "🥕", "🌽", "🍕", "🌶️", "🍗", "🥘", "🍜", "🍲",
  // Smileys
  "😊", "😌", "🤗", "😍", "🥰", "😎", "😋", "🤤",
];

const Footer: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<ReviewFormData>({
    name: "",
    email: "",
    rating: 5,
    message: "",
    photo: null,
    avatar: avatarEmojis[0],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [showThankYou, setShowThankYou] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "rating" ? parseInt(value) : value,
    }));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          photo: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    setFormData((prev) => ({
      ...prev,
      photo: null,
    }));
  };

  const generateRandomAvatar = () => {
    const avatars = avatarEmojis;
    const randomAvatar = avatars[Math.floor(Math.random() * avatars.length)];
    setFormData((prev) => ({
      ...prev,
      avatar: randomAvatar,
    }));
  };

  const selectAvatar = (avatar: string) => {
    setFormData((prev) => ({
      ...prev,
      avatar,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage("");

    try {
      const { data, error } = await supabase
        .from('reviews')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            rating: formData.rating,
            message: formData.message,
            photo: formData.photo,
            avatar: formData.avatar,
          }
        ]);

      if (error) {
        throw error;
      }

      console.log("Review submitted successfully:", data);
      setShowThankYou(true);
      setFormData({
        name: "",
        email: "",
        rating: 5,
        message: "",
        photo: null,
        avatar: avatarEmojis[0],
      });
      setTimeout(() => {
        setIsModalOpen(false);
        setShowThankYou(false);
      }, 3000);
    } catch (error) {
      console.error("Error submitting review:", error);
      setSubmitMessage("Error submitting review. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <footer className="mt-16 border-t bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 py-6 text-sm text-slate-600 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-medium">Homemade Snacks – Subscription Service</p>
            <p>• Fresh homemade small-batch snacks</p>
          </div>
          <div className="flex gap-4 items-center">
            {/* <button
              className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700"
              onClick={() => {
                const phone = "+35600000000"; // replace with real number
                window.open(`https://wa.me/${phone}`, "_blank");
              }}
            >
              <span className="text-lg">💬</span> WhatsApp
            </button> */}
            {/* <div className="flex gap-3 text-lg">
              <a href="#" className="hover:text-slate-800" aria-label="Instagram">
                Add a review
              </a>
              <a href="#" className="hover:text-slate-800" aria-label="Facebook">
                👍
              </a>
            </div> */}
            
            {/* Review button */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center justify-center rounded-full bg-amber-500 hover:bg-amber-600 text-white px-6 py-2 text-sm font-semibold shadow-sm transition-colors"
            >
              Review
            </button>
          </div>
        </div>
      </footer>

      {/* Review Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-sm w-full p-4">
            {showThankYou ? (
              <div className="flex flex-col items-center justify-center py-6">
                <div className="text-5xl mb-2">😊</div>
                <h2 className="text-lg font-semibold text-slate-900">Thank You!</h2>
                <p className="text-xs text-slate-600 text-center">We appreciate your review</p>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center mb-3">
                  <h2 className="text-sm font-semibold text-slate-900">Leave a Review</h2>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="text-slate-400 hover:text-slate-600 text-lg"
                  >
                    ✕
                  </button>
                </div>

                {submitMessage && (
                  <div className="mb-2 p-2 rounded text-xs bg-red-100 text-red-700">
                    {submitMessage}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-2.5">
                  {/* Name */}
                  <div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-full focus:outline-none focus:ring-1 focus:ring-amber-500"
                      placeholder="Your name"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-full focus:outline-none focus:ring-1 focus:ring-amber-500"
                      placeholder="your@email.com"
                    />
                  </div>

                  {/* Rating - Stars */}
                  <div>
                    <p className="text-xs font-medium text-slate-700 mb-1">Rating</p>
                    <div className="flex gap-1 text-xl">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() =>
                            setFormData((prev) => ({
                              ...prev,
                              rating: star,
                            }))
                          }
                          className={`transition-transform hover:scale-125 ${
                            star <= formData.rating ? "text-yellow-400" : "text-gray-300"
                          }`}
                        >
                          ★
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Avatar Selection */}
                  <div className="border-t border-slate-200 pt-2">
                    <p className="text-xs font-medium text-slate-700 mb-1.5">Select Your Avatar</p>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={generateRandomAvatar}
                        className="px-2.5 py-1 text-xs bg-amber-500 hover:bg-amber-600 text-white rounded-full transition-colors font-medium"
                      >
                        Generate
                      </button>
                      <div className="text-2xl">{formData.avatar}</div>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={2}
                      className="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-2xl focus:outline-none focus:ring-1 focus:ring-amber-500 resize-none"
                      placeholder="Your experience..."
                    />
                  </div>

                  {/* Photo */}
                  <div className="flex items-center gap-2">
                    <label className="px-2.5 py-1 text-xs bg-amber-500 hover:bg-amber-600 text-white rounded-full transition-colors font-medium">
                      Add Photo
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        className="hidden"
                      />
                    </label>
                    {formData.photo && (
                      <div className="relative">
                        <img
                          src={formData.photo}
                          alt="preview"
                          className="h-10 w-10 object-cover rounded-full border-2 border-amber-500"
                        />
                        <button
                          type="button"
                          onClick={handleRemovePhoto}
                          className="absolute -top-1.5 -right-1.5 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600"
                        >
                          ✕
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="flex-1 px-3 py-1.5 text-xs text-slate-700 border border-slate-300 rounded-full hover:bg-slate-50 font-medium transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 px-3 py-1.5 text-xs bg-amber-500 hover:bg-amber-600 disabled:bg-amber-400 text-white rounded-full font-medium transition-colors"
                    >
                      {isSubmitting ? "..." : "Submit"}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Footer;
