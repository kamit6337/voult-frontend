"use client";

import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

import { formSchema, type FormValues } from "./zodSchema";
import { Checkbox } from "@/components/ui/checkbox";
import { postReq } from "@/config/api";
import { useQueryClient } from "@tanstack/react-query";

const CreateSecret = () => {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      value: "",
      favourite: false,
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      console.log(data);

      const response = await postReq("/secrets", data);

      console.log("Response", response);

      reset();

      // Close ONLY after success
      queryClient.invalidateQueries({
        queryKey: ["user", "secrets"],
        exact: true,
      });
      setOpen(false);
    } catch (err) {
      console.error(err);

      // Show toast
      // Dialog stays open
    }
  };

  const handleClose = () => {
    reset();
    setOpen(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button>Create Secret</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogTitle>New Secret</AlertDialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldSet>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name">Name</FieldLabel>
                <Input
                  id="name"
                  {...register("name")}
                  placeholder="Name"
                  aria-invalid={!!errors.name?.message}
                  autoComplete="off"
                />
                {errors.name?.message && (
                  <FieldError errors={[{ message: errors.name?.message }]} />
                )}
              </Field>

              <Field>
                <FieldLabel htmlFor="secret">Secret</FieldLabel>
                <Input
                  id="secret"
                  {...register("value")}
                  placeholder="Secret"
                  aria-invalid={!!errors.value?.message}
                  autoComplete="off"
                />
                {errors.value?.message && (
                  <FieldError errors={[{ message: errors.value?.message }]} />
                )}
              </Field>

              <Field orientation="horizontal">
                <Controller
                  name="favourite"
                  control={control}
                  render={({ field }) => {
                    return (
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={(checked) => {
                          console.log("checked Value", checked);
                          field.onChange(checked === true);
                        }}
                      />
                    );
                  }}
                />
                <FieldLabel htmlFor="terms-checkbox-basic">
                  Add to Favourite
                </FieldLabel>
                {errors.favourite?.message && (
                  <FieldError
                    errors={[{ message: errors.favourite?.message }]}
                  />
                )}
              </Field>

              <AlertDialogFooter className="mt-6">
                <AlertDialogCancel type="button" onClick={() => handleClose()}>
                  Cancel
                </AlertDialogCancel>

                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Creating..." : "Create"}
                </Button>
              </AlertDialogFooter>
            </FieldGroup>
          </FieldSet>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CreateSecret;
