# Optional Security Hardening

## 1. Move GHCR_TOKEN to server (removes secret from workflow)

**On server (one-time):**
```bash
# Create GitHub PAT with read:packages scope
# Then on server:
echo "YOUR_GHCR_TOKEN" | docker login ghcr.io -u bartek-filipiuk --password-stdin
```

**In deploy.yml - remove lines 130-131:**
```yaml
# DELETE these lines:
echo "=== Logging into GHCR ==="
echo "${{ secrets.GHCR_TOKEN }}" | docker login ghcr.io -u ${{ github.actor }} --password-stdin
```

Docker remembers login in `~/.docker/config.json`.

---

## 2. Add GitHub environment protection

**In GitHub repo:**
1. Settings → Environments → New environment → `production`
2. Add "Required reviewers" (yourself)
3. Check "Prevent self-review" if you want

**In deploy.yml - add to deploy job:**
```yaml
deploy:
  name: Deploy to Production
  needs: build
  runs-on: ubuntu-latest
  environment: production  # ← ADD THIS LINE
```

---

## 3. Fix PAYLOAD_SECRET in build args (most complex)

**Change Dockerfile** - use runtime env instead of build-time:
```dockerfile
# REMOVE these lines:
ARG PAYLOAD_SECRET
ENV PAYLOAD_SECRET=${PAYLOAD_SECRET}

# Secret will come from docker-compose.prod.yml at runtime (already does)
```

**In deploy.yml - remove from build-args (line 74):**
```yaml
build-args: |
  DATABASE_URI=postgresql://postgres:postgres@localhost:5432/payload
  # REMOVE: PAYLOAD_SECRET=${{ secrets.PAYLOAD_SECRET }}
  NEXT_PUBLIC_SERVER_URL=https://wrocdevs.com
```

**Note:** This requires the app to work without PAYLOAD_SECRET at build time. Test locally first.

---

## Quick Summary

| Hardening | Effort | Impact |
|-----------|--------|--------|
| Server-side GHCR login | 5 min | Removes token from logs |
| Environment protection | 2 min | Adds deploy approval |
| Remove PAYLOAD_SECRET from build | 15 min | Needs testing |
