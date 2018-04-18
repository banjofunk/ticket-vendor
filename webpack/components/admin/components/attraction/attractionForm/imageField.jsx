import React from 'react'
import ReactS3Uploader from 'react-s3-uploader'


const ImageField = ({ name, src, update}) => {
  return (
    <label className={'pt-label img-label'}>
      {name}
      <br />
      <img src={src} />
      <br />
      <label className={'img-uploader'}>
        change
        <ReactS3Uploader
          signingUrl="/api/v1/admin/upload/signature"
          uploadRequestHeaders={{ 'x-amz-acl': 'public-read', 'Access-Control-Allow-Origin': '*' }}
          name="file"
          id="file"
          onFinish={(response) => update(name, response.signedUrl.split("?")[0])} />
      </label>
    </label>
  )
}

export default ImageField
