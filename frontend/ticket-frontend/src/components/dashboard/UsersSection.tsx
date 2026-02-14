/**
 * Section Users du dashboard DSI/Admin.
 */

import { Plus, Search, ChevronDown, UserCheck, UserX, Pencil, Trash2, RefreshCcw } from "lucide-react";

export type UsersSectionProps = {
  allUsers: any[];
  userRoleFilter: string;
  setUserRoleFilter: (v: string) => void;
  userStatusFilter: string;
  setUserStatusFilter: (v: string) => void;
  userAgencyFilter: string;
  setUserAgencyFilter: (v: string) => void;
  searchQuery: string;
  setSearchQuery: (v: string) => void;
  usersPerPage: number;
  currentPage: number;
  setCurrentPage: (v: number | ((prev: number) => number)) => void;
  setShowAddUserModal: (v: boolean) => void;
  handleToggleUserActif: (user: any) => void;
  handleEditUser: (user: any) => void;
  handleResetPassword: (user: any) => void;
  handleDeleteUser: (user: any) => void;
};

export function UsersSection(props: UsersSectionProps) {
  const { allUsers, userRoleFilter, setUserRoleFilter, userStatusFilter, setUserStatusFilter, userAgencyFilter, setUserAgencyFilter, searchQuery, setSearchQuery, usersPerPage, currentPage, setCurrentPage, setShowAddUserModal, handleToggleUserActif, handleEditUser, handleResetPassword, handleDeleteUser } = props;
  // Filtrer les utilisateurs
let filteredUsers = allUsers;

if (userRoleFilter !== "all") {
  filteredUsers = filteredUsers.filter((u: any) => u.role?.name === userRoleFilter);
}

if (userStatusFilter !== "all") {
  filteredUsers = filteredUsers.filter((u: any) => {
    const isActive = u.actif === true;
    return userStatusFilter === "actif" ? isActive : !isActive;
  });
}

if (userAgencyFilter !== "all") {
  filteredUsers = filteredUsers.filter((u: any) => u.agency === userAgencyFilter);
}

if (searchQuery) {
  filteredUsers = filteredUsers.filter((u: any) => 
    u.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );
}

// Pagination
const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
const startIndex = (currentPage - 1) * usersPerPage;
const endIndex = startIndex + usersPerPage;
const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

// Récupérer les rôles et agences uniques pour les filtres
const uniqueRoles = Array.from(new Set(allUsers.map((u: any) => u.role?.name).filter(Boolean)));
const uniqueAgencies = Array.from(new Set(allUsers.map((u: any) => u.agency).filter(Boolean)));

 const borderColor = "hsl(var(--border))";
 const mutedFg = "hsl(var(--muted-foreground))";
 const fg = "hsl(var(--foreground))";
 const cardBg = "hsl(var(--card))";
 const orange = "hsl(var(--brand-orange))";
 const orangeLight = "hsl(var(--brand-orange-light))";

return (
  <div
    style={{
      background: cardBg,
      borderRadius: "8px",
      boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
      border: `1px solid ${borderColor}`,
      overflow: "hidden"
    }}
  >
    <div style={{ padding: "24px" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", flexWrap: "wrap", gap: "16px", marginBottom: "24px" }}>
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          <button
            onClick={() => setShowAddUserModal(true)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "10px 20px",
              backgroundColor: orange,
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: 500,
              boxShadow: "0 1px 2px rgba(0,0,0,0.05)"
            }}
          >
            <Plus size={18} />
            Ajouter
          </button>
        </div>
      </div>

      {/* Search + filters */}
      <div style={{ display: "flex", gap: "16px", alignItems: "center", flexWrap: "wrap", marginBottom: "20px" }}>
        <div style={{ position: "relative", flex: "1", minWidth: "200px", maxWidth: "360px" }}>
          <Search size={18} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: mutedFg, pointerEvents: "none" }} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Rechercher..."
            style={{
              width: "100%",
              padding: "10px 12px 10px 40px",
              borderRadius: "8px",
              border: `1px solid ${borderColor}`,
              backgroundColor: cardBg,
              color: fg,
              fontSize: "14px"
            }}
          />
        </div>
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center" }}>
          <div style={{ position: "relative", display: "inline-block" }}>
            <select
              value={userRoleFilter}
              onChange={(e) => {
                setUserRoleFilter(e.target.value);
                setCurrentPage(1);
              }}
              style={{
                padding: "10px 36px 10px 14px",
                borderRadius: "8px",
                border: `1px solid ${borderColor}`,
                backgroundColor: cardBg,
                color: fg,
                fontSize: "14px",
                cursor: "pointer",
                appearance: "none",
                WebkitAppearance: "none",
                MozAppearance: "none",
                minWidth: "160px"
              }}
            >
              <option value="all">Tous les rôles</option>
              {uniqueRoles.map((role: string) => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
            <ChevronDown size={18} style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", color: mutedFg, pointerEvents: "none" }} />
          </div>
          <div style={{ position: "relative", display: "inline-block" }}>
            <select
              value={userStatusFilter}
              onChange={(e) => {
                setUserStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              style={{
                padding: "10px 36px 10px 14px",
                borderRadius: "8px",
                border: `1px solid ${borderColor}`,
                backgroundColor: cardBg,
                color: fg,
                fontSize: "14px",
                cursor: "pointer",
                appearance: "none",
                WebkitAppearance: "none",
                MozAppearance: "none",
                minWidth: "140px"
              }}
            >
              <option value="all">Tous les statuts</option>
              <option value="actif">Actif</option>
              <option value="inactif">Inactif</option>
            </select>
            <ChevronDown size={18} style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", color: mutedFg, pointerEvents: "none" }} />
          </div>
          <div style={{ position: "relative", display: "inline-block" }}>
            <select
              value={userAgencyFilter}
              onChange={(e) => {
                setUserAgencyFilter(e.target.value);
                setCurrentPage(1);
              }}
              style={{
                padding: "10px 36px 10px 14px",
                borderRadius: "8px",
                border: `1px solid ${borderColor}`,
                backgroundColor: cardBg,
                color: fg,
                fontSize: "14px",
                cursor: "pointer",
                appearance: "none",
                WebkitAppearance: "none",
                MozAppearance: "none",
                minWidth: "160px"
              }}
            >
              <option value="all">Tous les départements</option>
              {uniqueAgencies.map((agency: string) => (
                <option key={agency} value={agency}>{agency}</option>
              ))}
            </select>
            <ChevronDown size={18} style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", color: mutedFg, pointerEvents: "none" }} />
          </div>
        </div>
      </div>

      {/* Table */}
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ padding: "12px 16px", textAlign: "left", borderBottom: `1px solid ${borderColor}`, fontWeight: 500, fontSize: "14px", color: mutedFg }}>Utilisateur</th>
              <th style={{ padding: "12px 16px", textAlign: "left", borderBottom: `1px solid ${borderColor}`, fontWeight: 500, fontSize: "14px", color: mutedFg }}>Rôle</th>
              <th style={{ padding: "12px 16px", textAlign: "left", borderBottom: `1px solid ${borderColor}`, fontWeight: 500, fontSize: "14px", color: mutedFg }}>Agence</th>
              <th style={{ padding: "12px 16px", textAlign: "left", borderBottom: `1px solid ${borderColor}`, fontWeight: 500, fontSize: "14px", color: mutedFg }}>Statut</th>
              <th style={{ padding: "12px 16px", textAlign: "right", borderBottom: `1px solid ${borderColor}`, fontWeight: 500, fontSize: "14px", color: mutedFg }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ textAlign: "center", padding: "48px 16px", color: mutedFg, fontSize: "14px" }}>
                  Aucun utilisateur trouvé
                </td>
              </tr>
            ) : (
              paginatedUsers.map((user: any) => {
                const isActive = user.actif === true;
                const initials = (user.full_name || "?")
                  .split(" ")
                  .map((n: string) => n[0])
                  .join("")
                  .toUpperCase()
                  .substring(0, 2) || "??";
                return (
                  <tr
                    key={user.id}
                    style={{
                      borderBottom: `1px solid ${borderColor}`,
                      transition: "background 0.15s"
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = "hsl(220, 20%, 97%)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
                  >
                    <td style={{ padding: "12px 16px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <div
                          style={{
                            width: "40px",
                            height: "40px",
                            borderRadius: "50%",
                            background: orangeLight,
                            color: "hsl(25, 95%, 53%)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "14px",
                            fontWeight: 600,
                            flexShrink: 0
                          }}
                        >
                          {initials}
                        </div>
                        <div>
                          <div style={{ fontWeight: 500, color: fg, fontSize: "14px" }}>{user.full_name || "N/A"}</div>
                          <div style={{ fontSize: "13px", color: mutedFg }}>{user.email || "N/A"}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: "12px 16px" }}>
                      <span
                        style={{
                          border: `1px solid ${borderColor}`,
                          borderRadius: "9999px",
                          padding: "4px 12px",
                          fontSize: "13px",
                          color: fg
                        }}
                      >
                        {user.role?.name || "N/A"}
                      </span>
                    </td>
                    <td style={{ padding: "12px 16px", fontSize: "14px", color: fg }}>{user.agency || "—"}</td>
                    <td style={{ padding: "12px 16px" }}>
                      {isActive ? (
                        <span style={{ background: "rgba(47, 158, 68, 0.1)", color: "#2F9E44", borderRadius: "9999px", padding: "4px 12px", fontSize: "13px", fontWeight: 600 }}>
                          Actif
                        </span>
                      ) : (
                        <span style={{ background: orange, color: "white", borderRadius: "9999px", padding: "4px 12px", fontSize: "13px" }}>
                          Inactif
                        </span>
                      )}
                    </td>
                    <td style={{ padding: "12px 16px", textAlign: "right" }}>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "8px" }}>
                        <button
                          type="button"
                          onClick={() => handleToggleUserActif(user)}
                          title={isActive ? "Désactiver" : "Activer"}
                          style={{
                            padding: "8px",
                            background: "none",
                            border: "none",
                            borderRadius: "6px",
                            cursor: "pointer",
                            color: mutedFg
                          }}
                        >
                          {isActive ? <UserCheck size={18} /> : <UserX size={18} />}
                        </button>
                        <button
                          type="button"
                          onClick={() => handleEditUser(user)}
                          title="Modifier"
                          style={{
                            padding: "8px",
                            background: "none",
                            border: "none",
                            borderRadius: "6px",
                            cursor: "pointer",
                            color: mutedFg
                          }}
                        >
                          <Pencil size={18} />
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            if (confirm(`Êtes-vous sûr de vouloir réinitialiser le mot de passe de ${user.full_name} ?`)) {
                              handleResetPassword(user);
                            }
                          }}
                          title="Réinitialiser"
                          style={{
                            padding: "8px",
                            background: "none",
                            border: "none",
                            borderRadius: "6px",
                            cursor: "pointer",
                            color: mutedFg
                          }}
                        >
                          <RefreshCcw size={18} />
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            if (confirm(`Êtes-vous sûr de vouloir supprimer l'utilisateur ${user.full_name} ? Cette action est irréversible.`)) {
                              handleDeleteUser(user);
                            }
                          }}
                          title="Supprimer"
                          style={{
                            padding: "8px",
                            background: "none",
                            border: "none",
                            borderRadius: "6px",
                            cursor: "pointer",
                            color: "#dc2626"
                          }}
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div style={{ marginTop: "20px", display: "flex", alignItems: "center", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
        <button
          onClick={() => setCurrentPage((prev: number) => Math.max(1, prev - 1))}
          disabled={currentPage === 1}
          style={{
            padding: "8px 14px",
            backgroundColor: currentPage === 1 ? "hsl(220, 20%, 94%)" : orange,
            color: currentPage === 1 ? mutedFg : "white",
            border: "none",
            borderRadius: "8px",
            cursor: currentPage === 1 ? "not-allowed" : "pointer",
            fontSize: "14px"
          }}
        >
          Précédent
        </button>
        <span style={{ color: fg, fontSize: "14px" }}>Page {currentPage} sur {totalPages || 1}</span>
        <button
          onClick={() => setCurrentPage((prev: number) => Math.min(totalPages || 1, prev + 1))}
          disabled={currentPage >= (totalPages || 1)}
          style={{
            padding: "8px 14px",
            backgroundColor: currentPage >= (totalPages || 1) ? "hsl(220, 20%, 94%)" : orange,
            color: currentPage >= (totalPages || 1) ? mutedFg : "white",
            border: "none",
            borderRadius: "8px",
            cursor: currentPage >= (totalPages || 1) ? "not-allowed" : "pointer",
            fontSize: "14px"
          }}
        >
          Suivant
        </button>
      </div>
    </div>
  </div>
);
}
