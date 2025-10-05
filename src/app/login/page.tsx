"use client";
import Image from "next/image";
import BgImage from "@/assets/icons/login_bg.svg";
import Heading from "@/components/layout/Heading";
import Logo from "@/assets/icons/bed_bureau_icon.svg";

import { LoginFields } from "@/data/fields";
import FormField from "@/components/forms/FormField";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { generateSchema } from "@/lib/SchemaGenerator";
import { Button } from "@/components/ui/button";
import PageTitle from "@/components/layout/PageTittle";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import { adminLogin } from "@/store/actions/adminAction";
import toast from "react-hot-toast";

const schema = generateSchema(LoginFields);
type FormData = z.infer<typeof schema>;

export default function Page() {
  const router = useRouter();

  const dispatch = useDispatch<AppDispatch>();
  const { isLoader, error, isAdminLoggedIn } = useSelector(
    (state: RootState) => state.admin
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "all",
  });

  const submit = async (data: FormData) => {
    try {
      // Ensure data matches LoginPayload type
      const loginPayload = {
        email: String(data.email),
        password: String(data.password),
      };
      const result = await dispatch(adminLogin(loginPayload)).unwrap();
      toast.success("Login successful!"); // ✅ success toast
      router.push("/manage-client"); // Redirect to manage-client
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Login failed";
      toast.error(errorMessage); // ❌ error toast
    }
  };

  return (
    <div className="relative h-screen bg-app-bg flex md:px-20 md:items-center ">
      <Image src={Logo} alt="logo" className="absolute top-5 left md:left-25" />
      <div className="flex-1 hidden md:flex flex-col items-center justify-center">
        <span className="text-4xl m-5">
          Welcom to
          <br />
          <span className="font-semibold text-[#684ABC]">Bed Bureau</span>
        </span>
        <Image src={BgImage} alt="bg-image" />
      </div>

      <div className="flex flex-col md:h-full gap-y-5 p-5 w-full md:w-fit py-20 md:items-end  md:justify-center">
        <PageTitle className="md:hidden" />
        <form
          onSubmit={handleSubmit(submit)}
          className="flex flex-col bg-white md:p-20 border p-5 space-y-2 md:space-y-6 w-full md:w-125 rounded-lg shadow-[0px_4px_15px_0px_#DFE5F0]"
        >
          {LoginFields.map((field, index) => (
            <FormField
              key={index}
              type={field.type}
              placeholder={field.placeholder}
              label={field.label}
              {...register(field.name)}
              error={errors[field.name]?.message}
              forget={field?.forgetPassword}
            />
          ))}
          <Button type="submit" variant="appBtn" className="w-full mt-4">
            Login
          </Button>
        </form>
      </div>
    </div>
  );
}
