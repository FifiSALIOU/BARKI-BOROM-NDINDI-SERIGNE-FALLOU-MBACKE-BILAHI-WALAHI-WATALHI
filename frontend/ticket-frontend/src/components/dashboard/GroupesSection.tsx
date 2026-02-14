/**
 * Section Groupes du dashboard DSI/Admin.
 */

import { Shield, Wrench, Monitor, UserCheck, User, Mail, Building2, ChevronDown, ChevronRight } from "lucide-react";

export type GroupesSectionProps = {
  allUsers: any;
  expandedGroupId: any;
  setExpandedGroupId: any;
};

export function GroupesSection(props: GroupesSectionProps) {
  const { allUsers, expandedGroupId, setExpandedGroupId } = props;
  const prioriteManagerMembers = allUsers.filter((u: any) => {
  const roleName = u.role?.name;
  return roleName === "DSI" || roleName === "Adjoint DSI" || roleName === "Secrétaire DSI";
});
const techMaintenanceMembers = allUsers.filter((u: any) => u.role?.name === "Technicien" && (u.specialization === "materiel" || !u.specialization));
const techApplicatifMembers = allUsers.filter((u: any) => u.role?.name === "Technicien" && u.specialization === "applicatif");
const utilisateursMembers = allUsers.filter((u: any) => u.role?.name === "Utilisateur");
const groupsData = [
  { id: "1", name: "Priorité Manager", description: "Responsables de la gestion et de la priorisation des tickets", icon: Shield, bgColor: "#f3e8ff", iconColor: "#9333ea", members: prioriteManagerMembers },
  { id: "2", name: "Techniciens Maintenance", description: "Techniciens spécialisés dans les problèmes matériels", icon: Wrench, bgColor: "#ffedd5", iconColor: "#ea580c", members: techMaintenanceMembers },
  { id: "3", name: "Techniciens Support Applicatif", description: "Techniciens spécialisés dans les problèmes logiciels", icon: Monitor, bgColor: "#dbeafe", iconColor: "#2563eb", members: techApplicatifMembers },
  { id: "4", name: "Utilisateurs", description: "Utilisateurs standards qui créent des tickets", icon: UserCheck, bgColor: "#dcfce7", iconColor: "#16a34a", members: utilisateursMembers },
];
return (
  <div style={{ padding: "24px", background: "white", minHeight: "100%" }}>
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      {groupsData.map((group) => {
        const IconComponent = group.icon;
        const membersCount = group.members.length;
        const membersLabel = membersCount === 1 ? "1 membre" : `${membersCount} membre${membersCount > 1 ? "s" : ""}`;
        const isExpanded = expandedGroupId === group.id;
        return (
          <div
            key={group.id}
            style={{
              border: "1px solid #e5e7eb",
              boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
              borderRadius: "8px",
              overflow: "hidden",
              background: "white",
            }}
          >
            <button
              type="button"
              style={{
                width: "100%",
                padding: "16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                borderRadius: "8px",
                textAlign: "left",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(0,0,0,0.02)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
              onClick={() => setExpandedGroupId(isExpanded ? null : group.id)}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "16px", flex: 1, minWidth: 0 }}>
                <div style={{ padding: "12px", background: group.bgColor, borderRadius: "12px", flexShrink: 0 }}>
                  <IconComponent size={24} color={group.iconColor} strokeWidth={2} />
                </div>
                <div style={{ minWidth: 0 }}>
                  <h3 style={{ fontSize: "18px", fontWeight: "600", color: "#111827", margin: 0, marginBottom: "4px" }}>{group.name}</h3>
                  <p style={{ fontSize: "14px", color: "#6b7280", margin: 0 }}>{group.description}</p>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", flexShrink: 0 }}>
                <span style={{ fontSize: "14px", padding: "4px 10px", borderRadius: "9999px", background: "#1E3A5F", color: "white", fontWeight: "500" }}>
                  {membersLabel}
                </span>
                {isExpanded ? <ChevronDown size={20} color="#6b7280" /> : <ChevronRight size={20} color="#6b7280" />}
              </div>
            </button>
            {isExpanded && group.members.length > 0 && (
              <div style={{ borderTop: "1px solid #e5e7eb", padding: "16px", background: "#fafafa" }}>
                {group.members.map((member: any) => (
                  <div
                    key={member.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "12px 0",
                      borderBottom: "1px solid #f3f4f6",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "12px", flex: 1, minWidth: 0 }}>
                      <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "#fff7ed", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <User size={20} color="#ea580c" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                      </div>
                      <div style={{ minWidth: 0 }}>
                        <div style={{ fontSize: "15px", fontWeight: "normal", fontFamily: "'Inter', system-ui, sans-serif", color: "#111827", marginBottom: "2px" }}>{member.full_name || "—"}</div>
                        <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px", color: "#6b7280" }}>
                          <Mail size={14} color="#6b7280" />
                          <span>{member.email || "—"}</span>
                        </div>
                      </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", fontSize: "12px", padding: "4px 8px", borderRadius: "6px", background: "#f3f4f6", color: "#374151" }}>
                        <Building2 size={12} />
                        {member.role?.name || "—"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {isExpanded && group.members.length === 0 && (
              <div style={{ borderTop: "1px solid #e5e7eb", padding: "16px", background: "#fafafa", color: "#6b7280", fontSize: "14px" }}>
                Aucun membre dans ce groupe.
              </div>
            )}
          </div>
        );
      })}
    </div>
  </div>
);
}
