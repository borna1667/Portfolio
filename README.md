# My Portfolio - DigitalOcean Deployment

A modern React portfolio website built with TypeScript, Three.js, GSAP, and Tailwind CSS.

## Features

- 🎨 Modern, responsive design
- 🎯 Smooth scroll animations with GSAP
- 🌐 3D interactive elements with Three.js
- ⚡ Fast performance with Vite
- 🐳 Docker containerized for easy deployment
- 🚀 Ready for DigitalOcean deployment

## Technologies Used

- **Frontend**: React 19, TypeScript
- **Styling**: Tailwind CSS
- **Animations**: GSAP with ScrollTrigger
- **3D Graphics**: Three.js with React Three Fiber
- **Build Tool**: Vite
- **Deployment**: Docker + Nginx

## Local Development

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```

3. **Build for production**:
   ```bash
   npm run build
   ```

4. **Preview production build**:
   ```bash
   npm run preview
   ```

## Docker Deployment

### Build and run locally:

```bash
# Build the Docker image
docker build -t my-portfolio .

# Run the container
docker run -p 80:80 my-portfolio
```

### Using Docker Compose:

```bash
# Build and start
docker-compose up --build

# Run in background
docker-compose up -d --build
```

## DigitalOcean Deployment

### Option 1: App Platform (Recommended)

1. **Push your code to GitHub**
2. **Connect to DigitalOcean App Platform**:
   - Go to [DigitalOcean App Platform](https://cloud.digitalocean.com/apps)
   - Click "Create App"
   - Connect your GitHub repository
   - Choose the branch (usually `main`)

3. **Configure build settings**:
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Run Command: Leave empty (static site)

4. **Deploy**: DigitalOcean will automatically build and deploy your app

### Option 2: Droplet with Docker

1. **Create a Droplet**:
   - Choose Ubuntu 22.04 LTS
   - Select appropriate size (Basic $6/month is sufficient)
   - Add SSH key

2. **Connect to your Droplet**:
   ```bash
   ssh root@your-droplet-ip
   ```

3. **Install Docker**:
   ```bash
   curl -fsSL https://get.docker.com -o get-docker.sh
   sh get-docker.sh
   ```

4. **Clone and deploy**:
   ```bash
   git clone your-repository-url
   cd my-portfolio
   docker-compose up -d --build
   ```

### Option 3: Static Site Hosting

1. **Build locally**:
   ```bash
   npm run build
   ```

2. **Upload `dist/` folder** to DigitalOcean Spaces or any static hosting service

## Environment Variables

Create a `.env` file for any environment-specific configurations:

```env
VITE_API_URL=your-api-url
```

## Performance Optimizations

- ✅ Nginx gzip compression enabled
- ✅ Static asset caching (1 year)
- ✅ Security headers configured
- ✅ Optimized Docker multi-stage build
- ✅ Vite code splitting and tree shaking

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For deployment issues or questions, please check:
- [DigitalOcean Documentation](https://docs.digitalocean.com/)
- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)

---

**Ready for production deployment on DigitalOcean! 🚀**
```
