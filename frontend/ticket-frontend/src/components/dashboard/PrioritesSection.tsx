/**
 * Section Priorités du dashboard DSI/Admin.
 */

import React from "react";

export type PrioritiesFromDb = {
  id: number;
  code: string;
  label: string;
  color_hex: string | null;
  background_hex: string | null;
  display_order: number;
  is_active: boolean;
};

type AddPriorityForm = { code: string; label: string; color_hex: string; background_hex: string; display_order: number };
type EditPriorityForm = { label: string; color_hex: string; background_hex: string };

export type PrioritesSectionProps = {
  token: string;
  prioritiesFromDb: PrioritiesFromDb[];
  loadingPrioritiesFromDb: boolean;
  loadPrioritiesFromDb: () => void;
  addPriorityForm: AddPriorityForm;
  setAddPriorityForm: React.Dispatch<React.SetStateAction<AddPriorityForm>>;
  showAddPriorityFromDbModal: boolean;
  setShowAddPriorityFromDbModal: (v: boolean) => void;
  editingPriorityFromDb: PrioritiesFromDb | null;
  setEditingPriorityFromDb: (v: PrioritiesFromDb | null) => void;
  editPriorityForm: EditPriorityForm;
  setEditPriorityForm: React.Dispatch<React.SetStateAction<EditPriorityForm>>;
  showAddPriorityModal: boolean;
  setShowAddPriorityModal: (v: boolean) => void;
  editingPriority: any;
  setEditingPriority: (v: any) => void;
  newPriority: any;
  setNewPriority: (v: any) => void;
  handleAddPriority: () => void;
  handleUpdatePriority: () => void;
};

export function PrioritesSection(props: PrioritesSectionProps) {
  const {
    token,
    prioritiesFromDb,
    loadingPrioritiesFromDb,
    loadPrioritiesFromDb,
    addPriorityForm,
    setAddPriorityForm,
    showAddPriorityFromDbModal,
    setShowAddPriorityFromDbModal,
    editingPriorityFromDb,
    setEditingPriorityFromDb,
    editPriorityForm,
    setEditPriorityForm,
    showAddPriorityModal,
    setShowAddPriorityModal,
    editingPriority,
    setEditingPriority,
    newPriority,
    setNewPriority,
    handleAddPriority,
    handleUpdatePriority,
  } = props;
  return (
    <div style={{ padding: "24px 24px 24px 0" }}>
         <div style={{ marginBottom: "20px", display: "flex", justifyContent: "flex-end" }}>
           <button
             type="button"
             onClick={() => {
               setAddPriorityForm({
                 code: "",
                 label: "",
                 color_hex: "#E53E3E",
                 background_hex: "rgba(229, 62, 62, 0.1)",
                 display_order: Math.max(1, ...prioritiesFromDb.map((x) => x.display_order), 0) + 1,
               });
               setShowAddPriorityFromDbModal(true);
             }}
             style={{
               padding: "10px 20px",
               backgroundColor: "hsl(25, 95%, 53%)",
               color: "white",
               border: "1px solid hsl(25, 95%, 45%)",
               borderRadius: "6px",
               cursor: "pointer",
               fontSize: "14px",
               fontWeight: "500",
             }}
           >
             + Ajouter une priorité
           </button>
         </div>
    
         {/* Tableau des priorités (design: Nom, Libellé, Couleur, SLA, Actif) */}
         <div style={{
           background: "white",
           borderRadius: "8px",
           boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
           overflow: "hidden",
           border: "1px solid #e5e7eb"
         }}>
           {loadingPrioritiesFromDb ? (
             <div style={{ padding: "40px", textAlign: "center", color: "#6b7280", fontSize: "14px" }}>
               Chargement des priorités...
             </div>
           ) : (
             <table style={{ width: "100%", borderCollapse: "collapse" }}>
               <thead>
                 <tr style={{ background: "#f9fafb", borderBottom: "1px solid #e5e7eb" }}>
                   <th style={{ width: "44px", padding: "12px 8px", textAlign: "center", fontWeight: "600", color: "#6b7280", fontSize: "13px" }}></th>
                   <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: "600", color: "#6b7280", fontSize: "13px" }}>Nom</th>
                   <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: "600", color: "#6b7280", fontSize: "13px" }}>Libellé</th>
                   <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: "600", color: "#6b7280", fontSize: "13px" }}>Couleur</th>
                   <th style={{ padding: "12px 16px", textAlign: "center", fontWeight: "600", color: "#6b7280", fontSize: "13px" }}>Actif</th>
                   <th style={{ padding: "12px 16px", textAlign: "center", fontWeight: "600", color: "#6b7280", fontSize: "13px" }}>Actions</th>
                 </tr>
               </thead>
               <tbody>
                 {prioritiesFromDb.map((p) => {
                   const bgHex = p.background_hex || p.color_hex || "#f3f4f6";
                   const textHex = p.color_hex || "#374151";
                   return (
                     <tr key={p.id} style={{ borderBottom: "1px solid #e5e7eb" }}>
                       <td style={{ padding: "12px 8px", textAlign: "center", verticalAlign: "middle" }}>
                         <span style={{ color: "#9ca3af", cursor: "default", display: "inline-flex" }} aria-hidden>
                           <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="6" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="12" cy="18" r="1.5"/></svg>
                         </span>
                       </td>
                       <td style={{ padding: "12px 16px" }}>
                         <span style={{
                           display: "inline-block",
                           padding: "4px 10px",
                           borderRadius: "9999px",
                           background: "#f3f4f6",
                           color: "#6b7280",
                           fontSize: "13px",
                           fontWeight: "500"
                         }}>
                           {p.code}
                         </span>
                       </td>
                       <td style={{ padding: "12px 16px", fontWeight: "600", color: "#111827" }}>{p.label}</td>
                       <td style={{ padding: "12px 16px" }}>
                         <span style={{
                           display: "inline-block",
                           padding: "6px 12px",
                           borderRadius: "6px",
                           background: bgHex,
                           color: textHex,
                           fontSize: "13px",
                           fontWeight: "600"
                         }}>
                           {p.label}
                         </span>
                       </td>
                       <td style={{ padding: "12px 16px", textAlign: "center", verticalAlign: "middle" }}>
                         <button
                           type="button"
                           role="switch"
                           aria-checked={p.is_active}
                           onClick={async () => {
                             const res = await fetch(`http://localhost:8000/ticket-config/priorities/${p.id}`, {
                               method: "PATCH",
                               headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
                               body: JSON.stringify({ is_active: !p.is_active }),
                             });
                             if (res.ok) loadPrioritiesFromDb();
                           }}
                           style={{
                             width: "44px",
                             height: "24px",
                             borderRadius: "12px",
                             border: "none",
                             background: p.is_active ? "hsl(142, 71%, 45%)" : "#d1d5db",
                             cursor: "pointer",
                             position: "relative",
                             transition: "background 0.2s"
                           }}
                         >
                           <span style={{
                             position: "absolute",
                             top: "2px",
                             left: p.is_active ? "22px" : "2px",
                             width: "20px",
                             height: "20px",
                             borderRadius: "50%",
                             background: "white",
                             boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
                             transition: "left 0.2s"
                           }} />
                         </button>
                       </td>
                       <td style={{ padding: "12px 16px", textAlign: "center", verticalAlign: "middle" }}>
                         <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                           <button
                             type="button"
                             onClick={() => {
                               setEditingPriorityFromDb(p);
                               setEditPriorityForm({
                                 label: p.label,
                                 color_hex: p.color_hex || "",
                                 background_hex: p.background_hex || "",
                               });
                             }}
                             style={{
                               padding: "6px 12px",
                               fontSize: "13px",
                               fontWeight: "500",
                               color: "#2563eb",
                               background: "#eff6ff",
                               border: "1px solid #bfdbfe",
                               borderRadius: "6px",
                               cursor: "pointer"
                             }}
                           >
                             Modifier
                           </button>
                           <button
                             type="button"
                             onClick={async () => {
                               if (!window.confirm("Supprimer définitivement cette priorité de la base de données ?")) return;
                               try {
                                 const res = await fetch(`http://localhost:8000/ticket-config/priorities/${p.id}`, {
                                   method: "DELETE",
                                   headers: { Authorization: `Bearer ${token}` },
                                 });
                                 if (res.ok || res.status === 204) {
                                   loadPrioritiesFromDb();
                                 } else {
                                   const err = await res.json().catch(() => ({}));
                                   alert(err.detail || "Erreur lors de la suppression.");
                                 }
                               } catch (e) {
                                 alert("Erreur réseau lors de la suppression.");
                               }
                             }}
                             style={{
                               padding: "6px 12px",
                               fontSize: "13px",
                               fontWeight: "500",
                               color: "#dc2626",
                               background: "#fef2f2",
                               border: "1px solid #fecaca",
                               borderRadius: "6px",
                               cursor: "pointer"
                             }}
                           >
                             Supprimer
                           </button>
                         </div>
                       </td>
                     </tr>
                   );
                 })}
               </tbody>
             </table>
           )}
           {!loadingPrioritiesFromDb && prioritiesFromDb.length === 0 && (
             <div style={{ padding: "32px", textAlign: "center", color: "#6b7280", fontSize: "14px" }}>
               Aucune priorité configurée en base.
             </div>
           )}
         </div>
    
         {/* Modal Modifier priorité (API) */}
         {editingPriorityFromDb && (
           <div
             style={{
               position: "fixed",
               top: 0,
               left: 0,
               right: 0,
               bottom: 0,
               background: "rgba(0,0,0,0.5)",
               display: "flex",
               alignItems: "center",
               justifyContent: "center",
               zIndex: 1000,
               padding: "20px",
             }}
             onClick={() => setEditingPriorityFromDb(null)}
           >
             <div
               onClick={(e) => e.stopPropagation()}
               style={{
                 background: "white",
                 borderRadius: "12px",
                 width: "100%",
                 maxWidth: "440px",
                 boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
                 padding: "24px",
               }}
             >
               <h2 style={{ marginBottom: "20px", fontSize: "20px", fontWeight: "600", color: "#333" }}>
                 Modifier la priorité
               </h2>
               <div style={{ marginBottom: "16px" }}>
                 <label style={{ display: "block", marginBottom: "6px", color: "#374151", fontWeight: "500", fontSize: "14px" }}>Libellé</label>
                 <input
                   type="text"
                   value={editPriorityForm.label}
                   onChange={(e) => setEditPriorityForm((f) => ({ ...f, label: e.target.value }))}
                   style={{
                     width: "100%",
                     padding: "10px 12px",
                     border: "1px solid #d1d5db",
                     borderRadius: "6px",
                     fontSize: "14px",
                     boxSizing: "border-box",
                   }}
                 />
               </div>
               <div style={{ marginBottom: "16px" }}>
                 <label style={{ display: "block", marginBottom: "6px", color: "#374151", fontWeight: "500", fontSize: "14px" }}>Couleur (hex)</label>
                 <input
                   type="text"
                   value={editPriorityForm.color_hex}
                   onChange={(e) => setEditPriorityForm((f) => ({ ...f, color_hex: e.target.value }))}
                   placeholder="#E53E3E"
                   style={{
                     width: "100%",
                     padding: "10px 12px",
                     border: "1px solid #d1d5db",
                     borderRadius: "6px",
                     fontSize: "14px",
                     boxSizing: "border-box",
                   }}
                 />
               </div>
               <div style={{ marginBottom: "20px" }}>
                 <label style={{ display: "block", marginBottom: "6px", color: "#374151", fontWeight: "500", fontSize: "14px" }}>Fond (hex ou rgba)</label>
                 <input
                   type="text"
                   value={editPriorityForm.background_hex}
                   onChange={(e) => setEditPriorityForm((f) => ({ ...f, background_hex: e.target.value }))}
                   placeholder="rgba(229, 62, 62, 0.1)"
                   style={{
                     width: "100%",
                     padding: "10px 12px",
                     border: "1px solid #d1d5db",
                     borderRadius: "6px",
                     fontSize: "14px",
                     boxSizing: "border-box",
                   }}
                 />
               </div>
               <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
                 <button
                   type="button"
                   onClick={() => setEditingPriorityFromDb(null)}
                   style={{
                     padding: "10px 18px",
                     fontSize: "14px",
                     color: "#6b7280",
                     background: "#f3f4f6",
                     border: "1px solid #e5e7eb",
                     borderRadius: "6px",
                     cursor: "pointer",
                   }}
                 >
                   Annuler
                 </button>
                 <button
                   type="button"
                   onClick={async () => {
                     const res = await fetch(`http://localhost:8000/ticket-config/priorities/${editingPriorityFromDb.id}`, {
                       method: "PATCH",
                       headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
                       body: JSON.stringify({
                         label: editPriorityForm.label.trim(),
                         color_hex: editPriorityForm.color_hex.trim() || null,
                         background_hex: editPriorityForm.background_hex.trim() || null,
                       }),
                     });
                     if (res.ok) {
                       setEditingPriorityFromDb(null);
                       loadPrioritiesFromDb();
                     }
                   }}
                   style={{
                     padding: "10px 18px",
                     fontSize: "14px",
                     fontWeight: "500",
                     color: "white",
                     background: "hsl(25, 95%, 53%)",
                     border: "none",
                     borderRadius: "6px",
                     cursor: "pointer",
                   }}
                 >
                   Enregistrer
                 </button>
               </div>
             </div>
           </div>
         )}
    
         {/* Modal Ajouter une priorité (API) */}
         {showAddPriorityFromDbModal && (
           <div
             style={{
               position: "fixed",
               top: 0,
               left: 0,
               right: 0,
               bottom: 0,
               background: "rgba(0,0,0,0.5)",
               display: "flex",
               alignItems: "center",
               justifyContent: "center",
               zIndex: 1000,
               padding: "20px",
             }}
             onClick={() => setShowAddPriorityFromDbModal(false)}
           >
             <div
               onClick={(e) => e.stopPropagation()}
               style={{
                 background: "white",
                 borderRadius: "12px",
                 width: "100%",
                 maxWidth: "440px",
                 boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
                 padding: "24px",
               }}
             >
               <h2 style={{ marginBottom: "20px", fontSize: "20px", fontWeight: "600", color: "#333" }}>
                 Ajouter une priorité
               </h2>
               <div style={{ marginBottom: "16px" }}>
                 <label style={{ display: "block", marginBottom: "6px", color: "#374151", fontWeight: "500", fontSize: "14px" }}>Code (ex: critique, haute)</label>
                 <input
                   type="text"
                   value={addPriorityForm.code}
                   onChange={(e) => setAddPriorityForm((f) => ({ ...f, code: e.target.value }))}
                   placeholder="ex: urgente"
                   style={{
                     width: "100%",
                     padding: "10px 12px",
                     border: "1px solid #d1d5db",
                     borderRadius: "6px",
                     fontSize: "14px",
                     boxSizing: "border-box",
                   }}
                 />
               </div>
               <div style={{ marginBottom: "16px" }}>
                 <label style={{ display: "block", marginBottom: "6px", color: "#374151", fontWeight: "500", fontSize: "14px" }}>Libellé</label>
                 <input
                   type="text"
                   value={addPriorityForm.label}
                   onChange={(e) => setAddPriorityForm((f) => ({ ...f, label: e.target.value }))}
                   placeholder="ex: Urgente"
                   style={{
                     width: "100%",
                     padding: "10px 12px",
                     border: "1px solid #d1d5db",
                     borderRadius: "6px",
                     fontSize: "14px",
                     boxSizing: "border-box",
                   }}
                 />
               </div>
               <div style={{ marginBottom: "16px" }}>
                 <label style={{ display: "block", marginBottom: "6px", color: "#374151", fontWeight: "500", fontSize: "14px" }}>Couleur (hex)</label>
                 <input
                   type="text"
                   value={addPriorityForm.color_hex}
                   onChange={(e) => setAddPriorityForm((f) => ({ ...f, color_hex: e.target.value }))}
                   placeholder="#E53E3E"
                   style={{
                     width: "100%",
                     padding: "10px 12px",
                     border: "1px solid #d1d5db",
                     borderRadius: "6px",
                     fontSize: "14px",
                     boxSizing: "border-box",
                   }}
                 />
               </div>
               <div style={{ marginBottom: "16px" }}>
                 <label style={{ display: "block", marginBottom: "6px", color: "#374151", fontWeight: "500", fontSize: "14px" }}>Fond (hex ou rgba)</label>
                 <input
                   type="text"
                   value={addPriorityForm.background_hex}
                   onChange={(e) => setAddPriorityForm((f) => ({ ...f, background_hex: e.target.value }))}
                   placeholder="rgba(229, 62, 62, 0.1)"
                   style={{
                     width: "100%",
                     padding: "10px 12px",
                     border: "1px solid #d1d5db",
                     borderRadius: "6px",
                     fontSize: "14px",
                     boxSizing: "border-box",
                   }}
                 />
               </div>
               <div style={{ marginBottom: "20px" }}>
                 <label style={{ display: "block", marginBottom: "6px", color: "#374151", fontWeight: "500", fontSize: "14px" }}>Ordre d'affichage</label>
                 <input
                   type="number"
                   min={1}
                   value={addPriorityForm.display_order}
                   onChange={(e) => setAddPriorityForm((f) => ({ ...f, display_order: parseInt(e.target.value, 10) || 1 }))}
                   style={{
                     width: "100%",
                     padding: "10px 12px",
                     border: "1px solid #d1d5db",
                     borderRadius: "6px",
                     fontSize: "14px",
                     boxSizing: "border-box",
                   }}
                 />
               </div>
               <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
                 <button
                   type="button"
                   onClick={() => setShowAddPriorityFromDbModal(false)}
                   style={{
                     padding: "10px 18px",
                     fontSize: "14px",
                     color: "#6b7280",
                     background: "#f3f4f6",
                     border: "1px solid #e5e7eb",
                     borderRadius: "6px",
                     cursor: "pointer",
                   }}
                 >
                   Annuler
                 </button>
                 <button
                   type="button"
                   onClick={async () => {
                     const code = addPriorityForm.code.trim().toLowerCase().replace(/\s+/g, "_");
                     if (!code || !addPriorityForm.label.trim()) {
                       alert("Veuillez remplir le code et le libellé.");
                       return;
                     }
                     const res = await fetch("http://localhost:8000/ticket-config/priorities", {
                       method: "POST",
                       headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
                       body: JSON.stringify({
                         code,
                         label: addPriorityForm.label.trim(),
                         color_hex: addPriorityForm.color_hex.trim() || null,
                         background_hex: addPriorityForm.background_hex.trim() || null,
                         display_order: addPriorityForm.display_order,
                         is_active: true,
                       }),
                     });
                     if (res.ok) {
                       setShowAddPriorityFromDbModal(false);
                       loadPrioritiesFromDb();
                     } else {
                       const err = await res.json().catch(() => ({}));
                       alert(err.detail || "Erreur lors de l'ajout.");
                     }
                   }}
                   style={{
                     padding: "10px 18px",
                     fontSize: "14px",
                     fontWeight: "500",
                     color: "white",
                     background: "hsl(25, 95%, 53%)",
                     border: "none",
                     borderRadius: "6px",
                     cursor: "pointer",
                   }}
                 >
                   Ajouter
                 </button>
               </div>
             </div>
           </div>
         )}
    
         {/* Modal Ajouter/Modifier une priorité (conservé pour le reste de l'app) */}
         {showAddPriorityModal && (
           <div 
             onClick={() => {
               setShowAddPriorityModal(false);
               setEditingPriority(null);
               setNewPriority({ priority: "", level: 1, color: "#dc3545", maxTimeValue: 1, maxTimeUnit: "heure" });
             }}
             style={{
               position: "fixed",
               top: 0,
               left: 0,
               right: 0,
               bottom: 0,
               background: "rgba(0,0,0,0.5)",
               display: "flex",
               alignItems: "center",
               justifyContent: "center",
               zIndex: 1000,
               padding: "20px"
             }}
           >
             <div 
               onClick={(e) => e.stopPropagation()}
               style={{
                 background: "white",
                 borderRadius: "12px",
                 width: "100%",
                 maxWidth: "500px",
                 boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
                 padding: "24px"
               }}
             >
               <h2 style={{ marginBottom: "24px", fontSize: "24px", fontWeight: "600", color: "#333" }}>
                 {editingPriority ? "Modifier la priorité" : "Ajouter une priorité"}
               </h2>
               
               <div style={{ marginBottom: "16px" }}>
                 <label style={{ display: "block", marginBottom: "8px", color: "#333", fontWeight: "500" }}>
                   Priorité <span style={{ color: "#dc3545" }}>*</span>
                 </label>
                 <input
                   type="text"
                   value={newPriority.priority}
                   onChange={(e) => setNewPriority({ ...newPriority, priority: e.target.value })}
                   placeholder="Ex: Critique"
                   style={{
                     width: "100%",
                     padding: "10px 12px",
                     border: "1px solid #ddd",
                     borderRadius: "4px",
                     fontSize: "14px"
                   }}
                 />
               </div>
    
               <div style={{ marginBottom: "16px" }}>
                 <label style={{ display: "block", marginBottom: "8px", color: "#333", fontWeight: "500" }}>
                   Niveau <span style={{ color: "#dc3545" }}>*</span>
                 </label>
                 <input
                   type="number"
                   min="1"
                   value={newPriority.level}
                   onChange={(e) => setNewPriority({ ...newPriority, level: parseInt(e.target.value) || 1 })}
                   style={{
                     width: "100%",
                     padding: "10px 12px",
                     border: "1px solid #ddd",
                     borderRadius: "4px",
                     fontSize: "14px"
                   }}
                 />
               </div>
    
               <div style={{ marginBottom: "16px" }}>
                 <label style={{ display: "block", marginBottom: "8px", color: "#333", fontWeight: "500" }}>
                   Couleur
                 </label>
                 <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                   <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                     <div style={{
                       width: "30px",
                       height: "30px",
                       borderRadius: "50%",
                       backgroundColor: newPriority.color,
                       border: "1px solid #ddd"
                     }}></div>
                     <input
                       type="color"
                       value={newPriority.color}
                       onChange={(e) => setNewPriority({ ...newPriority, color: e.target.value })}
                       style={{
                         width: "50px",
                         height: "40px",
                         border: "1px solid #ddd",
                         borderRadius: "4px",
                         cursor: "pointer"
                       }}
                     />
                   </div>
                   <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                     {["#dc3545", "#ff9800", "#ffc107", "#28a745", "#007bff", "#6c757d", "#9c27b0"].map((color) => (
                       <div
                         key={color}
                         onClick={() => setNewPriority({ ...newPriority, color })}
                         style={{
                           width: "30px",
                           height: "30px",
                           borderRadius: "50%",
                           backgroundColor: color,
                           border: newPriority.color === color ? "3px solid #333" : "1px solid #ddd",
                           cursor: "pointer"
                         }}
                       />
                     ))}
                   </div>
                 </div>
               </div>
    
               <div style={{ marginBottom: "24px" }}>
                 <label style={{ display: "block", marginBottom: "8px", color: "#333", fontWeight: "500" }}>
                   Temps Max <span style={{ color: "#dc3545" }}>*</span>
                 </label>
                 <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                   <input
                     type="number"
                     min="1"
                     value={newPriority.maxTimeValue}
                     onChange={(e) => setNewPriority({ ...newPriority, maxTimeValue: parseInt(e.target.value) || 1 })}
                     style={{
                       width: "100px",
                       padding: "10px 12px",
                       border: "1px solid #ddd",
                       borderRadius: "4px",
                       fontSize: "14px"
                     }}
                   />
                   <select
                     value={newPriority.maxTimeUnit}
                     onChange={(e) => setNewPriority({ ...newPriority, maxTimeUnit: e.target.value })}
                     style={{
                       padding: "10px 12px",
                       border: "1px solid #ddd",
                       borderRadius: "4px",
                       fontSize: "14px"
                     }}
                   >
                     <option value="heure">heure</option>
                     <option value="heures">heures</option>
                     <option value="jour">jour</option>
                     <option value="jours">jours</option>
                   </select>
                 </div>
               </div>
    
               <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px" }}>
                 <button
                   onClick={() => {
                     setShowAddPriorityModal(false);
                     setEditingPriority(null);
                     setNewPriority({ priority: "", level: 1, color: "#dc3545", maxTimeValue: 1, maxTimeUnit: "heure" });
                   }}
                   style={{
                     padding: "10px 20px",
                     backgroundColor: "#6c757d",
                     color: "white",
                     border: "none",
                     borderRadius: "4px",
                     cursor: "pointer",
                     fontSize: "14px"
                   }}
                 >
                   Annuler
                 </button>
                 <button
                   onClick={editingPriority ? handleUpdatePriority : handleAddPriority}
                   style={{
                     padding: "10px 20px",
                     backgroundColor: "#28a745",
                     color: "white",
                     border: "none",
                     borderRadius: "4px",
                     cursor: "pointer",
                     fontSize: "14px"
                   }}
                 >
                   {editingPriority ? "Modifier" : "Ajouter"}
                 </button>
               </div>
             </div>
           </div>
         )}
       </div>
  );
}
