import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useCompany } from "@/contexts/CompanyContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Logo } from "@/components/Logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { toast } from "sonner";
import { Loader2, Store, UtensilsCrossed, ShoppingBasket, Truck, Bike, ShoppingBag, Package } from "lucide-react";

const BUSINESS_TYPES = [
  { value: "restaurant", label: "Restaurante", icon: UtensilsCrossed },
  { value: "snack_bar", label: "Lanchonete", icon: ShoppingBag },
  { value: "market", label: "Mercado", icon: ShoppingBasket },
  { value: "distributor", label: "Distribuidora", icon: Truck },
  { value: "delivery", label: "Delivery", icon: Bike },
  { value: "retail", label: "Loja física", icon: Store },
  { value: "other", label: "Outro", icon: Package },
];

export default function Onboarding() {
  const { user } = useAuth();
  const { refresh, setActiveCompany } = useCompany();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [businessType, setBusinessType] = useState("restaurant");
  const [document, setDocument] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setLoading(true);

    const { data, error } = await supabase
      .from("companies")
      .insert({
        name: name.trim(),
        business_type: businessType as any,
        document: document.trim() || null,
        created_by: user.id,
      })
      .select()
      .single();

    setLoading(false);

    if (error || !data) {
      toast.error(error?.message || "Erro ao criar empresa");
      return;
    }

    toast.success("Empresa criada com sucesso!");
    await refresh();
    setActiveCompany({
      id: data.id,
      name: data.name,
      business_type: data.business_type,
      document: data.document,
      logo_url: data.logo_url,
      role: "owner",
    });
    navigate("/", { replace: true });
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <header className="flex items-center justify-between border-b border-border/60 bg-background/50 px-6 py-4 backdrop-blur">
        <Logo />
        <ThemeToggle />
      </header>

      <main className="mx-auto max-w-2xl px-4 py-16 sm:py-24">
        <div className="mb-8 space-y-3 text-center animate-fade-in">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-medium text-muted-foreground">
            Passo 1 de 1
          </div>
          <h1 className="text-4xl font-bold tracking-tight">Vamos configurar seu negócio</h1>
          <p className="text-muted-foreground">Em menos de 1 minuto você estará vendendo.</p>
        </div>

        <Card className="shadow-elev-lg animate-scale-in">
          <CardHeader>
            <CardTitle>Sua empresa</CardTitle>
            <CardDescription>Você pode alterar essas informações depois nas configurações.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="name">Nome da empresa *</Label>
                <Input id="name" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Ex: Lanchonete da Praça" />
              </div>

              <div className="space-y-2">
                <Label>Tipo de negócio *</Label>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {BUSINESS_TYPES.map((b) => {
                    const Icon = b.icon;
                    const active = businessType === b.value;
                    return (
                      <button
                        key={b.value}
                        type="button"
                        onClick={() => setBusinessType(b.value)}
                        className={`group flex flex-col items-center gap-2 rounded-xl border p-3 text-xs font-medium transition-all ${
                          active
                            ? "border-primary bg-primary/10 text-primary shadow-elev-sm"
                            : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground"
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                        {b.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="document">CNPJ / CPF (opcional)</Label>
                <Input id="document" value={document} onChange={(e) => setDocument(e.target.value)} placeholder="00.000.000/0000-00" />
              </div>

              <Button type="submit" className="w-full" size="lg" disabled={loading || !name.trim()}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Criar empresa e continuar
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}