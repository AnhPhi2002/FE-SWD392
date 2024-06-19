import { toast } from 'sonner';
import { useRef, useState } from 'react';
import axios from 'axios';
export function useUploadImage() {
  const [avatarUrl, setAvatarUrl] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cloudName = 'dlrpmjdzz';
  const presetKey = import.meta.env.VITE_PRESET_KEY;
  const handleFileInputClick = () => {
    fileInputRef?.current?.click();
  };

  async function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', presetKey);
    try {
      const resData = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/raw/upload`, formData);
      if (resData.status === 200) {
        setAvatarUrl(resData?.data?.url);
        toast.success('Upload success');
      }
    } catch (error: any) {
      toast.error(error);
    }
  }
  return { onChange, handleFileInputClick, fileInputRef, avatarUrl, setAvatarUrl };
}
