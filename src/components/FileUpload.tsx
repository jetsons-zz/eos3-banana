import React, { useState, useCallback } from 'react';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  onRemove: () => void;
  selectedFile?: File;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  onFileSelect,
  onRemove,
  selectedFile
}) => {
  const [error, setError] = useState<string>('');
  const [imagePreview, setImagePreview] = useState<string>('');

  const validateFile = (file: File): string | null => {
    const maxSize = 10 * 1024 * 1024; // 10MB
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

    if (!allowedTypes.includes(file.type)) {
      return '仅支持 JPG、PNG、WebP、GIF 格式';
    }

    if (file.size > maxSize) {
      return '文件大小不能超过 10MB';
    }

    return null;
  };

  const createImagePreview = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleFile = useCallback((file: File) => {
    const errorMsg = validateFile(file);
    if (errorMsg) {
      setError(errorMsg);
      return;
    }
    
    setError('');
    createImagePreview(file);
    onFileSelect(file);
  }, [onFileSelect]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  }, [handleFile]);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const handleRemove = () => {
    setImagePreview('');
    onRemove();
  };

  return (
    <div>
      <div style={{ marginBottom: '4px' }}>
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          onChange={handleFileInput}
          style={{ width: '300px' }}
        />
      </div>

      {selectedFile && imagePreview && (
        <div style={{ marginTop: '8px', border: '1px solid #cccccc', padding: '4px', backgroundColor: '#f8f8f8' }}>
          <table style={{ width: '100%', marginBottom: '4px' }}>
            <tr>
              <th style={{ width: '80px' }}>文件名:</th>
              <td>{selectedFile.name}</td>
            </tr>
            <tr>
              <th>大小:</th>
              <td>{formatFileSize(selectedFile.size)}</td>
            </tr>
            <tr>
              <th>类型:</th>
              <td className="kernel-code">{selectedFile.type}</td>
            </tr>
          </table>
          
          <div style={{ marginBottom: '4px' }}>
            <img
              src={imagePreview}
              alt={selectedFile.name}
              style={{ 
                maxWidth: '200px', 
                maxHeight: '150px', 
                border: '1px solid #cccccc',
                display: 'block'
              }}
            />
          </div>
          
          <button onClick={handleRemove} style={{ fontSize: '11px', padding: '2px 6px' }}>
            移除图片
          </button>
        </div>
      )}

      {error && (
        <div className="error" style={{ marginTop: '4px' }}>
          {error}
        </div>
      )}

      <div style={{ fontSize: '11px', color: '#666666', marginTop: '4px' }}>
        支持格式: JPG, PNG, WebP, GIF | 最大: 10MB
      </div>
    </div>
  );
};