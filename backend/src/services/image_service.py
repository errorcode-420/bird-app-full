import tensorflow as tf

def preprocess_image(image_bytes, image_size):
    img = tf.io.decode_image(image_bytes, channels=3)
    img = tf.image.resize(img, [image_size, image_size])
    img = tf.cast(img, tf.float32) / 255.0
    img = tf.expand_dims(img, axis=0)
    return img
