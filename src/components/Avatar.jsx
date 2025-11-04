import { useEffect, useState } from 'react'
import supabase from '../supabase/supabase-client'
import { toast } from "sonner";
export default function Avatar({ url, size, onUpload }) {
    const [avatarUrl, setAvatarUrl] = useState(null)
    const [uploading, setUploading] = useState(false)

    useEffect(() => {
        if (url) downloadImage(url)
    }, [url])

    const downloadImage = async (path) => {
        try {
            const { data, error } = await supabase.storage.from('avatars').download(path)
            if (error) {
                throw error
            }
            const url = URL.createObjectURL(data)
            setAvatarUrl(url)
        } catch (error) {
            toast.error("Errore nel caricamento dell’immagine");
            console.log('Error downloading image: ', error.message)
        }
    }

    const uploadAvatar = async (event) => {
        try {
            setUploading(true)

            if (!event.target.files || event.target.files.length === 0) {
                throw new Error("Seleziona un'immagine da caricare")
            }

            const file = event.target.files[0]
            const fileExt = file.name.split('.').pop()
            const fileName = `${Math.random()}.${fileExt}`
            const filePath = `${fileName}`

            const { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, file)

            if (uploadError) {
                throw uploadError
            }

            onUpload(event, filePath)
            toast.success("Avatar caricato con successo!");
        } catch (error) {
            toast.error("Errore nel caricamento dell’immagine");
            console.error("Errore durante l'upload:", error.message);
        } finally {
            setUploading(false)
        }
    }

    return (
        <div>
            {avatarUrl ? (
                <img
                    src={ avatarUrl }
                    alt="Avatar"
                    className="avatar image mb-3"
                    style={{ height: size, width: size, boxShadow: "3px 3px 8px grey", borderRadius: "50%" }}
                />
            ) : (
                <div className="avatar no-image" />
            )}
            <div style={{ width: size }}>
                <input
                    type="file"
                    id="single"
                    accept="image/*"
                    onChange={ uploadAvatar }
                    disabled={ uploading }
                    className="cursor-pointer"
                />
            </div>
        </div>
    )
}
