import ImageController from './ImageController';
import PostController from './PostController';

const Blog = {
    PostController: Object.assign(PostController, PostController),
    ImageController: Object.assign(ImageController, ImageController),
};

export default Blog;
