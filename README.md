# Personal Site with Astro

Welcome to the repository for my personal website, built using [Astro](https://astro.build/). This site serves as a portfolio, blog, and a place to share my projects and thoughts.

## 🚀 Project Overview

This project is a static website built with Astro, a modern static site generator that allows you to build fast, optimized websites with your favorite frameworks like React, Svelte, or Vue. The site is designed to be lightweight, fast, and easy to maintain.

### Features:

- **Blog**: A collection of articles and tutorials.
- **Portfolio**: Showcase of my projects and work.
- **Responsive Design**: Optimized for all devices.
- **SEO Friendly**: Built with SEO best practices in mind.
- **Dark Mode**: Supports dark mode for better readability.

## 🛠️ Technologies Used

- **Astro**: For building the static site.
- **Tailwind CSS**: For styling and responsive design.
- **Markdown**: For writing blog posts.
- **JavaScript/TypeScript**: For interactivity and dynamic content.
- **Cloudflare Pages**: For hosting the site.

## 📂 Project Structure

```bash
personal-site-astro/
├── src/
│   ├── assets/           # Static assets (images, fonts, etc.)
│   ├── components/       # Reusable components
│   ├── content/          # Blog posts in Markdown
│   ├── layouts/          # Layout templates
│   ├── pages/            # Site pages
│   └── utils/            # Helpers methods for formatting, parsing, etc.
├── public/               # Static assets (images, fonts, etc.)
├── astro.config.mjs      # Astro configuration
├── tailwind.config.cjs   # Tailwind CSS configuration
├── wrangler.toml         # Cloudflare page configs
└── README.md             # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js (18 or higher)
- npm or yarn

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/rodrigobustamante/personal-site-astro.git
   cd personal-site-astro
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Run the development server:**

   ```bash
   npm run dev
   ```

   The site will be available at `http://localhost:4321`.

4. **Build the site for production:**

   ```bash
   npm run build
   ```

   The built files will be in the `dist/` directory.

5. **Preview with wrangler:**

   ```bash
   npm run preview
   ```

   This will preview the site using wrangler to simulate the deploy on Cloudflare pages.

## 📝 Blogging

To add a new blog post:

1. Create a new Markdown file in the `src/content/post` directory.  
   **Note**: The content/post folder has two subfolders, en and es, for future posts in English and Spanish.
2. Use the following frontmatter template:

   ```markdown
   ---
   publishDate: YYYY-MM-DD
   title: 'Your post title'
   excerpt: 'Your post description'
   image: 'Your post image'
   category: 'Your post category'
   draft: 'true or false if the post is a draft'
   tags: 'List of tags'
   metadata:
     title: 'Your post title'
     description: 'Your post description'
   ---

   # Your Post Title

   Your content here...
   ```

3. Save the file and the post will be automatically included in the blog.

## 🤝 Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, feel free to open an issue or submit a pull request.

## 📄 License

This project is licensed under the MIT License.

## 📧 Contact

If you have any questions or just want to say hi, feel free to reach out to me via [email](mailto:rbustamantejelvez@gmail.com) or connect with me on [LinkedIn](https://www.linkedin.com/in/rod-bustamante/).

---

Thank you for visiting my repository! 🎉
