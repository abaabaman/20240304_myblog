// const router = createRouter({ ... })
import router from './index.ts'

router.beforeEach(({ meta }) => {
  document.title = meta.title || '包包博客';
  return true;
})
