import React, { useState } from "react";
import ReactDOM from "react-dom";
import { ModalProvider, Modal } from "./CRModal.jsx";



function CRModal() {
  return (
    <ModalProvider>
      <Page />
    </ModalProvider>
  );
}

export function Page() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
     
      <div onClick={() => setIsModalOpen(true)} class="dx-button dx-button-mode-contained dx-widget dx-button-has-text" aria-label="More" tabindex="0" role="button"><div class="dx-button-content"><span class="dx-button-text">Learn How to Create a Recipe!</span></div></div>

      {isModalOpen && (
        <Modal
          onClose={() => setIsModalOpen(false)}
          style={{ width: 700, height: 300, textAlign: "center" }}
        >
          <p>To add an ingredient to a recipe select an ingredient from "Ingredient List" on the left and click "Add Ingredient".</p>
          <p>To remove an ingredient from your recipe select an ingredient from "My Recipe" on the right and click "Remove Ingredient".</p>
          <p>To save your recipe click "Save Recipe" and give your recipe a name.</p>
        </Modal>
      )}
    </div>
  );
}
 export default CRModal;

