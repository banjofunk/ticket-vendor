class Api::Admin::UploadController < ApplicationController

  def signature
    # Usual fog config, set as an initializer
    storage = Fog::Storage.new(
      provider: 'AWS',
      aws_access_key_id: ENV['AWS_ACCESS_KEY_ID'],
      aws_secret_access_key: ENV['AWS_SECRET_ACCESS_KEY'],
      region: 'us-west-2'
    )

    # In the controller
    options = {path_style: true}
    headers = {"Content-Type" => params[:contentType], "x-amz-acl" => "public-read"}
    if params[:objectName]
      ext = File.extname  params[:objectName]
      name = File.basename params[:objectName], ext
      url = storage.put_object_url(ENV['S3_BUCKET_NAME'], "#{name}-#{Time.now.to_i.to_s[5..-1]}#{ext}", 15.minutes.from_now.to_time.to_i, headers, options)
    else
      url = storage.put_object_url(ENV['S3_BUCKET_NAME'], "file", 15.minutes.from_now.to_time.to_i, headers, options)
    end

    respond_to do |format|
      format.json { render json: {signedUrl: url} }
    end
  end

  def completed
    data = JSON.parse(params['json'])
    kind = "Image::#{data['kind'].upcase}".constantize
    image = Image.create(:src => data['src'], :kind => kind)
    @images = Image.public_send(data['kind'].pluralize)
  end


end
