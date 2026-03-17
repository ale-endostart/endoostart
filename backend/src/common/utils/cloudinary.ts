import { v2 as cloudinary } from 'cloudinary'

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function getSignedDownloadUrl(
  publicId: string,
  expiresIn: number = 3600 // 1 hour in seconds
): Promise<string> {
  try {
    const url = cloudinary.url(publicId, {
      secure: true,
      type: 'upload',
      sign_url: true,
      expires_at: Math.floor(Date.now() / 1000) + expiresIn,
    })
    return url
  } catch (error) {
    console.error('Error generating signed URL:', error)
    throw new Error('Failed to generate download URL')
  }
}

export async function deleteResource(publicId: string): Promise<boolean> {
  try {
    const result = await cloudinary.uploader.destroy(publicId)
    return result.result === 'ok'
  } catch (error) {
    console.error('Error deleting resource:', error)
    return false
  }
}

export async function uploadBuffer(
  buffer: Buffer,
  options: {
    folder?: string
    resourceType?: 'image' | 'video' | 'raw' | 'auto'
    publicId?: string
    originalFilename?: string
  } = {}
): Promise<{ url: string; publicId: string; size: number; format: string }> {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: options.folder || 'endostart',
        resource_type: options.resourceType || 'auto',
        public_id: options.publicId,
        use_filename: true,
        unique_filename: true,
      },
      (error, result) => {
        if (error) {
          console.error('Cloudinary upload error:', error)
          reject(new Error('Failed to upload file to cloud storage'))
        } else if (result) {
          resolve({
            url: result.secure_url,
            publicId: result.public_id,
            size: result.bytes,
            format: result.format,
          })
        }
      }
    )
    uploadStream.end(buffer)
  })
}

export async function getResourceMetadata(publicId: string) {
  try {
    const resource = await cloudinary.api.resource(publicId)
    return {
      url: resource.secure_url,
      size: resource.bytes,
      type: resource.resource_type,
      mimeType: resource.format,
    }
  } catch (error) {
    console.error('Error getting resource metadata:', error)
    return null
  }
}
