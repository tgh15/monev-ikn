'use client';

import { PlusCircle } from "lucide-react";
import { Button } from "../ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "../ui/dialog";
import { Formik } from "formik";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCategory } from "@/lib/api/category";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface AddCategoryProps {
    budgetId: string;
}

export default function AddCategory({ budgetId }: AddCategoryProps) {
    const [open, setOpen] = useState(false)
    const queryClient = useQueryClient()
    const { mutate, isPending } = useMutation({
        mutationFn: createCategory,
        onSuccess: () => {
            toast.success("Kategori berhasil dibuat", { position: "top-center" });
            queryClient.invalidateQueries({ queryKey: ['expenditure'] })
            queryClient.invalidateQueries({ queryKey: ['budget'] })
            setOpen(false)
        },
        onError: () => {
            toast.error("Kategori gagal dibuat", { position: "top-center" });
        },
    });

    const initialValues = {
        categoryName: "",
        plannedAmount: "",
        description: "",
    };

    const validate = (values: typeof initialValues) => {
        const errors: Partial<typeof initialValues> = {};
        if (!values.categoryName) errors.categoryName = "Nama kategori wajib diisi";
        if (!values.plannedAmount) errors.plannedAmount = "Jumlah anggaran wajib diisi";
        return errors;
    };

    const handleSubmit = (values: typeof initialValues, { resetForm }: any) => {
        mutate(
            {
                budgetId,
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
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {/* Add Category Card */}
                <div className="bg-white rounded-2xl shadow-sm border-2 border-dashed border-gray-200 hover:border-blue-300 hover:bg-blue-50/30 transition-all min-h-[400px] flex items-center justify-center group cursor-pointer">
                    <div className="text-center p-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 group-hover:bg-blue-100 transition-colors mb-4">
                            <PlusCircle className="w-8 h-8 text-gray-400 group-hover:text-blue-600 transition-colors" />
                        </div>
                        <h3 className="text-base font-semibold text-gray-900 mb-1">
                            Tambah Kategori
                        </h3>
                        <p className="text-sm text-gray-500">Buat kategori pengeluaran baru</p>
                    </div>
                </div>
            </DialogTrigger>

            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Tambah Kategori</DialogTitle>
                    <DialogDescription>
                        Tambahkan kategori pengeluaran untuk anggaran ini.
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
                                    {isPending ? "Menyimpan..." : "Tambahkan"}
                                </Button>
                            </DialogFooter>
                        </form>
                    )}
                </Formik>
            </DialogContent>
        </Dialog>
    );
}
