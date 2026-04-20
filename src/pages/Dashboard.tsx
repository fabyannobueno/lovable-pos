import { useCompany } from "@/contexts/CompanyContext";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  Package,
  Users,
  TrendingUp,
  ArrowRight,
  ClipboardList,
  Wallet,
  BarChart3,
  CheckCircle2,
  Circle,
} from "lucide-react";

const businessLabels: Record<string, string> = {
  restaurant: "Restaurante",
  snack_bar: "Lanchonete",
  market: "Mercado",
  distributor: "Distribuidora",
  delivery: "Delivery",
  retail: "Loja física",
  other: "Outro",
};

const stats = [
  { label: "Vendas hoje", value: "R$ 0,00", icon: ShoppingCart, tone: "text-primary" },
  { label: "Pedidos", value: "0", icon: ClipboardList, tone: "text-accent" },
  { label: "Clientes", value: "0", icon: Users, tone: "text-primary" },
  { label: "Ticket médio", value: "R$ 0,00", icon: TrendingUp, tone: "text-accent" },
];

const quickLinks = [
  { title: "Abrir PDV", desc: "Comece a vender agora", icon: ShoppingCart, to: "/pdv", primary: true },
  { title: "Cadastrar produtos", desc: "Com cálculo automático de margem", icon: Package, to: "/produtos" },
  { title: "Abrir comandas", desc: "Mesas e pedidos", icon: ClipboardList, to: "/comandas" },
  { title: "Ver relatórios", desc: "Vendas, lucro e CMV", icon: BarChart3, to: "/relatorios" },
];

const onboardingSteps = [
  { label: "Criar empresa", done: true },
  { label: "Cadastrar primeiros produtos", done: false },
  { label: "Abrir o caixa", done: false },
  { label: "Registrar primeira venda", done: false },
];

export default function Dashboard() {
  const { activeCompany } = useCompany();
  const { user } = useAuth();
  const navigate = useNavigate();

  const firstName = (user?.user_metadata?.full_name || "").split(" ")[0];

  return (
    <div className="mx-auto w-full max-w-7xl space-y-8 p-6 md:p-8 animate-fade-in">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl border border-border bg-gradient-subtle p-8">
        <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-gradient-primary opacity-10 blur-3xl" />
        <div className="relative">
          <p className="text-sm font-medium text-muted-foreground">
            Olá{firstName ? `, ${firstName}` : ""} 👋
          </p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">
            {activeCompany?.name}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {activeCompany && businessLabels[activeCompany.business_type]} · Sistema pronto para começar
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label} className="border-border/60">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    {s.label}
                  </p>
                  <p className="mt-2 text-2xl font-bold">{s.value}</p>
                </div>
                <div className={`rounded-lg bg-muted p-2 ${s.tone}`}>
                  <s.icon className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Quick actions */}
        <div className="lg:col-span-2">
          <h2 className="mb-4 text-lg font-semibold">Atalhos rápidos</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {quickLinks.map((l) => (
              <button
                key={l.to}
                onClick={() => navigate(l.to)}
                className={`group flex items-start gap-4 rounded-xl border p-4 text-left transition-all hover:shadow-elev-md ${
                  l.primary
                    ? "border-primary/40 bg-gradient-primary/5 hover:border-primary"
                    : "border-border bg-card hover:border-primary/40"
                }`}
              >
                <div
                  className={`rounded-lg p-2.5 ${
                    l.primary ? "bg-gradient-primary text-primary-foreground shadow-glow" : "bg-muted text-foreground"
                  }`}
                >
                  <l.icon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold">{l.title}</p>
                  <p className="text-sm text-muted-foreground">{l.desc}</p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100" />
              </button>
            ))}
          </div>
        </div>

        {/* Onboarding checklist */}
        <Card className="border-border/60">
          <CardHeader>
            <CardTitle className="text-base">Primeiros passos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {onboardingSteps.map((s) => (
              <div key={s.label} className="flex items-center gap-3">
                {s.done ? (
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" />
                ) : (
                  <Circle className="h-5 w-5 shrink-0 text-muted-foreground" />
                )}
                <span className={`text-sm ${s.done ? "text-muted-foreground line-through" : "font-medium"}`}>
                  {s.label}
                </span>
              </div>
            ))}
            <Button variant="outline" className="mt-4 w-full" onClick={() => navigate("/produtos")}>
              Continuar configuração
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Empty state hint */}
      <Card className="border-dashed">
        <CardContent className="flex flex-col items-center gap-3 p-12 text-center">
          <div className="rounded-full bg-muted p-3">
            <Wallet className="h-6 w-6 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold">Nenhuma venda registrada ainda</h3>
          <p className="max-w-sm text-sm text-muted-foreground">
            Cadastre seus produtos e abra o caixa para começar a vender. Seus relatórios aparecerão aqui.
          </p>
          <Button onClick={() => navigate("/pdv")} className="mt-2">
            <ShoppingCart className="mr-2 h-4 w-4" />
            Abrir frente de caixa
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}