import React from "react";
import FormField from "./FormField";

export default function CardField({ field, value, onChange, errors }) {
  const handleChange = (name, val) => {
    onChange({ ...value, [name]: val });
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-4 sm:p-6 lg:p-8 mb-6 transition-all duration-300 hover:shadow-lg w-full">
      <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-800 mb-4">
        {field.title}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {field.data.map((child) => (
          <FormField
            key={child.name}
            field={child}
            value={value[child.name] || ""}
            onChange={(val) => handleChange(child.name, val)}
            error={errors ? errors[child.name] : null}
          />
        ))}
      </div>
    </div>
  );
}
