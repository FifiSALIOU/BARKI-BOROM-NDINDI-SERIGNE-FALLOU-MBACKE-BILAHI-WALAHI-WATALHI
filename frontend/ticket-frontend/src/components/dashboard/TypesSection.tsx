/**
 * Section Types de tickets du dashboard DSI/Admin.
 */

import { Plus, Wrench, Monitor, Pencil, Trash2, X } from "lucide-react";

export type TicketTypeItem = {
  id: number;
  code: string;
  label: string;
  is_active: boolean;
  type: string;
  description: string;
  color: string;
};

export type TypesSectionProps = {
  ticketTypes: TicketTypeItem[];
  loadingTypes: boolean;
  showAddTypeModal: boolean;
  setShowAddTypeModal: (v: boolean) => void;
  editingType: number | null;
  setEditingType: (v: number | null) => void;
  newType: { type: string; description: string; color: string; is_active: boolean };
  setNewType: (v: { type: string; description: string; color: string; is_active: boolean }) => void;
  onOpenAddModal: () => void;
  handleEditType: (typeId: number) => void;
  handleAddType: () => void;
  handleUpdateType: () => void;
  handleDeleteType: (typeId: number) => void;
  handleToggleActive: () => void;
};

export function TypesSection({
  ticketTypes,
  loadingTypes,
  showAddTypeModal,
  setShowAddTypeModal,
  editingType,
  setEditingType,
  newType,
  setNewType,
  onOpenAddModal,
  handleEditType,
  handleAddType,
  handleUpdateType,
  handleDeleteType,
  handleToggleActive,
}: TypesSectionProps) {
  const closeModal = () => {
    setShowAddTypeModal(false);
    setEditingType(null);
    setNewType({ type: "", description: "", color: "#007bff", is_active: true });
  };

  return (
    <div style={{ padding: "24px 24px 24px 0" }}>
      <div style={{ padding: "24px", background: "white", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0,0,0,0.06)" }}>
        <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", marginBottom: "24px" }}>
          <button
            onClick={onOpenAddModal}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "10px 20px",
              backgroundColor: "#FF6B00",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: 500,
              boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
            }}
          >
            <Plus size={18} />
            Nouveau type
          </button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(400px, 1fr))", gap: "20px" }}>
          {loadingTypes ? (
            <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "40px", color: "hsl(220, 15%, 45%)" }}>
              Chargement des types...
            </div>
          ) : ticketTypes.length === 0 ? (
            <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "40px", color: "hsl(220, 15%, 45%)" }}>
              Aucun type de ticket trouvé
            </div>
          ) : (
            ticketTypes.map((ticketType) => {
              const isMateriel =
                ticketType.code === "materiel" ||
                ticketType.label.toLowerCase().includes("matériel") ||
                ticketType.label.toLowerCase().includes("materiel");
              const isApplicatif =
                ticketType.code === "applicatif" ||
                ticketType.label.toLowerCase().includes("applicatif") ||
                ticketType.label.toLowerCase().includes("logiciel");
              const description = isMateriel
                ? "Problèmes liés aux équipements physiques (ordinateurs, imprimantes, etc.)"
                : isApplicatif
                  ? "Problèmes liés aux logiciels et applications"
                  : `Problèmes liés à ${ticketType.label.toLowerCase()}`;

              return (
                <div
                  key={ticketType.id}
                  style={{
                    background: "hsl(var(--card))",
                    borderRadius: "8px",
                    border: "1px solid hsl(var(--border))",
                    padding: "20px",
                    display: "flex",
                    gap: "16px",
                    transition: "all 0.2s ease",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.12)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.08)";
                  }}
                >
                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "50%",
                      background: isMateriel ? "rgba(255, 107, 0, 0.1)" : "hsl(210, 40%, 96%)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    {isMateriel ? (
                      <Wrench size={24} color="#FF6B00" />
                    ) : (
                      <Monitor size={24} color="hsl(220, 15%, 45%)" />
                    )}
                  </div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px", flexWrap: "wrap" }}>
                      <h3 style={{ fontSize: "16px", fontWeight: 600, color: "hsl(var(--foreground))", margin: 0 }}>
                        {ticketType.label}
                      </h3>
                      {ticketType.is_active && (
                        <span
                          style={{
                            padding: "4px 12px",
                            borderRadius: "9999px",
                            fontSize: "13px",
                            fontWeight: 500,
                            background: "rgba(34, 197, 94, 0.1)",
                            color: "rgb(34, 197, 94)",
                          }}
                        >
                          Actif
                        </span>
                      )}
                    </div>
                    <p
                      style={{
                        fontSize: "14px",
                        color: "hsl(var(--muted-foreground))",
                        margin: "0 0 8px 0",
                        lineHeight: "1.5",
                      }}
                    >
                      {description}
                    </p>
                    <p
                      style={{
                        fontSize: "12px",
                        color: "#FF6B00",
                        margin: 0,
                        fontFamily: "monospace",
                      }}
                    >
                      Code: {ticketType.code}
                    </p>
                  </div>

                  <div style={{ display: "flex", alignItems: "flex-start", gap: "8px", flexShrink: 0 }}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditType(ticketType.id);
                      }}
                      style={{
                        padding: "8px",
                        background: "transparent",
                        border: "none",
                        borderRadius: "6px",
                        cursor: "pointer",
                        color: "hsl(var(--muted-foreground))",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transition: "all 0.2s",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = "hsl(var(--foreground))";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = "hsl(var(--muted-foreground))";
                      }}
                      title="Modifier"
                    >
                      <Pencil size={20} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteType(ticketType.id);
                      }}
                      style={{
                        padding: "8px",
                        background: "transparent",
                        border: "none",
                        borderRadius: "6px",
                        cursor: "pointer",
                        color: "rgb(239, 68, 68)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transition: "all 0.2s",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = "rgba(239, 68, 68, 0.8)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = "rgb(239, 68, 68)";
                      }}
                      title="Supprimer"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {showAddTypeModal && (
          <div
            onClick={closeModal}
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
                borderRadius: "8px",
                width: "100%",
                maxWidth: "500px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
                padding: "24px",
                position: "relative",
                maxHeight: "90vh",
                overflowY: "auto",
              }}
            >
              <button
                onClick={closeModal}
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
                  fontSize: "20px",
                  fontWeight: "700",
                  color: "#111827",
                  fontFamily: "system-ui, -apple-system, sans-serif",
                }}
              >
                {editingType ? "Modifier le type" : "Ajouter un type"}
              </h2>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (editingType) {
                    handleUpdateType();
                  } else {
                    handleAddType();
                  }
                }}
                style={{ display: "flex", flexDirection: "column", gap: "16px" }}
              >
                <div>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "8px",
                      fontSize: "14px",
                      fontWeight: "400",
                      color: "#111827",
                      fontFamily: "system-ui, -apple-system, sans-serif",
                    }}
                  >
                    Nom du type <span style={{ color: "#dc3545" }}>*</span>
                  </label>
                  <input
                    type="text"
                    value={newType.type}
                    onChange={(e) => setNewType({ ...newType, type: e.target.value })}
                    placeholder="Ex: Matériel"
                    required
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                      fontSize: "16px",
                      backgroundColor: "white",
                      color: "#111827",
                      height: "40px",
                      boxSizing: "border-box",
                      fontFamily: "system-ui, -apple-system, sans-serif",
                      fontWeight: "400",
                    }}
                  />
                </div>

                <div>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "8px",
                      fontSize: "14px",
                      fontWeight: "400",
                      color: "#111827",
                      fontFamily: "system-ui, -apple-system, sans-serif",
                    }}
                  >
                    Code (identifiant technique)
                  </label>
                  <input
                    type="text"
                    value={
                      editingType
                        ? ticketTypes.find((t) => t.id === editingType)?.code || ""
                        : newType.type
                          ? newType.type.toLowerCase().replace(/\s+/g, "-")
                          : ""
                    }
                    readOnly
                    placeholder="Généré automatiquement"
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                      fontSize: "16px",
                      fontFamily: "monospace",
                      backgroundColor: "#f3f4f6",
                      color: "#6b7280",
                      cursor: "not-allowed",
                      height: "40px",
                      boxSizing: "border-box",
                      fontWeight: "400",
                    }}
                  />
                </div>

                <div>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "8px",
                      fontSize: "14px",
                      fontWeight: "400",
                      color: "#111827",
                      fontFamily: "system-ui, -apple-system, sans-serif",
                    }}
                  >
                    Description
                  </label>
                  <textarea
                    value={newType.description}
                    onChange={(e) => setNewType({ ...newType, description: e.target.value })}
                    placeholder="Ex: Problèmes liés aux équipements physiques (ordinateurs, imprimantes, etc.)"
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                      fontSize: "14px",
                      minHeight: "80px",
                      height: "100px",
                      backgroundColor: "white",
                      color: "#111827",
                      resize: "vertical",
                      boxSizing: "border-box",
                      fontFamily: "system-ui, -apple-system, sans-serif",
                      fontWeight: "400",
                    }}
                  />
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <label
                    style={{
                      fontSize: "14px",
                      fontWeight: "400",
                      color: "#111827",
                      margin: 0,
                      fontFamily: "system-ui, -apple-system, sans-serif",
                    }}
                  >
                    Actif
                  </label>
                  <div
                    onClick={handleToggleActive}
                    style={{
                      width: "44px",
                      height: "24px",
                      borderRadius: "12px",
                      background: newType.is_active ? "#22c55e" : "#1E3A5F",
                      position: "relative",
                      cursor: "pointer",
                      transition: "all 0.2s",
                      flexShrink: 0,
                    }}
                  >
                    <div
                      style={{
                        width: "20px",
                        height: "20px",
                        borderRadius: "50%",
                        background: "white",
                        position: "absolute",
                        top: "2px",
                        right: newType.is_active ? "2px" : "22px",
                        transition: "all 0.2s",
                        boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
                      }}
                    />
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    gap: "12px",
                    marginTop: "24px",
                  }}
                >
                  <button
                    type="button"
                    onClick={closeModal}
                    style={{
                      padding: "10px 20px",
                      background: "white",
                      color: "#111827",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                      cursor: "pointer",
                      fontSize: "14px",
                      fontWeight: "400",
                      height: "40px",
                      boxSizing: "border-box",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: "system-ui, -apple-system, sans-serif",
                    }}
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    style={{
                      padding: "10px 20px",
                      background: "#F58220",
                      color: "white",
                      border: "none",
                      borderRadius: "8px",
                      cursor: "pointer",
                      fontSize: "14px",
                      fontWeight: "700",
                      height: "40px",
                      boxSizing: "border-box",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: "system-ui, -apple-system, sans-serif",
                    }}
                  >
                    {editingType ? "Modifier" : "Ajouter"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
