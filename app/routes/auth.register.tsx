import { redirect } from "react-router";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "react-router";
import { getUserFromRequest, signJwt, buildAuthCookie } from "~/modules/authentication/authentication.server";
import { AuthService } from "~/modules/authentication/authentication.service";
import { RegisterCard } from "~/modules/authentication";
import { useConfigurables } from "~/modules/configurables";

export async function loader({ request }: LoaderFunctionArgs) {
  if (getUserFromRequest(request)) return redirect("/");
  return null;
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  try {
    const user = await AuthService.register({
      username: String(formData.get("username") ?? ""),
      email: String(formData.get("email") ?? ""),
      password: String(formData.get("password") ?? ""),
    });
    const token = signJwt({ sub: user.id, role: user.role, username: user.username, email: user.email });
    return redirect("/", { headers: { "Set-Cookie": buildAuthCookie(token, new URL(request.url).hostname) } });
  } catch (error: any) {
    return { error: error.message ?? "Registration failed" };
  }
}

export default function RegisterRoute() {
  const { config, loading } = useConfigurables();
  const appName = loading ? "PawHub" : (config?.appName ?? "PawHub");
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "#FAFAF8" }}>
      <div className="w-full max-w-md px-4">
        <div className="text-center mb-8">
          <div className="text-4xl mb-2">🐾</div>
          <h1 className="text-3xl font-bold" style={{ color: "#FF6B35" }}>{appName}</h1>
          <p className="text-gray-500 mt-1">Create your account and start caring for your pets.</p>
        </div>
        <RegisterCard />
        <p className="text-center mt-4 text-sm text-gray-500">
          Already have an account?{" "}
          <a href="/auth/login" style={{ color: "#FF6B35" }} className="font-medium hover:underline">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}
