import PostController from './PostController'
import ImageController from './ImageController'

const Blog = {
    PostController: Object.assign(PostController, PostController),
    ImageController: Object.assign(ImageController, ImageController),
}

export default Blog