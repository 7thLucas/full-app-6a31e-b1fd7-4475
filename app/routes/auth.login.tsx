import { redirect } from "react-router";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "react-router";
import { getUserFromRequest, signJwt, buildAuthCookie } from "~/modules/authentication/authentication.server";
import { AuthService } from "~/modules/authentication/authentication.service";
import { LoginCard } from "~/modules/authentication";
import { useConfigurables } from "~/modules/configurables";

export async function loader({ request }: LoaderFunctionArgs) {
  if (getUserFromRequest(request)) return redirect("/");
  return null;
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  try {
    const user = await AuthService.login({
      email: String(formData.get("email") ?? ""),
      password: String(formData.get("password") ?? ""),
    });
    const token = signJwt({ sub: user.id, role: user.role, username: user.username, email: user.email });
    return redirect("/", { headers: { "Set-Cookie": buildAuthCookie(token, new URL(request.url).hostname) } });
  } catch (error: any) {
    return { error: error.message ?? "Invalid credentials" };
  }
}

export default function LoginRoute() {
  const { config, loading } = useConfigurables();
  const appName = loading ? "PawHub" : (config?.appName ?? "PawHub");
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "#FAFAF8" }}>
      <div className="w-full max-w-md px-4">
        <div className="text-center mb-8">
          <div className="text-4xl mb-2">🐾</div>
          <h1 className="text-3xl font-bold" style={{ color: "#FF6B35" }}>{appName}</h1>
          <p className="text-gray-500 mt-1">Welcome back! Sign in to your account.</p>
        </div>
        <LoginCard />
        <p className="text-center mt-4 text-sm text-gray-500">
          Don't have an account?{" "}
          <a href="/auth/register" style={{ color: "#FF6B35" }} className="font-medium hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
