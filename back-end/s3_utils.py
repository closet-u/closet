import boto3
from boto3 import client
import sys
import logging
from botocore.exceptions import ClientError
import pickle
import base64
from io import BytesIO
import random
import string


def create_bucket(bucket_name, region=None):
    # create a bucket
    try:
        if region is None:
            s3_client = boto3.client('s3')
            s3_client.create_bucket(Bucket=bucket_name)
        else:
            s3_client = boto3.client('s3', region_name=region)
            location = {'LocationConstraint': region}
            s3_client.create_bucket(
                Bucket=bucket_name, CreateBucketConfiguration=location)

    except ClientError as e:
        logging.error(e)
        return False
    return True

# delete bucket


def delete_bucket(bucket_name, region, keep_bucket):
    list_my_buckets(s3)

    if not keep_bucket:
        print('\nDeleting bucket:', bucket.name)
        bucket.delete()

        bucket.wait_until_not_exists()
        list_my_buckets(s3)
    else:
        print('\nKeeping bucket:', bucket.name)

# upload file
# def upload_file(file_name,bucket, object_name = None):
#     #if s3 object was not specified, use_filename
#     if object_name is None:
#         object_name = file_name
#     #upload file
#     s3_client = boto3.client('s3')
#     with open("FILE_NAME", "rb") as f:
#         s3.upload_fileobj(f, "BUCKET_NAME", "OBJECT_NAME")

# input data
# param bucket: The bucket to receive the data.
# :param object_key: The key of the object in the bucket.
# :param data: The data to upload. This can either be bytes or a string. When this
#              argument is a string, it is interpreted as a file name, which is
#              opened in read bytes mode.


def put_object(object_key, type, color, image):

    bucket = 'test-account-images'
    s3 = boto3.client('s3')
    compressed_data = pickle.dumps()
    s3.put_object(bucket, object_key)

    with open(img_src, "rb") as img_file:
        my_string = base64.b64encode(img_file.read())
    print(my_string)

    im = Image.open(BytesIO(base64.b64decode(my_string)))
    im.save('image1.png', 'PNG')

    # put_data = data
    # if isinstance(data, str):
    #     try:
    #         put_data = open(data, 'rb')
    #     except IOError:
    #         logger.exception("Expected file name or binary data, got '%s'.", data)
    #         raise
    #
    # try:
    #     obj = bucket.Object(object_key)
    #     obj.put(Body=put_data)
    #     obj.wait_until_exists()
    #     logger.info("Put object '%s' to bucket '%s'.", object_key, bucket.name)
    # except ClientError:
    #     logger.exception("Couldn't put object '%s' to bucket '%s'.",
    #                      object_key, bucket.name)
    #     raise
    # finally:
    #     if getattr(put_data, 'close', None):
    #         put_data.close()

# check data exists
# :param bucket: The bucket that contains the object.
# :param object_key: The key of the object to retrieve.
# :return: The object data in bytes.


def get_object(bucket, object_key):

    s3 = boto3.resource('s3', aws_access_key_id='AKIAIDRNOP55THYU4OXQ',
                        aws_secret_access_key='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')
    my_bucket = s3.Bucket(bucket)

    try:
        body = my_bucket.Object(object_key).get()['Body'].read()
        # logger.info("Got object '%s' from bucket '%s'.",
        #             object_key, bucket.name)
    except ClientError:
        logger.exception(("Couldn't get object '%s' from bucket '%s'.",
                          object_key, bucket.name))
        raise
    else:
        return body


# testing
# list all Buckets
def list_my_buckets(s3):
    print('Buckets:\n\t', *[b.name for b in s3.buckets.all()], sep="\n\t")


def bucket_exists(bucket_name):
    s3 = get_s3()
    try:
        s3.meta.client.head_bucket(Bucket=bucket_name)
        logger.info("Bucket %s exists.", bucket_name)
        exists = True
    except ClientError:
        logger.warning("Bucket %s doesn't exist",
                       bucket_name)
        exists = False
    return exists


def upload_file(file, bucket, c_color, c_type, file_t, object_name=None):

    key_tag = get_random_string(8)
    key_with_exten = key_tag + ".jpg"
    official_key = key_with_exten.strip()
    # If S3 object_name was not specified, use file_name
    if object_name is None:
        object_name = file

    # Upload the file
    s3_client = client('s3', aws_access_key_id='AKIAIDRNOP55THYU4OXQ',
                       aws_secret_access_key='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')
    try:
        response = s3_client.put_object(ACL='public-read',
                                        Body=file,
                                        Bucket=bucket, Key=official_key,
                                        ContentType=file_t,
                                        )
        response = s3_client.put_object_tagging(
            Bucket=bucket,
            Key=official_key,
            Tagging={
                'TagSet': [
                    {
                        'Key': 'Type',
                        'Value': c_type
                    },
                    {
                        'Key': 'Color',
                        'Value': c_color
                    }
                ]
            },
        )

    except ClientError as e:
        # logging.error(e)
        return False
    return True


def getTags(object_key):
    tags = []
    s3_client = client('s3', aws_access_key_id='AKIAIDRNOP55THYU4OXQ',
                       aws_secret_access_key='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')
    try:
        response = s3_client.get_object_tagging(
            Bucket='test-account-images',
            Key=object_key,
        )
        tagSet = response.get('TagSet')
        image_type = ''
        image_color = ''
        for vals in tagSet:
            if vals['Key'] == 'Type':
                image_type = vals['Value']
            elif vals['Key'] == 'Color':
                image_color = vals['Value']
            else:
                print('got ' + vals['Key'])
                return 1 / 0
        tags.append(image_type)
        tags.append(image_color)
        return tags

    except ClientError as e:
        return e


def listFiles():
    images = []
    tagset = {}
    # boto3
    s3_client = client('s3', aws_access_key_id='AKIAIDRNOP55THYU4OXQ',
                       aws_secret_access_key='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')
    # for key in s3_client.list_objects(Bucket='test-account-images')['Contents']:

    for key in s3_client.list_objects(Bucket='test-account-images')['Contents']:
        image = get_object('test-account-images', key['Key'])
        obj_tags = []
        encoded_image = base64.b64encode(image)
        decoded_image = encoded_image.decode('utf-8')
        # print(image)
        obj_key = key['Key']
        obj_col = 'color'
        obj_type = 'type'
        obj_tags = getTags(obj_key)
        image_type = obj_tags[0]
        image_color = obj_tags[1]
        # print(obj_key)

        images.append({
            obj_key: decoded_image,
            obj_col: image_color,
            obj_type: image_type,
            'filename': obj_key
        })

    return images


""" def success():
    if method == "POST":
        # print(request.json.keys())
    return 200

 """


def get_random_string(length):
    letters = string.ascii_lowercase
    result_str = ''.join(random.choice(letters) for i in range(length))
    return result_str


# def main():
#     stringo = get_random_string(8)
#     print(stringo)


# main()
