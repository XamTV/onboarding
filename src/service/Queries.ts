import { gql } from "@apollo/client";

export const BOOKS_QUERY = gql`
  query GetBooks {
    viewer {
      books {
        hits {
          id
          displayTitle
          url
          subjects {
            name
          }
          levels {
            name
          }
          valid
        }
      }
    }
  }
`;

export const CHAPTERS_QUERY = gql`
  query GetChapters($bookId: Int!) {
    viewer {
      chapters(bookIds: [$bookId]) {
        hits {
          id
          title
          url
          valid
        }
      }
    }
  }
`;

export const PAGES_QUERY = gql`
  query GetPages($chapterId: Int) {
    viewer {
      pages(chapterIds: [$chapterId]) {
        hits {
          id
          title
          picture
          page
          valid
        }
      }
    }
  }
`;
