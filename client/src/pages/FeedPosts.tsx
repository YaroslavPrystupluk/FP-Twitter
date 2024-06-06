import { FC } from 'react'
import {  FormAddPosts, PostsList, Profile } from '../components'
import { Box, Container } from '@mui/material'

const FeedPosts: FC = () => {
  return (
    <Container maxWidth="xl">
      <Box>
        <Profile />
      </Box>
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
