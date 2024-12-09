import { gql } from "../gql";

export const BOOKS_QUERY = gql(`
  query GetBooks {
    viewer {
      books {
        hits {
          id
          displayTitle
          url
          subjects {
            name
            id
          }
          levels {
            name
            id
          }
          valid
        }
      }
    }
  }
`);

export const CHAPTERS_QUERY = gql(`
  query GetChapters($bookId: Int!) {
    viewer {
      chapters(bookIds: [$bookId]) {
        hits {
          id
          title
          url
          valid
          book {
            title
          }
        }
      }
    }
  }
`);

export const PAGES_QUERY = gql(`
  query GetPages($chapterId: Int) {
    viewer {
      pages(chapterIds: [$chapterId]) {
        hits {
          id
          title
          picture
          page
          valid
          chapter {
            title
          }
        }
      }
    }
  }
`);
