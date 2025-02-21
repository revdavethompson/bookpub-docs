---
sidebar_position: 1
---

# Tutorial Intro

## Table of Contents

- [Installation](#installation)  
- [Quick Start](#quick-start)  
- [Project Structure](#project-structure)  
- [Using Pipelines or Stages](#using-pipelines-or-stages)  
- [Working With Meta](#working-with-meta)  
- [Overriding or Adding Stages](#overriding-or-adding-stages)  
- [Build Outputs](#build-outputs)  
- [Pandoc Markdown Tutorial](#pandoc-markdown-tutorial)  

---

## Pre-Requisites

1. **Installing Pandoc**

    bookpub uses pandoc in its built-in markdown stage
    * (You can easily use something else by visiting the [Overriding or Adding Stages](#overriding-or-adding-stages) section)

    Please visit the [Pandoc Installation Page](https://pandoc.org/installing.html) for directions on installing Pandoc on your operating system

2. **Installing PrinceXML**

    bookpub uses princexml (an advanced PDF typesetting library) in its built-in pdf stage
    * (You can easily use something else, by visiting the [Overriding or Adding Stages](#overriding-or-adding-stages) section)

    Please visit the [PrinceXML Installation Page](https://www.princexml.com/doc/12/doc-install/) for directions on installing Pandoc on your operating system

---

## Installation

```bash
npm install -g bookpub
```

---

## Quick Start

1. **Create a new `bookpub` project**:
   ```bash
   bookpub new my-book
   ```
   This scaffolds a folder `my-book/` with all the necessary boilerplate code/files.

3. **Build an HTML format of your book**:
   ```bash
   cd my-book
   bookpub build html
   ```
   The output is in `build/html/`.

4. **Open** `manuscript/index.md.ejs` to write your content, or **customize** `book.config.yml` with your book’s metadata and pipelines/stages.

---

## Project Structure

When you create a new Bookpub project (e.g. `my-book/`), you’ll typically see:

```
my-book/
├── .gitignore
├── README.md
├── book.config.yml
├── manuscript/
│   ├── index.md.ejs
│   └── themes/
|       └── default/
│           ├── css/
│           │   ├── styles.pdf.scss
│           │   └── styles.epub.scss
│           ├── images/
│           └── ...
├── stages/
├── package.json
└── ...
```

- **`book.config.yml`**: Central config for metadata, pipeline definitions, etc.
- **`manuscript/`**: The source files for your book.  
  - `index.md.ejs` is your main entry point, combining EJS + Markdown.  
  - `themes/` holds SCSS/CSS, images, fonts, etc.
- **`stages/`**: (Optional) Put custom stages or override existing ones here.  
- **`package.json`**: The project’s local dependencies (including `bookpub`).

---

## Using Pipelines or Stages

### Default Pipelines & Stages (`book.config.yml`)

Bookpub comes with a couple pipelines pre-defined for `html` and `pdf` that have pre-built stages (_all of which you can override_):

```yaml
buildPipelines:
  html:
    stages:
      - name: ejs
      - name: markdown
      - name: themes
      - name: writeHtml

  pdf:
    stages:
      - name: ejs
      - name: markdown
      - name: themes
      - name: writeHtml
      - name: pdf
```

Now `bookpub build pdf` will run the pdf build-pipeline and execute these stages in order: `ejs > markdown > themes > writeHtml > pdf `.

### Defining Custom Pipelines in `book.config.yml`

```yaml
# book.config.yml

global: # Applied globally to all pipelines
  meta:
    title: "My Book"
    author: "Famous Name"
  stages:
    - name: ejs # Applied to all ejs stages in every pipeline
      config:
        rmWhitespace: true

buildPipelines:
  pdf-lg: # A custom pipeline for a large font pdf
    meta:
      title: "My Book (Large Print)" # Overrides global meta
      fontSize: 18
    stages:
      - name: ejs
        config: # Overrides global settings for thie pipeline
          rmWhitespace: false
      - name: markdown
      - name: theme
      - name: writeHtml
      - name: pdf
        config:
          lineSpacing: 1.5
```

Now `bookpub build pdf-lg` will run the pdf-lg build-pipeline and execute these stages in order: `ejs > markdown > themes > writeHtml > pdf `.

---

## Working With Meta

Your `file.md.ejs` can reference metadata from `book.config.yml` like this:

```markdown
# <%= meta.title %>

Author: <%= meta.author %>

This is dynamic EJS. If you specify `meta.title` in `book.config.yml`,
it appears here at build time.
```

1. **global** `meta` applie to **all** builds.  
2. **Pipeline-specific** `meta` (defined under a pipeline) override global values for that build only.

---

## Overriding or Adding Stages

### Overriding a Pre-Built Stage

If you want to modify bookpub's pre-built **ejs** stage (for example), just create a matching folder in your project:
```
my-book/
└─ stages/
   └─ ejs/
      └─ index.js
```
Inside `index.js`, export a `run()` function:

```js
// my-book/stages/ejs/index.js
export async function run(manuscript, { stageConfig, globalConfig }) {
  // Your custom logic
  // e.g., call the built-in ejs stage, then do extra stuff
  // or replace it entirely
  return manuscript;
}
```

Bookpub automatically detects `stages/ejs/index.js` and uses it **instead** of the pre-built EJS stage.

### Creating a New Stage

Just name a folder in `stages/` (e.g., `stages/compressImages/`) with an `index.js`:

```js
// my-book/stages/compressImages/index.js
export async function run(manuscript, { stageConfig, globalConfig }) {
  console.log("Compressing images...");
  // do your stuff
  return manuscript;
}
```

Then add it to a pipeline in `book.config.yml`:

```yaml
buildPipelines:
  pdf:
    stages:
      - name: ejs
      - name: compressImages
      - name: markdown
      - name: theme
```

---

### Developing Custom Stages

Bookpub's modular design allows you to extend or replace any stage by creating a new module. Each stage is expected to expose a single asynchronous function named `run()`. When Bookpub executes a build pipeline, it will call the `run()` function for each stage, passing in three key parameters:

- **`run()` Function**  
  This is the entry point for your stage. It must be an asynchronous function (or return a Promise) so that the build pipeline can wait for it to complete its work before proceeding to the next stage. For example:
  
  ```js
  export async function run(manuscript, { stageConfig, globalConfig }) {
    // Your custom stage logic here
    return manuscript;
  }
  ```

- **`manuscript` Object**  
  This object represents the current state of the manuscript and is passed from one stage to the next. It typically contains:
  
  - `manuscript.content`: The manuscript content (e.g., rendered Markdown or HTML). Each stage can read or modify this property.
  - `manuscript.buildType`: The current build type (e.g., `'html'`, `'pdf'`, etc.), which might affect how the stage processes the content.
  
  Your stage should update and then return the modified `manuscript` so that subsequent stages can work with the latest version.

- **`stageConfig` Object**  
  This object contains configuration options specific to the current stage. It is built by merging any global defaults (from `global.stages` in `book.config.yml`) with pipeline-specific overrides. It is typically structured as follows:
  
  ```js
  {
    config: {
      // Stage-specific configuration options go here.
      // For example, for the built-in EJS stage:
      rmWhitespace: true
    },
    meta: {
      // Optional stage-specific metadata.
    }
  }
  ```
  
  Use `stageConfig.config` to access options for your stage. For example, if you’re building a custom image compressor, you might include options such as `quality` or `maxWidth` in this object.

- **`globalConfig` Object**  
  This object contains configuration and metadata that apply to every stage. Typically, it includes:
  
  ```js
  {
    meta: {
      // Global metadata such as title, author, publication date, etc.
      title: "My Awesome Book",
      author: "John Doe",
      ...
    }
  }
  ```
  
  This allows your stage to access universal information about the book, regardless of its own specific configuration.

By following this API, you ensure that your custom stage can be seamlessly integrated into Bookpub's build pipeline. Developers can add new functionality or override existing stages simply by creating a folder under `/stages/` with the same name as the stage they want to replace. Bookpub will automatically use your custom implementation.

## Build Outputs

By default, Bookpub outputs to:
```
build/<buildType>/
```
For example:
```
build/html/
build/pdf/
build/pdf-lg/
```
That folder might include:
- **index.html** (or whatever each stage produces)
- **themes/** (copied or compiled assets)
- Final PDF, EPUB, or other output generated by custom stages