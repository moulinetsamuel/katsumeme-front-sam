import React, { useState } from 'react';

function MemeCreationModal() {
  const [showModal, setShowModal] = useState(false);
  const [image, setImage] = useState(null);
  const [textInputs, setTextInputs] = useState(['', '']);

  //Close and open modal
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  // To import image for the meme
  const handleImageChange = (event) => {
    // Code here
  };

  // To add text input for the meme
  const handleAddTextInput = () => {
    setTextInputs([...textInputs, '']);
  };

  // For the Reset button
  const handleReset = () => {
    setImage(null);
    setTextInputs(['', '', '']);
  };

  const handleGenerateMeme = () => {
    // Code here
  };

  return (
    // REMPLACE WITH BOOSTRAP MODAL
    <div>
      <h1>Create Meme</h1>
      <input type="file" onChange={handleImageChange} />
      <button type="button" onClick={handleAddTextInput}>
        Add Text
      </button>
      {textInputs.map((text, index) => (
        <input
          key={index}
          type="text"
          value={text}
          onChange={(e) => {
            const newInputs = [...textInputs];
            newInputs[index] = e.target.value;
            setTextInputs(newInputs);
          }}
        />
      ))}
      <button type="button" onClick={handleReset}>
        Reset
      </button>
      <button type="button" onClick={handleGenerateMeme}>
        Generate your Meme o/
      </button>
    </div>
  );
}

export default MemeCreationModal;
