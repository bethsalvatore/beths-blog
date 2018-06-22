import { scrollTo, kebabify, prettyDate } from '../helpers'

// recieves filter object through parent <Blog> component
export default {
  name: 'blog-feed',
  resource: 'BlogFeed',
  props: { filters: Object },

  data() {
    return { posts: [] }
  },

  computed: {
    reading() { return this.filters.post },
    classes() {
      return {
        'preview': true,
        'blog__post': true,
        'preview--reading': this.reading
      }
    },
    // will automatically handle any changes to the filter as they happen
    // by looping through filter
    feed() {
      const filterBy = {
        post: (filter, { id }) => filter === id,
        author: (filter, { author }) => filter === this.kebabify(author)
      }

      if (!Object.keys(this.filters).length) return this.posts

      return this.posts.filter(post => {
        return Object.keys(this.filters).every(filter => {
          return filterBy[filter](this.filters[filter], post)
        })
      })
    }
  },

  methods: { scrollTo, kebabify, prettyDate },
  beforeMount() { this.$getResource('feed') }
}
