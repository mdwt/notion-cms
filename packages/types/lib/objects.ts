import {
  BlockType,
  CodeLanguage,
  ISO8601Date,
  ObjectType,
  URL,
  UUID,
} from "./base";
import { Property } from "./props";
import { RichTextObject } from "./text";

export interface BaseObject<T extends ObjectType> {
  object?: T;
}

export interface List<T extends Page | BaseBlock<any>>
  extends BaseObject<"list"> {
  results: T[];
  next_cursor: string | null;
  has_more: boolean;
}

// USERS

interface EmptyUser extends BaseObject<"user"> {
  id: UUID;
}
interface BaseUser extends BaseObject<"user"> {
  id: UUID;
  type: "person" | "bot";
  name: string | null;
  avatar_url: URL | null;
}
interface PersonUser extends BaseUser {
  type: "person";
  person: {
    email: string;
  };
}
interface BotUser extends BaseUser {
  type: "bot";
  bot: any;
}
export type User = EmptyUser | PersonUser | BotUser;

// PAGES

interface BaseParent {
  type: "database_id" | "page_id" | "workspace";
}
interface DatabaseParent extends BaseParent {
  type: "database_id";
  database_id: UUID;
}
interface PageParent extends BaseParent {
  type: "page_id";
  page_id: UUID;
}
interface WorkspaceParent extends BaseParent {
  type: "workspace";
  workspace: true;
}
type Parent = DatabaseParent | PageParent | WorkspaceParent;

export interface Page extends BaseObject<"page"> {
  id: UUID;
  created_time: ISO8601Date;
  last_edited_time: ISO8601Date;
  archived: boolean;
  icon: FileObject | EmojiObject | null;
  cover: FileObject | null;
  properties: Record<string, Property>;
  parent: Parent;
  url: URL;
}

// FILES

interface BaseFileObject extends BaseObject<"external" | "file"> {
  caption?: RichTextObject[];
}

export interface NotionFileObject extends BaseFileObject {
  type?: "file";
  file: {
    url: URL;
    expiry_time: ISO8601Date;
  };
  name?: string;
}

export interface ExternalFileObject extends BaseFileObject {
  type?: "external";
  external: {
    url: URL;
  };
  name?: string;
}

export type FileObject = NotionFileObject | ExternalFileObject;

// EMOJI

export interface EmojiObject {
  type: "emoji";
  emoji: string;
}

// BLOCKS

export interface BaseBlock<T extends BlockType> extends BaseObject<"block"> {
  id: UUID;
  created_time: ISO8601Date;
  last_edited_time: ISO8601Date;
  has_children: boolean;
  archived: boolean;
  type: T;
  children?: Blocks;
}

export interface ParagraphBlock extends BaseBlock<"paragraph"> {
  paragraph: {
    text: RichTextObject[];
    children?: Block[];
  };
}

export interface Heading1Block extends BaseBlock<"heading_1"> {
  heading_1: {
    text: RichTextObject[];
  };
}

export interface Heading2Block extends BaseBlock<"heading_2"> {
  heading_2: {
    text: RichTextObject[];
  };
}

export interface Heading3Block extends BaseBlock<"heading_3"> {
  heading_3: {
    text: RichTextObject[];
  };
}

export interface CalloutBlock extends BaseBlock<"callout"> {
  callout: {
    text: RichTextObject[];
    icon: FileObject | EmojiObject;
    children?: Blocks;
  };
}

export interface QuoteBlock extends BaseBlock<"quote"> {
  quote: {
    text: RichTextObject[];
    children?: Blocks;
  };
}

export interface BulletedListItemBlock extends BaseBlock<"bulleted_list_item"> {
  bulleted_list_item: {
    text: RichTextObject[];
    children?: Blocks;
  };
}

export interface NumberedListItemBlock extends BaseBlock<"numbered_list_item"> {
  numbered_list_item: {
    text: RichTextObject[];
    children?: Blocks;
  };
}

export interface ToDoBlock extends BaseBlock<"to_do"> {
  to_do: {
    text: RichTextObject[];
    checked?: boolean;
    children?: Blocks;
  };
}

export interface ToggleBlock extends BaseBlock<"toggle"> {
  toggle: {
    text: RichTextObject[];
    children?: Blocks;
  };
}

export interface CodeBlock extends BaseBlock<"code"> {
  code: {
    text: RichTextObject[];
    language: CodeLanguage;
  };
}

export interface ChildPageBlock extends BaseBlock<"child_page"> {
  child_page: {
    title: string;
  };
}

export interface ChildDatabaseBlock extends BaseBlock<"child_database"> {
  child_database: {
    title: string;
  };
}

export interface EmbedBlock extends BaseBlock<"embed"> {
  embed: {
    url: URL;
  };
}

export interface ImageBlock extends BaseBlock<"image"> {
  image: FileObject;
}

export interface VideoBlock extends BaseBlock<"video"> {
  video: FileObject;
}

export interface FileBlock extends BaseBlock<"file"> {
  file: FileObject;
}

export interface PDFBlock extends BaseBlock<"pdf"> {
  pdf: FileObject;
}

export interface BookmarkBlock extends BaseBlock<"bookmark"> {
  bookmark: {
    url: URL;
    caption: RichTextObject[];
  };
}

export interface EquationBlock extends BaseBlock<"equation"> {
  equation: {
    expression: string;
  };
}

export interface DividerBlock extends BaseBlock<"divider"> {
  divider: {};
}

export interface TOCBlock extends BaseBlock<"table_of_contents"> {
  table_of_contents: {};
}

export interface BreadcrumbBlock extends BaseBlock<"breadcrumb"> {
  breadcrumb: {};
}

export interface ColumnListBlock extends BaseBlock<"column_list"> {
  column_list: {};
}

export interface ColumnBlock extends BaseBlock<"column"> {
  column: {};
}

export interface TemplateBlock extends BaseBlock<"template"> {
  template: any;
}

export interface SyncedBlock extends BaseBlock<"synced_block"> {
  synced_block: {
    synced_from: {
      type: "block_id";
      block_id: UUID;
    };
  };
}

export interface LinkToPageBlock extends BaseBlock<"link_to_page"> {
  link_to_page:
    | { type: "page_id"; page_id: UUID }
    | { type: "database_id"; database_id: UUID };
}

export interface AudioBlock extends BaseBlock<"audio"> {
  audio: any;
}

export interface LinkPreviewBlock extends BaseBlock<"link_preview"> {
  link_preview: { url: string };
}

export interface UnsupportedBlock extends BaseBlock<"unsupported"> {
  unsupported?: {};
}

export type Block =
  | ParagraphBlock
  | Heading1Block
  | Heading2Block
  | Heading3Block
  | CalloutBlock
  | QuoteBlock
  | BulletedListItemBlock
  | NumberedListItemBlock
  | ToDoBlock
  | ToggleBlock
  | CodeBlock
  | ChildPageBlock
  | ChildDatabaseBlock
  | EmbedBlock
  | ImageBlock
  | VideoBlock
  | FileBlock
  | PDFBlock
  | BookmarkBlock
  | EquationBlock
  | DividerBlock
  | TOCBlock
  | BreadcrumbBlock
  | ColumnListBlock
  | ColumnBlock
  | TemplateBlock
  | SyncedBlock
  | LinkToPageBlock
  | AudioBlock
  | LinkPreviewBlock
  | UnsupportedBlock;
export type Blocks = Block[];
