export const assetStatusLabels: Record<string, string> = {
  in_service: "En service",
  en_maintenance: "En maintenance",
  en_panne: "En panne",
  en_stock: "En stock",
  reformes: "Réformés",
};

export const assetStatusColors: Record<
  string,
  { badgeBg: string; badgeBorder: string; badgeText: string; chipBg: string; chipText: string }
> = {
  in_service: {
    badgeBg: "rgba(16, 185, 129, 0.1)",
    badgeBorder: "rgba(16, 185, 129, 0.3)",
    badgeText: "#047857",
    chipBg: "rgba(16, 185, 129, 0.1)",
    chipText: "#047857",
  },
  en_maintenance: {
    badgeBg: "rgba(245, 158, 11, 0.08)",
    badgeBorder: "rgba(245, 158, 11, 0.3)",
    badgeText: "#92400e",
    chipBg: "rgba(245, 158, 11, 0.08)",
    chipText: "#92400e",
  },
  en_panne: {
    badgeBg: "rgba(248, 113, 113, 0.12)",
    badgeBorder: "rgba(248, 113, 113, 0.3)",
    badgeText: "#b91c1c",
    chipBg: "rgba(248, 113, 113, 0.12)",
    chipText: "#b91c1c",
  },
  en_stock: {
    badgeBg: "rgba(59, 130, 246, 0.06)",
    badgeBorder: "rgba(59, 130, 246, 0.3)",
    badgeText: "#1d4ed8",
    chipBg: "rgba(59, 130, 246, 0.06)",
    chipText: "#1d4ed8",
  },
  reformes: {
    badgeBg: "rgba(148, 163, 184, 0.12)",
    badgeBorder: "rgba(148, 163, 184, 0.4)",
    badgeText: "#4b5563",
    chipBg: "rgba(148, 163, 184, 0.12)",
    chipText: "#4b5563",
  },
};

export const assetTypeLabels: Record<string, string> = {
  desktop: "Ordinateur fixe",
  laptop: "Ordinateur portable",
  printer: "Imprimante",
  monitor: "Écran",
  mobile: "Mobile",
  tablet: "Tablette",
  phone: "Téléphone",
  network: "Équipement réseau",
  keyboard: "Clavier",
  mouse: "Souris",
  other: "Autre",
};
