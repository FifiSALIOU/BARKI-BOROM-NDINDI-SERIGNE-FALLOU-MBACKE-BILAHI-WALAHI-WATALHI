const fs = require("fs");
const path = require("path");

const DSI_PATH = path.join(__dirname, "../src/pages/DSIDashboard.tsx");
const ADMIN_PATH = path.join(__dirname, "../src/pages/AdminDashboard.tsx");
const SECTIONS_DIR = path.join(__dirname, "../src/components/dashboard");

// Define sections to extract: { name, startMarker, endMarker, replacement }
const SECTIONS = [
  {
    name: "PrioritesSection",
    file: "PrioritesSection.tsx",
    startMarker: '          {activeSection === "priorites" && (',
    endMarker: '          {activeSection === "email" && (',
    cond: 'activeSection === "priorites"',
    replacement: `          {activeSection === "priorites" && (
            <PrioritesSection
              token={token}
              prioritiesFromDb={prioritiesFromDb}
              loadingPrioritiesFromDb={loadingPrioritiesFromDb}
              loadPrioritiesFromDb={loadPrioritiesFromDb}
              addPriorityForm={addPriorityForm}
              setAddPriorityForm={setAddPriorityForm}
              showAddPriorityFromDbModal={showAddPriorityFromDbModal}
              setShowAddPriorityFromDbModal={setShowAddPriorityFromDbModal}
              editingPriorityFromDb={editingPriorityFromDb}
              setEditingPriorityFromDb={setEditingPriorityFromDb}
              editPriorityForm={editPriorityForm}
              setEditPriorityForm={setEditPriorityForm}
              showAddPriorityModal={showAddPriorityModal}
              setShowAddPriorityModal={setShowAddPriorityModal}
              editingPriority={editingPriority}
              setEditingPriority={setEditingPriority}
              newPriority={newPriority}
              setNewPriority={setNewPriority}
              handleAddPriority={handleAddPriority}
              handleUpdatePriority={handleUpdatePriority}
            />
          )}

`,
  },
  {
    name: "TechniciensSection",
    file: "TechniciensSection.tsx",
    startMarker: '          {activeSection === "technicians" && userRole !== "Admin" && (',
    endMarker: '          {activeSection === "apparence" && (',
    cond: 'activeSection === "technicians" && userRole !== "Admin"',
    replacement: `          {activeSection === "technicians" && userRole !== "Admin" && (
            <TechniciensSection
              token={token}
              allUsers={allUsers}
              technicians={technicians}
              setTechnicians={setTechnicians}
              showDeleteConfirmModal={showDeleteConfirmModal}
              setShowDeleteConfirmModal={setShowDeleteConfirmModal}
              technicianToDelete={technicianToDelete}
              setTechnicianToDelete={setTechnicianToDelete}
            />
          )}

`,
  },
  {
    name: "GroupesSection",
    file: "GroupesSection.tsx",
    startMarker: '           {activeSection === "groupes" && (() => {',
    endMarker: '           {activeSection === "users" && (() => {',
    iife: true,
    replacement: `           {activeSection === "groupes" && (
            <GroupesSection
              allUsers={allUsers}
              expandedGroupId={expandedGroupId}
              setExpandedGroupId={setExpandedGroupId}
            />
          )}

`,
  },
  {
    name: "UsersSection",
    file: "UsersSection.tsx",
    startMarker: '           {activeSection === "users" && (() => {',
    endMarker: '          {activeSection === "roles" && (() => {',
    iife: true,
    replacement: `           {activeSection === "users" && (
            <UsersSection
              allUsers={allUsers}
              userRoleFilter={userRoleFilter}
              setUserRoleFilter={setUserRoleFilter}
              userStatusFilter={userStatusFilter}
              setUserStatusFilter={setUserStatusFilter}
              userAgencyFilter={userAgencyFilter}
              setUserAgencyFilter={setUserAgencyFilter}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              usersPerPage={usersPerPage}
              setUsersPerPage={setUsersPerPage}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              setShowAddUserModal={setShowAddUserModal}
              token={token}
              loadAllUsers={loadAllUsers}
            />
          )}

`,
  },
  {
    name: "RolesSection",
    file: "RolesSection.tsx",
    startMarker: '          {activeSection === "roles" && (() => {',
    endMarker: '          {activeSection === "categories" && (userRole === "Admin" || userRole === "DSI") && (',
    iife: true,
    replacement: `          {activeSection === "roles" && (
            <RolesSection roles={roles} />
          )}

`,
  },
];

function extractBlock(content, startMarker, endMarker) {
  const start = content.indexOf(startMarker);
  if (start < 0) return null;
  const end = content.indexOf(endMarker, start);
  if (end <= start) return null;
  return { start, end, block: content.substring(start, end) };
}

function run() {
  for (const sec of SECTIONS) {
    const content = fs.readFileSync(DSI_PATH, "utf8");
    const result = extractBlock(content, sec.startMarker, sec.endMarker);
    if (!result) {
      console.log(`[SKIP] ${sec.name}: markers not found`);
      continue;
    }
    const block = result.block;
    let inner, componentContent;

    if (sec.iife) {
      // IIFE: extract body from (() => { to })()}
      const iifeStart = block.indexOf("(() => {") + 8;
      const iifeEnd = block.lastIndexOf("})()}");
      if (iifeStart < 8 || iifeEnd < 0) {
        console.log(`[SKIP] ${sec.name}: could not find IIFE body`);
        continue;
      }
      inner = block.substring(iifeStart, iifeEnd).trim();
      // Unindent: remove 11 leading spaces from each line
      inner = inner.split("\n").map((line) => (line.startsWith("             ") ? line.slice(13) : line.startsWith("           ") ? line.slice(11) : line)).join("\n");
      const propsConfig = {
        GroupesSection: "allUsers, expandedGroupId, setExpandedGroupId",
        UsersSection: "allUsers, userRoleFilter, setUserRoleFilter, userStatusFilter, setUserStatusFilter, userAgencyFilter, setUserAgencyFilter, searchQuery, setSearchQuery, usersPerPage, setUsersPerPage, currentPage, setCurrentPage, setShowAddUserModal, token, loadAllUsers",
        RolesSection: "roles",
      };
      const propsDestructure = propsConfig[sec.name] || "";
      const imports = {
        GroupesSection: "import { Shield, Wrench, Monitor, UserCheck, User, Mail, Building2, ChevronDown, ChevronRight } from \"lucide-react\";",
        UsersSection: "import { Plus, Search } from \"lucide-react\";",
        RolesSection: "import { Shield, Check } from \"lucide-react\";",
      };
      const propsType = propsDestructure.split(", ").map((p) => `${p}: any`).join(";\n  ");
      componentContent = `/**
 * Section ${sec.name.replace("Section", "")} du dashboard DSI/Admin.
 */

${imports[sec.name] || ""}

export type ${sec.name}Props = {
  ${propsType};
};

export function ${sec.name}(props: ${sec.name}Props) {
  const { ${propsDestructure} } = props;
  ${inner}
}
`;
      fs.writeFileSync(path.join(SECTIONS_DIR, sec.file), componentContent);
      console.log(`[OK] ${sec.name} component file created`);
    } else {
      // Regular section: extract div content
      const innerStart = block.indexOf("<div");
      const innerEnd = block.lastIndexOf("</div>");
      if (innerStart < 0 || innerEnd < 0) {
        console.log(`[SKIP] ${sec.name}: could not find div`);
        continue;
      }
      inner = block.substring(innerStart, innerEnd + 6);
      inner = inner.split("\n").map((line) => (line.startsWith("            ") ? line.slice(10) : line)).join("\n");
      componentContent = `/**
 * Section ${sec.name.replace("Section", "")} du dashboard DSI/Admin.
 */

import { Users, Wrench, Briefcase, Clock, CheckCircle2, AlertTriangle } from "lucide-react";

export type ${sec.name}Props = {
  token: string;
  allUsers: any[];
  technicians: any[];
  setTechnicians: (v: any[]) => void;
  showDeleteConfirmModal: boolean;
  setShowDeleteConfirmModal: (v: boolean) => void;
  technicianToDelete: any | null;
  setTechnicianToDelete: (v: any | null) => void;
};

export function ${sec.name}(props: ${sec.name}Props) {
  const {
    token,
    allUsers,
    technicians,
    setTechnicians,
    showDeleteConfirmModal,
    setShowDeleteConfirmModal,
    technicianToDelete,
    setTechnicianToDelete,
  } = props;
  return (
${inner.split("\n").map((l) => "    " + l).join("\n")}
  );
}
`;

    if (sec.name === "PrioritesSection") {
      // PrioritesSection has different props
      const prioContent = `/**
 * Section Priorités du dashboard DSI/Admin.
 */

export type PrioritiesFromDb = {
  id: number;
  code: string;
  label: string;
  color_hex: string | null;
  background_hex: string | null;
  display_order: number;
  is_active: boolean;
};

export type PrioritesSectionProps = {
  token: string;
  prioritiesFromDb: PrioritiesFromDb[];
  loadingPrioritiesFromDb: boolean;
  loadPrioritiesFromDb: () => void;
  addPriorityForm: { code: string; label: string; color_hex: string; background_hex: string; display_order: number };
  setAddPriorityForm: (v: PrioritesSectionProps["addPriorityForm"]) => void;
  showAddPriorityFromDbModal: boolean;
  setShowAddPriorityFromDbModal: (v: boolean) => void;
  editingPriorityFromDb: PrioritiesFromDb | null;
  setEditingPriorityFromDb: (v: PrioritiesFromDb | null) => void;
  editPriorityForm: { label: string; color_hex: string; background_hex: string };
  setEditPriorityForm: (v: PrioritesSectionProps["editPriorityForm"]) => void;
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
${inner.split("\n").map((l) => "    " + l).join("\n")}
  );
}
`;
      fs.writeFileSync(path.join(SECTIONS_DIR, sec.file), prioContent);
    } else {
      fs.writeFileSync(path.join(SECTIONS_DIR, sec.file), componentContent);
    }
    }

    // Replace in both dashboards
    for (const filePath of [DSI_PATH, ADMIN_PATH]) {
      let c = fs.readFileSync(filePath, "utf8");
      const r = extractBlock(c, sec.startMarker, sec.endMarker);
      if (r) {
        c = c.substring(0, r.start) + sec.replacement + c.substring(r.end);
        fs.writeFileSync(filePath, c);
        console.log(`[OK] ${sec.name} replaced in ${path.basename(filePath)}`);
      }
    }
  }
  console.log("Done.");
}

run();
