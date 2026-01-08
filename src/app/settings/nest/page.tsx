'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Header, Card, CardContent, Button, Input } from '@/components/ui';
import { useAuth, useFamily } from '@/hooks';
import { updateFamily } from '@/lib/firebase/firestore';

export default function NestSettingsPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { family } = useFamily();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [nestName, setNestName] = useState('');
  const [photoURL, setPhotoURL] = useState<string | null>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [previewURL, setPreviewURL] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (family) {
      setNestName(family.name);
      setPhotoURL(family.photoURL || null);
      setPreviewURL(family.photoURL || null);
    }
  }, [family]);

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !family) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Por favor, selecione uma imagem válida');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('A imagem deve ter no máximo 5MB');
      return;
    }

    setError('');
    setPhotoFile(file);
    
    // Create preview URL
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewURL(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    if (!family || !nestName.trim()) {
      setError('Por favor, dê um nome ao ninho');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      let newPhotoURL = photoURL;
      
      // Upload photo if a new one was selected (usando API route para evitar CORS)
      if (photoFile) {
        setIsUploading(true);
        try {
          const formData = new FormData();
          formData.append('file', photoFile);
          formData.append('familyId', family.id);
          
          const response = await fetch('/api/upload-photo', {
            method: 'POST',
            body: formData,
          });

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Erro ao fazer upload');
          }

          const data = await response.json();
          newPhotoURL = data.url;
          
          setIsUploading(false);
        } catch (uploadErr: any) {
          console.error('Error uploading photo:', uploadErr);
          setError(`Erro ao fazer upload da foto: ${uploadErr.message}`);
          setIsLoading(false);
          setIsUploading(false);
          return;
        }
      }
      
      // Update family with new name and photo URL
      const updateData: any = { 
        name: nestName.trim(),
      };
      if (newPhotoURL) {
        updateData.photoURL = newPhotoURL;
      }
      
      const result = await updateFamily(family.id, updateData);
      
      if (result.error) {
        throw new Error(result.error);
      }
      
      router.back();
    } catch (err: any) {
      console.error('Error updating nest:', err);
      setError(`Erro ao atualizar o ninho: ${err.message}`);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <Header title="Personalizar Ninho" showBack />

      <main className="px-4 py-6 space-y-6">
        {/* Photo Section */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Card>
            <CardContent className="flex flex-col items-center py-8">
              <div className="relative mb-4">
                {previewURL ? (
                  <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-100 shadow-lg">
                    <img
                      src={previewURL}
                      alt="Foto do Ninho"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        console.error('Image load error');
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                ) : (
                  <div className="w-32 h-32 bg-gradient-to-br from-primary-green/20 to-primary-lime/20 rounded-full flex items-center justify-center">
                    <span className="material-symbols-outlined text-6xl text-primary-green">
                      nest_multi_room
                    </span>
                  </div>
                )}
                
                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                  className="absolute bottom-0 right-0 w-10 h-10 bg-primary-orange text-white rounded-full flex items-center justify-center shadow-lg hover:bg-primary-orange-dark transition-colors disabled:opacity-50"
                >
                  <span className="material-symbols-outlined">
                    {isUploading ? 'progress_activity' : 'photo_camera'}
                  </span>
                </button>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
              />

              <p className="text-sm text-text-muted text-center">
                {photoFile ? 'Clique em "Salvar" para enviar a foto' : 'Clique no ícone da câmera para adicionar uma foto'}
              </p>
              {isUploading && (
                <p className="text-xs text-primary-orange text-center mt-2">
                  Fazendo upload da foto...
                </p>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Name Section */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Card>
            <CardContent>
              <h3 className="text-sm font-medium text-text-muted dark:text-white mb-3">
                NOME DO NINHO
              </h3>
              <Input
                value={nestName}
                onChange={(e) => setNestName(e.target.value)}
                placeholder="Digite o nome do ninho"
                leftIcon="edit"
                maxLength={50}
              />
              <p className="text-xs text-text-muted mt-2">
                {nestName.length}/50 caracteres
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-4 bg-accent-care/10 border border-accent-care/20 rounded-2xl"
          >
            <p className="text-sm text-accent-care">{error}</p>
          </motion.div>
        )}

        {/* Save Button */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Button
            className="w-full"
            size="lg"
            onClick={handleSave}
            isLoading={isLoading}
            disabled={!nestName.trim() || isLoading}
          >
            Salvar Alterações
          </Button>
        </motion.div>
      </main>
    </div>
  );
}
