package com.seafood.back.service.imple;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.SdkClientException;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.client.builder.AwsClientBuilder.EndpointConfiguration;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.seafood.back.service.S3Service;

import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.io.InputStream;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class S3ServiceImple implements S3Service {

    // AWS S3 관련 정보
    @Value("${aws.s3.bucket}")
    private String s3BucketName;

    private final AmazonS3 s3Client;

    @Override
    public String saveImageToS3(MultipartFile imageFile, String fileName) throws IOException {
        try {
            InputStream inputStream = imageFile.getInputStream();
            ObjectMetadata metadata = new ObjectMetadata();
            metadata.setContentLength(inputStream.available());
            metadata.setContentType(imageFile.getContentType());
            String key = fileName;

            PutObjectRequest request = new PutObjectRequest(s3BucketName, key, inputStream, metadata);
            s3Client.putObject(request);

            return key;
        } catch (AmazonServiceException e) {
            e.printStackTrace();
            throw new IOException("이미지를 S3에 업로드하는 중에 오류가 발생했습니다.", e);
        } catch (SdkClientException e) {
            e.printStackTrace();
            throw new IOException("S3 클라이언트와의 통신 중에 오류가 발생했습니다.", e);
        }
    }

    @Override
    public String getImageUrl(String key) throws IOException {
        try {
            // 이미지 URL 반환
            String imageUrl = s3Client.getUrl(s3BucketName, key).toString();
            return imageUrl;
        } catch (AmazonServiceException e) {
            e.printStackTrace();
            throw new IOException("이미지 URL을 가져오는 중에 오류가 발생했습니다.", e);
        } catch (SdkClientException e) {
            e.printStackTrace();
            throw new IOException("S3 클라이언트와의 통신 중에 오류가 발생했습니다.", e);
        }
    }
}
