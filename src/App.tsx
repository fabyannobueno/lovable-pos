import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/contexts/AuthContext";
import { CompanyProvider } from "@/contexts/CompanyContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { AppLayout } from "@/components/app/AppLayout";
import Dashboard from "./pages/Dashboard";
import Auth from "./pages/Auth";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Onboarding from "./pages/Onboarding";
import ComingSoon from "./pages/ComingSoon";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner position="top-right" richColors />
        <BrowserRouter>
          <AuthProvider>
            <CompanyProvider>
              <Routes>
                <Route path="/auth" element={<Auth />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route
                  path="/onboarding"
                  element={
                    <ProtectedRoute>
                      <Onboarding />
                    </ProtectedRoute>
                  }
                />
                <Route
                  element={
                    <ProtectedRoute>
                      <AppLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/pdv" element={<ComingSoon title="Frente de Caixa (PDV)" description="Venda rápida com leitura de código de barras, múltiplas formas de pagamento e impressão de cupom. Implementação na Fase 3." />} />
                  <Route path="/comandas" element={<ComingSoon title="Comandas e Mesas" description="Gestão de comandas abertas, mesas e delivery. Implementação na Fase 4." />} />
                  <Route path="/kds" element={<ComingSoon title="KDS — Cozinha" description="Tela de pedidos em tempo real para cozinha e bar. Implementação na Fase 4." />} />
                  <Route path="/produtos" element={<ComingSoon title="Produtos" description="Cadastro completo com custo, preço, margem, markup, estoque, variações e ficha técnica. Implementação na Fase 2 (próxima!)." />} />
                  <Route path="/clientes" element={<ComingSoon title="Clientes" description="Cadastro, histórico, fidelidade e crédito interno. Implementação na Fase 5." />} />
                  <Route path="/financeiro" element={<ComingSoon title="Financeiro" description="Controle de caixa, entradas, saídas, sangria e fluxo. Implementação na Fase 5." />} />
                  <Route path="/relatorios" element={<ComingSoon title="Relatórios" description="Vendas, lucro, CMV, produtos mais rentáveis. Implementação na Fase 5." />} />
                  <Route path="/configuracoes" element={<ComingSoon title="Configurações" description="Empresa, equipe, impostos, integrações e preferências." />} />
                </Route>
                <Route path="*" element={<NotFound />} />
              </Routes>
            </CompanyProvider>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
