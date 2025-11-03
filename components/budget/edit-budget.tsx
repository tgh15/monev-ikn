'use client'
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { useState } from "react";
import { Formik } from "formik";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateCategory, UpdateCategoryProps } from "@/lib/api/category";
import { updateBudget, UpdateBudgetProps } from "@/lib/api/budget";
import { Budget } from "@/type/BudgetType";
import { Category } from "@/type/CategoryType";

interface EditCategoryProps {
    category: {
        id: string, title: string, description: string, total: number
    },
    isBudget?: boolean
}

export default function EditBudget({ category, isBudget }: EditCategoryProps) {
    const [open, setOpen] = useState(false)
    const router = useRouter()
    const queryClient = useQueryClient()
    const { mutate, isPending } = useMutation<
        Budget | Category,          // return type bisa Budget atau Category
        Error,                      // error type
        UpdateBudgetProps | UpdateCategoryProps // argumen type bisa keduanya
    >({
        mutationFn: isBudget ? updateBudget : updateCategory,
        onSuccess: () => {
            toast.success("Kategori berhasil diedit", { position: "top-center" });
            queryClient.invalidateQueries({ queryKey: ['budget'] })
            queryClient.invalidateQueries({ queryKey: ['categories'] })
            router.refresh()
            setOpen(false)
        },
        onError: () => {
            toast.error("Kategori gagal diedit", { position: "top-center" });
        },
    });

    const initialValues = {
        categoryName: category.title,
        plannedAmount: category.total.toString(),
        description: category.description,
    };

    const validate = (values: typeof initialValues) => {
        const errors: Partial<typeof initialValues> = {};
        if (!values.categoryName) errors.categoryName = "Nama kategori wajib diisi";
        if (!values.plannedAmount) errors.plannedAmount = "Jumlah anggaran wajib diisi";
        return errors;
    };

    const handleSubmit = (values: typeof initialValues, { resetForm }: any) => {
        console.log(isBudget)
        mutate(
            {
                id: category.id,
                name: values.categoryName,
                description: values.description,
                plannedAmount: Number(values.plannedAmount),
            },
            {
                onSuccess: () => {
                    resetForm();
                },
            }
        );
    };
    return (
        <>
            <DropdownMenuItem onSelect={(e) => {
                e.preventDefault()
                setOpen(true)
            }}>Edit</DropdownMenuItem>
            <Dialog open={open} onOpenChange={setOpen}>

                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Edit Kategori</DialogTitle>
                        <DialogDescription>
                            Edit kategori pengeluaran untuk anggaran ini.
                        </DialogDescription>
                    </DialogHeader>

                    <Formik
                        initialValues={initialValues}
                        validate={validate}
                        onSubmit={handleSubmit}
                    >
                        {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Nama Kategori
                                    </label>
                                    <input
                                        type="text"
                                        name="categoryName"
                                        value={values.categoryName}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        placeholder="Contoh: Belanja Jasa"
                                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${errors.categoryName && touched.categoryName ? "border-red-500" : "border-gray-300"
                                            }`}
                                    />
                                    {errors.categoryName && touched.categoryName && (
                                        <p className="text-sm text-red-500 mt-1">{errors.categoryName}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Jumlah Anggaran (Rp)
                                    </label>
                                    <input
                                        type="number"
                                        name="plannedAmount"
                                        value={values.plannedAmount}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        placeholder="1000000000"
                                        min="0"
                                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${errors.plannedAmount && touched.plannedAmount ? "border-red-500" : "border-gray-300"
                                            }`}
                                    />
                                    {errors.plannedAmount && touched.plannedAmount && (
                                        <p className="text-sm text-red-500 mt-1">{errors.plannedAmount}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Deskripsi
                                    </label>
                                    <textarea
                                        name="description"
                                        value={values.description}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        placeholder="Anggaran belanja jasa"
                                        rows={2}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none"
                                    />
                                </div>

                                <DialogFooter className="sm:justify-end">
                                    <Button type="submit" disabled={isPending}>
                                        {isPending ? "Menyimpan..." : "Edit"}
                                    </Button>
                                </DialogFooter>
                            </form>
                        )}
                    </Formik>
                </DialogContent>
            </Dialog>
        </>
    )
}