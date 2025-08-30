"use client"

import {FC, useState} from "react";
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger} from "./ui/dialog";
import { Button } from "./ui/button";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

const NewGameDialog:FC = ()=> {
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);

    const gridSchema = z.object({
        rowSize: z.coerce
            .number()
            .min(3, { message: "Rows must be at least 3." })
            .max(9, { message: "Rows cannot exceed 9." }),

        colSize: z.coerce
            .number()
            .min(3, { message: "Cols must be at least 3." })
            .max(9, { message: "Cols cannot exceed 9." }),
    });

    type FormInputs = z.input<typeof gridSchema>;
    type FormValues = z.output<typeof gridSchema>;

    const form = useForm<FormInputs,undefined ,FormValues>({
        resolver: zodResolver(gridSchema),
        defaultValues: {
            rowSize: 3,
            colSize: 3,
        } as FormInputs,
    });

    const handleSubmit = ( val:FormValues)=> {
        setDialogOpen(false);
        console.log("Row size", val.rowSize);
        console.log("Col size", val.colSize);
        form.reset();
    }

    return (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
                <button
                    className={"text-sm font-semibold text-gray-600 hover:bg-slate-50"}
                >
                    Create New Game
                </button>
            </DialogTrigger>
            <DialogContent className="w-96 rounded-lg p-4 sm:max-w-[600px] sm:p-6">
                <DialogHeader className="mb-5">
                    <DialogTitle>Enter Board Size</DialogTitle>
                    <DialogDescription>
                        Enter board size from 3x3 all the way to 9x9
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 w-80">
                        <FormField
                            control={form.control}
                            name="rowSize"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Rows</FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g., 5" type="number" {...field}/>
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
                                    <FormLabel>Columns</FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g., 5" type="number" {...field} />
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
    )
}

export default NewGameDialog;