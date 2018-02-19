import Vue from 'vue'
import Router from 'vue-router'

const Home = () => {
  return import('@/components/Home')
}

const About = () => {
  return import('@/components/About')
}

const Posts = () => {
  return import('@/components/Posts')
}

const All = () => {
  return import('@/components/All')
}

const Display = () => {
  return import('@/components/Display')
}

const Post = () => {
  return import('@/components/Post')
}

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/posts',
      component: Posts,
      children: [
        {
          path: '',
          name: 'All Posts',
          component: All
        },
        {
          path: 'tag/:tag',
          name: 'Display posts by tag name',
          component: Display
        },
        {
          path: 'category/:category',
          name: 'Display posts by category',
          component: Display
        },
        {
          path: 'show/:post',
          name: 'Post',
          component: Post
        }
      ]
    }
  ]
})
