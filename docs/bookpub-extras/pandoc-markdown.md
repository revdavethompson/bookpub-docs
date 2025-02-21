# Pandoc Markdown Tutorial

This tutorial demonstrates how Pandoc converts extended Markdown into HTML. We’ll cover:

- General Markdown
- Fenced code blocks and attributes
- Link attributes
- Bracketed spans
- Generic attributes
- Raw attributes
- How to designate specific HTML tags: section, article, footer, div, span, pre, code, br, hr

---

## 1. General Markdown

Basic Markdown elements work as you’d expect. For example:

```markdown
# Sample Heading

This is a paragraph with **bold text** and *italic text*.

- List item 1
- List item 2
```

Pandoc converts that into:

```html
<h1>Sample Heading</h1>
<p>This is a paragraph with <strong>bold text</strong> and <em>italic text</em>.</p>
<ul>
  <li>List item 1</li>
  <li>List item 2</li>
</ul>
```

---

## 2. Fenced Code Blocks and Attributes

Pandoc supports fenced code blocks with extra attributes to set language, id, classes, etc.

```markdown
    ```python {#code-example .highlight}
    def greet():
        print("Hello, world!")
    ```
```

This tells Pandoc to wrap the code in a `<pre>` and `<code>` block, add an `id` of `code-example`, a class `highlight`, and also a language class for syntax highlighting:

```html
<pre id="code-example" class="highlight">
  <code class="language-python">def greet():
    print("Hello, world!")
  </code>
</pre>
```

---

## 3. Link Attributes

You can attach extra attributes to links. Check out this example:

```markdown
[Visit Google](https://google.com){: target="_blank" class="external-link"}
```

Pandoc converts it into:

```html
<p><a href="https://google.com" target="_blank" class="external-link">Visit Google</a></p>
```

---

## 4. Bracketed Spans

Bracketed spans let you add attributes to inline elements. For instance:

```markdown
This is a [highlighted text]{.highlight} within a sentence.
```

Results in:

```html
<p>This is a <span class="highlight">highlighted text</span> within a sentence.</p>
```

---

## 5. Generic Attributes

Generic attributes work on block-level elements like headings or paragraphs. For example:

```markdown
# A Titled Section {.section-title}

Some paragraph text with a generic attribute.
```

Converts to:

```html
<h1 class="section-title">A Titled Section</h1>
<p>Some paragraph text with a generic attribute.</p>
```

---

## 6. Raw Attributes

Raw HTML in your Markdown is passed through as-is, including its attributes. For example:

```markdown
<div data-info="raw" style="color: red;">
  This is a raw HTML block with attributes.
</div>
```

Pandoc leaves it untouched:

```html
<div data-info="raw" style="color: red;">
  This is a raw HTML block with attributes.
</div>
```

---

## 7. Designating Specific HTML Tags

Pandoc’s Divs (and inline spans) let you specify a custom HTML tag by using the `tag` attribute.

### Section

```markdown
::: {tag=section #sec1 .intro}
This content is inside a <code>section</code> element.
:::
```

Becomes:

```html
<section id="sec1" class="intro">
  <p>This content is inside a <code>section</code> element.</p>
</section>
```

### Article

```markdown
::: {tag=article #article1 .post}
Content inside an <code>article</code> element.
:::
```

Converts to:

```html
<article id="article1" class="post">
  <p>Content inside an <code>article</code> element.</p>
</article>
```

### Footer

```markdown
::: {tag=footer #footer1}
Footer content goes here.
:::
```

Becomes:

```html
<footer id="footer1">
  <p>Footer content goes here.</p>
</footer>
```

### Div

A standard Div (without overriding the tag) remains a `<div>`:

```markdown
::: {#div1 .container}
Content inside a div.
:::
```

Converts to:

```html
<div id="div1" class="container">
  <p>Content inside a div.</p>
</div>
```

### Span

Bracketed spans by default yield `<span>` elements. For example:

```markdown
Here is an [inline span]{#span1 .highlight} in a sentence.
```

Results in:

```html
<p>Here is an <span id="span1" class="highlight">inline span</span> in a sentence.</p>
```

### Pre and Code

Fenced code blocks (as shown earlier) automatically produce `<pre>` and `<code>` blocks.

### Line Break (br)

A hard line break can be made by ending a line with two spaces:

First line with a hard break.  -- Two Spaces
```markdown
Second line continues.
```

This converts to:

```html
<p>First line with a hard break.<br />
Second line continues.</p>
```

### Horizontal Rule (hr)

A horizontal rule is simply three or more hyphens:

```markdown
---
```

Which becomes:

```html
<hr />
```