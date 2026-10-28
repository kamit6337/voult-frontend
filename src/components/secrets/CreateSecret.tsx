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
import { formSchema, type FormValues } from "./zodSchema";
import { Checkbox } from "@/components/ui/checkbox";
import useCreate from "@/hooks/mutation/secrets/useCreateSecret";
import { toast } from "sonner";
import useUpdate from "@/hooks/mutation/secrets/useUpdateSecret";
import type { CREATE_SECRET, SECRET, UPDATE_SECRET } from "@/types/secret";
import { useQuery } from "@tanstack/react-query";
import { getProjectsByUserIdQuery } from "@/query/projects/projects";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useEffect, useState } from "react";
import useCreateSecret from "@/hooks/mutation/secrets/useCreateSecret";
import useUpdateSecret from "@/hooks/mutation/secrets/useUpdateSecret";

type Props = {
  isUpdate?: boolean;
  onClose: () => void;
  projectId?: string;
  secret?: SECRET;
};

const CreateSecret = ({
  isUpdate = false,
  secret,
  onClose,
  projectId,
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
      name: secret?.name ?? "",
      value: secret?.value ?? "",
      favourite: secret?.favourite ?? false,
    },
  });

  const [selectedProjectId, setSelectedProjectId] = useState(
    projectId || "none",
  );

  const { data: projects } = useQuery(getProjectsByUserIdQuery());

  const createSecret = useCreateSecret();

  const updateSecret = useUpdateSecret();

  useEffect(() => {
    if (isUpdate && secret) {
      setSelectedProjectId(secret?.projectId || "none");
    }
  }, [isUpdate, secret]);

  const onSubmit = (data: FormValues) => {
    if (isUpdate && secret?._id) {
      const obj: UPDATE_SECRET = {
        ...data,
        _id: secret._id,
        projectId: selectedProjectId === "none" ? null : selectedProjectId,
      };

      updateSecret
        .mutateAsync({
          secret,
          obj,
        })
        .then(() => {
          handleClose();
          toast.success("Secret Updated Successfully");
        });
      return;
    }
    const obj: CREATE_SECRET = {
      ...data,
      projectId: selectedProjectId === "none" ? null : selectedProjectId,
    };

    createSecret.mutateAsync(obj).then(() => {
      handleClose();
      toast.success("Secret Created Successfully");
    });
  };

  const handleClose = () => {
    onClose();
    reset();
  };

  const isPending = isUpdate ? updateSecret.isPending : createSecret.isPending;

  return (
    <AlertDialogContent>
      <AlertDialogTitle>{isUpdate ? "Update" : "New"} Secret</AlertDialogTitle>
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

            {projects && projects.length > 0 && (
              <Field>
                <FieldLabel>Project</FieldLabel>
                <Select
                  value={selectedProjectId}
                  onValueChange={setSelectedProjectId}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a Project" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="none">Select a Project</SelectItem>
                      {projects.map((item) => (
                        <SelectItem key={item._id} value={item._id}>
                          {item.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Field>
            )}

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

export default CreateSecret;
