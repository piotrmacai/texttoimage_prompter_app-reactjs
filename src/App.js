import logo from './logo.svg';
import './App.css';

import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import './App.css';

// Dodaj ten styl na początku pliku lub w osobnym pliku CSS
const customStyles = {
  control: (provided) => ({
    ...provided,
    minWidth: '300px',
    background: '#2a2a2a',
    borderColor: '#444',
    color: 'white',
  }),
  menu: (provided) => ({
    ...provided,
    width: 'auto',
    minWidth: '100%',
    background: '#2a2a2a',
  }),
  menuList: (provided) => ({
    ...provided,
    display: 'flex',
    flexWrap: 'wrap',
    maxHeight: 'none',
    overflowY: 'visible',
  }),
  option: (provided, state) => ({
    ...provided,
    width: 'auto',
    margin: '2px',
    padding: '5px 10px',
    background: state.isSelected ? '#007bff' : '#2a2a2a',
    color: 'white',
    '&:hover': {
      background: '#007bff',
    },
  }),
  multiValue: (provided) => ({
    ...provided,
    margin: '2px',
    background: '#444',
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    color: 'white',
  }),
  multiValueRemove: (provided) => ({
    ...provided,
    color: 'white',
    ':hover': {
      background: '#f44336',
      color: 'white',
    },
  }),
  input: (provided) => ({
    ...provided,
    color: 'white',
  }),
  singleValue: (provided) => ({
    ...provided,
    color: 'white',
  }),
};

const App = () => {
  const [prompt, setPrompt] = useState({
    object: '',
    description: '',
    style: [],
    camera: [],
    imageType: [],
    lighting: [],
    background: '',
    aspectRatio: [],
    cameraType: [],
    texture: [],
  });

  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [generatedPromptJSON, setGeneratedPromptJSON] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPrompt(prevPrompt => ({ ...prevPrompt, [name]: value }));
  };

  const handleMultiSelectChange = (selectedOptions, actionMeta) => {
    const { name } = actionMeta;
    const selectedValues = selectedOptions.map(option => option.value);
    setPrompt(prevPrompt => ({ ...prevPrompt, [name]: selectedValues }));
  };

  useEffect(() => {
    const generatePrompt = () => {
      let newPrompt = '';

      if (prompt.object) {
        newPrompt += prompt.object;
        if (prompt.description) {
          newPrompt += `, ${prompt.description}`;
        }
        newPrompt += '; ';
      } else if (prompt.description) {
        newPrompt += `${prompt.description}; `;
      }

      if (prompt.background) {
        newPrompt += `background: ${prompt.background}; `;
      }

      const cameraStyles = [...prompt.camera, ...prompt.style, ...prompt.imageType, ...prompt.cameraType];
      if (cameraStyles.length > 0) {
        newPrompt += `${cameraStyles.join(', ')}; `;
      }

      if (prompt.lighting.length > 0) {
        newPrompt += `lighting: ${prompt.lighting.join(', ')}; `;
      }

      if (prompt.texture.length > 0) {
        newPrompt += `texture: ${prompt.texture.join(', ')}; `;
      }

      if (prompt.aspectRatio.length > 0) {
        newPrompt += `aspectRatio: ${prompt.aspectRatio.join(', ')}`;
      }

      setGeneratedPrompt(newPrompt);

      // Generowanie nowego obiektu JSON
      const jsonPrompt = {
        object: {
          object: prompt.object,
          description: prompt.description
        },
        background: {
          description: prompt.background,
        },
        modifiers: {
          style: prompt.style,
          photo_type: prompt.imageType,
          camera_type: prompt.cameraType,
          lighting: prompt.lighting,
          texture: prompt.texture,
          details: "",
          color: "",
          aspect_ratio: prompt.aspectRatio
        }
      };

      setGeneratedPromptJSON(jsonPrompt);
    };

    generatePrompt();
  }, [prompt]);

  // Opcje dla każdego pola wyboru
  const styleOptions = [
    { value: 'realistic', label: 'Realistic' },
    { value: 'cinematic', label: 'Cinematic' },
    { value: 'abstract', label: 'Abstract' },
    { value: 'cartoon', label: 'Cartoon' },
    { value: 'minimalism', label: 'Minimalism' },
    { value: 'pop-art', label: 'Pop Art' },
    { value: 'street-art', label: 'Street Art' },
    { value: 'conceptual-art', label: 'Conceptual Art' },
    { value: 'collage', label: 'Collage' },
    { value: 'futurism', label: 'Futurism' },
    { value: 'retro', label: 'Retro' },
    { value: 'glitch-art', label: 'Glitch' },
    { value: 'fantasy', label: 'Fantasy' }
  ];

  const cameraOptions = [
    { value: 'close_up', label: 'Close-up' },
    { value: 'wide_angle', label: 'Wide angle' },
    { value: 'aerial', label: 'Aerial' },
    { value: 'macro', label: 'Macro' }, // For extreme close-ups of small subjects
    { value: 'panoramic', label: 'Panoramic' }, // For wide, sweeping landscape shots
    { value: 'portrait', label: 'Portrait' }, // Focus on individual or group portraits
    { value: 'fisheye', label: 'Fisheye' }, // Ultra wide-angle with distortion
    { value: 'long_exposure', label: 'Long Exposure' }, // For capturing motion blur or low light
    { value: 'bokeh', label: 'Bokeh' }, // Blurred background with a sharp foreground
    { value: 'tilt_shift', label: 'Tilt-Shift' }, // Miniature effect with selective focus
    { value: 'drone', label: 'Drone' }, // Aerial photography specifically from drones
    { value: 'time_lapse', label: 'Time-lapse' }, // Captures changes over time
    { value: 'night', label: 'Night' } // Low-light or nighttime photography
  ];

  const imageTypeOptions = [
    { value: 'photography', label: 'Photography' },
    { value: 'painting', label: 'Painting' },
    { value: '3d_graphics', label: '3D Graphics' },
    { value: 'sketch', label: 'Sketch' }, // Hand-drawn or digital sketches
    { value: 'illustration', label: 'Illustration' }, // Artistic or technical illustrations
    { value: 'digital_art', label: 'Digital Art' }, // Fully digital artworks
    { value: 'vector_art', label: 'Vector Art' }, // Clean, scalable vector graphics
    { value: 'pixel_art', label: 'Pixel Art' }, // Retro, pixelated style graphics
    { value: 'collage', label: 'Collage' }, // Mixed media or photo-collage style
    { value: 'cinematic', label: 'Cinematic' }, // Movie-like compositions
    { value: 'concept_art', label: 'Concept Art' }, // Imagery used in design/concept visualization
    { value: 'surreal', label: 'Surreal' }, // Dream-like, surreal compositions
    { value: 'anime', label: 'Anime' }, // Anime or manga-style art
    { value: 'vaporwave', label: 'Vaporwave' }, // 80s/90s inspired retro-futuristic art
    { value: 'pop_art', label: 'Pop Art' }, // Bold, vibrant comic-style art
  ];

  const cameraTypeOptions = [
    { value: 'DSLR', label: 'DSLR - Professional digital' },
    { value: 'Leica', label: 'Leica - High-quality street' },
    { value: 'Hasselblad', label: 'Hasselblad - High-resolution studio' },
    { value: 'GoPro', label: 'GoPro - Action and sports' },
    { value: 'Polaroid', label: 'Polaroid - Instant retro' },
    { value: 'Drone', label: 'Drone - Aerial photography' },
    { value: 'Pinhole', label: 'Pinhole camera - Experimental artistic photography' },
    { value: 'Large Format', label: 'Large format camera - High-quality landscape' },
    { value: 'iPhone 14 Pro', label: 'iPhone 14 Pro - Professional mobile' },
    { value: 'Film Camera', label: 'Film camera - Classic film' },
  ];

  const lightingOptions = [
    { value: 'natural', label: 'Natural' },
    { value: 'studio', label: 'Studio' },
    { value: 'night', label: 'Night' },
    { value: 'golden_hour', label: 'Golden Hour' },
    { value: 'backlit', label: 'Backlit' },
    { value: 'dramatic', label: 'Dramatic' },
    { value: 'soft', label: 'Soft' },
    { value: 'harsh', label: 'Harsh' },
    { value: 'neon', label: 'Neon' },
    { value: 'cinematic', label: 'Cinematic' },
    { value: 'volumetric', label: 'Volumetric' },
    { value: 'rim_light', label: 'Rim Light' },
  ];

  const textureOptions = [
    { value: 'Natural', label: 'Natural' },
    { value: 'Shiny', label: 'Shiny' },
    { value: 'Matte', label: 'Matte' },
    { value: 'Smooth', label: 'Smooth' },
    { value: 'Rough', label: 'Rough' },
    { value: 'Metallic', label: 'Metallic' },
    { value: 'Glossy', label: 'Glossy' },
    { value: 'Textured', label: 'Textured' },
    { value: 'Velvety', label: 'Velvety' },
    { value: 'Grainy', label: 'Grainy' }
  ];

  const popularLightingOptions = [
    { value: 'soft_lighting', label: 'Soft lighting' },
    { value: 'dramatic_lighting', label: 'Dramatic lighting' },
    { value: 'cinematic_lighting', label: 'Cinematic lighting' },
    { value: 'golden_hour', label: 'Golden hour' },
    { value: 'backlit', label: 'Backlit' },
    { value: 'volumetric_lighting', label: 'Volumetric lighting' },
    { value: 'neon_lighting', label: 'Neon lighting' },
    { value: 'studio_lighting', label: 'Studio lighting' },
    { value: 'natural_lighting', label: 'Natural lighting' },
    { value: 'high_contrast', label: 'High contrast' }
  ];
  const aspectRatioOptions = [
    { value: '1:1', label: 'Square (1:1)' },
    { value: '4:3', label: 'Standard (4:3)' },
    { value: '16:9', label: 'Wide (16:9)' },
    { value: '3:2', label: 'Classic (3:2)' },
    { value: '2:1', label: 'Cinematic (2:1)' },
    { value: '9:16', label: 'Vertical (9:16)' },
    { value: '21:9', label: 'Ultra-wide (21:9)' },
    { value: '5:4', label: 'Large Format (5:4)' },
  ];

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert('Copied to clipboard!');
    }, (err) => {
      console.error('Prompt was not copied, please try again: ', err);
    });
  };

  return (
    <div className="App">
      <div className="header-container">
      <div className="header-logo">
          <h1 style={{ fontSize: '2rem' }}>PromptGod</h1>
      </div>
      <div className="header-content">
          <h3>Text-to-image prompt enhancer</h3>
    </div>
      </div>
      <div className="main-container">
        <div className="input-column">
          <div>
            <label>Object:
              <input type="text" name="object" value={prompt.object} onChange={handleInputChange} />
            </label>
          </div>
          <div>
            <label>Object Description:
              <input type="text" name="description" value={prompt.description} onChange={handleInputChange} />
            </label>
          </div>
          <div>
            <label>Background:
              <input type="text" name="background" value={prompt.background} onChange={handleInputChange} />
            </label>
          </div>
          <div>
            <label>Image Style:
              <Select
                isMulti
                name="style"
                options={styleOptions}
                onChange={(selectedOptions, actionMeta) => handleMultiSelectChange(selectedOptions, actionMeta)}
                styles={customStyles}
                menuPosition="fixed"
                menuPlacement="auto"
              />
            </label>
          </div>
          <div>
            <label>Camera:
              <Select
                isMulti
                name="camera"
                options={cameraOptions}
                onChange={(selectedOptions, actionMeta) => handleMultiSelectChange(selectedOptions, actionMeta)}
                styles={customStyles}
                menuPosition="fixed"
                menuPlacement="auto"
              />
            </label>
          </div>
          <div>
            <label>Image Type:
              <Select
                isMulti
                name="imageType"
                options={imageTypeOptions}
                onChange={(selectedOptions, actionMeta) => handleMultiSelectChange(selectedOptions, actionMeta)}
                styles={customStyles}
                menuPosition="fixed"
                menuPlacement="auto"
              />
            </label>
          </div>  
          <div>
            <label>Camera Type:
              <Select
                isMulti
                name="cameraType"
                options={cameraTypeOptions}
                onChange={(selectedOptions, actionMeta) => handleMultiSelectChange(selectedOptions, actionMeta)}
                styles={customStyles}
                menuPosition="fixed"
                menuPlacement="auto"
              />
            </label>
          </div>
          <div>
            <label>Lighting:
              <Select
                isMulti
                name="lighting"
                options={lightingOptions}
                onChange={(selectedOptions, actionMeta) => handleMultiSelectChange(selectedOptions, actionMeta)}
                styles={customStyles}
                menuPosition="fixed"
                menuPlacement="auto"
              />
            </label>
          </div>
          <div>
            <label>Texture:
              <Select
                isMulti
                name="texture"
                options={textureOptions}
                onChange={(selectedOptions, actionMeta) => handleMultiSelectChange(selectedOptions, actionMeta)}
                styles={customStyles}
                menuPosition="fixed"
                menuPlacement="auto"
              />
            </label>
          </div>
          <div>
            <label>Aspect Ratio:
              <Select
                isMulti
                name="aspectRatio"
                options={aspectRatioOptions}
                onChange={(selectedOptions, actionMeta) => handleMultiSelectChange(selectedOptions, actionMeta)}
                styles={customStyles}
                menuPosition="fixed"
                menuPlacement="auto"
              />
            </label>
          </div>
        </div>
        <div className="output-column">
          <div className="generated-prompt">
            {/* <h3>Generated Prompt:</h3> */}
            <p>{generatedPrompt}</p>
            <button onClick={() => copyToClipboard(generatedPrompt)} className="copy-button">Copy Prompt</button>
                <button onClick={() => {
              copyToClipboard(generatedPrompt);
              window.open('https://huggingface.co/spaces/black-forest-labs/FLUX.1-dev', '_blank');
            }} className="copy-button">& Open Flux.1
            </button>
            <button onClick={() => {
              copyToClipboard(generatedPrompt);
              window.open('https://midjourney.com', '_blank');
            }} className="copy-button">& Open Midjourney
            </button>
            <button onClick={() => {
              copyToClipboard(generatedPrompt);
              window.open('https://app.leonardo.ai/', '_blank');
            }} className="copy-button">& Open Leonardo AI
            </button>
        
          </div>
          <div className="generated-prompt-json">
            {/* <h3>Generated Prompt JSON:</h3> */}
            <pre>{JSON.stringify(generatedPromptJSON, null, 2)}</pre>
            <button onClick={() => 
              copyToClipboard(JSON.stringify(generatedPromptJSON, null, 2))
              } className="copy-button">Copy JSON
            </button>
            <button onClick={() => { 
              copyToClipboard(JSON.stringify(generatedPromptJSON, null, 2));
              window.open('https://huggingface.co/spaces/black-forest-labs/FLUX.1-dev', '_blank');
            }} className="copy-button">& Open Flux.1
            </button>
            <button onClick={() => { 
              copyToClipboard(JSON.stringify(generatedPromptJSON, null, 2));
              window.open('https://midjourney.com', '_blank');
            }} className="copy-button">& Open Midjourney
            </button>
            <button onClick={() => { 
              copyToClipboard(JSON.stringify(generatedPromptJSON, null, 2));
              window.open('https://app.leonardo.ai/', '_blank');
            }} className="copy-button">& Open Leonardo AI
            </button>
          </div>
        </div>
      </div>
      <footer className="footer">
        <div className="footer-left">
          {/* <img src="/path/to/your/logo.png" alt="Logo" className="footer-logo" /> */}
          <span>MacaiStudio</span>
        </div>
        <div className="footer-right">
          <a href="https://x.com/piotrmacai" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="https://www.linkedin.com/in/piotrmac0/" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-linkedin"></i>
          </a>
          <a href="https://github.com/aiwareai" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-github"></i>
          </a>
        </div>
      </footer>
    </div>
  );
};

export default App;