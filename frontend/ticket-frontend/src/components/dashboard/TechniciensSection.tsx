/**
 * Section Techniciens du dashboard DSI/Admin.
 */

import { Users, Wrench, Briefcase, Clock, CheckCircle2, AlertTriangle } from "lucide-react";

export type TechniciensSectionProps = {
  token: string;
  allUsers: any[];
  technicians: any[];
  setTechnicians: (v: any[]) => void;
  showDeleteConfirmModal: boolean;
  setShowDeleteConfirmModal: (v: boolean) => void;
  technicianToDelete: any | null;
  setTechnicianToDelete: (v: any | null) => void;
  selectedTechnicianDetails: any | null;
  setSelectedTechnicianDetails: (v: any | null) => void;
  showTechnicianDetailsModal: boolean;
  setShowTechnicianDetailsModal: (v: boolean) => void;
  showCreateTechnicianModal: boolean;
  setShowCreateTechnicianModal: (v: boolean) => void;
  showEditTechnicianModal: boolean;
  setShowEditTechnicianModal: (v: boolean) => void;
  editingTechnician: any | null;
  setEditingTechnician: (v: any | null) => void;
  loading: boolean;
  setLoading: (v: boolean) => void;
};

export function TechniciensSection(props: TechniciensSectionProps) {
  const {
    token,
    allUsers,
    technicians,
    setTechnicians,
    showDeleteConfirmModal,
    setShowDeleteConfirmModal,
    technicianToDelete,
    setTechnicianToDelete,
    selectedTechnicianDetails,
    setSelectedTechnicianDetails,
    showTechnicianDetailsModal,
    setShowTechnicianDetailsModal,
    showCreateTechnicianModal,
    setShowCreateTechnicianModal,
    showEditTechnicianModal,
    setShowEditTechnicianModal,
    editingTechnician,
    setEditingTechnician,
    loading,
    setLoading,
  } = props;
  return (
    <div style={{ padding: "24px" }}>
        {/* Deux panneaux côte à côte */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
          {/* Panneau gauche : Membres de l'équipe DSI */}
          <div style={{
            background: "hsl(0, 0%, 100%)",
            borderRadius: "8px",
            border: "1px solid hsla(220, 20%, 92%, 0.5)",
            padding: "16px",
            display: "flex",
            flexDirection: "column",
            height: "fit-content"
          }}>
            {/* Header */}
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              paddingBottom: "12px",
              borderBottom: "1px solid hsla(220, 20%, 92%, 0.5)"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Users size={20} color="hsl(25, 95%, 53%)" />
                <h3 style={{
                  fontSize: "16px",
                  fontWeight: 500,
                  color: "#111827",
                  margin: 0,
                  fontFamily: "'Inter', system-ui, sans-serif"
                }}>
                  Membres de l'équipe DSI
                </h3>
              </div>
              {(() => {
                // Récupérer les membres DSI et Adjoint DSI depuis allUsers
                const dsiAndAdjointMembers = allUsers.filter((user: any) => 
                  user.role?.name === "DSI" || 
                  user.role?.name === "Adjoint DSI"
                );
                
                // Compter tous les membres (DSI + Adjoint DSI + Techniciens)
                const totalMembers = dsiAndAdjointMembers.length + technicians.length;
                
                return (
                  <div style={{
                    width: "24px",
                    height: "24px",
                    borderRadius: "50%",
                    background: "hsl(25, 95%, 53%)",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "12px",
                    fontWeight: 600,
                    marginLeft: "auto"
                  }}>
                    {totalMembers}
                  </div>
                );
              })()}
            </div>
    
            {/* Liste des membres */}
            <div style={{ display: "flex", flexDirection: "column", gap: "4px", marginTop: "12px" }}>
              {(() => {
                // Récupérer les membres DSI et Adjoint DSI depuis allUsers
                const dsiAndAdjointMembers = allUsers.filter((user: any) => 
                  user.role?.name === "DSI" || 
                  user.role?.name === "Adjoint DSI"
                );
                
                // Récupérer tous les techniciens depuis la liste technicians
                // et les convertir au format attendu avec le rôle "Support Technique"
                const technicianMembers = technicians.map((tech: any) => ({
                  ...tech,
                  role: { name: "Support Technique" }
                }));
                
                // Combiner les deux listes
                const allTeamMembers = [...dsiAndAdjointMembers, ...technicianMembers];
                
                if (allTeamMembers.length === 0) {
                  return (
                    <div style={{ padding: "20px", textAlign: "center", color: "hsl(220, 15%, 45%)" }}>
                      Aucun membre trouvé
                    </div>
                  );
                }
    
                return allTeamMembers.map((member: any) => {
                  const initials = member.full_name
                    ?.split(" ")
                    .map((n: string) => n[0])
                    .join("")
                    .toUpperCase()
                    .substring(0, 2) || "??";
                  
                  const roleName = member.role?.name || "";
                  const isTechnician = roleName === "Support Technique";
                  
                  return (
                    <div
                      key={member.id}
                      style={{
                        padding: "12px",
                        borderRadius: "8px",
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        cursor: "pointer",
                        transition: "all 200ms",
                        border: "1px solid transparent"
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = "hsla(220, 20%, 92%, 0.5)";
                        e.currentTarget.style.background = "hsla(220, 20%, 92%, 0.5)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = "transparent";
                        e.currentTarget.style.background = "transparent";
                      }}
                    >
                      {/* Avatar */}
                      <div style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        background: "hsla(25, 95%, 53%, 0.1)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "hsl(25, 95%, 53%)",
                        fontSize: "14px",
                        fontWeight: 600,
                        flexShrink: 0
                      }}>
                        {initials}
                      </div>
                      
                      {/* Infos */}
                      <div style={{ flex: 1, minWidth: 0, display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px" }}>
                        <div style={{ display: "flex", flexDirection: "column", gap: "4px", flex: 1, minWidth: 0 }}>
                          <div style={{
                            fontSize: "14px",
                            fontWeight: 500,
                            color: "#111827"
                          }}>
                            {member.full_name}
                          </div>
                          {(roleName === "DSI" || roleName === "Adjoint DSI" || roleName === "Support Technique") && (
                            <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                              <Briefcase size={12} color="#6B7280" />
                              <span style={{
                                fontSize: "12px",
                                color: "#6B7280"
                              }}>
                                {roleName === "Adjoint DSI" ? "DSI" : roleName}
                              </span>
                            </div>
                          )}
                        </div>
                        <div style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
                          {roleName === "DSI" && (
                            <span style={{
                              padding: "2px 8px",
                              borderRadius: "4px",
                              fontSize: "12px",
                              fontWeight: 500,
                              background: "hsla(25, 95%, 53%, 0.1)",
                              color: "hsl(25, 95%, 53%)",
                              border: "none"
                            }}>
                              DSI
                            </span>
                          )}
                          {roleName === "Adjoint DSI" && (
                            <span style={{
                              padding: "2px 8px",
                              borderRadius: "4px",
                              fontSize: "12px",
                              fontWeight: 500,
                              background: "hsla(220, 60%, 15%, 0.1)",
                              color: "hsl(220, 60%, 15%)",
                              border: "none"
                            }}>
                              Adjoint DSI
                            </span>
                          )}
                          {isTechnician && (
                            <span style={{
                              padding: "2px 8px",
                              borderRadius: "4px",
                              fontSize: "12px",
                              fontWeight: 500,
                              background: "hsla(142, 76%, 36%, 0.1)",
                              color: "hsl(142, 76%, 36%)",
                              border: "none"
                            }}>
                              Technicien
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                });
              })()}
            </div>
          </div>
    
          {/* Panneau droit : Techniciens */}
          <div style={{
            background: "hsl(0, 0%, 100%)",
            borderRadius: "8px",
            border: "1px solid hsla(220, 20%, 92%, 0.5)",
            padding: "16px",
            display: "flex",
            flexDirection: "column"
          }}>
            {/* Header */}
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "16px"
            }}>
              <Wrench size={18} color="hsl(25, 95%, 53%)" />
              <h3 style={{
                fontSize: "18px",
                fontWeight: 600,
                color: "#111827",
                margin: 0,
                fontFamily: "'Inter', system-ui, sans-serif"
              }}>
                Techniciens
              </h3>
            </div>
    
            {/* Liste des techniciens */}
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {technicians.length === 0 ? (
                <div style={{ padding: "20px", textAlign: "center", color: "hsl(220, 15%, 45%)" }}>
                  Aucun technicien trouvé
                </div>
              ) : (
                technicians.map((tech: any) => {
                  const initials = tech.full_name
                    ?.split(" ")
                    .map((n: string) => n[0])
                    .join("")
                    .toUpperCase()
                    .substring(0, 2) || "??";
                  
                  // Calculer les tickets relancés (par défaut 0 si non disponible)
                  const reopenedCount = 0; // À calculer depuis l'historique si nécessaire
                  
                  return (
                    <div
                      key={tech.id}
                      style={{
                        border: "1px solid hsla(220, 20%, 92%, 0.5)",
                        borderRadius: "8px",
                        padding: "16px",
                        transition: "all 200ms",
                        cursor: "pointer"
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = "hsla(25, 95%, 53%, 0.5)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = "hsla(220, 20%, 92%, 0.5)";
                      }}
                    >
                      {/* En-tête avec avatar et infos */}
                      <div style={{ display: "flex", gap: "16px", marginBottom: "12px" }}>
                        {/* Avatar */}
                        <div style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "50%",
                          background: "hsla(25, 95%, 53%, 0.1)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "hsl(25, 95%, 53%)",
                          fontSize: "14px",
                          fontWeight: 600,
                          flexShrink: 0
                        }}>
                          {initials}
                        </div>
                        
                        {/* Infos */}
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{
                            fontSize: "14px",
                            fontWeight: 600,
                            color: "#111827",
                            marginBottom: "4px"
                          }}>
                            {tech.full_name}
                          </div>
                          <div style={{
                            fontSize: "14px",
                            color: "hsl(220, 15%, 45%)",
                            marginBottom: "12px"
                          }}>
                            {tech.email}
                          </div>
                          
                          {/* Badge spécialisation */}
                          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                            {tech.specialization === "materiel" ? (
                              <>
                                <Wrench size={12} color="hsl(220, 15%, 45%)" />
                                <span style={{
                                  padding: "2px 8px",
                                  borderRadius: "4px",
                                  fontSize: "12px",
                                  border: "1px solid hsla(220, 20%, 92%, 0.5)",
                                  color: "hsl(220, 15%, 45%)"
                                }}>
                                  Matériel
                                </span>
                              </>
                            ) : (
                              <>
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="hsl(220, 15%, 45%)" strokeWidth="2">
                                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                                  <line x1="8" y1="21" x2="16" y2="21"></line>
                                  <line x1="12" y1="17" x2="12" y2="21"></line>
                                </svg>
                                <span style={{
                                  padding: "2px 8px",
                                  borderRadius: "4px",
                                  fontSize: "12px",
                                  border: "1px solid hsla(220, 20%, 92%, 0.5)",
                                  color: "hsl(220, 15%, 45%)"
                                }}>
                                  Applicatif
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
    
                      {/* Statistiques */}
                      <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(4, 1fr)",
                        gap: "8px",
                        marginTop: "12px"
                      }}>
                        {/* En cours */}
                        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                            <Clock size={12} color="hsl(199, 89%, 48%)" />
                            <span style={{
                              fontSize: "14px",
                              fontWeight: 600,
                              color: "hsl(199, 89%, 48%)"
                            }}>
                              {tech.in_progress_tickets_count || 0}
                            </span>
                          </div>
                          <span style={{
                            fontSize: "12px",
                            color: "hsl(220, 15%, 45%)"
                          }}>
                            En cours
                          </span>
                        </div>
    
                        {/* Assignés */}
                        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                            <Wrench size={12} color="hsl(25, 95%, 53%)" />
                            <span style={{
                              fontSize: "14px",
                              fontWeight: 600,
                              color: "hsl(25, 95%, 53%)"
                            }}>
                              {tech.assigned_tickets_count || 0}
                            </span>
                          </div>
                          <span style={{
                            fontSize: "12px",
                            color: "hsl(220, 15%, 45%)"
                          }}>
                            Assignés
                          </span>
                        </div>
    
                        {/* Résolus */}
                        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                            <CheckCircle2 size={12} color="hsl(142, 76%, 36%)" />
                            <span style={{
                              fontSize: "14px",
                              fontWeight: 600,
                              color: "hsl(142, 76%, 36%)"
                            }}>
                              {tech.resolved_tickets_count || tech.closed_tickets_count || 0}
                            </span>
                          </div>
                          <span style={{
                            fontSize: "12px",
                            color: "hsl(220, 15%, 45%)"
                          }}>
                            Résolus
                          </span>
                        </div>
    
                        {/* Relancés */}
                        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                            <AlertTriangle size={12} color="hsl(0, 84%, 60%)" />
                            <span style={{
                              fontSize: "14px",
                              fontWeight: 600,
                              color: "hsl(0, 84%, 60%)"
                            }}>
                              {reopenedCount}
                            </span>
                          </div>
                          <span style={{
                            fontSize: "12px",
                            color: "hsl(220, 15%, 45%)"
                          }}>
                            Relancés
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
        </div>
      </div>
    </div>

    {/* Modal de détails du technicien */}
    {showTechnicianDetailsModal && selectedTechnicianDetails && (
       <div style={{
         position: "fixed",
         top: 0,
         left: 0,
         width: "100%",
         height: "100%",
         background: "rgba(0, 0, 0, 0.5)",
         display: "flex",
         justifyContent: "center",
         alignItems: "center",
         zIndex: 1000,
       }}>
         <div style={{
           background: "white",
           padding: "30px",
           borderRadius: "10px",
           boxShadow: "0 5px 15px rgba(0, 0, 0, 0.3)",
           width: "90%",
           maxWidth: "600px",
           position: "relative",
           maxHeight: "90vh",
           overflowY: "auto"
         }}>
           <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
             <h2 style={{ fontSize: "24px", fontWeight: "600", color: "#333", margin: 0 }}>Détails du Technicien</h2>
             <button
               onClick={() => {
                 setShowTechnicianDetailsModal(false);
                 setSelectedTechnicianDetails(null);
               }}
               style={{
                 background: "transparent",
                 border: "none",
                 fontSize: "24px",
                 cursor: "pointer",
                 color: "#999",
                 padding: "0",
                 width: "30px",
                 height: "30px",
                 display: "flex",
                 alignItems: "center",
                 justifyContent: "center"
               }}
             >
               ×
             </button>
           </div>
    
           <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
             {/* Informations personnelles */}
             <div>
               <h3 style={{ fontSize: "16px", fontWeight: "600", color: "#333", marginBottom: "12px" }}>Informations personnelles</h3>
               <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                 <div style={{ display: "flex", gap: "12px" }}>
                   <span style={{ fontWeight: "600", color: "#666", minWidth: "120px" }}>Nom complet:</span>
                   <span style={{ color: "#333" }}>{selectedTechnicianDetails.full_name}</span>
                 </div>
                 <div style={{ display: "flex", gap: "12px" }}>
                   <span style={{ fontWeight: "600", color: "#666", minWidth: "120px" }}>Email:</span>
                   <span style={{ color: "#333" }}>{selectedTechnicianDetails.email}</span>
                 </div>
                 {selectedTechnicianDetails.phone && (
                   <div style={{ display: "flex", gap: "12px" }}>
                     <span style={{ fontWeight: "600", color: "#666", minWidth: "120px" }}>Téléphone:</span>
                     <span style={{ color: "#333" }}>{selectedTechnicianDetails.phone}</span>
                   </div>
                 )}
                 {selectedTechnicianDetails.agency && (
                   <div style={{ display: "flex", gap: "12px" }}>
                     <span style={{ fontWeight: "600", color: "#666", minWidth: "120px" }}>Agence:</span>
                     <span style={{ color: "#333" }}>{selectedTechnicianDetails.agency}</span>
                   </div>
                 )}
                 <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                   <span style={{ fontWeight: "600", color: "#666", minWidth: "120px" }}>Spécialisation:</span>
                   <span style={{
                     padding: "4px 8px",
                     borderRadius: "12px",
                     fontSize: "12px",
                     fontWeight: "500",
                     background: selectedTechnicianDetails.specialization === "materiel" ? "#007bff" : "#28a745",
                     color: "white",
                     whiteSpace: "nowrap"
                   }}>
                     {selectedTechnicianDetails.specialization === "materiel" ? "Matériel" : selectedTechnicianDetails.specialization === "applicatif" ? "Applicatif" : "Non défini"}
                   </span>
                 </div>
                 <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                   <span style={{ fontWeight: "600", color: "#666", minWidth: "120px" }}>Statut:</span>
                   <span style={{
                     padding: "4px 8px",
                     borderRadius: "12px",
                     fontSize: "12px",
                     fontWeight: "500",
                     background: selectedTechnicianDetails.actif === true ? "#28a745" : "#6c757d",
                     color: "white",
                     whiteSpace: "nowrap"
                   }}>
                     {selectedTechnicianDetails.actif === true ? "Actif" : "Inactif"}
                   </span>
                 </div>
                 <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                   <span style={{ fontWeight: "600", color: "#666", minWidth: "120px" }}>Disponibilité:</span>
                   <span style={{
                     padding: "4px 8px",
                     borderRadius: "12px",
                     fontSize: "12px",
                     fontWeight: "500",
                     background: selectedTechnicianDetails.actif === true ? "#28a745" : "#6c757d",
                     color: "white",
                     whiteSpace: "nowrap"
                   }}>
                     {selectedTechnicianDetails.actif === true ? "Disponible" : "Indisponible"}
                   </span>
                 </div>
                 {selectedTechnicianDetails.last_login_at && (
                   <div style={{ display: "flex", gap: "12px" }}>
                     <span style={{ fontWeight: "600", color: "#666", minWidth: "120px" }}>Dernière connexion:</span>
                     <span style={{ color: "#333" }}>
                       {new Date(selectedTechnicianDetails.last_login_at).toLocaleString("fr-FR", {
                         day: "2-digit",
                         month: "2-digit",
                         year: "numeric",
                         hour: "2-digit",
                         minute: "2-digit"
                       })}
                     </span>
                   </div>
                 )}
               </div>
             </div>
    
             {/* Statistiques */}
             <div>
               <h3 style={{ fontSize: "16px", fontWeight: "600", color: "#333", marginBottom: "12px" }}>Statistiques</h3>
               <div style={{ 
                 display: "grid", 
                 gridTemplateColumns: "repeat(2, 1fr)", 
                 gap: "16px" 
               }}>
                 <div style={{ 
                   padding: "16px", 
                   background: "#f8f9fa", 
                   borderRadius: "8px",
                   textAlign: "center"
                 }}>
                   <div style={{ fontSize: "32px", fontWeight: "700", color: "#007bff", marginBottom: "4px" }}>
                     {selectedTechnicianDetails.assigned_tickets_count || 0}
                   </div>
                   <div style={{ fontSize: "14px", color: "#666" }}>Tickets Assignés</div>
                 </div>
                 <div style={{ 
                   padding: "16px", 
                   background: "#f8f9fa", 
                   borderRadius: "8px",
                   textAlign: "center"
                 }}>
                   <div style={{ fontSize: "32px", fontWeight: "700", color: "#28a745", marginBottom: "4px" }}>
                     {selectedTechnicianDetails.in_progress_tickets_count || 0}
                   </div>
                   <div style={{ fontSize: "14px", color: "#666" }}>Tickets en Cours</div>
                 </div>
                 <div style={{ 
                   padding: "16px", 
                   background: "#f8f9fa", 
                   borderRadius: "8px",
                   textAlign: "center"
                 }}>
                   <div style={{ fontSize: "32px", fontWeight: "700", color: "#17a2b8", marginBottom: "4px" }}>
                     {selectedTechnicianDetails.resolved_tickets_count || 0}
                   </div>
                   <div style={{ fontSize: "14px", color: "#666" }}>Tickets Résolus</div>
                 </div>
                 <div style={{ 
                   padding: "16px", 
                   background: "#f8f9fa", 
                   borderRadius: "8px",
                   textAlign: "center"
                 }}>
                   <div style={{ fontSize: "32px", fontWeight: "700", color: "#6c757d", marginBottom: "4px" }}>
                     {selectedTechnicianDetails.closed_tickets_count || 0}
                   </div>
                   <div style={{ fontSize: "14px", color: "#666" }}>Tickets Clôturés</div>
                 </div>
                 <div style={{ 
                   padding: "16px", 
                   background: "#f8f9fa", 
                   borderRadius: "8px",
                   textAlign: "center"
                 }}>
                   <div style={{ fontSize: "32px", fontWeight: "700", color: "#ffc107", marginBottom: "4px" }}>
                     {selectedTechnicianDetails.resolved_this_month || 0}
                   </div>
                   <div style={{ fontSize: "14px", color: "#666" }}>Résolus ce Mois</div>
                 </div>
                 <div style={{ 
                   padding: "16px", 
                   background: "#f8f9fa", 
                   borderRadius: "8px",
                   textAlign: "center"
                 }}>
                   <div style={{ fontSize: "32px", fontWeight: "700", color: "#fd7e14", marginBottom: "4px" }}>
                     {selectedTechnicianDetails.avg_resolution_time_days !== undefined ? `${selectedTechnicianDetails.avg_resolution_time_days}` : "0"}
                   </div>
                   <div style={{ fontSize: "14px", color: "#666" }}>Jours (Moyenne)</div>
                 </div>
                 <div style={{ 
                   padding: "16px", 
                   background: "#f8f9fa", 
                   borderRadius: "8px",
                   textAlign: "center",
                   gridColumn: "span 2"
                 }}>
                   <div style={{ fontSize: "32px", fontWeight: "700", color: "#20c997", marginBottom: "4px" }}>
                     {selectedTechnicianDetails.success_rate !== undefined ? `${selectedTechnicianDetails.success_rate}%` : "0%"}
                   </div>
                   <div style={{ fontSize: "14px", color: "#666" }}>Taux de Réussite</div>
                 </div>
               </div>
             </div>
           </div>
    
           <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "24px", gap: "12px" }}>
             <button
               onClick={() => {
                 setShowTechnicianDetailsModal(false);
                 setSelectedTechnicianDetails(null);
               }}
               style={{
                 padding: "10px 20px",
                 background: "#6c757d",
                 color: "white",
                 border: "none",
                 borderRadius: "5px",
                 cursor: "pointer",
                 fontSize: "14px"
               }}
             >
               Fermer
             </button>
           </div>
         </div>
       </div>
               )}
    
               {/* Modal Créer un technicien */}
               {showCreateTechnicianModal && (
       <div style={{
         position: "fixed",
         top: 0,
         left: 0,
         width: "100%",
         height: "100%",
         background: "rgba(0, 0, 0, 0.5)",
         display: "flex",
         justifyContent: "center",
         alignItems: "center",
         zIndex: 1000,
       }}>
         <div style={{
           background: "white",
           padding: "30px",
           borderRadius: "10px",
           boxShadow: "0 5px 15px rgba(0, 0, 0, 0.3)",
           width: "90%",
           maxWidth: "500px",
           position: "relative",
           maxHeight: "90vh",
           overflowY: "auto"
         }}>
           <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
             <h2 style={{ fontSize: "24px", fontWeight: "600", color: "#333", margin: 0 }}>Créer un Technicien</h2>
             <button
               onClick={() => setShowCreateTechnicianModal(false)}
               style={{
                 background: "transparent",
                 border: "none",
                 fontSize: "24px",
                 cursor: "pointer",
                 color: "#999",
                 padding: "0",
                 width: "30px",
                 height: "30px",
                 display: "flex",
                 alignItems: "center",
                 justifyContent: "center"
               }}
             >
               ×
             </button>
           </div>
    
           <form onSubmit={async (e) => {
             e.preventDefault();
             if (!token) return;
             
             setLoading(true);
             try {
               // Récupérer le rôle Technicien
               const rolesRes = await fetch("http://localhost:8000/auth/roles", {
                 headers: {
                   Authorization: `Bearer ${token}`,
                 },
               });
               
               if (!rolesRes.ok) {
                 throw new Error("Impossible de récupérer les rôles");
               }
               
               const roles = await rolesRes.json();
               const technicianRole = roles.find((r: any) => r.name === "Technicien");
               
               if (!technicianRole) {
                 alert("Erreur: Le rôle Technicien n'existe pas");
                 return;
               }
    
               const createData: any = {
                 full_name: (e.target as any).full_name.value,
                 email: (e.target as any).email.value,
                 username: (e.target as any).username.value,
                 password: (e.target as any).password.value,
                 phone: (e.target as any).phone.value || null,
                 agency: (e.target as any).agency.value || null,
                 specialization: (e.target as any).specialization.value || null,
                 max_tickets_capacity: (e.target as any).max_tickets_capacity?.value ? parseInt((e.target as any).max_tickets_capacity.value) : null,
                 notes: (e.target as any).notes?.value || null,
                 role_id: technicianRole.id
               };
    
               const res = await fetch("http://localhost:8000/users/", {
                 method: "POST",
                 headers: {
                   "Content-Type": "application/json",
                   Authorization: `Bearer ${token}`,
                 },
                 body: JSON.stringify(createData),
               });
    
               if (res.ok) {
                 alert("Technicien créé avec succès");
                 setShowCreateTechnicianModal(false);
                 // Recharger les techniciens
                 const techRes = await fetch("http://localhost:8000/users/technicians", {
                   headers: {
                     Authorization: `Bearer ${token}`,
                   },
                 });
                 if (techRes.ok) {
                   const techData = await techRes.json();
                   const techsWithStats = await Promise.all(
                     techData.map(async (tech: any) => {
                       try {
                         const statsRes = await fetch(`http://localhost:8000/users/technicians/${tech.id}/stats`, {
                           headers: {
                             Authorization: `Bearer ${token}`,
                           },
                         });
                         if (statsRes.ok) {
                           const stats = await statsRes.json();
                           return { ...tech, ...stats };
                         }
                       } catch (err) {
                         console.error(`Erreur stats pour ${tech.id}:`, err);
                       }
                      return { ...tech, workload_ratio: "0/5", resolved_today: 0, avg_response_time_minutes: 0 };
                     })
                   );
                   setTechnicians(techsWithStats);
                 }
               } else {
                 const error = await res.json();
                 alert(`Erreur: ${error.detail || "Impossible de créer le technicien"}`);
               }
             } catch (err) {
               console.error("Erreur:", err);
               alert("Une erreur est survenue lors de la création");
             } finally {
               setLoading(false);
             }
           }}>
             <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
               <div>
                 <label style={{ display: "block", marginBottom: "8px", fontWeight: "500", color: "#333" }}>Nom complet *</label>
                 <input
                   type="text"
                   name="full_name"
                   required
                   style={{
                     width: "100%",
                     padding: "10px",
                     border: "1px solid #ddd",
                     borderRadius: "5px",
                     fontSize: "14px"
                   }}
                 />
               </div>
               <div>
                 <label style={{ display: "block", marginBottom: "8px", fontWeight: "500", color: "#333" }}>Email *</label>
                 <input
                   type="email"
                   name="email"
                   required
                   style={{
                     width: "100%",
                     padding: "10px",
                     border: "1px solid #ddd",
                     borderRadius: "5px",
                     fontSize: "14px"
                   }}
                 />
               </div>
               <div>
                 <label style={{ display: "block", marginBottom: "8px", fontWeight: "500", color: "#333" }}>Nom d'utilisateur *</label>
                 <input
                   type="text"
                   name="username"
                   required
                   style={{
                     width: "100%",
                     padding: "10px",
                     border: "1px solid #ddd",
                     borderRadius: "5px",
                     fontSize: "14px"
                   }}
                 />
               </div>
               <div>
                 <label style={{ display: "block", marginBottom: "8px", fontWeight: "500", color: "#333" }}>Mot de passe *</label>
                 <input
                   type="password"
                   name="password"
                   required
                   style={{
                     width: "100%",
                     padding: "10px",
                     border: "1px solid #ddd",
                     borderRadius: "5px",
                     fontSize: "14px"
                   }}
                 />
               </div>
               <div>
                 <label style={{ display: "block", marginBottom: "8px", fontWeight: "500", color: "#333" }}>Téléphone</label>
                 <input
                   type="tel"
                   name="phone"
                   style={{
                     width: "100%",
                     padding: "10px",
                     border: "1px solid #ddd",
                     borderRadius: "5px",
                     fontSize: "14px"
                   }}
                 />
               </div>
               <div>
                 <label style={{ display: "block", marginBottom: "8px", fontWeight: "500", color: "#333" }}>Agence</label>
                 <input
                   type="text"
                   name="agency"
                   style={{
                     width: "100%",
                     padding: "10px",
                     border: "1px solid #ddd",
                     borderRadius: "5px",
                     fontSize: "14px"
                   }}
                 />
               </div>
               <div>
                 <label style={{ display: "block", marginBottom: "8px", fontWeight: "500", color: "#333" }}>Spécialisation *</label>
                 <select
                   name="specialization"
                   required
                   style={{
                     width: "100%",
                     padding: "10px",
                     border: "1px solid #ddd",
                     borderRadius: "5px",
                     fontSize: "14px",
                     background: "white"
                   }}
                 >
                   <option value="">Sélectionner...</option>
                   <option value="materiel">Matériel</option>
                   <option value="applicatif">Applicatif</option>
                 </select>
               </div>
               <div>
                 <label style={{ display: "block", marginBottom: "8px", fontWeight: "500", color: "#333" }}>Capacité max de tickets simultanés</label>
                 <input
                   type="number"
                   name="max_tickets_capacity"
                   min="1"
                   style={{
                     width: "100%",
                     padding: "10px",
                     border: "1px solid #ddd",
                     borderRadius: "5px",
                     fontSize: "14px"
                   }}
                 />
               </div>
               <div>
                 <label style={{ display: "block", marginBottom: "8px", fontWeight: "500", color: "#333" }}>Notes</label>
                 <textarea
                   name="notes"
                   rows={3}
                   style={{
                     width: "100%",
                     padding: "10px",
                     border: "1px solid #ddd",
                     borderRadius: "5px",
                     fontSize: "14px",
                     resize: "vertical"
                   }}
                 />
               </div>
             </div>
    
             <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "24px", gap: "12px" }}>
               <button
                 type="button"
                 onClick={() => setShowCreateTechnicianModal(false)}
                 style={{
                   padding: "10px 20px",
                   background: "#6c757d",
                   color: "white",
                   border: "none",
                   borderRadius: "5px",
                   cursor: "pointer",
                   fontSize: "14px"
                 }}
               >
                 Annuler
               </button>
               <button
                 type="submit"
                 disabled={loading}
                 style={{
                   padding: "10px 20px",
                   background: "#28a745",
                   color: "white",
                   border: "none",
                   borderRadius: "5px",
                   cursor: "pointer",
                   fontSize: "14px",
                   opacity: loading ? 0.7 : 1
                 }}
               >
                 {loading ? "Création..." : "Créer"}
               </button>
             </div>
           </form>
         </div>
       </div>
               )}
    
               {/* Modal Modifier un technicien */}
               {showEditTechnicianModal && editingTechnician && (
       <div style={{
         position: "fixed",
         top: 0,
         left: 0,
         width: "100%",
         height: "100%",
         background: "rgba(0, 0, 0, 0.5)",
         display: "flex",
         justifyContent: "center",
         alignItems: "center",
         zIndex: 1000,
       }}>
         <div style={{
           background: "white",
           padding: "30px",
           borderRadius: "10px",
           boxShadow: "0 5px 15px rgba(0, 0, 0, 0.3)",
           width: "90%",
           maxWidth: "500px",
           position: "relative",
           maxHeight: "90vh",
           overflowY: "auto"
         }}>
           <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
             <h2 style={{ fontSize: "24px", fontWeight: "600", color: "#333", margin: 0 }}>Modifier le Technicien</h2>
             <button
               onClick={() => {
                 setShowEditTechnicianModal(false);
                 setEditingTechnician(null);
               }}
               style={{
                 background: "transparent",
                 border: "none",
                 fontSize: "24px",
                 cursor: "pointer",
                 color: "#999",
                 padding: "0",
                 width: "30px",
                 height: "30px",
                 display: "flex",
                 alignItems: "center",
                 justifyContent: "center"
               }}
             >
               ×
             </button>
           </div>
    
           <form onSubmit={async (e) => {
             e.preventDefault();
             if (!editingTechnician || !token) return;
             
             setLoading(true);
             try {
               const updateData: any = {
                 full_name: (e.target as any).full_name.value,
                 email: (e.target as any).email.value,
                 phone: (e.target as any).phone.value || null,
                 agency: (e.target as any).agency.value || null,
                 specialization: (e.target as any).specialization.value || null,
                 max_tickets_capacity: (e.target as any).max_tickets_capacity?.value ? parseInt((e.target as any).max_tickets_capacity.value) : null,
                 notes: (e.target as any).notes?.value || null
               };
    
               const res = await fetch(`http://localhost:8000/users/${editingTechnician.id}`, {
                 method: "PUT",
                 headers: {
                   "Content-Type": "application/json",
                   Authorization: `Bearer ${token}`,
                 },
                 body: JSON.stringify(updateData),
               });
    
               if (res.ok) {
                 alert("Technicien modifié avec succès");
                 setShowEditTechnicianModal(false);
                 setEditingTechnician(null);
                 // Recharger les techniciens
                 const techRes = await fetch("http://localhost:8000/users/technicians", {
                   headers: {
                     Authorization: `Bearer ${token}`,
                   },
                 });
                 if (techRes.ok) {
                   const techData = await techRes.json();
                   const techsWithStats = await Promise.all(
                     techData.map(async (tech: any) => {
                       try {
                         const statsRes = await fetch(`http://localhost:8000/users/technicians/${tech.id}/stats`, {
                           headers: {
                             Authorization: `Bearer ${token}`,
                           },
                         });
                         if (statsRes.ok) {
                           const stats = await statsRes.json();
                           return { ...tech, ...stats };
                         }
                       } catch (err) {
                         console.error(`Erreur stats pour ${tech.id}:`, err);
                       }
                      return { ...tech, workload_ratio: "0/5", resolved_today: 0, avg_response_time_minutes: 0 };
                     })
                   );
                   setTechnicians(techsWithStats);
                 }
               } else {
                 const error = await res.json();
                 alert(`Erreur: ${error.detail || "Impossible de modifier le technicien"}`);
               }
             } catch (err) {
               console.error("Erreur:", err);
               alert("Une erreur est survenue lors de la modification");
             } finally {
               setLoading(false);
             }
           }}>
             <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
               <div>
                 <label style={{ display: "block", marginBottom: "8px", fontWeight: "500", color: "#333" }}>Nom complet *</label>
                 <input
                   type="text"
                   name="full_name"
                   defaultValue={editingTechnician.full_name}
                   required
                   style={{
                     width: "100%",
                     padding: "10px",
                     border: "1px solid #ddd",
                     borderRadius: "5px",
                     fontSize: "14px"
                   }}
                 />
               </div>
               <div>
                 <label style={{ display: "block", marginBottom: "8px", fontWeight: "500", color: "#333" }}>Email *</label>
                 <input
                   type="email"
                   name="email"
                   defaultValue={editingTechnician.email}
                   required
                   style={{
                     width: "100%",
                     padding: "10px",
                     border: "1px solid #ddd",
                     borderRadius: "5px",
                     fontSize: "14px"
                   }}
                 />
               </div>
               <div>
                 <label style={{ display: "block", marginBottom: "8px", fontWeight: "500", color: "#333" }}>Téléphone</label>
                 <input
                   type="tel"
                   name="phone"
                   defaultValue={editingTechnician.phone || ""}
                   style={{
                     width: "100%",
                     padding: "10px",
                     border: "1px solid #ddd",
                     borderRadius: "5px",
                     fontSize: "14px"
                   }}
                 />
               </div>
               <div>
                 <label style={{ display: "block", marginBottom: "8px", fontWeight: "500", color: "#333" }}>Agence</label>
                 <input
                   type="text"
                   name="agency"
                   defaultValue={editingTechnician.agency || ""}
                   style={{
                     width: "100%",
                     padding: "10px",
                     border: "1px solid #ddd",
                     borderRadius: "5px",
                     fontSize: "14px"
                   }}
                 />
               </div>
               <div>
                 <label style={{ display: "block", marginBottom: "8px", fontWeight: "500", color: "#333" }}>Spécialisation *</label>
                 <select
                   name="specialization"
                   defaultValue={editingTechnician.specialization || ""}
                   required
                   style={{
                     width: "100%",
                     padding: "10px",
                     border: "1px solid #ddd",
                     borderRadius: "5px",
                     fontSize: "14px",
                     background: "white"
                   }}
                 >
                   <option value="">Sélectionner...</option>
                   <option value="materiel">Matériel</option>
                   <option value="applicatif">Applicatif</option>
                 </select>
               </div>
               <div>
                 <label style={{ display: "block", marginBottom: "8px", fontWeight: "500", color: "#333" }}>Capacité max de tickets simultanés</label>
                 <input
                   type="number"
                   name="max_tickets_capacity"
                   min="1"
                   defaultValue={editingTechnician.max_tickets_capacity || ""}
                   style={{
                     width: "100%",
                     padding: "10px",
                     border: "1px solid #ddd",
                     borderRadius: "5px",
                     fontSize: "14px"
                   }}
                 />
               </div>
               <div>
                 <label style={{ display: "block", marginBottom: "8px", fontWeight: "500", color: "#333" }}>Notes</label>
                 <textarea
                   name="notes"
                   rows={3}
                   defaultValue={editingTechnician.notes || ""}
                   style={{
                     width: "100%",
                     padding: "10px",
                     border: "1px solid #ddd",
                     borderRadius: "5px",
                     fontSize: "14px",
                     resize: "vertical"
                   }}
                 />
               </div>
             </div>
    
             <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "24px", gap: "12px" }}>
               <button
                 type="button"
                 onClick={() => {
                   setShowEditTechnicianModal(false);
                   setEditingTechnician(null);
                 }}
                 style={{
                   padding: "10px 20px",
                   background: "#6c757d",
                   color: "white",
                   border: "none",
                   borderRadius: "5px",
                   cursor: "pointer",
                   fontSize: "14px"
                 }}
               >
                 Annuler
               </button>
               <button
                 type="submit"
                 disabled={loading}
                 style={{
                   padding: "10px 20px",
                   background: "#007bff",
                   color: "white",
                   border: "none",
                   borderRadius: "5px",
                   cursor: "pointer",
                   fontSize: "14px",
                   opacity: loading ? 0.7 : 1
                 }}
               >
                 {loading ? "Modification..." : "Modifier"}
               </button>
             </div>
           </form>
         </div>
       </div>
               )}
    
               {/* Modal Confirmation Suppression */}
               {showDeleteConfirmModal && technicianToDelete && (
       <div style={{
         position: "fixed",
         top: 0,
         left: 0,
         width: "100%",
         height: "100%",
         background: "rgba(0, 0, 0, 0.5)",
         display: "flex",
         justifyContent: "center",
         alignItems: "center",
         zIndex: 1000,
       }}>
         <div style={{
           background: "white",
           padding: "30px",
           borderRadius: "10px",
           boxShadow: "0 5px 15px rgba(0, 0, 0, 0.3)",
           width: "90%",
           maxWidth: "400px",
           position: "relative"
         }}>
           <h2 style={{ fontSize: "20px", fontWeight: "600", color: "#333", marginBottom: "16px" }}>Confirmer la suppression</h2>
           <p style={{ color: "#666", marginBottom: "24px" }}>
             Êtes-vous sûr de vouloir supprimer le technicien <strong>{technicianToDelete.full_name}</strong> ? Cette action est irréversible.
           </p>
           <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px" }}>
             <button
               onClick={() => {
                 setShowDeleteConfirmModal(false);
                 setTechnicianToDelete(null);
               }}
               style={{
                 padding: "10px 20px",
                 background: "#6c757d",
                 color: "white",
                 border: "none",
                 borderRadius: "5px",
                 cursor: "pointer",
                 fontSize: "14px"
               }}
             >
               Annuler
             </button>
             <button
               onClick={async () => {
                 if (!technicianToDelete || !token) return;
                 
                 setLoading(true);
                 try {
                   const res = await fetch(`http://localhost:8000/users/${technicianToDelete.id}`, {
                     method: "DELETE",
                     headers: {
                       Authorization: `Bearer ${token}`,
                     },
                   });
    
                   if (res.ok) {
                     alert("Technicien supprimé avec succès");
                     setShowDeleteConfirmModal(false);
                     setTechnicianToDelete(null);
                     // Recharger les techniciens
                     const techRes = await fetch("http://localhost:8000/users/technicians", {
                       headers: {
                         Authorization: `Bearer ${token}`,
                       },
                     });
                     if (techRes.ok) {
                       const techData = await techRes.json();
                       const techsWithStats = await Promise.all(
                         techData.map(async (tech: any) => {
                           try {
                             const statsRes = await fetch(`http://localhost:8000/users/technicians/${tech.id}/stats`, {
                               headers: {
                                 Authorization: `Bearer ${token}`,
                               },
                             });
                             if (statsRes.ok) {
                               const stats = await statsRes.json();
                               return { ...tech, ...stats };
                             }
                           } catch (err) {
                             console.error(`Erreur stats pour ${tech.id}:`, err);
                           }
                          return { ...tech, workload_ratio: "0/5", resolved_today: 0, avg_response_time_minutes: 0 };
                         })
                       );
                       setTechnicians(techsWithStats);
                     }
                   } else {
                     const error = await res.json();
                     alert(`Erreur: ${error.detail || "Impossible de supprimer le technicien"}`);
                   }
                 } catch (err) {
                   console.error("Erreur:", err);
                   alert("Une erreur est survenue lors de la suppression");
                 } finally {
                   setLoading(false);
                 }
               }}
               disabled={loading}
               style={{
                 padding: "10px 20px",
                 background: "#dc3545",
                 color: "white",
                 border: "none",
                 borderRadius: "5px",
                 cursor: "pointer",
                 fontSize: "14px",
                 opacity: loading ? 0.7 : 1
               }}
             >
               {loading ? "Suppression..." : "Supprimer"}
             </button>
           </div>
         </div>
       </div>
    )}
    </div>
  );
}
