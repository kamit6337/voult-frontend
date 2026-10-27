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
import useCreate from "@/hooks/mutation/useCreate";
import { toast } from "sonner";
import useUpdate from "@/hooks/mutation/useUpdate";
import type { CREATE_SECRET, SECRET, UPDATE_SECRET } from "@/types/secret";

type Props = {
  isUpdate?: boolean;
  secretId?: string;
  name?: string;
  value?: string;
  favourite?: boolean;
  onClose: () => void;
};

const CreateSecret = ({
  isUpdate = false,
  secretId,
  name,
  value,
  favourite,
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
      value: value ?? "",
      favourite: favourite ?? false,
    },
  });

  const createSecret = useCreate<CREATE_SECRET, SECRET>({
    queryKey: ["user", "secrets"],
    mutationKey: ["user", "secrets", "create"],
    urlPath: "/secrets",
  });

  const updateSecret = useUpdate<UPDATE_SECRET, SECRET>({
    queryKey: ["user", "secrets"],
    mutationKey: ["user", "secrets", "update"],
    urlPath: "/secrets",
  });

  const onSubmit = (data: FormValues) => {
    if (isUpdate && secretId) {
      const obj = {
        ...data,
        _id: secretId,
      };

      updateSecret.mutateAsync(obj).then(() => {
        handleClose();
        toast.success("Secret Updated Successfully");
      });
      return;
    }

    createSecret.mutateAsync(data).then(() => {
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
