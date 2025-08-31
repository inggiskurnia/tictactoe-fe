"use client";

import { FC, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Game, createNewGame } from "@/app/api/createGame";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ApiResponse } from "@/types/apiResponse";

type Props = {
  onCreated?: (res: Game) => void;
};

const NewGameDialog: FC<Props> = ({ onCreated }) => {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const formSchema = z.object({
    rowSize: z.coerce.number().min(3).max(9),
    colSize: z.coerce.number().min(3).max(9),
    winLength: z.coerce.number().min(3).max(9),
    humanMark: z.string().max(1),
  });

  type FormInput = z.input<typeof formSchema>;
  type FormValues = z.infer<typeof formSchema>;

  const form = useForm<FormInput, undefined, FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      rowSize: 3,
      colSize: 3,
      winLength: 3,
      humanMark: "X",
    } as unknown as FormInput,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (val: FormValues) =>
      createNewGame({
        rowSize: val.rowSize,
        colSize: val.colSize,
        winLength: val.winLength,
        humanMark: val.humanMark,
      }),
    onSuccess: (result: ApiResponse<Game>) => {
      onCreated?.(result.data);
      setDialogOpen(false);
      form.reset();
    },
    onError: (err) =>
      alert(err instanceof Error ? err.message : "Something wrong"),
  });

  const handleSubmit = (val: FormValues) => {
    mutate(val);
    form.reset();
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button>Create New Game</Button>
      </DialogTrigger>
      <DialogContent className="w-96 rounded-lg p-4 sm:max-w-[600px] sm:p-6">
        <DialogHeader className="mb-5">
          <DialogTitle>Enter Board Size</DialogTitle>
          <DialogDescription>
            Enter board size from 3x3 all the way to 9x9
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4 w-80"
          >
            <FormField
              control={form.control}
              name="rowSize"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Row Size</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., 5"
                      type="number"
                      value={field.value as number | undefined}
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
                      onBlur={field.onBlur}
                      name={field.name}
                      ref={field.ref}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="colSize"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Column Size</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., 5"
                      type="number"
                      value={field.value as number | undefined}
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
                      onBlur={field.onBlur}
                      name={field.name}
                      ref={field.ref}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="winLength"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Winning Length</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., 5"
                      type="number"
                      value={field.value as number | undefined}
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
                      onBlur={field.onBlur}
                      name={field.name}
                      ref={field.ref}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="humanMark"
              render={({ field }) => (
                <FormItem className={"space-x-3"}>
                  <FormLabel>Player Mark</FormLabel>
                  <FormControl>
                    <RadioGroup
                      className="flex flex-col"
                      value={field.value ?? "X"}
                      onValueChange={field.onChange}
                    >
                      <FormItem className="flex items-center gap-3">
                        <FormControl>
                          <RadioGroupItem value="X" />
                        </FormControl>
                        <FormLabel className="font-normal">X Player</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center gap-3">
                        <FormControl>
                          <RadioGroupItem value="O" />
                        </FormControl>
                        <FormLabel className="font-normal">O Player</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Create Grid</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default NewGameDialog;
