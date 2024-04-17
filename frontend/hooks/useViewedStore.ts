import { useLocalStorage } from "usehooks-ts"

type ViewedMap = Record<string, number>

const LOCALSTORAGE_KEY = "rofl-viewing-index"

export default function useViewedStore() {
  const [viewedIndexes, setViewedIndexes] = useLocalStorage<ViewedMap>(
    LOCALSTORAGE_KEY,
    {},
    {
      initializeWithValue: false, // for ssr
    }
  )

  const setViewedIndex = (slug: string, index: number) => {
    if (getViewedIndex(slug) !== index) {
      setViewedIndexes((val) => ({ ...val, [slug]: index }))
    }
  }

  const exist = (slug: string) => {
    return slug in viewedIndexes
  }

  const getViewedIndex = (slug: string) => {
    return viewedIndexes[slug] || 0
  }

  return {
    setViewedIndex,
    exist,
    getViewedIndex,
  }
}
