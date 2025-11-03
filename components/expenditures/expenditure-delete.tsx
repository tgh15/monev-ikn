'use client';

import { Trash } from "lucide-react";
import { Button } from "../ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCategory } from "@/lib/api/category";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner"; // ✅ pakai toast untuk feedback lebih baik
import { deleteExpenditure } from "@/lib/api/expenditure";

interface ExpenditureDeleteProps {
    id: string;
}

export default function ExpenditureDelete({ id }: ExpenditureDeleteProps) {
    const [open, setOpen] = useState(false);
    const queryClient = useQueryClient()

    const { mutate, isPending } = useMutation({
        mutationFn: () => deleteExpenditure(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['expenditure'] })
            queryClient.invalidateQueries({ queryKey: ['category'] })
            toast.success("Pengeluaran berhasil dihapus.", { position: "top-center" })
            setOpen(false);
        },
        onError: (error) => {
            console.error("Gagal menghapus Pengeluaran:", error);
            toast.error("Gagal menghapus Pengeluaran. Silakan coba lagi.");
        },
    });

    const handleDelete = () => mutate();

    return (
        <>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <button
                        className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition cursor-pointer"
                        aria-label="Delete"
                    >
                        <Trash className="w-4 h-4" />
                    </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Konfirmasi Penghapusan</DialogTitle>
                        <DialogDescription>
                            Apakah Anda yakin ingin menghapus kategori ini? Tindakan ini tidak dapat dibatalkan.
                        </DialogDescription>
                    </DialogHeader>

                    <DialogFooter className="sm:justify-end">
                        <DialogClose asChild>
                            <Button type="button" variant="secondary">
                                Batal
                            </Button>
                        </DialogClose>
                        <Button
                            variant="destructive"
                            onClick={handleDelete}
                            disabled={isPending}
                        >
                            {isPending ? "Menghapus..." : "Ya, Hapus"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
