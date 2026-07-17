"use client";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";

import { formSchema, type FormValues } from "./zodSchema";
import { Checkbox } from "@/components/ui/checkbox";
import { postReq } from "@/config/api";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

type Props = {
  update?: boolean;
  projectName?: string;
  favourite?: boolean;
  handleOpen: (bool: boolean) => void;
};

const CreateProject = ({
  handleOpen,
  update = false,
  projectName,
  favourite,
}: Props) => {
  const queryClient = useQueryClient();

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
      favourite: false,
    },
  });

  useEffect(() => {
    if (update && projectName && favourite) {
      reset({
        name: projectName,
        favourite,
      });
    }
  }, [update, projectName, favourite]);

  const onSubmit = async (data: FormValues) => {
    try {
      const response = await postReq("/projects", data);

      queryClient.invalidateQueries({
        queryKey: ["user", "projects"],
        exact: true,
      });

      handleClose();
    } catch (error: any) {
      console.log("ERROR", error);

      toast.error(error.message);
    }
  };

  const handleClose = () => {
    reset();
    handleOpen(false);
  };

  return (
    <AlertDialogContent>
      <AlertDialogTitle>{update ? "Update" : "New"} Project</AlertDialogTitle>
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

            <Field orientation="horizontal">
              <Controller
                name="favourite"
                control={control}
                render={({ field }) => {
                  return (
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={(checked) => {
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
                <FieldError errors={[{ message: errors.favourite?.message }]} />
              )}
            </Field>

            <AlertDialogFooter className="mt-6">
              <AlertDialogCancel type="button" onClick={() => handleClose()}>
                Cancel
              </AlertDialogCancel>

              <Button type="submit" disabled={isSubmitting}>
                {update && isSubmitting ? "Updating..." : "Update"}
                {!update && isSubmitting ? "Creating..." : "Create"}
              </Button>
            </AlertDialogFooter>
          </FieldGroup>
        </FieldSet>
      </form>
    </AlertDialogContent>
  );
};

export default CreateProject;
