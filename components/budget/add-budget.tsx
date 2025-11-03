import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";

export default function AddBudget() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="cursor-pointer text-black bg-blue-100 p-2 rounded-full hover:bg-gray-200 transition">
                    <Plus size={16} />
                    Anggaran
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-6xl">
                <DialogHeader>
                    <DialogTitle>Tambah Anggaran</DialogTitle>
                    <DialogDescription>
                        Anggaran awal yang akan digunakan
                    </DialogDescription>
                </DialogHeader>
                <div className="flex items-center gap-2">
                    <div className="grid flex-1 gap-2">

                    </div>
                </div>
                <DialogFooter className="sm:justify-end">
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">
                            Close
                        </Button>
                    </DialogClose>
                    <Button type="submit">Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}