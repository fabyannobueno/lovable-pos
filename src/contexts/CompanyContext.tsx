import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./AuthContext";

export type CompanyRole = "owner" | "manager" | "cashier" | "waiter" | "kitchen";

export interface Company {
  id: string;
  name: string;
  business_type: string;
  document: string | null;
  logo_url: string | null;
  role: CompanyRole;
}

interface CompanyContextValue {
  companies: Company[];
  activeCompany: Company | null;
  loading: boolean;
  setActiveCompany: (c: Company) => void;
  refresh: () => Promise<void>;
}

const STORAGE_KEY = "pdv_active_company_id";
const CompanyContext = createContext<CompanyContextValue | undefined>(undefined);

export function CompanyProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [companies, setCompanies] = useState<Company[]>([]);
  const [activeCompany, setActiveCompanyState] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    if (!user) {
      setCompanies([]);
      setActiveCompanyState(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    const { data, error } = await supabase
      .from("company_members")
      .select("role, companies:company_id (id, name, business_type, document, logo_url)")
      .eq("user_id", user.id);

    if (error || !data) {
      setCompanies([]);
      setLoading(false);
      return;
    }

    const list: Company[] = data
      .filter((row: any) => row.companies)
      .map((row: any) => ({
        id: row.companies.id,
        name: row.companies.name,
        business_type: row.companies.business_type,
        document: row.companies.document,
        logo_url: row.companies.logo_url,
        role: row.role as CompanyRole,
      }));

    setCompanies(list);

    const savedId = localStorage.getItem(STORAGE_KEY);
    const found = list.find((c) => c.id === savedId) ?? list[0] ?? null;
    setActiveCompanyState(found);
    setLoading(false);
  }, [user]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const setActiveCompany = (c: Company) => {
    localStorage.setItem(STORAGE_KEY, c.id);
    setActiveCompanyState(c);
  };

  return (
    <CompanyContext.Provider value={{ companies, activeCompany, loading, setActiveCompany, refresh }}>
      {children}
    </CompanyContext.Provider>
  );
}

export function useCompany() {
  const ctx = useContext(CompanyContext);
  if (!ctx) throw new Error("useCompany must be used within CompanyProvider");
  return ctx;
}