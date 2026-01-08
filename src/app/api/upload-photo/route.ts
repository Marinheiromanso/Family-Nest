import { NextRequest, NextResponse } from 'next/server';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '@/lib/firebase/config';

export async function POST(request: NextRequest) {
  try {
    console.log('Upload API called');
    
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const familyId = formData.get('familyId') as string;

    console.log('File:', file?.name, file?.type, file?.size);
    console.log('FamilyId:', familyId);

    if (!file || !familyId) {
      return NextResponse.json(
        { error: 'File and familyId are required' },
        { status: 400 }
      );
    }

    // Convert File to Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    console.log('Buffer size:', buffer.length);

    // Upload to Firebase Storage
    const storagePath = `families/${familyId}/photo_${Date.now()}.jpg`;
    console.log('Storage path:', storagePath);
    console.log('Storage bucket:', storage.app.options.storageBucket);
    
    const storageRef = ref(storage, storagePath);
    console.log('Storage ref created');
    
    // Upload bytes
    console.log('Uploading...');
    await uploadBytes(storageRef, buffer, {
      contentType: file.type,
    });
    console.log('Upload complete');

    // Get download URL
    const downloadURL = await getDownloadURL(storageRef);
    console.log('Download URL:', downloadURL);

    return NextResponse.json({ url: downloadURL }, { status: 200 });
  } catch (error: any) {
    console.error('Upload error:', error);
    console.error('Error code:', error.code);
    console.error('Error status:', error.status_);
    console.error('Error details:', error.customData);
    return NextResponse.json(
      { 
        error: error.message || 'Upload failed',
        code: error.code,
        details: error.customData 
      },
      { status: 500 }
    );
  }
}
