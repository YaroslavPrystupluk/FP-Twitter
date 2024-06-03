import { FC } from 'react'
import { FormPosts, PostsList } from '../components'

const FeedPosts: FC = () => {
  return (
    <div>
     <PostsList />
     <FormPosts />
    </div>
  )
}

export default FeedPosts
