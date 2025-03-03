
import AcmeLogo from "@/app/components/admin/AcmeLogo";
import LoginForm from "@/app/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <main className="flex item-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:mt-16">
        <div className="flex h-20 w-full items-end rounded-lg bg-blue-500 p-3">
          <div className="w-32 text-white md:w-36">
            <AcmeLogo />
          </div>
        </div>
        <LoginForm />
      </div>
    </main>
  );
}