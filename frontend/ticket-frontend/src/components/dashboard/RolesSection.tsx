/**
 * Section Roles du dashboard DSI/Admin.
 */

import { Shield, Check } from "lucide-react";

export type RolesSectionProps = {
  roles: any;
};

export function RolesSection(props: RolesSectionProps) {
  const { roles } = props;
  const ROLES_PERMISSIONS_FALLBACK: Record<string, string[]> = {
 "Utilisateur": ["create ticket", "view own tickets", "reopen ticket"],
 "Secrétaire DSI": ["view all tickets", "assign ticket", "manage tickets"],
 "Adjoint DSI": ["view delegated tickets", "assign ticket", "view technicians"],
 "Technicien": ["view assigned tickets", "resolve ticket", "add comment"],
 "Technicien (Matériel)": ["view assigned tickets", "resolve ticket", "add comment"],
 "Technicien (Applicatif)": ["view assigned tickets", "resolve ticket", "add comment"],
 "DSI": ["view all tickets", "delegate ticket", "assign ticket"],
 "Admin": ["Toutes"],
 "Administrateur": ["Toutes"]
 };
 const borderColor = "hsl(var(--border))";
 const mutedFg = "hsl(var(--muted-foreground))";
 const fg = "hsl(var(--foreground))";
 const cardBg = "hsl(var(--card))";
 const orange = "hsl(var(--brand-orange))";
 const shieldOrange = "#FF6B00";
 const roleBlue = "#1E3A5F";
 const visiblePerms = 3;
 return (
 <div style={{ background: cardBg, borderRadius: "8px", boxShadow: "0 1px 3px rgba(0,0,0,0.08)", border: `1px solid ${borderColor}`, overflow: "hidden" }}>
   <div style={{ padding: "24px" }}>
     <table style={{ width: "100%", borderCollapse: "collapse" }}>
       <thead>
         <tr style={{ background: "hsl(220, 20%, 97%)", borderBottom: `1px solid ${borderColor}` }}>
           <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, color: fg, fontSize: "14px" }}>Rôle</th>
           <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, color: fg, fontSize: "14px" }}>Description</th>
           <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, color: fg, fontSize: "14px" }}>Permissions</th>
           <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, color: fg, fontSize: "14px" }}>Type</th>
         </tr>
       </thead>
       <tbody>
         {roles.length === 0 ? (
           <tr>
             <td colSpan={4} style={{ textAlign: "center", padding: "48px 16px", color: mutedFg, fontSize: "14px" }}>
               Aucun rôle trouvé
             </td>
           </tr>
         ) : (
           roles.map((role: any) => {
             const perms = (Array.isArray(role.permissions) && role.permissions.length > 0)
               ? role.permissions
               : (ROLES_PERMISSIONS_FALLBACK[role.name] ?? []);
             const isAll = perms.some((p: string) => p === "Toutes");
             const displayPerms = isAll ? ["Toutes"] : perms.slice(0, visiblePerms);
             const extra = isAll ? 0 : Math.max(0, perms.length - visiblePerms);
             return (
               <tr key={role.id} style={{ borderBottom: `1px solid ${borderColor}` }}>
                 <td style={{ padding: "16px 20px", verticalAlign: "middle" }}>
                   <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                     <Shield size={20} color={shieldOrange} strokeWidth={2.5} style={{ flexShrink: 0 }} />
                     <span style={{ color: roleBlue, fontWeight: 600, fontSize: "15px" }}>{role.name}</span>
                   </div>
                 </td>
                 <td style={{ padding: "16px 20px", color: mutedFg, fontSize: "14px", maxWidth: "320px" }}>
                   {role.description || "—"}
                 </td>
                 <td style={{ padding: "16px 20px", verticalAlign: "middle" }}>
                   <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", alignItems: "center" }}>
                     {displayPerms.map((p: string) => (
                       <span
                         key={p}
                         style={{
                           display: "inline-flex",
                           alignItems: "center",
                           gap: "6px",
                           padding: "4px 12px",
                           fontSize: "13px",
                           borderRadius: "9999px",
                           background: "hsl(220, 20%, 96%)",
                           border: `1px solid ${borderColor}`,
                           color: fg
                         }}
                       >
                         {p !== "Toutes" && <Check size={14} color={roleBlue} strokeWidth={2.5} />}
                         {p}
                       </span>
                     ))}
                     {extra > 0 && (
                       <span
                         style={{
                           width: "28px",
                           height: "28px",
                           borderRadius: "50%",
                           background: orange,
                           color: "white",
                           fontSize: "12px",
                           fontWeight: 600,
                           display: "inline-flex",
                           alignItems: "center",
                           justifyContent: "center"
                         }}
                       >
                         +{extra}
                       </span>
                     )}
                   </div>
                 </td>
                 <td style={{ padding: "16px 20px", verticalAlign: "middle" }}>
                   <span
                     style={{
                       display: "inline-block",
                       padding: "4px 16px",
                       borderRadius: "9999px",
                       background: orange,
                       color: "white",
                       fontSize: "13px",
                       fontWeight: 500
                     }}
                   >
                     Système
                   </span>
                 </td>
               </tr>
             );
           })
         )}
       </tbody>
     </table>
     <p style={{ marginTop: "24px", marginBottom: 0, color: mutedFg, fontSize: "14px" }}>
       Les rôles système ne peuvent pas être modifiés. Contactez l'administrateur pour des rôles personnalisés.
     </p>
   </div>
 </div>
 );
}
