'use client'

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { useState } from "react";
import { toast } from "sonner";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Edit, Upload } from "lucide-react";
import { Button } from "../ui/button";
import { Expenditure } from "@/type/ExpenditureType";
import { updateExpenditure } from "@/lib/api/expenditure";

interface ExpenditureUpdateProps {
    data: Expenditure
}

export default function ExpenditureEdit({ data }: ExpenditureUpdateProps) {
    const [open, setOpen] = useState(false);
    const queryClient = useQueryClient()
    // React Query mutation
    const { mutate, isPending } = useMutation({
        mutationFn: updateExpenditure,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['expenditure'] })
            toast.success('Berhasil mengupdate pengeluaran', { position: "top-center" })
            setOpen(false);
        },
        onError: (err) => {
            console.error(err);
            toast.error('Gagal mengupdate pengeluaran')
        },
    });

    const initialValues = {
        _id: data._id,
        title: data.title,
        description: data.description,
        amount: data.amount,
        status: data.status,
        expenditureDate: data.expenditureDate,
        attachments: [],
    }

    const validate = (values: typeof initialValues) => {
        const errors: any = {};
        if (!values.title) errors.title = "Judul wajib diisi";
        if (!values.amount) errors.amount = "Jumlah wajib diisi";
        else if (Number(values.amount) <= 0)
            errors.amount = "Jumlah harus lebih besar dari 0";
        if (!values.status) errors.status = "Status wajib diisi";
        if (!values.expenditureDate)
            errors.expenditureDate = "Tanggal wajib diisi";
        return errors;
    }

    const handleSubmit = (values: typeof initialValues, { resetForm }: FormikHelpers<typeof initialValues>) => {
        mutate(values)
        resetForm()
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <button
                    className="p-2 rounded-full bg-yellow-100 text-yellow-600 hover:bg-yellow-200 transition cursor-pointer"
                    aria-label="Edit"
                >
                    <Edit className="w-4 h-4" />
                </button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-xl">
                <DialogHeader>
                    <DialogTitle>Tambah Pengeluaran</DialogTitle>
                    <DialogDescription>
                        Isi form berikut untuk menambahkan pengeluaran baru.
                    </DialogDescription>
                </DialogHeader>

                <Formik
                    initialValues={initialValues}
                    validate={validate}
                    onSubmit={handleSubmit}
                >
                    {({ values, errors, touched, setFieldValue }) => (
                        <Form className="space-y-4">
                            {/* Judul */}
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Judul <span className="text-red-500">*</span>
                                </label>
                                <Field
                                    name="title"
                                    type="text"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                {errors.title && touched.title && (
                                    <div className="text-red-500 text-sm mt-1">{errors.title}</div>
                                )}
                            </div>

                            {/* Deskripsi */}
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Deskripsi
                                </label>
                                <Field
                                    as="textarea"
                                    name="description"
                                    rows={3}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* Jumlah */}
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Jumlah (Rp) <span className="text-red-500">*</span>
                                </label>
                                <Field
                                    name="amount"
                                    type="number"
                                    min="0"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                {errors.amount && touched.amount && (
                                    <div className="text-red-500 text-sm mt-1">{errors.amount}</div>
                                )}
                            </div>

                            {/* Status */}
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Status <span className="text-red-500">*</span>
                                </label>
                                <Field
                                    as="select"
                                    name="status"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="belum_selesai">Belum Selesai</option>
                                    <option value="proses_pertanggungjawaban">
                                        Proses Pertanggungjawaban
                                    </option>
                                    <option value="selesai">Selesai</option>
                                </Field>
                                {errors.status && touched.status && (
                                    <div className="text-red-500 text-sm mt-1">{errors.status}</div>
                                )}
                            </div>

                            {/* Tanggal */}
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Tanggal Pengeluaran <span className="text-red-500">*</span>
                                </label>
                                <Field
                                    name="expenditureDate"
                                    type="date"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                {errors.expenditureDate && touched.expenditureDate && (
                                    <div className="text-red-500 text-sm mt-1">
                                        {errors.expenditureDate}
                                    </div>
                                )}
                            </div>

                            {/* Lampiran */}
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Lampiran
                                </label>
                                <label className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50">
                                    <Upload className="w-4 h-4" />
                                    <span className="text-sm">Upload File</span>
                                    <input
                                        type="file"
                                        multiple
                                        accept="image/*,.pdf"
                                        className="hidden"
                                        onChange={(e) =>
                                            setFieldValue(
                                                "attachments",
                                                Array.from(e.target.files || [])
                                            )
                                        }
                                    />
                                </label>
                                {values.attachments.length > 0 && (
                                    <ul className="text-sm mt-2">
                                        {values.attachments.map((file: File, i: number) => (
                                            <li key={i}>{file.name}</li>
                                        ))}
                                    </ul>
                                )}
                            </div>

                            <DialogFooter className="sm:justify-end pt-4">
                                <DialogClose asChild>
                                    <Button type="button" variant="secondary">
                                        Batal
                                    </Button>
                                </DialogClose>
                                <Button type="submit" disabled={isPending}>
                                    {isPending ? "Menyimpan..." : "Simpan"}
                                </Button>
                            </DialogFooter>
                        </Form>
                    )}
                </Formik>
            </DialogContent>
        </Dialog>
    );
}