import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Login - SIPANDA",
    description: "Platform digital terintegrasi untuk pengelolaan dan transparansi anggaran yang akuntabel, efisien, dan dapat diakses oleh publik secara real-time",
};

export default function LoginLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            {children}
        </>
    )
}