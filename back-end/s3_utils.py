import boto3
import sys
import logging
from botocore.exceptions import ClientError


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


def put_object(bucket, object_key, data):
    put_data = data
    if isinstance(data, str):
        try:
            put_data = open(data, 'rb')
        except IOError:
            logger.exception(
                "Expected file name or binary data, got '%s'.", data)
            raise

    try:
        obj = bucket.Object(object_key)
        obj.put(Body=put_data)
        obj.wait_until_exists()
        logger.info("Put object '%s' to bucket '%s'.", object_key, bucket.name)
    except ClientError:
        logger.exception("Couldn't put object '%s' to bucket '%s'.",
                         object_key, bucket.name)
        raise
    finally:
        if getattr(put_data, 'close', None):
            put_data.close()

# check data exists
# :param bucket: The bucket that contains the object.
# :param object_key: The key of the object to retrieve.
# :return: The object data in bytes.


def get_object(bucket, object_key):

    try:
        body = bucket.Object(object_key).get()['Body'].read()
        logger.info("Got object '%s' from bucket '%s'.",
                    object_key, bucket.name)
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
