# ProfSpoVerifier
**Automatic verifies all tasks in `profspo.ru`**

## Docker compose example
```yaml
services:
  profspo-verifier:
    image: profspo-verifier
    restart: unless-stopped
    volumes:
      - /var/log/ProfSpoVerifier/:/ProfSpoVerifier/logs
    environment:
      - PROFSPOVERIFIER_AUTH_EMAIL=email # Logging email
      - PROFSPOVERIFIER_AUTH_PASSWORD=password # Logging password

      - PROFSPOVERIFIER_PING_ACTIVE=true # Do constant verifing with interval
      - PROFSPOVERIFIER_DO_TRACE_LOGGING=true # Do log errors traces

      - PROFSPOVERIFIER_PING_INTERVAL=12 # Interval between verifing in hours
```