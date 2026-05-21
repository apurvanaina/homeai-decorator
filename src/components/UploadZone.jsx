import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, Image } from 'lucide-react';

export default function UploadZone({ onUpload, preview }) {
  const onDrop = useCallback(acceptedFiles => {
    if (acceptedFiles.length > 0) onUpload(acceptedFiles[0]);
  }, [onUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop, accept: { 'image/*': [] }, maxFiles: 1
  });

  return (
    <div
      {...getRootProps()}
      style={{ border: `2px dashed ${isDragActive ? '#1D9E75' : '#d4cfc8'}`, borderRadius: '16px', padding: '32px 24px', textAlign: 'center', cursor: 'pointer', transition: 'all 0.2s', background: isDragActive ? '#F0FBF7' : preview ? '#faf9f7' : '#fff', minHeight: '200px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '12px' }}
    >
      <input {...getInputProps()} />
      {preview ? (
        <>
          <img src={preview} alt="Room preview" style={{ maxHeight: '180px', maxWidth: '100%', borderRadius: '12px', objectFit: 'cover' }} />
          <p style={{ fontSize: '13px', color: '#888', margin: 0 }}>Click or drag to replace photo</p>
        </>
      ) : (
        <>
          <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: isDragActive ? '#E1F5EE' : '#f5f3f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {isDragActive ? <Image size={24} color="#1D9E75" /> : <Upload size={24} color="#aaa" />}
          </div>
          <div>
            <p style={{ fontSize: '15px', fontWeight: '600', color: '#1a1a1a', margin: '0 0 6px' }}>{isDragActive ? 'Drop your photo here' : 'Upload a room photo'}</p>
            <p style={{ fontSize: '13px', color: '#888', margin: 0 }}>Drag & drop or click to browse · JPG, PNG supported</p>
          </div>
        </>
      )}
    </div>
  );
}