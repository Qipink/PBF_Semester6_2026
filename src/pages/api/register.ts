import { signUp } from '@/utils/db/servicefirebase';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
    name: string,
    alamat: string,
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    if (req.method === "POST") {
        const email = req.body?.email?.trim();
        const password = req.body?.password;

        if (!email) {
            return res.status(400).json({
                name: "Email wajib diisi",
                alamat: "Gagal menyimpan alamat",
            });
        }

        if (!password || password.length < 6) {
            return res.status(400).json({
                name: "Password minimal 6 karakter",
                alamat: "Gagal menyimpan alamat",
            });
        }

        await signUp(req.body, (response: { status: string; message: string }) => {
            if (response.status === "success") {
                res.status(200).json({
                    name: response.message,
                    alamat: "Alamat berhasil disimpan",
                });
            } else {
                res.status(400).json({
                    name: response.message,
                    alamat: "Gagal menyimpan alamat",
                });
            }
        });
    } else {
        res.status(405).json({
            name: "Method Not Allowed",
            alamat: "Hanya metode POST yang diizinkan",
        });
    }
}