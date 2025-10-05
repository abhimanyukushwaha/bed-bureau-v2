"use client";
import FormField from "@/components/forms/FormField";
import PageTitle from "@/components/layout/PageTittle";
import SearchField from "@/components/layout/SearchField";
import ClientTable from "@/components/table/ClientTable";
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { AddClientFields as Fields } from "@/data/fields";
import { generateSchema } from "@/lib/SchemaGenerator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const schema = generateSchema(Fields);
type FormData = z.infer<typeof schema>;

export default function Page() {
  const router = useRouter();

  // useEffect(() => {
  //   const auth = localStorage.getItem("authorization");
  //   console.log("Auth Check in Page.tsx:", auth);
  //   if (!auth) {
  //     router.replace("../login"); // client-side safety net
  //   }
  // }, [router]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "all",
  });

  function submit(data: FormData) {
    alert("form submitted successfully...");
    console.table(data);
  }

  return (
    <div className="space-y-6">
      <PageTitle />
      <div className="flex justify-between gap-5">
        <SearchField />

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="appBtn">Add Client</Button>
          </DialogTrigger>
          <DialogContent className="px-0 rounded-lg">
            <DialogHeader>
              <DialogTitle className="text-2xl font-semibold text-center">
                Add Client
              </DialogTitle>
            </DialogHeader>

            <form
              onSubmit={handleSubmit(submit)}
              className="flex flex-col justify-between px-5 md:px-10 pb-4 space-y-6 "
            >
              {Fields.map((field, index) => (
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
              <div>
                <span className="font-bold text-sm">Your Public URL :</span>
                <br />
                <span className="font-medium text-app-primary cursor-pointer">
                  www.bedbureau.com/client/clientname
                </span>
              </div>
              <Button variant="appBtn" className="w-full mt-4">
                Update
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <div className=" bg-white rounded-lg overflow-hidden shadow-[0px_4px_15px_0px_#DFE5F0]">
        {/* table component will go here */}
        <ClientTable />
      </div>
    </div>
  );
}
