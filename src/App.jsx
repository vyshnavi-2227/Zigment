import React, { useState } from "react";
import JSONEditor from "./components/JSONEditor";
import FormGenerator from "./components/FormGenerator";
import Navbar from "./components/Navbar";

const initialJson = `
{
  "formTitle": "User Registration Form",
  "formDescription": "Please fill in your details below.",
  "fields": [
    { "label": "Name", "type": "text", "id": "name", "required": true },
    { "label": "Email", "type": "email", "id": "email", "required": true },
    { "label": "Message", "type": "textarea", "id": "message" },
    { "label": "Gender", "type": "select", "id": "gender",
      "options": [
     { "value": "Male", "label": "Male" },
     { "value": "Female", "label": "Female" },
     { "value": "Other", "label": "Other" }]
    }]
}`;

function App() {
  const [jsonSchema, setJsonSchema] = useState(initialJson);
  const [parsedSchema, setParsedSchema] = useState(JSON.parse(initialJson));
  const [error, setError] = useState("");

  const handleSchemaChange = (newSchema) => {
    setJsonSchema(newSchema);
    try {
      const parsed = JSON.parse(newSchema);
      setParsedSchema(parsed);
      setError("");
    } catch (err) {
      setError("Invalid JSON format");
    }
  };

  const downloadJSON = () => {
    const blob = new Blob([jsonSchema], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "schema.json";
    link.click();
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(jsonSchema);
    alert("JSON copied to clipboard!");
  };

  const resetSchema = () => {
    setJsonSchema(initialJson);
    setParsedSchema(JSON.parse(initialJson));
    setError("");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 flex flex-col">
      <Navbar
        jsonSchema={jsonSchema}
        setJsonSchema={setJsonSchema}
        downloadJSON={downloadJSON}
        copyToClipboard={copyToClipboard}
        resetSchema={resetSchema}
      />

      <div className="flex flex-1 flex-col md:flex-row gap-4 p-2 md:p-4">
        <div className="w-full  md:w-1/2 border-r border-gray-200 dark:border-gray-700 ">
          <JSONEditor
            jsonSchema={jsonSchema}
            setJsonSchema={handleSchemaChange}
            error={error}
          />
        </div>

        <div className="w-full md:w-1/2 flex ">
          <FormGenerator schema={parsedSchema} />
        </div>
      </div>
    </div>
  );
}

export default App;
