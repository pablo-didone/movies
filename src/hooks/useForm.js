import { useState } from "react";

const useForm = (data, validationSchema) => {
  const [formData, setFormData] = useState(data);

  const clearForm = () => {
    setFormData({});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return {
    formData,
    clearForm,
    handleInputChange,
  };
};

export default useForm;
