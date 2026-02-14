/**
 * Section Sécurité du dashboard DSI/Admin.
 * Paramètres : Authentification, Mot de passe, Audit et Logging.
 */

export type SecuritySettings = {
  mfaRequired: boolean;
  sessionTimeout: number;
  connectionHistory: boolean;
  suspiciousConnectionAlerts: boolean;
  minPasswordLength: number;
  requireUppercase: boolean;
  requireLowercase: boolean;
  requireNumbers: boolean;
  requireSpecialChars: boolean;
  passwordExpiration: number;
  recordAllActions: boolean;
  recordSensitiveDataChanges: boolean;
  recordFailedLogins: boolean;
  keepLogsFor: number;
};

export type SecuriteSectionProps = {
  securitySettings: SecuritySettings;
  setSecuritySettings: (v: SecuritySettings | ((prev: SecuritySettings) => SecuritySettings)) => void;
  handleSaveSecurity: () => void;
  handleCancelSecurity: () => void;
};

export function SecuriteSection({
  securitySettings,
  setSecuritySettings,
  handleSaveSecurity,
  handleCancelSecurity,
}: SecuriteSectionProps) {
  return (
    <div style={{ padding: "24px 24px 24px 0" }}>
      {/* Section Authentification */}
      <div
        style={{
          marginBottom: "32px",
          border: "1px solid #ddd",
          borderRadius: "8px",
          padding: "24px",
          background: "white",
        }}
      >
        <h3 style={{ marginBottom: "20px", fontSize: "20px", fontWeight: "600", color: "#333" }}>
          Authentification
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <label style={{ display: "flex", alignItems: "center", gap: "12px", cursor: "pointer" }}>
            <input
              type="checkbox"
              checked={securitySettings.mfaRequired}
              onChange={(e) =>
                setSecuritySettings({ ...securitySettings, mfaRequired: e.target.checked })
              }
              style={{ width: "18px", height: "18px", cursor: "pointer" }}
            />
            <span style={{ color: "#333", fontSize: "14px" }}>
              Authentification Multi-Facteurs (MFA) obligatoire
            </span>
          </label>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{ color: "#333", fontSize: "14px" }}>Expiration de session après</span>
            <input
              type="number"
              min={1}
              value={securitySettings.sessionTimeout}
              onChange={(e) =>
                setSecuritySettings({
                  ...securitySettings,
                  sessionTimeout: parseInt(e.target.value) || 30,
                })
              }
              style={{
                width: "80px",
                padding: "8px 12px",
                border: "1px solid #ddd",
                borderRadius: "4px",
                fontSize: "14px",
                textAlign: "center",
              }}
            />
            <span style={{ color: "#007bff", fontSize: "14px", fontWeight: "500" }}>
              {securitySettings.sessionTimeout}
            </span>
            <span style={{ color: "#333", fontSize: "14px" }}>minutes d&apos;inactivité</span>
          </div>
          <label style={{ display: "flex", alignItems: "center", gap: "12px", cursor: "pointer" }}>
            <input
              type="checkbox"
              checked={securitySettings.connectionHistory}
              onChange={(e) =>
                setSecuritySettings({ ...securitySettings, connectionHistory: e.target.checked })
              }
              style={{ width: "18px", height: "18px", cursor: "pointer" }}
            />
            <span style={{ color: "#333", fontSize: "14px" }}>Historique des connexions</span>
          </label>
          <label style={{ display: "flex", alignItems: "center", gap: "12px", cursor: "pointer" }}>
            <input
              type="checkbox"
              checked={securitySettings.suspiciousConnectionAlerts}
              onChange={(e) =>
                setSecuritySettings({
                  ...securitySettings,
                  suspiciousConnectionAlerts: e.target.checked,
                })
              }
              style={{ width: "18px", height: "18px", cursor: "pointer" }}
            />
            <span style={{ color: "#333", fontSize: "14px" }}>
              Alertes de connexion suspecte
            </span>
          </label>
        </div>
      </div>

      {/* Section Mot de Passe */}
      <div
        style={{
          marginBottom: "32px",
          border: "1px solid #ddd",
          borderRadius: "8px",
          padding: "24px",
          background: "white",
        }}
      >
        <h3 style={{ marginBottom: "20px", fontSize: "20px", fontWeight: "600", color: "#333" }}>
          Mot de Passe
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span
              style={{
                color: "#007bff",
                fontSize: "14px",
                fontWeight: "500",
                minWidth: "180px",
              }}
            >
              Longueur minimale :
            </span>
            <input
              type="number"
              min={1}
              value={securitySettings.minPasswordLength}
              onChange={(e) =>
                setSecuritySettings({
                  ...securitySettings,
                  minPasswordLength: parseInt(e.target.value) || 8,
                })
              }
              style={{
                width: "80px",
                padding: "8px 12px",
                border: "1px solid #ddd",
                borderRadius: "4px",
                fontSize: "14px",
                textAlign: "center",
              }}
            />
            <span style={{ color: "#007bff", fontSize: "14px", fontWeight: "500" }}>
              {securitySettings.minPasswordLength}
            </span>
            <span style={{ color: "#333", fontSize: "14px" }}>caractères</span>
          </div>
          <label style={{ display: "flex", alignItems: "center", gap: "12px", cursor: "pointer" }}>
            <input
              type="checkbox"
              checked={securitySettings.requireUppercase}
              onChange={(e) =>
                setSecuritySettings({ ...securitySettings, requireUppercase: e.target.checked })
              }
              style={{ width: "18px", height: "18px", cursor: "pointer" }}
            />
            <span style={{ color: "#333", fontSize: "14px" }}>Exiger des majuscules</span>
          </label>
          <label style={{ display: "flex", alignItems: "center", gap: "12px", cursor: "pointer" }}>
            <input
              type="checkbox"
              checked={securitySettings.requireLowercase}
              onChange={(e) =>
                setSecuritySettings({ ...securitySettings, requireLowercase: e.target.checked })
              }
              style={{ width: "18px", height: "18px", cursor: "pointer" }}
            />
            <span style={{ color: "#333", fontSize: "14px" }}>Exiger des minuscules</span>
          </label>
          <label style={{ display: "flex", alignItems: "center", gap: "12px", cursor: "pointer" }}>
            <input
              type="checkbox"
              checked={securitySettings.requireNumbers}
              onChange={(e) =>
                setSecuritySettings({ ...securitySettings, requireNumbers: e.target.checked })
              }
              style={{ width: "18px", height: "18px", cursor: "pointer" }}
            />
            <span style={{ color: "#333", fontSize: "14px" }}>Exiger des chiffres</span>
          </label>
          <label style={{ display: "flex", alignItems: "center", gap: "12px", cursor: "pointer" }}>
            <input
              type="checkbox"
              checked={securitySettings.requireSpecialChars}
              onChange={(e) =>
                setSecuritySettings({
                  ...securitySettings,
                  requireSpecialChars: e.target.checked,
                })
              }
              style={{ width: "18px", height: "18px", cursor: "pointer" }}
            />
            <span style={{ color: "#333", fontSize: "14px" }}>
              Exiger des caractères spéciaux
            </span>
          </label>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span
              style={{
                color: "#007bff",
                fontSize: "14px",
                fontWeight: "500",
                minWidth: "180px",
              }}
            >
              Expiration du mot de passe :
            </span>
            <input
              type="number"
              min={1}
              value={securitySettings.passwordExpiration}
              onChange={(e) =>
                setSecuritySettings({
                  ...securitySettings,
                  passwordExpiration: parseInt(e.target.value) || 90,
                })
              }
              style={{
                width: "80px",
                padding: "8px 12px",
                border: "1px solid #ddd",
                borderRadius: "4px",
                fontSize: "14px",
                textAlign: "center",
              }}
            />
            <span style={{ color: "#007bff", fontSize: "14px", fontWeight: "500" }}>
              {securitySettings.passwordExpiration}
            </span>
            <span style={{ color: "#333", fontSize: "14px" }}>jours</span>
          </div>
        </div>
      </div>

      {/* Section Audit et Logging */}
      <div
        style={{
          marginBottom: "32px",
          border: "1px solid #ddd",
          borderRadius: "8px",
          padding: "24px",
          background: "white",
        }}
      >
        <h3 style={{ marginBottom: "20px", fontSize: "20px", fontWeight: "600", color: "#333" }}>
          Audit et Logging
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <label style={{ display: "flex", alignItems: "center", gap: "12px", cursor: "pointer" }}>
            <input
              type="checkbox"
              checked={securitySettings.recordAllActions}
              onChange={(e) =>
                setSecuritySettings({ ...securitySettings, recordAllActions: e.target.checked })
              }
              style={{ width: "18px", height: "18px", cursor: "pointer" }}
            />
            <span style={{ color: "#333", fontSize: "14px" }}>
              Enregistrer toutes les actions
            </span>
          </label>
          <label style={{ display: "flex", alignItems: "center", gap: "12px", cursor: "pointer" }}>
            <input
              type="checkbox"
              checked={securitySettings.recordSensitiveDataChanges}
              onChange={(e) =>
                setSecuritySettings({
                  ...securitySettings,
                  recordSensitiveDataChanges: e.target.checked,
                })
              }
              style={{ width: "18px", height: "18px", cursor: "pointer" }}
            />
            <span style={{ color: "#333", fontSize: "14px" }}>
              Enregistrer les modifications de données sensibles
            </span>
          </label>
          <label style={{ display: "flex", alignItems: "center", gap: "12px", cursor: "pointer" }}>
            <input
              type="checkbox"
              checked={securitySettings.recordFailedLogins}
              onChange={(e) =>
                setSecuritySettings({
                  ...securitySettings,
                  recordFailedLogins: e.target.checked,
                })
              }
              style={{ width: "18px", height: "18px", cursor: "pointer" }}
            />
            <span style={{ color: "#333", fontSize: "14px" }}>
              Enregistrer les tentatives de connexion échouées
            </span>
          </label>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span
              style={{
                color: "#007bff",
                fontSize: "14px",
                fontWeight: "500",
                minWidth: "200px",
              }}
            >
              Conserver les logs pendant :
            </span>
            <input
              type="number"
              min={1}
              value={securitySettings.keepLogsFor}
              onChange={(e) =>
                setSecuritySettings({
                  ...securitySettings,
                  keepLogsFor: parseInt(e.target.value) || 90,
                })
              }
              style={{
                width: "80px",
                padding: "8px 12px",
                border: "1px solid #ddd",
                borderRadius: "4px",
                fontSize: "14px",
                textAlign: "center",
              }}
            />
            <span style={{ color: "#007bff", fontSize: "14px", fontWeight: "500" }}>
              {securitySettings.keepLogsFor}
            </span>
            <span style={{ color: "#333", fontSize: "14px" }}>jours</span>
          </div>
        </div>
      </div>

      {/* Boutons d'action */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: "12px",
          marginTop: "32px",
          paddingTop: "24px",
          borderTop: "1px solid #eee",
        }}
      >
        <button
          onClick={handleCancelSecurity}
          style={{
            padding: "10px 20px",
            backgroundColor: "#6c757d",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "14px",
          }}
        >
          [Annuler]
        </button>
        <button
          onClick={handleSaveSecurity}
          style={{
            padding: "10px 20px",
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "14px",
          }}
        >
          [Enregistrer]
        </button>
      </div>
    </div>
  );
}
