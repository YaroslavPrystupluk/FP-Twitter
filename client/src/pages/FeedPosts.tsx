import { FC } from 'react'
import {  FormAddPosts, PostsList, Profile } from '../components'
import { Box, } from '@mui/material'

const FeedPosts: FC = () => {
  return (
    <>
      <Box component='section'>
        <Profile />
      </Box>
      <Box>
        <FormAddPosts />
      </Box>
    <Box component="section" >
     <PostsList />
    </Box>
    </>
  )
}

export default FeedPosts
