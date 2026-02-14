/**
 * Section Catégories du dashboard DSI/Admin.
 */

import { Plus, Wrench, Monitor, ChevronDown, Tag, Pencil, Trash2, X } from "lucide-react";

export type CategoryItem = {
  id: number;
  name: string;
  description?: string | null;
  type_code: string;
  is_active: boolean;
};

export type CategoryTypeItem = {
  id: number;
  code: string;
  label: string;
  is_active: boolean;
};

export type CategoriesSectionProps = {
  categoriesList: CategoryItem[];
  loadingCategories: boolean;
  categoriesTypes: CategoryTypeItem[];
  expandedCategoryType: string | null;
  setExpandedCategoryType: (v: string | null) => void;
  showAddCategoryModal: boolean;
  setShowAddCategoryModal: (v: boolean) => void;
  showEditCategoryModal: boolean;
  setShowEditCategoryModal: (v: boolean) => void;
  editingCategory: {
    id: number;
    name: string;
    type_code: string;
    is_active: boolean;
  } | null;
  setEditingCategory: (v: CategoriesSectionProps["editingCategory"]) => void;
  newCategoryName: string;
  setNewCategoryName: (v: string) => void;
  newCategoryTypeCode: string;
  setNewCategoryTypeCode: (v: string) => void;
  editCategoryName: string;
  setEditCategoryName: (v: string) => void;
  editCategoryTypeCode: string;
  setEditCategoryTypeCode: (v: string) => void;
  onOpenAddModal: () => void;
  handleAddCategory: () => void;
  handleUpdateCategory: () => void;
  onOpenEditModal: (cat: CategoryItem) => void;
  onCloseEditModal: () => void;
};

export function CategoriesSection({
  categoriesList,
  loadingCategories,
  categoriesTypes,
  expandedCategoryType,
  setExpandedCategoryType,
  showAddCategoryModal,
  setShowAddCategoryModal,
  showEditCategoryModal,
  editingCategory,
  newCategoryName,
  setNewCategoryName,
  newCategoryTypeCode,
  setNewCategoryTypeCode,
  editCategoryName,
  setEditCategoryName,
  editCategoryTypeCode,
  setEditCategoryTypeCode,
  onOpenAddModal,
  handleAddCategory,
  handleUpdateCategory,
  onOpenEditModal,
  onCloseEditModal,
}: CategoriesSectionProps) {
  return (
    <div style={{ padding: "24px", background: "white", minHeight: "100%" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", marginBottom: "24px" }}>
        <button
          type="button"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "10px 20px",
            backgroundColor: "hsl(25, 95%, 53%)",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: 500,
            fontFamily: "system-ui, -apple-system, sans-serif",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          }}
          onClick={onOpenAddModal}
        >
          <Plus size={18} />
          Nouvelle catégorie
        </button>
      </div>

      {/* Liste accordéon par type */}
      {loadingCategories ? (
        <div style={{ textAlign: "center", padding: "40px", color: "hsl(220, 15%, 45%)", fontSize: "14px" }}>
          Chargement des catégories...
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {categoriesTypes.map((typeItem) => {
            const count = categoriesList.filter((c) => c.type_code === typeItem.code).length;
            const isMateriel =
              typeItem.code === "materiel" ||
              typeItem.label.toLowerCase().includes("matériel") ||
              typeItem.label.toLowerCase().includes("materiel");
            const isExpanded = expandedCategoryType === typeItem.code;
            const subCategories = categoriesList.filter((c) => c.type_code === typeItem.code);
            return (
              <div
                key={typeItem.id}
                style={{
                  background: "white",
                  borderRadius: "0.75rem",
                  border: "1px solid hsl(220, 20%, 90%)",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
                  overflow: "hidden",
                }}
              >
                <div
                  onClick={() => setExpandedCategoryType(isExpanded ? null : typeItem.code)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "16px 20px",
                    cursor: "pointer",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    {isMateriel ? (
                      <Wrench size={18} color="hsl(25, 95%, 53%)" />
                    ) : (
                      <Monitor size={18} color="#1E3A5F" />
                    )}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", flex: 1 }}>
                    <span
                      style={{
                        fontSize: "14px",
                        fontWeight: 500,
                        color: "#111827",
                        fontFamily: "system-ui, -apple-system, sans-serif",
                      }}
                    >
                      {typeItem.label}
                    </span>
                    <span
                      style={{
                        minWidth: "22px",
                        height: "22px",
                        borderRadius: "9999px",
                        backgroundColor: "hsl(25, 95%, 53%)",
                        color: "white",
                        fontSize: "12px",
                        fontWeight: 500,
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "0 8px",
                      }}
                    >
                      {count}
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "transform 0.2s ease",
                      transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                  >
                    <ChevronDown size={18} color="hsl(220, 15%, 45%)" />
                  </div>
                </div>
                {isExpanded && (
                  <div
                    style={{
                      borderTop: "1px solid hsl(220, 20%, 90%)",
                      padding: "16px 20px",
                      background: "white",
                    }}
                  >
                    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                      {subCategories.length === 0 ? (
                        <div style={{ color: "hsl(220, 15%, 45%)", fontSize: "13px" }}>Aucune catégorie</div>
                      ) : (
                        subCategories.map((cat) => (
                          <div
                            key={cat.id}
                            style={{
                              background: "hsl(0, 0%, 100%)",
                              borderRadius: "0.75rem",
                              border: "1px solid hsl(220, 20%, 90%)",
                              padding: "16px 20px",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "12px",
                                marginBottom: "12px",
                              }}
                            >
                              <Tag size={18} color="hsl(220, 15%, 45%)" />
                              <div style={{ display: "flex", alignItems: "center", gap: "8px", flex: 1 }}>
                                <span
                                  style={{
                                    fontSize: "14px",
                                    fontWeight: 500,
                                    color: "hsl(var(--foreground, #111827))",
                                    fontFamily: "system-ui, -apple-system, sans-serif",
                                  }}
                                >
                                  {cat.name}
                                </span>
                                {cat.is_active && (
                                  <span
                                    style={{
                                      padding: "3px 8px",
                                      borderRadius: "9999px",
                                      border: "1px solid hsl(220, 20%, 80%)",
                                      color: "hsl(220, 15%, 45%)",
                                      fontSize: "12px",
                                      fontWeight: 500,
                                    }}
                                  >
                                    Actif
                                  </span>
                                )}
                              </div>
                              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                                <button
                                  type="button"
                                  onClick={() => onOpenEditModal(cat)}
                                  style={{
                                    padding: "4px",
                                    background: "transparent",
                                    border: "none",
                                    cursor: "pointer",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                  }}
                                  title="Modifier"
                                >
                                  <Pencil size={18} color="hsl(220, 15%, 45%)" />
                                </button>
                                <button
                                  type="button"
                                  style={{
                                    padding: "4px",
                                    background: "transparent",
                                    border: "none",
                                    cursor: "pointer",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                  }}
                                  title="Supprimer"
                                >
                                  <Trash2 size={18} color="rgb(239, 68, 68)" />
                                </button>
                              </div>
                            </div>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                              {/* Les sous-catégories s'afficheront ici une fois la table créée */}
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
          {categoriesTypes.length === 0 && !loadingCategories && (
            <div
              style={{
                textAlign: "center",
                padding: "40px",
                color: "hsl(220, 15%, 45%)",
                fontSize: "14px",
              }}
            >
              Aucun type de ticket. Ajoutez des types dans la section Types.
            </div>
          )}
        </div>
      )}

      {/* Modal Nouvelle catégorie */}
      {showAddCategoryModal && (
        <div
          onClick={() => setShowAddCategoryModal(false)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            padding: "20px",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "white",
              borderRadius: "12px",
              width: "100%",
              maxWidth: "480px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
              padding: "24px",
              position: "relative",
              maxHeight: "90vh",
              overflowY: "auto",
            }}
          >
            <button
              onClick={() => setShowAddCategoryModal(false)}
              style={{
                position: "absolute",
                top: "16px",
                right: "16px",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                padding: "4px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#111827",
              }}
            >
              <X size={20} />
            </button>
            <h2
              style={{
                marginBottom: "24px",
                fontSize: "18px",
                fontWeight: 600,
                color: "#111827",
                fontFamily: "system-ui, -apple-system, sans-serif",
              }}
            >
              Nouvelle catégorie
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    fontSize: "14px",
                    fontWeight: 500,
                    color: "#111827",
                    fontFamily: "system-ui, -apple-system, sans-serif",
                  }}
                >
                  Nom de la catégorie
                </label>
                <input
                  type="text"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  placeholder="ex: Périphériques"
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                    fontSize: "14px",
                    backgroundColor: "white",
                    color: "#111827",
                    fontFamily: "system-ui, -apple-system, sans-serif",
                    boxSizing: "border-box",
                  }}
                />
              </div>
              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    fontSize: "14px",
                    fontWeight: 500,
                    color: "#111827",
                    fontFamily: "system-ui, -apple-system, sans-serif",
                  }}
                >
                  Type de ticket
                </label>
                <select
                  value={newCategoryTypeCode}
                  onChange={(e) => setNewCategoryTypeCode(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                    fontSize: "14px",
                    backgroundColor: "white",
                    color: "#111827",
                    fontFamily: "system-ui, -apple-system, sans-serif",
                    boxSizing: "border-box",
                    cursor: "pointer",
                    appearance: "none",
                    backgroundImage:
                      'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'16\' height=\'16\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%23374151\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpolyline points=\'6 9 12 15 18 9\'%3E%3C/polyline%3E%3C/svg%3E")',
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right 12px center",
                    paddingRight: "40px",
                  }}
                >
                  {categoriesTypes.map((t) => (
                    <option key={t.id} value={t.code}>
                      {t.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <div
                  style={{
                    marginBottom: "8px",
                    fontSize: "14px",
                    fontWeight: 500,
                    color: "#111827",
                    fontFamily: "system-ui, -apple-system, sans-serif",
                  }}
                >
                  Sous-catégories
                </div>
                <div style={{ display: "flex", gap: "8px", marginBottom: "12px" }}>
                  <input
                    type="text"
                    placeholder="Ajouter une sous-catégorie"
                    disabled
                    style={{
                      flex: 1,
                      padding: "12px 16px",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                      fontSize: "14px",
                      backgroundColor: "#f9fafb",
                      color: "#6b7280",
                      fontFamily: "system-ui, -apple-system, sans-serif",
                      boxSizing: "border-box",
                    }}
                  />
                  <button
                    type="button"
                    style={{
                      padding: "12px 16px",
                      border: "1px solid #000",
                      borderRadius: "8px",
                      backgroundColor: "white",
                      color: "#000",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Plus size={20} color="#000" />
                  </button>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {/* Les sous-catégories s'afficheront ici une fois la table créée */}
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", marginTop: "24px" }}>
                <button
                  type="button"
                  onClick={() => setShowAddCategoryModal(false)}
                  style={{
                    padding: "10px 20px",
                    background: "white",
                    color: "#111827",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontSize: "14px",
                    fontWeight: 500,
                    fontFamily: "system-ui, -apple-system, sans-serif",
                  }}
                >
                  Annuler
                </button>
                <button
                  type="button"
                  onClick={handleAddCategory}
                  style={{
                    padding: "10px 20px",
                    background: "hsl(25, 95%, 53%)",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontSize: "14px",
                    fontWeight: 600,
                    fontFamily: "system-ui, -apple-system, sans-serif",
                  }}
                >
                  Ajouter
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Modifier la catégorie */}
      {showEditCategoryModal && editingCategory && (
        <div
          onClick={onCloseEditModal}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            padding: "20px",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "white",
              borderRadius: "12px",
              width: "100%",
              maxWidth: "480px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
              padding: "24px",
              position: "relative",
              maxHeight: "90vh",
              overflowY: "auto",
            }}
          >
            <button
              onClick={onCloseEditModal}
              style={{
                position: "absolute",
                top: "16px",
                right: "16px",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                padding: "4px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#111827",
              }}
            >
              <X size={20} />
            </button>
            <h2
              style={{
                marginBottom: "24px",
                fontSize: "18px",
                fontWeight: 600,
                color: "#111827",
                fontFamily: "system-ui, -apple-system, sans-serif",
              }}
            >
              Modifier la catégorie
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    fontSize: "14px",
                    fontWeight: 500,
                    color: "#111827",
                    fontFamily: "system-ui, -apple-system, sans-serif",
                  }}
                >
                  Nom de la catégorie
                </label>
                <input
                  type="text"
                  value={editCategoryName}
                  onChange={(e) => setEditCategoryName(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                    fontSize: "14px",
                    backgroundColor: "white",
                    color: "#111827",
                    fontFamily: "system-ui, -apple-system, sans-serif",
                    boxSizing: "border-box",
                  }}
                />
              </div>
              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    fontSize: "14px",
                    fontWeight: 500,
                    color: "#111827",
                    fontFamily: "system-ui, -apple-system, sans-serif",
                  }}
                >
                  Type de ticket
                </label>
                <select
                  value={editCategoryTypeCode}
                  onChange={(e) => setEditCategoryTypeCode(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                    fontSize: "14px",
                    backgroundColor: "white",
                    color: "#111827",
                    fontFamily: "system-ui, -apple-system, sans-serif",
                    boxSizing: "border-box",
                    cursor: "pointer",
                    appearance: "none",
                    backgroundImage:
                      'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'16\' height=\'16\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%23374151\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpolyline points=\'6 9 12 15 18 9\'%3E%3C/polyline%3E%3C/svg%3E")',
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right 12px center",
                    paddingRight: "40px",
                  }}
                >
                  {categoriesTypes.map((t) => (
                    <option key={t.id} value={t.code}>
                      {t.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <div
                  style={{
                    marginBottom: "8px",
                    fontSize: "14px",
                    fontWeight: 500,
                    color: "#111827",
                    fontFamily: "system-ui, -apple-system, sans-serif",
                  }}
                >
                  Sous-catégories
                </div>
                <div style={{ display: "flex", gap: "8px", marginBottom: "12px" }}>
                  <input
                    type="text"
                    placeholder="Ajouter une sous-catégorie"
                    disabled
                    style={{
                      flex: 1,
                      padding: "12px 16px",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                      fontSize: "14px",
                      backgroundColor: "#f9fafb",
                      color: "#6b7280",
                      fontFamily: "system-ui, -apple-system, sans-serif",
                      boxSizing: "border-box",
                    }}
                  />
                  <button
                    type="button"
                    style={{
                      padding: "12px 16px",
                      border: "1px solid #000",
                      borderRadius: "8px",
                      backgroundColor: "white",
                      color: "#000",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Plus size={20} color="#000" />
                  </button>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {/* Les sous-catégories s'afficheront ici une fois la table créée */}
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", marginTop: "24px" }}>
                <button
                  type="button"
                  onClick={onCloseEditModal}
                  style={{
                    padding: "10px 20px",
                    background: "white",
                    color: "#111827",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontSize: "14px",
                    fontWeight: 500,
                    fontFamily: "system-ui, -apple-system, sans-serif",
                  }}
                >
                  Annuler
                </button>
                <button
                  type="button"
                  onClick={handleUpdateCategory}
                  style={{
                    padding: "10px 20px",
                    background: "hsl(25, 95%, 53%)",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontSize: "14px",
                    fontWeight: 600,
                    fontFamily: "system-ui, -apple-system, sans-serif",
                  }}
                >
                  Modifier
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
