import React, { useState } from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/mode/python/python';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import { loadPyodide } from "pyodide";

function App() {
  const [code, setCode] = useState('');
  const [consoleOutput, setConsoleOutput] = useState('');


  const handleRunCode = async () => {
    try {
      const pyodide = await window.loadPyodide({ indexURL: "https://cdn.jsdelivr.net/pyodide/v0.17.0/full/" });
      const output = await pyodide.runPythonAsync(code);
      setConsoleOutput(output);
    } catch (error) {
      console.error('Error occurred while executing the code:', error);
      setConsoleOutput('Error occurred, please check your code');
    }
  };

  return (
    <div className="app">
      <div className="editor">
        <div className="header">
          <button onClick={handleRunCode}>Run</button>
        </div>
        <CodeMirror
          value={code}
          options={{
            mode: 'python',
            theme: 'material',
            lineNumbers: true
          }}
          onBeforeChange={(editor, data, value) => {
            setCode(value);
          }}
        />
      </div>
      <div className="console">
        <h2>Console Output</h2>
        <pre>{consoleOutput}</pre>
      </div>
    </div>
  );
}

export default App;


