#!/usr/bin/env python3
"""Upload a file to Cloudflare R2 via the S3-compatible API (SigV4, stdlib only)."""
import os, sys, datetime, hashlib, hmac, urllib.request, urllib.parse
from pathlib import Path

# Load .env.local
ENV_PATH = Path(__file__).parent / ".env.local"
env = {}
for line in ENV_PATH.read_text().splitlines():
    line = line.strip()
    if not line or line.startswith("#") or "=" not in line:
        continue
    k, v = line.split("=", 1)
    env[k.strip()] = v.strip().strip('"').strip("'")

ACCOUNT_ID = env["R2_ACCOUNT_ID"]
ACCESS_KEY = env["R2_ACCESS_KEY_ID"]
SECRET_KEY = env["R2_SECRET_ACCESS_KEY"]
BUCKET = env["R2_BUCKET_NAME"]
PUBLIC_BASE = env["R2_PUBLIC_BASE_URL"].rstrip("/")

REGION = "auto"
SERVICE = "s3"
ENDPOINT = f"https://{ACCOUNT_ID}.r2.cloudflarestorage.com"

def sigv4_put(key: str, body: bytes, content_type: str, endpoint: str, cache_control: str = "public, max-age=31536000, immutable"):
    now = datetime.datetime.now(datetime.timezone.utc)
    amz_date = now.strftime("%Y%m%dT%H%M%SZ")
    date_stamp = now.strftime("%Y%m%d")
    host = urllib.parse.urlparse(endpoint).hostname

    # Canonical request
    canonical_uri = "/" + urllib.parse.quote(BUCKET + "/" + key, safe="/")
    canonical_query = ""
    payload_hash = hashlib.sha256(body).hexdigest()
    canonical_headers = (
        f"content-type:{content_type}\n"
        f"host:{host}\n"
        f"x-amz-content-sha256:{payload_hash}\n"
        f"x-amz-date:{amz_date}\n"
    )
    signed_headers = "content-type;host;x-amz-content-sha256;x-amz-date"
    canonical_req = "\n".join([
        "PUT", canonical_uri, canonical_query,
        canonical_headers, signed_headers, payload_hash,
    ])

    # String to sign
    scope = f"{date_stamp}/{REGION}/{SERVICE}/aws4_request"
    sts = "\n".join([
        "AWS4-HMAC-SHA256", amz_date, scope,
        hashlib.sha256(canonical_req.encode()).hexdigest(),
    ])

    # Signing key
    def sign(key, msg):
        return hmac.new(key, msg.encode(), hashlib.sha256).digest()
    k_date = sign(("AWS4" + SECRET_KEY).encode(), date_stamp)
    k_region = sign(k_date, REGION)
    k_service = sign(k_region, SERVICE)
    k_signing = sign(k_service, "aws4_request")
    signature = hmac.new(k_signing, sts.encode(), hashlib.sha256).hexdigest()

    auth = (
        f"AWS4-HMAC-SHA256 Credential={ACCESS_KEY}/{scope}, "
        f"SignedHeaders={signed_headers}, Signature={signature}"
    )

    url = f"{endpoint}{canonical_uri}"
    req = urllib.request.Request(
        url, data=body, method="PUT",
        headers={
            "Authorization": auth,
            "Content-Type": content_type,
            "Host": host,
            "x-amz-content-sha256": payload_hash,
            "x-amz-date": amz_date,
            "Cache-Control": cache_control,
        },
    )
    try:
        return urllib.request.urlopen(req, timeout=60)
    except urllib.error.HTTPError as e:
        print(f"REQUEST URL: {url}")
        print(f"HEADERS: {dict(req.headers)}")
        print(f"RESPONSE {e.code}: {e.reason}")
        print(e.read().decode("utf-8", errors="replace"))
        raise

def upload_file(filename: str, content_type: str):
    src = Path(__file__).parent / "assets" / filename
    body = src.read_bytes()
    key = filename
    print(f"Uploading {src.name} ({len(body):,} bytes) -> {BUCKET}/{key}")
    resp = sigv4_put(key, body, content_type, ENDPOINT)
    print(f"HTTP {resp.status} {resp.reason}")
    public_url = f"{PUBLIC_BASE}/{key}"
    print(f"Public URL: {public_url}")
    return public_url

def upload_file_from(src_path: str, r2_key: str, content_type: str):
    src = Path(__file__).parent / src_path
    body = src.read_bytes()
    print(f"Uploading {src_path} ({len(body):,} bytes) -> {BUCKET}/{r2_key}")
    resp = sigv4_put(r2_key, body, content_type, ENDPOINT)
    print(f"HTTP {resp.status} {resp.reason}")
    public_url = f"{PUBLIC_BASE}/{r2_key}"
    print(f"Public URL: {public_url}")
    return public_url

def main():
    if len(sys.argv) == 3:
        # Usage: python3 upload_r2.py <src_path> <r2_key>
        src_path, r2_key = sys.argv[1], sys.argv[2]
        content_type = "image/jpeg" if src_path.endswith((".jpg", ".jpeg")) else "application/octet-stream"
        upload_file_from(src_path, r2_key, content_type)
    else:
        upload_file("musical-cubes.jpg", "image/jpeg")
        upload_file("musical-cubes.webp", "image/webp")
        upload_file("musical-cubes.mp4", "video/mp4")
        upload_file("musical-cubes-landscape.mp4", "video/mp4")
    print("Done.")

if __name__ == "__main__":
    main()