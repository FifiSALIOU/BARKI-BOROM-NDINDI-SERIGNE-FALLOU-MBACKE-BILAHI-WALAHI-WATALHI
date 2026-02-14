export interface Ticket {
  id: string;
  number: number;
  title: string;
  description?: string;
  creator_id?: string;
  creator?: {
    full_name: string;
    email: string;
    agency?: string | null;
  };
  user_agency?: string | null;
  priority: string | null;
  status: string;
  type?: string;
  category?: string | null;
  technician_id?: string | null;
  technician?: {
    full_name: string;
    profile_photo_url?: string | null;
  };
  secretary_id?: string | null;
  created_at?: string;
  assigned_at?: string | null;
  resolved_at?: string | null;
  closed_at?: string | null;
  feedback_score?: number | null;
  attachments?: any;
}

export interface Technician {
  id: string;
  full_name: string;
  email: string;
  specialization?: string | null;
  assigned_tickets_count?: number;
  in_progress_tickets_count?: number;
  agency?: string | null;
  phone?: string | null;
  resolved_tickets_count?: number;
  closed_tickets_count?: number;
  resolved_this_month?: number;
  resolved_today?: number;
  avg_resolution_time_days?: number;
  avg_response_time_minutes?: number;
  actif?: boolean;
  last_login_at?: string | null;
  success_rate?: number;
  workload_ratio?: string;
  is_available?: boolean;
  max_tickets_capacity?: number | null;
  notes?: string | null;
}

export interface Notification {
  id: string;
  type: string;
  message: string;
  read: boolean;
  created_at: string;
  ticket_id?: string | null;
}

export interface TicketHistory {
  id: string;
  ticket_id: string;
  old_status?: string | null;
  new_status: string;
  user_id: string;
  reason?: string | null;
  changed_at: string;
  user?: {
    full_name: string;
  } | null;
}

export interface TicketComment {
  id: number;
  ticket_id: number;
  user_id: number;
  content: string;
  type: string;
  created_at: string;
  user?: { full_name: string } | null;
}

export interface UserRead {
  id?: string;
  full_name: string;
  email: string;
  agency?: string | null;
  status?: string | null;
  role?: {
    name: string;
  } | null;
}

export interface Asset {
  id: number;
  nom: string;
  type: string;
  numero_de_serie: string;
  marque: string;
  modele: string;
  statut: string;
  localisation: string;
  departement: string;
  date_d_achat: string;
  date_de_fin_garantie?: string | null;
  prix_d_achat?: number | null;
  fournisseur?: string | null;
  assigned_to_user_id?: number | null;
  assigned_to_name?: string | null;
  specifications?: any;
  notes?: string | null;
  qr_code?: string | null;
  created_at?: string;
  updated_at?: string;
  created_by?: number | null;
}

export interface AssetTypeConfig {
  id: number;
  code: string;
  label: string;
  is_active: boolean;
}

export interface DepartmentConfig {
  id: number;
  name: string;
  is_active: boolean;
}

export interface AssetFormState {
  nom: string;
  type: string;
  statut: string;
  numero_de_serie: string;
  marque: string;
  modele: string;
  localisation: string;
  departement: string;
  assigned_to_user_id: string;
  date_d_achat: string;
  date_de_fin_garantie: string;
  prix_d_achat: string;
  fournisseur: string;
  notes: string;
}
