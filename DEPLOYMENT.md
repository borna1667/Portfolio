# DigitalOcean Deployment Checklist

## Pre-Deployment Setup

### 1. Repository Setup
- [ ] Push code to GitHub repository
- [ ] Ensure all sensitive data is in `.env` files (not committed)
- [ ] Verify `.gitignore` includes deployment files if needed
- [ ] Test local build: `npm run build`
- [ ] Test local Docker build: `docker build -t my-portfolio .`

### 2. DigitalOcean Account Setup
- [ ] Create DigitalOcean account
- [ ] Add payment method
- [ ] Generate API token (for GitHub Actions)

## Deployment Options

### Option A: DigitalOcean App Platform (Recommended) 💰 ~$5/month

#### Steps:
1. [ ] Go to [DigitalOcean App Platform](https://cloud.digitalocean.com/apps)
2. [ ] Click "Create App"
3. [ ] Connect GitHub repository
4. [ ] Configure build settings:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Run Command**: Leave empty (static site)
5. [ ] Choose plan (Starter $5/month recommended)
6. [ ] Deploy!

#### GitHub Actions (Optional):
1. [ ] Add `DIGITALOCEAN_ACCESS_TOKEN` to GitHub Secrets
2. [ ] Push to main branch to trigger auto-deployment

### Option B: Droplet + Docker 💰 ~$6/month

#### Steps:
1. [ ] Create Ubuntu 22.04 Droplet ($6/month Basic)
2. [ ] Add SSH key during creation
3. [ ] Connect via SSH: `ssh root@your-droplet-ip`
4. [ ] Install Docker:
   ```bash
   curl -fsSL https://get.docker.com -o get-docker.sh
   sh get-docker.sh
   ```
5. [ ] Clone repository:
   ```bash
   git clone https://github.com/your-username/my-portfolio.git
   cd my-portfolio
   ```
6. [ ] Deploy:
   ```bash
   docker-compose up -d --build
   ```
7. [ ] Configure domain (optional):
   - [ ] Point domain A record to droplet IP
   - [ ] Update nginx.conf with domain name
   - [ ] Set up SSL with Let's Encrypt

### Option C: Static Hosting 💰 ~$1/month

#### Steps:
1. [ ] Build locally: `npm run build`
2. [ ] Upload `dist/` folder to:
   - [ ] DigitalOcean Spaces + CDN
   - [ ] Netlify (free tier available)
   - [ ] Vercel (free tier available)

## Post-Deployment

### Testing
- [ ] Visit deployed URL
- [ ] Test all animations and interactions
- [ ] Check mobile responsiveness
- [ ] Test loading performance
- [ ] Verify 3D elements load correctly

### Monitoring & Maintenance
- [ ] Set up uptime monitoring
- [ ] Configure analytics (Google Analytics, etc.)
- [ ] Plan regular updates and backups
- [ ] Monitor costs and usage

### Performance Optimization
- [ ] Configure CDN (if using Droplet)
- [ ] Set up monitoring (DigitalOcean Monitoring)
- [ ] Enable alerts for downtime
- [ ] Regular security updates

## Environment Variables

If you need environment variables, create `.env` file:
```env
VITE_API_URL=https://api.yourdomain.com
VITE_ANALYTICS_ID=your-analytics-id
```

Add these to your DigitalOcean App Platform environment variables.

## Troubleshooting

### Common Issues:
1. **Build fails**: Check Node.js version compatibility
2. **3D elements not loading**: Verify Three.js assets are included
3. **Animations not working**: Check GSAP license for production
4. **Slow loading**: Enable gzip compression (included in nginx.conf)

### Debug Commands:
```bash
# Check container logs
docker logs my-portfolio

# Check container status
docker ps

# Rebuild container
docker-compose down && docker-compose up --build -d

# Check nginx config
docker exec my-portfolio nginx -t
```

## Security Best Practices

- [ ] Regular updates: `docker-compose pull && docker-compose up -d`
- [ ] Use non-root user in production
- [ ] Enable firewall on Droplet
- [ ] Regular backups
- [ ] Monitor access logs

## Cost Optimization

### Expected Monthly Costs:
- **App Platform**: $5-12/month (includes hosting + CDN)
- **Basic Droplet**: $6/month + $1/month for load balancer (optional)
- **Spaces CDN**: $5/month (if using Droplet + high traffic)

### Cost-Saving Tips:
- Use App Platform for simplicity
- Droplet for multiple projects
- Static hosting for lowest cost

---

## Ready to Deploy! 🚀

Choose your preferred option above and follow the checklist. Your portfolio will be live in minutes!
