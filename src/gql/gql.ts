/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
const documents = {
    "\n  query GetBooks {\n    viewer {\n      books {\n        hits {\n          id\n          displayTitle\n          url\n          subjects {\n            name\n            id\n          }\n          levels {\n            name\n            id\n          }\n          valid\n        }\n      }\n    }\n  }\n": types.GetBooksDocument,
    "\n  query GetChapters($bookId: Int!) {\n    viewer {\n      chapters(bookIds: [$bookId]) {\n        hits {\n          id\n          title\n          url\n          valid\n          book {\n            title\n          }\n        }\n      }\n    }\n  }\n": types.GetChaptersDocument,
    "\n  query GetPages($chapterId: Int) {\n    viewer {\n      pages(chapterIds: [$chapterId]) {\n        hits {\n          id\n          title\n          picture\n          page\n          valid\n          chapter {\n            title\n          }\n        }\n      }\n    }\n  }\n": types.GetPagesDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetBooks {\n    viewer {\n      books {\n        hits {\n          id\n          displayTitle\n          url\n          subjects {\n            name\n            id\n          }\n          levels {\n            name\n            id\n          }\n          valid\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetBooks {\n    viewer {\n      books {\n        hits {\n          id\n          displayTitle\n          url\n          subjects {\n            name\n            id\n          }\n          levels {\n            name\n            id\n          }\n          valid\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetChapters($bookId: Int!) {\n    viewer {\n      chapters(bookIds: [$bookId]) {\n        hits {\n          id\n          title\n          url\n          valid\n          book {\n            title\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetChapters($bookId: Int!) {\n    viewer {\n      chapters(bookIds: [$bookId]) {\n        hits {\n          id\n          title\n          url\n          valid\n          book {\n            title\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetPages($chapterId: Int) {\n    viewer {\n      pages(chapterIds: [$chapterId]) {\n        hits {\n          id\n          title\n          picture\n          page\n          valid\n          chapter {\n            title\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetPages($chapterId: Int) {\n    viewer {\n      pages(chapterIds: [$chapterId]) {\n        hits {\n          id\n          title\n          picture\n          page\n          valid\n          chapter {\n            title\n          }\n        }\n      }\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;