# Next.js Website Template

A production-ready Next.js website template with built-in rate limiting, Redis integration via Upstash, and Airtable contact forms.

## ✨ Features

- **Next.js 15** with TypeScript and Turbopack
- **Rate Limiting** using Redis and Upstash
- **Contact Form** with Airtable integration
- **Testing** setup with Jest
- **ESLint** configuration
- **Production-ready** deployment setup

## 🚀 Quick Start

### Option 1: Use GitHub Template (Recommended)
1. Click the **"Use this template"** button at the top of this repository
2. Create your new repository
3. Clone your new repository locally

### Option 2: Manual Setup
```bash
git clone https://github.com/yourusername/next-website-template.git my-website
cd my-website
rm -rf .git  # Remove the template's git history
git init     # Initialize your own git repository
```

### Install Dependencies
```bash
npm install
```

### Environment Setup
1. Copy the example environment file:
```bash
cp .env.example .env.local
```

2. Fill in your environment variables:
```env
# Upstash Redis (for rate limiting)
UPSTASH_REDIS_REST_URL=your_upstash_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_token

# Airtable (for contact forms)
AIRTABLE_API_KEY=your_airtable_api_key
AIRTABLE_BASE_ID=your_airtable_base_id
AIRTABLE_TABLE_NAME=your_table_name

# Next.js
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see your website.

## ⚙️ Configuration

### Customize Your Template
Run the interactive customization script:
```bash
npm run customize
```

This will help you:
- Update package.json with your project details
- Customize site metadata
- Set up your branding
- Configure default settings

### Manual Configuration
Edit these files to customize your website:

- **Site metadata**: `app/layout.tsx`
- **Homepage content**: `app/page.tsx`
- **Styling**: `app/globals.css`
- **Contact form**: `app/contact/page.tsx`

## 🛠️ Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage report
- `npm run customize` - Interactive template customization

## 🔧 Setting Up External Services

### Upstash Redis (Rate Limiting)
1. Sign up at [upstash.com](https://upstash.com)
2. Create a new Redis database
3. Copy the REST URL and Token to your `.env.local`

### Airtable (Contact Forms)
1. Sign up at [airtable.com](https://airtable.com)
2. Create a new base for contact submissions
3. Create a table with fields: Name, Email, Message, Date
4. Get your API key from [airtable.com/create/tokens](https://airtable.com/create/tokens)
5. Add your credentials to `.env.local`

## 📁 Project Structure

```
├── app/                    # Next.js app directory
│   ├── contact/           # Contact page with form
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # Reusable React components
├── lib/                   # Utility functions and configs
│   ├── airtable.ts       # Airtable integration
│   └── rate-limit.ts     # Rate limiting setup
├── tests/                 # Test files
├── scripts/              # Build and utility scripts
│   └── customize.js      # Template customization
└── public/               # Static assets
```

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Add your environment variables in Vercel dashboard
4. Deploy!

### Other Platforms
This template works with any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🧪 Testing

Run the test suite:
```bash
npm run test                    # Run all tests
npm run test:rate-limit        # Test rate limiting specifically
npm run test:rate-limit:integration  # Integration tests
```

## 📝 Customization Examples

### Changing the Color Scheme
Edit `app/globals.css` and update the CSS custom properties:
```css
:root {
  --primary-color: #your-color;
  --secondary-color: #your-color;
}
```

### Adding New Pages
Create new files in the `app/` directory following Next.js 13+ app router conventions.

### Modifying Rate Limits
Edit `lib/rate-limit.ts` to adjust rate limiting rules:
```typescript
export const rateLimiter = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, "60 s"), // 10 requests per minute
});
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: Check this README first
- **Issues**: [Open an issue](https://github.com/yourusername/next-website-template/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/next-website-template/discussions)

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Rate limiting by [Upstash](https://upstash.com)
- Form handling with [Airtable](https://airtable.com)

---

**Happy coding!** 🎉 If this template helped you, consider giving it a ⭐ on GitHub.
