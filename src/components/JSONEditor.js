import React, { useState } from 'react';

const JSONEditor = ({ jsonSchema, setJsonSchema }) => {
  const [error, setError] = useState(null);
  const [lineNumber, setLineNumber] = useState(null);

  const validateJSON = (jsonText) => {
    try {
      const parsed = JSON.parse(jsonText);

      if (!parsed.fields || !Array.isArray(parsed.fields)) {
        throw new Error("The JSON must contain a 'fields' array.");
      }

      parsed.fields.forEach((field, index) => {
        if (!field.id || typeof field.id !== 'string') {
          throw new Error(`Field #${index + 1} is missing a valid 'id'.`);
        }
        if (!field.label || typeof field.label !== 'string') {
          throw new Error(`Field #${index + 1} is missing a valid 'label'.`);
        }
        if (!field.type || typeof field.type !== 'string') {
          throw new Error(`Field #${index + 1} is missing a valid 'type'.`);
        }
      });

      setError(null);
      return true;
    } catch (err) {
      setError(err.message);

      const match = err.message.match(/at position (\d+)/);
      if (match) {
        const position = parseInt(match[1], 10);
        setLineNumber(findLineNumber(jsonText, position));
      } else {
        setLineNumber(null);
      }

      return false;
    }
  };

  const findLineNumber = (text, position) => {
    const lines = text.substring(0, position).split('\n');
    return lines.length;
  };

  const handleInputChange = (e) => {
    const updatedSchema = e.target.value;
    setJsonSchema(updatedSchema);

    validateJSON(updatedSchema);
  };

  return (
    <div className="w-full h-full min-h-44 bg-white dark:bg-gray-800 p-3 md:p-6">
      {error && (
        <div className="bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 p-4 mb-4 rounded">
          <p><strong>Error:</strong> {error}</p>
          {lineNumber && <p>On line: {lineNumber}</p>}
        </div>
      )}

      <textarea
        className={`w-full min-h-56 h-full  p-4 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-200 border ${error ? 'border-red-500' : 'border-gray-300'} dark:border-gray-700 rounded`}
        value={jsonSchema}
        onChange={handleInputChange}
        placeholder="Enter your JSON schema here..."
        spellCheck={false}
      />


    </div>
  );
};

export default JSONEditor;
