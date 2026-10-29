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
import type { CREATE_PROJECT, PROJECT, UPDATE_PROJECT } from "@/types/project";
import useCreate from "@/hooks/mutation/secrets/useCreateSecret";
import useUpdate from "@/hooks/mutation/secrets/useUpdateSecret";
import useCreateProject from "@/hooks/mutation/projects/useCreateProject";
import useUpdateProject from "@/hooks/mutation/projects/useUpdateProject";

type Props = {
  isUpdate?: boolean;
  projectId?: string;
  name?: string;
  favourite?: boolean;
  onClose: () => void;
};

const CreateProject = ({
  isUpdate = false,
  name,
  favourite,
  projectId,
  onClose,
}: Props) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: name ?? "",
      favourite: favourite ?? false,
    },
  });

  const createProject = useCreateProject();
  const updateProject = useUpdateProject();

  const onSubmit = (data: FormValues) => {
    if (isUpdate && projectId) {
      const obj = {
        ...data,
        _id: projectId,
      };

      updateProject.mutateAsync(obj).then(() => {
        handleClose();
      });
      return;
    }

    createProject.mutateAsync(data).then(() => {
      handleClose();
    });
  };

  const handleClose = () => {
    onClose();
    reset();
  };

  const isPending = isUpdate
    ? updateProject.isPending
    : createProject.isPending;

  return (
    <AlertDialogContent>
      <AlertDialogTitle>{isUpdate ? "Update" : "New"} Project</AlertDialogTitle>
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

              <Button type="submit" disabled={isPending}>
                {isUpdate
                  ? isPending
                    ? "Updating..."
                    : "Update"
                  : isPending
                    ? "Creating..."
                    : "Create"}
              </Button>
            </AlertDialogFooter>
          </FieldGroup>
        </FieldSet>
      </form>
    </AlertDialogContent>
  );
};

export default CreateProject;
