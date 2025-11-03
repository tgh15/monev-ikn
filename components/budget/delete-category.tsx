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
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { toast } from "sonner"; // ✅ pakai toast untuk feedback lebih baik

interface DeleteCategoryProps {
    category_id: string;
}

export default function DeleteCategory({ category_id }: DeleteCategoryProps) {
    const [open, setOpen] = useState(false);
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: () => deleteCategory(category_id),
        onSuccess: () => {
            toast.success("Kategori berhasil dihapus.");
            queryClient.invalidateQueries({ queryKey: ['budget'] })
            setOpen(false);
        },
        onError: (error) => {
            console.error("Gagal menghapus kategori:", error);
            toast.error("Gagal menghapus kategori. Silakan coba lagi.");
        },
    });

    const handleDelete = () => mutate();

    return (
        <>
            <DropdownMenuItem
                onSelect={(e) => {
                    e.preventDefault(); // ⬅️ penting!
                    setOpen(true);
                }}
                variant="destructive"
                className="flex items-center gap-2 text-red-600"
            >
                Hapus
            </DropdownMenuItem>
            <Dialog open={open} onOpenChange={setOpen}>
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
