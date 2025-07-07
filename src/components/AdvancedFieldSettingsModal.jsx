import React from "react";
import Modal from "@clayui/modal";
import "@clayui/css/lib/css/atlas.css";

const AdvancedFieldSettingsModal = ({
  observer,
  open,
  field,
  pageId,
  updateField,
}) => {
  if (!open) return null;

  return (
    <Modal observer={observer} size="lg" status="info">
      <Modal.Header>Paramètres avancés</Modal.Header>
      <Modal.Body>
        <div className="flex gap-2 flex-col">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Placeholder
            </label>
            <input
              type="text"
              placeholder={field.placeholder}
              onChange={(e) =>
                updateField(pageId, field.id, {
                  placeholder: e.target.value,
                })
              }
              value={field.placeholder}
              className="field-input"
            />
            <p className="text-xs text-gray-500 mt-1">
              Le texte affiché à l'intérieur du champ avant saisie.
            </p>
          </div>

          {["text", "textarea"].includes(field.type) && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Longueur
                </label>
                <div className="flex gap-2">
                  <div className="w-1/2">
                    <input
                      type="number"
                      min={0}
                      placeholder="Min. (ex: 3)"
                      value={field.minLength || ""}
                      onChange={(e) =>
                        updateField(pageId, field.id, {
                          minLength: e.target.value
                            ? parseInt(e.target.value, 10)
                            : undefined,
                        })
                      }
                      className="field-input w-full"
                    />
                  </div>
                  <div className="w-1/2">
                    <input
                      type="number"
                      min={0}
                      placeholder="Max. (ex: 50)"
                      value={field.maxLength || ""}
                      onChange={(e) =>
                        updateField(pageId, field.id, {
                          maxLength: e.target.value
                            ? parseInt(e.target.value, 10)
                            : undefined,
                        })
                      }
                      className="field-input w-full"
                    />
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Indiquez le nombre minimum et maximum de caractères autorisés
                  dans ce champ.
                </p>
              </div>
            </>
          )}

          {field.type === "number" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Valeur
              </label>
              <div className="flex gap-2">
                <div className="w-1/2">
                  <input
                    type="number"
                    placeholder="Min. (ex: 0)"
                    value={field.min || ""}
                    onChange={(e) =>
                      updateField(pageId, field.id, {
                        min: e.target.value
                          ? parseFloat(e.target.value)
                          : undefined,
                      })
                    }
                    className="field-input w-full"
                  />
                </div>
                <div className="w-1/2">
                  <input
                    type="number"
                    placeholder="Max. (ex: 100)"
                    value={field.max || ""}
                    onChange={(e) =>
                      updateField(pageId, field.id, {
                        max: e.target.value
                          ? parseFloat(e.target.value)
                          : undefined,
                      })
                    }
                    className="field-input w-full"
                  />
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Indiquez les valeurs numériques minimales et maximales
                acceptées.
              </p>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Expression régulière (validation)
            </label>
            <input
              type="text"
              placeholder="^[A-Za-z0-9]+$"
              value={field.pattern || ""}
              onChange={(e) =>
                updateField(pageId, field.id, {
                  pattern: e.target.value,
                })
              }
              className="field-input"
            />
            <p className="text-xs text-gray-500 mt-1">
              Utilisez une expression régulière pour vérifier le format de
              saisie.
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Message d'erreur personnalisé
            </label>
            <input
              type="text"
              placeholder="Exemple : Ce champ est requis"
              value={field.errorMessage || ""}
              onChange={(e) =>
                updateField(pageId, field.id, {
                  errorMessage: e.target.value,
                })
              }
              className="field-input"
            />
            <p className="text-xs text-gray-500 mt-1">
              Ce message sera affiché lorsque la validation échoue.
            </p>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default AdvancedFieldSettingsModal;
