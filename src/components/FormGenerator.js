import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";



const FormGenerator = ({ schema }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [formData, setFormData] = useState(null);
  const [schemaError, setSchemaError] = useState(null);
  const [isSchemaValid, setIsSchemaValid] = useState(false);

  useEffect(() => {
    const validateSchema = () => {
      if (!schema || !schema.fields) return false;
      for (const field of schema.fields) {
        if (!field.id || field.id.trim() === "") {
          setSchemaError(`Field with label "${field.label}" has an invalid or missing ID.`);
          return false;
        }
      }
      setSchemaError(null);
      return true;
    };

    setIsSchemaValid(validateSchema());
  }, [schema]);

  const onSubmit = (data) => {
    setFormData(data);
    console.log("Form Data:", formData);
    alert("Form submitted successfully!");
  };



  if (schemaError) {
    return (
      <div className="bg-white dark:bg-gray-800 p-6 rounded shadow w-full">
        <p className="text-red-600 dark:text-red-400">{schemaError}</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-3 md:p-6  rounded shadow w-full">
      {isSchemaValid && (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
          <h2 className=" sm:text-2xl text-2xl font-bold text-gray-900 dark:text-gray-200 text-center">
            {schema.formTitle}
          </h2>
          <p className="text-gray-700 dark:text-gray-300 text-center">{schema.formDescription}</p>

          {schema.fields.map((field) => (
            field.id && field.id.trim() !== "" && (
              <div key={field.id} >
                <label className="block font-medium text-gray-800 dark:text-gray-200 mb-1">
                  {field.label}
                </label>

                {[
                  "text", "email", "password", "number", "tel", "url",
                  "search", "date", "time", "datetime-local", "month",
                  "week", "color"
                ].includes(field.type) && (
                    <input
                      type={field.type}
                      placeholder={field.placeholder}
                      {...register(field.id, { required: field.required })}
                      className="w-full p-1 md:p-3 border border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-700"
                    />
                  )}

                {field.type === "textarea" && (
                  <textarea
                    placeholder={field.placeholder}
                    {...register(field.id, { required: field.required })}
                    className="w-full p-1 md:p-3 border border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-700"
                  />
                )}

                {field.type === "select" && field.options && (
                  <select
                    {...register(field.id, { required: field.required })}
                    className="w-full p-1 md:p-3 border border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-700"
                  >
                    <option value="">Select an option</option>
                    {field.options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                )}

                {field.type === "radio" && field.options && (
                  <div className="flex gap-4">
                    {field.options.map((option) => (
                      <label key={option.value} className="flex items-center">
                        <input
                          type="radio"
                          value={option.value}
                          {...register(field.id, { required: field.required })}
                          className="mr-2"
                        />
                        {option.label}
                      </label>
                    ))}
                  </div>
                )}

                {field.type === "checkbox" && field.options && (
                  <div className="flex gap-4">
                    {field.options.map((option) => (
                      <label key={option.value} className="flex items-center">
                        <input
                          type="checkbox"
                          value={option.value}
                          {...register(field.id)}
                          className="mr-2"
                        />
                        {option.label}
                      </label>
                    ))}
                  </div>
                )}

                {field.type === "file" && (
                  <input
                    type="file"
                    {...register(field.id)}
                    className="w-full p-1 md:p-3 border border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-700"
                  />
                )}

                {field.type === "range" && (
                  <input
                    type="range"
                    min={field.min}
                    max={field.max}
                    step={field.step}
                    {...register(field.id)}
                    className="w-full"
                  />
                )}

                {errors[field.id] && (
                  <span className="text-red-600 dark:text-red-400">This field is required</span>
                )}
              </div>
            )
          ))}

          <div className="space-y-3">
            <button type="submit" className="w-full bg-green-500 dark:bg-green-700 text-white py-2 rounded hover:bg-green-600">
              Submit
            </button>
            <button type="reset" onClick={() => reset()} className="w-full bg-black-500 dark:bg-gray-700 text-white py-2 rounded hover:bg-gray-600">
              Reset
            </button>

          </div>
        </form>
      )}
    </div>
  );
};

export default FormGenerator;
