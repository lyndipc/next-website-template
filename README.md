# Next.js Website Template

This is a website template. Update it with your own content, design, and features.

## 🚀 Features

- Modern, responsive design
- Contact form integration
- FAQ system
- Rate limiting & security
- SEO optimized
- Mobile-first approach

## 🛠️ Tech Stack

- **Framework:** Next.js 15 with TypeScript
- **Styling:** Custom CSS with design system
- **Database:** Airtable (for contact forms)
- **Cache:** Upstash Redis (for rate limiting)
- **Deployment:** Vercel (recommended)

## 📋 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Git

### Installation

1. Clone the repository

```bash
git clone <your-repo-url>
cd fake-company
```

2. Install dependencies

```bash
npm install
```

3. Set up environment variables

```bash
cp .env.example .env.local
# Edit .env.local with your actual values
```

4. Run the development server

```bash
npm run dev
```

5. Open [https://fakecompany.abc](https://fakecompany.abc)

## ⚙️ Configuration

### Site Settings

Edit `src/config/site.ts` to customize:

- Site name and description
- Contact information
- Features and content
- Navigation menu
- SEO settings

### Theme Customization

Update `src/app/globals.css` to change:

- Brand colors (currently #ef4444)
- Typography
- Spacing
- Component styles

### Content Management

Update content in these files:

- `src/data/faq.ts` - FAQ questions and answers
- `src/config/site.ts` - Main site content

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm test` - Run tests

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository in [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy!

### Other Platforms

- **Netlify:** Build command: `npm run build`
- **Digital Ocean:** Use their App Platform
- **AWS:** Deploy via Amplify or EC2

## 📊 Analytics

This site supports multiple analytics platforms:

- Google Analytics
- Umami (privacy-focused)
- Vercel Analytics

Add your tracking ID to the environment variables.

## 🛡️ Security Features

- Rate limiting on API endpoints
- Input validation and sanitization
- CSRF protection
- Security headers
- Environment variable protection

## 📞 Contact

- **Website:** https://fakecompany.abc
- **Email:** bob@fakecompany.abc
- **Phone:** +1 (555) 123-4567

## 🏢 Company Information

**Fake Company, LLC**
123 Main Street
Your City, ST 12345
United States

Founded: 2025
Industry: technology

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

Built with:

- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Upstash](https://upstash.com/)
- [Airtable](https://airtable.com/)

---

Made with ❤️ by [@lyndipc](https://github.com/lyndipc)
