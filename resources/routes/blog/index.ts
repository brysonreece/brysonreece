import posts from './posts'
import images from './images'

const blog = {
    posts: Object.assign(posts, posts),
    images: Object.assign(images, images),
}

export default blog