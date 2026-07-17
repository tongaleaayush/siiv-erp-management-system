import { Card } from "@/components/ui";

import LoginForm from "../components/LoginForm";
import AuthLayout from "../layouts/AuthLayout";

const LoginPage = () => {
  return (
    <AuthLayout>
      <Card className="p-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-slate-900">
            SIIV ERP
          </h1>

          <p className="mt-2 text-slate-500">
            Sign in to continue
          </p>
        </div>

        <LoginForm />
      </Card>
    </AuthLayout>
  );
};

export default LoginPage;