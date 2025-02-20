import React, { useState } from "react";

const ContactAgentForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    comments: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePhone = (phone) => /^\d+$/.test(phone);

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = [];
    if (!formData.fullName) errors.push("Full Name is required.");
    if (!formData.email) errors.push("Email is required.");
    else if (!validateEmail(formData.email))
      errors.push("Invalid email format.");
    if (!formData.phone) errors.push("Phone is required.");
    else if (!validatePhone(formData.phone))
      errors.push("Phone must contain only digits.");
    if (!formData.comments) errors.push("Comments are required.");

    if (errors.length > 0) {
      setError(errors.join("\n"));
      setSuccess("");
      return;
    }

    setError("");
    setSuccess("Message sent successfully!");
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      comments: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {error && (
        <p className="text-red-500 text-sm whitespace-pre-line">{error}</p>
      )}
      {success && <p className="text-green-500 text-sm">{success}</p>}

      <div>
        <label htmlFor="fullName" className="block font-medium mb-1">
          Full Name
        </label>
        <input
          id="fullName"
          name="fullName"
          type="text"
          value={formData.fullName}
          onChange={handleChange}
          className="border border-gray-300 rounded w-full p-2"
        />
      </div>

      <div>
        <label htmlFor="email" className="block font-medium mb-1">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="text"
          value={formData.email}
          onChange={handleChange}
          className="border border-gray-300 rounded w-full p-2"
        />
      </div>

      <div>
        <label htmlFor="phone" className="block font-medium mb-1">
          Phone
        </label>
        <input
          id="phone"
          name="phone"
          type="text"
          value={formData.phone}
          onChange={handleChange}
          className="border border-gray-300 rounded w-full p-2"
        />
      </div>

      <div>
        <label htmlFor="comments" className="block font-medium mb-1">
          Comments
        </label>
        <textarea
          id="comments"
          name="comments"
          rows="4"
          value={formData.comments}
          onChange={handleChange}
          className="border border-gray-300 rounded w-full p-2"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
      >
        Contact Now
      </button>
    </form>
  );
};

export default ContactAgentForm;
