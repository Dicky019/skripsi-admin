import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Icons } from "~/components/icons";
import {
  type IRute,
  ruteCreateSchema,
  IRuteCreate,
  IRuteEdit,
} from "~/types/rute";
import { Input } from "~/components/ui/input";
import toast from "react-hot-toast";
import { useContext, useState } from "react";
import { TableRowActionContext } from "../tabs/tabs-table";

type RuteFormProps = {
  data?: IRute;
} & React.HTMLAttributes<HTMLDivElement>;

export function RuteForm({
  className,
  data,
  ...props
}: RuteFormProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const actionContext = useContext(TableRowActionContext);

  if (!actionContext) {
    throw Error("actionContext null");
  }

  // 1. Define your form.
  const kodeStart = "Kode ";

  const form = useForm<IRuteCreate>({
    resolver: zodResolver(ruteCreateSchema),
    defaultValues: {
      ...data,
      kode: data?.kode.replace(kodeStart, ""),
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: IRuteCreate) {
    setIsLoading(true);
    try {
      const { kode, ...dataWithOutKode } = values;
      const rute = { kode: kodeStart + kode.toUpperCase(), ...dataWithOutKode };

      if (data) {
        await actionContext?.onEdit({ id: data.id, ...rute });
        toast.success("Successfully Edit!");
        setIsLoading(false);
        return;
      }

      await actionContext?.onCreate(rute);
      toast.success("Successfully Create!");
    } catch (error) {
      toast.error("There is something wrong!");
    }
    setIsLoading(false);
  }

  const resetForm = () => form.reset();

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="mb-1">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex mb-2 gap-x-2">
              <FormField
                control={form.control}
                name="color"
                defaultValue="#000000"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Color</FormLabel>
                    <FormControl>
                      <Input type="color" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="kode"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Kode</FormLabel>
                    <FormControl>
                      <Input placeholder="A" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Location Awal */}
            <div className="flex mb-2 gap-x-2">
              <FormField
                control={form.control}
                name="locationAwal.lat"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Location Awal Latitude</FormLabel>
                    <FormControl>
                      <Input placeholder="70.09090" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="locationAwal.long"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Location Awal Longitude</FormLabel>
                    <FormControl>
                      <Input placeholder="70.09090" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* End Location Awal */}

            {/* Location Akhir */}
            <div className="flex mb-2 gap-x-2">
              <FormField
                control={form.control}
                name="locationAkhir.lat"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Location Akhir Latitude</FormLabel>
                    <FormControl>
                      <Input placeholder="70.09090" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="locationAkhir.long"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Location Akhir Longitude</FormLabel>
                    <FormControl>
                      <Input placeholder="70.09090" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* End Location Akhir */}

            <div className="flex flex-col gap-4 my-4">
              <Button disabled={isLoading} type="submit">
                {isLoading && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Save
              </Button>

              <Button
                disabled={isLoading}
                variant="outline"
                onClick={resetForm}
                type="reset"
              >
                {isLoading && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Clear
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
