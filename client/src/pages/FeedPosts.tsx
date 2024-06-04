import { FC } from 'react'
import {  FormAddPosts, PostsList } from '../components'
import { Box, Container } from '@mui/material'

const FeedPosts: FC = () => {
  return (
    <Container maxWidth="lg">
      <Box>
        <FormAddPosts />
      </Box>
    <Box component="section" >
     <PostsList />
    </Box>
    </Container>
  )
}

export default FeedPosts
